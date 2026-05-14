# 📊 Resumen Ejecutivo — APIs REST SWO

## Endpoints Implementados (24 en total)

### 👤 Módulo Usuarios (8 endpoints)

| # | Endpoint | Método | Descripción | Códigos HTTP |
|---|----------|--------|-------------|--------------|
| 1 | `/v1/usuarios` | `GET` | Listar todos los usuarios | 200 |
| 2 | `/v1/usuarios/activos` | `GET` | Listar usuarios activos | 200 |
| 3 | `/v1/usuarios/{id}` | `GET` | Obtener usuario por ID | 200, 404 |
| 4 | `/v1/usuarios/correo/{correo}` | `GET` | Obtener usuario por correo | 200, 404 |
| 5 | `/v1/usuarios` | `POST` | Crear nuevo usuario | 201, 400, 409 |
| 6 | `/v1/usuarios/{id}` | `PUT` | Actualizar usuario | 200, 400, 404 |
| 7 | `/v1/usuarios/{id}/desactivar` | `PATCH` | Desactivar usuario (soft delete) | 200, 404 |
| 8 | `/v1/usuarios/{id}` | `DELETE` | Eliminar usuario permanentemente | 204, 404 |

### 🎫 Módulo Incidencias (9 endpoints)

| # | Endpoint | Método | Descripción | Códigos HTTP |
|---|----------|--------|-------------|--------------|
| 9 | `/v1/incidencias` | `GET` | Listar todas las incidencias (paginado) | 200 |
| 10 | `/v1/incidencias/estado/{estado}` | `GET` | Filtrar por estado (paginado) | 200, 400 |
| 11 | `/v1/incidencias/usuario/{idUsuario}` | `GET` | Incidencias de un usuario (paginado) | 200 |
| 12 | `/v1/incidencias/buscar?q={texto}` | `GET` | Búsqueda de texto libre | 200 |
| 13 | `/v1/incidencias/{id}` | `GET` | Obtener incidencia por ID | 200, 404 |
| 14 | `/v1/incidencias` | `POST` | Crear nueva incidencia | 201, 400, 404 |
| 15 | `/v1/incidencias/{id}` | `PUT` | Actualizar incidencia | 200, 400, 404 |
| 16 | `/v1/incidencias/{id}/estado` | `PATCH` | Cambiar estado de incidencia | 200, 400, 404 |
| 17 | `/v1/incidencias/{id}` | `DELETE` | Eliminar incidencia | 204, 404 |

### 🏷️ Módulo Categorías (7 endpoints)

| # | Endpoint | Método | Descripción | Códigos HTTP |
|---|----------|--------|-------------|--------------|
| 18 | `/v1/categorias` | `GET` | Listar todas las categorías | 200 |
| 19 | `/v1/categorias/activas` | `GET` | Listar categorías activas | 200 |
| 20 | `/v1/categorias/{id}` | `GET` | Obtener categoría por ID | 200, 404 |
| 21 | `/v1/categorias` | `POST` | Crear nueva categoría | 201, 400, 409 |
| 22 | `/v1/categorias/{id}` | `PUT` | Actualizar categoría | 200, 400, 404, 409 |
| 23 | `/v1/categorias/{id}/desactivar` | `PATCH` | Desactivar categoría (soft delete) | 200, 404 |
| 24 | `/v1/categorias/{id}` | `DELETE` | Eliminar categoría permanentemente | 204, 404 |

---

## 🏗️ Arquitectura Implementada

```
backend/
├── pom.xml                          ← Spring Boot 3.2.4 + MySQL + OpenAPI
└── src/main/
    ├── resources/
    │   └── application.yml          ← Config BD, CORS, Swagger
    └── java/com/swo/api/
        ├── SwoApiApplication.java   ← Punto de entrada
        ├── config/
        │   ├── CorsConfig.java      ← Permite localhost:4200
        │   ├── SecurityConfig.java  ← BCrypt + endpoints públicos
        │   └── OpenApiConfig.java   ← Swagger metadata
        ├── model/
        │   ├── entity/              ← Usuario, Incidencia, Categoria (JPA)
        │   └── dto/
        │       ├── request/         ← DTOs validados (@Valid)
        │       └── response/        ← DTOs sin datos sensibles
        ├── common/
        │   └── ApiResponse.java     ← Envelope genérico <T>
        ├── repository/              ← JpaRepository + queries JPQL
        ├── service/
        │   ├── UsuarioService.java
        │   ├── IncidenciaService.java
        │   ├── CategoriaService.java
        │   └── impl/                ← Implementaciones @Transactional
        ├── controller/              ← @RestController + @Operation
        └── exception/
            ├── ResourceNotFoundException.java  → HTTP 404
            ├── BusinessException.java         → HTTP 409
            └── GlobalExceptionHandler.java    ← @RestControllerAdvice
```

---

## ⚙️ Tecnologías y Dependencias

