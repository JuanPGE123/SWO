# 🚀 GUÍA DE INICIO RÁPIDO - MÓDULO DE INCIDENTES

## ⚡ Instalación y Configuración

### **Paso 1: Verificar estructura de archivos**

Asegúrate de que todos los archivos se hayan creado correctamente:

```
✓ src/app/core/models/models.ts (actualizado con ArchivoAdjunto, HistorialCambio)
✓ src/app/features/incidents/incident-form/
✓ src/app/features/incidents/incident-comments/
✓ src/app/features/incidents/incident-files/
✓ src/app/features/incidents/incident-history/
✓ src/app/features/incidents/incident-detail/ (actualizado)
```

### **Paso 2: Compilar el proyecto**

```bash
# Instalar dependencias (si es necesario)
npm install

# Compilar TypeScript
ng build

# O ejecutar en desarrollo
ng serve
```

### **Paso 3: Verificar imports**

Angular standalone components ya están importados correctamente. No necesitas hacer cambios adicionales en módulos.

---

## 🎯 Uso Básico

### **1. Ver listado de incidencias**

```
Navega a: http://localhost:4200/dashboard/incidents
```

**Acciones disponibles:**
- ✓ Ver todas las incidencias
- ✓ Filtrar por estado (botones en la parte superior)
- ✓ Buscar por texto
- ✓ Crear nueva incidencia (botón "Nueva Incidencia")
- ✓ Ver estadísticas en tiempo real

### **2. Crear una incidencia**

1. Click en "Nueva Incidencia"
2. Completar el formulario:
   - **Título** (obligatorio, mín. 5 caracteres)
   - **Descripción** (obligatorio, mín. 10 palabras)
   - **Categoría** (obligatorio)
   - **Prioridad** (obligatorio)
   - Usuario asignado (opcional)
   - Proyecto (opcional)
   - Ubicación, Aplicación, Actividad (opcional)
3. Click en "Crear Incidencia"
4. Verás una notificación de éxito

### **3. Ver detalle de una incidencia**

1. Click en cualquier incidencia del listado
2. Se abrirá la vista de detalle con 4 pestañas:
   - **Información**: Datos completos de la incidencia
   - **Comentarios**: Agregar y ver comentarios
   - **Archivos**: Subir y descargar archivos
   - **Historial**: Ver todos los cambios realizados

### **4. Editar una incidencia**

1. En la vista de detalle, click en "Editar"
2. El formulario se cargará con los datos actuales
3. Modifica los campos necesarios
4. Click en "Guardar Cambios"
5. Se actualizará automáticamente y se agregará al historial

### **5. Cambiar estado**

1. En la vista de detalle, click en "Cambiar Estado"
2. Selecciona el nuevo estado (Abierto, En Progreso, Pendiente, Resuelto, Cerrado)
3. Click en "Guardar"
4. El estado se actualiza y se registra en el historial

### **6. Agregar comentarios**

1. Pestaña "Comentarios"
2. Escribe tu comentario en el área de texto (mín. 3 caracteres)
3. Click en "Enviar comentario"
4. Aparecerá en la lista con tu nombre y fecha

### **7. Subir archivos**

1. Pestaña "Archivos"
2. Arrastra archivos o click en "Seleccionar archivos"
3. Tipos permitidos: PDF, imágenes, Word, Excel, TXT
4. Tamaño máximo: 10MB por archivo
5. Se sube automáticamente con barra de progreso

### **8. Ver historial**

1. Pestaña "Historial"
2. Verás un timeline de todos los cambios
3. Puedes filtrar por tipo de evento (opcional)
4. Cada evento muestra: usuario, fecha, acción, descripción

---

## 🐛 Solución de Problemas Comunes

### **Error: "Cannot find module"**

```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

### **Error de compilación TypeScript**

```bash
# Limpiar caché y recompilar
ng build --configuration development
```

### **Los componentes no se muestran**

Verifica que los imports estén correctos en `incident-detail.component.ts`:

```typescript
import { IncidentFormComponent } from '../incident-form/incident-form.component';
import { IncidentCommentsComponent } from '../incident-comments/incident-comments.component';
import { IncidentFilesComponent } from '../incident-files/incident-files.component';
import { IncidentHistoryComponent } from '../incident-history/incident-history.component';
```

### **Material Icons no se ven**

Agrega en `index.html` (si no está):

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

---

## 📝 Ejemplos de Código

### **Crear una incidencia programáticamente**

```typescript
const nuevaIncidencia = {
  titulo: 'No puedo acceder al sistema',
  descripcion: 'Al intentar iniciar sesión aparece error 500. He probado con diferentes navegadores.',
  categoria: 'Software',
  prioridad: 'Alta',
  estado: 'open',
  usuarioAsignado: 'Juan Pérez',
  proyecto: 'SWO',
  ubicacion: 'Edificio A',
  aplicacion: 'Sistema Web',
  actividad: 'Intentando iniciar sesión'
};

