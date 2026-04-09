# 🎯 SWO - Sistema Web de Gestión de Incidencias

## 📌 Resumen Ejecutivo

**Sistema Web de Gestión de Incidencias (SWO)** es una plataforma empresarial desarrollada con **Angular 17** y **Java 21** que permite gestionar incidencias de TI de forma eficiente con un asistente virtual integrado (chatbot).

### ✨ Características Principales

- 🎫 **Gestión Completa de Incidencias** - CRUD, estados, prioridades, asignaciones
- 👥 **Gestión de Usuarios** - Roles, permisos, áreas
- 📁 **Gestión de Proyectos** - Asociación de incidencias y usuarios
- 🤖 **Chatbot Inteligente** - Asistente virtual con IA para crear/escu tickets
- 📊 **Dashboards y Estadísticas** - Métricas en tiempo real
- 📈 **Reportes** - Exportación de datos
- 🔒 **Sistema de Autenticación** - Login seguro por roles
- 📝 **Historial de Cambios** - Auditoría completa

---

## 🏗️ Arquitectura Tecnológica

### Frontend
- **Angular 17** (Standalone Components)
- **TypeScript 5.2** (Strict Mode)
- **RxJS** (Programación Reactiva)
- **SCSS** (Estilos modulares)
- **HttpClient** (Comunicación HTTP)

### Backend
- **Java 21**
- **Servlets**
- **MySQL** (Base de datos)
- **REST API**
- **Maven**

### Arquitectura
- **Clean Architecture**
- **Patrón de Servicios**
- **Observables y BehaviorSubjects**
- **Validaciones Empresariales**
- **Manejo Centralizado de Errores**

---

## 📂 Estructura del Proyecto

```
SWO/
├── src/app/
│   ├── core/
│   │   ├── guards/
│   │   │   └── auth.guard.ts          ⭐ Protección de rutas
│   │   ├── models/
│   │   │   └── models.ts              📦 Interfaces y tipos
│   │   └── services/
│   │       ├── shared.service.ts      ⭐ NUEVO - Utilidades base
│   │       ├── incidents.service.ts   🔄 MEJORADO - Gestión incidencias
│   │       ├── users.service.ts       🔄 MEJORADO - Gestión usuarios
│   │       ├── projects.service.ts    🔄 MEJORADO - Gestión proyectos
│   │       ├── chatbot.service.ts     ✅ Asistente virtual
│   │       ├── auth.service.ts        ✅ Autenticación
│   │       └── notification.service.ts ✅ Notificaciones
│   ├── features/                      📱 Módulos funcionales
│   │   ├── auth/                      🔐 Autenticación
│   │   ├── dashboard/                 📊 Panel principal
│   │   ├── incidents/                 🎫 Incidencias
│   │   ├── users/                     👥 Usuarios
│   │   ├── projects/                  📁 Proyectos
│   │   ├── chatbot/                   🤖 Asistente virtual
│   │   └── reports/                   📈 Reportes
│   └── shared/
│       └── components/
│           └── sidebar/               🧭 Navegación
├── java/                              ☕ Backend Java
│   └── src/com/swo/
│       ├── controller/                🎮 Servlets
│       ├── dao/                       💾 Acceso a datos
│       ├── model/                     📦 Modelos de datos
│       └── util/                      🛠️ Utilidades
├── webapp/
│   ├── WEB-INF/                       ⚙️ Configuración web
│   └── jsp/                           📄 Vistas JSP
└── DOCUMENTACION_SERVICIOS.md         📚 Documentación técnica
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js 18+ y npm
- Java Development Kit (JDK) 21
- Maven 3.8+
- MySQL 8.0+
- Git

### 1. Clonar el Repositorio

```bash
git clone https://github.com/JuanPGE123/SWO.git
cd SWO
```

### 2. Instalar Dependencias del Frontend

```bash
npm install
```

### 3. Configurar Base de Datos

Ejecutar los scripts SQL en orden:

```sql
-- 1. Crear base de datos
SOURCE java/swo_database.sql;

-- 2. Insertar datos de prueba
SOURCE java/datos_prueba.sql;

-- 3. Configurar chatbot
SOURCE java/chatbot_data.sql;
```

### 4. Configurar Backend

Editar `webapp/WEB-INF/web.xml` con tu configuración de MySQL:

```xml
<context-param>
    <param-name>dbUrl</param-name>
    <param-value>jdbc:mysql://localhost:3306/swo_db</param-value>
</context-param>
```

### 5. Iniciar el Servidor de Desarrollo (Frontend)

```bash
npm start
```

La aplicación estará disponible en: http://localhost:4200

### 6. Compilar y Desplegar Backend

```bash
# Compilar proyecto Java con Maven
mvn clean install

