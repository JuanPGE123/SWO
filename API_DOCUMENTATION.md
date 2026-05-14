# 📘 SWO API — Documentación de Servicios REST

**Sistema de Gestión Completo (SWO)**  
**Versión:** 2.0.0  
**Base URL:** `http://localhost:8081/api`  
**Swagger UI:** `http://localhost:8081/api/swagger-ui.html`  

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Uso con Postman](#-uso-con-postman)
3. [Formato de Respuestas](#formato-de-respuestas)
4. [Códigos de Estado HTTP](#códigos-de-estado-http)
5. [Módulo: Usuarios](#módulo-usuarios)
6. [Módulo: Incidencias](#módulo-incidencias)
7. [Módulo: Categorías](#módulo-categorías)
8. [Módulo: Proyectos](#módulo-proyectos) ⭐ NUEVO
9. [Módulo: Chatbot](#módulo-chatbot) ⭐ NUEVO
10. [Autenticación y Seguridad](#autenticación-y-seguridad)
11. [Manejo de Errores](#manejo-de-errores)
12. [Ejemplos de Integración Angular](#ejemplos-de-integración-angular)

---

## 🚀 Introducción

Esta API REST proporciona los servicios backend para el sistema SWO (Sistema Web de Operaciones). Está construida con **Spring Boot 3.2**, **JPA/Hibernate** y **MySQL 8.0**, siguiendo los principios de arquitectura hexagonal y diseño RESTful.

### Características Principales

✅ **CRUD completo** para Usuarios, Incidencias, Categorías, Proyectos y Chatbot  
✅ **Gestión de Proyectos** con asignación de usuarios (relación ManyToMany)  
✅ **Chatbot inteligente** con respuestas contextuales y historial persistente  
✅ **Paginación** en listados de incidencias  
✅ **Validación** automática con Bean Validation (JSR-380)  
✅ **CORS** configurado para Angular (`localhost:4200`)  
✅ **Documentación interactiva** con Swagger/OpenAPI 3  
✅ **Manejo global de excepciones** con respuestas JSON consistentes  

---

## � Uso con Postman

### Configuración Inicial

1. **Descargar e instalar Postman:** [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
2. **Crear una nueva Collection llamada "SWO API"**
3. **Configurar variables de entorno:**

```
Base URL: http://localhost:8081/api
```

### Variables de Colección (Collection Variables)

En Postman, ve a tu colección → Tab **Variables** y configura:

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| `baseUrl` | `http://localhost:8081/api` | `http://localhost:8081/api` |

### Ejemplo 1: Listar Todos los Usuarios

**Configuración en Postman:**

```
Method: GET
URL: {{baseUrl}}/v1/usuarios
Headers: (ninguno requerido)
Body: None
```

**Response esperado (200 OK):**

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": [
    {
      "idUsuario": 1,
      "nombreCompleto": "Carlos Andrés Pérez",
      "correo": "carlos.perez@swo.com",
      "rol": "Soporte",
      "estado": true,
      "telefono": "+573001234567",
      "departamento": "Soporte TI"
    }
  ],
  "timestamp": "2026-05-12T14:30:00"
}
```

---

### Ejemplo 2: Crear Usuario

**Configuración en Postman:**

```
Method: POST
URL: {{baseUrl}}/v1/usuarios
Headers: 
  Content-Type: application/json
Body (raw JSON):
```

```json
{
  "nombreCompleto": "Laura Patricia Gómez",
  "correo": "laura.gomez@swo.com",
  "password": "Segura@2026",
  "rol": "Técnico",
  "telefono": "+573201234567",
  "departamento": "Redes"
}
```

**Response esperado (201 Created):**

```json
{
  "success": true,
  "code": 201,
  "message": "Recurso creado exitosamente",
  "data": {
    "idUsuario": 12,
    "nombreCompleto": "Laura Patricia Gómez",
    "correo": "laura.gomez@swo.com",
    "rol": "Técnico",
    "estado": true,
    "telefono": "+573201234567",
    "departamento": "Redes",
    "fotoPerfil": null,
    "fechaRegistro": "2026-05-12T14:35:00",
    "ultimaConexion": null
  },
  "timestamp": "2026-05-12T14:35:00"
}
```

---

### Ejemplo 3: Obtener Usuario por ID

**Configuración en Postman:**

```
Method: GET
URL: {{baseUrl}}/v1/usuarios/12
Headers: (ninguno requerido)
Body: None
```

---

### Ejemplo 4: Actualizar Usuario

**Configuración en Postman:**

```
Method: PUT
URL: {{baseUrl}}/v1/usuarios/12
Headers: 
  Content-Type: application/json
Body (raw JSON):
```

```json
{
  "nombreCompleto": "Laura Patricia Gómez Ruiz",
  "correo": "laura.gomez@swo.com",
  "password": "NuevaSegura@2026",
  "rol": "Jefe",
  "telefono": "+573201234567",
  "departamento": "Jefatura Redes"
}
```

---

### Ejemplo 5: Listar Incidencias con Paginación

**Configuración en Postman:**

```
Method: GET
URL: {{baseUrl}}/v1/incidencias?page=0&size=10
Headers: (ninguno requerido)
Body: None
```

**Params (Query Params):**

| Key | Value |
|-----|-------|
| page | 0 |
| size | 10 |

---

### Ejemplo 6: Crear Incidencia

**Configuración en Postman:**

```
Method: POST
URL: {{baseUrl}}/v1/incidencias
Headers: 
  Content-Type: application/json
Body (raw JSON):
```

```json
{
  "titulo": "Falla en el sistema de autenticación",
  "descripcion": "Los usuarios no pueden iniciar sesión desde las 08:00 am. Se requiere revisión urgente del servidor AD.",
  "estado": "Abierto",
  "impacto": "Alto",
  "ubicacion": "Piso 3 - Sala Servidores",
  "idUsuarioReporta": 5,
  "idCategoria": 2
}
```

---

### Ejemplo 7: Cambiar Estado de Incidencia

**Configuración en Postman:**

```
Method: PATCH
URL: {{baseUrl}}/v1/incidencias/42/estado?nuevoEstado=En Progreso
Headers: (ninguno requerido)
Body: None
```

**Params (Query Params):**

| Key | Value |
|-----|-------|
| nuevoEstado | En Progreso |

---

### Ejemplo 8: Buscar Incidencias por Texto

**Configuración en Postman:**

```
Method: GET
URL: {{baseUrl}}/v1/incidencias/buscar?q=autenticación&page=0&size=10
Headers: (ninguno requerido)
Body: None
```

**Params (Query Params):**

| Key | Value |
|-----|-------|
| q | autenticación |
| page | 0 |
| size | 10 |

---

### Ejemplo 9: Crear Categoría

**Configuración en Postman:**

```
Method: POST
URL: {{baseUrl}}/v1/categorias
Headers: 
  Content-Type: application/json
Body (raw JSON):
```

```json
{
  "nombreCategoria": "Seguridad Informática",
  "descripcion": "Incidencias relacionadas con vulnerabilidades, malware y accesos no autorizados",
  "color": "#FF9800",
  "icono": "fas fa-shield-alt"
}
```

---

### Ejemplo 10: Desactivar Usuario (Soft Delete)

**Configuración en Postman:**

```
Method: PATCH
URL: {{baseUrl}}/v1/usuarios/12/desactivar
Headers: (ninguno requerido)
Body: None
```

---

### 📦 Importar Colección Postman

Puedes crear un archivo JSON con todas las requests. Guarda este contenido como `SWO_API_Postman.json`:

```json
{
  "info": {
    "name": "SWO API",
    "description": "API REST para Sistema de Gestión de Incidencias",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:8081/api"
    }
  ],
  "item": [
    {
      "name": "Usuarios",
      "item": [
        {
          "name": "Listar Todos",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/v1/usuarios",
              "host": ["{{baseUrl}}"],
              "path": ["v1", "usuarios"]
            }
          }
        },
        {
          "name": "Crear Usuario",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"nombreCompleto\": \"Laura Patricia Gómez\",\n  \"correo\": \"laura.gomez@swo.com\",\n  \"password\": \"Segura@2026\",\n  \"rol\": \"Técnico\",\n  \"telefono\": \"+573201234567\",\n  \"departamento\": \"Redes\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/v1/usuarios",
              "host": ["{{baseUrl}}"],
              "path": ["v1", "usuarios"]
            }
          }
        },
        {
          "name": "Obtener por ID",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/v1/usuarios/1",
              "host": ["{{baseUrl}}"],
              "path": ["v1", "usuarios", "1"]
            }
          }
        }
      ]
    },
    {
      "name": "Incidencias",
      "item": [
        {
          "name": "Listar Todas (Paginado)",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/v1/incidencias?page=0&size=10",
              "host": ["{{baseUrl}}"],
              "path": ["v1", "incidencias"],
              "query": [
                {"key": "page", "value": "0"},
                {"key": "size", "value": "10"}
              ]
            }
          }
        },
        {
          "name": "Crear Incidencia",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"titulo\": \"Falla en el sistema de autenticación\",\n  \"descripcion\": \"Los usuarios no pueden iniciar sesión desde las 08:00 am.\",\n  \"estado\": \"Abierto\",\n  \"impacto\": \"Alto\",\n  \"ubicacion\": \"Piso 3 - Sala Servidores\",\n  \"idUsuarioReporta\": 5,\n  \"idCategoria\": 2\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/v1/incidencias",
              "host": ["{{baseUrl}}"],
              "path": ["v1", "incidencias"]
            }
          }
        },
        {
          "name": "Buscar por Texto",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/v1/incidencias/buscar?q=autenticación",
              "host": ["{{baseUrl}}"],
              "path": ["v1", "incidencias", "buscar"],
              "query": [
                {"key": "q", "value": "autenticación"}
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Categorías",
      "item": [
        {
          "name": "Listar Todas",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/v1/categorias",
              "host": ["{{baseUrl}}"],
              "path": ["v1", "categorias"]
            }
          }
        },
        {
          "name": "Crear Categoría",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"nombreCategoria\": \"Seguridad Informática\",\n  \"descripcion\": \"Incidencias relacionadas con vulnerabilidades\",\n  \"color\": \"#FF9800\",\n  \"icono\": \"fas fa-shield-alt\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/v1/categorias",
              "host": ["{{baseUrl}}"],
              "path": ["v1", "categorias"]
            }
          }
        }
      ]
    }
  ]
}
```

**Importar en Postman:**

1. Abre Postman
2. Click en **Import** (esquina superior izquierda)
3. Selecciona el archivo `SWO_API_Postman.json`
4. La colección se importará automáticamente con todas las requests configuradas

---

### 🔧 Tips para Postman

1. **Usar Pre-request Scripts** para generar datos dinámicos:

```javascript
// En el tab Pre-request Script de una request
pm.variables.set("randomEmail", "user" + Date.now() + "@swo.com");
```

2. **Usar Tests** para verificar respuestas:

```javascript
// En el tab Tests de una request
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has success field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.true;
});
```

3. **Guardar IDs de respuestas** para usar en siguientes requests:

```javascript
// En el tab Tests después de crear un usuario
var jsonData = pm.response.json();
if (jsonData.success && jsonData.data.idUsuario) {
    pm.collectionVariables.set("userId", jsonData.data.idUsuario);
}
```

Luego puedes usar `{{userId}}` en otras requests.

---

## �🔄 Formato de Respuestas

Todas las respuestas de la API siguen el **envelope pattern** con la estructura `ApiResponse<T>`:

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": { },
  "timestamp": "2026-05-12T14:30:00"
}
```

