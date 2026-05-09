# 🎬 GUION DE FUNCIONALIDADES - SISTEMA SWO

## 📋 ÍNDICE
1. [Introducción de la Aplicación](#introducción)
2. [RF01: Registro de Incidencias](#rf01-registro-de-incidencias)
3. [RF02: Asignación de Incidentes](#rf02-asignación-de-incidentes)
4. [RF03: Cambio de Estado de Incidencias](#rf03-cambio-de-estado-de-incidencias)
5. [RF04: Generación de Reportes Personalizados](#rf04-generación-de-reportes-personalizados)
6. [HU05: Chatbot de Soporte Automatizado](#hu05-chatbot-de-soporte-automatizado)

---

## 📖 INTRODUCCIÓN DE LA APLICACIÓN {#introducción}

### ¿Qué es SWO?

**SWO (Sistema Web de Gestión de Incidencias)** es una plataforma empresarial moderna diseñada para gestionar de forma eficiente las incidencias de tecnología de la información en entornos corporativos. 

### Tecnologías Utilizadas

**Frontend:**
- **Angular 17** con arquitectura de componentes standalone
- **TypeScript 5.2** con modo estricto
- **RxJS** para programación reactiva
- **SCSS** para estilos modulares y responsive

**Backend:**
- **Java 21** con arquitectura de servlets
- **MySQL 8.0+** como base de datos relacional
- **Maven** como gestor de dependencias
- **Apache Tomcat** como servidor de aplicaciones

### Características Principales

1. **🎫 Gestión Completa de Incidencias** - CRUD completo con estados, prioridades y asignaciones
2. **👥 Gestión de Usuarios y Roles** - Sistema de autenticación con control de acceso basado en roles
3. **📁 Gestión de Proyectos** - Organización y asociación de incidencias por proyectos
4. **🤖 Chatbot Inteligente** - Asistente virtual con IA para consultas y creación automática de tickets
5. **📊 Dashboards en Tiempo Real** - Métricas y KPIs actualizados dinámicamente
6. **📈 Reportes Exportables** - Generación de reportes en CSV y PDF
7. **🔒 Seguridad Empresarial** - Sistema de autenticación robusto con sesiones seguras
8. **📝 Auditoría Completa** - Historial detallado de todos los cambios realizados

### Arquitectura del Sistema

El sistema sigue una arquitectura **Clean Architecture** con separación clara de responsabilidades:

- **Capa de Presentación:** Componentes Angular con lógica de UI
- **Capa de Servicios:** Servicios Angular con lógica de negocio
- **Capa de API REST:** Servlets Java que exponen endpoints HTTP
- **Capa de Datos:** DAOs Java con acceso directo a MySQL

---

## 🎫 RF01: REGISTRO DE INCIDENCIAS {#rf01-registro-de-incidencias}

### 🎬 GUION PARA VIDEO DEMOSTRATIVO

**Duración estimada:** 5-7 minutos

**Escena 1: Introducción (30 segundos)**
- Mostrar pantalla de login exitoso
- Navegación al menú lateral
- Destacar opción "Incidencias"

**Escena 2: Acceso al Módulo (30 segundos)**
- Clic en el menú "Incidencias"
- Mostrar lista actual de incidencias
- Resaltar botón "Nueva Incidencia" o "+" en la interfaz

**Escena 3: Validaciones de Formulario Vacío (1 minuto)**
- Clic en "Nueva Incidencia"
- Intentar enviar formulario vacío
- Mostrar mensajes de validación en ROJO:
  - ✗ "El título es obligatorio"
  - ✗ "La descripción es obligatoria"
  - ✗ "El título debe tener al menos 10 caracteres"

**Escena 4: Validaciones de Longitud Mínima (1.5 minutos)**
- Escribir título corto (menos de 10 caracteres): "Error PC"
- Mostrar mensaje: ✗ "El título debe tener al menos 10 caracteres"
- Escribir descripción corta (menos de 20 caracteres): "No funciona"
- Mostrar mensaje: ✗ "La descripción debe tener al menos 20 caracteres"
- Mostrar contador de caracteres en tiempo real

**Escena 5: Llenado Correcto del Formulario (2 minutos)**
- **Título:** "Problema de conexión a la red corporativa en oficina 301"
- **Descripción:** "Los equipos del departamento de contabilidad presentan intermitencia en la conexión a la red corporativa. El problema comenzó esta mañana y afecta a 5 usuarios."
- **Estado:** Seleccionar "Abierto" (pre-seleccionado)
- **Prioridad/Impacto:** Seleccionar "Alto"
- **Ubicación:** "Piso 3 - Oficina 301 - Contabilidad"
- **Usuario Asignado:** Seleccionar "Juan Pérez - Técnico Nivel 2"
- **Proyecto:** Seleccionar "Infraestructura TI 2026"

**Escena 6: Validación Exitosa (30 segundos)**
- Mostrar todos los campos en VERDE con check ✓
- Habilitar botón "Crear Incidencia"
- Mostrar vista previa de datos

**Escena 7: Creación y Confirmación (1 minuto)**
- Clic en "Crear Incidencia"
- Mostrar loading/spinner
- Toast de éxito: "✓ Incidencia creada exitosamente: INC-XXX"
- Redirección automática al detalle de la incidencia creada
- Mostrar todos los datos guardados correctamente

**Escena 8: Verificación en Lista (30 segundos)**
- Volver al listado de incidencias
- Buscar la incidencia recién creada
- Verificar que aparece con estado "Abierto" y prioridad "Alto"
- Mostrar badge de color correcto

### Descripción Funcional

Permite a los usuarios del sistema registrar nuevas incidencias de TI con información detallada incluyendo título, descripción, prioridad, ubicación y asignación opcional.

### ✅ VALIDACIONES A DEMOSTRAR EN VIDEO

#### Validaciones Frontend (Angular)
1. **Campo Título:**
   - ✓ Obligatorio
   - ✓ Mínimo 10 caracteres
   - ✓ Máximo 200 caracteres
   - ✓ No permite solo espacios en blanco
   - ✓ Feedback visual en tiempo real (rojo/verde)

2. **Campo Descripción:**
   - ✓ Obligatorio
   - ✓ Mínimo 20 caracteres
   - ✓ Máximo 2000 caracteres
   - ✓ Contador de caracteres visible
   - ✓ No permite solo espacios en blanco

3. **Campo Estado:**
   - ✓ Valor por defecto "Abierto"
   - ✓ Lista desplegable con opciones válidas
   - ✓ No editable hasta creación

4. **Campo Prioridad/Impacto:**
   - ✓ Valor por defecto "Medio"
   - ✓ Opciones: Bajo, Medio, Alto, Crítico
   - ✓ Validación de valor en lista permitida

5. **Campos Opcionales:**
   - ✓ Ubicación (máximo 200 caracteres)
   - ✓ Usuario asignado (dropdown de usuarios activos)
   - ✓ Proyecto (dropdown de proyectos activos)

#### Validaciones Backend (Java)
1. **Validación de Datos Obligatorios:**
   ```
   if (titulo == null || titulo.trim().isEmpty()) 
       → Error 400: "titulo es obligatorio"
   ```

2. **Validación de Sesión:**
   ```
   if (session == null || idUsuario == null) 
       → Error 401: "Usuario no autenticado"
   ```

3. **Validación de Usuario Asignado:**
   ```
   Verifica que el usuario existe y está activo
   Verifica que tiene un empleado asociado
   ```

4. **Inserción en Base de Datos:**
   ```
   Transacción completa con rollback en caso de error
   Generación automática de ID único
   Timestamp automático (NOW())
   ```

### 🧪 CASOS DE PRUEBA PARA VIDEO

| # | Caso de Prueba | Entrada | Resultado Esperado |
|---|----------------|---------|-------------------|
| 1 | Formulario vacío | Campos en blanco | Mensajes de error en rojo |
| 2 | Título corto | "Error" | "Debe tener al menos 10 caracteres" |
| 3 | Descripción corta | "No funciona" | "Debe tener al menos 20 caracteres" |
| 4 | Solo espacios | "    " en título | "El título es obligatorio" |
| 5 | Datos válidos completos | Todos los campos correctos | Creación exitosa + INC-XXX |
| 6 | Sin usuario asignado | Campo vacío | Creación exitosa sin asignación |
| 7 | Con usuario asignado | Seleccionar usuario | Creación + asignación automática |

### Rutas Frontend (Angular)

#### 1. Componente de Listado con Botón de Creación
- **Ruta:** `/incidents`
- **Componente:** `IncidentsComponent`
- **Archivo:** `src/app/features/incidents/incidents.component.ts`
- **Líneas clave:** 
  - Línea 549: Método `cambiarEstado()`
  - Template incluye botón "Nueva Incidencia"

#### 2. Formulario de Creación
- **Componente:** `IncidentFormComponent`
- **Archivo:** `src/app/features/incidents/incident-form/incident-form.component.ts`
- **Funcionalidad:** Formulario reactivo con validaciones empresariales
- **Campos validados:**
  - Título (requerido, mínimo 10 caracteres)
  - Descripción (requerida, mínimo 20 caracteres)
  - Estado (por defecto: "Abierto")
  - Prioridad/Impacto (Bajo, Medio, Alto, Crítico)
  - Ubicación (opcional)
  - Usuario asignado (opcional)
  - Proyecto asociado (opcional)

### Rutas Backend (Java)

#### 1. Endpoint de Creación de Incidencia
```
POST /api/incidencias
```

**Servlet:** `ApiServlet.java`  
**Archivo:** `java/src/com/swo/controller/ApiServlet.java`  
**Líneas:** 208-256

**Parámetros requeridos:**
- `titulo` (String) - Título de la incidencia
- `descripcion` (String) - Descripción detallada
- `estado` (String, opcional) - Por defecto "Abierto"
- `impacto` (String, opcional) - Por defecto "Medio"
- `ubicacion` (String, opcional)
- `idUsuarioReporta` (int, opcional) - Se toma de la sesión si no se proporciona
- `idUsuarioAsignado` (int, opcional) - Para asignación directa al crear

**Respuesta exitosa:**
```json
{
  "success": true,
  "id": 123,
  "mensaje": "Incidencia creada"
}
```

**Respuesta de error:**
```json
{
  "error": "titulo y descripcion son obligatorios"
}
```

#### 2. DAO de Inserción
**Clase:** `IncidenciaDAO.java`  
**Método:** `insertarIncidencia(Incidencia inc)`  
**Archivo:** `java/src/com/swo/dao/IncidenciaDAO.java`

**Query SQL:**
```sql
INSERT INTO incidencia (titulo, descripcion, estado, ubicacion, impacto, idUsuarioReporta, fechaCreacion) 
VALUES (?, ?, ?, ?, ?, ?, NOW())
```

### Servicio Frontend

**Servicio:** `IncidentsService`  
**Archivo:** `src/app/core/services/incidents.service.ts`  
**Método principal:** `crearIncidencia(dto: CrearIncidenciaDTO): Observable<ResultadoOperacion>`

**Líneas de referencia:**
- Líneas 1-90: Documentación completa del servicio
- Línea 54: Ejemplo de uso en comentarios

### Flujo Completo de Registro

1. **Usuario accede a** `/incidents`
2. **Clic en botón** "Nueva Incidencia"
3. **Formulario valida** datos en tiempo real
4. **Al enviar:** `IncidentsService.crearIncidencia()`
5. **HTTP POST** a `/api/incidencias`
6. **ApiServlet** procesa y valida
7. **IncidenciaDAO** inserta en BD
8. **Respuesta JSON** con ID generado
9. **Redirección** al detalle de la incidencia creada
10. **Notificación** de éxito al usuario

---

## 👤 RF02: ASIGNACIÓN DE INCIDENTES {#rf02-asignación-de-incidentes}

### 🎬 GUION PARA VIDEO DEMOSTRATIVO

**Duración estimada:** 4-6 minutos

**Escena 1: Contexto (30 segundos)**
- Mostrar listado de incidencias
- Destacar incidencias "Sin asignar"
- Explicar la necesidad de asignar técnicos

**Escena 2: Asignación desde el Listado (1.5 minutos)**
- Localizar incidencia sin asignar (INC-XXX)
- Mostrar columna "Asignado" con valor "Sin asignar"
- Clic en dropdown o botón "Asignar"
- Mostrar lista de técnicos disponibles:
  - Juan Pérez - Técnico Nivel 2
  - María García - Analista Senior
  - Carlos López - Soporte Nivel 1
- Seleccionar "Juan Pérez"
- Clic en "Asignar"

**Escena 3: Validaciones de Asignación (1 minuto)**
- **Validación 1:** Intentar asignar sin seleccionar usuario
  - Mensaje: ✗ "Debe seleccionar un técnico"
- **Validación 2:** Mostrar solo usuarios activos
  - Verificar que usuarios eliminados no aparecen
- **Validación 3:** Verificar que el usuario tiene empleado asociado
  - Si no tiene: ✗ "El usuario no tiene empleado asociado"

**Escena 4: Asignación Exitosa (1 minuto)**
- Confirmar asignación
- Mostrar loading/spinner
- Toast: "✓ Incidencia asignada a Juan Pérez"
- Verificar cambio automático en la lista:
  - Columna "Asignado" ahora muestra "Juan Pérez"
  - Badge o avatar del técnico asignado
  - Timestamp de asignación

**Escena 5: Asignación desde el Detalle (1.5 minutos)**
- Abrir detalle de otra incidencia sin asignar
- Buscar sección "Información del Asignado"
- Clic en "Asignar técnico"
- Seleccionar "María García - Analista Senior"
- Confirmar asignación
- Verificar actualización en tiempo real:
  - Nombre del asignado
  - Avatar/foto
  - Información de contacto
  - Fecha de asignación

**Escena 6: Reasignación (1 minuto)**
- Seleccionar incidencia ya asignada
- Clic en "Reasignar"
- Modal de confirmación: "¿Desea reasignar esta incidencia?"
- Seleccionar nuevo técnico
- Confirmar
- Verificar registro en historial:
  - "Reasignada de Juan Pérez a Carlos López"
  - Timestamp del cambio
  - Usuario que realizó la reasignación

**Escena 7: Verificación en Historial (30 segundos)**
- Abrir pestaña "Historial"
- Mostrar entrada de asignación:
  - Evento: "Asignación"
  - De: "Sin asignar"
  - A: "Juan Pérez"
  - Fecha: "08/05/2026 14:30"
  - Por: "Admin Sistema"

### Descripción Funcional

Permite asignar incidencias a técnicos o analistas específicos para su resolución. Puede realizarse durante la creación o posteriormente mediante actualización.

### ✅ VALIDACIONES A DEMOSTRAR EN VIDEO

#### Validaciones Frontend (Angular)

1. **Selección de Usuario:**
   - ✓ Dropdown solo muestra usuarios activos
   - ✓ Filtra por rol (Técnico, Analista, Agente)
   - ✓ No permite enviar sin selección
   - ✓ Búsqueda/filtro en lista de usuarios
   - ✓ Mensaje si no hay técnicos disponibles

2. **Validación de Estado:**
   - ✓ Solo permite asignar incidencias en estado válido
   - ✓ Advierte si la incidencia ya está asignada
   - ✓ Confirma antes de reasignar

3. **Permisos de Usuario:**
   - ✓ Solo Admin y Supervisores pueden asignar
   - ✓ Técnicos pueden auto-asignarse
   - ✓ Usuarios normales no ven botón de asignación

4. **Feedback Visual:**
   - ✓ Loading durante la asignación
   - ✓ Toast de confirmación
   - ✓ Actualización inmediata en UI
   - ✓ Badge con nombre del asignado

#### Validaciones Backend (Java)

1. **Validación de Parámetros:**
   ```java
   if (idEmpleado == null || idEmpleado <= 0)
       → Error 400: "idEmpleado es obligatorio"
   ```

2. **Validación de Existencia:**
   ```java
   Empleado emp = empleadoDAO.obtenerPorId(idEmpleado);
   if (emp == null)
       → Error 404: "Empleado no encontrado"
   ```

3. **Validación de Estado del Empleado:**
   ```java
   if (!emp.isActivo())
       → Error 400: "Empleado inactivo"
   ```

4. **Validación de Incidencia:**
   ```java
   Incidencia inc = incidenciaDAO.obtenerPorId(idIncidencia);
   if (inc == null)
       → Error 404: "Incidencia no encontrada"
   ```

5. **Prevención de Duplicados:**
   ```sql
   INSERT INTO asignacion (idIncidencia, idEmpleado, fechaAsignacion) 
   VALUES (?, ?, NOW())
   ON DUPLICATE KEY UPDATE fechaAsignacion = NOW()
   ```

6. **Transacciones:**
   - ✓ BEGIN TRANSACTION antes de asignar
   - ✓ COMMIT si todo es exitoso
   - ✓ ROLLBACK en caso de error

### 🧪 CASOS DE PRUEBA PARA VIDEO

| # | Caso de Prueba | Entrada | Resultado Esperado |
|---|----------------|---------|-------------------|
| 1 | Asignar sin seleccionar | Dropdown vacío | "Debe seleccionar un técnico" |
| 2 | Asignar usuario inactivo | Usuario eliminado | No aparece en lista |
| 3 | Asignar correctamente | Seleccionar "Juan Pérez" | "✓ Asignada a Juan Pérez" |
| 4 | Reasignar incidencia | Cambiar de técnico | Confirmación + historial |
| 5 | Usuario sin empleado | Usuario sin empleado_id | "Usuario sin empleado asociado" |
| 6 | Verificar en BD | Query SELECT | Registro en tabla asignacion |
| 7 | Historial de asignación | Ver pestaña Historial | Evento registrado correctamente |

### 🔍 DEMOSTRACIÓN DE INTEGRIDAD DE DATOS

**En el video mostrar:**
1. **Antes de asignar:**
   - Query SQL: `SELECT * FROM incidencia WHERE idIncidencia = X`
   - Campo `idUsuarioAsignado` = NULL

2. **Durante la asignación:**
   - Captura de petición HTTP en DevTools
   - POST a `/api/incidencias/X/asignar`
   - Body: `idEmpleado=5`

3. **Después de asignar:**
   - Query SQL: `SELECT * FROM asignacion WHERE idIncidencia = X`
   - Verificar registro con timestamp
   - Query SQL: `SELECT * FROM incidencia WHERE idIncidencia = X`
   - Campo `idUsuarioAsignado` = 5

### Rutas Frontend (Angular)

#### 1. Asignación desde el Listado
- **Ruta:** `/incidents`
- **Componente:** `IncidentsComponent`
- **Archivo:** `src/app/features/incidents/incidents.component.ts`
- **Método:** `asignarIncidencia()` - Línea 582

#### 2. Asignación desde el Detalle
- **Ruta:** `/incidents/:id`
- **Componente:** `IncidentDetailComponent`
- **Archivo:** `src/app/features/incidents/incident-detail/incident-detail.component.ts`
- **Funcionalidad:** Dropdown con lista de usuarios disponibles

### Rutas Backend (Java)

#### 1. Endpoint de Asignación Directa
```
POST /api/incidencias/{id}/asignar
```

**Servlet:** `ApiServlet.java`  
**Líneas:** 390-409

**Parámetros:**
- `idEmpleado` (int) - ID del empleado al que se asigna

**Respuesta:**
```json
{
  "success": true,
  "mensaje": "Incidencia asignada"
}
```

#### 2. Endpoint de Actualización (incluye asignación)
```
PUT /api/incidencias/{id}
```

**Servlet:** `ApiServlet.java`  
**Líneas:** 500-572

**Parámetros:**
- `idUsuarioAsignado` (int, opcional) - Usuario a asignar

#### 3. DAO de Asignación
**Clase:** `IncidenciaDAO.java`  
**Método:** `asignarIncidencia(int idIncidencia, int idEmpleado)`  
**Líneas:** 187-216

**Query SQL:**
```sql
INSERT INTO asignacion (idIncidencia, idEmpleado, fechaAsignacion) 
VALUES (?, ?, NOW())
ON DUPLICATE KEY UPDATE fechaAsignacion = NOW()
```

**Nota:** El sistema mantiene una tabla `asignacion` para registrar el historial completo de asignaciones.

### Servicio Frontend

**Servicio:** `IncidentsService`  
**Archivo:** `src/app/core/services/incidents.service.ts`  
**Método:** `asignarIncidencia(id: string, nuevoAsignado: string): Observable<void>`  
**Línea:** 905

### Reglas de Negocio

1. **Validación de usuario:** Solo usuarios activos pueden ser asignados
2. **Verificación de empleado:** El sistema verifica que el usuario tenga un empleado asociado
3. **Historial:** Cada asignación se registra en el historial de la incidencia
4. **Notificación:** El usuario asignado recibe notificación (si está configurado)
5. **Estado automático:** Al asignar, puede cambiar automáticamente el estado a "En Progreso"

### Flujo Completo de Asignación

1. **Desde listado o detalle:** Usuario selecciona "Asignar"
2. **Modal/Dropdown:** Muestra lista de técnicos disponibles
3. **Selección:** Usuario elige el técnico
4. **Confirmación:** Sistema solicita confirmación
5. **Petición:** `POST /api/incidencias/{id}/asignar`
6. **Validación backend:** Verifica que el empleado existe
7. **Inserción BD:** Crea registro en tabla `asignacion`
8. **Actualización:** Actualiza campo `idUsuarioAsignado` en incidencia
9. **Respuesta:** Confirma asignación exitosa
10. **Actualización UI:** Lista se refresca automáticamente

---

## 🔄 RF03: CAMBIO DE ESTADO DE INCIDENCIAS {#rf03-cambio-de-estado-de-incidencias}

### 🎬 GUION PARA VIDEO DEMOSTRATIVO

**Duración estimada:** 6-8 minutos

**Escena 1: Introducción al Ciclo de Vida (1 minuto)**
- Mostrar diagrama de flujo de estados
- Explicar cada estado con su significado:
  - 🔵 **Abierto:** Incidencia recién creada
  - 🟡 **En Progreso:** Técnico trabajando
  - 🟠 **Pendiente:** Esperando información
  - 🟢 **Resuelto:** Solución implementada
  - ⚫ **Cerrado:** Finalizada completamente
- Mostrar ejemplos de incidencias en cada estado

**Escena 2: Cambio de Estado desde el Listado (2 minutos)**
- Seleccionar incidencia en estado "Abierto"
- Mostrar dropdown de estados en la columna
- Cambiar a "En Progreso"
- Validaciones en tiempo real:
  - ✓ Solo muestra estados permitidos según transición
  - ✓ Estados deshabilitados aparecen en gris
- Confirmación automática
- Toast: "✓ Estado actualizado a En Progreso"
- Verificar cambio de color del badge (Azul → Amarillo)

**Escena 3: Validación de Transiciones (2 minutos)**
- **Prueba 1:** De "Abierto" a "Cerrado" (saltar estados)
  - Modal: "⚠ Esta transición requiere pasar por estados intermedios"
  - Sugiere: "Abierto → En Progreso → Resuelto → Cerrado"
- **Prueba 2:** De "Cerrado" a "Abierto" (sin permisos)
  - Mensaje: "✗ Solo administradores pueden reabrir incidencias cerradas"
- **Prueba 3:** Sin ser asignado
  - Mensaje: "✗ Debe estar asignado a la incidencia para cambiar el estado"

**Escena 4: Cambio de Estado desde el Detalle (2.5 minutos)**
- Abrir detalle de incidencia INC-XXX
- Mostrar estado actual en header: 🟡 "En Progreso"
- Clic en botón "Cambiar Estado"
- Modal de cambio de estado se abre:
  - Estado actual destacado
  - Estados disponibles según permisos
  - Campo opcional de "Comentario del cambio"

**Sub-escena: Cambio a Pendiente**
- Seleccionar "Pendiente"
- Agregar comentario: "Esperando respuesta del cliente sobre credenciales de acceso"
- Checkbox: "☐ Notificar al reportante"
- Clic en "Guardar"
- Toast: "✓ Estado cambiado a Pendiente"
- Verificar badge: 🟠 "Pendiente"

**Escena 5: Resolución de Incidencia (2 minutos)**
- Cambiar estado a "Resuelto"
- Modal extendido con campos adicionales:
  - **Solución implementada** (textarea, obligatorio)
  - **Tiempo de resolución** (calculado automáticamente)
  - **Categoría de solución** (dropdown)
- Llenar formulario:
  - Solución: "Se configuró correctamente el acceso VPN y se validó la conexión"
  - Categoría: "Configuración de red"
- Clic en "Resolver"
- Confirmación: "¿Confirma que la incidencia está resuelta?"
- Aceptar
- Toast: "✓ Incidencia resuelta exitosamente"
- Mostrar:
  - Fecha de resolución: "08/05/2026 15:45"
  - Tiempo total: "2 horas 15 minutos"
  - Badge verde: 🟢 "Resuelto"

**Escena 6: Verificación en Historial (1.5 minutos)**
- Abrir pestaña "Historial"
- Mostrar timeline completa:
  ```
  📝 Creada                    08/05/2026 13:30  | Usuario Admin
  👤 Asignada a Juan Pérez     08/05/2026 13:35  | Usuario Admin
  🔄 Estado: Abierto → En Progreso  08/05/2026 13:40  | Juan Pérez
  🔄 Estado: En Progreso → Pendiente  08/05/2026 14:20  | Juan Pérez
     💬 "Esperando respuesta del cliente..."
  🔄 Estado: Pendiente → En Progreso  08/05/2026 14:50  | Juan Pérez
  ✅ Estado: En Progreso → Resuelto  08/05/2026 15:45  | Juan Pérez
     💬 Solución: "Se configuró correctamente el acceso VPN..."
  ```

**Escena 7: Cierre de Incidencia (1 minuto)**
- Cambiar estado final a "Cerrado"
- Modal de confirmación final:
  - "¿Está seguro de cerrar esta incidencia?"
  - "Una vez cerrada, no podrá modificarse"
  - Checkbox: "☑ Enviar encuesta de satisfacción"
- Confirmar
- Toast: "✓ Incidencia cerrada"
- Badge gris: ⚫ "Cerrado"
- Botones de edición deshabilitados

### Descripción Funcional

Gestiona el ciclo de vida completo de una incidencia mediante transiciones de estado controladas: Abierto → En Progreso → Pendiente → Resuelto → Cerrado.

### ✅ VALIDACIONES A DEMOSTRAR EN VIDEO

#### Validaciones Frontend (Angular)

1. **Validación de Transiciones Permitidas:**
   ```typescript
   const transicionesValidas = {
     'open': ['inprogress', 'pending'],
     'inprogress': ['pending', 'resolved'],
     'pending': ['inprogress', 'resolved'],
     'resolved': ['closed'],
     'closed': [] // Solo admin puede reabrir
   };
   ```

2. **Validación de Permisos por Rol:**
   - ✓ **Usuario normal:** Solo puede ver estados
   - ✓ **Agente/Técnico:** Puede cambiar si está asignado
   - ✓ **Administrador:** Puede cambiar cualquier estado

3. **Validación de Asignación:**
   ```typescript
   if (!incidencia.idUsuarioAsignado && usuario.rol !== 'Administrador') {
     return error('Debe estar asignado para cambiar el estado');
   }
   ```

4. **Campos Obligatorios según Estado:**
   - **Resuelto:**
     - ✓ Solución implementada (mínimo 20 caracteres)
     - ✓ Categoría de solución
     - ✓ Confirmación de resolución
   - **Cerrado:**
     - ✓ Confirmación final
     - ✓ Todos los campos anteriores completos

5. **Feedback Visual:**
   - ✓ Colores diferentes por estado
   - ✓ Iconos contextuales
   - ✓ Animación de transición
   - ✓ Loading durante el cambio

#### Validaciones Backend (Java)

1. **Validación de Estado Válido:**
   ```java
   String[] estadosValidos = {"Abierto", "En Progreso", "Pendiente", "Resuelto", "Cerrado"};
   if (!Arrays.asList(estadosValidos).contains(nuevoEstado)) {
       → Error 400: "Estado no válido"
   }
   ```

2. **Validación de Existencia:**
   ```java
   Incidencia inc = incidenciaDAO.obtenerPorId(idIncidencia);
   if (inc == null) {
       → Error 404: "Incidencia no encontrada"
   }
   ```

3. **Validación de Permisos:**
   ```java
   if (estadoActual.equals("Cerrado") && !usuario.esAdmin()) {
       → Error 403: "No tiene permisos para reabrir incidencias"
   }
   ```

4. **Actualización Atómica:**
   ```sql
   UPDATE incidencia 
   SET estado = ?, 
       fechaResolucion = IF(? IN ('Resuelto', 'Cerrado'), NOW(), NULL),
       resolucion = ?,
       tiempoResolucion = IF(? IN ('Resuelto', 'Cerrado'), 
                            TIMESTAMPDIFF(MINUTE, fechaCreacion, NOW()), NULL)
   WHERE idIncidencia = ?
   ```

5. **Registro en Historial:**
   ```java
   historialDAO.registrar(
       idIncidencia,
       "cambio_estado",
       "Estado cambiado de " + estadoAnterior + " a " + estadoNuevo,
       usuario.getId(),
       NOW()
   );
   ```

6. **Transacciones:**
   ```java
   try {
       conn.setAutoCommit(false);
       incidenciaDAO.actualizarEstado(...);
       historialDAO.registrar(...);
       conn.commit();
   } catch (Exception e) {
       conn.rollback();
       throw new ServletException("Error al cambiar estado");
   }
   ```

### 🧪 CASOS DE PRUEBA PARA VIDEO

| # | Caso de Prueba | Estado Inicial | Estado Destino | Resultado Esperado |
|---|----------------|----------------|----------------|--------------------|
| 1 | Transición válida | Abierto | En Progreso | ✓ Cambio exitoso |
| 2 | Transición válida | En Progreso | Resuelto | ✓ Cambio exitoso + fecha resolución |
| 3 | Transición inválida | Abierto | Cerrado | ✗ Debe pasar por estados intermedios |
| 4 | Sin asignación | Abierto | En Progreso | ✗ Debe estar asignado |
| 5 | Usuario no asignado | En Progreso | Resuelto | ✗ Solo el asignado puede cambiar |
| 6 | Admin reabre | Cerrado | Abierto | ✓ Solo admin puede (mostrar) |
| 7 | Sin solución | En Progreso | Resuelto | ✗ Debe agregar solución |
| 8 | Cierre final | Resuelto | Cerrado | ✓ Confirmación + deshabilitar edición |

### 🔍 DEMOSTRACIÓN DE INTEGRIDAD DE DATOS

**En el video mostrar consultas SQL:**

1. **Antes del cambio:**
   ```sql
   SELECT idIncidencia, titulo, estado, fechaCreacion, fechaResolucion 
   FROM incidencia 
   WHERE idIncidencia = 15;
   ```
   Resultado: `estado = "Abierto", fechaResolucion = NULL`

2. **Cambio a "Resuelto":**
   - Mostrar petición HTTP en DevTools:
     ```
     PUT /api/incidencias/15/estado
     Body: estado=Resuelto&resolucion=Se configuró VPN correctamente
     ```

3. **Después del cambio:**
   ```sql
   SELECT * FROM incidencia WHERE idIncidencia = 15;
   ```
   Resultado: 
   ```
   estado = "Resuelto"
   fechaResolucion = "2026-05-08 15:45:00"
   resolucion = "Se configuró VPN correctamente"
   tiempoResolucion = 135 (minutos)
   ```

4. **Verificar historial:**
   ```sql
   SELECT * FROM historial_cambios 
   WHERE idIncidencia = 15 
   ORDER BY fecha DESC;
   ```
   Resultado: Últimas 5 entradas del historial

### Estados Disponibles

| Estado | Código | Color | Descripción |
|--------|--------|-------|-------------|
| Abierto | `open` | 🔵 Azul | Incidencia recién creada |
| En Progreso | `inprogress` | 🟡 Amarillo | Un técnico está trabajando |
| Pendiente | `pending` | 🟠 Naranja | Esperando información/recursos |
| Resuelto | `resolved` | 🟢 Verde | Solución implementada |
| Cerrado | `closed` | ⚫ Gris | Incidencia finalizada |

### Rutas Frontend (Angular)

#### 1. Cambio de Estado desde el Listado
- **Ruta:** `/incidents`
- **Componente:** `IncidentsComponent`
- **Archivo:** `src/app/features/incidents/incidents.component.ts`
- **Método:** `cambiarEstado(incidente: Incidencia, event: Event)` - Línea 549
- **Template:** `incidents.component.html` - Línea 89
- **Elemento:** Dropdown `<select>` con evento `(change)`

#### 2. Cambio de Estado desde el Detalle
- **Ruta:** `/incidents/:id`
- **Componente:** `IncidentDetailComponent`
- **Archivo:** `src/app/features/incidents/incident-detail/incident-detail.component.ts`
- **Método:** `cambiarEstado()` - Línea 282
- **Funcionalidad:** Modal con selector de estado y botón "Guardar"
- **Template:** `incident-detail.component.html` - Línea 160

### Rutas Backend (Java)

#### 1. Endpoint Específico de Cambio de Estado
```
PUT /api/incidencias/{id}/estado
```

**Servlet:** `ApiServlet.java`  
**Líneas:** 573-597

**Parámetros:**
- `estado` (String) - Nuevo estado: "Abierto", "En Progreso", "Pendiente", "Resuelto", "Cerrado"

**Respuesta exitosa:**
```json
{
  "success": true,
  "mensaje": "Estado actualizado"
}
```

**Respuesta de error:**
```json
{
  "error": "estado es obligatorio"
}
```

#### 2. Endpoint de Actualización Completa (incluye estado)
```
PUT /api/incidencias/{id}
```

**Servlet:** `ApiServlet.java`  
**Líneas:** 500-572

**Parámetros:**
- `estado` (String) - Nuevo estado
- `resolver` (boolean) - Si es true, marca fecha de resolución

#### 3. DAO de Actualización de Estado
**Clase:** `IncidenciaDAO.java`  
**Método:** `actualizarEstadoIncidencia(int idIncidencia, String nuevoEstado)`  
**Líneas:** 93-116

**Query SQL:**
```sql
UPDATE incidencia 
SET estado = ?, fechaResolucion = IF(? IN ('Resuelto', 'Cerrado'), NOW(), NULL) 
WHERE idIncidencia = ?
```

### Servicio Frontend

**Servicio:** `IncidentsService`  
**Archivo:** `src/app/core/services/incidents.service.ts`  
**Métodos:**
- `cambiarEstado(id: string, nuevoEstado: EstadoIncidencia): Observable<void>` - Línea 789
- `actualizarEstado()` mencionado en línea 54

**Funciones auxiliares:**
- `mapearEstado()` - Convierte estado backend a formato frontend
- `mapearEstadoABackend()` - Convierte estado frontend a formato backend

### Reglas de Negocio y Validaciones

#### Transiciones de Estado Permitidas

```
Abierto ──────────→ En Progreso ──────→ Resuelto
   ↓                    ↓                   ↓
   └──────→ Pendiente ←┘                   │
                ↓                           │
                └───────────→ Cerrado ←─────┘
```

#### Validaciones del Sistema

1. **Permisos por rol:**
   - **Usuario:** Solo puede ver estados
   - **Agente/Analista:** Puede cambiar entre Abierto, En Progreso, Pendiente
   - **Administrador:** Puede cambiar a cualquier estado

2. **Validación de asignación:**
   - Solo el usuario asignado o un administrador puede cambiar el estado

3. **Registro en historial:**
   - Cada cambio de estado se registra automáticamente
   - Incluye: fecha, usuario que realizó el cambio, estado anterior y nuevo

4. **Fecha de resolución:**
   - Se establece automáticamente al marcar como "Resuelto" o "Cerrado"
   - Se calcula el tiempo de resolución en horas

### Flujo Completo de Cambio de Estado

1. **Usuario autorizado** accede al detalle de la incidencia
2. **Clic en botón** "Cambiar Estado" o selecciona nuevo estado en dropdown
3. **Modal de confirmación** muestra estado actual y opciones disponibles
4. **Selección:** Usuario elige el nuevo estado
5. **Validación frontend:** Verifica que la transición es válida
6. **Petición HTTP:** `PUT /api/incidencias/{id}/estado`
7. **Validación backend:** Confirma permisos y validez
8. **Actualización BD:** Ejecuta UPDATE en tabla `incidencia`
9. **Registro historial:** Inserta evento en historial de cambios
10. **Respuesta:** Confirma cambio exitoso
11. **Actualización UI:** Refleja nuevo estado con badge de color
12. **Notificación:** Toast de confirmación al usuario

---

## 📊 RF04: GENERACIÓN DE REPORTES PERSONALIZADOS {#rf04-generación-de-reportes-personalizados}

### 🎬 GUION PARA VIDEO DEMOSTRATIVO

**Duración estimada:** 5-7 minutos

**Escena 1: Acceso al Módulo de Reportes (30 segundos)**
- Navegación al menú "Reportes"
- Mostrar dashboard de reportes con:
  - Estadísticas generales en tarjetas
  - Lista de reportes previos generados
  - Botones de exportación destacados

**Escena 2: Visualización de Estadísticas (1.5 minutos)**
- Mostrar tarjetas de KPIs en tiempo real:
  - 📊 **Total de Incidencias:** 150
  - 🔵 **Abiertas:** 45 (30%)
  - 🟡 **En Progreso:** 30 (20%)
  - 🟠 **Pendientes:** 20 (13.3%)
  - 🟢 **Cerradas/Resueltas:** 55 (36.7%)
  - ⏱️ **Tiempo Promedio de Resolución:** 24.5 horas
- Mostrar gráficos (si están implementados):
  - Gráfico de barras por estado
  - Gráfico circular de distribución
  - Tendencia temporal

**Escena 3: Validación de Datos Antes de Exportar (1 minuto)**
- Clic en botón "Actualizar Datos"
- Mostrar loading/spinner
- Toast: "Actualizando estadísticas..."
- Verificar que los números se actualizan en tiempo real
- Confirmar conexión con backend: ✓ "Conectado"

**Escena 4: Exportación a Excel/CSV (2 minutos)**
- Clic en botón "Exportar a Excel" (botón verde con icono 📊)
- Validaciones previas:
  - ✓ Verificar que hay datos disponibles
  - ✓ Verificar permisos del usuario
  - ✓ Validar conexión a backend
- Mostrar proceso:
  - Toast: "Generando reporte..."
  - Barra de progreso (si implementada)
  - Petición HTTP en DevTools: `GET /api/incidencias`
  - Procesamiento frontend (1-2 segundos)
  - Toast: "✓ Excel generado: 150 incidencias"
- Descarga automática del archivo: `incidencias_2026-05-08.csv`
- Abrir archivo en Excel:
  - Verificar columnas correctas
  - Verificar tildes y caracteres especiales (UTF-8 BOM)
  - Verificar formato de celdas
  - Mostrar datos de ejemplo:
    ```
    ID       | Titulo                        | Descripcion    | Estado      | Impacto | ...
    INC-1    | Error en sistema de tickets   | El sistema...  | Resuelto    | Alto    | ...
    INC-2    | Problema de red               | Sin acceso...  | En Progreso | Crítico | ...
    ```

**Escena 5: Validación del Archivo Excel (1 minuto)**
- **Validación 1:** Caracteres especiales correctos
  - Mostrar títulos con tildes: "Configuración", "Contraseña"
  - Verificar "ñ" en palabras como "señal", "año"
- **Validación 2:** Formato de fechas correcto
  - Formato: DD/MM/YYYY HH:MM
  - Ejemplo: 08/05/2026 14:30
- **Validación 3:** Campos con comas escapados correctamente
  - "Descripción larga, con comas, correctamente formateada"
- **Validación 4:** Integridad de datos
  - Contar filas: 150 + 1 (header) = 151 filas
  - Verificar que coincide con el total mostrado

**Escena 6: Exportación a PDF (2 minutos)**
- Clic en botón "Exportar a PDF" (botón rojo con icono 📄)
- Modal de configuración (si aplica):
  - Rango de fechas
  - Filtros por estado
  - Incluir gráficos: ☑
- Clic en "Generar PDF"
- Toast: "Generando PDF..."
- Descarga automática: `reporte_incidencias_2026-05-08.pdf`
- Abrir PDF y mostrar:
  - **Página 1: Portada**
    - Logo de la empresa
    - Título: "Reporte de Incidencias"
    - Fecha de generación
    - Generado por: [Usuario]
  - **Página 2: Resumen Ejecutivo**
    - Tabla de estadísticas
    - KPIs destacados
    - Gráficos (si aplica)
  - **Página 3+: Tabla Detallada**
    - Lista completa de incidencias
    - Formato profesional
    - Pie de página con número de página

**Escena 7: Registro del Reporte (1.5 minutos)**
- Volver a la vista de reportes
- Actualizar lista de "Reportes Generados"
- Verificar nuevo registro:
  ```
  📄 Reporte Incidencias 08/05/2026
     Total: 150 | Abiertas: 45 | En Progreso: 30 | Cerradas: 55
     Generado: 08/05/2026 15:50 | Por: Admin Sistema
     [Descargar] [Eliminar]
  ```
- Mostrar que el reporte se guardó en BD
- Consulta SQL en vivo:
  ```sql
  SELECT * FROM reporte ORDER BY fechaCreacion DESC LIMIT 1;
  ```

**Escena 8: Validación de Persistencia (1 minuto)**
- Cerrar sesión
- Volver a iniciar sesión
- Navegar a Reportes
- Verificar que los reportes generados persisten
- Descargar reporte anterior desde el historial
- Confirmar que los datos son consistentes

### Descripción Funcional

Permite generar, visualizar y exportar reportes personalizados de incidencias en múltiples formatos (CSV/Excel y PDF) con estadísticas detalladas y filtros avanzados.

### ✅ VALIDACIONES A DEMOSTRAR EN VIDEO

#### Validaciones Frontend (Angular)

1. **Validación de Datos Disponibles:**
   ```typescript
   if (incidencias.length === 0) {
     this.notificationService.toast('No hay datos para exportar', 3000, 'warning');
     return;
   }
   ```

2. **Validación de Permisos:**
   ```typescript
   if (!this.authService.tienePermiso('generar_reportes')) {
     this.notificationService.toast('No tiene permisos para generar reportes', 3000, 'error');
     return;
   }
   ```

3. **Validación de Conexión:**
   ```typescript
   this.http.get('/api/incidencias').pipe(
     timeout(10000),
     catchError(err => {
       this.notificationService.toast('Error de conexión con el servidor', 3000, 'error');
       return throwError(err);
     })
   )
   ```

4. **Formato CSV - Validaciones:**
   - ✓ UTF-8 BOM para caracteres especiales: `const bom = '\uFEFF';`
   - ✓ Escapado de comillas: `texto.replace(/"/g, '""')`
   - ✓ Separador punto y coma para Excel español
   - ✓ Encabezados correctos en primera fila

5. **Formato PDF - Validaciones:**
   - ✓ Librería jsPDF cargada correctamente
   - ✓ Imágenes/logos en formato válido
   - ✓ Tabla no excede márgenes de página
   - ✓ Paginación automática en tablas largas

6. **Validación de Tamaño:**
   ```typescript
   const tamaño = csv.length;
   if (tamaño > 10 * 1024 * 1024) { // 10MB
     confirm('El archivo es muy grande. ¿Desea continuar?');
   }
   ```

#### Validaciones Backend (Java)

1. **Validación de Sesión:**
   ```java
   HttpSession session = req.getSession(false);
   if (session == null || session.getAttribute("idUsuario") == null) {
       → Error 401: "No autenticado"
   }
   ```

2. **Endpoint /api/estadisticas - Validaciones:**
   ```java
   List<Incidencia> incidencias = incidenciaDAO.obtenerIncidencias();
   if (incidencias == null) {
       incidencias = new ArrayList<>();
   }
   
   // Cálculo de tiempo promedio con validación
   double tiempoPromedio = 0.0;
   try {
       tiempoPromedio = incidenciaDAO.obtenerTiempoPromedioResolucion();
       if (Double.isNaN(tiempoPromedio) || Double.isInfinite(tiempoPromedio)) {
           tiempoPromedio = 0.0;
       }
   } catch (Exception e) {
       logger.error("Error calculando tiempo promedio", e);
       tiempoPromedio = 0.0;
   }
   ```

3. **Endpoint /api/reportes (POST) - Validaciones:**
   ```java
   String nombre = req.getParameter("nombre");
   if (nombre == null || nombre.trim().isEmpty()) {
       res.setStatus(400);
       out.print("{\"error\":\"nombre es obligatorio\"}");
       return;
   }
   
   if (nombre.length() > 200) {
       res.setStatus(400);
       out.print("{\"error\":\"nombre muy largo (máx 200 caracteres)\"}");
       return;
   }
   ```

4. **Validación de Integridad de Números:**
   ```java
   int total = 0, abiertas = 0, enProgreso = 0, cerradas = 0;
   try {
       total = Integer.parseInt(req.getParameter("total"));
       abiertas = Integer.parseInt(req.getParameter("abiertas"));
       enProgreso = Integer.parseInt(req.getParameter("enProgreso"));
       cerradas = Integer.parseInt(req.getParameter("cerradas"));
       
       // Validar que los totales suman correctamente
       if (total != (abiertas + enProgreso + cerradas)) {
           logger.warn("Inconsistencia en totales del reporte");
       }
   } catch (NumberFormatException e) {
       res.setStatus(400);
       out.print("{\"error\":\"Parámetros numéricos inválidos\"}");
       return;
   }
   ```

5. **Validación de Inserción:**
   ```java
   boolean ok = reporteDAO.insertarReporte(reporte);
   if (!ok) {
       res.setStatus(500);
       out.print("{\"error\":\"No se pudo guardar el reporte en BD\"}");
       return;
   }
   ```

### 🧪 CASOS DE PRUEBA PARA VIDEO

| # | Caso de Prueba | Escenario | Resultado Esperado |
|---|----------------|-----------|-------------------|
| 1 | Exportar sin datos | BD vacía | "No hay datos para exportar" |
| 2 | Exportar con datos | 150 incidencias | Archivo con 150 filas + header |
| 3 | Caracteres especiales | Títulos con tildes | Tildes correctas en Excel |
| 4 | Campos con comas | Descripción: "Error en A, B, C" | Escapado correcto |
| 5 | Archivo muy grande | 10,000+ incidencias | Confirmación de tamaño |
| 6 | PDF con gráficos | Incluir charts | PDF con imágenes correctas |
| 7 | Guardar reporte | Generar y cerrar sesión | Persiste después de logout |
| 8 | Usuario sin permisos | Rol: Usuario | Botón deshabilitado/error |
| 9 | Error de conexión | Backend caído | "Error de conexión al servidor" |
| 10 | Verificar en BD | Query después de generar | Registro en tabla `reporte` |

### 🔍 DEMOSTRACIÓN DE INTEGRIDAD DE DATOS

**En el video mostrar:**

1. **Antes de exportar (consulta SQL):**
   ```sql
   SELECT COUNT(*) as total FROM incidencia;
   SELECT estado, COUNT(*) as cantidad 
   FROM incidencia 
   GROUP BY estado;
   ```
   Resultados esperados:
   ```
   total: 150
   Abierto: 45
   En Progreso: 30
   Pendiente: 20
   Resuelto: 40
   Cerrado: 15
   ```

2. **Durante la exportación (DevTools):**
   - Pestaña Network
   - Request: `GET /api/incidencias`
   - Response: JSON con 150 objetos
   - Verificar estructura de datos

3. **Archivo generado (Excel):**
   - Abrir en Excel
   - Contar filas: `=COUNTA(A:A) - 1` → Debe dar 150
   - Sumar por estado:
     - `=COUNTIF(D:D,"Abierto")` → Debe dar 45
     - `=COUNTIF(D:D,"En Progreso")` → Debe dar 30

4. **Verificar registro en BD:**
   ```sql
   SELECT * FROM reporte 
   ORDER BY fechaCreacion DESC 
   LIMIT 1;
   ```
   Verificar:
   - nombre: "Reporte Incidencias 08/05/2026"
   - total: 150
   - abiertas: 45
   - enProgreso: 30
   - cerradas: 55 (Resuelto + Cerrado)
   - generadoPor: ID del usuario actual
   - fechaCreacion: Timestamp actual

5. **Comparación de integridad:**
   - Sumar totales del archivo Excel
   - Comparar con estadísticas mostradas en UI
   - Comparar con registro en tabla `reporte`
   - **Deben ser IDÉNTICOS** → ✓ Integridad verificada

### 📋 CHECKLIST PARA EL VIDEO

**Antes de grabar:**
- [ ] Tener al menos 150 incidencias de prueba en BD
- [ ] Incidencias con diferentes estados, prioridades
- [ ] Títulos y descripciones con tildes y caracteres especiales
- [ ] Usuario con permisos de generación de reportes
- [ ] Excel instalado para abrir archivos
- [ ] Lector PDF instalado

**Durante la grabación:**
- [ ] Mostrar estadísticas actualizadas
- [ ] Generar Excel y verificar contenido
- [ ] Generar PDF y verificar formato
- [ ] Ejecutar queries SQL para verificar datos
- [ ] Mostrar DevTools con peticiones HTTP
- [ ] Verificar registro persistente en BD
- [ ] Probar casos de error (sin datos, sin permisos)

**Validaciones críticas a mostrar:**
- [ ] UTF-8 BOM funcionando (tildes correctas)
- [ ] Separador punto y coma en CSV
- [ ] Escapado de comillas y comas
- [ ] Fecha y hora en formato correcto
- [ ] Totales coinciden (UI = Excel = BD)
- [ ] Registro guardado en tabla `reporte`

### Rutas Frontend (Angular)

#### 1. Vista de Reportes
- **Ruta:** `/reports`
- **Componente:** `ReportsComponent`
- **Archivo:** `src/app/features/reports/reports.component.ts`
- **Líneas totales:** ~300 líneas

#### Métodos Principales:

**a) Carga de Estadísticas**
- **Método:** `cargarEstadisticas()` - Línea 43
- **Endpoint:** `GET /api/estadisticas`
- **Función:** Obtiene resumen de incidencias por estado

**b) Exportación a Excel/CSV**
- **Método:** `descargarExcel()` - Línea 60
- **Líneas:** 60-99
- **Formato:** CSV con separador de punto y coma (compatible con Excel en español)
- **Características:**
  - UTF-8 BOM para tildes y caracteres especiales
  - Escapado de comillas dobles
  - Nombre de archivo con timestamp
  - Columnas: ID, Título, Descripción, Estado, Impacto, Ubicación, Usuario, Fecha

**c) Exportación a PDF**
- **Método:** `descargarPDF()` - Línea 109
- **Líneas:** 109-200+
- **Librería:** jsPDF + jspdf-autotable
- **Contenido:**
  - Portada con logo y título
  - Tabla de estadísticas generales
  - Tabla detallada de incidencias
  - Pie de página con fecha de generación

**d) Gestión de Reportes Guardados**
- **Método:** `cargarReportes()` - Línea 52
- **Endpoint:** `GET /api/reportes`
- **Función:** Lista los últimos reportes generados

### Rutas Backend (Java)

#### 1. Endpoint de Estadísticas
```
GET /api/estadisticas
```

**Servlet:** `ApiServlet.java`  
**Líneas:** 127-148

**Respuesta JSON:**
```json
{
  "total": 150,
  "abiertas": 45,
  "enProgreso": 30,
  "pendientes": 20,
  "cerradas": 55,
  "tiempoPromedioResolucionHoras": 24.5
}
```

**Lógica:**
- Cuenta incidencias por cada estado
- Calcula tiempo promedio de resolución
- Agrega métricas adicionales (próximamente: por prioridad, por usuario, etc.)

#### 2. Endpoint de Listado de Reportes
```
GET /api/reportes
```

**Servlet:** `ApiServlet.java`  
**Líneas:** 110-112

**Respuesta:** Array JSON de reportes guardados
```json
[
  {
    "idReporte": 1,
    "nombre": "Reporte Incidencias 08/05/2026",
    "total": 150,
    "abiertas": 45,
    "enProgreso": 30,
    "cerradas": 55,
    "fechaCreacion": "2026-05-08T14:30:00",
    "generadoPor": 5
  }
]
```

#### 3. Endpoint de Creación de Reporte
```
POST /api/reportes
```

**Servlet:** `ApiServlet.java`  
**Líneas:** 277-309

**Parámetros:**
- `nombre` (String) - Nombre descriptivo del reporte
- `total` (int) - Total de incidencias
- `abiertas` (int) - Cantidad de incidencias abiertas
- `enProgreso` (int) - Cantidad en progreso
- `cerradas` (int) - Cantidad cerradas/resueltas
- `generadoPor` (int, opcional) - ID del usuario que genera el reporte

**Respuesta:**
```json
{
  "success": true
}
```

#### 4. DAO de Reportes
**Clase:** `ReporteDAO.java`  
**Archivo:** `java/src/com/swo/dao/ReporteDAO.java`

**Métodos principales:**
- `insertarReporte(Reporte reporte): boolean`
- `obtenerReportes(): List<Reporte>`
- `obtenerReportePorId(int id): Reporte`

**Query de inserción:**
```sql
INSERT INTO reporte (nombre, total, abiertas, enProgreso, cerradas, fechaCreacion, generadoPor) 
VALUES (?, ?, ?, ?, ?, NOW(), ?)
```

#### 5. DAO de Estadísticas en IncidenciaDAO
**Clase:** `IncidenciaDAO.java`  
**Método:** `obtenerTiempoPromedioResolucion(): double`

**Query SQL:**
```sql
SELECT AVG(TIMESTAMPDIFF(HOUR, fechaCreacion, fechaResolucion)) as promedio
FROM incidencia 
WHERE fechaResolucion IS NOT NULL
```

### Características de los Reportes

#### Formato CSV/Excel
- ✅ **Codificación UTF-8 BOM** - Tildes y caracteres especiales correctos
- ✅ **Separador punto y coma (;)** - Compatible con Excel en español
- ✅ **Escapado de comillas** - Campos con comas y comillas manejados correctamente
- ✅ **Descarga directa** - Archivo generado en el navegador sin servidor
- ✅ **Nombre con timestamp** - Ej: `incidencias_2026-05-08.csv`

#### Formato PDF
- ✅ **Diseño profesional** - Portada, encabezados, pie de página
- ✅ **Tablas formateadas** - Usando jspdf-autotable para tablas elegantes
- ✅ **Gráficos estadísticos** - (próximamente con Chart.js)
- ✅ **Metadatos del reporte** - Fecha, usuario generador, rango de fechas
- ✅ **Resumen ejecutivo** - KPIs principales en la primera página

### Filtros y Personalización

#### Filtros Disponibles (próximamente)
- Estado de incidencias
- Rango de fechas
- Usuario asignado
- Prioridad
- Proyecto
- Ubicación/Área

### Flujo Completo de Generación de Reporte

1. **Usuario accede a** `/reports`
2. **Carga automática** de estadísticas y reportes previos
3. **Selección de formato:** CSV o PDF
4. **Clic en botón** "Exportar" o "Descargar Excel/PDF"
5. **Notificación:** Toast "Generando reporte..."
6. **Petición HTTP:** `GET /api/incidencias` para datos completos
7. **Procesamiento frontend:** 
   - CSV: Construye string con formato correcto
   - PDF: Usa jsPDF para generar documento
8. **Generación de Blob** del archivo
9. **Descarga automática** con nombre único
10. **Registro del reporte:** `POST /api/reportes` con metadata
11. **Actualización de lista** de reportes generados
12. **Notificación:** Toast "Excel/PDF generado: X incidencias"

---

## 🤖 HU05: CHATBOT DE SOPORTE AUTOMATIZADO {#hu05-chatbot-de-soporte-automatizado}

### 🎬 GUION PARA VIDEO DEMOSTRATIVO

**Duración estimada:** 7-9 minutos

**Escena 1: Introducción al Chatbot (1 minuto)**
- Navegar al menú "Chatbot" o "Asistente Virtual"
- Mostrar interfaz limpia estilo chat moderno:
  - Avatar del bot a la izquierda
  - Avatar del usuario a la derecha
  - Campo de texto en la parte inferior
  - Mensaje de bienvenida del bot:
    ```
    🤖 ¡Hola! Soy el asistente virtual de SWO.
    Puedo ayudarte con:
    • Problemas técnicos comunes
    • Crear incidencias rápidamente
    • Responder preguntas frecuentes
    
    ¿En qué puedo ayudarte hoy?
    ```

**Escena 2: Consulta Exitosa - Problema de Red (2 minutos)**
- **Usuario escribe:** "No puedo conectarme a internet"
- Presionar Enter
- Mostrar indicador "Bot está escribiendo..." (3 puntos animados)
- Respuesta del bot (1-2 segundos después):
  ```
  🤖 Entiendo que tienes problemas de conexión a internet.
  
  Para solucionarlo, sigue estos pasos:
  
  1️⃣ Verifica que el cable Ethernet esté conectado correctamente
  2️⃣ Reinicia el router desconectándolo por 30 segundos
  3️⃣ Ejecuta estos comandos en CMD:
      • ipconfig /release
      • ipconfig /renew
  4️⃣ Verifica que tengas una dirección IP válida
  
  📁 Categoría: Red y conectividad
  📊 Nivel: Básico
  
  ¿Te fue útil esta solución?
  ```
- Mostrar sugerencias relacionadas:
  - "¿Cómo configurar IP estática?"
  - "Problemas con VPN corporativa"

**Escena 3: Validaciones del Chatbot (1.5 minutos)**
- **Validación 1: Consulta vacía**
  - Usuario presiona Enter sin texto
  - Mensaje: "Por favor escribe tu consulta"
  - Campo se sacude visualmente

- **Validación 2: Consulta muy corta**
  - Usuario escribe: "ayuda"
  - Bot responde con menú de opciones principales

- **Validación 3: Caracteres especiales**
  - Usuario escribe: "Contraseña con ñ y tildes áéíóú"
  - Bot procesa correctamente (UTF-8)

**Escena 4: Sin Resultados - Crear Incidencia (2.5 minutos)**
- **Usuario escribe:** "El sistema SAP no permite procesar facturas del módulo FI-CO desde hace 3 horas"
- Bot está escribiendo...
- Respuesta del bot:
  ```
  🤖 No encontré información específica sobre esa consulta en mi base de conocimiento.
  
  Parece ser un problema que requiere atención especializada.
  
  ¿Qué te gustaría hacer?
  
  🎫 Crear una incidencia para que un técnico te ayude
  🔄 Reformular tu pregunta con otras palabras
  📞 Contactar directamente con el área de TI
  ```
- Usuario selecciona: "Crear una incidencia"
- Modal de creación rápida se abre:
  - **Título** (pre-llenado): "Problema con sistema SAP - módulo FI-CO"
  - **Descripción** (pre-llenado): [Conversación completa]
  - **Categoría** (detectada): "Aplicaciones"
  - **Prioridad** (sugerida): "Alta" (detectó "desde hace 3 horas")
  - Campos editables por el usuario
- Usuario ajusta prioridad a "Crítica"
- Clic en "Crear Incidencia"
- Loading...
- Toast: "✓ Incidencia INC-456 creada exitosamente"
- Bot confirma:
  ```
  🤖 He creado la incidencia INC-456 con prioridad Crítica.
  
  Un técnico especializado te contactará pronto.
  
  📋 Ver detalle de la incidencia
  🔔 Tiempo estimado de respuesta: 30 minutos
  ```

**Escena 5: Consulta con Pasos Detallados (1.5 minutos)**
- **Usuario escribe:** "¿Cómo resetear mi contraseña de Windows?"
- Bot responde con pasos detallados:
  ```
  🤖 Para resetear tu contraseña de Windows, sigue estos pasos:
  
  📋 Método 1: Desde el dominio corporativo
  1️⃣ Presiona Ctrl+Alt+Supr
  2️⃣ Selecciona "Cambiar contraseña"
  3️⃣ Ingresa tu contraseña actual
  4️⃣ Ingresa la nueva contraseña (2 veces)
  5️⃣ Requisitos:
      • Mínimo 8 caracteres
      • Al menos 1 mayúscula
      • Al menos 1 número
      • Al menos 1 carácter especial
  
  📋 Método 2: Si olvidaste tu contraseña
  1️⃣ Comunícate con el Help Desk: ext. 2345
  2️⃣ O crea una incidencia desde aquí
  
  ⚠️ Nota: No uses contraseñas anteriores
  
  ¿Necesitas más ayuda?
  ```

**Escena 6: Historial y Persistencia (1 minuto)**
- Cerrar la ventana del chatbot
- Navegar a otra sección (Dashboard)
- Volver al Chatbot
- Verificar que el historial persiste:
  - Todas las conversaciones anteriores visibles
  - Scroll automático al último mensaje
  - Timestamps correctos

**Escena 7: Validación de Base de Conocimiento (1.5 minutos)**
- Abrir DevTools → Network
- Escribir consulta: "Problemas con impresora"
- Mostrar petición HTTP:
  ```
  GET /api/chatbot?q=Problemas%20con%20impresora
  Response 200 OK (150ms)
  ```
- Mostrar respuesta JSON en DevTools:
  ```json
  {
    "resultados": [
      {
        "id": 23,
        "categoria": "Hardware",
        "pregunta": "¿Cómo solucionar problemas de impresora?",
        "respuesta": "Para solucionar problemas con la impresora...",
        "pasos": "1. Verificar conexión||2. Reiniciar cola de impresión||...",
        "nivel": 1
      }
    ],
    "categorias": ["Hardware", "Software", "Red y conectividad", ...]
  }
  ```
- Verificar en BD (consulta SQL):
  ```sql
  SELECT * FROM conocimiento 
  WHERE pregunta LIKE '%impresora%' 
  OR respuesta LIKE '%impresora%'
  LIMIT 5;
  ```

**Escena 8: Demostración de Casos Edge (1 minuto)**
- **Caso 1: Backend no disponible**
  - Simular error de conexión
  - Bot responde:
    ```
    🤖 No pude conectarme a la base de conocimiento en este momento.
    Por favor intenta de nuevo o crea una incidencia para recibir ayuda.
    ```

- **Caso 2: Consulta con SQL Injection (seguridad)**
  - Usuario escribe: `'; DROP TABLE conocimiento; --`
  - Bot responde normalmente (entrada sanitizada)
  - No hay efecto en la BD

### Descripción Funcional

Asistente virtual inteligente que proporciona soporte automatizado 24/7 mediante consultas a una base de conocimiento estructurada. Puede responder preguntas frecuentes, proporcionar soluciones paso a paso y crear incidencias automáticamente cuando no encuentra solución.

### ✅ VALIDACIONES A DEMOSTRAR EN VIDEO

#### Validaciones Frontend (Angular)

1. **Validación de Entrada del Usuario:**
   ```typescript
   if (!consulta || consulta.trim().length === 0) {
     this.notificationService.toast('Por favor escribe tu consulta', 2000, 'warning');
     return;
   }
   
   if (consulta.length < 3) {
     this.notificationService.toast('La consulta debe tener al menos 3 caracteres', 2000, 'warning');
     return;
   }
   
   if (consulta.length > 500) {
     this.notificationService.toast('La consulta es muy larga (máx. 500 caracteres)', 2000, 'warning');
     return;
   }
   ```

2. **Validación de Estado del Chatbot:**
   ```typescript
   if (this.escribiendo) {
     // No permitir enviar nueva consulta mientras se procesa otra
     return;
   }
   ```

3. **Sanitización de HTML:**
   ```typescript
   private sanitizarMensaje(texto: string): string {
     return texto
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#039;');
   }
   ```

4. **Validación de Respuesta del Backend:**
   ```typescript
   this.http.get<ChatbotResponse>(url).pipe(
     timeout(10000),
     catchError(err => {
       const mensajeError: Mensaje = {
         texto: 'No pude conectarme a la base de conocimiento. Intenta de nuevo.',
         autor: 'bot',
         timestamp: new Date(),
         accion: 'crear_incidencia'
       };
       this.agregarMensaje(mensajeError);
       return of(null);
     })
   )
   ```

5. **Validación de Historial (LocalStorage):**
   ```typescript
   try {
     const historial = localStorage.getItem('chatbot_historial');
     if (historial) {
       const mensajes = JSON.parse(historial);
       // Validar estructura
       if (Array.isArray(mensajes)) {
         // Limitar a últimos 50 mensajes
         this.mensajes = mensajes.slice(-50);
       }
     }
   } catch (e) {
     console.error('Error cargando historial:', e);
     localStorage.removeItem('chatbot_historial');
   }
   ```

6. **Validación de Creación de Incidencia:**
   ```typescript
   if (titulo.length < 10) {
     this.notificationService.toast('El título debe tener al menos 10 caracteres', 3000, 'error');
     return;
   }
   
   if (descripcion.length < 20) {
     this.notificationService.toast('La descripción debe tener al menos 20 caracteres', 3000, 'error');
     return;
   }
   ```

#### Validaciones Backend (Java)

1. **Validación de Parámetro de Consulta:**
   ```java
   String q = req.getParameter("q");
   if (q == null || q.trim().isEmpty()) {
       out.print("{\"resultados\":[],\"categorias\":[]}");
       return;
   }
   
   if (q.length() > 500) {
       res.setStatus(400);
       out.print("{\"error\":\"Consulta muy larga (máx 500 caracteres)\"}");
       return;
   }
   ```

2. **Sanitización de Entrada (Prevenir SQL Injection):**
   ```java
   // PreparedStatement automáticamente sanitiza
   String sql = "SELECT * FROM conocimiento WHERE pregunta LIKE ? OR respuesta LIKE ?";
   PreparedStatement ps = conn.prepareStatement(sql);
   ps.setString(1, "%" + q + "%");  // Parámetro seguro
   ps.setString(2, "%" + q + "%");
   ```

3. **Validación de Resultados:**
   ```java
   List<Conocimiento> resultados = conocimientoDAO.buscarPorTexto(q);
   if (resultados == null) {
       resultados = new ArrayList<>();
   }
   
   // Limitar resultados
   if (resultados.size() > 5) {
       resultados = resultados.subList(0, 5);
   }
   ```

4. **Validación de Formato de Respuesta:**
   ```java
   // Escapar comillas en JSON
   private String escJson(String texto) {
       if (texto == null) return "";
       return texto.replace("\"", "\\\"")
                   .replace("\n", "\\n")
                   .replace("\r", "\\r")
                   .replace("\t", "\\t");
   }
   ```

5. **Manejo de Errores de BD:**
   ```java
   try {
       List<Conocimiento> resultados = conocimientoDAO.buscarPorTexto(q);
       // Procesar resultados...
   } catch (SQLException e) {
       logger.error("Error consultando conocimiento", e);
       res.setStatus(500);
       out.print("{\"error\":\"Error interno del servidor\"}");
       return;
   }
   ```

6. **Validación de Categorías:**
   ```java
   List<String> categorias = conocimientoDAO.obtenerCategorias();
   if (categorias == null || categorias.isEmpty()) {
       categorias = Arrays.asList("General", "Red y conectividad", "Aplicaciones");
   }
   ```

### 🧪 CASOS DE PRUEBA PARA VIDEO

| # | Caso de Prueba | Entrada | Resultado Esperado |
|---|----------------|---------|-------------------|
| 1 | Consulta vacía | "" (vacío) | "Por favor escribe tu consulta" |
| 2 | Consulta muy corta | "PC" | Menú de opciones principales |
| 3 | Consulta exitosa | "Problemas de internet" | Respuesta con pasos detallados |
| 4 | Sin resultados | "Problema muy específico" | Opción de crear incidencia |
| 5 | Caracteres especiales | "Contraseña con ñáéíóú" | Procesado correctamente |
| 6 | SQL Injection | `'; DROP TABLE--` | Sin efecto, entrada sanitizada |
| 7 | Consulta muy larga | 600 caracteres | "Consulta muy larga" |
| 8 | Backend no disponible | (simular error) | Mensaje de error + crear incidencia |
| 9 | Múltiples resultados | "Red" | Mejor resultado + sugerencias |
| 10 | Historial persiste | Cerrar y volver | Conversación guardada |
| 11 | Crear incidencia | "Problema no resuelto" | Modal → Incidencia INC-XXX |
| 12 | Verificar en BD | Query SQL | Registro en tabla conocimiento |

### 🔍 DEMOSTRACIÓN DE INTEGRIDAD DE DATOS

**En el video mostrar:**

1. **Base de Conocimiento (consulta SQL):**
   ```sql
   SELECT COUNT(*) as total FROM conocimiento;
   SELECT DISTINCT categoria FROM conocimiento;
   SELECT * FROM conocimiento 
   WHERE pregunta LIKE '%internet%' 
   LIMIT 5;
   ```
   
   Resultado esperado:
   ```
   total: 50+ registros
   categorias: Red y conectividad, Hardware, Software, Seguridad, ...
   ```

2. **Durante la consulta (DevTools):**
   - **Request:**
     ```
     GET /api/chatbot?q=problemas%20de%20internet
     ```
   - **Response (200 OK):**
     ```json
     {
       "resultados": [
         {
           "id": 15,
           "categoria": "Red y conectividad",
           "pregunta": "¿Cómo soluciono problemas de conexión a internet?",
           "respuesta": "Para solucionar problemas de internet...",
           "pasos": "1. Verificar cables||2. Reiniciar router||...",
           "nivel": 1
         }
       ],
       "categorias": ["Red y conectividad", "Hardware", ...]
     }
     ```

3. **Verificar pasos separados correctamente:**
   - Campo `pasos` en BD: `"1. Paso uno||2. Paso dos||3. Paso tres"`
   - Procesado en frontend: Array `["1. Paso uno", "2. Paso dos", "3. Paso tres"]`
   - Mostrado como lista numerada en UI

4. **Creación de incidencia desde chat:**
   - Consulta antes de crear:
     ```sql
     SELECT MAX(idIncidencia) FROM incidencia;
     ```
     Resultado: 150
   
   - Usuario crea incidencia desde chatbot
   
   - Consulta después de crear:
     ```sql
     SELECT * FROM incidencia 
     WHERE idIncidencia = 151 
     ORDER BY idIncidencia DESC 
     LIMIT 1;
     ```
     
     Verificar:
     - titulo: Generado desde conversación
     - descripcion: Historial completo del chat
     - estado: "Abierto"
     - impacto: Detectado automáticamente
     - idUsuarioReporta: Usuario actual

5. **Historial en LocalStorage:**
   - Abrir DevTools → Application → Local Storage
   - Key: `chatbot_historial`
   - Value: Array JSON con mensajes
   - Verificar estructura correcta
   - Verificar límite de 50 mensajes

### 📋 CHECKLIST PARA EL VIDEO

**Antes de grabar:**
- [ ] Tener al menos 50 registros en tabla `conocimiento`
- [ ] Categorías diversas: Red, Hardware, Software, Seguridad
- [ ] Registros con pasos separados por "||"
- [ ] Usuario autenticado en el sistema
- [ ] LocalStorage limpio para demostrar desde cero

**Durante la grabación:**
- [ ] Mostrar consulta exitosa con pasos
- [ ] Mostrar consulta sin resultados → crear incidencia
- [ ] Validar entrada vacía
- [ ] Validar consulta muy larga
- [ ] Mostrar indicador "escribiendo..."
- [ ] Mostrar DevTools con petición HTTP
- [ ] Ejecutar queries SQL en vivo
- [ ] Cerrar y volver para verificar historial
- [ ] Crear incidencia y verificar en BD

**Validaciones críticas a mostrar:**
- [ ] Sanitización de entrada (SQL Injection)
- [ ] UTF-8 funcionando (tildes y ñ)
- [ ] Separación de pasos con "||"
- [ ] Categorías cargadas correctamente
- [ ] Historial persistente en LocalStorage
- [ ] Creación de incidencia desde chat
- [ ] Respuesta en < 2 segundos
- [ ] Manejo de errores (backend no disponible)

### 🎯 PUNTOS CLAVE PARA DESTACAR EN EL VIDEO

1. **Velocidad de respuesta:** < 2 segundos
2. **Precisión de búsqueda:** Resultados relevantes
3. **Experiencia de usuario:** Interfaz intuitiva y fluida
4. **Robustez:** Manejo de errores elegante
5. **Seguridad:** Entrada sanitizada, sin SQL Injection
6. **Integración:** Crea incidencias directamente
7. **Persistencia:** Historial guardado localmente
8. **Escalabilidad:** Base de conocimiento expansible

### Rutas Frontend (Angular)

#### 1. Vista del Chatbot
- **Ruta:** `/chatbot`
- **Componente:** `ChatbotComponent`
- **Archivo:** `src/app/features/chatbot/chatbot.component.ts`
- **Protección:** Requiere autenticación (`canActivate: [authGuard]`)

### Servicio Frontend

**Servicio:** `ChatbotService`  
**Archivo:** `src/app/core/services/chatbot.service.ts`  
**Líneas totales:** ~400 líneas

#### Métodos Principales

**a) Envío de Consulta**
- **Método:** `enviarConsulta(consulta: string): Observable<Mensaje>` - Línea 64
- **Funcionalidad:** Envía pregunta del usuario y obtiene respuesta
- **Estados:** Activa indicador "escribiendo..." mientras procesa

**b) Consulta a Base de Conocimiento**
- **Método:** `enviarConsultaConocimiento(consulta: string): Observable<Mensaje>` - Línea 80
- **Endpoint:** `GET /api/chatbot?q={consulta}`
- **Procesamiento:**
  1. Busca coincidencias en la base de conocimiento
  2. Retorna respuesta con pasos de solución
  3. Si no hay resultados, ofrece crear incidencia

