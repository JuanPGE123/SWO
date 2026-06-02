# Actividad 1 - Guía 8

## 1. Conocer el funcionamiento del IDE de desarrollo

### ¿Qué es un IDE?

Un **IDE** (Integrated Development Environment o Entorno de Desarrollo Integrado) es una aplicación de software que proporciona herramientas completas para el desarrollo de software. Combina varias herramientas de desarrollo en una única interfaz gráfica de usuario.

### Componentes principales de un IDE:

#### 1. **Editor de código**
- Proporciona resaltado de sintaxis según el lenguaje de programación
- Autocompletado inteligente (IntelliSense)
- Navegación rápida entre archivos y símbolos
- Detección de errores en tiempo real

#### 2. **Depurador (Debugger)**
- Permite ejecutar el código paso a paso
- Inspeccionar variables en tiempo de ejecución
- Establecer puntos de interrupción (breakpoints)
- Analizar el flujo de ejecución del programa

#### 3. **Compilador/Intérprete integrado**
- Compila el código fuente
- Detecta errores de compilación
- Genera archivos ejecutables

#### 4. **Control de versiones**
- Integración con Git y otros sistemas de control de versiones
- Gestión de ramas (branches)
- Comparación de cambios (diffs)
- Resolución de conflictos

#### 5. **Terminal integrada**
- Ejecutar comandos del sistema
- Gestionar dependencias
- Ejecutar scripts de construcción

### IDE utilizado en este proyecto: Visual Studio Code

**Características principales:**
- **Multiplataforma**: Funciona en Windows, Linux y macOS
- **Extensiones**: Gran ecosistema de extensiones para diferentes lenguajes
- **IntelliSense**: Autocompletado inteligente y sugerencias contextuales
- **Depuración integrada**: Soporte para múltiples lenguajes
- **Control de versiones Git**: Integración nativa con Git
- **Terminal integrada**: Múltiples terminales simultáneas

### Flujo de trabajo típico en un IDE:

1. **Explorar** el proyecto mediante el explorador de archivos
2. **Editar** código con asistencia de autocompletado
3. **Compilar/Construir** el proyecto para detectar errores
4. **Depurar** cuando se encuentren problemas
5. **Ejecutar** pruebas unitarias e integración
6. **Versionar** los cambios mediante Git
7. **Desplegar** o generar artefactos de distribución

---

## 2. Conocer la metodología de desarrollo de software

### ¿Qué es una metodología de desarrollo de software?

Es un conjunto de prácticas, procedimientos, técnicas y herramientas que se utilizan para planificar, estructurar y controlar el proceso de desarrollo de sistemas de información.

### Principales metodologías:

#### 1. **Metodologías Tradicionales (Cascada)**

**Modelo en Cascada:**
- Enfoque secuencial y lineal
- Fases: Requisitos → Diseño → Implementación → Pruebas → Despliegue → Mantenimiento
- Cada fase debe completarse antes de iniciar la siguiente

**Ventajas:**
- Estructura clara y fácil de entender
- Bien documentado
- Adecuado para proyectos con requisitos bien definidos

**Desventajas:**
- Poca flexibilidad ante cambios
- El cliente ve el producto solo al final
- Difícil volver a fases anteriores

#### 2. **Metodologías Ágiles**

**Principios del Manifiesto Ágil:**
- Individuos e interacciones sobre procesos y herramientas
- Software funcionando sobre documentación extensiva
- Colaboración con el cliente sobre negociación contractual
- Respuesta ante el cambio sobre seguir un plan

##### **Scrum**
- **Roles**: Product Owner, Scrum Master, Equipo de desarrollo
- **Eventos**: Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective
- **Artefactos**: Product Backlog, Sprint Backlog, Incremento
- **Sprints**: Iteraciones de 1-4 semanas

**Ventajas:**
- Entregas frecuentes de valor
- Adaptación rápida a cambios
- Mayor comunicación con el cliente
- Detección temprana de problemas

##### **Kanban**
- Visualización del flujo de trabajo mediante tableros
- Limitación del trabajo en progreso (WIP)
- Gestión del flujo continuo
- Mejora continua (Kaizen)

##### **Extreme Programming (XP)**
- Programación en parejas (Pair Programming)
- Desarrollo guiado por pruebas (TDD)
- Integración continua
- Refactorización constante
- Entregas frecuentes

#### 3. **DevOps**
- Combinación de desarrollo (Dev) y operaciones (Ops)
- Automatización de procesos
- Integración continua (CI)
- Entrega continua (CD)
- Monitoreo y retroalimentación constante

### Fases comunes en el desarrollo de software:

1. **Análisis de requisitos**
   - Identificar necesidades del cliente
   - Definir funcionalidades del sistema
   - Documentar requisitos funcionales y no funcionales

2. **Diseño**
   - Arquitectura del sistema
   - Diseño de base de datos
   - Diseño de interfaces de usuario
   - Definición de componentes y módulos

3. **Implementación/Codificación**
   - Escribir el código fuente
   - Seguir estándares de codificación
   - Implementar las funcionalidades diseñadas

4. **Pruebas**
   - Pruebas unitarias
   - Pruebas de integración
   - Pruebas de sistema
   - Pruebas de aceptación del usuario (UAT)

5. **Despliegue**
   - Instalación en ambiente de producción
   - Migración de datos
   - Capacitación de usuarios

6. **Mantenimiento**
   - Corrección de errores
   - Actualizaciones y mejoras
   - Soporte técnico

### Buenas prácticas en desarrollo de software:

- **Control de versiones**: Usar Git para gestionar cambios
- **Código limpio**: Escribir código legible y mantenible
- **Documentación**: Comentar código y mantener documentación actualizada
- **Revisión de código**: Code reviews entre miembros del equipo
- **Pruebas automatizadas**: Implementar tests unitarios y de integración
- **Integración continua**: Automatizar construcción y despliegue
- **Refactorización**: Mejorar el código existente sin cambiar funcionalidad

### Metodología recomendada para este proyecto:

Para un proyecto como el sistema SWO (Sistema de gestión de incidencias), se recomienda una metodología **ágil con Scrum**:

- **Sprints de 2 semanas** para entregas incrementales
- **Reuniones diarias** para sincronización del equipo
- **Product Backlog** con historias de usuario priorizadas
- **Sprint Review** para demostrar avances al cliente
- **Sprint Retrospective** para mejora continua
- **Integración continua** para mantener calidad del código

---

## 3. Conocer los mecanismos de seguridad que requiere la aplicación

La seguridad en las aplicaciones web es fundamental para proteger los datos de los usuarios, mantener la integridad del sistema y cumplir con regulaciones de privacidad. A continuación se detallan los principales mecanismos de seguridad necesarios:

### Autenticación y Autorización

#### **Autenticación**
- **JWT (JSON Web Tokens)**: Tokens seguros para mantener sesiones sin estado
- **OAuth 2.0**: Protocolo de autorización estándar
- **Autenticación multifactor (MFA)**: Capa adicional de seguridad
- **Contraseñas seguras**: 
  - Hash con bcrypt o Argon2
  - Políticas de complejidad (longitud mínima, caracteres especiales)
  - Almacenamiento seguro (nunca en texto plano)

#### **Autorización**
- **RBAC (Role-Based Access Control)**: Control de acceso basado en roles
- **Niveles de permisos**: Admin, Usuario, Invitado
- **Validación de permisos**: En cada endpoint del backend
- **Principio de mínimo privilegio**: Usuarios solo acceden a lo necesario

### Seguridad en la Comunicación

#### **HTTPS/TLS**
- Cifrado de datos en tránsito
- Certificados SSL/TLS válidos
- Forzar redirección de HTTP a HTTPS

#### **CORS (Cross-Origin Resource Sharing)**
- Configurar orígenes permitidos
- Restringir métodos HTTP permitidos
- Validar headers de peticiones

### Protección contra ataques comunes

#### **1. SQL Injection**
**Prevención:**
- Usar consultas parametrizadas (Prepared Statements)
- Usar ORM (JPA/Hibernate) correctamente
- Validar y sanitizar entradas del usuario
- Principio de mínimo privilegio en base de datos