### Campos del Envelope

| Campo       | Tipo                | Descripción                                      |
|-------------|---------------------|--------------------------------------------------|
| `success`   | `boolean`           | Indica si la operación fue exitosa               |
| `code`      | `int`               | Código HTTP de la respuesta                      |
| `message`   | `string`            | Mensaje descriptivo del resultado                |
| `data`      | `T` (genérico)      | Payload de datos (objeto, lista o página)        |
| `timestamp` | `string` (ISO-8601) | Fecha y hora de la respuesta                     |

---

## 📊 Códigos de Estado HTTP

| Código | Significado         | Uso en la API                                    |
|--------|---------------------|--------------------------------------------------|
| `200`  | OK                  | Operación exitosa (GET, PUT, PATCH)              |
| `201`  | Created             | Recurso creado exitosamente (POST)               |
| `204`  | No Content          | Eliminación exitosa (DELETE)                     |
| `400`  | Bad Request         | Datos de entrada inválidos o faltantes           |
| `404`  | Not Found           | Recurso no encontrado por su ID                  |
| `409`  | Conflict            | Violación de regla de negocio (ej. correo duplicado) |
| `500`  | Internal Server Error | Error inesperado del servidor                  |

---

# 👤 Módulo: Usuarios

Gestión completa de usuarios del sistema SWO. Los roles válidos son: `Soporte`, `Jefe`, `Usuario`, `Administrador`, `Técnico`.

---

## 1.1 Listar Todos los Usuarios

**Endpoint:** `/v1/usuarios`  
**Método:** `GET`  
**Descripción:** Retorna la lista completa de usuarios registrados en el sistema. Las contraseñas están **excluidas** por seguridad.

### Proceso Interno
1. Consulta a la base de datos sin filtros
2. Mapeo de entidades JPA a DTOs de respuesta
3. Exclusión del campo `passwordHash` en la serialización JSON

### Cuerpo de Petición
No requiere cuerpo de petición (query sin parámetros).

### Cuerpo de Respuesta

**200 OK** — Lista obtenida exitosamente

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": [
    {
      "idUsuario": 1,
      "nombreCompleto": "Carlos Andrés Pérez",
      "correo": "carlos.perez@swo.com",
      "rol": "Soporte",
      "estado": true,
      "telefono": "+573001234567",
      "departamento": "Soporte TI",
      "fotoPerfil": null,
      "fechaRegistro": "2026-04-15T08:30:00",
      "ultimaConexion": "2026-05-12T09:15:00"
    },
    {
      "idUsuario": 2,
      "nombreCompleto": "Ana María García",
      "correo": "ana.garcia@swo.com",
      "rol": "Administrador",
      "estado": true,
      "telefono": "+573009876543",
      "departamento": "Administración",
      "fotoPerfil": null,
      "fechaRegistro": "2026-04-10T10:00:00",
      "ultimaConexion": "2026-05-11T16:45:00"
    }
  ],
  "timestamp": "2026-05-12T14:30:00"
}
```

---

## 1.2 Listar Usuarios Activos

**Endpoint:** `/v1/usuarios/activos`  
**Método:** `GET`  
**Descripción:** Retorna únicamente los usuarios con `estado = true`.

### Proceso Interno
1. Filtro en base de datos: `WHERE estado = TRUE`
2. Retorna solo usuarios activos para formularios de asignación

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Lista de usuarios activos

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": [
    {
      "idUsuario": 1,
      "nombreCompleto": "Carlos Andrés Pérez",
      "correo": "carlos.perez@swo.com",
      "rol": "Soporte",
      "estado": true,
      "telefono": "+573001234567",
      "departamento": "Soporte TI",
      "fotoPerfil": null,
      "fechaRegistro": "2026-04-15T08:30:00",
      "ultimaConexion": "2026-05-12T09:15:00"
    }
  ],
  "timestamp": "2026-05-12T14:31:00"
}
```

---

## 1.3 Obtener Usuario por ID

**Endpoint:** `/v1/usuarios/{id}`  
**Método:** `GET`  
**Descripción:** Busca y retorna un usuario específico por su identificador único.

### Proceso Interno
1. Búsqueda en BD por clave primaria
2. Si no existe → lanza `ResourceNotFoundException` (HTTP 404)
3. Si existe → mapea a DTO y retorna

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción            | Ejemplo |
|-----------|--------|------------------------|---------|
| `id`      | `Long` | ID único del usuario   | `1`     |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Usuario encontrado

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": {
    "idUsuario": 1,
    "nombreCompleto": "Carlos Andrés Pérez",
    "correo": "carlos.perez@swo.com",
    "rol": "Soporte",
    "estado": true,
    "telefono": "+573001234567",
    "departamento": "Soporte TI",
    "fotoPerfil": null,
    "fechaRegistro": "2026-04-15T08:30:00",
    "ultimaConexion": "2026-05-12T09:15:00"
  },
  "timestamp": "2026-05-12T14:32:00"
}
```

**404 Not Found** — Usuario no encontrado

```json
{
  "success": false,
  "code": 404,
  "message": "Usuario no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-12T14:32:30"
}
```

---

## 1.4 Obtener Usuario por Correo Electrónico

**Endpoint:** `/v1/usuarios/correo/{correo}`  
**Método:** `GET`  
**Descripción:** Busca un usuario por su correo electrónico (usado en autenticación o verificación de existencia).

### Proceso Interno
1. Consulta con filtro `WHERE correo = ?`
2. Retorna el primer resultado único
3. Lanza 404 si no existe

### Parámetros de Ruta

| Parámetro | Tipo     | Descripción                     | Ejemplo             |
|-----------|----------|---------------------------------|---------------------|
| `correo`  | `String` | Correo electrónico del usuario  | `admin@swo.com`     |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Usuario encontrado

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": {
    "idUsuario": 3,
    "nombreCompleto": "Juan Sebastián López",
    "correo": "admin@swo.com",
    "rol": "Administrador",
    "estado": true,
    "telefono": "+573105551234",
    "departamento": "TI",
    "fotoPerfil": null,
    "fechaRegistro": "2026-03-01T08:00:00",
    "ultimaConexion": "2026-05-12T08:00:00"
  },
  "timestamp": "2026-05-12T14:33:00"
}
```

**404 Not Found** — Correo no registrado

```json
{
  "success": false,
  "code": 404,
  "message": "Usuario no encontrado con correo: noexiste@swo.com",
  "data": null,
  "timestamp": "2026-05-12T14:33:30"
}
```

---

## 1.5 Crear Usuario

**Endpoint:** `/v1/usuarios`  
**Método:** `POST`  
**Descripción:** Registra un nuevo usuario en el sistema. La contraseña se almacena hasheada con **BCrypt** (factor 12).

### Proceso Interno
1. **Validación** de campos con Bean Validation (`@Valid`)
2. **Verificación** de unicidad del correo electrónico
3. **Hasheo** de la contraseña con BCrypt antes de persistir
4. **Inserción** en la base de datos
5. Retorno del usuario creado (sin contraseña)

### Cuerpo de Petición

```json
{
  "nombreCompleto": "Laura Patricia Gómez",
  "correo": "laura.gomez@swo.com",
  "password": "Segura@2026",
  "rol": "Técnico",
  "telefono": "+573201234567",
  "departamento": "Redes"
}
```

### Validaciones Aplicadas

| Campo            | Regla                                      | Mensaje de Error                               |
|------------------|--------------------------------------------|-----------------------------------------------|
| `nombreCompleto` | `@NotBlank` + `@Size(min=3, max=100)`      | "El nombre completo es obligatorio"           |
| `correo`         | `@NotBlank` + `@Email`                     | "El correo no tiene un formato válido"        |
| `password`       | `@NotBlank` + `@Size(min=8)`               | "La contraseña debe tener mínimo 8 caracteres"|
| `rol`            | `@NotBlank` + `@Pattern` (roles válidos)   | "Rol inválido. Valores permitidos: ..."      |
| `telefono`       | `@Pattern` (formato internacional)         | "El teléfono no tiene un formato válido"      |

### Cuerpo de Respuesta

**201 Created** — Usuario creado exitosamente

```json
{
  "success": true,
  "code": 201,
  "message": "Recurso creado exitosamente",
  "data": {
    "idUsuario": 12,
    "nombreCompleto": "Laura Patricia Gómez",
    "correo": "laura.gomez@swo.com",
    "rol": "Técnico",
    "estado": true,
    "telefono": "+573201234567",
    "departamento": "Redes",
    "fotoPerfil": null,
    "fechaRegistro": "2026-05-12T14:35:00",
    "ultimaConexion": null
  },
  "timestamp": "2026-05-12T14:35:00"
}
```

**400 Bad Request** — Datos inválidos

```json
{
  "success": false,
  "code": 400,
  "message": "Error de validación: El correo no tiene un formato válido; La contraseña debe tener mínimo 8 caracteres",
  "data": null,
  "timestamp": "2026-05-12T14:35:30"
}
```

**409 Conflict** — Correo ya registrado

```json
{
  "success": false,
  "code": 409,
  "message": "Ya existe un usuario registrado con el correo: laura.gomez@swo.com",
  "data": null,
  "timestamp": "2026-05-12T14:36:00"
}
```

---

## 1.6 Actualizar Usuario

**Endpoint:** `/v1/usuarios/{id}`  
**Método:** `PUT`  
**Descripción:** Actualiza todos los campos de un usuario existente. Si se envía una nueva contraseña, se re-hashea con BCrypt.

### Proceso Interno
1. Busca el usuario por ID (404 si no existe)
2. Valida que el nuevo correo no esté en uso por otro usuario
3. Actualiza todos los campos (excepto `idUsuario` y `fechaRegistro`)
4. Si `password` viene en el request → re-hashea y actualiza
5. Persiste los cambios y retorna el usuario actualizado

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción        | Ejemplo |
|-----------|--------|--------------------|---------|
| `id`      | `Long` | ID del usuario     | `12`    |

### Cuerpo de Petición

```json
{
  "nombreCompleto": "Laura Patricia Gómez Ruiz",
  "correo": "laura.gomez@swo.com",
  "password": "NuevaSegura@2026",
  "rol": "Jefe",
  "telefono": "+573201234567",
  "departamento": "Jefatura Redes"
}
```

### Cuerpo de Respuesta

**200 OK** — Usuario actualizado exitosamente

