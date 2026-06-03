# Documentación por Módulo y Componente — SWO
## Sistema de Gestión de Incidencias

**Proyecto:** SWO ServiceDesk  
**Versión:** 1.0.0  
**Fecha:** Junio 2026  
**Stack:** Angular 17 (Frontend) + Spring Boot 3.2.4 (Backend)

---

## Tabla de Contenido

1. [Arquitectura General](#1-arquitectura-general)
2. [Frontend — Modelos y DTOs](#2-frontend--modelos-y-dtos)
3. [Frontend — Servicios](#3-frontend--servicios)
4. [Frontend — Componentes](#4-frontend--componentes)
5. [Backend — Entidades](#5-backend--entidades)
6. [Backend — DTOs Request / Response](#6-backend--dtos-request--response)
7. [Backend — Controladores REST](#7-backend--controladores-rest)
8. [Backend — Servicios](#8-backend--servicios)
9. [Backend — Repositorios](#9-backend--repositorios)
10. [Enumeraciones y Constantes](#10-enumeraciones-y-constantes)
11. [Manejo de Errores](#11-manejo-de-errores)
12. [Matriz de Integración Frontend–Backend](#12-matriz-de-integración-frontendbackend)

---

## 1. Arquitectura General

```
┌─────────────────────────────────────┐     HTTP/REST      ┌──────────────────────────────────┐
│          FRONTEND Angular 17        │◄──────────────────►│     BACKEND Spring Boot 3.2.4    │
│                                     │    JSON/Form-data   │                                  │
│  Components → Services → HttpClient │                     │  Controllers → Services → JPA   │
│         RxJS / BehaviorSubject       │                     │     DTOs ↔ Entities ↔ MySQL      │
└─────────────────────────────────────┘                     └──────────────────────────────────┘
```

**URL Base de la API:** `http://localhost:8080` (desarrollo)  
**Prefijo de rutas:** `/v1`  
**Formato de respuesta:** `ApiResponse<T>` → `{ success, message, data, timestamp }`

---

## 2. Frontend — Modelos y DTOs

### 2.1 Modelos de Dominio (`src/app/core/models/models.ts`)

#### `Usuario`

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | `string` | ✅ | Identificador único |
| `nombre` | `string` | ✅ | Nombre completo |
| `apellido` | `string` | ✅ | Apellido |
| `correo` | `string` | ✅ | Correo electrónico |
| `celular` | `string` | ❌ | Número de celular |
| `area` | `string` | ❌ | Área o departamento |
| `jefeDirecto` | `string` | ❌ | Nombre del jefe directo |
| `correoJefe` | `string` | ❌ | Correo del jefe directo |

#### `UsuarioAutenticado` *(extiende Usuario)*

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `role` | `string` | ✅ | Rol del usuario en el sistema |
| `token` | `string` | ❌ | JWT de autenticación |
| `idProyecto` | `number` | ❌ | ID del proyecto asignado |
| `proyecto` | `string` | ❌ | Nombre del proyecto asignado |

#### `Incidencia`

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | `string` | ✅ | Identificador único |
| `title` | `string` | ✅ | Título de la incidencia |
| `state` | `EstadoIncidencia` | ✅ | Estado actual |
| `priority` | `PrioridadIncidencia` | ✅ | Nivel de prioridad |
| `assignee` | `string` | ✅ | Agente asignado |
| `idUsuarioAsignado` | `number` | ❌ | ID del agente asignado |
| `project` | `string` | ✅ | Nombre del proyecto |
| `date` | `Date` | ✅ | Fecha de creación |
| `tags` | `string[]` | ✅ | Etiquetas categoría |
| `comments` | `Comentario[]` | ✅ | Comentarios registrados |
| `user` | `string` | ✅ | Nombre del usuario reportante |
| `userEmail` | `string` | ✅ | Correo del usuario reportante |
| `userPhones` | `string[]` | ✅ | Teléfonos de contacto |
| `app` | `string` | ✅ | Aplicación afectada |
| `reason` | `string` | ✅ | Motivo o descripción |
| `activity` | `string` | ✅ | Actividad que se realizaba |
| `resolucion` | `string` | ❌ | Texto de resolución |
| `fechaResolucion` | `Date` | ❌ | Fecha en que se resolvió |

#### `Proyecto`

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | `number` | ✅ | Identificador único |
| `nombre` | `string` | ✅ | Nombre del proyecto |
| `descripcion` | `string` | ✅ | Descripción del proyecto |
| `estado` | `string` | ✅ | Estado: Activo / En Pausa / Completado |
| `fechaCreacion` | `string` | ❌ | Fecha de creación |

#### `Comentario`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `author` | `string` | Autor del comentario |
| `date` | `Date` | Fecha y hora |
| `text` | `string` | Contenido del comentario |

#### `HistorialCambio`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `string` | Identificador único |
| `fecha` | `Date` | Fecha del cambio |
| `usuario` | `string` | Usuario que realizó el cambio |
| `tipo` | `TipoAccionHistorial` | Tipo de acción |
| `accion` | `string` | Descripción corta de la acción |
| `descripcion` | `string` | Descripción completa |
| `valorAnterior` | `string` | ❌ Valor previo al cambio |
| `valorNuevo` | `string` | ❌ Nuevo valor establecido |

---

### 2.2 DTOs de Comunicación (`src/app/core/models/dtos.ts`)

#### `LoginRequest` — Entrada

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `correo` | `string` | ✅ | Correo del usuario |
| `password` | `string` | ✅ | Contraseña |

#### `LoginResponse` — Salida

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `success` | `boolean` | Indica si el login fue exitoso |
| `id` | `number` | ❌ ID del usuario |
| `nombre` | `string` | ❌ Nombre del usuario |
| `correo` | `string` | ❌ Correo del usuario |
| `rol` | `string` | ❌ Rol asignado |
| `token` | `string` | ❌ Token JWT |
| `departamento` | `string` | ❌ Departamento |
| `idProyecto` | `number` | ❌ ID de proyecto |
| `proyecto` | `string` | ❌ Nombre de proyecto |
| `deleted` | `boolean` | ❌ Si el usuario fue eliminado lógicamente |
| `error` | `string` | ❌ Mensaje de error si falla |

#### `CrearIncidenciaRequest` — Entrada

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `titulo` | `string` | ✅ | Título de la incidencia |
| `descripcion` | `string` | ✅ | Descripción detallada |
| `estado` | `string` | ❌ | Estado inicial (default: Abierto) |
| `impacto` | `string` | ❌ | Nivel de impacto |
| `ubicacion` | `string` | ❌ | Ubicación del usuario |
| `idUsuarioReporta` | `number` | ❌ | ID del usuario reportante |
| `idProyecto` | `number` | ❌ | ID del proyecto relacionado |
| `actividad` | `string` | ❌ | Actividad que se realizaba |
| `aplicacion` | `string` | ❌ | Aplicación afectada |
| `categoria` | `string` | ❌ | Categoría de la incidencia |
| `urgencia` | `string` | ❌ | Nivel de urgencia |

#### `IncidenciaBackendDTO` — Salida del Backend

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `number` | ID de la incidencia |
| `titulo` | `string` | Título |
| `estado` | `string` | Estado actual |
| `impacto` | `string` | Nivel de impacto |
| `asignado` | `string` | ❌ Agente asignado |
| `ubicacion` | `string` | Ubicación |
| `fechaCreacion` | `string` | Fecha de creación (ISO 8601) |
| `idUsuarioReporta` | `number` | ID del reportante |
| `correoUsuario` | `string` | ❌ Correo del reportante |
| `telefonosUsuario` | `string[]` | ❌ Teléfonos de contacto |
| `descripcion` | `string` | Descripción |
| `actividad` | `string` | ❌ Actividad que se realizaba |
| `aplicacion` | `string` | ❌ Aplicación afectada |
| `resolucion` | `string` | ❌ Texto de resolución |
| `fechaResolucion` | `string` | ❌ Fecha de resolución |

#### `EstadisticasResponse` — Salida

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `totalIncidencias` | `number` | Total de incidencias registradas |
| `incidenciasAbiertas` | `number` | Total en estado Abierto |
| `incidenciasEnProgreso` | `number` | Total en progreso |
| `incidenciasPendientes` | `number` | Total pendientes |
| `incidenciasResueltas` | `number` | Total resueltas |
| `porPrioridad` | `object` | ❌ Distribución por prioridad |
| `tiempoPromedioResolucion` | `number` | ❌ Horas promedio de resolución |
| `porcentajeResueltas` | `number` | ❌ Porcentaje de resolución |

---

## 3. Frontend — Servicios

### 3.1 `AuthService` (`src/app/core/services/auth.service.ts`)

**Propósito:** Gestión de sesión y autenticación de usuarios.

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `login(credenciales)` | `Credenciales` | `Observable<boolean>` | Autentica al usuario |
| `logout()` | — | `void` | Cierra sesión, limpia sesión |
| `isAutenticado()` | — | `boolean` | Verifica si hay sesión activa |
| `getUsuarioActual()` | — | `UsuarioAutenticado \| null` | Obtiene el usuario en sesión |
| `tieneRol(rol)` | `string` | `boolean` | Valida si el usuario tiene el rol indicado |
| `esAdministrador()` | — | `boolean` | Atajo para verificar rol Admin |

**Observables públicos:**

| Observable | Tipo emitido | Descripción |
|------------|-------------|-------------|
| `usuarioAutenticado$` | `UsuarioAutenticado \| null` | Estado reactivo de la sesión |

**Credenciales maestras (solo desarrollo):**
- Email: `master@swo.com` | Password: `123456` → Bypass de autenticación

---

### 3.2 `IncidentsService` (`src/app/core/services/incidents.service.ts`)

**Propósito:** CRUD completo de incidencias con historial de cambios y caché de estadísticas.

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `obtenerIncidencias()` | — | `Observable<Incidencia[]>` | Lista todas las incidencias |
| `obtenerIncidenciaPorId(id)` | `string` | `Incidencia \| undefined` | Búsqueda local por ID |
| `filtrarIncidencias(filtros)` | `FiltrosIncidencia` | `Incidencia[]` | Filtrado multi-criterio |
| `buscarIncidencias(termino)` | `string` | `Incidencia[]` | Búsqueda de texto libre |
| `crearIncidencia(datos)` | `CrearIncidenciaDTO` | `Observable<any>` | Crea incidencia en el backend |
| `actualizarIncidenciaBackend(id, datos)` | `string, ActualizarDTO` | `Observable<any>` | Actualiza en el backend |
| `cambiarEstado(id, estado)` | `string, EstadoIncidencia` | `Observable<void>` | Cambia estado con validación |
| `cambiarPrioridad(id, prioridad)` | `string, PrioridadIncidencia` | `Observable<void>` | Cambia prioridad |
| `asignarIncidencia(id, asignado)` | `string, string` | `Observable<void>` | Asigna agente |
| `agregarComentario(id, autor, texto)` | `string, string, string` | `Observable<void>` | Agrega comentario |
| `obtenerEstadísticas(forzar?)` | `boolean?` | `EstadisticasIncidencias` | Estadísticas con caché 5 min |
| `obtenerHistorial(id)` | `string` | `HistorialCambio[]` | Historial de cambios |
| `exportarHistorial(id)` | `string` | `string` | Exporta historial como texto |

**Reglas de negocio:**
- Solo incidencias en estado `open` pueden recibir primera asignación
- El historial se genera automáticamente en cada cambio
- Las estadísticas se cachean por 5 minutos

---

### 3.3 `ProjectsService` (`src/app/core/services/projects.service.ts`)

**Propósito:** Gestión de proyectos con sincronización reactiva.

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `obtenerProyectos()` | — | `Observable<Proyecto[]>` | Lista todos los proyectos |
| `obtenerProyectoPorId(id)` | `number` | `Proyecto \| undefined` | Búsqueda local |
| `buscarProyectos(termino)` | `string` | `Proyecto[]` | Búsqueda por nombre/descripción |
| `obtenerProyectosActivos()` | — | `Proyecto[]` | Filtra estado = Activo |
| `obtenerProyectosPorEstado(estado)` | `string` | `Proyecto[]` | Filtra por estado |
| `crearProyecto(nombre, desc?, estado?)` | `string, string?, string?` | `Observable<any>` | POST al backend |
| `eliminarProyecto(id)` | `number` | `Observable<any>` | DELETE al backend |
| `asignarUsuario(idUsuario, idProyecto)` | `number, number` | `Observable<any>` | Asigna usuario a proyecto |
| `obtenerTotalProyectos()` | — | `number` | Conteo total |
| `obtenerConteosPorEstado()` | — | `{[estado: string]: number}` | Distribución por estado |

---

### 3.4 `UsersService` (`src/app/core/services/users.service.ts`)

**Propósito:** Gestión de usuarios del sistema.

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `obtenerUsuarios()` | — | `Observable<Usuario[]>` | Lista todos los usuarios |
| `obtenerUsuarioPorId(id)` | `string` | `Usuario \| undefined` | Búsqueda local por ID |
| `obtenerUsuarioPorCorreo(correo)` | `string` | `Usuario \| undefined` | Búsqueda por correo |
| `obtenerUsuariosPorArea(area)` | `string` | `Usuario[]` | Filtra por área |
| `buscarUsuarios(termino)` | `string` | `Usuario[]` | Búsqueda en nombre, correo, área |
| `filtrarUsuarios(filtros)` | `FiltrosUsuario` | `Usuario[]` | Filtrado avanzado |
| `obtenerAgentesDisponibles()` | — | `Usuario[]` | Agentes técnicos disponibles |
| `correoYaExiste(correo)` | `string` | `boolean` | Valida unicidad de correo |
| `agregarUsuarioBackend(datos)` | `CrearUsuarioDTO` | `Observable<any>` | POST al backend |
| `eliminarUsuarioBackend(id)` | `string` | `Observable<any>` | DELETE al backend |
| `obtenerConteosPorArea()` | — | `{[area: string]: number}` | Distribución por área |
| `obtenerListaAreas()` | — | `string[]` | Lista de áreas únicas |

---

### 3.5 `ChatbotService` (`src/app/core/services/chatbot.service.ts`)

**Propósito:** Asistente virtual con base de conocimiento y escalamiento a agente.

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `enviarConsulta(consulta)` | `string` | `Observable<Mensaje>` | Procesa la consulta del usuario |
| `crearIncidenciaDesdeChat(titulo, desc, ctx?)` | `string, string, EscalamientoContext?` | `Observable<any>` | Crea incidencia desde el chat |
| `escalarAAgente(motivo, ctx)` | `string, EscalamientoContext` | `Observable<any>` | Escala la conversación a agente |
| `agregarMensajeUsuario(texto)` | `string` | `void` | Registra mensaje del usuario |
| `obtenerMensajes()` | — | `Mensaje[]` | Lista de mensajes del historial |
| `limpiarHistorial()` | — | `void` | Limpia la conversación activa |
| `exportarHistorial()` | — | `string` | Exporta historial en texto plano |
| `obtenerAccionesRapidas()` | — | `{label, query}[]` | Acciones sugeridas al usuario |

**Interfaces internas:**

`Mensaje`:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `texto` | `string` | Contenido del mensaje |
| `autor` | `'user' \| 'bot'` | Quién envió el mensaje |
| `timestamp` | `Date` | Momento del mensaje |
| `pasos` | `string[]` | ❌ Pasos de solución |
| `categoria` | `string` | ❌ Categoría identificada |
| `nivel` | `number` | ❌ Nivel de dificultad técnica |

---

### 3.6 `NotificationService` (`src/app/core/services/notification.service.ts`)

**Propósito:** Toast de UI y polling de notificaciones del backend.

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `iniciarPolling(idUsuario)` | `number` | `void` | Inicia polling cada 30 s |
| `detenerPolling()` | — | `void` | Detiene el polling |
| `marcarComoLeida(id)` | `number` | `void` | Marca notificación como leída |
| `obtenerNoLeidas()` | — | `number` | Cantidad de no leídas |
| `toast(msg, dur?, tipo?)` | `string, number?, TipoToast?` | `void` | Muestra toast en la UI |

**Tipos de toast:** `'info'` · `'success'` · `'warning'` · `'error'`

---

## 4. Frontend — Componentes

### 4.1 `AuthComponent` (`src/app/features/auth/auth.component.ts`)

**Ruta:** `/login`  
**Propósito:** Formulario de inicio de sesión.

**Datos de entrada (formulario):**

| Campo | Tipo | Validaciones |
|-------|------|-------------|
| `email` | `string` | Requerido · Formato email · Mín 5 chars |
| `password` | `string` | Requerido · Mín 6 chars |

**Propiedades públicas:**

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `loginForm` | `FormGroup` | Formulario reactivo |
| `isLoading` | `boolean` | Estado de carga durante el login |
| `errorMessage` | `string` | Mensaje de error de autenticación |
| `isFormValid` | `boolean` (getter) | True si el formulario es válido |
| `isSubmitDisabled` | `boolean` (getter) | True si formulario inválido o cargando |
| `emailError` | `string` (getter) | Mensaje de error del campo email |
| `passwordError` | `string` (getter) | Mensaje de error del campo password |

**Métodos:**

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `onSubmit()` | — | `void` | Valida y envía las credenciales |
| `ngOnInit()` | — | `void` | Redirige si ya está autenticado |

**Flujo:**
1. Verifica si ya está autenticado → redirige a `/dashboard`
2. Usuario completa formulario → `onSubmit()` → `AuthService.login()`
3. Éxito: navega a `/dashboard`
4. Error: muestra `errorMessage`

---

### 4.2 `IncidentsComponent` (`src/app/features/incidents/incidents.component.ts`)

**Ruta:** `/incidents`  
**Propósito:** Módulo principal de gestión de incidencias (CRUD completo).

**Propiedades públicas:**

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `incidentes` | `Incidencia[]` | Lista completa cargada |
| `incidentesFiltrados` | `Incidencia[]` | Lista tras aplicar filtros |
| `incidenteSeleccionado` | `Incidencia \| null` | Incidencia en detalle/edición |
| `usuariosPendientes` | `Usuario[]` | Agentes disponibles para asignación |
| `filtroEstado` | `string` | Filtro activo por estado |
| `busqueda` | `string` | Término de búsqueda de texto |
| `mostrarModalNueva` | `boolean` | Control del modal de creación |
| `mostrarDetalle` | `boolean` | Control del panel de detalle |
| `modoEdicion` | `boolean` | Control del modo edición |
| `modoResolucion` | `boolean` | Control del modo resolución |
| `guardando` | `boolean` | Flag durante creación |
| `guardandoCambios` | `boolean` | Flag durante actualización |

**Formularios reactivos:**

`nuevaIncidenciaForm`:

| Campo | Validaciones |
|-------|-------------|
| `titulo` | Requerido · Sin blancos · Mín 5 / Máx 100 chars |
| `descripcion` | Requerido · Sin blancos · Mín 10 palabras · Máx 500 chars |
| `estado` | Requerido |
| `impacto` | Requerido |
| `ubicacion` | Requerido |
| `actividad` | Requerido |
| `aplicacion` | Requerido |

`resolucionForm`:

| Campo | Validaciones |
|-------|-------------|
| `resolucion` | Requerido · Sin blancos · Mín 5 palabras · Máx 500 chars |

**Palabras prohibidas en título/descripción:** `test`, `prueba`, `spam`

**Métodos principales:**

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `cargarIncidentes()` | — | `void` | Carga desde backend y aplica filtros |
| `aplicarFiltros()` | — | `void` | Filtra por estado y búsqueda |
| `guardarNuevaIncidencia()` | — | `void` | Crea incidencia en el backend |
| `guardarEdicion()` | — | `void` | Guarda cambios de edición |
| `resolverIncidencia()` | — | `void` | Marca como resuelta con texto |
| `cambiarEstado(inc, event)` | `Incidencia, Event` | `void` | Cambia estado de una incidencia |
| `cambiarPrioridad(inc, event)` | `Incidencia, Event` | `void` | Cambia prioridad |
| `asignar()` | — | `void` | Asigna agente seleccionado |
| `agregarComentario(texto)` | `string` | `void` | Agrega comentario a la incidencia |
| `verDetalle(inc)` | `Incidencia` | `void` | Abre panel de detalle |
| `abrirModalNueva()` | — | `void` | Abre modal de creación |
| `obtenerEstadisticas()` | — | `EstadisticasIncidencias` | Estadísticas del módulo |

---

### 4.3 `ProjectsComponent` (`src/app/features/projects/projects.component.ts`)

**Ruta:** `/projects`  
**Propósito:** Gestión de proyectos y asignación de usuarios.

**Propiedades públicas:**

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `proyectos` | `Proyecto[]` | Lista de proyectos cargados |
| `cargando` | `boolean` | Estado de carga |
| `mostrarModal` | `boolean` | Control del modal de creación |
| `guardando` | `boolean` | Flag durante creación |
| `nuevoProyecto` | `{nombre, descripcion, estado}` | Modelo del formulario |
| `mostrarAsignar` | `boolean` | Control del panel de asignación |
| `idProyectoSeleccionado` | `number` | ID del proyecto para asignar |
| `usuarios` | `{id, nombre, proyecto}[]` | Usuarios disponibles para asignar |
| `idUsuarioSeleccionado` | `number` | ID del usuario a asignar |
| `asignando` | `boolean` | Flag durante asignación |

**Métodos:**

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `cargarProyectos()` | — | `void` | Carga lista desde backend |
| `abrirModal()` | — | `void` | Muestra modal y limpia formulario |
| `cerrarModal()` | — | `void` | Oculta el modal |
| `guardarProyecto()` | — | `void` | Crea el proyecto en el backend |
| `eliminarProyecto(id, nombre)` | `number, string` | `void` | Elimina con confirmación |
| `abrirAsignar(idProyecto)` | `number` | `void` | Abre panel y carga usuarios |
| `cerrarAsignar()` | — | `void` | Cierra panel de asignación |
| `confirmarAsignacion()` | — | `void` | Confirma asignación de usuario |

**Validaciones en `guardarProyecto()`:**
- El campo `nombre` no puede estar vacío ni contener solo espacios

---

### 4.4 `UsersComponent` (`src/app/features/users/users.component.ts`)

**Ruta:** `/users`  
**Propósito:** Gestión del listado de usuarios registrados en el sistema.

**Propiedades públicas:**

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `usuarios` | `Usuario[]` | Lista completa de usuarios |
| `usuariosFiltrados` | `Usuario[]` | Lista filtrada para mostrar |
| `busqueda` | `string` | Término de búsqueda activo |
| `cargando` | `boolean` | Estado de carga |

**Métodos:**

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `cargarUsuarios()` | — | `void` | Carga usuarios del backend |
| `filtrar(termino)` | `string` | `void` | Aplica filtro de búsqueda |
| `eliminarUsuario(id)` | `string` | `void` | Elimina con confirmación |

---

### 4.5 `DashboardComponent` (`src/app/features/dashboard/dashboard.component.ts`)

**Ruta:** `/dashboard`  
**Propósito:** Panel principal con métricas y resumen del sistema.

**Datos de salida (visualización):**

| Elemento | Fuente | Descripción |
|----------|--------|-------------|
| Total de incidencias | `IncidentsService.obtenerEstadísticas()` | Contador global |
| Incidencias por estado | idem | Distribución en tarjetas |
| Proyectos activos | `ProjectsService.obtenerProyectosActivos()` | Conteo |
| Usuarios registrados | `UsersService.obtenerUsuarios()` | Conteo |
| Tiempo promedio resolución | `EstadisticasResponse` | En horas |

---

### 4.6 `ChatbotComponent` (`src/app/features/chatbot/chatbot.component.ts`)

**Ruta:** `/chatbot`  
**Propósito:** Interfaz de conversación con el asistente virtual.

**Datos de entrada:**

| Elemento | Tipo | Descripción |
|----------|------|-------------|
| Consulta del usuario | `string` (input de texto) | Pregunta o descripción del problema |
| Acción rápida seleccionada | `{label, query}` | Acceso directo a consultas frecuentes |

**Datos de salida:**

| Elemento | Tipo | Descripción |
|----------|------|-------------|
| Respuesta del bot | `Mensaje` | Texto con pasos de solución opcionales |
| Opción de escalar | `boolean` | Si el bot ofrece escalar a agente |
| Historial exportado | `string` | Texto plano del historial completo |

---

### 4.7 `ReportsComponent` (`src/app/features/reports/reports.component.ts`)

**Ruta:** `/reports`  
**Propósito:** Generación de reportes estadísticos del sistema.

**Datos de entrada (formulario de generación):**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `tipo` | `string` | Tipo de reporte (Incidencias / Proyectos / Usuarios) |
| `formato` | `FormatoReporte` | PDF · Excel · CSV · JSON |
| `fechaInicio` | `Date` | Inicio del período |
| `fechaFin` | `Date` | Fin del período |
| `filtros` | `object` | Filtros adicionales opcionales |

**Datos de salida:**

| Elemento | Descripción |
|----------|-------------|
| Archivo descargado | Reporte en el formato seleccionado |
| Estadísticas visuales | Métricas del período consultado |

---

### 4.8 `SidebarComponent` (`src/app/shared/components/sidebar/sidebar.component.ts`)

**Propósito:** Navegación principal lateral.

**Datos de entrada (`@Input`):**

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| (sin @Input explícitos) | — | Consume `AuthService` para mostrar datos del usuario |

**Datos de salida:**

| Elemento | Descripción |
|----------|-------------|
| Enlace activo | Ruta Angular Router activa resaltada |
| Nombre y rol del usuario | Obtenido de `AuthService.getUsuarioActual()` |
| Acción de logout | Llama `AuthService.logout()` |

---

### 4.9 Componentes Compartidos (`src/app/shared/components/`)

#### `ButtonComponent`

| @Input | Tipo | Descripción |
|--------|------|-------------|
| `label` | `string` | Texto del botón |
| `type` | `'button' \| 'submit'` | Tipo HTML del botón |
| `disabled` | `boolean` | Estado deshabilitado |
| `variant` | `string` | Estilo visual (primary, secondary, danger) |

#### `InputComponent`

| @Input | Tipo | Descripción |
|--------|------|-------------|
| `label` | `string` | Etiqueta del campo |
| `type` | `string` | Tipo HTML del input |
| `placeholder` | `string` | Texto de ayuda |
| `control` | `FormControl` | Control reactivo asociado |
| `errorMessage` | `string` | Mensaje de error a mostrar |

#### `ModalComponent`

| @Input | Tipo | Descripción |
|--------|------|-------------|
| `title` | `string` | Título del modal |
| `visible` | `boolean` | Controla visibilidad |

| @Output | Tipo | Descripción |
|---------|------|-------------|
| `closed` | `EventEmitter<void>` | Emite cuando el modal se cierra |

---

## 5. Backend — Entidades

### 5.1 `Usuario` (`com.swo.api.model.entity.Usuario`)

**Tabla:** `usuarios`

| Campo | Tipo Java | Tipo SQL | Restricciones | Descripción |
|-------|-----------|----------|---------------|-------------|
| `idUsuario` | `Long` | `BIGINT` | PK, auto | Clave primaria |
| `nombreCompleto` | `String` | `VARCHAR(100)` | NOT NULL | Nombre del usuario |
| `correo` | `String` | `VARCHAR(150)` | UNIQUE, NOT NULL | Correo electrónico |
| `passwordHash` | `String` | `VARCHAR(255)` | NOT NULL | Contraseña hasheada |
| `rol` | `String` | `VARCHAR(50)` | NOT NULL | Rol del sistema |
| `estado` | `boolean` | `TINYINT(1)` | DEFAULT true | Activo/inactivo |
| `telefono` | `String` | `VARCHAR(20)` | NULL | Teléfono de contacto |
| `departamento` | `String` | `VARCHAR(50)` | NULL | Departamento |
| `fotoPerfil` | `String` | `VARCHAR(255)` | NULL | URL de la foto |
| `fechaRegistro` | `LocalDateTime` | `DATETIME` | DEFAULT NOW | Fecha de registro |
| `ultimaConexion` | `LocalDateTime` | `DATETIME` | NULL | Último acceso |

**Roles válidos:** `Soporte` · `Jefe` · `Usuario` · `Administrador` · `Técnico`

---

### 5.2 `Incidencia` (`com.swo.api.model.entity.Incidencia`)

**Tabla:** `incidencias`

| Campo | Tipo Java | Tipo SQL | Restricciones | Descripción |
|-------|-----------|----------|---------------|-------------|
| `idIncidencia` | `Long` | `BIGINT` | PK, auto | Clave primaria |
| `titulo` | `String` | `VARCHAR(200)` | NOT NULL | Título de la incidencia |
| `descripcion` | `String` | `TEXT` | NOT NULL | Descripción detallada |
| `estado` | `String` | `VARCHAR(50)` | DEFAULT 'Abierto' | Estado actual |
| `ubicacion` | `String` | `VARCHAR(100)` | NOT NULL | Ubicación del usuario |
| `impacto` | `String` | `VARCHAR(50)` | DEFAULT 'Medio' | Nivel de impacto |
| `fechaCreacion` | `LocalDateTime` | `DATETIME` | DEFAULT NOW | Fecha de creación |
| `fechaActualizacion` | `LocalDateTime` | `DATETIME` | AUTO UPDATE | Última actualización |
| `fechaCierre` | `LocalDateTime` | `DATETIME` | NULL | Fecha de cierre |
| `usuarioReporta` | `Usuario` | FK → usuarios | NOT NULL | Quién reportó |
| `categoria` | `Categoria` | FK → categorias | NULL | Categoría asignada |

**Estados válidos:** `Abierto` · `En Progreso` · `Pendiente` · `Resuelto` · `Cerrado` · `Cancelado`  
**Impactos válidos:** `Bajo` · `Medio` · `Alto` · `Crítico`

---

### 5.3 `Proyecto` (`com.swo.api.model.entity.Proyecto`)

**Tabla:** `proyectos`

| Campo | Tipo Java | Tipo SQL | Restricciones | Descripción |
|-------|-----------|----------|---------------|-------------|
| `idProyecto` | `Long` | `BIGINT` | PK, auto | Clave primaria |
| `nombre` | `String` | `VARCHAR(150)` | NOT NULL, UNIQUE | Nombre del proyecto |
| `descripcion` | `String` | `TEXT` | NULL | Descripción |
| `estado` | `String` | `VARCHAR(50)` | DEFAULT 'Activo' | Estado del proyecto |
| `fechaCreacion` | `LocalDateTime` | `DATETIME` | DEFAULT NOW | Fecha de creación |

**Estados válidos:** `Activo` · `En Pausa` · `Completado` · `Cancelado`

---

### 5.4 `Categoria` (`com.swo.api.model.entity.Categoria`)

**Tabla:** `categorias`

| Campo | Tipo Java | Tipo SQL | Restricciones | Descripción |
|-------|-----------|----------|---------------|-------------|
| `idCategoria` | `Long` | `BIGINT` | PK, auto | Clave primaria |
| `nombre` | `String` | `VARCHAR(100)` | NOT NULL, UNIQUE | Nombre de la categoría |
| `descripcion` | `String` | `VARCHAR(255)` | NULL | Descripción |

---

### 5.5 `AsignacionProyecto` (`com.swo.api.model.entity.AsignacionProyecto`)

**Tabla:** `asignaciones_proyecto`  
**Propósito:** Tabla intermedia relación M-N entre Usuario y Proyecto.

| Campo | Tipo Java | Tipo SQL | Descripción |
|-------|-----------|----------|-------------|
| `id` | `Long` | PK, auto | Clave primaria |
| `usuario` | `Usuario` | FK → usuarios | Usuario asignado |
| `proyecto` | `Proyecto` | FK → proyectos | Proyecto destino |
| `fechaAsignacion` | `LocalDateTime` | DATETIME | Fecha de asignación |

---

## 6. Backend — DTOs Request / Response

### 6.1 DTOs de Solicitud (Request)

#### `UsuarioRequestDTO`

| Campo | Tipo | Validación | Descripción |
|-------|------|-----------|-------------|
| `nombreCompleto` | `String` | `@NotBlank @Size(min=3, max=100)` | Nombre completo |
| `correo` | `String` | `@NotBlank @Email` | Correo electrónico |
| `password` | `String` | `@NotBlank @Size(min=8)` | Contraseña |
| `rol` | `String` | `@NotBlank @Pattern(...)` | Rol del usuario |
| `telefono` | `String` | `@Pattern(regex telefono)` | ❌ Teléfono |
| `departamento` | `String` | `@Size(max=50)` | ❌ Departamento |

#### `IncidenciaRequestDTO`

| Campo | Tipo | Validación | Descripción |
|-------|------|-----------|-------------|
| `titulo` | `String` | `@NotBlank` | Título de la incidencia |
| `descripcion` | `String` | `@NotBlank` | Descripción detallada |
| `estado` | `String` | — | ❌ Estado inicial |
| `ubicacion` | `String` | — | ❌ Ubicación |
| `impacto` | `String` | — | ❌ Nivel de impacto |
| `idUsuarioReporta` | `Long` | `@NotNull` | ID del usuario reportante |
| `idCategoria` | `Long` | — | ❌ ID de categoría |
| `idUsuarioAsignado` | `Long` | — | ❌ ID del agente asignado |

#### `ProyectoRequestDTO`

| Campo | Tipo | Validación | Descripción |
|-------|------|-----------|-------------|
| `nombreProyecto` | `String` | `@NotBlank` | Nombre del proyecto |
| `descripcion` | `String` | — | ❌ Descripción |
| `estado` | `String` | — | ❌ Estado inicial |

#### `CategoriaRequestDTO`

| Campo | Tipo | Validación | Descripción |
|-------|------|-----------|-------------|
| `nombre` | `String` | `@NotBlank` | Nombre de la categoría |
| `descripcion` | `String` | — | ❌ Descripción |

#### `AsignacionProyectoDTO`

| Campo | Tipo | Validación | Descripción |
|-------|------|-----------|-------------|
| `idUsuario` | `Long` | `@NotNull` | ID del usuario |
| `idProyecto` | `Long` | `@NotNull` | ID del proyecto |

#### `ChatbotRequestDTO`

| Campo | Tipo | Validación | Descripción |
|-------|------|-----------|-------------|
| `consulta` | `String` | `@NotBlank` | Texto de la consulta |
| `idUsuario` | `Long` | — | ❌ ID del usuario solicitante |
| `contexto` | `String` | — | ❌ Contexto adicional |

---

### 6.2 DTOs de Respuesta (Response)

#### `UsuarioResponseDTO`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `idUsuario` | `Long` | ID del usuario |
| `nombreCompleto` | `String` | Nombre completo |
| `correo` | `String` | Correo electrónico |
| `rol` | `String` | Rol en el sistema |
| `estado` | `boolean` | Activo/inactivo |
| `telefono` | `String` | ❌ Teléfono |
| `departamento` | `String` | ❌ Departamento |
| `fotoPerfil` | `String` | ❌ URL de foto |
| `fechaRegistro` | `LocalDateTime` | Fecha de registro |
| `ultimaConexion` | `LocalDateTime` | ❌ Último acceso |

> **Nota de seguridad:** `passwordHash` no se incluye en ninguna respuesta.

#### `IncidenciaResponseDTO`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `idIncidencia` | `Long` | ID de la incidencia |
| `titulo` | `String` | Título |
| `descripcion` | `String` | Descripción |
| `estado` | `String` | Estado actual |
| `impacto` | `String` | Nivel de impacto |
| `ubicacion` | `String` | Ubicación |
| `fechaCreacion` | `LocalDateTime` | Fecha de creación |
| `fechaActualizacion` | `LocalDateTime` | Última modificación |
| `fechaCierre` | `LocalDateTime` | ❌ Fecha de cierre |
| `usuarioReporta` | `UsuarioResponseDTO` | Datos del reportante |
| `categoria` | `CategoriaResponseDTO` | ❌ Categoría |

#### `ProyectoResponseDTO`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `idProyecto` | `Long` | ID del proyecto |
| `nombre` | `String` | Nombre del proyecto |
| `descripcion` | `String` | Descripción |
| `estado` | `String` | Estado |
| `fechaCreacion` | `LocalDateTime` | Fecha de creación |
| `usuarios` | `List<UsuarioResponseDTO>` | Usuarios asignados |

#### `CategoriaResponseDTO`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `idCategoria` | `Long` | ID de la categoría |
| `nombre` | `String` | Nombre |
| `descripcion` | `String` | ❌ Descripción |

#### `ChatbotResponseDTO`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `respuesta` | `String` | Respuesta del bot |
| `pasos` | `List<String>` | ❌ Pasos de solución |
| `categoria` | `String` | ❌ Categoría identificada |
| `nivel` | `Integer` | ❌ Nivel técnico 1-3 |
| `sugerencias` | `List<String>` | ❌ Consultas relacionadas |

#### `ApiResponse<T>` — Envoltura estándar de todas las respuestas

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `success` | `boolean` | Indica si la operación fue exitosa |
| `message` | `String` | Mensaje descriptivo |
| `data` | `T` | Datos de la respuesta |
| `timestamp` | `LocalDateTime` | Fecha y hora de la respuesta |

---

## 7. Backend — Controladores REST

### 7.1 `UsuarioController` — Base: `/v1/usuarios`

| Método HTTP | Ruta | Entrada | Salida | Descripción |
|-------------|------|---------|--------|-------------|
| `GET` | `/` | — | `ApiResponse<List<UsuarioResponseDTO>>` | Listar todos |
| `GET` | `/activos` | — | `ApiResponse<List<UsuarioResponseDTO>>` | Listar activos |
| `GET` | `/{id}` | `@PathVariable Long id` | `ApiResponse<UsuarioResponseDTO>` | Obtener por ID |
| `GET` | `/correo/{correo}` | `@PathVariable String correo` | `ApiResponse<UsuarioResponseDTO>` | Obtener por correo |
| `POST` | `/` | `@RequestBody @Valid UsuarioRequestDTO` | `ApiResponse<UsuarioResponseDTO>` `201 Created` | Crear usuario |
| `PUT` | `/{id}` | `@PathVariable Long id` + `@RequestBody UsuarioRequestDTO` | `ApiResponse<UsuarioResponseDTO>` | Actualizar |
| `PATCH` | `/{id}/desactivar` | `@PathVariable Long id` | `ApiResponse<Void>` | Soft delete |
| `PATCH` | `/{id}/activar` | `@PathVariable Long id` | `ApiResponse<Void>` | Activar usuario |
| `DELETE` | `/{id}` | `@PathVariable Long id` | `ApiResponse<Void>` | Eliminar permanente |

---

### 7.2 `IncidenciaController` — Base: `/v1/incidencias`

| Método HTTP | Ruta | Entrada | Salida | Descripción |
|-------------|------|---------|--------|-------------|
| `GET` | `/` | `Pageable` (query params) | `ApiResponse<Page<IncidenciaResponseDTO>>` | Listar paginado |
| `GET` | `/estado/{estado}` | `@PathVariable String estado` + `Pageable` | `ApiResponse<Page<IncidenciaResponseDTO>>` | Filtrar por estado |
| `GET` | `/usuario/{idUsuario}` | `@PathVariable Long idUsuario` + `Pageable` | `ApiResponse<Page<IncidenciaResponseDTO>>` | Por usuario |
| `GET` | `/buscar` | `@RequestParam String q` + `Pageable` | `ApiResponse<Page<IncidenciaResponseDTO>>` | Búsqueda de texto |
| `GET` | `/{id}` | `@PathVariable Long id` | `ApiResponse<IncidenciaResponseDTO>` | Obtener por ID |
| `POST` | `/` | `@RequestBody @Valid IncidenciaRequestDTO` | `ApiResponse<IncidenciaResponseDTO>` `201` | Crear |
| `PUT` | `/{id}` | `@PathVariable Long id` + `@RequestBody IncidenciaRequestDTO` | `ApiResponse<IncidenciaResponseDTO>` | Actualizar |
| `PATCH` | `/{id}/estado` | `@PathVariable Long id` + `@RequestParam String nuevoEstado` | `ApiResponse<IncidenciaResponseDTO>` | Cambiar estado |
| `DELETE` | `/{id}` | `@PathVariable Long id` | `ApiResponse<Void>` | Eliminar |

---

### 7.3 `ProyectoController` — Base: `/v1/proyectos`

| Método HTTP | Ruta | Entrada | Salida | Descripción |
|-------------|------|---------|--------|-------------|
| `GET` | `/` | — | `ApiResponse<List<ProyectoResponseDTO>>` | Listar todos |
| `GET` | `/estado/{estado}` | `@PathVariable String estado` | `ApiResponse<List<ProyectoResponseDTO>>` | Filtrar por estado |
| `GET` | `/buscar` | `@RequestParam String q` | `ApiResponse<List<ProyectoResponseDTO>>` | Buscar por nombre |
| `GET` | `/{id}` | `@PathVariable Long id` | `ApiResponse<ProyectoResponseDTO>` | Obtener por ID |
| `GET` | `/{id}/usuarios` | `@PathVariable Long id` | `ApiResponse<List<UsuarioResponseDTO>>` | Usuarios asignados |
| `POST` | `/` | `@RequestBody @Valid ProyectoRequestDTO` | `ApiResponse<ProyectoResponseDTO>` `201` | Crear proyecto |
| `POST` | `/asignar-usuario` | `@RequestBody AsignacionProyectoDTO` | `ApiResponse<ProyectoResponseDTO>` | Asignar usuario |
| `PUT` | `/{id}` | `@PathVariable Long id` + `@RequestBody ProyectoRequestDTO` | `ApiResponse<ProyectoResponseDTO>` | Actualizar |
| `DELETE` | `/{id}` | `@PathVariable Long id` | `ApiResponse<Void>` | Eliminar |
| `DELETE` | `/{idProy}/usuario/{idUsr}` | `@PathVariable Long idProy, Long idUsr` | `ApiResponse<Void>` | Remover usuario |

---

### 7.4 `CategoriaController` — Base: `/v1/categorias`

| Método HTTP | Ruta | Entrada | Salida | Descripción |
|-------------|------|---------|--------|-------------|
| `GET` | `/` | — | `ApiResponse<List<CategoriaResponseDTO>>` | Listar todas |
| `GET` | `/{id}` | `@PathVariable Long id` | `ApiResponse<CategoriaResponseDTO>` | Obtener por ID |
| `POST` | `/` | `@RequestBody @Valid CategoriaRequestDTO` | `ApiResponse<CategoriaResponseDTO>` `201` | Crear |
| `PUT` | `/{id}` | `@PathVariable Long id` + `@RequestBody CategoriaRequestDTO` | `ApiResponse<CategoriaResponseDTO>` | Actualizar |
| `DELETE` | `/{id}` | `@PathVariable Long id` | `ApiResponse<Void>` | Eliminar |

---

### 7.5 `ChatbotController` — Base: `/v1/chatbot`

| Método HTTP | Ruta | Entrada | Salida | Descripción |
|-------------|------|---------|--------|-------------|
| `POST` | `/consulta` | `@RequestBody ChatbotRequestDTO` | `ApiResponse<ChatbotResponseDTO>` | Procesar consulta |
| `POST` | `/escalar` | `@RequestBody ChatbotRequestDTO` | `ApiResponse<IncidenciaResponseDTO>` | Escalar a incidencia |

---

## 8. Backend — Servicios

### 8.1 `UsuarioService` / `UsuarioServiceImpl`

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `listarTodos()` | — | `List<UsuarioResponseDTO>` | Todos los usuarios |
| `listarActivos()` | — | `List<UsuarioResponseDTO>` | Solo activos |
| `buscarPorId(id)` | `Long` | `UsuarioResponseDTO` | Por ID o lanza `ResourceNotFoundException` |
| `buscarPorCorreo(correo)` | `String` | `UsuarioResponseDTO` | Por correo o lanza `ResourceNotFoundException` |
| `crear(dto)` | `UsuarioRequestDTO` | `UsuarioResponseDTO` | Hashea password, valida correo único |
| `actualizar(id, dto)` | `Long, UsuarioRequestDTO` | `UsuarioResponseDTO` | Actualiza datos |
| `desactivar(id)` | `Long` | `void` | Soft delete (estado = false) |
| `activar(id)` | `Long` | `void` | Activa usuario (estado = true) |
| `eliminar(id)` | `Long` | `void` | Elimina permanentemente |

**Lógica interna:**
- `BCryptPasswordEncoder` para hashear contraseñas
- Valida unicidad de correo con `existsByCorreo()` antes de crear
- `@Transactional` en métodos de escritura

---

### 8.2 `IncidenciaService` / `IncidenciaServiceImpl`

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `listarTodas(pageable)` | `Pageable` | `Page<IncidenciaResponseDTO>` | Listado paginado |
| `listarPorEstado(estado, pageable)` | `String, Pageable` | `Page<IncidenciaResponseDTO>` | Por estado |
| `listarPorUsuario(idUsuario, pageable)` | `Long, Pageable` | `Page<IncidenciaResponseDTO>` | Por usuario |
| `buscarPorTexto(q, pageable)` | `String, Pageable` | `Page<IncidenciaResponseDTO>` | Texto libre |
| `buscarPorId(id)` | `Long` | `IncidenciaResponseDTO` | Por ID |
| `crear(dto)` | `IncidenciaRequestDTO` | `IncidenciaResponseDTO` | Crea incidencia |
| `actualizar(id, dto)` | `Long, IncidenciaRequestDTO` | `IncidenciaResponseDTO` | Actualiza |
| `cambiarEstado(id, estado)` | `Long, String` | `IncidenciaResponseDTO` | Cambia estado con validación de transición |
| `eliminar(id)` | `Long` | `void` | Elimina permanentemente |

---

### 8.3 `ProyectoService` / `ProyectoServiceImpl`

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `crear(dto)` | `ProyectoRequestDTO` | `ProyectoResponseDTO` | Valida nombre único, crea |
| `actualizar(id, dto)` | `Long, ProyectoRequestDTO` | `ProyectoResponseDTO` | Actualiza datos |
| `eliminar(id)` | `Long` | `void` | Elimina |
| `obtenerPorId(id)` | `Long` | `ProyectoResponseDTO` | Por ID |
| `listarTodos()` | — | `List<ProyectoResponseDTO>` | Todos los proyectos |
| `listarPorEstado(estado)` | `String` | `List<ProyectoResponseDTO>` | Filtro por estado |
| `asignarUsuario(dto)` | `AsignacionProyectoDTO` | `ProyectoResponseDTO` | Asigna usuario |
| `removerUsuario(idProy, idUsr)` | `Long, Long` | `ProyectoResponseDTO` | Remueve asignación |
| `obtenerUsuariosAsignados(idProy)` | `Long` | `List<UsuarioResponseDTO>` | Usuarios del proyecto |

**Lógica interna:**
- `existsByNombre()` para validar nombre único antes de crear
- Lanza `BusinessException` si el nombre ya existe
- Lanza `ResourceNotFoundException` si el ID no existe

---

## 9. Backend — Repositorios

### 9.1 `UsuarioRepository`

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `findAll()` | — | `List<Usuario>` | (heredado JPA) |
| `findById(id)` | `Long` | `Optional<Usuario>` | (heredado JPA) |
| `findByEstadoTrue()` | — | `List<Usuario>` | Solo activos |
| `findByCorreo(correo)` | `String` | `Optional<Usuario>` | Por correo |
| `existsByCorreo(correo)` | `String` | `boolean` | Validación unicidad |
| `save(usuario)` | `Usuario` | `Usuario` | (heredado JPA) |
| `deleteById(id)` | `Long` | `void` | (heredado JPA) |

---

### 9.2 `IncidenciaRepository`

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `findAll(pageable)` | `Pageable` | `Page<Incidencia>` | (heredado JPA) |
| `findByEstado(estado, pageable)` | `String, Pageable` | `Page<Incidencia>` | Por estado |
| `findByUsuarioReporta_IdUsuario(id, pageable)` | `Long, Pageable` | `Page<Incidencia>` | Por usuario |
| `findByTituloContainingIgnoreCaseOrDescripcionContainingIgnoreCase(t, d, pageable)` | `String, String, Pageable` | `Page<Incidencia>` | Búsqueda de texto |
| `findByEstadoOrderByFechaCreacionDesc(estado)` | `String` | `List<Incidencia>` | Ordenado por fecha |

---

### 9.3 `ProyectoRepository`

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `findAll()` | — | `List<Proyecto>` | (heredado JPA) |
| `findById(id)` | `Long` | `Optional<Proyecto>` | (heredado JPA) |
| `findByEstado(estado)` | `String` | `List<Proyecto>` | Por estado |
| `findByNombreContainingIgnoreCase(nombre)` | `String` | `List<Proyecto>` | Búsqueda por nombre |
| `existsByNombre(nombre)` | `String` | `boolean` | Validación unicidad |

---

### 9.4 `AsignacionProyectoRepository`

| Método | Entrada | Salida | Descripción |
|--------|---------|--------|-------------|
| `findByProyecto_IdProyecto(id)` | `Long` | `List<AsignacionProyecto>` | Asignaciones de un proyecto |
| `findByUsuario_IdUsuario(id)` | `Long` | `List<AsignacionProyecto>` | Proyectos de un usuario |
| `existsByUsuario_IdUsuarioAndProyecto_IdProyecto(uid, pid)` | `Long, Long` | `boolean` | Valida asignación existente |
| `deleteByUsuario_IdUsuarioAndProyecto_IdProyecto(uid, pid)` | `Long, Long` | `void` | Elimina asignación |

---

## 10. Enumeraciones y Constantes

### 10.1 Enumeraciones (`src/app/core/enums/app.enums.ts`)

| Enum | Valores |
|------|---------|
| `EstadoIncidencia` | `ABIERTO='open'` · `EN_PROGRESO='inprogress'` · `PENDIENTE='pending'` · `RESUELTO='resolved'` · `CERRADO='closed'` |
| `PrioridadIncidencia` | `BAJA='Baja'` · `MEDIA='Media'` · `ALTA='Alta'` · `CRITICA='Crítica'` |
| `RolUsuario` | `ADMINISTRADOR` · `ANALISTA` · `TECNICO` · `USUARIO` |
| `TipoAccionHistorial` | `CREACION` · `ASIGNACION` · `CAMBIO_ESTADO` · `CAMBIO_PRIORIDAD` · `COMENTARIO` · `ACTUALIZACION` · `ELIMINACION` |
| `EstadoProyecto` | `ACTIVO` · `INACTIVO` · `ARCHIVADO` · `COMPLETADO` |
| `FormatoReporte` | `PDF` · `EXCEL` · `CSV` · `JSON` |
| `HttpStatus` | `OK=200` · `CREATED=201` · `BAD_REQUEST=400` · `UNAUTHORIZED=401` · `NOT_FOUND=404` · `INTERNAL_SERVER_ERROR=500` |

### 10.2 Constantes (`src/app/core/constants/app.constants.ts`)

| Constante | Valor | Descripción |
|-----------|-------|-------------|
| `SESSION_USER_KEY` | `'usuarioAutenticado'` | Clave en sessionStorage |
| `SESSION_TOKEN_KEY` | `'authToken'` | Clave del token |
| `SESSION_TIMEOUT` | `30 min` | Tiempo de expiración de sesión |
| `PASSWORD_MIN_LENGTH` | `6` | Longitud mínima de contraseña (frontend) |
| `TITLE_MIN_LENGTH` | `5` | Longitud mínima de título |
| `TITLE_MAX_LENGTH` | `200` | Longitud máxima de título |
| `TOAST_DURATION` | `3000 ms` | Duración del toast de notificación |
| `ITEMS_PER_PAGE` | `10` | Elementos por página |
| `NOTIFICATION_POLLING` | `30 s` | Intervalo de polling de notificaciones |

---

## 11. Manejo de Errores

### 11.1 Excepciones personalizadas (Backend)

| Excepción | HTTP Status | Cuándo se lanza |
|-----------|-------------|-----------------|
| `ResourceNotFoundException` | `404 Not Found` | Recurso no existe en base de datos |
| `BusinessException` | `400 Bad Request` | Violación de regla de negocio (p. ej. nombre duplicado) |

### 11.2 Respuesta de error estándar

```json
{
  "success": false,
  "message": "No se encontró el proyecto con ID: 99",
  "data": null,
  "timestamp": "2026-06-03T10:25:00"
}
```

### 11.3 Validación de entrada (Backend)

Cuando un DTO falla validación `@Valid`, el `GlobalExceptionHandler` retorna:

```json
{
  "success": false,
  "message": "Error de validación",
  "data": {
    "nombreCompleto": "El nombre no puede estar vacío",
    "correo": "Debe ser un correo válido"
  },
  "timestamp": "2026-06-03T10:25:00"
}
```

---

## 12. Matriz de Integración Frontend–Backend

| # | Acción del usuario | Servicio Angular | Método HTTP | Endpoint | Request Body | Response |
|---|-------------------|-----------------|-------------|----------|-------------|---------|
| 1 | Iniciar sesión | `AuthService.login()` | `POST` | `/v1/login` | `LoginRequest` | `LoginResponse` |
| 2 | Listar incidencias | `IncidentsService.obtenerIncidencias()` | `GET` | `/v1/incidencias` | — | `Page<IncidenciaResponseDTO>` |
| 3 | Crear incidencia | `IncidentsService.crearIncidencia()` | `POST` | `/v1/incidencias` | `IncidenciaRequestDTO` | `IncidenciaResponseDTO` |
| 4 | Actualizar incidencia | `IncidentsService.actualizarIncidenciaBackend()` | `PUT` | `/v1/incidencias/{id}` | `ActualizarIncidenciaRequest` | `IncidenciaResponseDTO` |
| 5 | Cambiar estado | `IncidentsService.cambiarEstado()` | `PATCH` | `/v1/incidencias/{id}/estado` | `?nuevoEstado=` | `IncidenciaResponseDTO` |
| 6 | Listar usuarios | `UsersService.obtenerUsuarios()` | `GET` | `/v1/usuarios` | — | `List<UsuarioResponseDTO>` |
| 7 | Crear usuario | `UsersService.agregarUsuarioBackend()` | `POST` | `/v1/usuarios` | `UsuarioRequestDTO` | `UsuarioResponseDTO` |
| 8 | Eliminar usuario | `UsersService.eliminarUsuarioBackend()` | `DELETE` | `/v1/usuarios/{id}` | — | `Void` |
| 9 | Listar proyectos | `ProjectsService.obtenerProyectos()` | `GET` | `/v1/proyectos` | — | `List<ProyectoResponseDTO>` |
| 10 | Crear proyecto | `ProjectsService.crearProyecto()` | `POST` | `/v1/proyectos` | `ProyectoRequestDTO` | `ProyectoResponseDTO` |
| 11 | Eliminar proyecto | `ProjectsService.eliminarProyecto()` | `DELETE` | `/v1/proyectos/{id}` | — | `Void` |
| 12 | Asignar usuario a proyecto | `ProjectsService.asignarUsuario()` | `POST` | `/v1/proyectos/asignar-usuario` | `AsignacionProyectoDTO` | `ProyectoResponseDTO` |
| 13 | Consultar chatbot | `ChatbotService.enviarConsulta()` | `POST` | `/v1/chatbot/consulta` | `ChatbotRequestDTO` | `ChatbotResponseDTO` |
| 14 | Escalar a agente | `ChatbotService.escalarAAgente()` | `POST` | `/v1/chatbot/escalar` | `ChatbotRequestDTO` | `IncidenciaResponseDTO` |
| 15 | Listar categorías | (en formularios) | `GET` | `/v1/categorias` | — | `List<CategoriaResponseDTO>` |

---

*Documento generado para entrega académica SENA — Proyecto SWO ServiceDesk*