**c) Creación Automática de Incidencia**
- **Método:** `crearIncidenciaDesdeChat(...)` - Línea 156+
- **Funcionalidad:** Genera incidencia con contexto de la conversación
- **Parámetros capturados:**
  - Categoría (del contexto)
  - Prioridad (según palabras clave)
  - Descripción (del mensaje del usuario)

**d) Escalamiento a Humano**
- **Método:** `escalarAAgente(context: EscalamientoContext)`
- **Funcionalidad:** Transfiere conversación a agente humano
- **Contexto incluido:** Historial completo de mensajes

**e) Gestión de Historial**
- **Método:** `cargarHistorial()` - Línea 59
- **Método:** `guardarHistorial()` - Línea privado
- **Almacenamiento:** LocalStorage del navegador
- **Persistencia:** Mantiene últimas 50 conversaciones

### Rutas Backend (Java)

#### 1. Endpoint Principal del Chatbot
```
GET /api/chatbot?q={consulta}
```

**Servlet:** `ApiServlet.java`  
**Líneas:** 113-125

**Parámetros:**
- `q` (String) - Consulta del usuario

**Respuesta JSON:**
```json
{
  "resultados": [
    {
      "id": 15,
      "categoria": "Red y conectividad",
      "pregunta": "¿Cómo soluciono problemas de conexión a internet?",
      "respuesta": "Para solucionar problemas de internet, verifica...",
      "pasos": "1. Verificar cables||2. Reiniciar router||3. Verificar configuración IP",
      "nivel": 1
    }
  ],
  "categorias": [
    "Red y conectividad",
    "Aplicaciones",
    "Hardware",
    "Software",
    "Seguridad"
  ]
}
```