```json
{
  "success": true,
  "code": 200,
  "message": "Usuario actualizado exitosamente",
  "data": {
    "idUsuario": 12,
    "nombreCompleto": "Laura Patricia Gómez Ruiz",
    "correo": "laura.gomez@swo.com",
    "rol": "Jefe",
    "estado": true,
    "telefono": "+573201234567",
    "departamento": "Jefatura Redes",
    "fotoPerfil": null,
    "fechaRegistro": "2026-05-12T14:35:00",
    "ultimaConexion": null
  },
  "timestamp": "2026-05-12T14:40:00"
}
```

**404 Not Found** — Usuario no existe

```json
{
  "success": false,
  "code": 404,
  "message": "Usuario no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-12T14:40:30"
}
```

---

## 1.7 Desactivar Usuario (Soft Delete)

**Endpoint:** `/v1/usuarios/{id}/desactivar`  
**Método:** `PATCH`  
**Descripción:** Marca el usuario como inactivo sin eliminarlo físicamente de la base de datos (soft delete). Cambia `estado = false`.

### Proceso Interno
1. Busca el usuario por ID
2. Actualiza el campo `estado` a `FALSE`
3. No elimina registros relacionados (mantiene historial de incidencias)

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción        | Ejemplo |
|-----------|--------|--------------------|---------|
| `id`      | `Long` | ID del usuario     | `12`    |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Usuario desactivado

```json
{
  "success": true,
  "code": 200,
  "message": "Usuario desactivado exitosamente",
  "data": null,
  "timestamp": "2026-05-12T14:45:00"
}
```

**404 Not Found** — Usuario no encontrado

```json
{
  "success": false,
  "code": 404,
  "message": "Usuario no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-12T14:45:30"
}
```

---

## 1.8 Activar Usuario ✅

**Endpoint:** `/v1/usuarios/{id}/activar`  
**Método:** `PATCH`  
**Descripción:** Marca el usuario como activo (estado = true). Útil para reactivar usuarios previamente desactivados.

### Proceso Interno
1. Busca el usuario por ID (404 si no existe)
2. Actualiza el campo `estado` a `true`
3. Persiste el cambio
4. Log de auditoría: "Activando usuario ID: {id}"

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción        | Ejemplo |
|-----------|--------|--------------------|---------|  
| `id`      | `Long` | ID del usuario     | `25`    |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Usuario activado exitosamente

```json
{
  "success": true,
  "code": 200,
  "message": "Usuario activado exitosamente",
  "data": null,
  "timestamp": "2026-05-13T10:30:00"
}
```

**404 Not Found** — Usuario no encontrado

```json
{
  "success": false,
  "code": 404,
  "message": "Usuario no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-13T10:30:15"
}
```

---

## 1.9 Eliminar Usuario Permanentemente

**Endpoint:** `/v1/usuarios/{id}`  
**Método:** `DELETE`  
**Descripción:** Elimina físicamente el usuario de la base de datos. **Operación irreversible**.

### Proceso Interno
1. Verifica que el usuario existe (404 si no)
2. Intenta eliminar el registro
3. Si hay registros relacionados con restricción FK → error 500 (puede mejorarse con excepción personalizada)

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción        | Ejemplo |
|-----------|--------|--------------------|---------|
| `id`      | `Long` | ID del usuario     | `12`    |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**204 No Content** — Usuario eliminado exitosamente

```json
{
  "success": true,
  "code": 204,
  "message": "Recurso eliminado exitosamente",
  "data": null,
  "timestamp": "2026-05-12T14:50:00"
}
```

**404 Not Found** — Usuario no encontrado

```json
{
  "success": false,
  "code": 404,
  "message": "Usuario no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-12T14:50:30"
}
```

---

# 🎫 Módulo: Incidencias

Gestión completa del ciclo de vida de las incidencias (tickets) del sistema. Soporta **paginación**, filtros por estado/usuario y búsqueda de texto libre.

---

## 2.1 Listar Todas las Incidencias (Paginado)

**Endpoint:** `/v1/incidencias`  
**Método:** `GET`  
**Descripción:** Retorna una página de incidencias ordenadas por fecha de creación descendente (las más recientes primero).

### Proceso Interno
1. Consulta paginada a la BD con `Pageable`
2. Ordenamiento por defecto: `fechaCreacion DESC`
3. Retorna objeto `Page<IncidenciaResponseDTO>` con metadatos de paginación

### Parámetros de Query

| Parámetro | Tipo  | Descripción                     | Valor por defecto | Ejemplo |
|-----------|-------|---------------------------------|-------------------|---------|
| `page`    | `int` | Número de página (0-based)      | `0`               | `0`     |
| `size`    | `int` | Cantidad de registros por página| `10`              | `20`    |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Página de incidencias

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": {
    "content": [
      {
        "idIncidencia": 42,
        "titulo": "Falla en el sistema de autenticación",
        "descripcion": "Los usuarios no pueden iniciar sesión desde las 08:00 am.",
        "estado": "En Progreso",
        "impacto": "Alto",
        "ubicacion": "Piso 3 - Sala Servidores",
        "fechaCreacion": "2026-05-12T08:15:00",
        "fechaActualizacion": "2026-05-12T09:30:00",
        "fechaCierre": null,
        "idUsuarioReporta": 5,
        "nombreUsuarioReporta": "Ana María García",
        "idCategoria": 2,
        "nombreCategoria": "Software"
      },
      {
        "idIncidencia": 41,
        "titulo": "Impresora HP del área contable fuera de servicio",
        "descripcion": "La impresora no responde al enviarle trabajos de impresión.",
        "estado": "Abierto",
        "impacto": "Medio",
        "ubicacion": "Piso 2 - Contabilidad",
        "fechaCreacion": "2026-05-11T16:45:00",
        "fechaActualizacion": "2026-05-11T16:45:00",
        "fechaCierre": null,
        "idUsuarioReporta": 8,
        "nombreUsuarioReporta": "Carlos Pérez",
        "idCategoria": 1,
        "nombreCategoria": "Hardware"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 10,
      "sort": {
        "sorted": true,
        "unsorted": false,
        "empty": false
      },
      "offset": 0,
      "paged": true,
      "unpaged": false
    },
    "totalPages": 5,
    "totalElements": 47,
    "last": false,
    "size": 10,
    "number": 0,
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    },
    "numberOfElements": 10,
    "first": true,
    "empty": false
  },
  "timestamp": "2026-05-12T15:00:00"
}
```

---

## 2.2 Filtrar Incidencias por Estado

**Endpoint:** `/v1/incidencias/estado/{estado}`  
**Método:** `GET`  
**Descripción:** Retorna incidencias filtradas por su estado actual (paginado).

### Proceso Interno
1. Valida que el estado enviado sea válido (lista cerrada de valores)
2. Consulta con filtro `WHERE estado = ?`
3. Si el estado es inválido → lanza `BusinessException` (HTTP 409)

### Estados Válidos

- `Abierto`
- `En Progreso`
- `Pendiente`
- `Resuelto`
- `Cerrado`
- `Cancelado`

### Parámetros de Ruta

| Parámetro | Tipo     | Descripción                | Ejemplo         |
|-----------|----------|----------------------------|-----------------|
| `estado`  | `String` | Estado de la incidencia    | `En Progreso`   |

### Parámetros de Query

| Parámetro | Tipo  | Descripción                     | Valor por defecto |
|-----------|-------|---------------------------------|-------------------|
| `page`    | `int` | Número de página                | `0`               |
| `size`    | `int` | Registros por página            | `10`              |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Incidencias filtradas

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": {
    "content": [
      {
        "idIncidencia": 42,
        "titulo": "Falla en el sistema de autenticación",
        "descripcion": "Los usuarios no pueden iniciar sesión desde las 08:00 am.",
        "estado": "En Progreso",
        "impacto": "Alto",
        "ubicacion": "Piso 3 - Sala Servidores",
        "fechaCreacion": "2026-05-12T08:15:00",
        "fechaActualizacion": "2026-05-12T09:30:00",
        "fechaCierre": null,
        "idUsuarioReporta": 5,
        "nombreUsuarioReporta": "Ana María García",
        "idCategoria": 2,
        "nombreCategoria": "Software"
      }
    ],
    "totalElements": 12,
    "totalPages": 2,
    "size": 10,
    "number": 0
  },
  "timestamp": "2026-05-12T15:05:00"
}
```

**400 Bad Request** — Estado inválido

```json
{
  "success": false,
  "code": 400,
  "message": "Estado inválido: 'Finalizado'. Valores permitidos: [Abierto, En Progreso, Pendiente, Resuelto, Cerrado, Cancelado]",
  "data": null,
  "timestamp": "2026-05-12T15:05:30"
}
```

---

## 2.3 Listar Incidencias por Usuario

**Endpoint:** `/v1/incidencias/usuario/{idUsuario}`  
**Método:** `GET`  
**Descripción:** Retorna todas las incidencias reportadas por un usuario específico (paginado).

### Proceso Interno
1. Consulta con filtro `WHERE id_usuario_reporta = ?`
2. Útil para pantallas de "Mis Incidencias" en el frontend

### Parámetros de Ruta

| Parámetro   | Tipo   | Descripción                       | Ejemplo |
|-------------|--------|-----------------------------------|---------|
| `idUsuario` | `Long` | ID del usuario que reportó        | `5`     |

### Parámetros de Query

| Parámetro | Tipo  | Descripción          | Valor por defecto |
|-----------|-------|----------------------|-------------------|
| `page`    | `int` | Número de página     | `0`               |
| `size`    | `int` | Registros por página | `10`              |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Incidencias del usuario

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": {
    "content": [
      {
        "idIncidencia": 42,
        "titulo": "Falla en el sistema de autenticación",
        "descripcion": "Los usuarios no pueden iniciar sesión desde las 08:00 am.",
        "estado": "En Progreso",
        "impacto": "Alto",
        "ubicacion": "Piso 3 - Sala Servidores",
        "fechaCreacion": "2026-05-12T08:15:00",
        "fechaActualizacion": "2026-05-12T09:30:00",
        "fechaCierre": null,
        "idUsuarioReporta": 5,
        "nombreUsuarioReporta": "Ana María García",
        "idCategoria": 2,
        "nombreCategoria": "Software"
      }
    ],
    "totalElements": 8,
    "totalPages": 1,
    "size": 10,
    "number": 0
  },
  "timestamp": "2026-05-12T15:10:00"
}
```

---

## 2.4 Búsqueda de Texto Libre

**Endpoint:** `/v1/incidencias/buscar`  
**Método:** `GET`  
**Descripción:** Busca coincidencias en el **título** y la **descripción** de las incidencias (case-insensitive).

### Proceso Interno
1. Query JPQL con `LOWER() LIKE %texto%`
2. Búsqueda en campos `titulo` y `descripcion`
3. Retorna resultados paginados

### Parámetros de Query

| Parámetro | Tipo     | Descripción                     | Requerido | Ejemplo         |
|-----------|----------|---------------------------------|-----------|-----------------|
| `q`       | `String` | Texto a buscar                  | ✅ Sí     | `autenticación` |
| `page`    | `int`    | Número de página                | No        | `0`             |
| `size`    | `int`    | Registros por página            | No        | `10`            |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Resultados de búsqueda

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": {
    "content": [
      {
        "idIncidencia": 42,
        "titulo": "Falla en el sistema de autenticación",
        "descripcion": "Los usuarios no pueden iniciar sesión desde las 08:00 am.",
        "estado": "En Progreso",
        "impacto": "Alto",
        "ubicacion": "Piso 3 - Sala Servidores",
        "fechaCreacion": "2026-05-12T08:15:00",
        "fechaActualizacion": "2026-05-12T09:30:00",
        "fechaCierre": null,
        "idUsuarioReporta": 5,
        "nombreUsuarioReporta": "Ana María García",
        "idCategoria": 2,
        "nombreCategoria": "Software"
      },
      {
        "idIncidencia": 35,
        "titulo": "Problema de autenticación en servidor LDAP",
        "descripcion": "El servidor LDAP no responde a peticiones de autenticación desde las 07:00 am.",
        "estado": "Resuelto",
        "impacto": "Crítico",
        "ubicacion": "Data Center - Rack 12",
        "fechaCreacion": "2026-05-10T07:30:00",
        "fechaActualizacion": "2026-05-10T14:15:00",
        "fechaCierre": "2026-05-10T14:15:00",
        "idUsuarioReporta": 3,
        "nombreUsuarioReporta": "Juan López",
        "idCategoria": 3,
        "nombreCategoria": "Redes"
      }
    ],
    "totalElements": 2,
    "totalPages": 1,
    "size": 10,
    "number": 0
  },
  "timestamp": "2026-05-12T15:15:00"
}
```

