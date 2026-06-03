# Despliegue del Sistema SWO
## Archivos Ejecutables y URLs de Producción

**Proyecto:** SWO — Sistema de Gestión de Incidencias  
**Versión:** 1.0.0 · Junio 2026

---

## URLs de los Módulos Desplegados

| Módulo | URL Pública | Estado |
|--------|-------------|--------|
| **Frontend (Angular)** | https://juanpge123.github.io/SWO/ | ✅ Activo — GitHub Pages |
| **Backend API (Spring Boot)** | https://swo-production.up.railway.app/api | ✅ Railway |
| **Documentación API (Swagger)** | https://swo-production.up.railway.app/api/swagger-ui.html | ✅ Railway |
| **Código fuente** | https://github.com/JuanPGE123/SWO | ✅ GitHub |

---

## Archivos Ejecutables

### Frontend — Angular 17

| Archivo / Carpeta | Descripción |
|-------------------|-------------|
| `dist/swo-servicedesk/` | Build de producción listo para servir |
| `dist/swo-servicedesk/index.html` | Punto de entrada de la SPA |
| `dist/swo-servicedesk/main.js` | Bundle principal de Angular (optimizado) |
| `dist/swo-servicedesk/styles.css` | Estilos compilados |
| `dist/swo-servicedesk/assets/` | Recursos estáticos |

**Rama de despliegue:** `gh-pages`  
**Comando de build:**
```bash
npx ng build --configuration production --base-href /SWO/
```

**Comando de deploy a GitHub Pages:**
```bash
npx gh-pages -d dist/swo-servicedesk
```

---

### Backend — Spring Boot 3.2.4

| Archivo | Descripción |
|---------|-------------|
| `backend/target/swo-api-1.0.0.jar` | JAR ejecutable Fat-JAR (Spring Boot) |
| `backend/Dockerfile` | Imagen Docker para Railway/contenedores |
| `backend/src/main/resources/application.yml` | Config de desarrollo (localhost) |
| `backend/src/main/resources/application-prod.yml` | Config de producción (Railway) |
| `railway.json` | Configuración de despliegue en Railway |

**Comando para generar el JAR:**
```bash
cd backend
mvn clean package -DskipTests
# JAR generado en: backend/target/swo-api-1.0.0.jar
```

**Comando para ejecutar el JAR localmente:**
```bash
java -jar backend/target/swo-api-1.0.0.jar
# API disponible en: http://localhost:8081/api
# Swagger UI en:    http://localhost:8081/api/swagger-ui.html
```

**Comando para ejecutar con Docker:**
```bash
cd backend
docker build -t swo-backend:1.0.0 .
docker run -p 8080:8080 \
  -e DATABASE_URL="jdbc:mysql://host:3306/swo_db" \
  -e DATABASE_USER="usuario" \
  -e DATABASE_PASSWORD="contraseña" \
  -e SPRING_PROFILES_ACTIVE=prod \
  swo-backend:1.0.0
```

---

## Infraestructura de Producción

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCCIÓN SWO                           │
│                                                             │
│  ┌─────────────────────────┐   ┌──────────────────────────┐│
│  │    GitHub Pages          │   │       Railway             ││
│  │                          │   │                           ││
│  │  Angular 17 (SPA)        │   │  Spring Boot 3.2.4 (API)  ││
│  │  juanpge123.github.io    │◄──│  swo-production.up.       ││
│  │  /SWO/                   │   │  railway.app/api          ││
│  │                          │   │                           ││
│  │  Servicio: GitHub Pages  │   │  MySQL 8 (Railway DB)     ││
│  │  CDN global              │   │  Base de datos en nube    ││
│  └─────────────────────────┘   └──────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## Guía de Despliegue en Railway (Backend)

