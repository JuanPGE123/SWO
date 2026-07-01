# SWO — Sistema de Gestión de Incidencias

## ¿Qué es?

Plataforma web tipo Service Desk para gestión de tickets/incidencias de TI. Permite reportar, asignar, escalar y resolver incidencias, gestionar proyectos y equipos, y generar reportes. Incluye chatbot de soporte con IA.

**Organización:** SENA — Tecnología en Análisis y Desarrollo de Software  
**Autor:** Juan Pablo Giraldo E.  
**Versión:** 1.0.0  
**Estado:** Producción

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Angular 17, TypeScript 5.2, RxJS 7.8 |
| Backend | Java 17, Spring Boot 3.2.4, Spring Security, Spring Data JPA |
| Base de datos | MySQL 8.0, HikariCP (pooling) |
| Servidor web | Nginx (Alpine) |
| Testing | JUnit 5 + Mockito (backend), Jasmine/Karma (frontend), Cypress (E2E) |
| Contenedores | Docker, Docker Compose |
| Deploy | Railway (backend + MySQL), GitHub Pages (frontend) |
| Docs API | Springdoc OpenAPI / Swagger |

---

## Módulos Principales

| Módulo | Descripción | Ruta Frontend | Endpoint Base |
|--------|-------------|---------------|---------------|
| Auth | Login, sesión, guards | `features/auth` | `POST /v1/login` |
| Dashboard | KPIs y métricas ejecutivas | `features/dashboard` | `/v1/incidencias` |
| Incidencias | CRUD completo, ciclo de vida del ticket | `features/incidents` | `/v1/incidencias` |
| Proyectos | Gestión de proyectos y asignaciones | `features/projects` | `/v1/proyectos` |
| Usuarios | Administración y roles | `features/users` | `/v1/usuarios` |
| Categorías | Clasificación de incidencias | Integrado | `/v1/categorias` |
| Chatbot | Asistente IA, escalamiento a ticket | `features/chatbot` | `/v1/chatbot` |
| Reportes | Generación PDF/Excel | `features/reports` | `/v1/reportes` |

---

## Autenticación y Roles

**Tipo:** Sesión basada en token (almacenado en `sessionStorage`)

**Flujo:** Login → validación backend (BCrypt) → token en sesión → `AuthGuard` protege rutas → interceptor HTTP agrega headers.

**Roles:**
- `Administrador` — acceso total
- `Jefe` — gestión y supervisión
- `Soporte` — asignación de tickets
- `Técnico` — resolución técnica
- `Usuario` — reporte de incidencias

---

## Base de Datos — Entidades Principales

```
usuarios          → roles, credenciales
empleados         → info personal vinculada a usuario
incidencias       → tickets/solicitudes
categorias        → clasificación (Hardware, Software, Red…)
prioridades       → Crítica, Alta, Media, Baja, Planificada
asignaciones      → asignación de tickets a soporte
proyectos         → agrupación de trabajo
comentarios       → historial en incidencias
archivos_adjuntos → adjuntos en tickets
chatbot_*         → conversaciones y mensajes
notificaciones    → alertas de usuario
logs_actividad    → auditoría
```

---

## API REST

**Base:** `/api/v1`  
**Respuesta estándar:**
```json
{
  "success": true,
  "message": "...",
  "data": {},
  "timestamp": "2026-06-27T10:00:00"
}
```

**Endpoints clave:**
```
POST   /v1/login
GET    /v1/incidencias
POST   /v1/incidencias
PATCH  /v1/incidencias/{id}/estado
GET    /v1/usuarios
GET    /v1/proyectos
POST   /v1/chatbot/consulta
POST   /v1/chatbot/escalar
GET    /v1/reportes
```

**Swagger:**
- Producción: `https://swo-production.up.railway.app/api/swagger-ui.html`
- Local: `http://localhost:8081/api/swagger-ui.html`

---

## Estructura de Directorios

```
SWO/
├── src/                          # Frontend Angular
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/           # AuthGuard
│   │   │   ├── interceptors/     # HTTP interceptor
│   │   │   ├── services/         # auth, incidents, users, projects, chatbot…
│   │   │   └── models/           # DTOs, enums, constantes
│   │   ├── features/             # Módulos de negocio
│   │   └── shared/               # Componentes reutilizables
│   └── environments/             # environment.ts / environment.prod.ts
├── backend/                      # Spring Boot
│   └── src/main/java/com/swo/api/
│       ├── controller/           # 7 controladores REST
│       ├── service/impl/         # Lógica de negocio
│       ├── repository/           # JPA repositories
│       ├── model/entity/         # Entidades JPA
│       ├── config/               # Security, CORS, OpenAPI, DataInitializer
│       └── exception/            # GlobalExceptionHandler
├── java/                         # Scripts SQL
│   ├── swo_database.sql          # Schema completo con datos
│   └── chatbot_data.sql
├── cypress/                      # Tests E2E
├── Dockerfile                    # Multi-stage (frontend + backend)
├── Dockerfile.frontend           # Solo frontend (Railway)
├── backend/Dockerfile            # Solo backend
├── docker-compose.yml            # Orquestación local
├── railway.json                  # Config deploy Railway
└── SWO_API_Postman_Collection.json
```

---

## Despliegue

### Producción
| Componente | Plataforma | URL |
|-----------|-----------|-----|
| Frontend | GitHub Pages | `https://juanpge123.github.io/SWO/` |
| Backend | Railway | `https://swo-production.up.railway.app/api` |
| DB | Railway MySQL | Gestionada por Railway |

### Local con Docker
```bash
docker-compose up -d
# Frontend: http://localhost
# Backend:  http://localhost:8080/api
# Swagger:  http://localhost:8080/api/swagger-ui.html
# phpMyAdmin: http://localhost:8888
```

### Local sin Docker
```bash
# DB: MySQL 8.0 con java/swo_database.sql
cd backend && mvn spring-boot:run   # puerto 8081
npm start                           # puerto 4200
```

---

## Testing

| Tipo | Framework | Tests | Estado |
|------|-----------|-------|--------|
| Unitario backend | JUnit 5 + Mockito | 44 | Pasan |
| Unitario frontend | Jasmine/Karma | 32 | Pasan |
| E2E | Cypress | varios specs | Pasan |

```bash
# Backend
mvn test

# Frontend
npm run test:ci
npm run test:coverage

# E2E
npx cypress run
npx cypress open
```

---

## Variables de Entorno (Railway)

```env
DATABASE_URL       = jdbc:mysql://host:port/db?useSSL=false&...
DATABASE_USER      = usuario
DATABASE_PASSWORD  = contraseña
SPRING_PROFILES_ACTIVE = prod
JAVA_OPTS          = -Xmx512m -Xms256m
```

---

## Repositorio

- **GitHub:** `https://github.com/JuanPGE123/SWO`
- **Rama principal:** `main`
- **Rama frontend deploy:** `gh-pages`
- **Convención commits:** `feat:` / `fix:` / `docs:` / `refactor:` / `test:` / `chore:`