---

## 2.5 Obtener Incidencia por ID

**Endpoint:** `/v1/incidencias/{id}`  
**Método:** `GET`  
**Descripción:** Retorna una incidencia específica con todos sus detalles.

### Proceso Interno
1. Búsqueda por PK en la base de datos
2. Si no existe → `ResourceNotFoundException` (HTTP 404)
3. Mapeo completo con datos de usuario reportante y categoría

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción            | Ejemplo |
|-----------|--------|------------------------|---------|
| `id`      | `Long` | ID de la incidencia    | `42`    |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Incidencia encontrada

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": {
    "idIncidencia": 42,
    "titulo": "Falla en el sistema de autenticación",
    "descripcion": "Los usuarios no pueden iniciar sesión desde las 08:00 am. El problema parece estar relacionado con el servidor de Active Directory.",
    "estado": "En Progreso",
    "impacto": "Alto",
    "ubicacion": "Piso 3 - Sala Servidores",
    "fechaCreacion": "2026-05-12T08:15:00",
    "fechaActualizacion": "2026-05-12T09:30:00",
    "fechaCierre": null,
    "idUsuarioReporta": 5,
    "nombreUsuarioReporta": "Ana María García",
    "idCategoria": 2,
    "nombreCategoria": "Software"
  },
  "timestamp": "2026-05-12T15:20:00"
}
```

**404 Not Found** — Incidencia no encontrada

```json
{
  "success": false,
  "code": 404,
  "message": "Incidencia no encontrada con ID: 999",
  "data": null,
  "timestamp": "2026-05-12T15:20:30"
}
```

---

## 2.6 Registrar Nueva Incidencia

**Endpoint:** `/v1/incidencias`  
**Método:** `POST`  
**Descripción:** Crea una nueva incidencia en estado `Abierto`.

### Proceso Interno
1. **Validación** de campos obligatorios y formatos
2. **Verificación** de existencia del usuario reportante (FK)
3. **Verificación** de existencia de categoría (si se envía)
4. **Inserción** en BD con estado por defecto `Abierto` e impacto `Medio`
5. Retorno de la incidencia creada con datos completos

### Cuerpo de Petición

```json
{
  "titulo": "Falla en el sistema de autenticación",
  "descripcion": "Los usuarios no pueden iniciar sesión desde las 08:00 am. Se requiere revisión urgente del servidor AD.",
  "estado": "Abierto",
  "impacto": "Alto",
  "ubicacion": "Piso 3 - Sala Servidores",
  "idUsuarioReporta": 5,
  "idCategoria": 2
}
```

### Validaciones Aplicadas

| Campo              | Regla                                    | Mensaje de Error                             |
|--------------------|------------------------------------------|----------------------------------------------|
| `titulo`           | `@NotBlank` + `@Size(min=5, max=200)`    | "El título es obligatorio"                   |
| `descripcion`      | `@NotBlank` + `@Size(min=10)`            | "La descripción es obligatoria"              |
| `estado`           | `@Pattern` (estados válidos)             | "Estado inválido"                            |
| `impacto`          | `@Pattern` (Bajo, Medio, Alto, Crítico)  | "Impacto inválido"                           |
| `idUsuarioReporta` | `@NotNull` + `@Positive`                 | "El ID del usuario que reporta es obligatorio"|
| `idCategoria`      | `@Positive`                              | "El ID de categoría debe ser un número positivo"|

### Cuerpo de Respuesta

**201 Created** — Incidencia creada exitosamente

```json
{
  "success": true,
  "code": 201,
  "message": "Recurso creado exitosamente",
  "data": {
    "idIncidencia": 50,
    "titulo": "Falla en el sistema de autenticación",
    "descripcion": "Los usuarios no pueden iniciar sesión desde las 08:00 am. Se requiere revisión urgente del servidor AD.",
    "estado": "Abierto",
    "impacto": "Alto",
    "ubicacion": "Piso 3 - Sala Servidores",
    "fechaCreacion": "2026-05-12T15:25:00",
    "fechaActualizacion": "2026-05-12T15:25:00",
    "fechaCierre": null,
    "idUsuarioReporta": 5,
    "nombreUsuarioReporta": "Ana María García",
    "idCategoria": 2,
    "nombreCategoria": "Software"
  },
  "timestamp": "2026-05-12T15:25:00"
}
```

**400 Bad Request** — Datos inválidos

```json
{
  "success": false,
  "code": 400,
  "message": "Error de validación: El título debe tener entre 5 y 200 caracteres; La descripción debe tener mínimo 10 caracteres",
  "data": null,
  "timestamp": "2026-05-12T15:25:30"
}
```

**404 Not Found** — Usuario o categoría no existe

```json
{
  "success": false,
  "code": 404,
  "message": "Usuario reportador no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-12T15:26:00"
}
```

---

## 2.7 Actualizar Incidencia

**Endpoint:** `/v1/incidencias/{id}`  
**Método:** `PUT`  
**Descripción:** Actualiza todos los campos de una incidencia existente.

### Proceso Interno
1. Busca la incidencia por ID (404 si no existe)
2. Valida que el estado sea válido (si se envía)
3. Verifica que la categoría exista (si se cambia)
4. Actualiza todos los campos (excepto `idIncidencia`, `fechaCreacion`, `idUsuarioReporta`)
5. Persiste y retorna la incidencia actualizada

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción            | Ejemplo |
|-----------|--------|------------------------|---------|
| `id`      | `Long` | ID de la incidencia    | `50`    |

### Cuerpo de Petición

```json
{
  "titulo": "Falla en el sistema de autenticación (actualizada)",
  "descripcion": "Los usuarios no pueden iniciar sesión. El problema fue identificado en el servidor AD principal. Se requiere reinicio del servicio.",
  "estado": "En Progreso",
  "impacto": "Crítico",
  "ubicacion": "Piso 3 - Sala Servidores - Rack 5",
  "idUsuarioReporta": 5,
  "idCategoria": 2
}
```

### Cuerpo de Respuesta

**200 OK** — Incidencia actualizada

```json
{
  "success": true,
  "code": 200,
  "message": "Incidencia actualizada exitosamente",
  "data": {
    "idIncidencia": 50,
    "titulo": "Falla en el sistema de autenticación (actualizada)",
    "descripcion": "Los usuarios no pueden iniciar sesión. El problema fue identificado en el servidor AD principal. Se requiere reinicio del servicio.",
    "estado": "En Progreso",
    "impacto": "Crítico",
    "ubicacion": "Piso 3 - Sala Servidores - Rack 5",
    "fechaCreacion": "2026-05-12T15:25:00",
    "fechaActualizacion": "2026-05-12T15:30:00",
    "fechaCierre": null,
    "idUsuarioReporta": 5,
    "nombreUsuarioReporta": "Ana María García",
    "idCategoria": 2,
    "nombreCategoria": "Software"
  },
  "timestamp": "2026-05-12T15:30:00"
}
```

**404 Not Found** — Incidencia no encontrada

```json
{
  "success": false,
  "code": 404,
  "message": "Incidencia no encontrada con ID: 999",
  "data": null,
  "timestamp": "2026-05-12T15:30:30"
}
```

---

## 2.8 Cambiar Estado de Incidencia

**Endpoint:** `/v1/incidencias/{id}/estado`  
**Método:** `PATCH`  
**Descripción:** Endpoint dedicado para cambiar únicamente el estado de una incidencia (transiciones de flujo).

### Proceso Interno
1. Busca la incidencia por ID
2. Valida que el nuevo estado sea válido
3. Actualiza el campo `estado`
4. **Lógica especial:** Si el nuevo estado es `Cerrado` o `Resuelto`, registra automáticamente `fechaCierre`
5. Retorna la incidencia actualizada

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción            | Ejemplo |
|-----------|--------|------------------------|---------|
| `id`      | `Long` | ID de la incidencia    | `50`    |

### Parámetros de Query

| Parámetro     | Tipo     | Descripción                | Requerido | Ejemplo       |
|---------------|----------|----------------------------|-----------|---------------|
| `nuevoEstado` | `String` | Estado de destino          | ✅ Sí     | `En Progreso` |

### Cuerpo de Petición
No requiere cuerpo (el estado va en query param).

### Cuerpo de Respuesta

**200 OK** — Estado actualizado

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": {
    "idIncidencia": 50,
    "titulo": "Falla en el sistema de autenticación (actualizada)",
    "descripcion": "Los usuarios no pueden iniciar sesión. El problema fue identificado en el servidor AD principal. Se requiere reinicio del servicio.",
    "estado": "Resuelto",
    "impacto": "Crítico",
    "ubicacion": "Piso 3 - Sala Servidores - Rack 5",
    "fechaCreacion": "2026-05-12T15:25:00",
    "fechaActualizacion": "2026-05-12T15:35:00",
    "fechaCierre": "2026-05-12T15:35:00",
    "idUsuarioReporta": 5,
    "nombreUsuarioReporta": "Ana María García",
    "idCategoria": 2,
    "nombreCategoria": "Software"
  },
  "timestamp": "2026-05-12T15:35:00"
}
```

**400 Bad Request** — Estado inválido

```json
{
  "success": false,
  "code": 400,
  "message": "Estado inválido: 'Finalizado'. Valores permitidos: [Abierto, En Progreso, Pendiente, Resuelto, Cerrado, Cancelado]",
  "data": null,
  "timestamp": "2026-05-12T15:35:30"
}
```