```java
// ✅ Correcto - Consulta parametrizada
String query = "SELECT * FROM usuarios WHERE email = ?";
PreparedStatement stmt = connection.prepareStatement(query);
stmt.setString(1, email);
```

#### **2. XSS (Cross-Site Scripting)**
**Prevención:**
- Escapar salidas HTML
- Usar Content Security Policy (CSP)
- Validar y sanitizar entradas
- Evitar `innerHTML`, usar `textContent`

#### **3. CSRF (Cross-Site Request Forgery)**
**Prevención:**
- Tokens CSRF en formularios
- Validar headers `Origin` y `Referer`
- Usar SameSite cookies
- Requerir confirmación para acciones críticas

#### **4. Inyección de código**
**Prevención:**
- Validar todo input del usuario
- Listas blancas en lugar de listas negras
- No ejecutar código dinámico sin validación

#### **5. DDoS (Distributed Denial of Service)**
**Prevención:**
- Rate limiting (límite de peticiones por IP)
- Throttling de API
- Firewall de aplicaciones web (WAF)
- Balanceadores de carga

### Seguridad en el Backend (Spring Boot)

#### **Configuración Spring Security**
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    - Configurar autenticación
    - Proteger endpoints
    - Configurar CORS
    - Habilitar HTTPS
}
```

#### **Validación de datos**
- Usar anotaciones de validación (`@Valid`, `@NotNull`, `@Email`)
- Validación en múltiples capas
- Mensajes de error genéricos (no revelar información del sistema)

#### **Gestión de sesiones**
- Timeout de sesión apropiado
- Invalidar sesiones al cerrar sesión
- Regenerar IDs de sesión después del login

### Seguridad en el Frontend (Angular)

#### **Sanitización**
- Angular sanitiza automáticamente valores en templates
- Usar `DomSanitizer` cuando sea necesario
- Evitar `bypassSecurityTrust*` sin validación

#### **Almacenamiento seguro**
- No almacenar datos sensibles en localStorage/sessionStorage
- Usar httpOnly cookies para tokens
- Limpiar datos sensibles de la memoria

#### **Headers de seguridad**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security` (HSTS)
- `Content-Security-Policy`

### Seguridad en la Base de Datos

#### **Buenas prácticas MySQL**
- Usuarios con permisos específicos (no usar root)
- Conexiones cifradas
- Backups regulares y cifrados
- Auditoría de accesos
- Actualizar versiones regularmente

#### **Protección de datos sensibles**
- Cifrar datos sensibles en reposo
- Enmascarar datos en logs
- No exponer información sensible en mensajes de error

### Logging y Monitoreo

#### **Auditoría**
- Registrar intentos de login (exitosos y fallidos)
- Registrar cambios en datos críticos
- Registrar accesos a recursos sensibles
- Timestamps y usuarios en todas las operaciones

#### **Monitoreo**
- Alertas de actividad sospechosa
- Detección de intentos de ataque
- Análisis de logs regularmente
- Métricas de seguridad

### Gestión de dependencias

#### **Actualizaciones de seguridad**
- Mantener dependencias actualizadas
- Usar herramientas de análisis (npm audit, OWASP Dependency Check)
- Revisar vulnerabilidades conocidas (CVEs)
- Aplicar parches de seguridad

### Cumplimiento y Regulaciones

#### **Protección de datos personales**
- GDPR (Europa)
- Ley de Habeas Data (Colombia)
- Consentimiento explícito del usuario
- Derecho al olvido
- Portabilidad de datos

---

## 4. Identificar las capas en donde se ubican los componentes

Una aplicación web moderna utiliza una **arquitectura en capas** que separa responsabilidades y facilita el mantenimiento, escalabilidad y testing. A continuación se describen las capas del proyecto SWO:

### Arquitectura General del Proyecto SWO

```
┌─────────────────────────────────────┐
│     Capa de Presentación            │
│    (Frontend - Angular)             │
└─────────────────────────────────────┘
              ↕ HTTP/REST
┌─────────────────────────────────────┐
│     Capa de Aplicación              │
│    (API REST - Spring Boot)         │
└─────────────────────────────────────┘
              ↕ JDBC/JPA
┌─────────────────────────────────────┐
│     Capa de Datos                   │
│    (Base de Datos - MySQL)          │
└─────────────────────────────────────┘
```

---

### 1. Capa de Presentación (Frontend)

**Tecnología**: Angular 18+ con TypeScript

**Ubicación**: `/src/app/`

#### **Estructura de componentes:**

##### **a) Core (Núcleo)**
**Ubicación**: `/src/app/core/`

- **Constants**: Constantes globales de la aplicación
- **Enums**: Enumeraciones (estados, tipos, roles)
- **Guards**: Protección de rutas (autenticación, autorización)
- **Interceptors**: Interceptores HTTP (tokens, errores, logging)
- **Models**: Interfaces y modelos de datos TypeScript
- **Services**: Servicios globales compartidos

**Responsabilidad**: Funcionalidades centrales que se usan en toda la aplicación

##### **b) Features (Características/Módulos)**
**Ubicación**: `/src/app/features/`

Módulos funcionales por dominio:

