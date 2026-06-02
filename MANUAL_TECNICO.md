# Manual Técnico — SWO Service Desk

> **Versión:** 1.0.0  
> **Fecha:** Junio 2026  
> **Proyecto:** Sistema de Gestión de Incidencias SWO  
> **Institución:** SENA — Tecnología en Análisis y Desarrollo de Software

---

## Tabla de Contenidos

1. [Visión General del Sistema](#1-visión-general-del-sistema)
2. [Arquitectura del Software](#2-arquitectura-del-software)
3. [Estructura de Paquetes](#3-estructura-de-paquetes)
4. [Modelo de Base de Datos](#4-modelo-de-base-de-datos)
5. [Configuración del Servidor de Base de Datos](#5-configuración-del-servidor-de-base-de-datos)
6. [Configuración del Servidor de Aplicaciones](#6-configuración-del-servidor-de-aplicaciones)
7. [Configuración del Servidor Web (Nginx)](#7-configuración-del-servidor-web-nginx)
8. [Ambientes de Ejecución](#8-ambientes-de-ejecución)
9. [Documentación de Módulos y Componentes](#9-documentación-de-módulos-y-componentes)
10. [Patrones de Diseño Implementados](#10-patrones-de-diseño-implementados)
11. [Seguridad](#11-seguridad)
12. [Gestión de Errores y Excepciones](#12-gestión-de-errores-y-excepciones)
13. [Buenas Prácticas Aplicadas](#13-buenas-prácticas-aplicadas)
14. [Control de Versiones](#14-control-de-versiones)
15. [Generación de Artefactos Ejecutables](#15-generación-de-artefactos-ejecutables)

---

## 1. Visión General del Sistema

**SWO** (Service WorkOrder) es una aplicación web Full Stack de tipo Service Desk que permite:

- Registrar, gestionar y hacer seguimiento de incidencias tecnológicas (tickets)
- Administrar proyectos y equipos de trabajo
- Controlar usuarios con roles diferenciados
- Generar reportes en PDF
- Interactuar con un chatbot de soporte automatizado

**Arquitectura:** Cliente-Servidor de 3 capas  
**Tipo de despliegue:** Contenedores Docker (Multi-stage build)  
**Comunicación:** REST API + JSON  
**Autenticación:** JWT (JSON Web Token)

---

## 2. Arquitectura del Software

### Diagrama de Capas

```
┌────────────────────────────────────────────────────────────────────┐
│  CAPA DE PRESENTACIÓN — Angular 17 (SPA)                          │
│                                                                    │
│  app.component.ts                                                  │
│  ├── features/auth         → Autenticación                        │
│  ├── features/dashboard    → Panel de control                     │
│  ├── features/incidents    → Gestión de incidencias               │
│  ├── features/projects     → Gestión de proyectos                 │
│  ├── features/users        → Administración de usuarios           │
│  ├── features/chatbot      → Chatbot de soporte                   │
│  └── features/reports      → Generación de reportes              │
└───────────────────────────────┬────────────────────────────────────┘
                                │ HTTP/REST — JSON
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│  CAPA DE NEGOCIO — Spring Boot 3.2.4                              │
│                                                                    │
│  Controller (REST) → Service (Lógica) → Repository (JPA)          │
│                                                                    │
│  Módulos: Incidencias | Proyectos | Usuarios | Categorías         │
│           Chatbot | Asignaciones | Autenticación                  │
└───────────────────────────────┬────────────────────────────────────┘
                                │ JDBC + JPA (Hibernate)
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│  CAPA DE DATOS — MySQL 8.0                                        │
│                                                                    │
│  Tablas: usuarios | incidencias | proyectos | categorias          │
│          asignaciones_proyecto | chatbot_conversaciones           │
│          chatbot_mensajes                                          │
└────────────────────────────────────────────────────────────────────┘
```

### Flujo de una Petición HTTP

```
[Browser] → [Nginx:80] → [Angular SPA]
[Angular]  → [HTTP Interceptor] → [Spring Boot:8080/api/v1/**]
[Controller] → [Service] → [Repository] → [MySQL]
[MySQL] → [Repository] → [Service] → [DTO Mapper] → [JSON Response]
```

---

## 3. Estructura de Paquetes

### Backend — `com.swo.api`

```
com.swo.api
├── SwoApiApplication.java          # Punto de entrada de la aplicación
│
├── controller/                     # Controladores REST (capa de presentación)
│   ├── IncidenciaController.java   # /v1/incidencias
│   ├── ProyectoController.java     # /v1/proyectos
│   ├── UsuarioController.java      # /v1/usuarios
│   ├── CategoriaController.java    # /v1/categorias
│   └── ChatbotController.java      # /v1/chatbot
│
├── service/                        # Interfaces de la capa de negocio
│   ├── IncidenciaService.java
│   ├── ProyectoService.java
│   ├── UsuarioService.java
│   ├── CategoriaService.java
│   └── ChatbotService.java
│   └── impl/                       # Implementaciones concretas
│       ├── IncidenciaServiceImpl.java
│       ├── ProyectoServiceImpl.java
│       ├── UsuarioServiceImpl.java
│       ├── CategoriaServiceImpl.java
│       └── ChatbotServiceImpl.java
│
├── repository/                     # Repositorios JPA (capa de datos)
│   ├── IncidenciaRepository.java
│   ├── ProyectoRepository.java
│   ├── UsuarioRepository.java
│   ├── CategoriaRepository.java
│   ├── AsignacionProyectoRepository.java
│   ├── ChatbotConversacionRepository.java
│   └── ChatbotMensajeRepository.java
│
├── model/
│   ├── entity/                     # Entidades JPA (mapeo tablas BD)
│   │   ├── Incidencia.java
│   │   ├── Proyecto.java
│   │   ├── Usuario.java
│   │   ├── Categoria.java
│   │   ├── AsignacionProyecto.java
│   │   ├── ChatbotConversacion.java
│   │   └── ChatbotMensaje.java
│   │
│   ├── dto/
│   │   ├── request/                # DTOs de entrada (POST/PUT)
│   │   │   ├── IncidenciaRequestDTO.java
│   │   │   ├── ProyectoRequestDTO.java
│   │   │   ├── UsuarioRequestDTO.java
│   │   │   ├── CategoriaRequestDTO.java
│   │   │   ├── AsignacionProyectoDTO.java
│   │   │   └── ChatbotRequestDTO.java
│   │   └── response/               # DTOs de salida (respuestas JSON)
│   │       ├── IncidenciaResponseDTO.java
│   │       ├── ProyectoResponseDTO.java
│   │       ├── UsuarioResponseDTO.java
│   │       ├── CategoriaResponseDTO.java
│   │       └── ChatbotResponseDTO.java
│   └── enums/
│       └── EstadoProyecto.java
│
├── config/                         # Configuraciones de Spring
│   ├── CorsConfig.java             # CORS (Cross-Origin Resource Sharing)
│   ├── OpenApiConfig.java          # Swagger / OpenAPI 3
│   └── SecurityConfig.java        # Spring Security + JWT
│
├── exception/                      # Manejo centralizado de excepciones
│   ├── BusinessException.java      # Excepción de regla de negocio
│   ├── ResourceNotFoundException.java  # Recurso no encontrado (404)
│   └── GlobalExceptionHandler.java # @ControllerAdvice global
│
└── common/
    └── ApiResponse.java            # Wrapper estándar para respuestas JSON
```

### Frontend — `src/app`

```
src/app/
├── app.component.ts                # Componente raíz
├── app.config.ts                   # Configuración global (providers, router)
├── app.routes.ts                   # Definición de rutas
│
├── core/                           # Servicios singleton y transversales
│   ├── guards/
│   │   └── auth.guard.ts          # Protección de rutas (JWT validado)
│   ├── interceptors/
│   │   └── http.interceptor.ts    # Adjunta token JWT a peticiones
│   ├── services/
│   │   ├── auth.service.ts        # Login, logout, manejo de token
│   │   ├── projects.service.ts    # CRUD proyectos
│   │   ├── users.service.ts       # CRUD usuarios
│   │   ├── incidents.service.ts   # CRUD incidencias
│   │   ├── chatbot.service.ts     # Servicio chatbot
│   │   ├── notification.service.ts # Notificaciones toast
│   │   └── shared.service.ts      # Estado compartido global
│   ├── models/
│   │   ├── models.ts              # Interfaces TypeScript
│   │   └── dtos.ts                # DTOs del frontend
│   ├── enums/
│   │   └── app.enums.ts           # Enumeraciones compartidas
│   └── constants/
│       └── app.constants.ts       # Constantes globales (rutas API, etc.)
│
├── shared/                        # Componentes reutilizables
│   ├── components/
│   │   ├── button/                # Botón estilizado configurable
│   │   ├── input/                 # Input con validación integrada
│   │   ├── modal/                 # Modal genérico
│   │   └── sidebar/               # Sidebar de navegación
│   └── validators/
│       └── custom-validators.ts   # Validadores de formularios Angular
│
└── features/                      # Módulos funcionales (lazy loading)
    ├── auth/                      # Login / Registro
    ├── dashboard/                 # Panel de control con KPIs
    ├── incidents/                 # CRUD incidencias + comentarios + archivos
    │   ├── incident-form/
    │   ├── incident-detail/
    │   ├── incident-comments/
    │   ├── incident-files/
    │   └── incident-history/
    ├── projects/                  # CRUD proyectos + asignaciones
    ├── users/                     # Administración de usuarios
    ├── chatbot/                   # Chat en tiempo real
    └── reports/                   # Generación PDF/Excel
```

---

## 4. Modelo de Base de Datos

### Entidades y Relaciones

```sql
-- =====================================================================
-- TABLA: usuarios
-- =====================================================================
CREATE TABLE usuarios (
    id_usuario    BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    email         VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol           VARCHAR(30)  NOT NULL DEFAULT 'USUARIO',
    activo        BOOLEAN      NOT NULL DEFAULT TRUE,
    fecha_creacion DATETIME    DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================================
-- TABLA: categorias
-- =====================================================================
CREATE TABLE categorias (
    id_categoria      BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria  VARCHAR(80) NOT NULL UNIQUE,
    descripcion       TEXT,
    activa            BOOLEAN DEFAULT TRUE
);

-- =====================================================================
-- TABLA: incidencias
-- =====================================================================
CREATE TABLE incidencias (
    id_incidencia    BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo           VARCHAR(200) NOT NULL,
    descripcion      TEXT NOT NULL,
    estado           VARCHAR(20)  NOT NULL DEFAULT 'Abierto',
    impacto          VARCHAR(20)  DEFAULT 'Medio',
    ubicacion        VARCHAR(100),
    fecha_creacion   DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME ON UPDATE CURRENT_TIMESTAMP,
    fecha_cierre     DATETIME,
    id_usuario_reporta BIGINT NOT NULL,
    id_categoria     BIGINT,
    FOREIGN KEY (id_usuario_reporta) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- =====================================================================
-- TABLA: proyectos
-- =====================================================================
CREATE TABLE proyectos (
    id_proyecto      BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre           VARCHAR(150) NOT NULL,
    descripcion      TEXT,
    estado           VARCHAR(30)  DEFAULT 'ACTIVO',
    prioridad        VARCHAR(20)  DEFAULT 'MEDIA',
    fecha_inicio     DATE,
    fecha_fin        DATE,
    fecha_creacion   DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================================
-- TABLA: asignaciones_proyecto
-- =====================================================================
CREATE TABLE asignaciones_proyecto (
    id_asignacion  BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_proyecto    BIGINT NOT NULL,
    id_usuario     BIGINT NOT NULL,
    rol_en_proyecto VARCHAR(50),
    fecha_asignacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- =====================================================================
-- TABLA: chatbot_conversaciones
-- =====================================================================
CREATE TABLE chatbot_conversaciones (
    id_conversacion BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario      BIGINT,
    fecha_inicio    DATETIME DEFAULT CURRENT_TIMESTAMP,
    activa          BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- =====================================================================
-- TABLA: chatbot_mensajes
-- =====================================================================
CREATE TABLE chatbot_mensajes (
    id_mensaje      BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_conversacion BIGINT NOT NULL,
    contenido       TEXT NOT NULL,
    tipo            VARCHAR(20) NOT NULL,  -- 'usuario' | 'bot'
    fecha_envio     DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_conversacion) REFERENCES chatbot_conversaciones(id_conversacion)
);
```

### Diagrama Relacional (Simplificado)

```
usuarios ──┬── incidencias (id_usuario_reporta)
           └── asignaciones_proyecto (id_usuario)
           └── chatbot_conversaciones (id_usuario)

categorias ── incidencias (id_categoria)

proyectos ── asignaciones_proyecto (id_proyecto)

chatbot_conversaciones ── chatbot_mensajes (id_conversacion)
```

---

## 5. Configuración del Servidor de Base de Datos

### MySQL 8.0 — Parámetros de Configuración

**Archivo:** `mysql.cnf`

```ini
[mysqld]
# Charset y Collation
character-set-server    = utf8mb4
collation-server        = utf8mb4_unicode_ci

# Rendimiento
max_connections         = 1000
max_allowed_packet      = 256M
innodb_buffer_pool_size = 512M
innodb_log_file_size    = 128M
query_cache_size        = 0
query_cache_type        = 0

# Autenticación (compatibilidad con Spring Boot)
default-authentication-plugin = mysql_native_password

# Logging
log-error               = /var/log/mysql/error.log
general-log             = 1
general-log-file        = /var/log/mysql/general.log
```

### Configuración en Spring Boot (`application.properties`)

```properties
# ── Datasource ──────────────────────────────────────────────────────
spring.datasource.url=jdbc:mysql://${DB_HOST:localhost}:${DB_PORT:3306}/${DB_NAME:swo_dev}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&characterEncoding=utf8
spring.datasource.username=${DB_USER:root}
spring.datasource.password=${DB_PASSWORD:root}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# ── Connection Pool (HikariCP) ──────────────────────────────────────
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.idle-timeout=600000
spring.datasource.hikari.max-lifetime=1800000

# ── JPA / Hibernate ─────────────────────────────────────────────────
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# ── Context Path ─────────────────────────────────────────────────────
server.servlet.context-path=/api
server.port=8080
```

### Perfiles de Base de Datos

| Perfil | BD | URL | DDL |
|--------|-----|-----|-----|
| `dev` | MySQL local | `localhost:3306/swo_dev` | `update` |
| `test` | H2 en memoria | `mem:swo_test` | `create-drop` |
| `prod` | MySQL Docker | `db:3306/swo_prod` | `validate` |

---

## 6. Configuración del Servidor de Aplicaciones

### Spring Boot — JVM y Servidor Embebido (Tomcat)

**Variables de entorno de JVM:**

```bash
JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseG1GC -XX:MaxGCPauseMillis=200"
```

**Puerto y context path:**

```properties
server.port=8080
server.servlet.context-path=/api
server.compression.enabled=true
server.compression.mime-types=application/json,application/xml,text/html
server.compression.min-response-size=1024
```

### Healthcheck del Backend

```bash
# Verificar que el backend está disponible
curl -f http://localhost:8080/api/health
```

### Construcción del JAR Ejecutable

```bash
cd backend
mvn clean package -DskipTests
# Artefacto generado: target/swo-api-1.0.0.jar

# Ejecutar
java -jar target/swo-api-1.0.0.jar --spring.profiles.active=prod
```

---

## 7. Configuración del Servidor Web (Nginx)

**Archivo:** `nginx.conf`

```nginx
server {
    listen       80;
    server_name  localhost;
    root         /usr/share/nginx/html;
    index        index.html;

    # Compresión gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript
               text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 256;

    # Angular SPA — todas las rutas al index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy inverso al backend API
    location /api/ {
        proxy_pass         http://backend:8080;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_read_timeout 90;
        proxy_connect_timeout 90;
    }

    # Caché de archivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Seguridad
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
}
```

---

## 8. Ambientes de Ejecución

### Ambiente 1: Desarrollo Local

**Objetivo:** Desarrollo activo con hot-reload y herramientas de debug.

| Parámetro | Valor |
|-----------|-------|
| Frontend URL | http://localhost:4200 |
| Backend URL | http://localhost:8080/api |
| Base de datos | MySQL local (swo_dev) |
| Perfil Spring | `dev` |
| DDL automático | `update` (crea/modifica tablas) |
| Logs | DEBUG |
| Swagger UI | Habilitado |

**Iniciar:**
```bash
# Terminal 1 — Backend
cd backend && mvn spring-boot:run -Dspring.profiles.active=dev

# Terminal 2 — Frontend
npm start

# Alternativa Windows
INICIAR_TODO.bat
```

---

### Ambiente 2: Pruebas (Testing)

**Objetivo:** Ejecución de pruebas automatizadas en aislamiento.

| Parámetro | Valor |
|-----------|-------|
| Base de datos | H2 en memoria (`mem:swo_test`) |
| Perfil Spring | `test` |
| DDL automático | `create-drop` (schema nuevo cada ejecución) |
| Datos de prueba | Fixtures/seeds automáticos |
| Logs | WARN |
| JWT | Secreto de prueba estático |

**Archivo:** `src/test/resources/application-test.properties`
```properties
spring.datasource.url=jdbc:h2:mem:swo_test;MODE=MySQL;DB_CLOSE_DELAY=-1
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
logging.level.root=WARN
```

**Ejecutar pruebas:**
```bash
# Backend
cd backend && mvn test

# Frontend
npm run test:coverage

# E2E
npm run e2e:headless
```

---

### Ambiente 3: Producción (Docker)

**Objetivo:** Despliegue estable en contenedores.

| Parámetro | Valor |
|-----------|-------|
| Frontend | Nginx:80 (build optimizado) |
| Backend URL | http://backend:8080/api (red Docker) |
| Base de datos | MySQL:3306 (contenedor persistente) |
| Perfil Spring | `prod` |
| DDL automático | `validate` (solo valida esquema) |
| Logs | WARN/INFO |
| Swagger UI | Deshabilitado (seguridad) |

**Iniciar:**
```bash
docker-compose --env-file .env up -d
```

**Verificar estado:**
```bash
docker-compose ps
docker-compose logs -f
```

### Comparativa de Ambientes

| Característica | Desarrollo | Pruebas | Producción |
|---------------|-----------|---------|-----------|
| Base de Datos | MySQL local | H2 memoria | MySQL Docker |
| Hot reload | ✅ | ❌ | ❌ |
| Swagger UI | ✅ | ✅ | ❌ |
| Logs debug | ✅ | ❌ | ❌ |
| CORS permisivo | ✅ | ✅ | ❌ |
| Datos reales | ❌ | ❌ | ✅ |
| HTTPS | ❌ | ❌ | ✅ (config.) |

---

## 9. Documentación de Módulos y Componentes

### Módulo: Incidencias

**Propósito:** Gestión del ciclo de vida completo de tickets de soporte.

**Datos de Entrada (Request DTO):**

```json
POST /api/v1/incidencias
{
  "titulo": "string (requerido, max 200 chars)",
  "descripcion": "string (requerido, texto libre)",
  "estado": "Abierto | En Progreso | Pendiente | Resuelto | Cerrado | Cancelado",
  "impacto": "Bajo | Medio | Alto | Crítico",
  "ubicacion": "string (opcional, max 100 chars)",
  "idUsuarioReporta": "number (requerido)",
  "idCategoria": "number (opcional)"
}
```

**Datos de Salida (Response DTO):**

```json
{
  "success": true,
  "message": "Incidencia creada exitosamente",
  "data": {
    "idIncidencia": 1,
    "titulo": "Error en login",
    "descripcion": "El botón de login no responde en mobile",
    "estado": "Abierto",
    "impacto": "Alto",
    "ubicacion": "App Mobile",
    "fechaCreacion": "2026-06-02T10:00:00",
    "fechaActualizacion": "2026-06-02T10:00:00",
    "fechaCierre": null,
    "idUsuarioReporta": 3,
    "nombreUsuarioReporta": "Carlos López",
    "idCategoria": 2,
    "nombreCategoria": "Acceso y Autenticación"
  }
}
```

**Transiciones de Estado válidas:**

```
Abierto → En Progreso → Resuelto → Cerrado
Abierto → Cancelado
En Progreso → Pendiente → En Progreso
```

---

### Módulo: Proyectos

**Propósito:** Administración de proyectos y asignación de equipos.

**Datos de Entrada:**

```json
POST /api/v1/proyectos
{
  "nombre": "string (requerido, max 150 chars)",
  "descripcion": "string (opcional)",
  "estado": "ACTIVO | EN_PROGRESO | PAUSADO | FINALIZADO | CANCELADO",
  "prioridad": "BAJA | MEDIA | ALTA | CRÍTICA",
  "fechaInicio": "YYYY-MM-DD",
  "fechaFin": "YYYY-MM-DD"
}
```

**Datos de Salida:**

```json
{
  "idProyecto": 1,
  "nombre": "Migración ERP",
  "descripcion": "Migrar el ERP actual a plataforma cloud",
  "estado": "EN_PROGRESO",
  "prioridad": "ALTA",
  "fechaInicio": "2026-01-15",
  "fechaFin": "2026-12-31",
  "fechaCreacion": "2026-01-10T09:00:00"
}
```

---

### Módulo: Usuarios

**Propósito:** Gestión de cuentas y roles del sistema.

**Roles disponibles:**

| Rol | Permisos |
|-----|---------|
| `ADMIN` | Acceso total al sistema |
| `PROJECT_MANAGER` | Gestionar proyectos y equipos |
| `TECNICO` | Atender y resolver incidencias |
| `USUARIO` | Reportar incidencias propias |

**Datos de Entrada:**

```json
POST /api/v1/usuarios
{
  "nombreCompleto": "string (requerido)",
  "email": "string (requerido, formato email válido)",
  "password": "string (requerido, mín. 8 chars)",
  "rol": "ADMIN | PROJECT_MANAGER | TECNICO | USUARIO"
}
```

---

### Módulo: Chatbot

**Propósito:** Asistente automatizado para soporte de primer nivel.

**Datos de Entrada:**

```json
POST /api/v1/chatbot/mensaje
{
  "idConversacion": "number (null para nueva conversación)",
  "mensaje": "string (requerido)",
  "idUsuario": "number (opcional)"
}
```

**Datos de Salida:**

```json
{
  "idConversacion": 5,
  "respuesta": "Hola! Para reportar una incidencia ve a Incidencias > Nueva Incidencia.",
  "tipo": "bot",
  "timestamp": "2026-06-02T10:05:00"
}
```

---

### Componentes Frontend Reutilizables

| Componente | Selector | Entradas | Salidas |
|-----------|----------|----------|---------|
| `ButtonComponent` | `app-button` | `label`, `type`, `disabled`, `loading` | `clicked` |
| `InputComponent` | `app-input` | `label`, `type`, `control`, `placeholder` | `valueChange` |
| `ModalComponent` | `app-modal` | `title`, `visible`, `size` | `closed`, `confirmed` |
| `SidebarComponent` | `app-sidebar` | `menuItems`, `collapsed` | `menuSelected` |

---

## 10. Patrones de Diseño Implementados

### Repository Pattern (Backend)
Abstrae el acceso a la base de datos. Los servicios solo interactúan con la interfaz del repositorio, no con Hibernate directamente.

```java
// Interfaz del repositorio
public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {
    Page<Incidencia> findByEstado(String estado, Pageable pageable);
    Page<Incidencia> findByUsuarioReporta_IdUsuario(Long idUsuario, Pageable pageable);

    @Query("SELECT i FROM Incidencia i WHERE LOWER(i.titulo) LIKE LOWER(CONCAT('%',:q,'%')) OR LOWER(i.descripcion) LIKE LOWER(CONCAT('%',:q,'%'))")
    Page<Incidencia> buscarPorTexto(@Param("q") String query, Pageable pageable);
}
```

### DTO Pattern
Los datos que entran y salen de la API nunca exponen las entidades JPA directamente.

```
Request HTTP → @Valid RequestDTO → Service → Entity → Repository → BD
BD → Entity → Service → ResponseDTO → JSON Response
```

### Strategy Pattern (Services)
Las interfaces de servicio permiten intercambiar implementaciones sin modificar los controladores.

```java
public interface IncidenciaService {
    IncidenciaResponseDTO crear(IncidenciaRequestDTO dto);
    IncidenciaResponseDTO cambiarEstado(Long id, String nuevoEstado);
    // ...
}

@Service
public class IncidenciaServiceImpl implements IncidenciaService { ... }
```

### Observer Pattern (Frontend — RxJS)
Los servicios Angular retornan `Observable<T>` que los componentes suscriben para reactividad.

```typescript
// Servicio
getIncidencias(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(`${this.apiUrl}/incidencias`);
}

// Componente
ngOnInit() {
    this.incidenciaService.getIncidencias()
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => this.incidencias = data);
}
```

### Global Exception Handler
Un único punto de manejo de errores retorna respuestas JSON estructuradas para todos los errores.

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(ApiResponse.error(ex.getMessage()));
    }
}
```

---

## 11. Seguridad

### CORS (Cross-Origin Resource Sharing)

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/v1/**")
            .allowedOrigins("http://localhost:4200", "http://localhost:80")
            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

### Validación de Entrada

Todas las peticiones POST/PUT usan `@Valid` con anotaciones Bean Validation:

```java
public class IncidenciaRequestDTO {
    @NotBlank(message = "El título es obligatorio")
    @Size(max = 200, message = "El título no puede superar 200 caracteres")
    private String titulo;

    @NotBlank(message = "La descripción es obligatoria")
    private String descripcion;

    @NotNull(message = "El usuario que reporta es obligatorio")
    private Long idUsuarioReporta;
}
```

### JWT Token

- Generación en login → retornado en `Authorization: Bearer <token>`
- Validación en cada petición protegida via `http.interceptor.ts`
- Expiración configurable via `JWT_EXPIRATION_TIME` (default 24h)

---

## 12. Gestión de Errores y Excepciones

### Jerarquía de Excepciones

```
RuntimeException
├── BusinessException           → 422 Unprocessable Entity (regla de negocio)
└── ResourceNotFoundException   → 404 Not Found (recurso no existe)
```

### Respuesta de Error Estándar

```json
{
  "success": false,
  "message": "Incidencia no encontrada con ID: 999",
  "data": null,
  "timestamp": "2026-06-02T10:00:00Z"
}
```

---

## 13. Buenas Prácticas Aplicadas

### Principios SOLID
- **S** — Cada clase tiene una única responsabilidad (Controller, Service, Repository separados)
- **O** — Extensión sin modificación: Interfaces de Service intercambiables
- **L** — Las implementaciones cumplen el contrato de las interfaces
- **I** — Interfaces pequeñas y específicas por módulo
- **D** — Dependencias inyectadas por constructor (`@RequiredArgsConstructor`)

### Código Limpio
- Nombres descriptivos en español para el dominio de negocio
- Métodos cortos con responsabilidad única
- Sin magia de números: constantes con nombre (`ESTADOS_VALIDOS`)
- Logs informativos con SLF4J en operaciones críticas
- `@Transactional(readOnly = true)` en consultas para optimización

### Angular — Buenas Prácticas
- Lazy loading de módulos de features
- `takeUntil(this.destroy$)` para evitar memory leaks en subscripciones
- Smart/Dumb components: lógica en Smart, solo presentación en Dumb
- Tipado estricto TypeScript (no `any`)
- Reactive Forms con validaciones declarativas

---

## 14. Control de Versiones

**Repositorio:** https://github.com/JuanPGE123/SWO  
**Rama principal:** `main`

### Historial de Versiones

| Versión | Fecha | Descripción |
|---------|-------|-------------|
| v1.0.0 | 2026-06-02 | Versión inicial completa |
| v0.9.0 | 2026-05-15 | Backend Spring Boot completo |
| v0.5.0 | 2026-04-01 | Frontend Angular base |

### Workflow de Git

```bash
# 1. Crear rama de feature
git checkout -b feature/modulo-reportes

# 2. Desarrollar y commitear
git add src/app/features/reports/
git commit -m "feat: agregar generación de reportes PDF"

# 3. Subir y crear Pull Request
git push origin feature/modulo-reportes

# 4. Merge a main via Pull Request (revisión obligatoria)
```

---

## 15. Generación de Artefactos Ejecutables

### Backend — JAR Ejecutable

```bash
cd backend
mvn clean package -DskipTests -Pprod

# Artefacto: backend/target/swo-api-1.0.0.jar
# Tamaño esperado: ~45 MB (fat JAR con Tomcat embebido)

# Ejecutar
java -Dspring.profiles.active=prod \
     -DSPRING_DATASOURCE_URL=jdbc:mysql://host:3306/swo_prod \
     -jar target/swo-api-1.0.0.jar
```

### Frontend — Build de Producción

```bash
npm run build:prod

# Artefacto: dist/swo-servicedesk/
# Archivos generados:
#   - index.html
#   - main.[hash].js   (bundle principal, minificado)
#   - polyfills.[hash].js
#   - styles.[hash].css
```

### Docker — Imagen Multi-Stage

```bash
# Construir imagen completa (frontend + backend + nginx)
docker build -t swo-app:1.0.0 .

# Tamaño esperado: ~250 MB (Eclipse Temurin 17 JRE slim)

# Ejecutar contenedor
docker run -d \
  -p 80:80 -p 8080:8080 \
  -e DB_HOST=host.docker.internal \
  -e DB_USER=swo_prod \
  -e DB_PASSWORD=password \
  --name swo-app \
  swo-app:1.0.0
```

### Scripts Disponibles

| Script | Plataforma | Descripción |
|--------|-----------|-------------|
| `build.bat` | Windows | Build completo frontend + backend |
| `build.sh` | Linux/Mac | Build completo frontend + backend |
| `INICIAR_TODO.bat` | Windows | Inicia frontend + backend en desarrollo |
| `docker-compose up -d` | Todos | Inicia stack completo en Docker |

---

*Manual Técnico — SWO Service Desk v1.0.0 — SENA 2026*