---

## 2.9 Eliminar Incidencia

**Endpoint:** `/v1/incidencias/{id}`  
**Método:** `DELETE`  
**Descripción:** Elimina físicamente una incidencia de la base de datos. **Operación irreversible**.

### Proceso Interno
1. Verifica que la incidencia existe (404 si no)
2. Elimina el registro (CASCADE puede eliminar comentarios y archivos adjuntos relacionados)

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción            | Ejemplo |
|-----------|--------|------------------------|---------|
| `id`      | `Long` | ID de la incidencia    | `50`    |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**204 No Content** — Incidencia eliminada

```json
{
  "success": true,
  "code": 204,
  "message": "Recurso eliminado exitosamente",
  "data": null,
  "timestamp": "2026-05-12T15:40:00"
}
```

**404 Not Found** — Incidencia no encontrada

```json
{
  "success": false,
  "code": 404,
  "message": "Incidencia no encontrada con ID: 999",
  "data": null,
  "timestamp": "2026-05-12T15:40:30"
}
```

---

# 🏷️ Módulo: Categorías

Gestión de categorías que clasifican las incidencias del sistema (Hardware, Software, Redes, etc.).

---

## 3.1 Listar Todas las Categorías

**Endpoint:** `/v1/categorias`  
**Método:** `GET`  
**Descripción:** Retorna la lista completa de categorías registradas (activas e inactivas).

### Proceso Interno
1. Consulta sin filtros a la base de datos
2. Retorna todas las categorías con sus metadatos (color, ícono, estado)

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Lista completa de categorías

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": [
    {
      "idCategoria": 1,
      "nombreCategoria": "Hardware",
      "descripcion": "Incidencias relacionadas con equipos físicos",
      "color": "#F44336",
      "icono": "fas fa-server",
      "estado": true,
      "fechaCreacion": "2026-03-01T10:00:00"
    },
    {
      "idCategoria": 2,
      "nombreCategoria": "Software",
      "descripcion": "Problemas con aplicaciones y sistemas operativos",
      "color": "#2196F3",
      "icono": "fas fa-laptop-code",
      "estado": true,
      "fechaCreacion": "2026-03-01T10:05:00"
    },
    {
      "idCategoria": 3,
      "nombreCategoria": "Redes",
      "descripcion": "Problemas de conectividad y redes",
      "color": "#4CAF50",
      "icono": "fas fa-network-wired",
      "estado": true,
      "fechaCreacion": "2026-03-01T10:10:00"
    }
  ],
  "timestamp": "2026-05-12T15:45:00"
}
```

---

## 3.2 Listar Categorías Activas

**Endpoint:** `/v1/categorias/activas`  
**Método:** `GET`  
**Descripción:** Retorna únicamente las categorías con `estado = true`. **Usado para poblar dropdowns en formularios de creación de incidencias**.

### Proceso Interno
1. Consulta con filtro `WHERE estado = TRUE`
2. Retorna solo categorías activas disponibles para selección

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Categorías activas

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": [
    {
      "idCategoria": 1,
      "nombreCategoria": "Hardware",
      "descripcion": "Incidencias relacionadas con equipos físicos",
      "color": "#F44336",
      "icono": "fas fa-server",
      "estado": true,
      "fechaCreacion": "2026-03-01T10:00:00"
    },
    {
      "idCategoria": 2,
      "nombreCategoria": "Software",
      "descripcion": "Problemas con aplicaciones y sistemas operativos",
      "color": "#2196F3",
      "icono": "fas fa-laptop-code",
      "estado": true,
      "fechaCreacion": "2026-03-01T10:05:00"
    }
  ],
  "timestamp": "2026-05-12T15:50:00"
}
```

---

## 3.3 Obtener Categoría por ID

**Endpoint:** `/v1/categorias/{id}`  
**Método:** `GET`  
**Descripción:** Retorna una categoría específica por su identificador único.

### Proceso Interno
1. Búsqueda por PK en la base de datos
2. Si no existe → `ResourceNotFoundException` (HTTP 404)

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción            | Ejemplo |
|-----------|--------|------------------------|---------|
| `id`      | `Long` | ID de la categoría     | `1`     |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Categoría encontrada

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": {
    "idCategoria": 1,
    "nombreCategoria": "Hardware",
    "descripcion": "Incidencias relacionadas con equipos físicos (servidores, PCs, impresoras, etc.)",
    "color": "#F44336",
    "icono": "fas fa-server",
    "estado": true,
    "fechaCreacion": "2026-03-01T10:00:00"
  },
  "timestamp": "2026-05-12T15:55:00"
}
```

**404 Not Found** — Categoría no encontrada

```json
{
  "success": false,
  "code": 404,
  "message": "Categoría no encontrada con ID: 999",
  "data": null,
  "timestamp": "2026-05-12T15:55:30"
}
```

---

## 3.4 Crear Categoría

**Endpoint:** `/v1/categorias`  
**Método:** `POST`  
**Descripción:** Registra una nueva categoría en el sistema. El **nombre debe ser único**.

### Proceso Interno
1. **Validación** de campos (nombre, color HEX, etc.)
2. **Verificación** de unicidad del nombre de categoría
3. **Inserción** en BD con estado por defecto `true`
4. Retorno de la categoría creada

### Cuerpo de Petición

```json
{
  "nombreCategoria": "Seguridad Informática",
  "descripcion": "Incidencias relacionadas con vulnerabilidades, malware y accesos no autorizados",
  "color": "#FF9800",
  "icono": "fas fa-shield-alt"
}
```

### Validaciones Aplicadas

| Campo             | Regla                                      | Mensaje de Error                             |
|-------------------|--------------------------------------------|----------------------------------------------|
| `nombreCategoria` | `@NotBlank` + `@Size(min=3, max=100)`      | "El nombre de la categoría es obligatorio"   |
| `descripcion`     | `@Size(max=500)`                           | "La descripción no puede superar 500 caracteres"|
| `color`           | `@Pattern` (formato HEX `#RRGGBB`)         | "El color debe ser un código hexadecimal válido"|
| `icono`           | `@Size(max=50)`                            | "El nombre del ícono no puede superar 50 caracteres"|

### Cuerpo de Respuesta

**201 Created** — Categoría creada exitosamente

```json
{
  "success": true,
  "code": 201,
  "message": "Recurso creado exitosamente",
  "data": {
    "idCategoria": 8,
    "nombreCategoria": "Seguridad Informática",
    "descripcion": "Incidencias relacionadas con vulnerabilidades, malware y accesos no autorizados",
    "color": "#FF9800",
    "icono": "fas fa-shield-alt",
    "estado": true,
    "fechaCreacion": "2026-05-12T16:00:00"
  },
  "timestamp": "2026-05-12T16:00:00"
}
```

**400 Bad Request** — Datos inválidos

```json
{
  "success": false,
  "code": 400,
  "message": "Error de validación: El color debe ser un código hexadecimal válido (ej. #4CAF50)",
  "data": null,
  "timestamp": "2026-05-12T16:00:30"
}
```

**409 Conflict** — Nombre duplicado

```json
{
  "success": false,
  "code": 409,
  "message": "Ya existe una categoría con el nombre: Seguridad Informática",
  "data": null,
  "timestamp": "2026-05-12T16:01:00"
}
```

---

## 3.5 Actualizar Categoría

**Endpoint:** `/v1/categorias/{id}`  
**Método:** `PUT`  
**Descripción:** Actualiza todos los campos de una categoría existente.

### Proceso Interno
1. Busca la categoría por ID (404 si no existe)
2. Valida que el nuevo nombre no esté en uso por otra categoría
3. Actualiza todos los campos (excepto `idCategoria` y `fechaCreacion`)
4. Persiste y retorna la categoría actualizada

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción            | Ejemplo |
|-----------|--------|------------------------|---------|
| `id`      | `Long` | ID de la categoría     | `8`     |

### Cuerpo de Petición

```json
{
  "nombreCategoria": "Ciberseguridad",
  "descripcion": "Incidencias relacionadas con seguridad informática, vulnerabilidades, malware y accesos no autorizados",
  "color": "#E91E63",
  "icono": "fas fa-user-shield"
}
```

### Cuerpo de Respuesta

**200 OK** — Categoría actualizada

```json
{
  "success": true,
  "code": 200,
  "message": "Categoría actualizada exitosamente",
  "data": {
    "idCategoria": 8,
    "nombreCategoria": "Ciberseguridad",
    "descripcion": "Incidencias relacionadas con seguridad informática, vulnerabilidades, malware y accesos no autorizados",
    "color": "#E91E63",
    "icono": "fas fa-user-shield",
    "estado": true,
    "fechaCreacion": "2026-05-12T16:00:00"
  },
  "timestamp": "2026-05-12T16:05:00"
}
```

**404 Not Found** — Categoría no encontrada

```json
{
  "success": false,
  "code": 404,
  "message": "Categoría no encontrada con ID: 999",
  "data": null,
  "timestamp": "2026-05-12T16:05:30"
}
```

---

## 3.6 Desactivar Categoría (Soft Delete)

**Endpoint:** `/v1/categorias/{id}/desactivar`  
**Método:** `PATCH`  
**Descripción:** Marca la categoría como inactiva sin eliminarla físicamente (soft delete). Cambia `estado = false`.

### Proceso Interno
1. Busca la categoría por ID
2. Actualiza el campo `estado` a `FALSE`
3. La categoría no aparecerá en `/activas` pero se preserva el historial

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción            | Ejemplo |
|-----------|--------|------------------------|---------|
| `id`      | `Long` | ID de la categoría     | `8`     |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Categoría desactivada

```json
{
  "success": true,
  "code": 200,
  "message": "Categoría desactivada exitosamente",
  "data": null,
  "timestamp": "2026-05-12T16:10:00"
}
```

**404 Not Found** — Categoría no encontrada

```json
{
  "success": false,
  "code": 404,
  "message": "Categoría no encontrada con ID: 999",
  "data": null,
  "timestamp": "2026-05-12T16:10:30"
}
```

---

## 3.7 Eliminar Categoría Permanentemente

**Endpoint:** `/v1/categorias/{id}`  
**Método:** `DELETE`  
**Descripción:** Elimina físicamente la categoría de la base de datos. **Operación irreversible**.

### Proceso Interno
1. Verifica que la categoría existe
2. Intenta eliminar el registro
3. **Nota:** Si hay incidencias asociadas, puede fallar por restricción FK (depende del esquema)

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción            | Ejemplo |
|-----------|--------|------------------------|---------|
| `id`      | `Long` | ID de la categoría     | `8`     |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**204 No Content** — Categoría eliminada

```json
{
  "success": true,
  "code": 204,
  "message": "Recurso eliminado exitosamente",
  "data": null,
  "timestamp": "2026-05-12T16:15:00"
}
```

**404 Not Found** — Categoría no encontrada

```json
{
  "success": false,
  "code": 404,
  "message": "Categoría no encontrada con ID: 999",
  "data": null,
  "timestamp": "2026-05-12T16:15:30"
}
```

