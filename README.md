# SWO — Sistema de Gestión de Incidencias (Service Desk)

> **SENA — Tecnología en Análisis y Desarrollo de Software**  
> Proyecto Formativo — Análisis y Desarrollo de Software

---

## Sistema en producción

| Componente | URL | Estado |
|------------|-----|--------|
| **Frontend (Angular)** | https://juanpge123.github.io/SWO/ | ✅ Activo |
| **Backend API (Spring Boot)** | https://swo-production.up.railway.app/api | ✅ Activo |
| **Documentación API (Swagger)** | https://swo-production.up.railway.app/api/swagger-ui.html | ✅ Activo |
| **Repositorio** | https://github.com/JuanPGE123/SWO | ✅ Público |

---

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Arquitectura](#arquitectura)
- [Módulos del Sistema](#módulos-del-sistema)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Variables de Entorno](#variables-de-entorno)
- [API REST — Endpoints](#api-rest--endpoints)
- [Pruebas](#pruebas)
- [Despliegue](#despliegue)
- [Control de Versiones](#control-de-versiones)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Documentación del Proyecto](#documentación-del-proyecto)

---

## Descripción del Proyecto

**SWO** es un sistema web de Service Desk para la gestión integral de incidencias tecnológicas. Permite a los usuarios reportar problemas, hacer seguimiento del estado de sus tickets, administrar proyectos y gestionar el equipo técnico, con soporte de un chatbot de asistencia.

**Características principales:**
- Registro y seguimiento de incidencias (tickets)
- Gestión de proyectos y asignación de equipos
- Administración de usuarios y roles
- Reportes y estadísticas en tiempo real
- Chatbot de soporte automatizado
- Dashboard ejecutivo con métricas clave

---

## Arquitectura

El sistema sigue una arquitectura de **tres capas** con separación clara entre frontend, backend y base de datos:

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE (Browser)                       │
│          Angular 17 SPA — GitHub Pages (producción)             │
└─────────────────────────────┬───────────────────────────────────┘
                              │ HTTPS / REST (JSON)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Spring Boot 3.2.4)                  │
│         API REST — Railway  /api/v1/**                          │
│                                                                 │
│   Controller → Service → Repository → Entity → MySQL           │
└─────────────────────────────┬───────────────────────────────────┘
                              │ JDBC / JPA (HikariCP)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BASE DE DATOS                               │
│             MySQL 8.0 — Railway (managed)                       │
└─────────────────────────────────────────────────────────────────┘
```

**Patrones de diseño aplicados:**
- Repository Pattern (acceso a datos)
- Dependency Injection (Spring / Angular)
- DTO Pattern (transferencia de datos)
- Strategy Pattern (servicios intercambiables)
- Observer Pattern (RxJS en Angular)
- Global Exception Handler
- Smart / Dumb Components (Angular)

---

## Módulos del Sistema

| Módulo | Descripción | Frontend | Backend |
|--------|-------------|----------|---------|
| **Auth** | Autenticación y autorización | `features/auth` | `/v1/login` |
| **Dashboard** | Panel de control con métricas | `features/dashboard` | `/v1/incidencias` |
| **Incidencias** | CRUD completo de tickets | `features/incidents` | `/v1/incidencias` |
| **Proyectos** | Gestión de proyectos y asignaciones | `features/projects` | `/v1/proyectos` |
| **Usuarios** | Administración de usuarios y roles | `features/users` | `/v1/usuarios` |
| **Categorías** | Clasificación de incidencias | Integrado | `/v1/categorias` |
| **Chatbot** | Asistente virtual de soporte | `features/chatbot` | `/v1/chatbot` |
| **Reportes** | Generación de reportes PDF/Excel | `features/reports` | `/v1/reportes` |

---

## Stack Tecnológico

### Frontend
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| Angular | 17.0+ | Framework SPA |
| TypeScript | 5.2 | Lenguaje de programación |
| RxJS | 7.8 | Programación reactiva |
| jsPDF | 4.2 | Generación de PDFs |
| Jasmine/Karma | 5.1/6.4 | Pruebas unitarias |
| Cypress | 13.6 | Pruebas E2E |

### Backend
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| Java | 17 LTS | Lenguaje de programación |
| Spring Boot | 3.2.4 | Framework principal |
| Spring Data JPA | 3.2.4 | ORM y acceso a datos |
| Spring Security | 3.2.4 | Autenticación/Autorización |
| Springdoc OpenAPI | 2.3.0 | Documentación API Swagger |
| JUnit 5 | 5.10 | Framework de pruebas |
| Mockito | 5.3.1 | Mocks para pruebas unitarias |
| JaCoCo | 0.8.10 | Cobertura de código (mín. 45%) |

### Base de Datos
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| MySQL | 8.0 | Base de datos relacional |
| HikariCP | — | Pool de conexiones |

### Infraestructura
| Tecnología | Hosting | Propósito |
|-----------|---------|-----------|
| GitHub Pages | github.io | Frontend SPA |
| Railway | railway.app | Backend + MySQL gestionado |
| Docker | — | Contenedorización (local) |
| Docker Compose | — | Orquestación local |
| Nginx | — | Reverse proxy (Docker) |
| Maven | — | Gestión de dependencias Java |
| npm | — | Gestión de dependencias JS |

---

## Requisitos Previos

### Opción A — Con Docker (Recomendado para local)
- Docker Desktop 24+
- Docker Compose 3.9+

### Opción B — Sin Docker
- Java 17 LTS (OpenJDK o Eclipse Temurin)
- Node.js 18+ y npm 9+
- MySQL 8.0+
- Maven 3.8+
- Angular CLI 17+: `npm install -g @angular/cli@17`

---

## Instalación y Ejecución

### Con Docker Compose

```bash
# 1. Clonar el repositorio
git clone https://github.com/JuanPGE123/SWO.git
cd SWO

# 2. Iniciar todos los servicios
docker-compose up -d

# 3. Verificar que los servicios están corriendo
docker-compose ps

# 4. Ver logs del backend
docker-compose logs swo-backend -f
```

**URLs disponibles con Docker:**

| Servicio | URL |
|----------|-----|
| Frontend (Angular) | http://localhost:80 |
| Backend (API REST) | http://localhost:8080/api |
| Swagger UI | http://localhost:8080/api/swagger-ui.html |
| phpMyAdmin | http://localhost:8090 (perfil dev) |

---

### Sin Docker — Desarrollo Local

#### 1. Base de datos MySQL

```sql
CREATE DATABASE IF NOT EXISTS swo_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

Ejecutar el script de tablas:
```bash
mysql -u root -p swo_db < java/swo_database.sql
```

#### 2. Backend (Spring Boot)

```bash
cd backend

# Opción Maven Wrapper
./mvnw spring-boot:run

# Opción Maven instalado
mvn spring-boot:run

# Opción JAR compilado
mvn clean package -DskipTests
java -jar target/swo-api-1.0.0.jar
```

Backend disponible en: `http://localhost:8081/api`  
Swagger local: `http://localhost:8081/api/swagger-ui.html`

#### 3. Frontend (Angular)

```bash
# Desde la raíz del proyecto
npm install
npm start
# Disponible en: http://localhost:4200
```

#### Credenciales de acceso (desarrollo)

| Correo | Contraseña | Rol |
|--------|-----------|-----|
| `admin@swo.com` | (ver DataInitializer) | Administrador |

---

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | URL JDBC completa de MySQL | `jdbc:mysql://host:3306/swo_db` |
| `DATABASE_USER` | Usuario de la base de datos | `root` |
| `DATABASE_PASSWORD` | Contraseña de la base de datos | `secreto` |
| `SPRING_PROFILES_ACTIVE` | Perfil activo de Spring | `prod` |
| `PORT` | Puerto del servidor (Railway lo asigna) | `8080` |
| `JAVA_OPTS` | Opciones JVM | `-Xmx512m -Xms256m` |

> Las variables de producción se configuran directamente en Railway. Ver guía completa en [DESPLIEGUE.md](DESPLIEGUE.md).

---

## API REST — Endpoints

La documentación interactiva completa está disponible en Swagger UI:

- **Producción:** https://swo-production.up.railway.app/api/swagger-ui.html
- **Local:** http://localhost:8081/api/swagger-ui.html

### Resumen de Endpoints

| Módulo | Método | Endpoint | Descripción |
|--------|--------|----------|-------------|
| **Auth** | POST | `/v1/login` | Autenticar usuario |
| **Incidencias** | GET | `/v1/incidencias` | Listar todas (paginado) |
| | GET | `/v1/incidencias/{id}` | Obtener por ID |
| | GET | `/v1/incidencias/estado/{estado}` | Filtrar por estado |
| | GET | `/v1/incidencias/usuario/{id}` | Por usuario |
| | GET | `/v1/incidencias/buscar?q=texto` | Búsqueda libre |
| | POST | `/v1/incidencias` | Crear incidencia |
| | PUT | `/v1/incidencias/{id}` | Actualizar incidencia |
| | PATCH | `/v1/incidencias/{id}/estado` | Cambiar estado |
| | DELETE | `/v1/incidencias/{id}` | Eliminar incidencia |
| **Proyectos** | GET | `/v1/proyectos` | Listar proyectos |
| | GET | `/v1/proyectos/{id}` | Obtener proyecto |
| | POST | `/v1/proyectos` | Crear proyecto |
| | POST | `/v1/proyectos/asignar-usuario` | Asignar usuario a proyecto |
| | PUT | `/v1/proyectos/{id}` | Actualizar proyecto |
| | DELETE | `/v1/proyectos/{id}` | Eliminar proyecto |
| **Usuarios** | GET | `/v1/usuarios` | Listar usuarios |
| | GET | `/v1/usuarios/activos` | Listar usuarios activos |
| | GET | `/v1/usuarios/{id}` | Obtener usuario |
| | POST | `/v1/usuarios` | Crear usuario |
| | PUT | `/v1/usuarios/{id}` | Actualizar usuario |
| | PATCH | `/v1/usuarios/{id}/desactivar` | Desactivar (soft delete) |
| | DELETE | `/v1/usuarios/{id}` | Eliminar permanentemente |
| **Categorías** | GET | `/v1/categorias` | Listar categorías |
| | POST | `/v1/categorias` | Crear categoría |
| | PUT | `/v1/categorias/{id}` | Actualizar categoría |
| | DELETE | `/v1/categorias/{id}` | Eliminar categoría |
| **Chatbot** | POST | `/v1/chatbot/consulta` | Enviar consulta al chatbot |
| | POST | `/v1/chatbot/escalar` | Escalar a incidencia |

### Formato de Respuesta

Todas las respuestas siguen el formato estándar `ApiResponse<T>`:

```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": { ... },
  "timestamp": "2026-06-07T10:00:00"
}
```

**Códigos HTTP utilizados:**

| Código | Significado |
|--------|-------------|
| `200 OK` | Operación exitosa |
| `201 Created` | Recurso creado |
| `400 Bad Request` | Datos de entrada inválidos o regla de negocio violada |
| `401 Unauthorized` | No autenticado o credenciales incorrectas |
| `404 Not Found` | Recurso no encontrado |
| `500 Internal Server Error` | Error del servidor |

---

## Pruebas

**Resumen:** 76 pruebas totales — 100% exitosas

| Tipo | Framework | Total | Resultado |
|------|-----------|-------|-----------|
| Unitarias backend | JUnit 5 + Mockito | 44 | ✅ 44/44 |
| Unitarias frontend | Jasmine/Karma | 32 | ✅ 32/32 |
| E2E | Cypress | 1 suite | ✅ Pass |

### Ejecutar pruebas unitarias — Backend

```bash
cd backend

# Ejecutar todas las pruebas
mvn test

# Con reporte de cobertura JaCoCo
mvn test jacoco:report
# Reporte en: backend/target/site/jacoco/index.html
```

### Ejecutar pruebas unitarias — Frontend

```bash
# Modo CI (sin ventana de navegador)
npx ng test --no-watch

# Con reporte de cobertura
npx ng test --no-watch --code-coverage
# Reporte en: coverage/swo-servicedesk/index.html
```

### Ejecutar pruebas E2E — Cypress

```bash
# Modo headless
npx cypress run

# Modo interactivo
npx cypress open
```

Ver resultados completos en [INFORME_PRUEBAS.md](INFORME_PRUEBAS.md).

---

## Despliegue

### URLs del sistema desplegado

| Capa | URL | Hosting |
|------|-----|---------|
| **Frontend** | https://juanpge123.github.io/SWO/ | GitHub Pages |
| **Backend API** | https://swo-production.up.railway.app/api | Railway |
| **Swagger UI** | https://swo-production.up.railway.app/api/swagger-ui.html | Railway |
| **Base de datos** | MySQL 8 gestionado por Railway | Railway |

### Despliegue del frontend (GitHub Pages)

```bash
# 1. Generar build de producción
npx ng build --configuration production --base-href /SWO/

# 2. Publicar en rama gh-pages
npx gh-pages -d dist/swo-servicedesk
```

### Despliegue del backend (Railway)

Railway detecta automáticamente el `railway.json` y construye desde el `backend/Dockerfile`.

**Variables de entorno requeridas en Railway:**

| Variable | Valor |
|----------|-------|
| `DATABASE_URL` | `jdbc:mysql://${{MySQL.MYSQL_HOST}}:${{MySQL.MYSQL_PORT}}/${{MySQL.MYSQLDATABASE}}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC` |
| `DATABASE_USER` | `${{MySQL.MYSQL_USER}}` |
| `DATABASE_PASSWORD` | `${{MySQL.MYSQL_PASSWORD}}` |
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `JAVA_OPTS` | `-Xmx512m -Xms256m` |

### Archivos ejecutables

| Artefacto | Ruta | Descripción |
|-----------|------|-------------|
| Backend JAR | `backend/target/swo-api-1.0.0.jar` | Fat-JAR ejecutable Spring Boot |
| Frontend build | `dist/swo-servicedesk/` | Build de producción Angular |
| Dockerfile | `backend/Dockerfile` | Imagen Docker del backend |
| Docker Compose | `docker-compose.yml` | Orquestación completa local |

### Generar artefactos

```bash
# Backend — genera JAR ejecutable
cd backend && mvn clean package -DskipTests

# Frontend — genera build de producción
npx ng build --configuration production --base-href /SWO/
```

Ver guía completa de despliegue en [DESPLIEGUE.md](DESPLIEGUE.md).

---

## Control de Versiones

**Repositorio:** https://github.com/JuanPGE123/SWO  
**Rama principal:** `main`  
**Rama de despliegue frontend:** `gh-pages`

### Convención de commits

```
feat:     Nueva funcionalidad
fix:      Corrección de error
docs:     Cambios en documentación
refactor: Refactorización de código
test:     Agregar o actualizar pruebas
chore:    Tareas de mantenimiento
```

### Commits recientes

| Hash | Descripción |
|------|-------------|
| `f9366d0` | feat: cambiar clave admin, jefes, 13 roles, validaciones, chatbot expandido |
| `02f0718` | fix: todos los bugs Railway, DELETE 200, INC-undefined, N+1, HikariCP |
| `7b260d1` | fix: cascada DELETE usuarios/proyectos + chatbot GET + URL doble v1 |
| `5be9aed` | audit: corregir endpoints faltantes, pool hikari, N+1, reportes y login |
| `d64911a` | fix: ddl-auto update para persistir datos + DataInitializer admin |

---

## Estructura del Proyecto

```
SWO/
├── backend/                          # Spring Boot API REST
│   └── src/
│       ├── main/java/com/swo/api/
│       │   ├── controller/           # 7 Controladores REST
│       │   ├── service/              # Servicios + implementaciones
│       │   ├── repository/           # Repositorios JPA (7)
│       │   ├── model/
│       │   │   ├── entity/           # Entidades JPA (7)
│       │   │   └── dto/              # DTOs request / response
│       │   ├── config/               # SecurityConfig, CorsConfig, OpenAPI
│       │   └── exception/            # GlobalExceptionHandler
│       └── test/                     # 44 pruebas unitarias
├── src/                              # Angular 17 Frontend
│   └── app/
│       ├── core/                     # Servicios, guards, interceptores, modelos
│       ├── shared/                   # Componentes reutilizables (button, modal...)
│       └── features/                 # Módulos funcionales
│           ├── auth/                 # Login
│           ├── dashboard/            # Panel de métricas
│           ├── incidents/            # Gestión de incidencias
│           ├── projects/             # Gestión de proyectos
│           ├── users/                # Gestión de usuarios
│           ├── chatbot/              # Asistente virtual
│           └── reports/              # Reportes PDF/Excel
├── cypress/                          # Pruebas E2E
├── java/                             # Scripts SQL de base de datos
├── dist/                             # Build frontend (generado)
├── Dockerfile                        # Imagen multi-stage (build + runtime)
├── docker-compose.yml                # Orquestación local completa
├── railway.json                      # Configuración Railway
├── angular.json                      # Config Angular CLI
├── package.json                      # Dependencias npm
└── backend/pom.xml                   # Dependencias Maven
```

---

## Documentación del Proyecto

| Documento | Descripción |
|-----------|-------------|
| [ACTA_APROBACION_REQUERIMIENTOS.md](ACTA_APROBACION_REQUERIMIENTOS.md) | Acta formal de aprobación de requerimientos (RF-01 a RF-04) |
| [DOCUMENTACION_MODULOS.md](DOCUMENTACION_MODULOS.md) | Documentación por módulo: datos de entrada/salida, servicios, componentes |
| [INFORME_PRUEBAS.md](INFORME_PRUEBAS.md) | Resultados de pruebas, configuración de servidores y ambientes |
| [MANUAL_TECNICO.md](MANUAL_TECNICO.md) | Manual técnico: instalación, arquitectura, seguridad, despliegue |
| [DESPLIEGUE.md](DESPLIEGUE.md) | URLs desplegadas, archivos ejecutables, guía Railway y GitHub Pages |

---

## Autores

| Nombre | Rol |
|--------|-----|
| Juan Pablo Giraldo E. | Desarrollador Full Stack — SENA ADS |

---

*SWO ServiceDesk v1.0.0 · SENA — Análisis y Desarrollo de Software · Junio 2026*