| Componente | Versión | Propósito |
|------------|---------|-----------|
| **Java** | 17 | Lenguaje base |
| **Spring Boot** | 3.2.4 | Framework backend |
| **Spring Data JPA** | 3.2.x | Persistencia ORM |
| **Spring Security** | 6.x | BCrypt para passwords |
| **MySQL Connector** | 8.0.33 | Driver de BD |
| **Springdoc OpenAPI** | 2.3.0 | Swagger UI / documentación |
| **Lombok** | 1.18.32 | Reducción de boilerplate |
| **Jakarta Validation** | 3.x | @Valid, @NotBlank, @Pattern |

---

## 🚀 Inicio Rápido

### 1. Requisitos Previos
- Java 17+ instalado
- Maven 3.8+
- MySQL 8.0 corriendo en `localhost:3306`
- Base de datos `swo_db` creada (ejecutar `java/swo_database.sql`)

### 2. Configurar Conexión BD

Editar `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/swo_db?useSSL=false
    username: root
    password: tu_password_mysql
```

### 3. Compilar y Ejecutar

```bash
# Desde la carpeta backend/
mvn clean install
mvn spring-boot:run

# La API estará disponible en: http://localhost:8081/api
# Swagger UI: http://localhost:8081/api/swagger-ui.html
```

### 4. Probar con cURL

```bash
# Listar usuarios
curl http://localhost:8081/api/v1/usuarios

# Crear usuario
curl -X POST http://localhost:8081/api/v1/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nombreCompleto": "Test User",
    "correo": "test@swo.com",
    "password": "Segura@2026",
    "rol": "Usuario",
    "telefono": "+573001234567",
    "departamento": "TI"
  }'
```

---

## 📖 Documentación Completa

Ver [API_DOCUMENTATION.md](API_DOCUMENTATION.md) para:
- Descripción detallada de cada endpoint
- Ejemplos de request/response con todos los campos
- Códigos de error y manejo de excepciones
- Ejemplos de integración con Angular 17
- Guía de autenticación y seguridad (roadmap)

---

## 🔐 Seguridad

### Estado Actual
- ✅ Contraseñas hasheadas con BCrypt (factor 12)
- ✅ CORS configurado para Angular
- ✅ Validación de entrada con Bean Validation
- ✅ Manejo global de excepciones
- 🔴 Endpoints públicos (sin JWT)

### Roadmap de Producción
- [ ] Implementar JWT (JSON Web Tokens)
- [ ] Autorización basada en roles (RBAC)
- [ ] HTTPS obligatorio
- [ ] Rate limiting

---

## 📊 Características Destacadas

✅ **CRUD completo** para 3 entidades principales  
✅ **Paginación** automática en listados de incidencias  
✅ **Soft delete** para usuarios y categorías (preserva historial)  
✅ **Validación automática** de datos con mensajes en español  
✅ **Respuestas JSON consistentes** con envelope `ApiResponse<T>`  
✅ **Documentación interactiva** con Swagger UI  
✅ **Búsqueda de texto** en incidencias (título + descripción)  
✅ **Filtros múltiples** (estado, usuario, categoría)  
✅ **Logs estructurados** con SLF4J/Logback  

---

## 🐛 Manejo de Errores

Todos los errores retornan JSON estructurado:

```json
{
  "success": false,
  "code": 404,
  "message": "Usuario no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-12T14:30:00"
}
```

| Código | Tipo de Error | Ejemplo |
|--------|---------------|---------|
| **400** | Bad Request | Datos inválidos o faltantes |
| **404** | Not Found | Recurso no encontrado por ID |
| **409** | Conflict | Correo duplicado, nombre de categoría existente |
| **500** | Server Error | Error inesperado del servidor |

---

## 📝 Git y Versionamiento

Ver [GIT_GUIDE.md](GIT_GUIDE.md) para:
- Comandos de inicialización de repositorio
- Flujo GitFlow con ramas feature/fix/hotfix
- **8 commits de ejemplo** con Conventional Commits
- Historial realista de desarrollo del backend

### Ejemplo de commits del proyecto:

```bash
chore(backend): bootstrap Spring Boot 3.2 module with JPA and Security
feat(entities): add JPA entities for Usuario, Incidencia and Categoria
feat(dto): add request/response DTOs and ApiResponse wrapper
feat(repository): add JPA repositories with custom queries
feat(service): implement business services with BCrypt password hashing
feat(controller): add REST controllers with full CRUD and OpenAPI annotations
feat(config): configure CORS, Security, OpenAPI and GlobalExceptionHandler
chore: update .gitignore for Spring Boot, Angular, IntelliJ and VS Code
```

---

## 🧪 Testing (Próximos pasos)

Pendiente de implementación:
- Unit tests con JUnit 5 + Mockito
- Integration tests con @SpringBootTest
- Tests de API con REST Assured
- Cobertura mínima objetivo: 80%

---

## 📞 Contacto y Soporte

- **Email:** dev@swo.com
- **Swagger UI:** http://localhost:8081/api/swagger-ui.html
- **Sistema interno:** http://localhost:4200

---

**Versión:** 1.0.0  
**Última actualización:** 12 de mayo de 2026  
**Autor:** Equipo de Desarrollo SWO