#### 2. Servlet Alternativo (JSP)
```
POST /ChatbotServlet
```

**Servlet:** `ChatbotServlet.java`  
**Archivo:** `java/src/com/swo/controller/ChatbotServlet.java`  
**Líneas:** 1-150+

**Funcionalidad:**
- Consulta con parámetro `consulta`
- Retorna JSP con resultados formateados
- Uso: Para versión JSP legacy del sistema

#### 3. DAO de Base de Conocimiento
**Clase:** `ConocimientoDAO.java`  
**Archivo:** `java/src/com/swo/dao/ConocimientoDAO.java`

**Métodos principales:**
- `buscarPorTexto(String consulta): List<Conocimiento>`
- `obtenerCategorias(): List<String>`
- `obtenerPorCategoria(String categoria): List<Conocimiento>`

**Query SQL de búsqueda:**
```sql
SELECT * FROM conocimiento 
WHERE pregunta LIKE ? OR respuesta LIKE ? OR pasos LIKE ?
ORDER BY nivel ASC
LIMIT 5
```

**Nota:** La búsqueda usa `LIKE %consulta%` en los campos `pregunta`, `respuesta` y `pasos`.

### Interfaces TypeScript

#### Mensaje
```typescript
interface Mensaje {
  texto: string;
  autor: 'usuario' | 'bot';
  timestamp: Date;
  pasos?: string[];           // Pasos de solución (si aplica)
  categoria?: string;         // Categoría de la respuesta
  nivel?: number;             // Nivel de complejidad (1-5)
  accion?: 'crear_incidencia' | 'escalar' | 'consulta';
}
```

