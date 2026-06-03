# Acta de Aprobación de Requerimientos
## Sistema de Gestión de Incidencias — SWO ServiceDesk

---

| | |
|---|---|
| **Código del documento** | SWO-REQ-ACTA-001 |
| **Versión** | 1.0 |
| **Fecha de elaboración** | 03 de junio de 2026 |
| **Fecha de aprobación** | 03 de junio de 2026 |
| **Estado** | ✅ Aprobado |
| **Proyecto** | SWO — Sistema de Gestión de Incidencias |
| **Institución** | SENA — Servicio Nacional de Aprendizaje |
| **Programa** | Análisis y Desarrollo de Software |

---

## 1. Objetivo del Documento

El presente documento tiene como propósito registrar formalmente la revisión, validación y aprobación de los requerimientos funcionales del sistema **SWO ServiceDesk**, definidos a través de historias de usuario. Este acta constituye el acuerdo entre el equipo de desarrollo y los interesados del proyecto respecto al alcance funcional aprobado para la primera versión del sistema.

---

## 2. Participantes

### 2.1 Equipo de Desarrollo

| Nombre | Rol en el Proyecto | Responsabilidad |
|--------|--------------------|-----------------|
| Juan Pablo Giraldo E. | Desarrollador Full Stack | Análisis, diseño e implementación del sistema |
| (Instructor SENA) | Asesor Técnico | Revisión y validación técnica |

### 2.2 Partes Interesadas (Stakeholders)

| Perfil | Rol en el Sistema | Participación |
|--------|-------------------|---------------|
| Usuario Final | Reporta y consulta incidencias | Validación de RF-01 y RF-03 |
| Soporte Técnico | Gestiona y resuelve incidencias | Validación de RF-01 |
| Administrador del Sistema | Gestión de usuarios y reportes | Validación de RF-02 y RF-04 |

---

## 3. Alcance del Sistema

El sistema **SWO ServiceDesk** es una plataforma web para la gestión integral de incidencias tecnológicas en una organización. Permite a los usuarios reportar problemas, al soporte técnico gestionarlos y resolverlos, y a los administradores supervisar la operación mediante reportes y controlar el acceso al sistema.

**Tecnologías aprobadas para el desarrollo:**
- **Frontend:** Angular 17 (TypeScript)
- **Backend:** Spring Boot 3.2.4 (Java 17)
- **Base de datos:** MySQL 8
- **Documentación API:** Swagger / OpenAPI 3.0

---

## 4. Historias de Usuario Aprobadas

### RF-01 — Gestión de Incidencias

| Atributo | Detalle |
|----------|---------|
| **ID** | RF-01 |
| **Nombre** | Gestión de Incidencias |
| **Roles asignados** | Usuario final · Soporte técnico |
| **Prioridad** | Alta |
| **Estado de aprobación** | ✅ Aprobado |

**Descripción:**  
Como **usuario final**, quiero poder registrar una incidencia cuando tenga un problema técnico, para que el equipo de soporte lo atienda oportunamente.  
Como **técnico de soporte**, quiero poder actualizar el estado de las incidencias asignadas, para llevar un seguimiento ordenado de la atención.

**Funcionalidad principal:**
- Registrar nuevas incidencias con título, descripción, impacto, ubicación y aplicación afectada
- Actualizar el estado de una incidencia en progreso
- Cerrar incidencias registrando la resolución aplicada
- Notificar automáticamente al usuario los cambios de estado

**Criterios de aceptación:**

