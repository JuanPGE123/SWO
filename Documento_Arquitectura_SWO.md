# DOCUMENTO DE ARQUITECTURA Y DISEÑO DE COMPONENTES
## Sistema de Gestión de Incidencias - SWO 

**Versión:** 1.0  
**Fecha:** 21 de Mayo de 2026  
**Autor:** Tech Lead Senior - Arquitectura de Software  
**Clasificación:** Documento Técnico - Referencia del Equipo

---

## TABLA DE CONTENIDOS

1. [Introducción](#introducción)
2. [Selección de Frameworks por Capa](#1-selección-de-frameworks-por-capa)
3. [Arquitectura Orientada a Componentes](#2-arquitectura-orientada-a-componentes-modularidad)
4. [Guía de Buenas Prácticas de Codificación](#3-guía-de-buenas-prácticas-de-codificación-clean-code)
5. [Estructura de Paquetes](#4-estructura-de-paquetes-package-naming)
6. [Patrones de Diseño](#5-patrones-de-diseño-a-implementar)
7. [Estrategia de Pruebas](#6-estrategia-de-pruebas-unitarias)
8. [Configuración de Servidores](#7-configuración-de-servidores-y-base-de-datos)
9. [Ambientes de Desarrollo](#8-documentación-de-ambientes)

---

## INTRODUCCIÓN

Este documento establece los lineamientos arquitectónicos, patrones de diseño y mejores prácticas para el desarrollo del sistema **SWO**, una aplicación web moderna destinada a la gestión integral de incidencias, proyectos y recursos técnicos.

### Objetivos del Documento

- Justificar las decisiones tecnológicas adoptadas
- Establecer normativas claras de codificación y arquitectura
- Garantizar escalabilidad, mantenibilidad y calidad del código
- Facilitar la onboarding de nuevos miembros del equipo
- Definir estándares de testing y documentación

### Stack Tecnológico Seleccionado

| Capa | Tecnología | Versión |
|------|-----------|---------|
| **Frontend** | Angular | 17+ |
| **Backend** | Spring Boot | 3.1+ |
| **Base de Datos** | PostgreSQL / MySQL | 12+ / 8+ |
| **Build Tool** | Maven | 3.8+ |
| **Package Manager** | npm | 9+ |
| **Testing BE** | JUnit 5, Mockito | 5.9+, 4.11+ |
| **Testing FE** | Jest, Jasmine | 29+, 4+ |
| **Contenedorización** | Docker | 24+ |

---

## 1. SELECCIÓN DE FRAMEWORKS POR CAPA

### 1.1 Capa de Presentación (Frontend)

**Tecnología Seleccionada: Angular 17+**

#### Justificación

| Criterio | Razón |
|----------|-------|
| **Madurez y Estabilidad** | Angular es un framework maduro con 10+ años de evolución. Versión 17 incluye mejoras significativas en performance y developer experience. |
| **TypeScript Nativo** | Tipado fuerte que reduce bugs en tiempo de compilación y mejora la calidad del código. |
| **Escalabilidad** | Arquitectura modular ideal para aplicaciones empresariales grandes como SWO. |
| **Soporte Enterprise** | Comunidad grande, documentación exhaustiva y soporte de Google. |
| **Ecosistema** | RxJS para programación reactiva, Angular Material para UI, HttpClientModule integrado. |
| **Testing Integrado** | Jasmine y Karma configurados out-of-the-box, con capacidad de usar Jest. |

#### Componentes Clave

- **Angular CLI**: Herramienta de scaffolding y build
- **Angular Modules**: Organización lógica de features
- **RxJS**: Programación reactiva con Observables
- **Angular Material**: Componentes UI predefinidos y accesibles
- **HttpClientModule**: Comunicación REST con backend
- **Angular Router**: Enrutamiento de aplicación
- **Reactive Forms**: Formularios con validación avanzada

#### Ventajas Específicas para SWO

✅ Soporta lazy loading de módulos → mejor performance  
✅ Inyección de dependencias nativa → código testeable  
✅ Datos reactivos con Observables → UI actualizada automáticamente  
✅ Guards y interceptores → seguridad y manipulación de requests  

---

### 1.2 Capa de Lógica de Negocio (Backend)

**Tecnología Seleccionada: Java 17+ con Spring Boot 3.1+**

#### Justificación

| Criterio | Razón |
|----------|-------|
| **Robustez** | Java es lenguaje compilado, tipado y probado en sistemas empresariales críticos. |
| **Spring Boot** | Reduce boilerplate, auto-configuración, ideal para microservicios y APIs REST. |
| **Performance** | JVM optimizado, manejo eficiente de memoria, multi-threading nativo. |
| **Ecosystem** | Spring Data JPA, Spring Security, Spring Cloud, Spring Batch. |
| **Escalabilidad Horizontal** | Fácil desplegar múltiples instancias, balanceo de carga. |
| **Seguridad** | Spring Security integrado, manejo de tokens JWT, encriptación nativa. |
| **Transacciones ACID** | Soporte completo para transacciones distribuidas y data consistency. |

#### Componentes Clave

- **Spring Boot**: Framework web y configuración automática
- **Spring Data JPA**: ORM y repositorios para acceso a datos
- **Spring Security**: Autenticación, autorización y gestión de tokens
- **Spring Validation**: Validación de datos con JSR-303
- **Spring AOP**: Aspecto-Oriented Programming para cross-cutting concerns
- **Lombok**: Reducción de boilerplate (getters, setters, builders)
- **Swagger/SpringFox**: Documentación automática de APIs

#### Ventajas Específicas para SWO

✅ Transacciones manejadas automáticamente → data integrity  
✅ Inyección de dependencias → bajo acoplamiento  
✅ Escalable horizontalmente → soporta crecimiento  
✅ Ecosistema maduro → soluciones probadas  

---

### 1.3 Capa de Persistencia (Base de Datos)

**Tecnología Seleccionada: PostgreSQL 12+ (Preferido) / MySQL 8+ (Alternativa)**

#### Justificación

| Criterio | PostgreSQL | MySQL |
|----------|-----------|-------|
| **ACID Completo** | ✅ Garantizado | ✅ Con InnoDB |
| **Tipos Avanzados** | ✅ JSON, Arrays, UUID | ❌ Limitado |
| **Performance Analítica** | ✅ Excelente | ⚠️ Bueno |
| **Comunidad** | ✅ Enterprise-grade | ✅ Muy grande |
| **Funciones Avanzadas** | ✅ Stored Procedures, Triggers | ✅ Básicas |
| **Costo** | ✅ Open Source | ✅ Open Source |
| **Escalabilidad** | ✅ Replicación nativa | ⚠️ Requiere configuración |

#### Recomendación Estratégica

**PostgreSQL** es la opción preferida para SWO debido a:

1. **Soporte JSON/JSONB** → Flexibilidad en almacenamiento de metadata
2. **Full-text Search** → Búsqueda avanzada de incidencias
3. **Funciones Avanzadas** → Triggers para auditoría automática
4. **Rendimiento** → Mejor con datasets grandes
5. **Replicación Nativa** → High Availability integrada

Si la organización requiere MySQL, es completamente viable con configuración InnoDB.

#### Configuración Recomendada

```sql
-- PostgreSQL 12+
-- Encoding UTF-8
-- Collate: C (Performance)
-- Max connections: 100-200
-- Shared buffers: 25% RAM
-- Work memory: RAM / (max_connections * 2)
```

---

## 2. ARQUITECTURA ORIENTADA A COMPONENTES (MODULARIDAD)

### 2.1 Principios de Arquitectura

La arquitectura de SWO se fundamenta en:

- **Separación de Responsabilidades**: Cada capa tiene responsabilidad única
- **Modularidad**: Módulos independientes que se comunican por interfaces
- **Bajo Acoplamiento**: Dependencias inyectadas, no hardcodeadas
- **Alta Cohesión**: Elementos relacionados agrupados lógicamente
- **DRY (Don't Repeat Yourself)**: Código reutilizable

### 2.2 Frontend: Componentes Inteligentes vs Tontos

#### Smart Components (Contenedores)

Son componentes que:
- Manejan lógica de negocio
- Se comunican con servicios
- Gestionan estado local
- Emiten eventos a servicios
- Contienen Reactive Forms

**Ubicación**: `/src/app/features/[modulo]/containers/`

**Ejemplo: IncidentListContainer**

```typescript
// ✅ SMART COMPONENT
@Component({
  selector: 'app-incident-list-container',
  template: `<app-incident-list [incidents]="incidents$ | async" 
                               (edit)="onEditIncident($event)">
             </app-incident-list>`
})
export class IncidentListContainerComponent implements OnInit {
  incidents$: Observable<Incident[]>;
  
  constructor(private incidentService: IncidentService) {}
  
  ngOnInit() {
    this.incidents$ = this.incidentService.getIncidents();
  }
  
  onEditIncident(incident: Incident) {
    this.incidentService.updateIncident(incident).subscribe();
  }
}
```

#### Dumb Components (Presentacionales)

Son componentes que:
- Solo presentan datos (UI pura)
- Reciben @Input
- Emiten @Output
- No tienen lógica compleja
- No conocen servicios

**Ubicación**: `/src/app/features/[modulo]/components/`

**Ejemplo: IncidentListComponent**

```typescript
// ✅ DUMB COMPONENT (Presentacional)
@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html'
})
export class IncidentListComponent {
  @Input() incidents: Incident[];
  @Output() edit = new EventEmitter<Incident>();
  
  onEditClick(incident: Incident) {
    this.edit.emit(incident);
  }
}
```

#### Ventajas

✅ Componentes presentacionales son reutilizables  
✅ Fáciles de testear (no requieren servicios)  
✅ Lógica centralizada en contenedores  
✅ Mejor performance con ChangeDetectionStrategy.OnPush  

---

### 2.3 Backend: Arquitectura Modular por Dominio

#### Estructura de Módulos

```
com.swo
├── module (Package de dominio)
│   ├── project
│   │   ├── controller
│   │   ├── service
│   │   ├── repository
│   │   ├── entity
│   │   ├── dto
│   │   └── exception
│   ├── incident
│   │   ├── controller
│   │   ├── service
│   │   ├── repository
│   │   ├── entity
│   │   ├── dto
│   │   └── exception
│   ├── user
│   └── chatbot
├── common
│   ├── config
│   ├── exception
│   ├── util
│   ├── constants
│   └── interceptor
└── security
    ├── jwt
    ├── config
    └── filter
```

#### Ventajas del Enfoque por Dominio

✅ Independencia de módulos → desarrollo paralelo  
✅ Fácil identificar responsabilidades  
✅ Escalable para nuevos dominios  
✅ Favoreça futuros microservicios  

#### Módulos Core (Compartido)

Ubicación: `com.swo.common`

**Responsabilidades:**
- Configuración global (CORS, Jackson, Security)
- Utilidades compartidas (DateUtils, StringUtils)
- Constantes del sistema
- Manejo global de excepciones
- Interceptores HTTP

---

### 2.4 Reglas de Comunicación Entre Capas

**Frontend → Backend:**
```
Componente Smart → Servicio Angular → HttpClient → API REST
```

**Backend - Dentro del módulo:**
```
Controller → Service → Repository → Entity → DB
```

**Backend - Entre módulos:**
```
Module A Service → Module B Service (mediante inyección)
```

**Prohibiciones:**
❌ Componente accediendo directamente a Repository  
❌ Componente accediendo a múltiples servicios del mismo dominio  
❌ Controller con lógica de negocio compleja  
❌ Entity expuesta directamente como respuesta REST  

---

## 3. GUÍA DE BUENAS PRÁCTICAS DE CODIFICACIÓN (CLEAN CODE)

### 3.1 Nomenclatura y Convenciones

#### Frontend (TypeScript)

```typescript
// ✅ CORRECTO

// Variables: camelCase
let isAuthenticated = false;
const maxRetries = 3;
const userPreferences: UserSettings = {};

// Funciones: camelCase, verbo + sustantivo
function getUserById(id: string): Observable<User> {}
function validateEmail(email: string): boolean {}
function calculateTotalPrice(items: CartItem[]): number {}

// Clases/Interfaces: PascalCase
class IncidentService {}
interface IIncidentResponse {}
enum IncidentStatus {}

// Constantes: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_TIMEOUT_MS = 5000;

// Componentes: PascalCase + Component
@Component({ selector: 'app-incident-list' })
class IncidentListComponent {}

// Servicios: PascalCase + Service
@Injectable()
class IncidentService {}

// ❌ INCORRECTO - Evitar

let UI_BROKEN = true;  // Variables no son constantes
function getUserById_v2() {} // Versionado en código
const user_data = {}; // snake_case en variables
```

#### Backend (Java)

```java
// ✅ CORRECTO

// Variables: camelCase
private String userEmail;
private int maxRetries = 3;
private List<Incident> incidents;

// Métodos: camelCase, verbo + sustantivo
public Incident getIncidentById(Long id) {}
public boolean validateIncidentData(IncidentDTO dto) {}
public void assignTechnicianToIncident(Long incidentId, Long technicianId) {}

// Clases: PascalCase
public class IncidentService {}
public class UserRepository {}
public enum IncidentStatus {}

// Constantes: UPPER_SNAKE_CASE
private static final String API_KEY = "sk-...";
private static final int MAX_RETRIES = 3;
private static final long CACHE_EXPIRATION_MS = 300000;

// Packages: lowercase, domain-based
com.swo.module.incident.controller
com.swo.module.user.service

// ❌ INCORRECTO - Evitar

private String getIncident; // Parece atributo
public void g(Long i) {} // Nombres muy cortos
public class incident {} // Clase sin PascalCase
const MAX_RETR = 3; // Abreviaciones confusas
```

---

### 3.2 Principios SOLID

#### S - Single Responsibility Principle

```java
// ❌ MAL: Responsabilidades mezcladas
@Service
public class IncidentService {
    public void createIncident(IncidentDTO dto) {
        // Validar datos
        validateIncidentData(dto);
        
        // Guardar en BD
        incidentRepository.save(convertToEntity(dto));
        
        // Enviar email
        emailService.sendIncidentCreatedNotification(dto);
        
        // Registrar en log
        logger.info("Incident created");
    }
}

// ✅ BIEN: Una responsabilidad por clase
@Service
public class IncidentService {
    private final IncidentRepository repository;
    private final IncidentNotificationService notificationService;
    
    public void createIncident(IncidentDTO dto) {
        Incident incident = repository.save(convertToEntity(dto));
        notificationService.notifyIncidentCreated(incident);
    }
}

@Service
public class IncidentNotificationService {
    public void notifyIncidentCreated(Incident incident) {
        emailService.sendIncidentCreatedNotification(incident);
        logger.info("Incident created: {}", incident.getId());
    }
}
```

#### O - Open/Closed Principle

```java
// ❌ MAL: Abierto a modificaciones
public class NotificationService {
    public void sendNotification(String type, String message) {
        if ("EMAIL".equals(type)) {
            // Lógica email
        } else if ("SMS".equals(type)) {
            // Lógica SMS
        } else if ("SLACK".equals(type)) {
            // Lógica Slack
        }
        // Cada nuevo tipo requiere modificar esta clase
    }
}

// ✅ BIEN: Abierto para extensión, cerrado para modificación
interface NotificationChannel {
    void send(String message);
}

@Component
public class EmailNotificationChannel implements NotificationChannel {
    @Override
    public void send(String message) { /* implementación */ }
}

@Component
public class SmsNotificationChannel implements NotificationChannel {
    @Override
    public void send(String message) { /* implementación */ }
}

@Service
public class NotificationService {
    private final Map<String, NotificationChannel> channels;
    
    public void sendNotification(String type, String message) {
        NotificationChannel channel = channels.get(type);
        if (channel != null) {
            channel.send(message);
        }
    }
}
```

#### L - Liskov Substitution Principle

```java
// ✅ BIEN: Subtipo reemplaza al supertipo sin problemas
List<User> users = new ArrayList<>();
users.add(new RegularUser("john@example.com"));
users.add(new PremiumUser("jane@example.com"));

for (User user : users) {
    user.processPayment(amount); // Funciona para ambos
}
```

#### I - Interface Segregation Principle

```java
// ❌ MAL: Interfaz gorda
public interface UserService {
    User getUserById(Long id);
    void createUser(UserDTO dto);
    void updateUser(UserDTO dto);
    void deleteUser(Long id);
    void sendEmail(String email);
    void generateReport();
    void backupDatabase();
}

// ✅ BIEN: Interfaces segregadas por responsabilidad
public interface UserQueryService {
    User getUserById(Long id);
}

public interface UserCommandService {
    void createUser(UserDTO dto);
    void updateUser(UserDTO dto);
    void deleteUser(Long id);
}

public interface NotificationService {
    void sendEmail(String email);
}
```

#### D - Dependency Inversion Principle

```java
// ❌ MAL: Dependencia en implementación concreta
@Service
public class IncidentService {
    private final MySQLIncidentRepository repository 
        = new MySQLIncidentRepository();
    
    public Incident getIncident(Long id) {
        return repository.findById(id);
    }
}

// ✅ BIEN: Dependencia inyectada en abstracción
@Service
public class IncidentService {
    private final IncidentRepository repository;
    
    @Autowired
    public IncidentService(IncidentRepository repository) {
        this.repository = repository;
    }
    
    public Incident getIncident(Long id) {
        return repository.findById(id);
    }
}
```

---

### 3.3 Manejo de Errores

#### Frontend

```typescript
// ✅ CORRECTO: Manejo explícito de errores
this.incidentService.getIncidents().subscribe(
  (incidents: Incident[]) => {
    this.incidents = incidents;
  },
  (error: any) => {
    if (error.status === 404) {
      this.showErrorMessage('Incidencias no encontradas');
    } else if (error.status === 401) {
      this.redirectToLogin();
    } else {
      this.showErrorMessage('Error al cargar incidencias');
      this.logger.error('API Error:', error);
    }
  }
);

// ✅ MEJOR: Con manejo centralizado de errores
this.incidentService.getIncidents()
  .pipe(
    catchError(error => {
      this.handleError(error);
      return of([]);
    })
  )
  .subscribe(incidents => this.incidents = incidents);

// ❌ INCORRECTO: Sin manejo de errores
this.incidentService.getIncidents().subscribe(
  incidents => this.incidents = incidents
  // ¿Qué pasa si hay error?
);
```

#### Backend

```java
// ✅ CORRECTO: Excepciones específicas
@GetMapping("/{id}")
public ResponseEntity<IncidentDTO> getIncident(@PathVariable Long id) {
    try {
        Incident incident = incidentService.getIncidentById(id);
        return ResponseEntity.ok(convertToDTO(incident));
    } catch (ResourceNotFoundException e) {
        return ResponseEntity.notFound().build();
    } catch (UnauthorizedException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}

// ✅ MEJOR: Con manejador global de excepciones
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            ResourceNotFoundException e) {
        return ResponseEntity.notFound().build();
    }
    
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(
            UnauthorizedException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .body(new ErrorResponse("Access denied", e.getMessage()));
    }
}

// ❌ INCORRECTO: Sin validación
@PostMapping
public IncidentDTO createIncident(@RequestBody IncidentDTO dto) {
    return incidentService.createIncident(dto); // ¿Y si dto es null?
}
```

---

### 3.4 Evitar "Código Espagueti"

**Características del Código Espagueti:**
- Control de flujo complicado con muchas bifurcaciones
- Variables globales sin control
- Funciones muy largas (>50 líneas)
- Duplicación de código
- Nombres genéricos (data, temp, result)

#### Ejemplo: Refactorizar Código Espagueti

```java
// ❌ ESPAGUETI: 80 líneas, 7 niveles de anidación
@Service
public class IncidentProcessingService {
    public void processIncidents() {
        List<Incident> incidents = repository.findAll();
        
        for (Incident incident : incidents) {
            if (incident.getStatus().equals("PENDING")) {
                if (incident.getPriority() > 3) {
                    if (incident.getAssignee() == null) {
                        List<User> technicians = userRepository.findAvailableTechnicians();
                        if (!technicians.isEmpty()) {
                            User selected = technicians.get(0);
                            incident.setAssignee(selected);
                            
                            if (incident.getType().equals("URGENT")) {
                                // Enviar notificación urgente
                                emailService.sendEmail(selected.getEmail(), 
                                    "URGENT: " + incident.getTitle());
                            }
                        }
                    }
                }
            }
        }
    }
}

// ✅ REFACTORIZADO: Funciones pequeñas, responsabilidades claras
@Service
public class IncidentProcessingService {
    
    public void processIncidents() {
        List<Incident> pendingIncidents = 
            incidentRepository.findByStatus("PENDING");
        
        for (Incident incident : pendingIncidents) {
            processIncident(incident);
        }
    }
    
    private void processIncident(Incident incident) {
        if (isHighPriorityAndUnassigned(incident)) {
            assignIncidentToTechnician(incident);
            notifyAssignedTechnician(incident);
        }
    }
    
    private boolean isHighPriorityAndUnassigned(Incident incident) {
        return incident.getPriority() > 3 && 
               incident.getAssignee() == null;
    }
    
    private void assignIncidentToTechnician(Incident incident) {
        User technician = findAvailableTechnician();
        incident.setAssignee(technician);
        incidentRepository.save(incident);
    }
    
    private void notifyAssignedTechnician(Incident incident) {
        String subject = incident.isUrgent() ? 
            "URGENT: " + incident.getTitle() : 
            incident.getTitle();
        emailService.sendEmail(
            incident.getAssignee().getEmail(), 
            subject
        );
    }
}
```

**Beneficios:**
✅ Más legible y fácil de entender  
✅ Más fácil de testear  
✅ Más fácil de mantener  
✅ Reutilizable  

---

## 4. ESTRUCTURA DE PAQUETES (PACKAGE NAMING)

### 4.1 Estructura General del Proyecto

```
SWO (raíz del proyecto)
├── backend/
│   └── src/main/java/com/swo/
│       ├── module/
│       │   ├── incident/
│       │   ├── project/
│       │   ├── user/
│       │   ├── chatbot/
│       │   └── report/
│       ├── common/
│       ├── security/
│       ├── config/
│       └── SwoApplication.java
│   └── src/test/java/com/swo/
├── src/ (Frontend - Angular)
│   ├── app/
│   │   ├── core/
│       │   ├── guards/
│       │   ├── interceptors/
│       │   ├── services/
│       │   └── models/
│       ├── shared/
│       │   ├── components/
│       │   ├── pipes/
│       │   └── validators/
│       ├── features/
│       │   ├── incidents/
│       │   ├── projects/
│       │   ├── users/
│       │   ├── chatbot/
│       │   └── reports/
│       └── app.routes.ts
│   ├── assets/
│   └── environments/
├── docker/
├── scripts/
└── docs/
```

---

### 4.2 Backend - Estructura de Paquetes Detallada

#### 4.2.1 Módulo Base: `com.swo.module.[nombre_modulo]`

```java
com.swo.module.incident
├── controller/
│   └── IncidentController.java
├── service/
│   ├── IncidentService.java
│   └── IncidentValidationService.java
├── repository/
│   └── IncidentRepository.java
├── entity/
│   └── Incident.java
├── dto/
│   ├── IncidentDTO.java
│   ├── IncidentCreateRequest.java
│   └── IncidentResponse.java
├── mapper/
│   └── IncidentMapper.java
├── exception/
│   ├── IncidentNotFoundException.java
│   └── InvalidIncidentDataException.java
└── constants/
    └── IncidentConstants.java
```

#### 4.2.2 Naming Conventions por Carpeta

**Controllers:**
```java
public class IncidentController { }
public class UserController { }
public class ProjectController { }
// Ubicación: com.swo.module.[modulo].controller
```

**Services:**
```java
@Service
public class IncidentService { }

@Service
public class IncidentValidationService { }

@Service
public class IncidentNotificationService { }
// Ubicación: com.swo.module.[modulo].service
```

**Repositories:**
```java
@Repository
public interface IncidentRepository 
    extends JpaRepository<Incident, Long> { }

// Ubicación: com.swo.module.[modulo].repository
```

**Entities:**
```java
@Entity
@Table(name = "incidents")
public class Incident { }

// Ubicación: com.swo.module.[modulo].entity
```

**DTOs (Data Transfer Objects):**
```java
public class IncidentDTO { }
public class IncidentCreateRequest { }
public class IncidentResponse { }

// Ubicación: com.swo.module.[modulo].dto
```

**Mappers:**
```java
@Component
public class IncidentMapper {
    public IncidentDTO toDTO(Incident entity) { }
    public Incident toEntity(IncidentDTO dto) { }
}

// Ubicación: com.swo.module.[modulo].mapper
```

**Exceptions:**
```java
public class IncidentNotFoundException 
    extends BusinessException { }

public class InvalidIncidentDataException 
    extends BusinessException { }

// Ubicación: com.swo.module.[modulo].exception
```

**Constants:**
```java
public final class IncidentConstants {
    public static final String STATUS_OPEN = "OPEN";
    public static final String STATUS_CLOSED = "CLOSED";
    public static final int MAX_INCIDENTS_PER_USER = 100;
}

// Ubicación: com.swo.module.[modulo].constants
```

#### 4.2.3 Paquete Common (Compartido)

```java
com.swo.common/
├── config/
│   ├── SecurityConfig.java
│   ├── WebConfig.java
│   ├── JacksonConfig.java
│   └── CacheConfig.java
├── exception/
│   ├── ApplicationException.java
│   ├── BusinessException.java
│   ├── GlobalExceptionHandler.java
│   └── ErrorResponse.java
├── util/
│   ├── DateUtils.java
│   ├── StringUtils.java
│   ├── ValidationUtils.java
│   └── CryptoUtils.java
├── constants/
│   └── AppConstants.java
├── interceptor/
│   ├── RequestInterceptor.java
│   └── LoggingInterceptor.java
└── annotation/
    ├── ValidEmail.java
    └── Loggable.java
```

#### 4.2.4 Paquete Security

```java
com.swo.security/
├── jwt/
│   ├── JwtTokenProvider.java
│   ├── JwtTokenValidator.java
│   └── JwtProperties.java
├── config/
│   └── SecurityConfig.java
├── filter/
│   └── JwtAuthenticationFilter.java
├── model/
│   ├── JwtToken.java
│   └── UserPrincipal.java
└── service/
    └── AuthenticationService.java
```

---

### 4.3 Frontend - Estructura de Carpetas

#### Core Module (Funcionalidades Globales)

```typescript
src/app/core/
├── guards/
│   ├── auth.guard.ts
│   └── role.guard.ts
├── interceptors/
│   ├── auth.interceptor.ts
│   ├── error.interceptor.ts
│   └── logging.interceptor.ts
├── services/
│   ├── auth.service.ts
│   ├── user.service.ts
│   └── api.service.ts
├── models/
│   ├── user.model.ts
│   ├── incident.model.ts
│   └── api.model.ts
└── core.module.ts
```

#### Shared Module (Componentes Reutilizables)

```typescript
src/app/shared/
├── components/
│   ├── header/
│   ├── footer/
│   ├── sidebar/
│   ├── loading-spinner/
│   ├── confirmation-dialog/
│   └── error-message/
├── pipes/
│   ├── safe.pipe.ts
│   ├── truncate.pipe.ts
│   └── format-date.pipe.ts
├── validators/
│   ├── email.validator.ts
│   ├── password-strength.validator.ts
│   └── async-validators/
└── shared.module.ts
```

#### Features (Módulos Funcionales)

```typescript
src/app/features/incidents/
├── containers/
│   ├── incidents-list-container/
│   ├── incident-detail-container/
│   └── incident-form-container/
├── components/
│   ├── incident-list/
│   ├── incident-card/
│   ├── incident-form/
│   └── incident-filters/
├── services/
│   └── incident.service.ts
├── models/
│   └── incident.model.ts
├── state/ (si usa NgRx o similar)
│   ├── incident.actions.ts
│   ├── incident.reducer.ts
│   └── incident.selectors.ts
├── incidents.module.ts
└── incidents.routes.ts
```

**Patrón para cada feature:**
- `containers/`: Smart components
- `components/`: Dumb components
- `services/`: Lógica de negocio
- `models/`: Interfaces y tipos
- `state/`: Estado global (opcional)

---

## 5. PATRONES DE DISEÑO A IMPLEMENTAR

### 5.1 Patrón Repository

**Propósito:** Abstraer el acceso a datos de la lógica de negocio.

#### Implementación Backend

```java
// Entity
@Entity
@Table(name = "incidents")
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String status;
}

// Repository
@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findByStatus(String status);
    List<Incident> findByAssigneeId(Long userId);
    Page<Incident> findAll(Specification<Incident> spec, Pageable pageable);
}

// Service (usador del Repository)
@Service
public class IncidentService {
    private final IncidentRepository repository;
    
    @Autowired
    public IncidentService(IncidentRepository repository) {
        this.repository = repository;
    }
    
    public List<Incident> getOpenIncidents() {
        return repository.findByStatus("OPEN");
    }
    
    public Incident createIncident(IncidentDTO dto) {
        Incident incident = new Incident();
        incident.setTitle(dto.getTitle());
        incident.setDescription(dto.getDescription());
        incident.setStatus("OPEN");
        return repository.save(incident);
    }
}
```

**Ventajas:**
✅ Fácil cambiar implementación de BD sin afectar servicios  
✅ Facilita testing con mocks  
✅ Centraliza queries en un lugar  
✅ Reutilizable desde múltiples servicios  

---

### 5.2 Patrón Dependency Injection (DI)

**Propósito:** Reducir acoplamiento inyectando dependencias.

#### Implementación Backend

```java
// ❌ SIN Inyección de Dependencias (Acoplado)
@Service
public class IncidentService {
    private final EmailService emailService = new EmailService();
    private final NotificationService notificationService = 
        new NotificationService();
    
    public void createIncident(IncidentDTO dto) {
        // Lógica...
    }
}

// ✅ CON Inyección de Dependencias (Desacoplado)
@Service
public class IncidentService {
    private final IncidentRepository repository;
    private final EmailService emailService;
    private final NotificationService notificationService;
    
    @Autowired
    public IncidentService(
            IncidentRepository repository,
            EmailService emailService,
            NotificationService notificationService) {
        this.repository = repository;
        this.emailService = emailService;
        this.notificationService = notificationService;
    }
    
    public void createIncident(IncidentDTO dto) {
        // Lógica...
        notificationService.notify(...);
    }
}
```

#### Implementación Frontend

```typescript
// ✅ Con Inyección de Dependencias
@Injectable({ providedIn: 'root' })
export class IncidentService {
    constructor(private http: HttpClient) {}
    
    getIncidents(): Observable<Incident[]> {
        return this.http.get<Incident[]>('/api/incidents');
    }
}

@Component({
    selector: 'app-incident-list',
    templateUrl: './incident-list.component.html'
})
export class IncidentListComponent implements OnInit {
    incidents: Incident[] = [];
    
    constructor(private incidentService: IncidentService) {}
    
    ngOnInit() {
        this.incidentService.getIncidents()
            .subscribe(incidents => this.incidents = incidents);
    }
}
```

**Ventajas:**
✅ Bajo acoplamiento  
✅ Fácil de testear (inyectar mocks)  
✅ Cambiar implementaciones sin tocar consumidores  
✅ Mejor mantenibilidad  

---

### 5.3 Patrón Data Transfer Object (DTO)

**Propósito:** Transferir datos entre capas evitando exponer entidades.

#### Implementación Backend

```java
// Entity (No exponer directamente)
@Entity
@Table(name = "incidents")
public class Incident {
    @Id
    @GeneratedValue
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createdBy;
    
    // Información sensible
    @Column(name = "internal_notes")
    private String internalNotes;
    
    // getters y setters...
}

// DTO (Exponer en API)
public class IncidentResponse {
    private Long id;
    private String title;
    private String description;
    private String status;
    private String createdByName;
    
    // NO incluir: internalNotes (información sensible)
    // getters y setters...
}

// Controller
@GetMapping("/{id}")
public ResponseEntity<IncidentResponse> getIncident(@PathVariable Long id) {
    Incident incident = incidentService.getIncidentById(id);
    IncidentResponse response = mapToResponse(incident);
    return ResponseEntity.ok(response);
}

// DTO Request (para crear)
public class IncidentCreateRequest {
    @NotNull
    @Length(min = 5, max = 200)
    private String title;
    
    @NotNull
    private String description;
    
    // Validación en DTO
    @Email
    private String reporterEmail;
}

@PostMapping
public ResponseEntity<IncidentResponse> createIncident(
        @Valid @RequestBody IncidentCreateRequest request) {
    IncidentDTO dto = new IncidentDTO();
    dto.setTitle(request.getTitle());
    // Mapear...
    
    Incident incident = incidentService.createIncident(dto);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(mapToResponse(incident));
}
```

**Ventajas:**
✅ Ocultamos estructura interna de la BD  
✅ Seguridad (no exponemos datos sensibles)  
✅ Flexibilidad (cambiar Entity sin afectar API)  
✅ Validación centralizada en DTOs  

---

### 5.4 Patrón Singleton

**Propósito:** Garantizar una única instancia de una clase en toda la aplicación.

#### Implementación Backend

```java
// ✅ Spring maneja Singletons automáticamente
@Service  // Por defecto es @Scope(SINGLETON)
public class ApplicationConfigService {
    private final ConfigRepository configRepository;
    
    // Una única instancia en toda la app
    public String getAppName() {
        return configRepository.getAppName();
    }
}

// ✅ Singleton explícito si necesario
@Configuration
public class DatabaseConnectionPool {
    @Bean
    public DataSource dataSource() {
        return new HikariDataSource(/* config */);
        // Una única DataSource compartida
    }
}
```

#### Implementación Frontend

```typescript
// ✅ Angular Injectable con providedIn: 'root'
@Injectable({ providedIn: 'root' })
export class AuthService {
    // Una única instancia en toda la app
    private currentUser: User | null = null;
    
    getLoggedInUser(): User | null {
        return this.currentUser;
    }
}

// ✅ Usarlo en múltiples componentes
@Component({ selector: 'app-header' })
export class HeaderComponent {
    user: User | null;
    
    constructor(private authService: AuthService) {
        this.user = authService.getLoggedInUser();
        // Mismo AuthService que en otros componentes
    }
}
```

**Ventajas:**
✅ Consistencia de estado global  
✅ Eficiencia de memoria  
✅ Punto único de configuración  

---

### 5.5 Patrón Observer (Observables)

**Propósito:** Notificar cambios a múltiples suscriptores.

#### Implementación Frontend

```typescript
// Subject (observable)
@Injectable({ providedIn: 'root' })
export class IncidentStateService {
    private incidentsSubject = new BehaviorSubject<Incident[]>([]);
    incidents$ = this.incidentsSubject.asObservable();
    
    loadIncidents() {
        this.incidentService.getIncidents().subscribe(
            incidents => this.incidentsSubject.next(incidents)
        );
    }
}

// Componente 1 suscribe
@Component({
    selector: 'app-incident-list',
    templateUrl: './incident-list.component.html'
})
export class IncidentListComponent implements OnInit {
    incidents$: Observable<Incident[]>;
    
    constructor(private stateService: IncidentStateService) {
        this.incidents$ = stateService.incidents$;
    }
    
    ngOnInit() {
        this.stateService.loadIncidents();
    }
}

// Componente 2 suscribe al mismo observable
@Component({
    selector: 'app-incident-count',
    template: '<p>Total: {{ (count$ | async) }}</p>'
})
export class IncidentCountComponent {
    count$: Observable<number>;
    
    constructor(private stateService: IncidentStateService) {
        this.count$ = this.stateService.incidents$.pipe(
            map(incidents => incidents.length)
        );
    }
}
```

**Ventajas:**
✅ Reactividad  
✅ Múltiples componentes sincronizados  
✅ Fácil de testear  

---

## 6. ESTRATEGIA DE PRUEBAS UNITARIAS

### 6.1 Filosofía de Testing

**Pirámide de Testing para SWO:**

```
           E2E Tests (5%)
        Integration Tests (15%)
     Unit Tests (80%)
```

**Objetivo:** 80% de cobertura de código, enfocándose en:
- Lógica de negocio (Services)
- Funciones de validación
- Casos edge y manejo de errores

### 6.2 Backend - Pruebas con JUnit 5 y Mockito

#### Setup y Dependencias

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
    <!-- Incluye: JUnit 5, Mockito, AssertJ, etc. -->
</dependency>

<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>4.11.0</version>
    <scope>test</scope>
</dependency>
```

#### Prueba Unitaria: Service

```java
@ExtendWith(MockitoExtension.class)
class IncidentServiceTest {
    
    @Mock
    private IncidentRepository incidentRepository;
    
    @Mock
    private NotificationService notificationService;
    
    @InjectMocks
    private IncidentService incidentService;
    
    // Caso 1: Crear incidencia exitosamente
    @Test
    @DisplayName("Should create incident successfully")
    void testCreateIncident_Success() {
        // Arrange
        IncidentDTO dto = new IncidentDTO();
        dto.setTitle("Network Down");
        dto.setDescription("Critical network issue");
        
        Incident savedIncident = new Incident();
        savedIncident.setId(1L);
        savedIncident.setTitle(dto.getTitle());
        
        when(incidentRepository.save(any(Incident.class)))
            .thenReturn(savedIncident);
        
        // Act
        Incident result = incidentService.createIncident(dto);
        
        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("Network Down");
        
        verify(incidentRepository, times(1)).save(any(Incident.class));
        verify(notificationService, times(1))
            .notifyIncidentCreated(savedIncident);
    }
    
    // Caso 2: Manejar excepción cuando falla la BD
    @Test
    @DisplayName("Should throw exception when database fails")
    void testCreateIncident_DatabaseError() {
        // Arrange
        IncidentDTO dto = new IncidentDTO();
        
        when(incidentRepository.save(any(Incident.class)))
            .thenThrow(new RuntimeException("DB Connection Failed"));
        
        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            incidentService.createIncident(dto);
        });
    }
    
    // Caso 3: Validar que título no sea nulo
    @Test
    @DisplayName("Should fail when title is null")
    void testCreateIncident_NullTitle() {
        // Arrange
        IncidentDTO dto = new IncidentDTO();
        dto.setTitle(null);
        
        // Act & Assert
        assertThrows(ValidationException.class, () -> {
            incidentService.createIncident(dto);
        });
        
        verify(incidentRepository, never()).save(any());
    }
}
```

#### Prueba Unitaria: Controller

```java
@WebMvcTest(IncidentController.class)
class IncidentControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private IncidentService incidentService;
    
    @Test
    @DisplayName("GET /api/incidents should return 200 OK")
    void testGetIncidents_Success() throws Exception {
        // Arrange
        List<IncidentResponse> incidents = List.of(
            new IncidentResponse(1L, "Incident 1", "OPEN"),
            new IncidentResponse(2L, "Incident 2", "CLOSED")
        );
        
        when(incidentService.getAllIncidents())
            .thenReturn(incidents);
        
        // Act & Assert
        mockMvc.perform(get("/api/incidents"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].title").value("Incident 1"));
    }
    
    @Test
    @DisplayName("POST /api/incidents should create incident")
    void testCreateIncident_Success() throws Exception {
        // Arrange
        IncidentCreateRequest request = new IncidentCreateRequest();
        request.setTitle("New Issue");
        
        IncidentResponse response = new IncidentResponse(1L, "New Issue", "OPEN");
        
        when(incidentService.createIncident(any()))
            .thenReturn(response);
        
        // Act & Assert
        mockMvc.perform(post("/api/incidents")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(1L));
    }
}
```

### 6.3 Frontend - Pruebas con Jest

#### Setup y Configuración

```typescript
// jest.config.js
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.module.ts',
    '!src/main.ts'
  ]
};
```

#### Prueba Unitaria: Service

```typescript
describe('IncidentService', () => {
  let service: IncidentService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IncidentService]
    });
    
    service = TestBed.inject(IncidentService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
  
  it('should fetch incidents from API', () => {
    // Arrange
    const mockIncidents: Incident[] = [
      { id: 1, title: 'Issue 1', status: 'OPEN' },
      { id: 2, title: 'Issue 2', status: 'CLOSED' }
    ];
    
    // Act
    service.getIncidents().subscribe(incidents => {
      // Assert
      expect(incidents.length).toBe(2);
      expect(incidents[0].title).toBe('Issue 1');
    });
    
    // Verificar que se hizo la petición correcta
    const request = httpMock.expectOne('/api/incidents');
    expect(request.request.method).toBe('GET');
    request.flush(mockIncidents);
  });
  
  it('should handle error when fetching incidents', () => {
    // Arrange
    const errorMessage = 'Failed to fetch incidents';
    
    // Act & Assert
    service.getIncidents().subscribe(
      () => fail('should have failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      }
    );
    
    const request = httpMock.expectOne('/api/incidents');
    request.error(new ErrorEvent('error'), {
      status: 500,
      statusText: 'Server Error'
    });
  });
});
```

#### Prueba Unitaria: Componente

```typescript
describe('IncidentListComponent', () => {
  let component: IncidentListComponent;
  let fixture: ComponentFixture<IncidentListComponent>;
  let incidentService: jasmine.SpyObj<IncidentService>;
  
  beforeEach(async () => {
    const incidentServiceSpy = jasmine.createSpyObj(
      'IncidentService',
      ['getIncidents']
    );
    
    await TestBed.configureTestingModule({
      declarations: [IncidentListComponent],
      providers: [
        { provide: IncidentService, useValue: incidentServiceSpy }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(IncidentListComponent);
    component = fixture.componentInstance;
    incidentService = TestBed.inject(IncidentService) as 
      jasmine.SpyObj<IncidentService>;
  });
  
  it('should display list of incidents', () => {
    // Arrange
    const mockIncidents: Incident[] = [
      { id: 1, title: 'Issue 1', status: 'OPEN' }
    ];
    
    incidentService.getIncidents.and.returnValue(
      of(mockIncidents)
    );
    
    // Act
    component.ngOnInit();
    fixture.detectChanges();
    
    // Assert
    expect(component.incidents.length).toBe(1);
    expect(component.incidents[0].title).toBe('Issue 1');
    expect(incidentService.getIncidents).toHaveBeenCalled();
  });
  
  it('should show error message when fetch fails', () => {
    // Arrange
    incidentService.getIncidents.and.returnValue(
      throwError(() => new Error('API Error'))
    );
    
    // Act
    component.ngOnInit();
    fixture.detectChanges();
    
    // Assert
    expect(component.errorMessage).toBe('Failed to load incidents');
  });
});
```

### 6.4 Cobertura de Código

**Requisitos Mínimos por Componente:**

| Componente | Cobertura Mínima | Elementos Obligatorios |
|-----------|-----------------|----------------------|
| Services | 90% | Toda lógica de negocio |
| Components | 80% | Métodos públicos, ciclo de vida |
| Pipes | 100% | Transformaciones |
| Guards | 100% | Caminos permitidos/denegados |
| Validadores | 100% | Casos válidos e inválidos |

**Ejecutar tests y reporte:**

Backend:
```bash
mvn test
mvn jacoco:report  # Genera reporte de cobertura
```

Frontend:
```bash
ng test --code-coverage
# Genera reporte en: coverage/
```

---

## 7. CONFIGURACIÓN DE SERVIDORES Y BASE DE DATOS

### 7.1 Servidor de Aplicaciones (Backend)

#### Configuración Spring Boot Embebida

```properties
# application.yml - Propiedades del servidor

server:
  port: 8080
  servlet:
    context-path: /api
    session:
      timeout: 30m
  tomcat:
    max-threads: 200
    min-spare-threads: 10
    max-connections: 10000
    connection-timeout: 20000
    threads:
      max: 200
      min-spare: 10
  error:
    include-message: always
    include-binding-errors: always
    include-stacktrace: on-param
    include-exception: false
```

#### Requerimientos de Infraestructura

**Servidor de Producción:**
- **CPU**: Mínimo 2 cores (4 recomendado)
- **RAM**: Mínimo 2GB (4GB recomendado)
- **Disco**: Mínimo 20GB (SSD recomendado)
- **Java**: OpenJDK 17 LTS o superior

**Contenedorización con Docker:**

```dockerfile
# Dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copiar JAR compilado
COPY target/swo-api-1.0.0.jar app.jar

# Exponer puerto
EXPOSE 8080

# Comando de inicio
ENTRYPOINT ["java", "-jar", "app.jar"]

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD java -cp app.jar org.springframework.boot.loader.JarLauncher \
  -Dspring.profiles.active=prod
```

---

### 7.2 Base de Datos

#### PostgreSQL - Configuración Recomendada

```yaml
# application.yml - Configuración de BD

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/swo_db
    username: swo_user
    password: ${DB_PASSWORD}  # Variable de entorno
    driver-class-name: org.postgresql.Driver
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 20000
      idle-timeout: 300000
      max-lifetime: 1200000
      
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQL10Dialect
    hibernate:
      ddl-auto: validate  # En prod, no auto
    show-sql: false
    properties:
      hibernate:
        format_sql: true
        jdbc:
          batch_size: 20
          fetch_size: 50
        order_inserts: true
        order_updates: true
```

#### Script Inicial de BD

```sql
-- SQL para crear base de datos y usuario

-- Crear base de datos
CREATE DATABASE swo_db
  WITH ENCODING 'UTF8'
  OWNER postgres;

-- Crear usuario dedicado
CREATE USER swo_user WITH PASSWORD 'secure_password_here';

-- Dar permisos
GRANT ALL PRIVILEGES ON DATABASE swo_db TO swo_user;

-- Conectar a la BD
\c swo_db

-- Dar permisos en el schema
GRANT ALL ON SCHEMA public TO swo_user;

-- Crear tablas (ejecutadas por Flyway/Liquibase)
-- Ver sección de migraciones en application
```

#### Gestión de Conexiones

```properties
# Configuración de Pool de Conexiones (HikariCP)

spring.datasource.hikari.maximum-pool-size=20
# Máximo de conexiones simultáneas

spring.datasource.hikari.minimum-idle=5
# Mínimo de conexiones mantenidas

spring.datasource.hikari.connection-timeout=20000
# Timeout en ms para obtener conexión

spring.datasource.hikari.idle-timeout=300000
# Idle timeout en ms (5 minutos)

spring.datasource.hikari.max-lifetime=1200000
# Máxima vida de conexión en ms (20 minutos)
```

#### Credenciales Seguras

```yaml
# Usar variables de entorno, NUNCA hardcodear

# application.yml
spring:
  datasource:
    url: ${DB_URL}
    username: ${DB_USER}
    password: ${DB_PASSWORD}

# Variables en .env (NO commitar)
DB_URL=jdbc:postgresql://prod-db-server:5432/swo_db
DB_USER=swo_prod_user
DB_PASSWORD=SecureP@ssw0rd2024!

# O en Docker/K8s secrets
docker run -e DB_PASSWORD="secret" swo-app:1.0.0
```

---

### 7.3 Monitoreo de BD

```sql
-- Monitoreo de conexiones activas
SELECT datname, usename, count(*) 
FROM pg_stat_activity 
GROUP BY datname, usename;

-- Ver queries en ejecución
SELECT pid, usename, application_name, state, query 
FROM pg_stat_activity 
WHERE state != 'idle';

-- Índices no utilizados
SELECT schemaname, tablename, indexname 
FROM pg_indexes 
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY tablename, indexname;
```

---

## 8. DOCUMENTACIÓN DE AMBIENTES

### 8.1 Ambientes del Ciclo de Vida

```
DESARROLLO → TESTING/STAGING → PRODUCCIÓN
```

| Aspecto | Desarrollo | Testing/QA | Producción |
|--------|-----------|-----------|-----------|
| **Datos** | Datos de prueba | Datos similares a prod | Datos reales |
| **Usuarios** | Solo desarrolladores | Equipo QA | Usuarios finales |
| **Performance** | No crítica | Importante | Crítica |
| **Seguridad** | Flexible | Estricta | Máxima |
| **Backups** | No requerido | Diario | Horario |
| **Escala** | 1 servidor | 2-3 servidores | 3+ servidores + LB |

---

### 8.2 Ambiente de Desarrollo (Local)

#### Configuración del Desarrollador

```yaml
# application-dev.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/swo_dev
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: create-drop  # Recrear BD en cada inicio
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        
  h2:
    console:
      enabled: true

server:
  port: 8080

logging:
  level:
    root: INFO
    com.swo: DEBUG  # Debug para nuestro código

# CORS abierto para desarrollo
app:
  cors:
    allowed-origins: http://localhost:4200,http://localhost:3000
```

#### Setup Local

```bash
# 1. Clonar repositorio
git clone https://github.com/org/SWO.git
cd SWO

# 2. Backend
cd backend
./mvnw clean install
./mvnw spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"

# 3. Frontend (otra terminal)
cd ../src
npm install
ng serve --open
# Acceder en http://localhost:4200
```

#### Variables de Entorno Locales

```bash
# .env.local (NO commitar)

# Database
DB_URL=jdbc:postgresql://localhost:5432/swo_dev
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=dev-secret-key-change-in-production

# Email (Dev)
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=dev@example.com
MAIL_PASSWORD=dev-password

# API URLs
API_URL=http://localhost:8080/api
```

---

### 8.3 Ambiente de Testing/QA (Staging)

#### Configuración Staging

```yaml
# application-staging.yml
spring:
  datasource:
    url: ${DB_URL}  # Desde variable de entorno
    username: ${DB_USER}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate  # Solo validar, no modificar
    show-sql: false
      
server:
  port: 8080

logging:
  level:
    root: WARN
    com.swo: INFO

# CORS más restrictivo
app:
  cors:
    allowed-origins: https://staging.example.com

# SSL habilitado
server:
  ssl:
    enabled: true
    key-store: ${SSL_KEYSTORE_PATH}
    key-store-password: ${SSL_KEYSTORE_PASSWORD}
```

#### Características de Staging

✅ **Acceso**: Solo equipo QA y desarrolladores  
✅ **Datos**: Copia segura de producción (anonymizada)  
✅ **Performance**: Monitoreado pero no crítico  
✅ **Seguridad**: SSL/TLS, autenticación requerida  
✅ **Rollback**: Fácil volver a versión anterior  

#### Despliegue en Staging

```bash
# Docker Compose para Staging
docker-compose -f docker-compose.staging.yml up -d

# Verificar salud
curl https://staging-api.example.com/health

# Ver logs
docker logs swo-api-staging
```

---

### 8.4 Ambiente de Producción

#### Configuración Producción

```yaml
# application-prod.yml
spring:
  datasource:
    url: ${DB_URL}
    username: ${DB_USER}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        jdbc:
          batch_size: 50

server:
  port: 8080
  ssl:
    enabled: true
    key-store: /etc/ssl/keystore.jks
    key-store-password: ${SSL_PASSWORD}
    key-store-type: PKCS12

logging:
  level:
    root: WARN
    com.swo: INFO
  file:
    name: /var/log/swo-api.log
    max-size: 10MB
    max-history: 30

app:
  cors:
    allowed-origins: https://app.example.com,https://www.example.com
  
# Actuator para monitoreo
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus
  endpoint:
    health:
      show-details: when-authorized
```

#### Requisitos de Producción

**Infraestructura:**
- ✅ Load Balancer (Nginx, HAProxy)
- ✅ Múltiples instancias de aplicación (mín. 3)
- ✅ Base de datos replicada (Master-Slave o Multi-Master)
- ✅ Backup automático cada 4 horas
- ✅ CDN para assets estáticos
- ✅ Monitoreo 24/7 (Prometheus, Grafana)
- ✅ Alertas automáticas
- ✅ WAF (Web Application Firewall)

**Seguridad:**
- ✅ SSL/TLS 1.2+
- ✅ HSTS header
- ✅ Rate limiting
- ✅ Auditoría de accesos
- ✅ Encriptación en tránsito y en reposo

#### Variables de Entorno Producción

```bash
# Gestionar con variables de entorno seguido, NO hardcodear

# Kubernetes Secrets
kubectl create secret generic swo-db \
  --from-literal=db-url=jdbc:postgresql://prod-db:5432/swo \
  --from-literal=db-user=swo_prod \
  --from-literal=db-password=$(openssl rand -base64 32)

# Docker container
docker run \
  -e DB_URL="jdbc:postgresql://prod-db:5432/swo" \
  -e DB_USER="swo_prod" \
  -e DB_PASSWORD="${SECRET_DB_PASSWORD}" \
  -e JWT_SECRET="${SECRET_JWT_KEY}" \
  swo-api:latest
```

---

### 8.5 Comparativa de Configuraciones

```yaml
# Resumen de cambios entre ambientes

desarrollo:
  db: local H2/PostgreSQL
  logging: DEBUG
  corsAllowedOrigins: localhost:4200
  sslEnabled: false
  caching: disabled
  
staging:
  db: PostgreSQL remota
  logging: INFO
  corsAllowedOrigins: staging.example.com
  sslEnabled: true
  caching: enabled
  replicas: 2
  
production:
  db: PostgreSQL con replicación
  logging: WARN
  corsAllowedOrigins: app.example.com, www.example.com
  sslEnabled: true (obligatorio)
  caching: distributed (Redis)
  replicas: 3+
  backup: 4 horas
  monitoring: completo
  alerts: activas
```

---

### 8.6 Procedimiento de Despliegue

```bash
# 1. Compilar y testear
mvn clean test -DskipIntegrationTests=true

# 2. Build Docker
docker build -t swo-api:${VERSION} .

# 3. Push a registro privado
docker push private-registry.example.com/swo-api:${VERSION}

# 4. Deploy a Staging
kubectl set image deployment/swo-api-staging \
  swo-api=private-registry.example.com/swo-api:${VERSION} \
  --namespace=staging

# 5. Tests en Staging
./run-e2e-tests.sh staging

# 6. Deploy a Producción
kubectl set image deployment/swo-api-prod \
  swo-api=private-registry.example.com/swo-api:${VERSION} \
  --namespace=production

# 7. Verificar rollout
kubectl rollout status deployment/swo-api-prod -n production

# 8. Monitoreo
curl https://api.example.com/health
```

---

## CONCLUSIÓN

Este documento establece la base arquitectónica, patrones de diseño y estándares de desarrollo para el proyecto **SWO**. Su cumplimiento garantiza:

✅ **Calidad de código** mediante principios SOLID y clean code  
✅ **Escalabilidad** con arquitectura modular y microservicios-ready  
✅ **Mantenibilidad** con convenciones claras y documentación  
✅ **Testing robusto** con cobertura >80%  
✅ **Seguridad** en todas las capas  
✅ **Operabilidad** con ambientes bien definidos  

**Próximos Pasos:**
1. Revisar y validar con todo el equipo técnico
2. Crear plantillas de proyecto (scaffolding)
3. Configurar pipelines de CI/CD
4. Documentar decisiones técnicas en ADRs (Architecture Decision Records)
5. Revisar trimestralmente y actualizar según lecciones aprendidas

---

**Documento preparado por:** Tech Lead Senior  
**Fecha de revisión:** 21 de Mayo de 2026  
**Próxima revisión:** 21 de Agosto de 2026