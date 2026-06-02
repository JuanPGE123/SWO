# ════════════════════════════════════════════════════════════════════════════════
# DOCKERFILE - MULTI-STAGE BUILD PARA SWO (Backend + Frontend)
# ════════════════════════════════════════════════════════════════════════════════
# 
# USO:
#   docker build -t swo:latest -f Dockerfile .
#   docker run -p 8080:8080 swo:latest
#
# STAGES:
#   1. build-frontend  - Compila Angular con optimizaciones
#   2. build-backend   - Compila Spring Boot JAR ejecutable
#   3. runtime         - Imagen final con ambos servicios
# ════════════════════════════════════════════════════════════════════════════════

# ────────────────────────────────────────────────────────────────────────────────
# STAGE 1: BUILD FRONTEND (Angular)
# ────────────────────────────────────────────────────────────────────────────────
FROM node:18-alpine AS build-frontend

WORKDIR /app/frontend

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias en modo production
RUN npm ci --prefer-offline --no-audit

# Copiar código fuente del frontend
COPY . .

# Excluir backend del contexto de Angular
RUN rm -rf backend/ java/ *.sql *.bat *.sh

# Compilar para producción con optimizaciones
RUN npm run build:prod

# ────────────────────────────────────────────────────────────────────────────────
# STAGE 2: BUILD BACKEND (Spring Boot)
# ────────────────────────────────────────────────────────────────────────────────
FROM maven:3.9.4-eclipse-temurin-17 AS build-backend

WORKDIR /app/backend

# Copiar pom.xml
COPY backend/pom.xml ./

# Descargar dependencias (cacheable layer)
RUN mvn dependency:resolve dependency:resolve-plugins

# Copiar código fuente
COPY backend/ .

# Compilar con cobertura de tests (mínimo 80%)
RUN mvn clean package -DskipTests=false -Ptest-coverage -X

# ────────────────────────────────────────────────────────────────────────────────
# STAGE 3: RUNTIME (Imagen Final)
# Combina Backend + Frontend + Nginx en una sola imagen
# ────────────────────────────────────────────────────────────────────────────────
FROM eclipse-temurin:17.0.8_7-jre-jammy

LABEL maintainer="SWO DevOps Team"
LABEL description="SWO - Sistema de Gestión de Incidencias (Producción)"
LABEL version="1.0.0"

# ──────── Instalar Nginx para servir frontend ────────
RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx \
    curl \
    ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

# ──────── Crear estructura de directorios ────────
RUN mkdir -p /app/backend /app/frontend /var/www/swo /var/log/swo

# ──────── Copiar JAR del backend (del stage anterior) ────────
COPY --from=build-backend /app/backend/target/swo-api-1.0.0.jar /app/backend/swo-api.jar

# ──────── Copiar archivos compilados del frontend ────────
COPY --from=build-frontend /app/frontend/dist/swo-servicedesk /var/www/swo

# ──────── Copiar configuración de Nginx ────────
RUN cat > /etc/nginx/sites-available/default << 'EOF'
server {
    listen 80 default_server;
    server_name _;
    
    client_max_body_size 10M;

    # ── FRONTEND: Angular Static Files ──
    location / {
        root /var/www/swo;
        try_files $uri $uri/ /index.html;
        
        # Caching para assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 30d;
            add_header Cache-Control "public, immutable";
        }
    }

    # ── BACKEND: API REST ──
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
        
        # Buffering
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }

    # ── SWAGGER/OPENAPI ──
    location /swagger-ui.html {
        proxy_pass http://localhost:8080/swagger-ui.html;
    }
    
    location /v3/api-docs {
        proxy_pass http://localhost:8080/v3/api-docs;
    }

    # ── HEALTH CHECK ──
    location /health {
        access_log off;
        proxy_pass http://localhost:8080/health;
        proxy_connect_timeout 2s;
    }

    # ── LOGS ──
    access_log /var/log/swo/nginx_access.log;
    error_log /var/log/swo/nginx_error.log warn;
}
EOF

# ──────── Crear entrypoint script ────────
RUN cat > /app/entrypoint.sh << 'EOF'
#!/bin/bash
set -e

echo "╔════════════════════════════════════════════════════╗"
echo "║         SWO - Sistema de Incidencias v1.0.0        ║"
echo "║          Iniciando en ambiente PRODUCCIÓN          ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# ──── Esperar a que estén listos los servicios ────
wait_for_service() {
    local host=$1
    local port=$2
    local service=$3
    local max_attempts=30
    local attempt=1

    echo "⏳ Esperando $service en $host:$port..."
    while ! nc -z $host $port 2>/dev/null; do
        if [ $attempt -eq $max_attempts ]; then
            echo "❌ Timeout esperando $service"
            return 1
        fi
        echo "   Intento $attempt/$max_attempts..."
        sleep 2
        attempt=$((attempt + 1))
    done
    echo "✅ $service listo"
}

# ──── Iniciar Backend (Spring Boot) en background ────
echo "🚀 Iniciando Backend (Spring Boot 3.2.4)..."
java -Dspring.profiles.active=prod \
    -Dspring.datasource.url=${DB_URL:-jdbc:mysql://db:3306/swo_prod} \
    -Dspring.datasource.username=${DB_USER:-swo_prod} \
    -Dspring.datasource.password=${DB_PASSWORD:-changeme} \
    -jar /app/backend/swo-api.jar > /var/log/swo/backend.log 2>&1 &

BACKEND_PID=$!
echo "   PID: $BACKEND_PID"

# Esperar a que Backend esté listo
if ! wait_for_service localhost 8080 "Backend API"; then
    echo "❌ Backend no respondió. Verificar logs:"
    tail -50 /var/log/swo/backend.log
    exit 1
fi

# ──── Iniciar Nginx (Frontend + Proxy) ────
echo "🚀 Iniciando Nginx (Frontend + Reverse Proxy)..."
nginx -g "daemon off;" > /var/log/swo/nginx.log 2>&1 &

NGINX_PID=$!
echo "   PID: $NGINX_PID"

# Esperar a que Nginx esté listo
if ! wait_for_service localhost 80 "Nginx"; then
    echo "❌ Nginx no respondió. Verificar logs:"
    tail -50 /var/log/swo/nginx.log
    exit 1
fi

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║              ✅ SISTEMA LISTO                      ║"
echo "║                                                    ║"
echo "║  Frontend:      http://localhost:80               ║"
echo "║  Backend API:   http://localhost:8080/api         ║"
echo "║  Swagger UI:    http://localhost:8080/swagger-ui  ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Mantener contenedor activo
wait $BACKEND_PID $NGINX_PID
EOF

chmod +x /app/entrypoint.sh

# ──────── Health check ────────
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:80/health || exit 1

# ──────── Variables de entorno ────────
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseG1GC"
ENV SPRING_PROFILES_ACTIVE=prod
ENV DB_URL=jdbc:mysql://db:3306/swo_prod
ENV DB_USER=swo_prod
ENV DB_PASSWORD=changeme

# ──────── Puertos expuestos ────────
EXPOSE 80 8080

# ──────── Comando de inicio ────────
ENTRYPOINT ["/app/entrypoint.sh"]