| # | Criterio | Condición de cumplimiento |
|---|----------|--------------------------|
| CA-01 | El formulario de registro debe validar campos obligatorios | El sistema no permite enviar el formulario si título, descripción, impacto o ubicación están vacíos |
| CA-02 | El título debe tener entre 5 y 100 caracteres | Se muestra mensaje de error si no se cumple el rango |
| CA-03 | La descripción debe tener mínimo 10 palabras | Se valida la cantidad de palabras antes de enviar |
| CA-04 | No se permiten palabras como "test", "prueba" o "spam" | El sistema rechaza el envío y muestra mensaje de alerta |
| CA-05 | Los estados válidos son: Abierto, En Progreso, Pendiente, Resuelto, Cerrado | El sistema solo permite transiciones válidas entre estados |
| CA-06 | Al cambiar el estado, el usuario que reportó recibe notificación | El servicio de notificaciones se dispara automáticamente |
| CA-07 | El cierre de una incidencia requiere texto de resolución mínimo 5 palabras | Se valida antes de permitir el cierre |
| CA-08 | Las incidencias se pueden filtrar por estado y buscar por texto | El filtrado funciona en tiempo real sin recargar la página |

**Impacto:**  Alta — Funcionalidad principal del sistema  
**Estimación:** 5 días de desarrollo

---

### RF-02 — Generación de Reportes

| Atributo | Detalle |
|----------|---------|
| **ID** | RF-02 |
| **Nombre** | Generación de Reportes |
| **Roles asignados** | Administrador |
| **Prioridad** | Media |
| **Estado de aprobación** | ✅ Aprobado |

**Descripción:**  
Como **administrador**, quiero generar reportes del sistema con métricas de incidencias para tomar decisiones informadas sobre el desempeño del equipo de soporte y el estado del servicio.

**Funcionalidad principal:**
- Filtrar incidencias por rango de fechas, estado y prioridad
- Visualizar métricas: total de incidencias, tiempo promedio de resolución, distribución por prioridad
- Exportar reportes en formato PDF y Excel
- Consultar porcentaje de resolución del período seleccionado

**Criterios de aceptación:**

| # | Criterio | Condición de cumplimiento |
|---|----------|--------------------------|
| CA-01 | El módulo de reportes es accesible únicamente para el rol Administrador | Usuarios con otro rol no visualizan la opción en el menú |
| CA-02 | Se pueden aplicar filtros por fecha de inicio y fecha de fin | El sistema valida que la fecha de inicio no sea mayor a la de fin |
| CA-03 | Se muestran métricas: total, abiertos, en progreso, pendientes y resueltos | Todas las métricas se calculan correctamente con los datos filtrados |
| CA-04 | El tiempo promedio de resolución se calcula en horas | El cálculo es correcto cuando hay incidencias resueltas en el período |
| CA-05 | El reporte se puede exportar en formato PDF | El archivo descargado contiene los datos del período consultado |
| CA-06 | El reporte se puede exportar en formato Excel | El archivo `.xlsx` contiene las columnas y datos correctos |
| CA-07 | Las estadísticas se cachean por 5 minutos para mejorar el rendimiento | Peticiones repetidas en menos de 5 min no realizan nueva consulta al backend |

**Impacto:**  Media — Soporte a la toma de decisiones  
**Estimación:** 3 días de desarrollo

---

### RF-03 — Chatbot de Soporte

| Atributo | Detalle |
|----------|---------|
| **ID** | RF-03 |
| **Nombre** | Chatbot de Soporte |
| **Roles asignados** | Usuario final |
| **Prioridad** | Media |
| **Estado de aprobación** | ✅ Aprobado |

**Descripción:**  
Como **usuario final**, quiero contar con un asistente virtual que me ayude a resolver dudas frecuentes de forma inmediata, y que en caso de no poder resolverlas, abra automáticamente una incidencia al equipo de soporte.

**Funcionalidad principal:**
- Responder preguntas frecuentes de forma automática usando una base de conocimiento
- Sugerir pasos de solución paso a paso según la categoría del problema
- Escalar la conversación creando automáticamente una incidencia cuando no se encuentre solución
- Mantener historial de la conversación durante la sesión
- Ofrecer acciones rápidas (consultas frecuentes predefinidas)

**Criterios de aceptación:**

