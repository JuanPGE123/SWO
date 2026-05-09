# 📋 MÓDULO DE GESTIÓN DE INCIDENTES - DOCUMENTACIÓN COMPLETA

## 🎯 Descripción General

Módulo completo y avanzado para la gestión de incidentes en el sistema SWO. Permite crear, visualizar, editar, y hacer seguimiento completo del ciclo de vida de una incidencia con todas las funcionalidades requeridas para un entorno de producción real.

---

## ✨ Características Implementadas

### ✅ **1. CREACIÓN DE INCIDENTES**
- ✓ Formulario completo con validación reactiva
- ✓ Campos: título, descripción, prioridad, estado, categoría, ubicación, aplicación
- ✓ Validaciones estrictas (required, minLength, maxLength, minWords)
- ✓ Feedback visual en tiempo real
- ✓ Contador de caracteres
- ✓ Asignación de usuario y proyecto

### ✅ **2. LISTADO DE INCIDENTES**
- ✓ Vista de tabla/tarjetas con todas las incidencias
- ✓ Filtros por estado y prioridad
- ✓ Búsqueda en tiempo real
- ✓ Badges de estado y prioridad con colores
- ✓ Acceso rápido al detalle
- ✓ Estadísticas en tiempo real

### ✅ **3. DETALLE COMPLETO**
- ✓ Vista completa de la incidencia
- ✓ Navegación por pestañas (Información, Comentarios, Archivos, Historial)
- ✓ Breadcrumb de navegación
- ✓ Información del reportante
- ✓ Metadatos completos
- ✓ Acciones rápidas (Editar, Cambiar estado, Volver)

### ✅ **4. CAMBIO DE ESTADOS**
- ✓ Modal de selección de estado
- ✓ Estados soportados: Abierto, En Progreso, Pendiente, Resuelto, Cerrado
- ✓ Validación de transiciones
- ✓ Registro automático en historial
- ✓ Indicadores visuales por color

### ✅ **5. SISTEMA DE COMENTARIOS**
- ✓ Lista cronológica de comentarios
- ✓ Formulario de nuevo comentario con validación
- ✓ Avatar de usuario con iniciales
- ✓ Formato de fecha relativa ("Hace X minutos")
- ✓ Scroll automático al último comentario
- ✓ Estados de carga
- ✓ Integración con backend

### ✅ **6. ARCHIVOS ADJUNTOS**
- ✓ Drag & drop para subir archivos
- ✓ Validación de tipo y tamaño (máx. 10MB)
- ✓ Tipos permitidos: PDF, imágenes, Word, Excel, TXT
- ✓ Preview de imágenes
- ✓ Descarga de archivos
- ✓ Eliminación con confirmación
- ✓ Iconos contextuales por tipo de archivo
- ✓ Progress bar durante la subida

### ✅ **7. HISTORIAL DE CAMBIOS**
- ✓ Timeline vertical con eventos
- ✓ Tipos de eventos: creación, estado, prioridad, asignación, comentario, archivo, edición
- ✓ Iconos y colores contextuales
- ✓ Comparación de valores (anterior/nuevo)
- ✓ Filtros opcionales por tipo de evento
- ✓ Fecha y usuario en cada evento
- ✓ Formato de fecha relativa

---

## 🗂️ Arquitectura del Módulo

### **Estructura de Carpetas**

```
src/app/features/incidents/
├── incidents.component.ts         # Componente principal (listado)
├── incidents.component.html
├── incidents.component.scss
├── incident-detail/               # Vista de detalle completo
│   ├── incident-detail.component.ts
│   ├── incident-detail.component.html
│   └── incident-detail.component.scss
├── incident-form/                 # Formulario reutilizable
│   ├── incident-form.component.ts
│   ├── incident-form.component.html
│   └── incident-form.component.scss
├── incident-comments/             # Gestión de comentarios
│   ├── incident-comments.component.ts
│   ├── incident-comments.component.html
│   └── incident-comments.component.scss
├── incident-files/                # Archivos adjuntos
│   ├── incident-files.component.ts
│   ├── incident-files.component.html
│   └── incident-files.component.scss
└── incident-history/              # Historial de cambios
    ├── incident-history.component.ts
    ├── incident-history.component.html
    └── incident-history.component.scss
```

### **Servicios**