# Iniciar Tomcat embebido
mvn tomcat7:run
```

Backend disponible en: http://localhost:8080/SWO

---

## 👨‍💻 Uso del Sistema

### Credenciales por Defecto

**Administrador:**
- Email: `master@swo.com`
- Password: `123456`

### Módulos Principales

#### 1️⃣ Dashboard
- Vista general del sistema
- Estadísticas en tiempo real
- Incidencias recientes
- Gráficos de métricas

#### 2️⃣ Gestión de Incidencias
- **Crear:** Reportar nuevas incidencias
- **Ver:** Lista filtrable y buscable
- **Editar:** Cambiar estado, prioridad, asignación
- **Comentar:** Añadir notas y seguimiento
- **Historial:** Ver todos los cambios

##### Estados de Incidencia:
- 🟢 **Abierta** - Recién reportada
- 🟡 **En Progreso** - Siendo atendida
- 🟠 **Pendiente** - Esperando información
- ✅ **Resuelta** - Cerrada

##### Prioridades:
- 🔴 **Crítica** - Requiere atención inmediata
- 🟠 **Alta** - Importante
- 🟡 **Media** - Normal
- 🟢 **Baja** - Puede esperar

#### 3️⃣ Chatbot Inteligente

El asistente virtual puede:
- Responder preguntas frecuentes
- Crear incidencias automáticamente
- Detectar prioridad según palabras clave
- Escalar a agente humano
- Mantener historial de conversación

**Comandos especiales:**
- "crear incidencia" o "reportar problema"
- "escalar" o "hablar con agente"
- "ayuda" o "qué puedes hacer"

#### 4️⃣ Gestión de Usuarios
- Agregar/editar/eliminar usuarios
- Asignar roles y permisos
- Filtrar por área/departamento
- Ver estadísticas de usuarios

#### 5️⃣ Gestión de Proyectos
- Crear proyectos
- Asignar usuarios
- Asociar incidencias
- Ver estadísticas

#### 6️⃣ Reportes
- Exportar incidencias
- Estadísticas por período
- Métricas de desempeño
- Informes personalizados

---

## 🏆 Servicios Empresariales Implementados

### **SharedService** ⭐ NUEVO
Servicio base con 30+ utilidades reutilizables:
- ✅ Manejo centralizado de errores HTTP
- ✅ Validaciones empresariales (email, longitud, rangos)
- ✅ Formateo de fechas, moneda, textos
- ✅ Utilidades de arrays (ordenar, agrupar, eliminar duplicados)
- ✅ Generación de IDs, hashing, descargas

**Ejemplo de uso:**
```typescript
// Validar email
const validacion = this.sharedService.validarEmail('usuario@empresa.com');
if (!validacion.valido) {
  console.error(validacion.errores);
}

// Formatear fecha
const fecha = this.sharedService.formatearFecha(new Date(), { formato: 'largo' });
// "9 de abril de 2026"
```

### **IncidentsService** 🔄 MEJORADO
Gestión completa de incidencias con:
- ✅ Validaciones de reglas de negocio
- ✅ Sistema de permisos por rol
- ✅ Historial de cambios y auditoría
- ✅ Filtrado y búsqueda avanzada
- ✅ Estadísticas con cache
- ✅ Modo offline (fallback local)

**Reglas implementadas:**
- Solo incidencias "Abiertas" pueden asignarse por primera vez
- Solo el asignado o admin puede cambiar estado
- Transiciones de estado validadas
- Validación de permisos en todas las operaciones

**Ejemplo de uso:**
```typescript
// Crear incidencia con validaciones
this.incidentsService.crearIncidencia({
  titulo: 'Error en módulo de login',
  descripcion: 'Los usuarios no pueden iniciar sesión',
  impacto: 'Alto',
  ubicacion: 'Autenticación'
}).subscribe({
  next: (resp) => console.log('✅ Creada:', resp),
  error: (err) => console.error('❌', err.mensaje)
});

// Filtrado avanzado
const criticas = this.incidentsService.filtrarIncidencias({
  prioridad: 'Crítica',
  estado: ['open', 'inprogress'],
  fechaDesde: new Date('2026-01-01')
});

// Ver historial
const historial = this.incidentsService.obtenerHistorial('INC-123');
```

### **UsersService** 🔄 MEJORADO
Gestión de usuarios con:
- ✅ Validación de correo único
- ✅ Obtener agentes disponibles para asignación
- ✅ Filtrado por área/rol
- ✅ Validaciones completas de datos
- ✅ Estadísticas por área

**Ejemplo de uso:**
```typescript
// Obtener agentes disponibles
const agentes = this.usersService.obtenerAgentesDisponibles();