- **auth/**: Autenticación y autorización
  - Login, registro, recuperación de contraseña
  
- **dashboard/**: Panel principal
  - Estadísticas, resumen, gráficos
  
- **incidents/**: Gestión de incidencias
  - Crear, listar, editar, eliminar incidencias
  - Asignar técnicos
  
- **projects/**: Gestión de proyectos
  - CRUD de proyectos
  
- **users/**: Gestión de usuarios
  - CRUD de usuarios, roles, permisos
  
- **reports/**: Reportes y análisis
  - Generación de informes
  
- **chatbot/**: Asistente virtual
  - Interfaz de chat

**Estructura de cada feature:**
```
feature/
  ├── components/       # Componentes específicos
  ├── services/        # Servicios del dominio
  ├── models/          # Modelos del dominio
  └── feature.routes.ts # Rutas del módulo
```

##### **c) Shared (Compartido)**
**Ubicación**: `/src/app/shared/`

- **components/**: Componentes reutilizables
  - Botones, modales, tablas, formularios
  
- **validators/**: Validadores personalizados
  - Validación de formularios

**Responsabilidad**: Componentes y utilidades reutilizables en múltiples features

##### **d) Assets**
**Ubicación**: `/src/assets/`

- Imágenes, íconos, fuentes
- Archivos estáticos
- Estilos globales

---

### 2. Capa de Aplicación (Backend)

**Tecnología**: Spring Boot (Java) + Maven

**Ubicación**: `/backend/src/main/java/com/swo/`

#### **Patrón de arquitectura**: MVC + Capas

##### **a) Capa de Controladores (Controllers)**
**Ubicación**: `/backend/src/main/java/com/swo/controller/`

**Responsabilidad**:
- Recibir peticiones HTTP (REST API)
- Validar datos de entrada
- Llamar a la capa de servicio
- Devolver respuestas HTTP

**Ejemplo de endpoints**:
```java
@RestController
@RequestMapping("/api/incidents")
public class IncidentController {
    @GetMapping
    @PostMapping
    @PutMapping("/{id}")
    @DeleteMapping("/{id}")
}
```

##### **b) Capa de Servicios (Services)**
**Ubicación**: `/backend/src/main/java/com/swo/service/`

**Responsabilidad**:
- Lógica de negocio
- Validaciones de negocio
- Transacciones
- Orquestación entre repositorios

**Características**:
- Anotación `@Service`
- Métodos transaccionales (`@Transactional`)
- Independiente de la capa de presentación

##### **c) Capa de Acceso a Datos (Repository/DAO)**
**Ubicación**: `/backend/src/main/java/com/swo/repository/`

**Responsabilidad**:
- Interacción con la base de datos
- Operaciones CRUD
- Consultas personalizadas (JPQL, native queries)

**Tecnología**: Spring Data JPA

```java
@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findByStatus(String status);
}
```

##### **d) Capa de Entidades (Models/Entities)**
**Ubicación**: `/backend/src/main/java/com/swo/model/`

**Responsabilidad**:
- Representar tablas de la base de datos
- Definir relaciones entre entidades
- Mapeo objeto-relacional (ORM)

**Anotaciones JPA**:
```java
@Entity
@Table(name = "incidents")
public class Incident {
    @Id
    @GeneratedValue
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
```

##### **e) DTOs (Data Transfer Objects)**
**Ubicación**: `/backend/src/main/java/com/swo/dto/`

**Responsabilidad**:
- Transferir datos entre capas
- Evitar exponer entidades directamente
- Validaciones de entrada

##### **f) Configuración**
**Ubicación**: `/backend/src/main/java/com/swo/config/`

- **SecurityConfig**: Configuración de Spring Security
- **CorsConfig**: Configuración CORS
- **WebConfig**: Configuración web general

##### **g) Utilidades**
**Ubicación**: `/backend/src/main/java/com/swo/util/`

- Clases helper
- Constantes
- Utilidades de conversión

##### **h) Excepciones personalizadas**
**Ubicación**: `/backend/src/main/java/com/swo/exception/`

- Manejo global de excepciones
- Respuestas de error estandarizadas

---

### 3. Capa de Datos (Base de Datos)

**Tecnología**: MySQL

**Ubicación física**: Servidor de base de datos

#### **Estructura de la base de datos:**

##### **Tablas principales:**

1. **usuarios** (users)
   - Información de usuarios del sistema
   - Roles y permisos

2. **incidencias** (incidents)
   - Registro de incidencias reportadas
   - Estado, prioridad, descripción

3. **proyectos** (projects)
   - Proyectos de la organización

4. **asignaciones** (assignments)
   - Asignación de técnicos a incidencias

5. **historial_incidencias** (incident_history)
   - Seguimiento de cambios en incidencias

6. **chatbot_conversaciones** (chatbot_conversations)
   - Historial de conversaciones del chatbot

##### **Relaciones:**
- Usuarios ←→ Incidencias (uno a muchos)
- Proyectos ←→ Incidencias (uno a muchos)
- Usuarios ←→ Asignaciones ←→ Incidencias (muchos a muchos)

##### **Índices:**
- Claves primarias (PRIMARY KEY)
- Claves foráneas (FOREIGN KEY)
- Índices en columnas de búsqueda frecuente

##### **Vistas:**
- Consultas complejas precompiladas
- Reportes y estadísticas

##### **Procedimientos almacenados:**
- Lógica compleja en la base de datos
- Operaciones batch

---

### 4. Capa de Integración

#### **APIs Externas**
- Servicios de terceros
- APIs de notificaciones (email, SMS)
- Servicios de IA (para chatbot)

#### **Archivos de configuración**
- **Frontend**: `/src/environments/`
  - `environment.ts` (desarrollo)
  - `environment.prod.ts` (producción)

- **Backend**: `/backend/src/main/resources/`
  - `application.yml` (configuración general)
  - `application-dev.yml` (desarrollo)
  - `application-prod.yml` (producción)

---

### Flujo de datos entre capas

#### **Ejemplo: Crear una incidencia**

1. **Usuario** completa formulario en Angular (Presentación)
2. **Component** valida y llama al **Service**
3. **Service Angular** hace petición HTTP POST a `/api/incidents`
4. **HTTP Interceptor** añade token de autenticación
5. **Controller Spring** recibe la petición
6. **Controller** valida DTO y llama al **Service**
7. **Service** aplica lógica de negocio
8. **Service** llama al **Repository**
9. **Repository** usa JPA para insertar en BD
10. **MySQL** ejecuta INSERT y devuelve resultado
11. **Repository** devuelve entidad al **Service**
12. **Service** convierte entidad a DTO
13. **Controller** devuelve respuesta HTTP 201
14. **Service Angular** recibe respuesta
15. **Component** muestra mensaje de éxito al usuario

---

### Ventajas de la arquitectura en capas

✅ **Separación de responsabilidades**: Cada capa tiene un propósito claro

✅ **Mantenibilidad**: Cambios en una capa no afectan otras

✅ **Testabilidad**: Cada capa se puede probar independientemente

✅ **Reutilización**: Componentes y servicios se pueden reutilizar

✅ **Escalabilidad**: Capas se pueden escalar independientemente

✅ **Trabajo en equipo**: Equipos diferentes pueden trabajar en capas diferentes

✅ **Seguridad**: Validaciones en múltiples capas

---

## 5. Codificar cada módulo en el lenguaje seleccionado

En el proyecto SWO se codifica cada módulo en el lenguaje adecuado según su capa y responsabilidad.

### Frontend: Angular + TypeScript

- Todos los módulos de la capa de presentación se codifican en **TypeScript**.
- Los componentes, servicios y modelos Angular se ubican en `/src/app/`.
- Cada feature se implementa como un módulo Angular con:
  - componentes (`.ts`, `.html`, `.scss`)
  - servicios (`.ts`)
  - modelos e interfaces (`.ts`)
  - rutas del módulo (`feature.routes.ts`)
- Excepción: los activos estáticos (`/src/assets/`) pueden incluir imágenes, JSON, CSS y otros recursos que no son TypeScript.

### Backend: Java + Spring Boot

- La capa de aplicación se codifica en **Java** usando **Spring Boot**.
- Los controladores, servicios, repositorios y entidades se encuentran en `/backend/src/main/java/com/swo/`.
- Cada módulo de negocio se organiza en paquetes según su responsabilidad:
  - `controller` para endpoints REST
  - `service` para la lógica de negocio
  - `repository` para acceso a datos
  - `model` para entidades JPA
  - `dto` para transferir datos entre capas
  - `config` para configuración de seguridad, CORS y otras soluciones transversales
- Las pruebas unitarias y de integración se escriben en Java y se colocan en `/backend/src/test/java/`.

### Base de Datos: SQL / MySQL

- La capa de datos se define con scripts SQL y diseño relacional.
- Tablas, vistas y procedimientos se codifican en **SQL**.
- Los scripts pueden almacenarse en carpetas como `/java/` o en el repositorio de base de datos del proyecto.
- Las entidades Java se mapean a las tablas MySQL mediante JPA.

### Integración y configuración

- Las configuraciones del frontend se escriben en **TypeScript** (`environment.ts`, `environment.prod.ts`).
- Las configuraciones del backend se escriben en **YAML** (`application.yml`, `application-dev.yml`, `application-prod.yml`).
- Las integraciones con APIs externas pueden incluir llamadas HTTP en Angular, así como servicios REST en Spring Boot.

### Ejemplo práctico de módulos codificados

#### `auth`

Frontend Angular (login service):

```ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>('/api/auth/login', credentials);
  }
}
```

Backend Java (controller):

```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.authenticate(request);
        return ResponseEntity.ok(response);
    }
}
```

Base de datos SQL (usuarios):

```sql
CREATE TABLE usuarios (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(50) NOT NULL,
  activo BOOLEAN DEFAULT TRUE
);
```

#### `incidents`

Frontend Angular (modelo y servicio):

```ts
export interface Incident {
  id?: number;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
}

@Injectable({ providedIn: 'root' })
export class IncidentService {
  constructor(private http: HttpClient) {}

  getIncidents() {
    return this.http.get<Incident[]>('/api/incidents');
  }

  createIncident(incident: Incident) {
    return this.http.post<Incident>('/api/incidents', incident);
  }
}
```

Backend Java (entity y repository):

```java
@Entity
@Table(name = "incidents")
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descripcion;
    private String estado;
    private String prioridad;
}

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findByEstado(String estado);
}
```

SQL para `incidencias`:

```sql
CREATE TABLE incidencias (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  estado VARCHAR(50),
  prioridad VARCHAR(50),
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### `projects`

Frontend Angular (componente de lista):

```ts
@Component({ selector: 'app-project-list', templateUrl: './project-list.component.html' })
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe(data => this.projects = data);
  }
}
```

Backend Java (service):

```java
@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
}
```

SQL para `projects`:

```sql
CREATE TABLE proyectos (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  estado VARCHAR(50),
  fecha_inicio DATE,
  fecha_fin DATE
);
```

#### `users`

Frontend Angular (formulario de usuario):

```ts
export interface User {
  id?: number;
  nombre: string;
  email: string;
  rol: string;
}

// En el componente
this.userService.createUser(this.userForm.value).subscribe(() => {
  console.log('Usuario creado');
});
```

Backend Java (DTO y controladora):

```java
public class UserDto {
    private String nombre;
    private String email;
    private String rol;
}

@RestController
@RequestMapping("/api/users")
public class UserController {
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto created = userService.createUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
```

SQL para `usuarios`:

```sql
CREATE TABLE usuarios (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  rol VARCHAR(50) NOT NULL,
  estado VARCHAR(50) DEFAULT 'ACTIVO'
);
```

#### `reports`

Frontend Angular (servicio de reportes):

```ts
@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient) {}

  getReportSummary() {
    return this.http.get<ReportSummary>('/api/reports/summary');
  }
}
```

Backend Java (controller y service):

```java
@RestController
@RequestMapping("/api/reports")
public class ReportController {
    @GetMapping("/summary")
    public SummaryDto getSummary() {
        return reportService.getSummary();
    }
}
```

SQL para consulta de reporte:

```sql
CREATE VIEW reportes_resumen AS
SELECT estado, COUNT(*) AS total
FROM incidencias
GROUP BY estado;
```

#### `chatbot`

Frontend Angular (servicio de chat):

```ts
@Injectable({ providedIn: 'root' })
export class ChatbotService {
  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    return this.http.post<ChatResponse>('/api/chatbot/message', { message });
  }
}
```

Backend Java (controller):

```java
@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {
    @PostMapping("/message")
    public ChatResponse sendMessage(@RequestBody ChatRequest request) {
        return chatbotService.processMessage(request.getMessage());
    }
}
```

SQL para historial de chatbot:

```sql
CREATE TABLE chatbot_conversaciones (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT,
  mensaje TEXT,
  respuesta TEXT,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
```

---

## 6. Configuraciones de Servidores y Bases de Datos

### Configuración de Servidores

#### **Servidor Backend (Spring Boot)**

El backend del proyecto SWO se ejecuta en un servidor embebido de Tomcat proporcionado por Spring Boot.

**Archivo de configuración principal**: `/backend/src/main/resources/application.yml`

##### **Ambientes de Desarrollo**

**Desarrollo Local (`application-dev.yml`):**
```yaml
spring:
  application:
    name: swo-api
  datasource:
    url: jdbc:mysql://localhost:3306/swo_dev
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update  # Actualizar esquema automáticamente
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true
        show_sql: true  # Mostrar SQL en logs (solo desarrollo)
  server:
    port: 8080
    servlet:
      context-path: /api
logging:
  level:
    root: INFO
    com.swo: DEBUG  # Debug solo para nuestro paquete
```

**Testing (`application-test.yml`):**
```yaml
spring:
  application:
    name: swo-api-test
  datasource:
    url: jdbc:h2:mem:testdb  # Base de datos H2 en memoria
    driver-class-name: org.h2.Driver
    username: sa
    password:
  jpa:
    hibernate:
      ddl-auto: create-drop  # Crear y limpiar BD para cada test
    properties:
      hibernate:
        dialect: org.hibernate.dialect.H2Dialect
  server:
    port: 8081
logging:
  level:
    root: WARN
    com.swo: INFO
```

**Producción (`application-prod.yml`):**
```yaml
spring:
  application:
    name: swo-api
  datasource:
    url: jdbc:mysql://${DB_HOST:localhost}:${DB_PORT:3306}/${DB_NAME:swo_prod}
    username: ${DB_USER}
    password: ${DB_PASSWORD}
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
  jpa:
    hibernate:
      ddl-auto: validate  # Solo validar esquema, no modificar
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: false  # No formatear SQL en producción
        show_sql: false
  server:
    port: 8080
    servlet:
      context-path: /api
    compression:
      enabled: true
      min-response-size: 1024
logging:
  level:
    root: WARN
    com.swo: INFO
  file:
    name: logs/swo-api.log
    max-size: 10MB
    max-history: 30
```

**Configuración de Puerto y Contexto:**
- Desarrollo: `http://localhost:8080/api`
- Testing: `http://localhost:8081/api`
- Producción: `http://[servidor]:8080/api`

#### **Servidor Frontend (Angular - Node.js Dev Server)**

**Archivo de configuración**: `angular.json`

**Ambientes:**

**Desarrollo:**
```bash
ng serve
# URL: http://localhost:4200
# Hot reload: Sí
# Optimización: No
# Source Maps: Sí
```

**Producción:**
```bash
ng build --configuration production
# Salida: /dist/swo-servicedesk/
# Optimización: Sí (tree-shaking, minification, uglification)
# Source Maps: No
# Configuración Base: /SWO/
```

#### **Servidor Web (Nginx/Apache - Producción)**

**Configuración Nginx para Angular + Spring Boot:**

```nginx
# /etc/nginx/sites-available/swo.conf
upstream backend_api {
    server backend:8080;
}

server {
    listen 80;
    server_name swo.example.com;
    
    # Frontend Angular
    location / {
        root /var/www/swo;
        try_files $uri $uri/ /index.html;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # API Backend
    location /api/ {
        proxy_pass http://backend_api/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeout para operaciones largas
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
    
    # Redirección HTTPS (producción)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name swo.example.com;
    
    ssl_certificate /etc/ssl/certs/swo.crt;
    ssl_certificate_key /etc/ssl/private/swo.key;
    
    # ... resto de configuración igual al anterior
}
```

---

### Configuración de Bases de Datos

#### **Base de Datos MySQL**

**Conexión:**
- Host: `localhost` (desarrollo) | IP del servidor (producción)
- Puerto: `3306`
- Base de datos: `swo_dev`, `swo_test`, `swo_prod`
- Usuario: Diferente para cada ambiente

**Archivo de inicialización**: `/java/swo_database.sql`

**Script de Inicialización (Desarrollo):**

```sql
-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS swo_dev
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE swo_dev;

-- Crear tabla de usuarios
CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('ADMIN', 'TECNICO', 'USUARIO') DEFAULT 'USUARIO',
    estado ENUM('ACTIVO', 'INACTIVO') DEFAULT 'ACTIVO',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_rol (rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear tabla de incidencias
CREATE TABLE incidencias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    prioridad ENUM('BAJA', 'MEDIA', 'ALTA', 'CRITICA') DEFAULT 'MEDIA',
    estado ENUM('ABIERTA', 'EN_PROGRESO', 'RESUELTA', 'CERRADA') DEFAULT 'ABIERTA',
    usuario_id BIGINT NOT NULL,
    tecnico_asignado_id BIGINT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_cierre TIMESTAMP NULL,
    INDEX idx_estado (estado),
    INDEX idx_usuario (usuario_id),
    INDEX idx_tecnico (tecnico_asignado_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (tecnico_asignado_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear tabla de chatbot conversaciones
CREATE TABLE chatbot_conversaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    mensaje_usuario TEXT,
    respuesta_bot TEXT,
    fecha_conversacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario_fecha (usuario_id, fecha_conversacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear usuario admin por defecto
INSERT INTO usuarios (nombre, email, password, rol, estado)
VALUES ('Administrador', 'admin@swo.local', '$2a$10$xxx', 'ADMIN', 'ACTIVO');
```

**Credenciales por Ambiente:**

| Ambiente | BD | Usuario | Contraseña | Host |
|----------|-----|---------|-----------|------|
| Desarrollo | swo_dev | root | root | localhost:3306 |
| Pruebas | swo_test | test_user | test_pass | localhost:3306 |
| Producción | swo_prod | swo_prod_user | [Secure Pass] | prod-db.company.com:3306 |

**Backups (Desarrollo):**
```bash
# Backup manual
mysqldump -u root -p swo_dev > backups/swo_dev_backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurar
mysql -u root -p swo_dev < backups/swo_dev_backup_20260522.sql
```

**Mantenimiento (Producción):**
```bash
# Backup automático diario (cron)
0 2 * * * mysqldump -u swo_prod_user -p[password] swo_prod > /backups/swo_prod_$(date +\%Y\%m\%d).sql

# Verificar integridad
REPAIR TABLE usuarios;
OPTIMIZE TABLE usuarios;

# Monitoreo
SHOW PROCESSLIST;
SHOW ENGINE INNODB STATUS;
```

---

## 7. Documentar Ambientes de Desarrollo y Pruebas

### Ambiente de Desarrollo

**Propósito**: Desarrollo activo de nuevas funcionalidades

**Componentes:**

| Servicio | Versión | Puerto | Estado |
|----------|---------|--------|--------|
| Backend (Spring Boot) | 3.2.4 | 8080 | Activo |
| Frontend (Angular Dev Server) | 17.0 | 4200 | Activo |
| MySQL | 8.0 | 3306 | Activo |
| Node.js | 18+ | - | Activo |
| Java | 17 | - | Activo |

**URL de Acceso:**
- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:8080/api`
- Swagger/OpenAPI: `http://localhost:8080/api/swagger-ui.html`
- MySQL: `localhost:3306`

**Inicio del Ambiente:**

```bash
# Terminal 1: Backend
cd backend
mvn clean spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"

# Terminal 2: Frontend
cd .
npm install
ng serve

# Terminal 3: MySQL (si está local)
mysql -u root -p
```

**Archivo `.env` (opcional para frontend):**
```env
NG_APP_API_URL=http://localhost:8080/api
NG_APP_ENV=development
NG_APP_LOG_LEVEL=DEBUG
```

**Hot Reload:** Ambos servicios se recargan automáticamente en cambios de código

---

### Ambiente de Pruebas (Testing/QA)

**Propósito**: Validación de funcionalidades antes de producción

**Componentes:**

| Servicio | Configuración | Puerto |
|----------|---------------|--------|
| Backend (Spring Boot Test) | application-test.yml | 8081 |
| Frontend (Karma/Jest) | test-configuration | N/A |
| Base de Datos (H2) | En memoria | N/A |
| Cobertura (JaCoCo) | agent JVM | N/A |

**Ejecución de Pruebas:**

```bash
# Backend: Pruebas unitarias + cobertura
cd backend
mvn clean test -Dspring.profiles.active=test -Ptest-coverage

# Frontend: Pruebas unitarias
npm run test -- --watch=false --code-coverage

# E2E: Pruebas de integración completa
npm run e2e
```

**Reporte de Cobertura:**

```
Backend (JaCoCo):
  Ubicación: /backend/target/site/jacoco/index.html
  Requisito mínimo: 80% de cobertura

Frontend (Coverage):
  Ubicación: /coverage/index.html
  Requisito mínimo: 75% de cobertura
```

**Base de Datos de Pruebas:**

La base de datos H2 (en memoria) se crea y destruye automáticamente en cada ejecución de tests:

```yaml
# application-test.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
    initialization-mode: always
    continue-on-error: false
  h2:
    console:
      enabled: true
```

**Datos de Prueba Iniciales:**

```sql
-- Insertados automáticamente en tests/resources/data-test.sql
INSERT INTO usuarios VALUES (1, 'Usuario Test', 'test@swo.local', '$2a$10$xxx', 'USUARIO', 'ACTIVO', NOW(), NOW());
INSERT INTO usuarios VALUES (2, 'Tecnico Test', 'tecnico@swo.local', '$2a$10$xxx', 'TECNICO', 'ACTIVO', NOW(), NOW());
INSERT INTO incidencias VALUES (1, 'Test Ticket', 'Descripción de prueba', 'MEDIA', 'ABIERTA', 1, 2, NOW(), NULL);
```

---

### Ambiente de Producción

**Propósito**: Aplicación en vivo para usuarios finales

**Infraestructura Recomendada:**

```
┌─────────────────────────────────────────┐
│     Load Balancer (Nginx/HAProxy)       │
│         (Puerto 80/443)                 │
└────────────┬────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼────┐       ┌───▼────┐
│Backend 1│       │Backend 2│  (Auto-escaling)
│ :8080   │       │ :8080   │
└───┬────┘       └───┬────┘
    │                 │
    └────────┬────────┘
             │
        ┌────▼────────────┐
        │  MySQL Server   │  (Replicado)
        │  (Master-Slave) │
        │  :3306          │
        └─────────────────┘
```

**Configuración de Servidores:**

```yaml
# Servidor 1 & 2 - Backend
spring:
  datasource:
    url: jdbc:mysql://prod-db-master:3306/swo_prod
    username: ${DB_USER}
    password: ${DB_PASSWORD}
    hikari:
      maximum-pool-size: 20
  server:
    servlet:
      context-path: /api

# Nginx - Balanceador
upstream swo_backend {
    least_conn;  # Distribución por menos conexiones
    server backend1:8080 max_fails=3 fail_timeout=30s;
    server backend2:8080 max_fails=3 fail_timeout=30s;
}
```

**Monitoreo y Logs:**

```bash
# Logs centralizados (ELK Stack recomendado)
- Backend: /var/log/swo-api/application.log
- Frontend: Browser console + Sentry
- Database: /var/log/mysql/error.log

# Métricas (Prometheus + Grafana)
- CPU, RAM, Disco
- Requests por segundo
- Latencia promedio
- Errores por minuto
```

---

## 7.1 Matriz de Ambientes

| Aspecto | Desarrollo | Pruebas | Producción |
|---------|-----------|---------|------------|
| **Base de Datos** | MySQL Local | H2 En Memoria | MySQL Master-Slave |
| **Logs** | DEBUG | INFO | WARNING |
| **SSL** | No | No | Sí (HTTPS) |
| **Caché** | No | No | Redis |
| **Replicas** | 1 | 1 | 2+ |
| **Backup** | Manual | N/A | Automático diario |
| **Monitoreo** | Básico | Completo | Full Stack |
| **Acceso** | Local | Restringido | Solo autenticados |

---

## 8. Compilación, Testing y Automatización (DevOps & QA)

### 8.1 Scripts Maestros de Compilación

El proyecto incluye scripts unificados que compilan Frontend + Backend en un solo comando:

#### Windows: `build.bat`

```bash
.\build.bat dev         # Compilar para desarrollo
.\build.bat prod        # Compilar para producción (optimizado)
.\build.bat test        # Compilar + ejecutar tests con cobertura 80%
.\build.bat docker      # Compilar imagen Docker
```

**Características:**
- Validación automática de requisitos (Node, Java, Maven, Docker)
- Compilación paralela de Frontend y Backend
- Generación de logs por fases
- Artefactos en: `dist/` y `backend/target/`

#### Linux/macOS: `build.sh`

```bash
chmod +x build.sh
./build.sh dev          # Desarrollo
./build.sh prod         # Producción
./build.sh test         # Con cobertura
./build.sh docker       # Docker
```

---

### 8.2 Estructura de Compilación

#### Frontend (Angular)

**Scripts disponibles en `package.json`:**

```json
{
  "scripts": {
    "start": "ng serve",                           # Dev server con hot reload
    "build": "ng build",                           # Build desarrollo
    "build:prod": "ng build --configuration production",  # Build producción
    "build:prod:stats": "ng build --stats-json",   # Análisis de tamaño
    "test": "ng test",                             # Tests en watch mode
    "test:coverage": "ng test --no-watch --code-coverage",  # Con cobertura
    "test:ci": "ng test --watch=false --code-coverage --browsers=ChromeHeadless",
    "e2e": "ng e2e",                               # Pruebas E2E
    "lint": "ng lint",                             # Verificar código
    "lint:fix": "ng lint --fix"                    # Arreglar automáticamente
  }
}
```

**Optimizaciones en producción:**
- Tree-shaking (elimina código no usado)
- Minificación y uglification
- Lazy-loading de módulos
- Compresión Gzip
- Source maps desactivados

#### Backend (Spring Boot)

**Configuración en `backend/pom.xml`:**

- **Compilador:** Java 17 (javac)
- **Empaquetador:** Spring Boot Maven Plugin (crea JAR ejecutable)
- **Testing:** JUnit 5 + Mockito + AssertJ
- **Cobertura:** JaCoCo (mínimo 80%)
- **Plugins principales:**
  - `maven-compiler-plugin` - Compilación
  - `maven-surefire-plugin` - Test runner
  - `jacoco-maven-plugin` - Cobertura
  - `spring-boot-maven-plugin` - JAR ejecutable

**Perfiles de Maven:**
```bash
mvn package -Pdev              # Desarrollo
mvn package -Pprod             # Producción
mvn package -Ptest-coverage    # Tests + cobertura
```

---

### 8.3 Suite de Pruebas Unitarias y de Integración

#### Backend: JUnit 5 + Mockito

**Plantilla disponible:** `backend/src/test/java/com/swo/controller/TEMPLATE_ControllerTest.java`

Características:
- Tests de Controllers con MockMvc
- Mocking de servicios
- Validación de responses HTTP
- Manejo de excepciones
- Assertions con AssertJ

**Ejemplo básico:**
```java
@ExtendWith(MockitoExtension.class)
class IncidentControllerTest {
    
    @Mock
    private IncidentService incidentService;
    
    @InjectMocks
    private IncidentController controller;
    
    @Test
    void testGetIncidents() {
        // GIVEN
        List<Incident> incidents = Arrays.asList(testIncident);
        when(incidentService.getAll()).thenReturn(incidents);
        
        // WHEN
        mockMvc.perform(get("/api/incidents"))
        
        // THEN
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id").value(1));
        
        verify(incidentService).getAll();
    }
}
```

**Ejecución:**
```bash
cd backend
mvn clean test                     # Todos los tests
mvn test -Dtest=IncidentControllerTest  # Test específico
mvn clean test -Ptest-coverage     # Con cobertura JaCoCo
```

**Reporte de Cobertura:**
```bash
open backend/target/site/jacoco/index.html  # macOS
xdg-open backend/target/site/jacoco/index.html  # Linux
```

---

#### Frontend: Jasmine + Karma

**Plantilla disponible:** `src/app/TEMPLATE_Component.spec.ts`

Características:
- Tests de Componentes Angular
- Inyección de dependencias (DI)
- Mocking de servicios HTTP
- Validación de templates
- Tests de eventos y click

**Ejemplo básico:**
```typescript
describe('IncidentListComponent', () => {
    
    let component: IncidentListComponent;
    let fixture: ComponentFixture<IncidentListComponent>;
    
    @Mock
    private incidentService: IncidentService;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IncidentListComponent],
            providers: [{ provide: IncidentService, useValue: incidentService }]
        }).compileComponents();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('should load incidents on init', () => {
        incidentService.getIncidents.and.returnValue(of(mockIncidents));
        component.ngOnInit();
        expect(component.incidents).toEqual(mockIncidents);
    });
});
```

**Ejecución:**
```bash
npm test                           # En watch mode
npm run test:coverage              # Con reporte
npm run test:ci                    # Para CI/CD
```

**Reporte de Cobertura:**
```bash
open coverage/index.html  # Después de npm run test:coverage
```

---

### 8.4 Configuración de Cobertura de Código

#### Backend: JaCoCo

**Configuración en `pom.xml`:**
```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <configuration>
        <rules>
            <rule>
                <counter>LINE</counter>
                <value>COVEREDRATIO</value>
                <minimum>0.80</minimum>  <!-- 80% mínimo -->
            </rule>
        </rules>
    </configuration>
</plugin>
```

**Requisitos:** 80% de cobertura mínima
- Si no se cumple, `mvn test` fallaEXCLUYE

#### Frontend: Karma Coverage

**Configuración en `karma.conf.js`:**
```javascript
coverageReporter: {
    check: {
        global: {
            statements: 75,
            branches: 70,
            lines: 75,
            functions: 75
        }
    }
}
```

**Requisitos:** 75% de cobertura mínima

---

### 8.5 Pruebas End-to-End (E2E) con Cypress

**Archivo de configuración:** `cypress.config.ts`

**Test disponible:** `cypress/e2e/auth-and-navigation.cy.ts`

#### Ejemplo: Login + Navegación

```typescript
describe('Login y Navegación', () => {
    
    it('should login successfully', () => {
        // GIVEN
        cy.visit('/login');
        
        // WHEN: Llenar formulario
        cy.get('input[name="email"]').type('user@swo.local');
        cy.get('input[name="password"]').type('Test123456!');
        cy.get('button[type="submit"]').click();
        
        // THEN: Verificar redirección
        cy.url().should('include', '/dashboard');
        cy.get('.welcome-message').should('be.visible');
    });
    
    it('should navigate to incidents module', () => {
        // GIVEN: Usuario logueado
        cy.login('user@swo.local', 'Test123456!');
        
        // WHEN
        cy.get('[data-test="nav-incidents"]').click();
        
        // THEN
        cy.url().should('include', '/incidents');
    });
});
```

**Ejecución:**
```bash
npm run e2e                           # Interfaz gráfica
npm run e2e:headless                  # Sin navegador (CI/CD)
npx cypress run --spec cypress/e2e/auth-and-navigation.cy.ts  # Test específico
```

**Comandos personalizados:**
```typescript
cy.login(email, password)             // Login rápido
cy.navigateTo('/route')               // Navegar
cy.createIncident(data)               // Crear vía API
cy.dataTest('button-id')              // Selector data-test
```

---

### 8.6 Docker & Containerización

#### Dockerfile Multi-Etapa

**Características:**
- Etapa 1: Compilar Frontend (Node 18)
- Etapa 2: Compilar Backend (Maven 3.9 + Java 17)
- Etapa 3: Runtime (JRE 17 + Nginx)
- Tamaño final optimizado (~500MB)

**Construcción:**
```bash
docker build -t swo:latest -f Dockerfile .
docker build -t swo:1.0.0 .
```

**Ejecución:**
```bash
docker run -p 80:80 -p 8080:8080 \
  -e DB_HOST=db \
  -e DB_USER=swo_prod \
  -e DB_PASSWORD=changeme \
  swo:latest
```

**Acceso:**
- Frontend: `http://localhost:80`
- Backend: `http://localhost:8080/api`
- Swagger: `http://localhost:8080/api/swagger-ui.html`

---

#### Docker Compose Orquestación

**Archivo:** `docker-compose.yml`

**Servicios:**
- `db` - MySQL 8.0
- `backend` - Spring Boot (puerto 8080)
- `frontend` - Nginx + Angular (puerto 80)
- `phpmyadmin` - Admin BD (puerto 8888, solo dev)

**Inicio:**
```bash
# Desarrollo
docker-compose -f docker-compose.yml up -d

# Con perfil de debug (incluye PHPMyAdmin)
docker-compose --profile dev up -d

# Ver logs
docker-compose logs -f backend

# Estado
docker-compose ps

# Detener
docker-compose down
```

**Variables de entorno (`.env`):**
```env
DB_ROOT_PASSWORD=rootpassword123
DB_USER=swo_prod
DB_PASSWORD=swo_prod_password456
```

---

### 8.7 Ambientes

#### Desarrollo

- Frontend: `http://localhost:4200` (ng serve con hot reload)
- Backend: `http://localhost:8080/api` (Spring Boot)
- BD: `jdbc:mysql://localhost:3306/swo_dev`
- Logs: DEBUG level
- Optimizaciones: NO

#### Testing/QA

- BD: H2 en memoria (temporal)
- Cobertura: 80% obligatoria
- Logs: INFO level
- Tests: Automatizados en cada build

#### Producción

- Frontend: CDN/Nginx estático
- Backend: Cluster con balanceador de carga
- BD: MySQL Master-Slave replicada
- Logs: WARNING level
- Optimizaciones: Todas activadas
- HTTPS: Obligatorio

---

### 8.8 Matriz de Comandos DevOps

| Tarea | Windows | Linux/macOS |
|-------|---------|-------------|
| Build Completo (Dev) | `.\build.bat dev` | `./build.sh dev` |
| Build Producción | `.\build.bat prod` | `./build.sh prod` |
| Tests + Cobertura | `.\build.bat test` | `./build.sh test` |
| Docker | `.\build.bat docker` | `./build.sh docker` |
| Frontend solo | `npm run build:prod` | `npm run build:prod` |
| Backend solo | `cd backend && mvn package` | `cd backend && mvn package` |
| Tests Backend | `mvn test -Ptest-coverage` | `mvn test -Ptest-coverage` |
| Tests Frontend | `npm run test:coverage` | `npm run test:coverage` |
| E2E | `npm run e2e` | `npm run e2e` |
| Docker Compose | `docker-compose up -d` | `docker-compose up -d` |

---

### 8.9 Archivos Generados

**Nuevos archivos en el proyecto:**

1. **Compilación:**
   - `build.bat` - Script Windows
   - `build.sh` - Script Linux/macOS
   - `Dockerfile` - Imagen multi-etapa
   - `docker-compose.yml` - Orquestación

2. **Testing:**
   - `backend/src/test/java/com/swo/controller/TEMPLATE_ControllerTest.java`
   - `backend/src/test/java/com/swo/service/TEMPLATE_ServiceTest.java`
   - `src/app/TEMPLATE_Component.spec.ts`

3. **E2E:**
   - `cypress.config.ts`
   - `cypress/support/e2e.ts`
   - `cypress/support/commands.ts`
   - `cypress/e2e/auth-and-navigation.cy.ts`

4. **Configuración:**
   - `.env.example` - Variables de entorno
   - `DEVOPS_QA_MASTER_GUIDE.md` - Documentación completa

---

### 8.10 Verificación Final

Antes de desplegar:

```bash
# 1. Compilar
./build.sh prod

# 2. Verificar tests
cd backend && mvn test -Ptest-coverage  # Backend: 80%+
npm run test:coverage                   # Frontend: 75%+

# 3. Verificar Docker
docker build -t swo:latest .
docker-compose up -d
curl http://localhost:80        # Frontend
curl http://localhost:8080/api  # Backend

# 4. E2E
npm run e2e:headless

# 5. Logs
cat logs/*.log | grep ERROR     # Verificar errores
```

---

## 6. Manejar un repositorio de control de versiones (GIT, SVN, Otros)

El control de versiones es esencial para mantener el historial del proyecto, gestionar cambios y permitir el trabajo colaborativo.

### Git

- **Distribuido**: cada desarrollador tiene una copia completa del repositorio
- **Commits**: cambios confirmados con mensajes descriptivos
- **Branches**: trabajar en funcionalidades separadas sin afectar la rama principal
- **Merge / Rebase**: combinar cambios entre ramas
- **Remote**: subir y descargar cambios desde repositorios remotos como GitHub, GitLab o Bitbucket

#### Flujo básico con Git:

```bash
git clone https://repo.git
cd proyecto
# Crear nueva rama
git checkout -b feature/nueva-funcionalidad
# Agregar cambios
git add .
git commit -m "Agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

#### Buenas prácticas Git:
- Mensajes de commit claros y concisos
- Ramas por funcionalidad o corrección
- Pull requests / merge requests para revisión de código
- Rebase interactivo para limpiar historial antes de fusionar
- No commitear archivos generados ni secretos

### SVN

- **Centralizado**: un servidor central controla el repositorio
- **Checkout/Update**: los desarrolladores obtienen una copia de trabajo del repositorio
- **Commit**: los cambios se envían al servidor central
- Más adecuado para proyectos con control estricto de acceso y permisos

#### Flujo básico con SVN:

```bash
svn checkout https://repo.svn/proyecto
cd proyecto
# Actualizar copia local
svn update
# Agregar archivo
svn add archivo.txt
# Enviar cambios
svn commit -m "Agregar archivo de ejemplo"
```

### Otros sistemas de control de versiones

- **Mercurial (hg)**: similar a Git, distribuido y fácil de usar
- **Perforce**: usado en entornos con grandes archivos binarios y juegos
- **TFS/Azure DevOps**: control centralizado con integración a pipelines

### Elementos clave del manejo de repositorios

- **Branching model**: Git Flow, GitHub Flow, trunk-based development
- **Integración continua**: ejecutar compilaciones y pruebas en cada commit
- **Code review**: revisar cambios antes de fusionar a la rama principal
- **Etiquetas (tags)**: marcar versiones liberadas o hitos importantes
- **Conflictos**: resolver conflictos de merge con cuidado y comunicación
- **.gitignore / svn:ignore**: excluir archivos temporales, compilados y secretos

## 6. Manejar un repositorio de control de versiones (GIT, SVN, Otros)

El control de versiones es esencial para mantener el historial del proyecto, gestionar cambios y permitir el trabajo colaborativo.

### Git

- **Distribuido**: cada desarrollador tiene una copia completa del repositorio
- **Commits**: cambios confirmados con mensajes descriptivos
- **Branches**: trabajar en funcionalidades separadas sin afectar la rama principal
- **Merge / Rebase**: combinar cambios entre ramas
- **Remote**: subir y descargar cambios desde repositorios remotos como GitHub, GitLab o Bitbucket

#### Flujo básico con Git:

```bash
git clone https://repo.git
cd proyecto
# Crear nueva rama
git checkout -b feature/nueva-funcionalidad
# Agregar cambios
git add .
git commit -m "Agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

#### Buenas prácticas Git:
- Mensajes de commit claros y concisos
- Ramas por funcionalidad o corrección
- Pull requests / merge requests para revisión de código
- Rebase interactivo para limpiar historial antes de fusionar
- No commitear archivos generados ni secretos

### SVN

- **Centralizado**: un servidor central controla el repositorio
- **Checkout/Update**: los desarrolladores obtienen una copia de trabajo del repositorio
- **Commit**: los cambios se envían al servidor central
- Más adecuado para proyectos con control estricto de acceso y permisos

#### Flujo básico con SVN:

```bash
svn checkout https://repo.svn/proyecto
cd proyecto
# Actualizar copia local
svn update
# Agregar archivo
svn add archivo.txt
# Enviar cambios
svn commit -m "Agregar archivo de ejemplo"
```

### Otros sistemas de control de versiones

- **Mercurial (hg)**: similar a Git, distribuido y fácil de usar
- **Perforce**: usado en entornos con grandes archivos binarios y juegos
- **TFS/Azure DevOps**: control centralizado con integración a pipelines

### Elementos clave del manejo de repositorios

- **Branching model**: Git Flow, GitHub Flow, trunk-based development
- **Integración continua**: ejecutar compilaciones y pruebas en cada commit
- **Code review**: revisar cambios antes de fusionar a la rama principal
- **Etiquetas (tags)**: marcar versiones liberadas o hitos importantes
- **Conflictos**: resolver conflictos de merge con cuidado y comunicación
- **.gitignore / svn:ignore**: excluir archivos temporales, compilados y secretos

### Recomendaciones para este proyecto

- Usar **Git** como sistema de control de versiones principal
- Crear una rama `main` o `master` para producción y `develop` para integraciones
- Crear ramas de feature para cada requerimiento o corrección
- Hacer **commits pequeños y frecuentes**
- Mantener el repositorio limpio y evitar archivos generados en el control de versiones

---

### Manejo del repositorio del proyecto SWO

#### **Estructura del repositorio**

```
SWO/
├── .git/                          # Metadatos de Git
├── .gitignore                     # Archivos a ignorar
├── .github/                       # Configuración de GitHub
│   └── workflows/                 # Workflows de CI/CD
├── backend/                       # Código del backend (Java)
│   ├── src/
│   ├── pom.xml
│   └── target/                    # ⚠️ Ignorar (generado)
├── src/                           # Código del frontend (Angular)
│   ├── app/
│   └── assets/
├── java/                          # Scripts SQL
├── webapp/                        # Archivos web compilados (ignorar)
├── angular.json
├── package.json
├── pom.xml                        # POM raíz
├── tsconfig.json
└── README.md
```

#### **Archivo `.gitignore` recomendado para SWO**

```
# Archivos del sistema operativo
.DS_Store
Thumbs.db

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~
.project
.classpath
.settings/

# Node.js / npm
node_modules/
npm-debug.log
dist/
build/

# Angular
.angular/
angular-dist/

# Java / Maven
target/
*.class
*.jar
*.war
*.ear
.m2/
out/

# Configuración local
application-local.yml
environment.local.ts
.env

# Archivos compilados
*.o
*.pyc
__pycache__/

# Archivos de base de datos locales
*.db
*.sqlite

# Logs
logs/
*.log

# IDE settings específicos del usuario
.vscode/settings.json
```

#### **Flujo de trabajo con Git en SWO**

**1. Clonar el repositorio:**
```bash
git clone https://github.com/mi-org/SWO.git
cd SWO
```

**2. Crear rama de feature para nueva funcionalidad (ej: módulo de chatbot):**
```bash
git checkout -b feature/chatbot-module
# O para una corrección de bug
git checkout -b bugfix/fix-login-issue
```

**3. Realizar cambios en el código:**
```bash
# Ejemplo: Crear componente de chatbot en Angular
# src/app/features/chatbot/chatbot.component.ts

# Ejemplo: Crear controlador en Spring Boot
# backend/src/main/java/com/swo/controller/ChatbotController.java
```

**4. Ver estado de cambios:**
```bash
git status
# Muestra archivos modificados, nuevos y eliminados
```

**5. Agregar cambios al staging:**
```bash
# Agregar archivos específicos
git add src/app/features/chatbot/
git add backend/src/main/java/com/swo/controller/ChatbotController.java

# O agregar todos los cambios
git add .
```

**6. Hacer commit con mensaje descriptivo:**
```bash
git commit -m "feat: Agregar módulo de chatbot

- Crear componentes de interfaz de chat
- Implementar servicio de chatbot en backend
- Agregar controller REST para mensajes"
```

**7. Enviar cambios al repositorio remoto:**
```bash
git push origin feature/chatbot-module
```

**8. Crear Pull Request (en GitHub/GitLab):**
```
Título: Add chatbot module feature
Descripción: 
- Implements chat interface with Angular
- Creates backend API endpoints
- Adds database tables for conversation history
```

**9. Después de revisión y aprobación, fusionar con develop:**
```bash
git checkout develop
git pull origin develop
git merge feature/chatbot-module
git push origin develop
```

**10. Eliminar rama de feature local y remota:**
```bash
git branch -d feature/chatbot-module
git push origin --delete feature/chatbot-module
```

---

#### **Ejemplo completo: Agregar módulo de Usuarios**

**Paso 1: Crear rama**
```bash
git checkout -b feature/user-management
```

**Paso 2: Frontend - Crear archivo de servicio**
```bash
# src/app/features/users/users.service.ts
touch src/app/features/users/users.service.ts
```

**Paso 3: Backend - Crear controlador**
```bash
# backend/src/main/java/com/swo/controller/UserController.java
mkdir -p backend/src/main/java/com/swo/controller
```

**Paso 4: Backend - Crear entidad**
```bash
# backend/src/main/java/com/swo/model/User.java
mkdir -p backend/src/main/java/com/swo/model
```

**Paso 5: Backend - Crear repositorio**
```bash
# backend/src/main/java/com/swo/repository/UserRepository.java
mkdir -p backend/src/main/java/com/swo/repository
```

**Paso 6: Base de datos - Crear script**
```bash
# java/crear_tabla_usuarios.sql
touch java/crear_tabla_usuarios.sql
```

**Paso 7: Ver cambios**
```bash
git status
# On branch feature/user-management
# Untracked files:
#   src/app/features/users/users.service.ts
#   backend/src/main/java/com/swo/controller/UserController.java
#   ...
```

**Paso 8: Agregar todos los cambios**
```bash
git add .
```

**Paso 9: Hacer commit**
```bash
git commit -m "feat: Implementar módulo de gestión de usuarios

Cambios frontend:
- Crear servicio de usuarios con operaciones CRUD
- Agregar componentes de lista y formulario

Cambios backend:
- Crear entidad User con JPA
- Crear controlador REST para usuarios
- Crear repositorio con Spring Data JPA
- Crear DTO para transferencia de datos

Cambios base de datos:
- Crear tabla usuarios con campos requeridos"
```

**Paso 10: Push a repositorio remoto**
```bash
git push origin feature/user-management
```

**Paso 11: Ver historial de commits**
```bash
git log --oneline -n 10
# Muestra los últimos 10 commits de forma concisa
```

**Paso 12: Ver diferencias (antes de fusionar)**
```bash
git diff develop feature/user-management
# Muestra qué cambios hay entre ramas
```

---

#### **Convenciones de commits para SWO**

```
<tipo>(<ámbito>): <asunto>

<cuerpo>

<pie de página>
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (sin lógica)
- `refactor`: Refactorización de código
- `test`: Agregar o actualizar tests
- `chore`: Cambios en configuración o dependencias

**Ejemplos:**
```bash
git commit -m "feat(auth): Agregar autenticación JWT"
git commit -m "fix(incidents): Corregir filtro por estado"
git commit -m "docs: Actualizar README con instrucciones"
git commit -m "refactor(services): Mejorar estructura de servicios"
git commit -m "test(users): Agregar tests para UserService"
```

---

#### **Ramas recomendadas para SWO**

```
main/master ←─ (producción)
    ↑
    └── develop ←─ (integración)
         ↑
         ├── feature/auth
         ├── feature/incidents
         ├── feature/users
         ├── feature/reports
         ├── feature/chatbot
         ├── bugfix/login-issue
         └── hotfix/security-patch
```

**Rama `main`**: Código de producción estable
- Solo fusiones desde `develop` después de testing completo
- Marcar versiones con tags (v1.0.0, v1.1.0)

**Rama `develop`**: Integración de funcionalidades
- Rama base para nuevas features
- Debe estar siempre en estado compilable

**Ramas de `feature`**: Nuevas funcionalidades
- Crear desde `develop`
- Nombre descriptivo (feature/nombre-modulo)
- Fusionar con Pull Request después de revisión

**Ramas de `bugfix`**: Correcciones
- Crear desde `develop`
- Nombre descriptivo (bugfix/descripcion-bug)

**Ramas de `hotfix`**: Correcciones urgentes en producción
- Crear desde `main`
- Fusionar en `main` y `develop`

---

#### **Comandos útiles para SWO**

```bash
# Ver estado actual
git status

# Ver historial de commits
git log --oneline
git log --graph --oneline --all

# Ver cambios sin staged
git diff

# Ver cambios staged
git diff --staged

# Deshacer cambios en archivo
git checkout -- archivo.ts
git restore archivo.ts

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer último commit (descartar cambios)
git reset --hard HEAD~1

# Crear rama local desde remota
git checkout -b local-branch origin/remote-branch

# Traer cambios del remoto sin fusionar
git fetch origin

# Traer cambios y fusionar
git pull origin develop

# Listar ramas
git branch -a

# Eliminar rama local
git branch -d nombre-rama

# Fusionar rama
git merge feature/nombre

# Rebase interactivo para limpiar commits
git rebase -i HEAD~3

# Stash temporal de cambios
git stash
git stash pop

# Tags para versiones
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

## Conclusión

El conocimiento del IDE, la metodología de desarrollo, los mecanismos de seguridad y la arquitectura en capas son fundamentales para el éxito de un proyecto de software. 

- Un **IDE eficiente** aumenta la productividad del desarrollador
- Una **metodología adecuada** asegura que el proyecto se complete a tiempo y con calidad
- Los **mecanismos de seguridad** protegen la aplicación y los datos de los usuarios
- Una **arquitectura en capas bien definida** facilita el mantenimiento, escalabilidad y trabajo en equipo

El dominio de estos conceptos permite desarrollar aplicaciones robustas, seguras y mantenibles que satisfacen las necesidades del negocio y brindan una excelente experiencia al usuario.