#### KnowledgeItem
```typescript
interface KnowledgeItem {
  id: number;
  categoria: string;
  pregunta: string;
  respuesta: string;
  pasos: string;              // Separado por "||"
  nivel: number;
}
```

#### ChatbotResponse
```typescript
interface ChatbotResponse {
  resultados: KnowledgeItem[];
  categorias: string[];
}
```

### Características del Chatbot

#### 1. Búsqueda Inteligente
- ✅ **Búsqueda por similitud** - Usa LIKE para encontrar coincidencias parciales
- ✅ **Múltiples campos** - Busca en pregunta, respuesta y pasos
- ✅ **Ordenamiento por relevancia** - Prioriza por nivel de complejidad
- ✅ **Límite de resultados** - Máximo 5 resultados para evitar sobrecarga

#### 2. Respuestas Estructuradas
- ✅ **Pasos de solución** - Lista numerada de acciones a seguir
- ✅ **Categorización** - Organiza conocimiento por áreas
- ✅ **Nivel de dificultad** - De 1 (básico) a 5 (avanzado)
- ✅ **Sugerencias relacionadas** - Muestra otras preguntas similares

#### 3. Fallback Inteligente
- ✅ **Sin resultados → Crear incidencia** - Ofrece crear ticket automáticamente
- ✅ **Respuesta alternativa** - Sugiere reformular la pregunta
- ✅ **Contacto directo** - Opción de contactar con TI directamente

