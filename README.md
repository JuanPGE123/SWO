# SWO - ServiceDesk

Sistema de gestión de incidencias y soporte técnico desarrollado para SENA.

## 📋 Descripción

ServiceDesk SWO es una aplicación web completa para la gestión de incidencias, usuarios, reportes y atención mediante chatbot. Desarrollado con HTML, CSS y JavaScript vanilla, mantiene un diseño coherente y profesional en todas sus secciones.

## 🎨 Paleta de Colores

El proyecto utiliza una paleta de colores consistente definida en todos los archivos CSS:

- **Background**: `#071018` - Fondo principal oscuro
- **Card Background**: Gradiente sutil `rgba(255, 255, 255, 0.02)` a `rgba(255, 255, 255, 0.01)`
- **Muted Text**: `#9aa5b1` - Texto secundario
- **Accent**: `#05d0e6` - Color principal (cyan)
- **Green**: `#19d38f` - Acciones positivas
- **Blue**: `#2545a8` - Elementos secundarios

Ver [PALETA_COLORES.md](PALETA_COLORES.md) para más detalles.

## 📁 Estructura del Proyecto

```
SWO/
├── index.html              # Página de login/autenticación
├── styles.css              # Estilos del login
├── scripts.js              # Lógica del login
├── panel.html              # Dashboard principal
├── panel.css               # Estilos del dashboard
├── panel.js                # Lógica del dashboard
├── incidents.html          # Gestión de incidencias
├── incidents.css           # Estilos de incidencias
├── incidents.js            # Lógica de incidencias
├── incident_detail.html    # Detalle de incidencia
├── incident_detail.js      # Lógica del detalle
├── reports.html            # Panel de reportes
├── reports.css             # Estilos de reportes
├── reports.js              # Lógica de reportes
├── chatbot.html            # Asistente virtual
├── chatbot.css             # Estilos del chatbot
├── chatbot.js              # Lógica del chatbot
├── usuarios.html           # Gestión de usuarios
├── usuarios.css            # Estilos de usuarios
├── usuarios.js             # Lógica de usuarios
└── imagenes/               # Recursos gráficos
    └── logoSWO_sinFondo.png
```

## 🚀 Características

### 🔐 Autenticación
- Login seguro con email, contraseña y proyecto
- Opción de doble factor (2FA)
- Validación de credenciales

### 📊 Panel Principal
- Vista de incidentes prioritarios
- Eventos recientes
- Gestión de canales de notificación
- Reglas rápidas configurables

### 🎫 Gestión de Incidencias
- Listado completo de incidencias
- Métricas en tiempo real
- Filtrado por estado y búsqueda
- Vista detallada de cada incidente

### 👥 Gestión de Usuarios
- Listado completo con información detallada
- Filtrado por área
- Búsqueda en tiempo real
- Exportación a CSV
- Datos: nombre, apellido, correo, celular, área, jefe directo

### 📈 Reportes
- Métricas de rendimiento
- Tiempo medio de resolución
- Cumplimiento de SLA
- Top categorías
- Exportación de datos

### 🤖 ChatBot
- Asistente virtual para analistas
- Validación de conocimiento
- Búsqueda de incidencias
- Acciones rápidas

## 🎯 Coherencia Visual

Todos los módulos mantienen:
- **Sidebar consistente**: Logo, marca con badge, navegación, búsqueda y usuario
- **Colores unificados**: Paleta coherente en todos los archivos
- **Tipografía**: Inter como fuente principal
- **Espaciados**: Padding y márgenes consistentes
- **Componentes**: Botones, tarjetas y formularios con estilos uniformes
- **Hover states**: Transiciones suaves en todos los elementos interactivos

## 🛠️ Tecnologías

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid)
- JavaScript ES6+
- Diseño responsive

## 📱 Responsive Design

Todas las páginas están optimizadas para:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🎨 Componentes Reutilizables

### Sidebar
- Logo y marca
- Navegación con estados activos
- Búsqueda
- Footer con información de usuario

### Botones
- `.btn` - Botón principal con color accent
- `.btn.primary` - Botón de acción primaria (verde)
- `.btn.ghost` - Botón transparente con borde
- `.btn-sm` - Botón pequeño para acciones en tablas

### Tarjetas
- `.card` - Contenedor con fondo translúcido
- `.metric` - Tarjeta de métrica con valor destacado

## 👨‍💻 Desarrollo

El proyecto está estructurado de manera modular, con archivos separados para cada sección. Todos los estilos siguen las mismas variables CSS definidas en `:root` para facilitar mantenimiento y actualizaciones.

## 📄 Licencia

© 2025 SWO - Proyecto SENA

---

**Nota**: Este proyecto mantiene coherencia visual total entre todas sus páginas, con colores, espaciados y componentes unificados.