this.incidentsService.crearIncidencia(nuevaIncidencia).subscribe({
  next: (resultado) => {
    console.log('Incidencia creada:', resultado);
  },
  error: (error) => {
    console.error('Error:', error);
  }
});
```

### **Agregar un comentario programáticamente**

```typescript
const comentario: Comentario = {
  author: 'María González',
  date: new Date().toISOString(),
  text: 'Se está investigando el problema. Actualizaremos pronto.'
};

// El componente se encarga de enviarlo al backend
```

### **Generar historial mock para pruebas**

```typescript
const historialPrueba: HistorialCambio[] = [
  {
    id: 'HIST-1',
    fecha: new Date().toISOString(),
    usuario: 'Sistema',
    tipo: 'creacion',
    accion: 'Incidencia creada',
    descripcion: 'Se creó la incidencia INC-123',
    icono: 'add_circle',
    color: 'success'
  },
  {
    id: 'HIST-2',
    fecha: new Date(Date.now() - 3600000).toISOString(),
    usuario: 'Juan Pérez',
    tipo: 'estado',
    accion: 'Cambio de estado',
    descripcion: 'Estado actualizado',
    valorAnterior: 'Abierto',
    valorNuevo: 'En Progreso',
    icono: 'sync',
    color: 'primary'
  }
];
```

---

## 🎨 Personalización

### **Cambiar colores del tema**

Edita las variables CSS en cualquier archivo `.scss`:

```scss
:host {
  --primary-color: #your-color;
  --success-color: #your-color;
  --warning-color: #your-color;
  --danger-color: #your-color;
}
```

### **Modificar validaciones del formulario**

En `incident-form.component.ts`:

```typescript
titulo: [
  '',
  [
    Validators.required,
    Validators.minLength(10),  // Cambiar longitud mínima
    Validators.maxLength(200)  // Cambiar longitud máxima
  ]
],
```

### **Agregar campos adicionales**

1. Añadir en el FormGroup (incident-form.component.ts)
2. Añadir en el HTML (incident-form.component.html)
3. Actualizar interfaz Incidencia (models.ts)

---

## 📊 Testing

### **Probar el módulo completo**

1. **Crear incidencia**
   - Llenar formulario con datos válidos
   - Verificar validaciones con datos inválidos
   - Confirmar creación exitosa

2. **Ver detalle**
   - Click en incidencia creada
   - Verificar que todos los datos se muestran correctamente
   - Navegar entre pestañas

3. **Agregar comentario**
   - Escribir comentario de prueba
   - Verificar que aparece en la lista
   - Verificar formato de fecha

4. **Subir archivo** (simulado)
   - Arrastrar un archivo PNG
   - Verificar validación de tamaño
   - Confirmar subida exitosa

5. **Ver historial**
   - Verificar eventos automáticos
   - Cambiar estado y verificar nuevo evento
   - Probar filtros (si están activados)

---

## 🔥 Funcionalidades Destacadas

### **1. Validación en Tiempo Real**
- ✨ Feedback inmediato mientras escribes
- ✨ Mensajes de error específicos y claros
- ✨ Contador de caracteres dinámico

### **2. Drag & Drop de Archivos**
- ✨ Arrastra archivos directamente
- ✨ Validación automática de tipo y tamaño
- ✨ Preview de imágenes

### **3. Timeline de Historial**
- ✨ Visualización cronológica elegante
- ✨ Iconos y colores contextuales
- ✨ Comparación de valores (antes/después)

### **4. Comentarios Tipo Chat**
- ✨ Diseño moderno estilo mensajería
- ✨ Avatares con iniciales
- ✨ Fecha relativa ("Hace 5 minutos")

### **5. Navegación Intuitiva**
- ✨ Pestañas claras y organizadas
- ✨ Breadcrumbs de navegación
- ✨ Acciones rápidas siempre visibles

---

## 📞 Soporte

Si encuentras problemas o tienes dudas:

1. Revisa la documentación completa en `MODULO_INCIDENTES_README.md`
2. Verifica los comentarios en el código fuente
3. Consulta los ejemplos de uso en esta guía

---

## ✨ ¡Listo!

Tu módulo de gestión de incidentes está completamente funcional y listo para usar. 

**Siguiente paso recomendado:** Integrar con tu backend real para persistencia de datos.

---

**Versión:** 2.0.0  
**Última actualización:** Mayo 2026  
**Equipo:** SWO Development Team