#### 4. Experiencia de Usuario
- ✅ **Indicador "escribiendo..."** - Muestra cuando el bot está procesando
- ✅ **Historial persistente** - Guarda conversaciones en LocalStorage
- ✅ **Scroll automático** - Se desplaza al último mensaje
- ✅ **Timestamp relativo** - "Hace 2 minutos", "Hace 1 hora"
- ✅ **Avatar con iniciales** - Identifica usuario y bot visualmente

#### 5. Integración con Incidencias
- ✅ **Creación rápida** - Un clic para crear ticket desde el chat
- ✅ **Contexto automático** - Pre-llena descripción con la conversación
- ✅ **Prioridad inteligente** - Detecta urgencia por palabras clave
- ✅ **Categorización automática** - Asigna categoría según la consulta

### Flujo Completo de Interacción

#### Flujo 1: Consulta Exitosa
1. **Usuario accede a** `/chatbot`
2. **Escribe consulta** - Ej: "No puedo conectarme a internet"
3. **Presiona Enter** o clic en "Enviar"
4. **Mensaje agregado** al historial como 'usuario'
5. **Indicador** "Bot está escribiendo..." activado
6. **Petición HTTP:** `GET /api/chatbot?q=No puedo conectarme a internet`
7. **Backend busca** en tabla `conocimiento`
8. **Respuesta encontrada** con pasos de solución
9. **Mensaje del bot** se agrega al historial
10. **Pasos mostrados** en lista numerada
11. **Sugerencias** de preguntas relacionadas (si hay)
12. **Historial guardado** en LocalStorage