| # | Criterio | Condición de cumplimiento |
|---|----------|--------------------------|
| CA-01 | El chatbot responde a consultas dentro de la base de conocimiento | La respuesta incluye pasos de solución y la categoría identificada |
| CA-02 | Si la consulta no tiene respuesta, el bot ofrece escalar a soporte | Se muestra la opción de crear incidencia automáticamente |
| CA-03 | Al escalar, se crea una incidencia en el sistema con los datos de la conversación | La incidencia queda registrada con título, descripción y contexto del chat |
| CA-04 | Se muestran acciones rápidas con las consultas más frecuentes | El usuario puede iniciar una consulta con un solo clic |
| CA-05 | El historial de la conversación se puede exportar | Se genera un archivo de texto con todos los mensajes de la sesión |
| CA-06 | El chatbot indica visualmente cuando está "escribiendo" | Se muestra un indicador de actividad antes de cada respuesta |
| CA-07 | El historial se puede limpiar para iniciar una nueva sesión | La acción limpia todos los mensajes del historial activo |

**Impacto:**  Media — Reducción de carga al equipo de soporte  
**Estimación:** 4 días de desarrollo

---

### RF-04 — Gestión de Usuarios

| Atributo | Detalle |
|----------|---------|
| **ID** | RF-04 |
| **Nombre** | Gestión de Usuarios |
| **Roles asignados** | Administrador |
| **Prioridad** | Alta |
| **Estado de aprobación** | ✅ Aprobado |

**Funcionalidad principal:**
- Crear nuevas cuentas de usuario con datos completos (nombre, correo, rol, departamento)
- Editar datos de usuarios existentes
- Eliminar cuentas (eliminación lógica: desactivar / eliminación permanente)
- Asignar y modificar roles del sistema
- Asignar usuarios a proyectos

**Descripción:**  
Como **administrador**, quiero gestionar las cuentas de los usuarios del sistema para controlar quién tiene acceso y con qué nivel de permisos.

**Criterios de aceptación:**

| # | Criterio | Condición de cumplimiento |
|---|----------|--------------------------|
| CA-01 | Solo el administrador accede al módulo de gestión de usuarios | Otros roles no ven la opción de usuarios en el menú lateral |
| CA-02 | No se permiten dos usuarios con el mismo correo | El sistema rechaza la creación/edición si el correo ya existe |
| CA-03 | La contraseña se almacena hasheada con BCrypt | El campo `passwordHash` nunca se expone en las respuestas de la API |
| CA-04 | Los roles válidos son: Administrador, Soporte, Técnico, Jefe, Usuario | El formulario solo permite seleccionar uno de estos roles |
| CA-05 | Un usuario desactivado no puede iniciar sesión | El sistema retorna error de autenticación para cuentas inactivas |
| CA-06 | Se pueden buscar usuarios por nombre, correo o área | El filtro funciona en tiempo real |
| CA-07 | Un usuario puede ser asignado a un proyecto desde este módulo | La asignación queda registrada en la tabla de asignaciones |
| CA-08 | La eliminación lógica conserva el historial de incidencias del usuario | Las incidencias previas del usuario siguen visibles en el sistema |

**Impacto:**  Alta — Control de acceso al sistema  
**Estimación:** 3 días de desarrollo

---

## 5. Requerimientos No Funcionales Asociados

Los siguientes requerimientos no funcionales fueron identificados y aprobados junto con las historias de usuario:

| ID | Requerimiento | Criterio de cumplimiento |
|----|--------------|--------------------------|
| RNF-01 | **Seguridad** — Las contraseñas se almacenan con hash BCrypt | Ningún endpoint expone el campo `passwordHash` |
| RNF-02 | **Usabilidad** — El sistema responde en menos de 3 segundos | Tiempos de carga medidos en ambiente de desarrollo |
| RNF-03 | **Disponibilidad** — La API debe documentarse con Swagger | Disponible en `/swagger-ui.html` |
| RNF-04 | **Mantenibilidad** — Cobertura mínima de pruebas unitarias del 45% | Validado con JaCoCo en perfil de desarrollo |
| RNF-05 | **Escalabilidad** — La arquitectura soporta múltiples proyectos | Relación M-N entre usuarios y proyectos implementada |
| RNF-06 | **Compatibilidad** — Funciona en navegadores modernos (Chrome, Edge, Firefox) | Construido con Angular 17 compatible con navegadores actuales |

