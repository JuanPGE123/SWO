# SWO - ServiceDesk | Migración a Angular 17

![Angular](https://img.shields.io/badge/Angular-17.0.0-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![RxJS](https://img.shields.io/badge/RxJS-7.8-purple)

## 📋 Descripción General

**SWO (ServiceDesk)** es una aplicación web completa de gestión de incidencias, usuarios, reportes y soporte técnico.

Este proyecto ha sido **completamente migrado de HTML/CSS/JavaScript vanilla a Angular 17** con arquitectura moderna, TypeScript, RxJS y mejores prácticas de desarrollo.

### Estado del Proyecto
✅ **Migración completada exitosamente**  
✅ **100% funcional en Angular**  
✅ **Código totalmente tipado y comentado**  
✅ **Listo para desarrollo y expansión**

## 🚀 Características Principales

| Módulo | Descripción | Estado |
|--------|-------------|--------|
| **Autenticación** | Login seguro con validación | ✅ |
| **Dashboard** | Panel principal con métricas | ✅ |
| **Incidencias** | Gestión completa de tickets | ✅ |
| **Usuarios** | Administración de usuarios | ✅ |
| **Reportes** | Análisis y reportes | ✅ |
| **ChatBot** | Asistente virtual | ✅ |

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── services/       # AuthService, IncidentsService, UsersService, NotificationService
│   │   ├── guards/         # auth.guard.ts
│   │   └── models/         # models.ts (interfaces)
│   ├── features/           # Componentes por módulo
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── incidents/
│   │   ├── users/
│   │   ├── reports/
│   │   └── chatbot/
│   ├── shared/
│   │   ├── components/     # sidebar.component
│   │   ├── directives/
│   │   └── pipes/
│   └── app.component, app.routes, app.config
├── styles.scss             # Estilos globales
└── index.html              # HTML principal
```

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