#### Flujo 2: Sin Resultados → Crear Incidencia
1. **Usuario hace consulta** muy específica sin coincidencias
2. **Bot responde:** "No encontré información específica..."
3. **Bot ofrece opciones:**
   - Crear una incidencia
   - Reformular pregunta
   - Contactar con TI
4. **Usuario selecciona** "Crear incidencia"
5. **Formulario pre-llenado** con:
   - Título: Primera línea de la consulta
   - Descripción: Conversación completa
   - Categoría: Detectada automáticamente
   - Prioridad: Media (por defecto)
6. **Usuario ajusta** datos si es necesario
7. **Clic en "Crear"**
8. **Petición:** `POST /api/incidencias`
9. **Incidencia creada** con éxito
10. **Bot confirma:** "He creado la incidencia INC-456"
11. **Link directo** al detalle de la incidencia

#### Flujo 3: Escalamiento a Agente
1. **Usuario insatisfecho** con respuestas automáticas
2. **Clic en** "Hablar con un agente"
3. **Bot prepara contexto:**
   - Historial de mensajes
   - Categoría detectada
   - Prioridad calculada
4. **Modal de confirmación** muestra resumen
5. **Usuario confirma** escalamiento
6. **Sistema crea incidencia** con alta prioridad
7. **Asignación automática** al agente disponible
8. **Notificación enviada** al agente
9. **Usuario recibe** número de ticket y tiempo de espera estimado