---

# � Módulo: Proyectos

Gestión completa de proyectos del sistema con soporte para asignación de usuarios (relación ManyToMany). Incluye CRUD completo, filtros por estado, búsqueda por nombre y gestión de equipos de trabajo.

---

## 4.1 Crear Proyecto

**Endpoint:** `/v1/proyectos`  
**Método:** `POST`  
**Descripción:** Crea un nuevo proyecto en el sistema con todas sus propiedades.

### Proceso Interno
1. Valida que el nombre del proyecto no esté duplicado (unicidad)
2. Aplica validaciones de Bean Validation (JSR-380)
3. Persiste el proyecto con auditoría automática (fechaCreacion, fechaActualizacion)
4. Retorna el proyecto creado con código 201

### Cuerpo de Petición

```json
{
  "nombreProyecto": "Modernización Sistema SWO",
  "descripcion": "Migración completa del sistema de gestión de incidencias a arquitectura REST con Spring Boot y Angular",
  "fechaInicio": "2026-05-01",
  "fechaFin": "2026-12-31",
  "estado": "Activo",
  "presupuesto": 150000.00,
  "prioridad": "Alta"
}
```

### Validaciones Aplicadas

| Campo            | Regla                                      |
|------------------|--------------------------------------------|
| `nombreProyecto` | Obligatorio, 3-150 caracteres, único       |
| `estado`         | Activo \| En Pausa \| Completado \| Cancelado |
| `prioridad`      | Baja \| Media \| Alta \| Crítica           |
| `presupuesto`    | No negativo                                |

### Cuerpo de Respuesta

**201 Created** — Proyecto creado exitosamente

```json
{
  "success": true,
  "code": 201,
  "message": "Recurso creado exitosamente",
  "data": {
    "idProyecto": 1,
    "nombreProyecto": "Modernización Sistema SWO",
    "descripcion": "Migración completa del sistema de gestión de incidencias a arquitectura REST con Spring Boot y Angular",
    "fechaInicio": "2026-05-01",
    "fechaFin": "2026-12-31",
    "estado": "Activo",
    "presupuesto": 150000.00,
    "prioridad": "Alta",
    "usuariosAsignados": [],
    "fechaCreacion": "2026-05-13T09:00:00",
    "fechaActualizacion": "2026-05-13T09:00:00"
  },
  "timestamp": "2026-05-13T09:00:00"
}
```

**400 Bad Request** — Validación fallida

```json
{
  "success": false,
  "code": 400,
  "message": "El nombre del proyecto es obligatorio",
  "data": null,
  "timestamp": "2026-05-13T09:00:15"
}
```

**409 Conflict** — Nombre duplicado

```json
{
  "success": false,
  "code": 409,
  "message": "Ya existe un proyecto con el nombre: Modernización Sistema SWO",
  "data": null,
  "timestamp": "2026-05-13T09:00:30"
}
```

---

## 4.2 Listar Todos los Proyectos

**Endpoint:** `/v1/proyectos`  
**Método:** `GET`  
**Descripción:** Retorna todos los proyectos registrados con sus usuarios asignados.

### Proceso Interno
1. Consulta todos los proyectos en la base de datos
2. Incluye información de usuarios asignados a cada proyecto
3. Retorna lista completa con código 200

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Lista de proyectos

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": [
    {
      "idProyecto": 1,
      "nombreProyecto": "Modernización Sistema SWO",
      "descripcion": "Migración completa del sistema",
      "fechaInicio": "2026-05-01",
      "fechaFin": "2026-12-31",
      "estado": "Activo",
      "presupuesto": 150000.00,
      "prioridad": "Alta",
      "usuariosAsignados": [
        {
          "idUsuario": 23,
          "nombreCompleto": "Carlos Pérez",
          "correo": "carlos.perez@swo.com",
          "rol": "Jefe"
        }
      ],
      "fechaCreacion": "2026-05-13T09:00:00",
      "fechaActualizacion": "2026-05-13T09:00:00"
    }
  ],
  "timestamp": "2026-05-13T09:05:00"
}
```

---

## 4.3 Obtener Proyecto por ID

**Endpoint:** `/v1/proyectos/{id}`  
**Método:** `GET`  
**Descripción:** Obtiene un proyecto específico por su ID con todos sus detalles.

### Proceso Interno
1. Busca el proyecto por ID
2. Si no existe, retorna 404
3. Incluye usuarios asignados en la respuesta

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción        | Ejemplo |
|-----------|--------|--------------------|---------|
| `id`      | `Long` | ID del proyecto    | `1`     |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Proyecto encontrado

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": {
    "idProyecto": 1,
    "nombreProyecto": "Modernización Sistema SWO",
    "descripcion": "Migración completa del sistema",
    "fechaInicio": "2026-05-01",
    "fechaFin": "2026-12-31",
    "estado": "Activo",
    "presupuesto": 150000.00,
    "prioridad": "Alta",
    "usuariosAsignados": [],
    "fechaCreacion": "2026-05-13T09:00:00",
    "fechaActualizacion": "2026-05-13T09:00:00"
  },
  "timestamp": "2026-05-13T09:10:00"
}
```

**404 Not Found** — Proyecto no existe

```json
{
  "success": false,
  "code": 404,
  "message": "Proyecto no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-13T09:10:15"
}
```

---

## 4.4 Filtrar Proyectos por Estado

**Endpoint:** `/v1/proyectos/estado/{estado}`  
**Método:** `GET`  
**Descripción:** Retorna todos los proyectos que tengan un estado específico.

### Proceso Interno
1. Filtra proyectos por el campo `estado`
2. Estados válidos: Activo, En Pausa, Completado, Cancelado
3. Retorna lista filtrada

### Parámetros de Ruta

| Parámetro | Tipo     | Descripción        | Ejemplo    |
|-----------|----------|--------------------|------------|
| `estado`  | `String` | Estado del proyecto| `Activo`   |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Lista filtrada

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": [
    {
      "idProyecto": 1,
      "nombreProyecto": "Modernización Sistema SWO",
      "estado": "Activo",
      "prioridad": "Alta",
      "usuariosAsignados": []
    }
  ],
  "timestamp": "2026-05-13T09:15:00"
}
```

---

## 4.5 Buscar Proyectos por Nombre

**Endpoint:** `/v1/proyectos/buscar?q={texto}`  
**Método:** `GET`  
**Descripción:** Busca proyectos cuyo nombre contenga el texto especificado (búsqueda case-insensitive).

### Proceso Interno
1. Realiza búsqueda con LIKE en el campo `nombreProyecto`
2. Convierte a minúsculas para búsqueda case-insensitive
3. Retorna lista de coincidencias

### Parámetros de Query

| Parámetro | Tipo     | Descripción          | Ejemplo         |
|-----------|----------|----------------------|-----------------|
| `q`       | `String` | Texto a buscar       | `modernización` |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Resultados de búsqueda

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": [
    {
      "idProyecto": 1,
      "nombreProyecto": "Modernización Sistema SWO",
      "descripcion": "Migración completa del sistema",
      "estado": "Activo"
    }
  ],
  "timestamp": "2026-05-13T09:20:00"
}
```

---

## 4.6 Actualizar Proyecto

**Endpoint:** `/v1/proyectos/{id}`  
**Método:** `PUT`  
**Descripción:** Actualiza todos los campos de un proyecto existente.

### Proceso Interno
1. Busca el proyecto por ID (404 si no existe)
2. Si se cambia el nombre, valida que no esté duplicado
3. Actualiza todos los campos
4. La fecha de actualización se registra automáticamente

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción        | Ejemplo |
|-----------|--------|--------------------|---------|
| `id`      | `Long` | ID del proyecto    | `1`     |

### Cuerpo de Petición

```json
{
  "nombreProyecto": "Modernización Sistema SWO - Fase 2",
  "descripcion": "Segunda fase: implementación de módulos de reportes avanzados y analytics",
  "fechaInicio": "2026-05-01",
  "fechaFin": "2027-06-30",
  "estado": "En Pausa",
  "presupuesto": 200000.00,
  "prioridad": "Crítica"
}
```

### Cuerpo de Respuesta

**200 OK** — Proyecto actualizado

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": {
    "idProyecto": 1,
    "nombreProyecto": "Modernización Sistema SWO - Fase 2",
    "descripcion": "Segunda fase: implementación de módulos de reportes avanzados y analytics",
    "fechaInicio": "2026-05-01",
    "fechaFin": "2027-06-30",
    "estado": "En Pausa",
    "presupuesto": 200000.00,
    "prioridad": "Crítica",
    "usuariosAsignados": [],
    "fechaCreacion": "2026-05-13T09:00:00",
    "fechaActualizacion": "2026-05-13T09:25:00"
  },
  "timestamp": "2026-05-13T09:25:00"
}
```

**404 Not Found** — Proyecto no existe

```json
{
  "success": false,
  "code": 404,
  "message": "Proyecto no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-13T09:25:15"
}
```

---

## 4.7 Asignar Usuario a Proyecto ⭐

**Endpoint:** `/v1/proyectos/asignar-usuario`  
**Método:** `POST`  
**Descripción:** Asigna un usuario específico a un proyecto. Crea la relación ManyToMany en la tabla `proyecto_usuario`.

### Proceso Interno
1. Valida que el proyecto existe (404 si no)
2. Valida que el usuario existe (404 si no)
3. Verifica que el usuario no esté ya asignado (400 si duplicado)
4. Crea la asignación en la tabla intermedia
5. Retorna confirmación

### Cuerpo de Petición

```json
{
  "idProyecto": 1,
  "idUsuario": 23
}
```

### Validaciones Aplicadas

| Campo        | Regla                                        |
|--------------|----------------------------------------------|
| `idProyecto` | Obligatorio, debe existir                    |
| `idUsuario`  | Obligatorio, debe existir                    |
| Relación     | Usuario no puede estar ya asignado al proyecto |

### Cuerpo de Respuesta

**200 OK** — Usuario asignado exitosamente

```json
{
  "success": true,
  "code": 200,
  "message": "Usuario asignado al proyecto exitosamente",
  "data": null,
  "timestamp": "2026-05-13T09:30:00"
}
```

**400 Bad Request** — Usuario ya asignado

```json
{
  "success": false,
  "code": 400,
  "message": "El usuario ya está asignado a este proyecto",
  "data": null,
  "timestamp": "2026-05-13T09:30:15"
}
```

**404 Not Found** — Proyecto o usuario no existe

```json
{
  "success": false,
  "code": 404,
  "message": "Proyecto no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-13T09:30:30"
}
```

---

## 4.8 Remover Usuario de Proyecto

**Endpoint:** `/v1/proyectos/{idProyecto}/usuario/{idUsuario}`  
**Método:** `DELETE`  
**Descripción:** Remueve un usuario asignado de un proyecto específico.

### Proceso Interno
1. Valida que el proyecto existe
2. Valida que el usuario existe
3. Verifica que el usuario esté asignado al proyecto
4. Elimina la relación de la tabla intermedia

### Parámetros de Ruta

| Parámetro    | Tipo   | Descripción        | Ejemplo |
|--------------|--------|--------------------|---------|
| `idProyecto` | `Long` | ID del proyecto    | `1`     |
| `idUsuario`  | `Long` | ID del usuario     | `23`    |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Usuario removido

```json
{
  "success": true,
  "code": 200,
  "message": "Usuario removido del proyecto exitosamente",
  "data": null,
  "timestamp": "2026-05-13T09:35:00"
}
```

**400 Bad Request** — Usuario no está asignado

```json
{
  "success": false,
  "code": 400,
  "message": "El usuario no está asignado a este proyecto",
  "data": null,
  "timestamp": "2026-05-13T09:35:15"
}
```

---

## 4.9 Listar Usuarios Asignados a Proyecto

**Endpoint:** `/v1/proyectos/{idProyecto}/usuarios`  
**Método:** `GET`  
**Descripción:** Retorna la lista completa de usuarios asignados a un proyecto específico.

### Proceso Interno
1. Busca el proyecto por ID
2. Retorna los usuarios de la colección `usuariosAsignados`
3. Incluye información completa de cada usuario

### Parámetros de Ruta

| Parámetro    | Tipo   | Descripción        | Ejemplo |
|--------------|--------|--------------------|---------|
| `idProyecto` | `Long` | ID del proyecto    | `1`     |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Lista de usuarios del proyecto

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": [
    {
      "idUsuario": 23,
      "nombreCompleto": "Carlos Andrés Pérez",
      "correo": "carlos.perez@swo.com",
      "rol": "Jefe",
      "estado": true,
      "telefono": "+573001234567",
      "departamento": "Desarrollo"
    }
  ],
  "timestamp": "2026-05-13T09:40:00"
}
```