### Requisitos previos
- Cuenta gratuita en [railway.app](https://railway.app)
- Repositorio conectado a Railway

### Paso 1 — Crear proyecto en Railway

1. Ingresar a [railway.app/new](https://railway.app/new)
2. Seleccionar **Deploy from GitHub repo**
3. Autorizar acceso y seleccionar el repo `JuanPGE123/SWO`
4. Railway detectará el `railway.json` y el `backend/Dockerfile` automáticamente

### Paso 2 — Agregar base de datos MySQL

1. En el proyecto de Railway, clic en **+ New Service**
2. Seleccionar **Database → MySQL**
3. Railway crea la base de datos y genera automáticamente las variables:
   - `MYSQL_URL`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQLDATABASE`

### Paso 3 — Configurar variables de entorno

En el servicio del backend (no en la BD), agregar estas variables en **Variables**:

| Variable | Valor |
|----------|-------|
| `DATABASE_URL` | `jdbc:mysql://${{MySQL.MYSQL_HOST}}:${{MySQL.MYSQL_PORT}}/${{MySQL.MYSQLDATABASE}}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC` |
| `DATABASE_USER` | `${{MySQL.MYSQL_USER}}` |
| `DATABASE_PASSWORD` | `${{MySQL.MYSQL_PASSWORD}}` |
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `JAVA_OPTS` | `-Xmx512m -Xms256m` |

> **Tip Railway:** Usar la sintaxis `${{MySQL.VARIABLE}}` enlaza automáticamente las variables del servicio MySQL.

### Paso 4 — Obtener URL del backend

Después del primer deploy exitoso:
1. Ir a la pestaña **Settings** del servicio backend
2. En la sección **Domains**, copiar la URL generada (ej: `swo-production.up.railway.app`)
3. Actualizar `src/environments/environment.prod.ts`:
   ```typescript
   apiUrl: 'https://TU-URL-RAILWAY.up.railway.app/api',
   ```
4. Reconstruir y redesplegar el frontend:
   ```bash
   npx ng build --configuration production --base-href /SWO/
   npx gh-pages -d dist/swo-servicedesk
   ```

### Paso 5 — Inicializar la base de datos

Conectar al MySQL de Railway y ejecutar el script de creación de tablas:

```bash
# Desde Railway CLI:
railway connect MySQL

# O mediante variables del panel, conectar con MySQL Workbench
# y ejecutar el script: backend/crear_tablas_missing.sql
```

---

## Ejecución Local Completa

Para ejecutar todo el sistema en local:

### 1. Base de datos MySQL
```sql
CREATE DATABASE swo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Ejecutar el script de tablas en `backend/crear_tablas_missing.sql`.

### 2. Backend Spring Boot
```bash
cd backend
mvn spring-boot:run
# API en http://localhost:8081/api
```

### 3. Frontend Angular
```bash
# En la raíz del proyecto
npm install
npm start
# App en http://localhost:4200
```

### 4. Credenciales de acceso al sistema

| Usuario | Correo | Contraseña | Rol |
|---------|--------|-----------|-----|
| Master (dev) | `master@swo.com` | `123456` | Administrador |

---

## Variables de Entorno Requeridas en Producción

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | URL JDBC de conexión a MySQL | `jdbc:mysql://host:3306/swo_db` |
| `DATABASE_USER` | Usuario de la base de datos | `swo_user` |
| `DATABASE_PASSWORD` | Contraseña de la base de datos | `secreto123` |
| `SPRING_PROFILES_ACTIVE` | Perfil activo de Spring Boot | `prod` |
| `PORT` | Puerto del servidor (Railway lo asigna) | `8080` |
| `JAVA_OPTS` | Opciones de la JVM | `-Xmx512m` |

---

## Stack Tecnológico Desplegado

| Capa | Tecnología | Versión | Hosting |
|------|-----------|---------|---------|
| Frontend | Angular | 17.0 | GitHub Pages |
| Backend | Spring Boot | 3.2.4 | Railway |
| Base de datos | MySQL | 8.0 | Railway (managed) |
| Contenedor | Docker | 24+ | Railway |
| Runtime Java | Eclipse Temurin JRE | 17 | Railway |
| Node.js (build) | Node.js | 18 LTS | CI/CD |

---

*Documento de despliegue — SWO ServiceDesk v1.0.0 · SENA 2026*