// Crear usuario con validaciones
this.usersService.agregarUsuarioBackend({
  nombre: 'Juan Pérez',
  correo: 'juan@empresa.com',
  password: 'segura123',
  rol: 'Agente',
  departamento: 'Soporte Técnico'
}).subscribe(...);
```

### **ProjectsService** 🔄 MEJORADO
Gestión de proyectos con:
- ✅ Validación de nombres únicos
- ✅ Asociación de usuarios
- ✅ Filtrado por estado
- ✅ Estadísticas de proyectos

**Ejemplo de uso:**
```typescript
// Crear proyecto
this.projectsService.crearProyecto({
  nombre: 'Sistema de Gestión',
  descripcion: 'Plataforma web administrativa',
  estado: 'Activo'
}).subscribe(...);

// Asignar usuario a proyecto
this.projectsService.asignarUsuario(usuarioId, proyectoId).subscribe(...);
```

---

## 📖 Documentación Completa

Para documentación técnica detallada de los servicios, consultar:

📄 **[DOCUMENTACION_SERVICIOS.md](./DOCUMENTACION_SERVICIOS.md)**

Incluye:
- Arquitectura completa de servicios
- Interfaces y tipos detallados
- Ejemplos de uso
- Patrones de diseño implementados
- Guías de integración
- Mejores prácticas

---

## 🧪 Testing

### Ejecutar Tests Unitarios

```bash
npm test
```

### Ejecutar Tests E2E

```bash
npm run e2e
```

### Cobertura

```bash
npm run test:coverage
```

---

## 📦 Build y Despliegue

### Build de Producción (Frontend)

```bash
npm run build
```

Los archivos compilados estarán en `webapp/` listos para despliegue.

### Package Backend (War)

```bash
mvn clean package
```

El archivo `.war` estará en `target/` para desplegar en Tomcat.

---

## 🎨 Convenciones de Código

### TypeScript/Angular
- **PascalCase** para clases e interfaces
- **camelCase** para variables y métodos
- **UPPER_CASE** para constantes
- Documentación JSDoc en español
- Tipado fuerte (TypeScript strict)

### Java
- **PascalCase** para clases
- **camelCase** para métodos y variables
- **UPPER_CASE** para constantes
- JavaDoc en español

### Git
- **Commits estructurados:**
  - `feat:` Nueva funcionalidad
  - `fix:` Corrección de bug
  - `docs:` Documentación
  - `style:` Formato de código
  - `refactor:` Refactorización
  - `test:` Tests
  - `chore:` Tareas de mantenimiento

---

## 🤝 Contribución

### Flujo de Trabajo

1. Fork del proyecto
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'feat: agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

### Estándares de Código

- Todo el código debe estar documentado en español
- Seguir Clean Architecture
- Agregar tests para nuevas funcionalidades
- Validar con ESLint/TSLint antes de commit

---

## 📊 Métricas del Proyecto

### Líneas de Código
- **Frontend (TypeScript/HTML/SCSS):** ~15,000 líneas
- **Backend (Java):** ~5,000 líneas
- **Documentación:** ~3,000 líneas

### Cobertura de Tests
- **Target:** 80%+
- **Actual:** En progreso

### Performance
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Bundle Size:** ~513 KB (optimizado)

---

## 🐛 Solución de Problemas Comunes

### Error: "Backend no disponible"
- Verificar que MySQL esté corriendo
- Verificar configuración en `web.xml`
- Iniciar backend con `mvn tomcat7:run`

### Error: "Cannot find module @angular/..."
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error de compilación TypeScript
```bash
npm run build -- --verbose
```

---

## 📞 Soporte y Contacto

- **Repositorio:** https://github.com/JuanPGE123/SWO
- **Issues:** https://github.com/JuanPGE123/SWO/issues
- **Documentación:** Ver `DOCUMENTACION_SERVICIOS.md`

---

## 📜 Licencia

Este proyecto es de uso académico del SENA.

---

## 🙏 Agradecimientos

Desarrollado como proyecto académico del **SENA** para la formación en desarrollo de software empresarial.

### Tecnologías Utilizadas
- Angular Team por el framework
- Oracle por Java
- MySQL por la base de datos
- RxJS por programación reactiva
- TypeScript por el sistema de tipos

---

## 📅 Histórico de Versiones

### v2.0.0 (2026-04-09) - Arquitectura Empresarial
- ⭐ **NUEVO:** SharedService con 30+ utilidades
- 🔄 **MEJORADO:** IncidentsService con validaciones empresariales
- 🔄 **MEJORADO:** UsersService con gestión de roles
- 🔄 **MEJORADO:** ProjectsService con validaciones
- 📝 Historial de cambios y auditoría
- 📊 Estadísticas y métricas avanzadas
- 📚 Documentación completa en español
- ✅ 0 errores de compilación

### v1.0.0 (2026-03-30) - Versión Initial
- ✅ CRUD básico de incidencias
- ✅ Chatbot integrado
- ✅ Sistema de autenticación
- ✅ Dashboard básico

---

**🎯 Sistema SWO - Gestión Inteligente de Incidencias**  
**Desarrollado con ❤️ para SENA - 2026**