```
src/app/core/services/
├── incidents.service.ts           # CRUD de incidencias
├── notification.service.ts        # Notificaciones toast
├── auth.service.ts                # Autenticación
├── users.service.ts               # Gestión de usuarios
└── projects.service.ts            # Gestión de proyectos
```

### **Modelos**

```
src/app/core/models/
├── models.ts                      # Interfaces principales
│   ├── Incidencia
│   ├── Usuario
│   ├── Comentario
│   ├── ArchivoAdjunto ✨ NUEVO
│   └── HistorialCambio ✨ NUEVO
├── dtos.ts                        # DTOs para backend
└── enums/
    └── app.enums.ts               # Enumeraciones
        ├── EstadoIncidencia
        ├── PrioridadIncidencia
        └── RolUsuario
```

---

## 📝 Uso de los Componentes

### **1. Componente de Listado (incidents.component)**

```typescript
// En la ruta /dashboard/incidents
// Muestra todas las incidencias con filtros y búsqueda

// Funcionalidades:
- Crear nueva incidencia (modal)
- Filtrar por estado (all, open, inprogress, pending, resolved)
- Buscar por título o descripción
- Ver estadísticas en tiempo real
- Acceder al detalle de cada incidencia
```

### **2. Componente de Detalle (incident-detail.component)**

```typescript
// En la ruta /dashboard/incidents/:id
// Vista completa con navegación por pestañas

// Props:
- incidentId: string (desde la ruta)

// Funcionalidades:
- Ver información completa
- Editar incidencia (formulario integrado)
- Cambiar estado (modal)
- Gestionar comentarios (componente dedicado)
- Subir archivos (componente dedicado)
- Ver historial (componente dedicado)
```

### **3. Componente de Formulario (incident-form.component)**

```html
<!-- Crear nueva incidencia -->
<app-incident-form 
  (onSubmit)="crearIncidencia($event)"
  (onCancel)="cerrarModal()">
</app-incident-form>

<!-- Editar incidencia existente -->
<app-incident-form 
  [incident]="incidenteSeleccionado"
  [editMode]="true"
  [saving]="guardando"
  (onSubmit)="actualizarIncidencia($event)"
  (onCancel)="cerrarModal()">
</app-incident-form>
```

**Props:**
- `incident?: Incidencia` - Incidencia a editar (opcional)
- `editMode: boolean` - Modo edición (default: false)
- `saving: boolean` - Estado de guardado (default: false)

**Eventos:**
- `onSubmit: EventEmitter<any>` - Formulario enviado con datos
- `onCancel: EventEmitter<void>` - Formulario cancelado

### **4. Componente de Comentarios (incident-comments.component)**

```html
<app-incident-comments
  [incidentId]="'INC-123'"
  [comments]="comentarios"
  [autoLoad]="true"
  (onCommentAdded)="recargarComentarios($event)"
  (onError)="manejarError($event)">
</app-incident-comments>
```

**Props:**
- `incidentId: string` - ID de la incidencia (requerido)
- `comments: Comentario[]` - Lista de comentarios (opcional)
- `autoLoad: boolean` - Cargar automáticamente (default: true)

**Eventos:**
- `onCommentAdded: EventEmitter<Comentario>` - Nuevo comentario agregado
- `onError: EventEmitter<string>` - Error ocurrido

### **5. Componente de Archivos (incident-files.component)**

```html
<app-incident-files
  [incidentId]="'INC-123'"
  [files]="archivos"
  [autoLoad]="false"
  [maxFileSize]="10485760"
  (onFileUploaded)="recargarArchivos($event)"
  (onFileDeleted)="actualizarLista($event)"
  (onError)="manejarError($event)">
</app-incident-files>
```

**Props:**
- `incidentId: string` - ID de la incidencia (requerido)
- `files: ArchivoAdjunto[]` - Lista de archivos (opcional)
- `autoLoad: boolean` - Cargar automáticamente (default: true)
- `maxFileSize: number` - Tamaño máximo en bytes (default: 10MB)
- `allowedTypes: string[]` - Tipos MIME permitidos

**Eventos:**
- `onFileUploaded: EventEmitter<ArchivoAdjunto>` - Archivo subido
- `onFileDeleted: EventEmitter<string>` - Archivo eliminado
- `onError: EventEmitter<string>` - Error ocurrido

### **6. Componente de Historial (incident-history.component)**

```html
<app-incident-history
  [incidentId]="'INC-123'"
  [history]="historial"
  [autoLoad]="false"
  [showFilters]="true">
</app-incident-history>
```