**404 Not Found** — Proyecto no existe

```json
{
  "success": false,
  "code": 404,
  "message": "Proyecto no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-13T09:40:15"
}
```

---

## 4.10 Eliminar Proyecto

**Endpoint:** `/v1/proyectos/{id}`  
**Método:** `DELETE`  
**Descripción:** Elimina un proyecto y todas sus asignaciones de usuarios.

### Proceso Interno
1. Busca el proyecto por ID (404 si no existe)
2. Elimina todas las asignaciones de la tabla `proyecto_usuario` (CASCADE)
3. Elimina el proyecto
4. Retorna código 204

### Parámetros de Ruta

| Parámetro | Tipo   | Descripción        | Ejemplo |
|-----------|--------|--------------------|---------|
| `id`      | `Long` | ID del proyecto    | `1`     |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**204 No Content** — Proyecto eliminado

```json
{
  "success": true,
  "code": 204,
  "message": "Recurso eliminado exitosamente",
  "data": null,
  "timestamp": "2026-05-13T09:45:00"
}
```

**404 Not Found** — Proyecto no existe

```json
{
  "success": false,
  "code": 404,
  "message": "Proyecto no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-13T09:45:15"
}
```

---

# 💬 Módulo: Chatbot

Sistema de chatbot inteligente con respuestas contextuales automáticas. Mantiene historial persistente de conversaciones y permite agrupar mensajes por sesión para mantener contexto.

---

## 5.1 Enviar Mensaje al Chatbot

**Endpoint:** `/v1/chatbot/enviar`  
**Método:** `POST`  
**Descripción:** Envía un mensaje del usuario al chatbot y recibe una respuesta automática inteligente. El historial se almacena en la base de datos.

### Proceso Interno
1. Valida que el usuario existe (404 si no)
2. Genera o usa sessionId existente
3. Analiza el mensaje con palabras clave contextuales
4. Genera respuesta inteligente basada en el contenido
5. Almacena la conversación en la BD
6. Retorna respuesta del bot

### Palabras Clave Reconocidas

| Palabra Clave      | Respuesta del Bot                                          |
|--------------------|------------------------------------------------------------|
| `incidencia`       | Guía para reportar incidencias con pasos detallados       |
| `estado`           | Información sobre estados de incidencias                  |
| `contraseña`       | Guía para recuperar contraseña                            |
| `proyecto`         | Información sobre gestión de proyectos                    |
| `usuario`          | Información sobre gestión de usuarios                     |
| `ayuda`            | Menú completo de ayuda                                    |
| `gracias`, `hola`  | Respuestas cordiales                                      |
| Otros              | Respuesta por defecto con opciones disponibles            |

### Cuerpo de Petición

```json
{
  "idUsuario": 23,
  "mensaje": "Hola, necesito ayuda para reportar una incidencia",
  "sessionId": "SESSION-550e8400-e29b-41d4-a716-446655440000",
  "tipoConsulta": "soporte"
}
```

### Validaciones Aplicadas

| Campo         | Regla                               |
|---------------|-------------------------------------|
| `idUsuario`   | Obligatorio, debe existir           |
| `mensaje`     | Obligatorio, 1-2000 caracteres      |
| `sessionId`   | Opcional, se genera si no se envía  |
| `tipoConsulta`| Opcional: incidencia \| soporte \| información \| otro |

### Cuerpo de Respuesta

**201 Created** — Mensaje procesado

```json
{
  "success": true,
  "code": 201,
  "message": "Recurso creado exitosamente",
  "data": {
    "idConversacion": 1,
    "mensajeUsuario": "Hola, necesito ayuda para reportar una incidencia",
    "respuestaBot": "¡Claro! Te ayudaré a reportar una incidencia. Sigue estos pasos:\n\n1. Ve a la sección 'Incidencias' en el menú principal\n2. Haz clic en el botón 'Nueva Incidencia'\n3. Completa los siguientes campos:\n   - Título: Describe brevemente el problema\n   - Descripción: Detalla el incidente\n   - Prioridad: Selecciona según urgencia (Baja/Media/Alta/Crítica)\n   - Categoría: Elige la más apropiada\n\n4. Haz clic en 'Guardar'\n\n¿Necesitas ayuda con algo más específico?",
    "sessionId": "SESSION-550e8400-e29b-41d4-a716-446655440000",
    "fechaMensaje": "2026-05-13T10:00:00",
    "tipoConsulta": "soporte",
    "resuelto": false,
    "nombreUsuario": "Carlos Andrés Pérez"
  },
  "timestamp": "2026-05-13T10:00:00"
}
```

**400 Bad Request** — Datos inválidos

```json
{
  "success": false,
  "code": 400,
  "message": "El mensaje es obligatorio",
  "data": null,
  "timestamp": "2026-05-13T10:00:15"
}
```

**404 Not Found** — Usuario no existe

```json
{
  "success": false,
  "code": 404,
  "message": "Usuario no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-13T10:00:30"
}
```

---

## 5.2 Obtener Historial de Usuario

**Endpoint:** `/v1/chatbot/historial/{idUsuario}`  
**Método:** `GET`  
**Descripción:** Retorna todo el historial de conversaciones de un usuario con el chatbot, ordenado por fecha descendente (más recientes primero).

### Proceso Interno
1. Valida que el usuario existe
2. Consulta todas las conversaciones del usuario
3. Ordena por `fechaMensaje DESC`
4. Retorna lista completa

### Parámetros de Ruta

