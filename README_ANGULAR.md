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

## 🛠 Tecnologías Utilizadas

- **Angular 17.0.0** - Framework moderna para aplicaciones web
- **TypeScript 5.2** - Lenguaje tipado que compila a JavaScript
- **RxJS 7.8** - Programación reactiva con Observables
- **SCSS/CSS** - Preprocesador CSS con variables y anidamiento
- **HTML5** - Marcado semántico

## 🔐 Seguridad

- ✅ Tipado fuerte en todos los services
- ✅ Guards de autenticación en rutas protegidas
- ✅ Validación de formularios en cliente
- ✅ Sesión gestionada con BehaviorSubject

## 📦 Instalación

### Requisitos Previos
- Node.js (v18 o superior)
- npm (v9 o superior)
- Angular CLI (v17)

### Pasos de Instalación

```bash
# 1. Instalar Angular CLI globalmente
npm install -g @angular/cli

# 2. Instalar dependencias del proyecto
npm install

# 3. Iniciar el servidor de desarrollo
ng serve --open

# 4. La aplicación se abrirá en http://localhost:4200
```

### Credenciales de Prueba
```
Usuario: admin@sena.edu.co
Contraseña: admin123
```

## 🎯 Guía de Componentes

### AuthComponent
**Ubicación:** `src/app/features/auth/`

Componente de autenticación con:
- Formulario de login con validación
- Toggle de visibilidad de contraseña
- Gestión de errores

```typescript
// Uso del AuthService
this.authService.login(credenciales).subscribe(() => {
  this.router.navigate(['/dashboard']);
});
```

### DashboardComponent
**Ubicación:** `src/app/features/dashboard/`

Panel principal que muestra:
- Bienvenida del usuario autenticado
- Resumen de incidencias
- Canales disponibles
- Eventos recientes

### IncidentsComponent & IncidentDetailComponent
**Ubicación:** `src/app/features/incidents/`

Gestión de incidencias con:
- Tabla paginada de tickets
- Filtrado por estado y prioridad
- Vista detallada con comentarios
- Asignación a usuarios

### UsersComponent
**Ubicación:** `src/app/features/users/`

Administración de usuarios:
- Listado completo de usuarios
- Filtrado por área
- Búsqueda avanzada
- Exportación a CSV

### ReportsComponent
**Ubicación:** `src/app/features/reports/`

Reportes y análisis:
- Métricas clave
- Gráficos de categorías
- Tabla de reportes detallados

### ChatbotComponent
**Ubicación:** `src/app/features/chatbot/`

Asistente virtual:
- Interfaz de chat interactiva
- Acciones rápidas
- Historial persistente en localStorage
- Exportación de conversaciones

## 🔄 Rutas Disponibles

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/login` | AuthComponent | Autenticación de usuario |
| `/dashboard` | DashboardComponent | Panel principal |
| `/incidents` | IncidentsComponent | Listado de incidencias |
| `/incidents/:id` | IncidentDetailComponent | Detalle de incidencia |
| `/users` | UsersComponent | Gestión de usuarios |
| `/reports` | ReportsComponent | Reportes y análisis |
| `/chatbot` | ChatbotComponent | Asistente virtual |

**Nota:** Todas las rutas excepto `/login` están protegidas por `AuthGuard`

## 🎨 Sistema de Estilos

### CSS Variables Globales
```scss
// Colores
--bg: #0f1720
--card: rgba(255, 255, 255, 0.02)
--accent: #05d0e6
--success: #19d38f
--error: #ff4757
--warning: #ffa502

// Espaciado
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px

// Radio de borde
--card-radius: 12px
```

### Temas
El proyecto incluye un tema oscuro profesional consistente en todos los componentes.

## 🧪 Servicios Principales

### AuthService
```typescript
// Gestiona autenticación y sesión del usuario
login(credenciales: Credenciales): Observable<UsuarioAutenticado>
logout(): void
isAutenticado(): boolean
getUsuarioActual(): UsuarioAutenticado | null
```

### IncidentsService
```typescript
// Gestiona CRUD de incidencias
obtenerIncidencias(): Observable<Incidencia[]>
cambiarEstado(id: string, estado: string): void
cambiarPrioridad(id: string, prioridad: string): void
asignarIncidencia(id: string, usuarioId: string): void
agregarComentario(id: string, comentario: Comentario): void
obtenerEstadísticas(): { total, pendientes, resuelta }
```

### UsersService
```typescript
// Gestiona usuarios
obtenerUsuarios(): Observable<Usuario[]>
obtenerUsuariosPorArea(area: string): Observable<Usuario[]>
buscarUsuarios(termino: string): Observable<Usuario[]>
obtenerConteosPorArea(): { [area: string]: number }
```

### NotificationService
```typescript
// Notificaciones de usuario
toast(mensaje: string, duracion?: number, tipo?: 'success' | 'error' | 'warning' | 'info'): void
```

## 📝 Convenciones de Código

### TypeScript
- ✅ Strict mode habilitado
- ✅ Tipos explícitos en parámetros y retornos
- ✅ Interfaces para modelos de datos
- ✅ JSDoc en todas las funciones

### Angular
- ✅ Componentes standalone
- ✅ Inyección de dependencias
- ✅ Observables con tipado fuerte
- ✅ Unsubscribe automático en OnDestroy

### SCSS
- ✅ Variables CSS globales
- ✅ Nesting estructurado
- ✅ BEM para clases de componentes
- ✅ Mobile-first responsive design

## 🚀 Compilación para Producción

```bash
# Construcción optimizada
ng build --configuration production

# El resultado estará en dist/
```

## 📚 Documentación Adicional

- [DOCUMENTACION_CAMBIOS.md](DOCUMENTACION_CAMBIOS.md) - Detalles completos de la migración
- [PALETA_COLORES.md](PALETA_COLORES.md) - Sistema de colores del proyecto

## 🤝 Contribuciones

Para contribuir al proyecto:

1. Crear una rama feature (`git checkout -b feature/AmazingFeature`)
2. Hacer commit de cambios (`git commit -m 'Add AmazingFeature'`)
3. Hacer push a la rama (`git push origin feature/AmazingFeature`)
4. Abrir un Pull Request

## 📞 Soporte

Para reportar problemas o sugerencias, crear una issue en el repositorio.

## 📄 Licencia

Este proyecto es propiedad de SENA (Servicio Nacional de Aprendizaje).

## ✨ Próximas Mejoras

- [ ] Integración con backend API REST
- [ ] Unit tests y E2E tests
- [ ] Autenticación OAuth2
- [ ] Caché de datos con estrategias
- [ ] Lazy loading de módulos
- [ ] Progressive Web App (PWA)
- [ ] Internacionalización (i18n)

---

**Última actualización:** 2024  
**Versión Angular:** 17.0.0  
**Estado:** ✅ Producción Ready