**Props:**
- `incidentId: string` - ID de la incidencia (requerido)
- `history: HistorialCambio[]` - Lista de cambios (opcional)
- `autoLoad: boolean` - Cargar automáticamente (default: true)
- `showFilters: boolean` - Mostrar filtros (default: false)

---

## 🎨 Estilos y Diseño

### **Principios de Diseño Aplicados**

1. **Mobile-First**: Diseño responsivo que funciona en todos los dispositivos
2. **Accesibilidad**: Contraste adecuado, tamaños de fuente legibles
3. **Consistencia**: Variables CSS reutilizables en todos los componentes
4. **Feedback Visual**: Estados hover, focus, active claramente diferenciados
5. **Animaciones Suaves**: Transiciones de 0.2s-0.3s para fluidez

### **Variables CSS Comunes**

```scss
--primary-color: #2563eb;
--success-color: #16a34a;
--warning-color: #f59e0b;
--danger-color: #dc2626;
--border-color: #e5e7eb;
--text-color: #1f2937;
--text-secondary: #6b7280;
```

### **Clases de Estado**

```scss
// Estados de incidencia
.status-open { color: #2563eb; background: #dbeafe; }
.status-inprogress { color: #f59e0b; background: #fef3c7; }
.status-pending { color: #6b7280; background: #f3f4f6; }
.status-resolved { color: #16a34a; background: #dcfce7; }

// Prioridades
.priority-low { color: #6b7280; }
.priority-medium { color: #f59e0b; }
.priority-high { color: #dc2626; }
.priority-critical { color: #991b1b; font-weight: 700; }
```

---

## 🔌 Integración con Backend

### **Endpoints Requeridos**

```typescript
// Incidencias
GET    /api/incidencias              // Listar todas
GET    /api/incidencias/:id          // Obtener por ID
POST   /api/incidencias              // Crear nueva
PUT    /api/incidencias/:id          // Actualizar
DELETE /api/incidencias/:id          // Eliminar

// Comentarios
GET    /api/incidencias/:id/comentarios          // Listar
POST   /api/incidencias/:id/comentarios          // Agregar

// Archivos
GET    /api/incidencias/:id/archivos             // Listar
POST   /api/incidencias/:id/archivos             // Subir
DELETE /api/incidencias/:id/archivos/:fileId     // Eliminar

// Historial
GET    /api/incidencias/:id/historial            // Obtener
```

### **Formato de Datos**

Ver archivos:
- `src/app/core/models/models.ts` - Interfaces TypeScript
- `src/app/core/models/dtos.ts` - DTOs de comunicación

---

## ✅ Validaciones Implementadas

### **Formulario de Incidencia**

| Campo | Validaciones |
|-------|--------------|
| Título | Required, minLength(5), maxLength(100), noWhitespace |
| Descripción | Required, minWords(10), maxLength(500), noWhitespace |
| Categoría | Required |
| Prioridad | Required |
| Ubicación | maxLength(100) |

### **Comentarios**

- Mínimo 3 caracteres
- Máximo 1000 caracteres
- No puede estar vacío

### **Archivos**

- Tamaño máximo: 10MB
- Tipos permitidos: PDF, PNG, JPG, JPEG, DOC, DOCX, XLS, XLSX, TXT
- Múltiples archivos por incidencia

---

## 🚀 Próximos Pasos / Mejoras Futuras

1. **Notificaciones en Tiempo Real**: WebSockets para actualizaciones live
2. **Exportación de Reportes**: PDF, Excel de incidencias
3. **Dashboard Analítico**: Gráficos y métricas avanzadas
4. **SLA (Service Level Agreement)**: Tiempo de respuesta y resolución
5. **Plantillas de Incidencias**: Crear incidencias desde plantillas
6. **Automatizaciones**: Reglas automáticas según criterios
7. **Etiquetas Personalizadas**: Tags adicionales para categorización
8. **Búsqueda Avanzada**: Filtros complejos y guardados

---

## 📚 Recursos Adicionales

- **Documentación Angular**: https://angular.io/docs
- **RxJS**: https://rxjs.dev/guide/overview
- **TypeScript**: https://www.typescriptlang.org/docs/

---

## 👥 Equipo de Desarrollo

**Equipo SWO - Sistema de Gestión de Incidencias**

Versión: 2.0.0  
Fecha: Mayo 2026

---

## 📄 Licencia

Todos los derechos reservados © 2026