### Base de Conocimiento

La tabla `conocimiento` en MySQL contiene:

```sql
CREATE TABLE conocimiento (
  idConocimiento INT PRIMARY KEY AUTO_INCREMENT,
  categoria VARCHAR(100),
  pregunta VARCHAR(500),
  respuesta TEXT,
  pasos TEXT,              -- Pasos separados por "||"
  nivel INT DEFAULT 1,     -- 1=básico, 5=avanzado
  fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Categorías estándar:**
- Red y conectividad
- Aplicaciones
- Hardware
- Software
- Seguridad
- Accesos y permisos
- Correo electrónico
- Impresoras
- Teléfonos VoIP

**Ejemplo de contenido:**
```sql
INSERT INTO conocimiento (categoria, pregunta, respuesta, pasos, nivel) VALUES
('Red y conectividad', 
 '¿Cómo soluciono problemas de internet?',
 'Para solucionar problemas de conexión a internet, sigue estos pasos básicos de diagnóstico...',
 '1. Verifica que el cable Ethernet esté conectado||2. Reinicia el router desconectándolo 30 segundos||3. Ejecuta ipconfig /release e ipconfig /renew en CMD||4. Verifica que tengas dirección IP válida',
 1);
```

---

## 📐 ARQUITECTURA DE RUTEO

### Frontend (Angular Router)

**Archivo de configuración:** `src/app/app.routes.ts`

```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'incidents', component: IncidentsComponent, canActivate: [authGuard] },
  { path: 'incidents/:id', component: IncidentDetailComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [authGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [authGuard] },
  { path: 'chatbot', component: ChatbotComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];
```

### Backend (Servlet Mapping)

**Servlet principal:** `@WebServlet("/api/*")`  
**Procesamiento de rutas:** `doGet()`, `doPost()`, `doPut()`, `doDelete()`  
**Extracción de path:** `req.getPathInfo()`

---

## 🔐 SEGURIDAD Y AUTENTICACIÓN

### Frontend
- **Guard:** `AuthGuard` protege todas las rutas excepto `/login`
- **Interceptor:** `HttpInterceptor` agrega token JWT a todas las peticiones
- **Servicio:** `AuthService` gestiona sesión y permisos

### Backend
- **Sesiones HTTP:** HttpSession para mantener estado del usuario
- **Validación de sesión:** Verifica `idUsuario` en sesión antes de operaciones
- **CORS:** Headers configurados en `setCorsHeaders()` para peticiones cross-origin

---

## 📚 DOCUMENTACIÓN ADICIONAL

Para más información, consulte:
- `README.md` - Guía general del proyecto
- `MODULO_INCIDENTES_README.md` - Documentación detallada del módulo de incidentes
- `GUIA_INICIO_RAPIDO_INCIDENTES.md` - Guía de inicio rápido
- `GUIA_CONFIGURACION.md` - Configuración del entorno de desarrollo

---

## 📞 CONTACTO Y SOPORTE

**Equipo de Desarrollo SWO**  
**SENA - Servicio Nacional de Aprendizaje**  
**Año:** 2026

---

## 🎥 GUÍA COMPLETA PARA GRABACIÓN DE VIDEO DEMOSTRATIVO

### 📋 ESTRUCTURA RECOMENDADA DEL VIDEO COMPLETO

**Duración total estimada:** 25-35 minutos

#### Sección 1: Introducción General (2-3 minutos)
- Presentación del sistema SWO
- Arquitectura tecnológica (Angular + Java + MySQL)
- Características principales
- Objetivos del sistema

#### Sección 2: RF01 - Registro de Incidencias (5-7 minutos)
- Demo completa según guion de RF01
- Enfatizar validaciones en tiempo real
- Mostrar casos de éxito y error

#### Sección 3: RF02 - Asignación de Incidentes (4-6 minutos)
- Demo completa según guion de RF02
- Mostrar asignación y reasignación
- Verificar en base de datos

#### Sección 4: RF03 - Cambio de Estado (6-8 minutos)
- Demo completa según guion de RF03
- Recorrer todo el ciclo de vida
- Mostrar historial de cambios

#### Sección 5: RF04 - Reportes Personalizados (5-7 minutos)
- Demo completa según guion de RF04
- Exportar Excel y PDF
- Verificar integridad de datos

#### Sección 6: HU05 - Chatbot (7-9 minutos)
- Demo completa según guion de HU05
- Mostrar casos exitosos y sin resultados
- Crear incidencia desde el chat

#### Sección 7: Conclusiones (2 minutos)
- Resumen de funcionalidades
- Validaciones implementadas
- Beneficios del sistema

### 🎬 TIPS PARA GRABACIÓN PROFESIONAL

#### Preparación del Entorno
1. **Resolución de pantalla:** 1920x1080 (Full HD mínimo)
2. **Navegador:** Chrome o Edge (DevTools accesible)
3. **Zoom:** 100% (no más, no menos)
4. **Tema:** Claro (mejor visibilidad)
5. **Extensiones:** Deshabilitar extensiones que agreguen iconos
6. **Notificaciones:** Desactivar todas las notificaciones del SO

#### Datos de Prueba
- **Usuarios:** Mínimo 10 usuarios activos con diferentes roles
- **Incidencias:** Mínimo 150 incidencias con estados variados
- **Proyectos:** 5-10 proyectos activos
- **Conocimiento:** 50+ registros en base de conocimiento

#### Software Requerido
- **Grabador de pantalla:** OBS Studio, Camtasia o similar
- **Editor de video:** DaVinci Resolve, Adobe Premiere (opcional)
- **Anotaciones:** Herramienta de flechas/resaltados en tiempo real

#### Audio
- **Micrófono:** Usar micrófono externo (no el del laptop)
- **Ambiente:** Silencioso, sin ecos
- **Guion:** Leer el guion de cada RF/HU antes de grabar
- **Pausas:** Hacer pausas entre secciones para editar después

### ✅ CHECKLIST PRE-GRABACIÓN

#### Base de Datos
- [ ] Backup de BD actual
- [ ] 150+ incidencias de prueba
- [ ] Estados variados (Abierto, En Progreso, Pendiente, Resuelto, Cerrado)
- [ ] Prioridades variadas (Baja, Media, Alta, Crítica)
- [ ] 10+ usuarios activos (Admin, Técnico, Analista, Usuario)
- [ ] 5-10 proyectos activos
- [ ] 50+ registros en tabla `conocimiento`
- [ ] Asignaciones de prueba en tabla `asignacion`
- [ ] Historial de cambios generado

#### Aplicación
- [ ] Backend corriendo en localhost:8080
- [ ] Frontend corriendo en localhost:4200
- [ ] BD MySQL activa
- [ ] Conexión entre frontend y backend verificada
- [ ] Sin errores en consola del navegador
- [ ] Sin errores en logs del backend

#### Datos de Prueba Específicos
- [ ] Incidencias con títulos con tildes: "Configuración", "Contraseña"
- [ ] Descripciones largas (> 100 caracteres)
- [ ] Campos con comas: "Error en A, B, C"
- [ ] Usuarios con nombres reales: "Juan Pérez", "María García"
- [ ] Fechas variadas (últimos 30 días)

#### Herramientas
- [ ] OBS Studio configurado (1920x1080, 30fps)
- [ ] Micrófono funcionando
- [ ] Chrome con DevTools listo
- [ ] MySQL Workbench abierto para queries
- [ ] Excel instalado
- [ ] Lector PDF instalado
- [ ] Guiones impresos o en segunda pantalla

#### Ambiente
- [ ] Pantalla limpia (cerrar pestañas innecesarias)
- [ ] Carpeta de descargas vacía
- [ ] Notificaciones desactivadas
- [ ] Modo "No molestar" activado
- [ ] Batería al 100% o conectado a corriente

### 📝 SCRIPT PARA NARRACIÓN (OPCIONAL)

**Introducción:**
> "Bienvenidos a la demostración del Sistema Web de Gestión de Incidencias, SWO. Este sistema ha sido desarrollado con tecnologías modernas como Angular 17 y Java 21, y está diseñado para gestionar eficientemente las incidencias de TI en entornos empresariales. A continuación, demostraremos las cinco funcionalidades principales del sistema, mostrando todas las validaciones implementadas."

**Transición entre RF/HU:**
> "Ahora pasaremos a demostrar [NOMBRE DE LA FUNCIONALIDAD], donde veremos cómo el sistema [DESCRIPCIÓN BREVE]..."

**Durante demostraciones de validaciones:**
> "Como pueden observar, el sistema valida en tiempo real que [EXPLICAR VALIDACIÓN]. Si el usuario intenta [ACCIÓN INVÁLIDA], el sistema inmediatamente muestra [RESPUESTA DEL SISTEMA]."

**Verificación en BD:**
> "Para verificar la integridad de los datos, ejecutaremos esta consulta SQL en la base de datos. Como pueden ver, los datos se han guardado correctamente y coinciden con lo mostrado en la interfaz."

**Conclusión:**
> "Hemos demostrado las cinco funcionalidades principales del sistema SWO: Registro de Incidencias, Asignación de Incidentes, Cambio de Estado, Generación de Reportes y el Chatbot de Soporte Automatizado. Cada módulo implementa validaciones robustas tanto en frontend como en backend, garantizando la integridad de los datos y una experiencia de usuario óptima. Gracias por su atención."

### 🎯 ELEMENTOS CRÍTICOS A NO OLVIDAR

#### En Cada RF/HU Demostrar:
1. ✅ **Validaciones de entrada** (campos vacíos, longitud mínima/máxima)
2. ✅ **Validaciones de negocio** (permisos, estados permitidos)
3. ✅ **Feedback visual** (mensajes de error/éxito, loading)
4. ✅ **Integridad de datos** (consultas SQL antes/después)
5. ✅ **Manejo de errores** (backend no disponible, datos inválidos)
6. ✅ **Persistencia** (datos guardados correctamente en BD)
7. ✅ **Actualización en tiempo real** (UI se actualiza automáticamente)

#### Capturas de DevTools:
- **Network:** Peticiones HTTP (Request/Response)
- **Console:** Sin errores (o manejados correctamente)
- **Application → Local Storage:** Para historial del chatbot

#### Consultas SQL a Ejecutar:
```sql
-- Verificar incidencias
SELECT * FROM incidencia ORDER BY idIncidencia DESC LIMIT 10;

-- Verificar asignaciones
SELECT * FROM asignacion ORDER BY fechaAsignacion DESC LIMIT 10;

-- Verificar reportes
SELECT * FROM reporte ORDER BY fechaCreacion DESC LIMIT 5;

-- Verificar conocimiento
SELECT COUNT(*) as total, categoria 
FROM conocimiento 
GROUP BY categoria;

-- Estadísticas generales
SELECT estado, COUNT(*) as cantidad 
FROM incidencia 
GROUP BY estado;
```

### 📊 MÉTRICAS DE CALIDAD DEL VIDEO

**El video debe demostrar:**
- ✅ Todas las validaciones funcionando correctamente
- ✅ Manejo elegante de errores
- ✅ Tiempos de respuesta rápidos (< 2 segundos)
- ✅ Interfaz limpia y profesional
- ✅ Datos persistentes en BD
- ✅ Código sin errores en consola
- ✅ Queries SQL mostrando integridad
- ✅ Casos de uso realistas

**Evitar:**
- ❌ Pantallas congeladas o lentas
- ❌ Errores no manejados en consola
- ❌ Datos inconsistentes (UI vs BD)
- ❌ Tiempos de espera largos sin feedback
- ❌ Textos mal escritos o con errores ortográficos
- ❌ Validaciones que no funcionan
- ❌ Backend no disponible sin manejar

### 🔄 PROCESO POST-GRABACIÓN

1. **Revisión:** Ver el video completo, anotar errores
2. **Edición:**
   - Cortar pausas largas
   - Agregar títulos y subtítulos
   - Resaltar elementos importantes (zoom, flechas)
   - Agregar música de fondo suave (opcional)
3. **Exportación:** MP4, 1920x1080, 30fps, bitrate alto
4. **Subtítulos:** Agregar subtítulos en español (recomendado)
5. **Publicación:** YouTube, Vimeo o plataforma requerida

### 📦 ENTREGABLES

1. **Video completo** (25-35 minutos)
2. **Este guion** (GUION_FUNCIONALIDADES.md)
3. **Scripts SQL** de las consultas ejecutadas
4. **Capturas de pantalla** de validaciones clave
5. **Datos de prueba** (export de BD)
6. **README** con instrucciones para reproducir

---

*Documento generado automáticamente el 8 de mayo de 2026*