| Parámetro   | Tipo   | Descripción        | Ejemplo |
|-------------|--------|--------------------|---------|
| `idUsuario` | `Long` | ID del usuario     | `23`    |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Historial del usuario

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": [
    {
      "idConversacion": 2,
      "mensajeUsuario": "¿Cómo cambio mi contraseña?",
      "respuestaBot": "Para cambiar tu contraseña, sigue estos pasos:\n\n1. Ve a 'Mi Perfil' (icono de usuario arriba a la derecha)\n2. Selecciona 'Configuración de Cuenta'\n3. Haz clic en 'Cambiar Contraseña'\n4. Ingresa tu contraseña actual\n5. Ingresa tu nueva contraseña dos veces\n6. Haz clic en 'Actualizar'\n\nSi olvidaste tu contraseña actual, usa la opción 'Olvidé mi contraseña' en la pantalla de login.",
      "sessionId": "SESSION-550e8400-e29b-41d4-a716-446655440000",
      "fechaMensaje": "2026-05-13T10:05:00",
      "tipoConsulta": "soporte",
      "resuelto": true,
      "nombreUsuario": "Carlos Andrés Pérez"
    },
    {
      "idConversacion": 1,
      "mensajeUsuario": "Hola, necesito ayuda para reportar una incidencia",
      "respuestaBot": "¡Claro! Te ayudaré a reportar una incidencia...",
      "sessionId": "SESSION-550e8400-e29b-41d4-a716-446655440000",
      "fechaMensaje": "2026-05-13T10:00:00",
      "tipoConsulta": "soporte",
      "resuelto": false,
      "nombreUsuario": "Carlos Andrés Pérez"
    }
  ],
  "timestamp": "2026-05-13T10:10:00"
}
```

**404 Not Found** — Usuario no existe

```json
{
  "success": false,
  "code": 404,
  "message": "Usuario no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-13T10:10:15"
}
```

---

## 5.3 Obtener Conversaciones por Sesión

**Endpoint:** `/v1/chatbot/sesion/{sessionId}`  
**Método:** `GET`  
**Descripción:** Retorna todas las conversaciones de una sesión específica, ordenadas por fecha ascendente (cronológico).

### Proceso Interno
1. Busca todas las conversaciones con el `sessionId` especificado
2. Ordena por `fechaMensaje ASC` (orden cronológico)
3. Útil para mantener contexto de una conversación en curso

### Parámetros de Ruta

| Parámetro   | Tipo     | Descripción           | Ejemplo                                        |
|-------------|----------|-----------------------|------------------------------------------------|
| `sessionId` | `String` | ID de la sesión       | `SESSION-550e8400-e29b-41d4-a716-446655440000` |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Conversaciones de la sesión

```json
{
  "success": true,
  "code": 200,
  "message": "Operación exitosa",
  "data": [
    {
      "idConversacion": 1,
      "mensajeUsuario": "Hola, necesito ayuda para reportar una incidencia",
      "respuestaBot": "¡Claro! Te ayudaré a reportar una incidencia...",
      "sessionId": "SESSION-550e8400-e29b-41d4-a716-446655440000",
      "fechaMensaje": "2026-05-13T10:00:00",
      "tipoConsulta": "soporte",
      "resuelto": false,
      "nombreUsuario": "Carlos Andrés Pérez"
    },
    {
      "idConversacion": 2,
      "mensajeUsuario": "¿Cómo cambio mi contraseña?",
      "respuestaBot": "Para cambiar tu contraseña...",
      "sessionId": "SESSION-550e8400-e29b-41d4-a716-446655440000",
      "fechaMensaje": "2026-05-13T10:05:00",
      "tipoConsulta": "soporte",
      "resuelto": true,
      "nombreUsuario": "Carlos Andrés Pérez"
    }
  ],
  "timestamp": "2026-05-13T10:15:00"
}
```

---

## 5.4 Marcar Conversación como Resuelta

**Endpoint:** `/v1/chatbot/{idConversacion}/resolver`  
**Método:** `PATCH`  
**Descripción:** Marca una conversación específica como resuelta (resuelto = true). Útil para tracking de soporte y estadísticas.

### Proceso Interno
1. Busca la conversación por ID (404 si no existe)
2. Actualiza el campo `resuelto` a `TRUE`
3. Persiste el cambio
4. Retorna confirmación

### Parámetros de Ruta

| Parámetro        | Tipo   | Descripción               | Ejemplo |
|------------------|--------|---------------------------|---------|
| `idConversacion` | `Long` | ID de la conversación     | `1`     |

### Cuerpo de Petición
No requiere cuerpo.

### Cuerpo de Respuesta

**200 OK** — Conversación marcada como resuelta

```json
{
  "success": true,
  "code": 200,
  "message": "Conversación marcada como resuelta",
  "data": null,
  "timestamp": "2026-05-13T10:20:00"
}
```

**404 Not Found** — Conversación no existe

```json
{
  "success": false,
  "code": 404,
  "message": "Conversación no encontrada con ID: 999",
  "data": null,
  "timestamp": "2026-05-13T10:20:15"
}
```

---

# �🔐 Autenticación y Seguridad

## Estado Actual

🔴 **Todos los endpoints son públicos** (sin autenticación requerida) para facilitar el desarrollo y pruebas iniciales.

## Roadmap de Seguridad

Para producción, se debe implementar:

1. **Autenticación JWT** (JSON Web Tokens)
2. **Autorización basada en roles** (RBAC)
3. **HTTPS** obligatorio
4. **Rate limiting** para prevenir abuso de APIs

### Ejemplo de Header de Autenticación (Futuro)

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Roles y Permisos (Propuesta)

| Rol              | Usuarios | Incidencias (Listar) | Incidencias (Crear) | Incidencias (Actualizar) | Categorías (Gestionar) |
|------------------|----------|----------------------|---------------------|--------------------------|------------------------|
| `Usuario`        | ❌ No    | ✅ Sus propias       | ✅ Sí               | ✅ Sus propias           | ❌ No                  |
| `Técnico`        | ❌ No    | ✅ Todas             | ✅ Sí               | ✅ Asignadas             | ❌ No                  |
| `Soporte`        | ❌ No    | ✅ Todas             | ✅ Sí               | ✅ Todas                 | ❌ No                  |
| `Jefe`           | ✅ Ver   | ✅ Todas             | ✅ Sí               | ✅ Todas                 | ✅ Sí                  |
| `Administrador`  | ✅ Total | ✅ Todas             | ✅ Sí               | ✅ Todas                 | ✅ Sí                  |

---

# ⚠️ Manejo de Errores

La API implementa un **manejador global de excepciones** (`@RestControllerAdvice`) que captura todas las excepciones y las transforma en respuestas JSON consistentes.

## Tipos de Errores

### 1. Errores de Validación (400)

Se disparan cuando los datos de entrada no cumplen las restricciones de Bean Validation.

**Ejemplo de respuesta:**

```json
{
  "success": false,
  "code": 400,
  "message": "Error de validación: El correo no tiene un formato válido; La contraseña debe tener mínimo 8 caracteres",
  "data": null,
  "timestamp": "2026-05-12T16:20:00"
}
```

### 2. Recurso No Encontrado (404)

Se dispara cuando se busca un recurso por ID que no existe.

**Ejemplo de respuesta:**

```json
{
  "success": false,
  "code": 404,
  "message": "Usuario no encontrado con ID: 999",
  "data": null,
  "timestamp": "2026-05-12T16:21:00"
}
```

### 3. Conflicto de Regla de Negocio (409)

Se dispara cuando se intenta crear un recurso duplicado o violar una regla de negocio.

**Ejemplo de respuesta:**

```json
{
  "success": false,
  "code": 409,
  "message": "Ya existe un usuario registrado con el correo: admin@swo.com",
  "data": null,
  "timestamp": "2026-05-12T16:22:00"
}
```

### 4. Error Interno del Servidor (500)

Se dispara cuando ocurre un error inesperado no controlado.

**Ejemplo de respuesta:**

```json
{
  "success": false,
  "code": 500,
  "message": "Error interno del servidor. Contacte al administrador del sistema.",
  "data": null,
  "timestamp": "2026-05-12T16:23:00"
}
```

---

# 🔌 Ejemplos de Integración Angular

## Configuración del Servicio HTTP

### usuario.service.ts

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface UsuarioDTO {
  idUsuario: number;
  nombreCompleto: string;
  correo: string;
  rol: string;
  estado: boolean;
  telefono: string;
  departamento: string;
  fotoPerfil: string | null;
  fechaRegistro: string;
  ultimaConexion: string | null;
}

export interface UsuarioRequestDTO {
  nombreCompleto: string;
  correo: string;
  password: string;
  rol: string;
  telefono?: string;
  departamento?: string;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly API_URL = `${environment.apiUrl}/v1/usuarios`;

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ApiResponse<UsuarioDTO[]>> {
    return this.http.get<ApiResponse<UsuarioDTO[]>>(this.API_URL);
  }

  listarActivos(): Observable<ApiResponse<UsuarioDTO[]>> {
    return this.http.get<ApiResponse<UsuarioDTO[]>>(`${this.API_URL}/activos`);
  }

  obtenerPorId(id: number): Observable<ApiResponse<UsuarioDTO>> {
    return this.http.get<ApiResponse<UsuarioDTO>>(`${this.API_URL}/${id}`);
  }

  crear(usuario: UsuarioRequestDTO): Observable<ApiResponse<UsuarioDTO>> {
    return this.http.post<ApiResponse<UsuarioDTO>>(this.API_URL, usuario);
  }

  actualizar(id: number, usuario: UsuarioRequestDTO): Observable<ApiResponse<UsuarioDTO>> {
    return this.http.put<ApiResponse<UsuarioDTO>>(`${this.API_URL}/${id}`, usuario);
  }

  desactivar(id: number): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${this.API_URL}/${id}/desactivar`, null);
  }

  eliminar(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/${id}`);
  }
}
```

### incidencia.service.ts

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface PageableResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface IncidenciaDTO {
  idIncidencia: number;
  titulo: string;
  descripcion: string;
  estado: string;
  impacto: string;
  ubicacion: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  fechaCierre: string | null;
  idUsuarioReporta: number;
  nombreUsuarioReporta: string;
  idCategoria: number | null;
  nombreCategoria: string | null;
}

export interface IncidenciaRequestDTO {
  titulo: string;
  descripcion: string;
  estado?: string;
  impacto?: string;
  ubicacion?: string;
  idUsuarioReporta: number;
  idCategoria?: number;
}

@Injectable({ providedIn: 'root' })
export class IncidenciaService {
  private readonly API_URL = `${environment.apiUrl}/v1/incidencias`;

  constructor(private http: HttpClient) {}

  listarTodas(page = 0, size = 10): Observable<ApiResponse<PageableResponse<IncidenciaDTO>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<PageableResponse<IncidenciaDTO>>>(this.API_URL, { params });
  }

  listarPorEstado(estado: string, page = 0, size = 10): Observable<ApiResponse<PageableResponse<IncidenciaDTO>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<PageableResponse<IncidenciaDTO>>>(`${this.API_URL}/estado/${estado}`, { params });
  }

  buscarPorTexto(query: string, page = 0, size = 10): Observable<ApiResponse<PageableResponse<IncidenciaDTO>>> {
    const params = new HttpParams().set('q', query).set('page', page).set('size', size);
    return this.http.get<ApiResponse<PageableResponse<IncidenciaDTO>>>(`${this.API_URL}/buscar`, { params });
  }

  obtenerPorId(id: number): Observable<ApiResponse<IncidenciaDTO>> {
    return this.http.get<ApiResponse<IncidenciaDTO>>(`${this.API_URL}/${id}`);
  }

  crear(incidencia: IncidenciaRequestDTO): Observable<ApiResponse<IncidenciaDTO>> {
    return this.http.post<ApiResponse<IncidenciaDTO>>(this.API_URL, incidencia);
  }

  actualizar(id: number, incidencia: IncidenciaRequestDTO): Observable<ApiResponse<IncidenciaDTO>> {
    return this.http.put<ApiResponse<IncidenciaDTO>>(`${this.API_URL}/${id}`, incidencia);
  }

  cambiarEstado(id: number, nuevoEstado: string): Observable<ApiResponse<IncidenciaDTO>> {
    const params = new HttpParams().set('nuevoEstado', nuevoEstado);
    return this.http.patch<ApiResponse<IncidenciaDTO>>(`${this.API_URL}/${id}/estado`, null, { params });
  }

  eliminar(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/${id}`);
  }
}
```

### Uso en Componente

```typescript
import { Component, OnInit } from '@angular/core';
import { IncidenciaService, IncidenciaDTO } from '@core/services/incidencia.service';

@Component({
  selector: 'app-lista-incidencias',
  templateUrl: './lista-incidencias.component.html'
})
export class ListaIncidenciasComponent implements OnInit {
  incidencias: IncidenciaDTO[] = [];
  paginaActual = 0;
  totalPaginas = 0;
  cargando = false;

  constructor(private incidenciaService: IncidenciaService) {}

  ngOnInit(): void {
    this.cargarIncidencias();
  }

  cargarIncidencias(): void {
    this.cargando = true;
    this.incidenciaService.listarTodas(this.paginaActual, 10).subscribe({
      next: (response) => {
        if (response.success) {
          this.incidencias = response.data.content;
          this.totalPaginas = response.data.totalPages;
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar incidencias:', err);
        this.cargando = false;
      }
    });
  }

  cambiarEstado(id: number, nuevoEstado: string): void {
    this.incidenciaService.cambiarEstado(id, nuevoEstado).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Estado actualizado exitosamente');
          this.cargarIncidencias(); // Recargar lista
        }
      },
      error: (err) => alert('Error al cambiar estado: ' + err.message)
    });
  }
}
```

---

## 📚 Recursos Adicionales

- **Swagger UI interactivo:** `http://localhost:8081/api/swagger-ui.html`
- **OpenAPI JSON spec:** `http://localhost:8081/api/v3/api-docs`
- **Repositorio Git:** [GIT_GUIDE.md](GIT_GUIDE.md)

---

## 📞 Soporte

Para reportar errores o solicitar nuevas funcionalidades, contactar al equipo de desarrollo en:

- **Email:** dev@swo.com
- **Sistema de incidencias interno:** `http://localhost:4200`

---

**Última actualización:** 13 de mayo de 2026  
**Versión del documento:** 2.0.0  

### Novedades v2.0.0
- ✅ Módulo de Proyectos con gestión de asignaciones ManyToMany
- ✅ Módulo de Chatbot con IA contextual y historial
- ✅ Endpoint de activación de usuarios
- ✅ Validaciones reforzadas (IllegalArgument y NullPointer handlers)
- ✅ Colección Postman actualizada con 39 endpoints