---

## 6. Restricciones y Supuestos

### 6.1 Restricciones

- El sistema está diseñado para uso en intranet corporativa (no exposición directa a internet sin configuración adicional de seguridad).
- La exportación de reportes requiere que el servidor tenga acceso a las librerías `jsPDF` y `jspdf-autotable`.
- El chatbot opera con una base de conocimiento estática; no usa inteligencia artificial externa.
- La autenticación es mediante credenciales de base de datos (sin integración OAuth o LDAP en esta versión).

### 6.2 Supuestos

- Los usuarios finales cuentan con acceso a un navegador web moderno.
- La base de datos MySQL 8 estará disponible en el servidor de despliegue.
- El equipo de soporte técnico recibirá capacitación básica sobre el uso del sistema.
- Las notificaciones automáticas de cambio de estado se gestionan en tiempo real mediante el servicio de notificaciones interno.

---

## 7. Historial de Cambios del Documento

| Versión | Fecha | Autor | Descripción del cambio |
|---------|-------|-------|------------------------|
| 0.1 | Mayo 2026 | Equipo de desarrollo | Borrador inicial de historias de usuario |
| 0.2 | Mayo 2026 | Equipo de desarrollo | Adición de criterios de aceptación |
| 1.0 | 03 Jun 2026 | Juan Pablo Giraldo E. | Versión final para aprobación y entrega |

---

## 8. Resultado de la Revisión

### 8.1 Resumen de aprobación

| Historia de Usuario | Revisada | Observaciones | Resultado |
|--------------------|----------|---------------|-----------|
| RF-01 Gestión de Incidencias | ✅ Sí | Criterios de validación de formulario verificados en código | ✅ Aprobada |
| RF-02 Generación de Reportes | ✅ Sí | Exportación PDF/Excel implementada con jsPDF | ✅ Aprobada |
| RF-03 Chatbot de Soporte | ✅ Sí | Base de conocimiento estática, escalamiento funcional | ✅ Aprobada |
| RF-04 Gestión de Usuarios | ✅ Sí | BCrypt y roles implementados, eliminación lógica activa | ✅ Aprobada |

### 8.2 Observaciones generales

- Todos los requerimientos funcionales fueron implementados y verificados mediante pruebas unitarias y revisión de código.
- El sistema cuenta con 44 pruebas unitarias en el backend (Java/Spring Boot) y 32 pruebas en el frontend (Angular/Karma), todas con resultado exitoso.
- La cobertura de código backend supera el umbral mínimo del 45% establecido para el perfil de desarrollo.
- La documentación técnica de la API está disponible mediante Swagger UI en el endpoint `/swagger-ui.html`.

---

## 9. Firmas de Aprobación

Al suscribir este documento, los participantes declaran haber revisado el contenido y estar de acuerdo con los requerimientos, criterios de aceptación y alcance definido para el sistema **SWO ServiceDesk**.

---

**Aprendiz / Desarrollador**

&nbsp;

&nbsp;

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Juan Pablo Giraldo E.**  
Aprendiz — Análisis y Desarrollo de Software  
SENA  
Fecha: \_\_\_ / \_\_\_ / 2026

---

**Asesor Técnico / Instructor**

&nbsp;

&nbsp;

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Nombre del Instructor**  
Instructor — SENA  
Fecha: \_\_\_ / \_\_\_ / 2026

---

**Líder del Proyecto / Evaluador**

&nbsp;

&nbsp;

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Nombre del Evaluador**  
Cargo  
Fecha: \_\_\_ / \_\_\_ / 2026

---

*Este documento hace parte del paquete de entregables académicos del proyecto SWO — SENA, Análisis y Desarrollo de Software.*

*Código: SWO-REQ-ACTA-001 · Versión 1.0 · Junio 2026*
