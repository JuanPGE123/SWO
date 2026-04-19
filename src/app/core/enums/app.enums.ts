/**
 * @fileoverview Enumeraciones (Enums) de la aplicación SWO
 * 
 * Define todos los tipos enumerados utilizados en la aplicación para:
 * - Garantizar type-safety en TypeScript
 * - Evitar errores de tipeo en strings
 * - Facilitar el autocompletado en IDEs
 * - Centralizar valores permitidos para cada categoría
 * 
 * Convención de nombres:
 * - Nombres de enum en PascalCase (ej: EstadoIncidencia)
 * - Valores de enum en UPPER_SNAKE_CASE (ej: EN_PROGRESO)
 * 
 * @author Equipo SWO
 * @version 2.0.0
 */

/**
 * Estados posibles de una incidencia
 * 
 * Representa el ciclo de vida de una incidencia desde su creación hasta su resolución:
 * - ABIERTO: Estado inicial cuando se crea la incidencia
 * - EN_PROGRESO: La incidencia está siendo atendida
 * - PENDIENTE: En espera de información o acción externa
 * - RESUELTO: La incidencia ha sido solucionada
 * - CERRADO: La incidencia está cerrada y archivada
 * 
 * @enum {string}
 */
export enum EstadoIncidencia {
  /** Incidencia recién creada, esperando asignación */
  ABIERTO = 'open',
  
  /** Incidencia en proceso de resolución */
  EN_PROGRESO = 'inprogress',
  
  /** Incidencia pausada, esperando respuesta externa */
  PENDIENTE = 'pending',
  
  /** Incidencia solucionada exitosamente */
  RESUELTO = 'resolved',
  
  /** Incidencia cerrada y archivada (opcional) */
  CERRADO = 'closed',
}

/**
 * Valores de estado para envío al backend
 * El backend espera los valores en español
 */
export enum EstadoIncidenciaBackend {
  ABIERTO = 'Abierto',
  EN_PROGRESO = 'En Progreso',
  PENDIENTE = 'Pendiente',
  RESUELTO = 'Resuelto',
  CERRADO = 'Cerrado',
}

/**
 * Niveles de prioridad de una incidencia
 * 
 * Define la urgencia y importancia de resolución:
 * - BAJA: Puede esperar, no afecta operaciones críticas
 * - MEDIA: Importante pero no urgente
 * - ALTA: Requiere atención pronta
 * - CRITICA: Requiere atención inmediata, afecta operaciones críticas
 * 
 * @enum {string}
 */
export enum PrioridadIncidencia {
  /** Prioridad baja - puede esperar */
  BAJA = 'Baja',
  
  /** Prioridad media - importante pero no urgente */
  MEDIA = 'Media',
  
  /** Prioridad alta - requiere atención pronta */
  ALTA = 'Alta',
  
  /** Prioridad crítica - requiere atención inmediata */
  CRITICA = 'Crítica',
}

/**
 * Roles de usuario en el sistema
 * 
 * Define los niveles de acceso y permisos:
 * - ADMINISTRADOR: Acceso total al sistema
 * - ANALISTA: Puede gestionar incidencias y ver reportes
 * - TECNICO: Puede atender incidencias asignadas
 * - USUARIO: Puede crear y consultar sus propias incidencias
 * 
 * @enum {string}
 */
export enum RolUsuario {
  /** Administrador del sistema con todos los permisos */
  ADMINISTRADOR = 'Administrador',
  
  /** Analista que gestiona incidencias */
  ANALISTA = 'Analista',
  
  /** Técnico que atiende incidencias */
  TECNICO = 'Técnico',
  
  /** Usuario final que reporta incidencias */
  USUARIO = 'Usuario',
}

/**
 * Tipos de notificación/toast
 * 
 * Define el tipo visual y semántico de las notificaciones:
 * - SUCCESS: Operación exitosa (verde)
 * - ERROR: Error o fallo (rojo)
 * - WARNING: Advertencia (amarillo/naranja)
 * - INFO: Información general (azul)
 * 
 * @enum {string}
 */
export enum TipoNotificacion {
  /** Notificación de éxito */
  SUCCESS = 'success',
  
  /** Notificación de error */
  ERROR = 'error',
  
  /** Notificación de advertencia */
  WARNING = 'warning',
  
  /** Notificación informativa */
  INFO = 'info',
}

/**
 * Categorías de incidencias
 * 
 * Clasifica las incidencias según el tipo de problema:
 * 
 * @enum {string}
 */
export enum CategoriaIncidencia {
  /** Problemas de hardware */
  HARDWARE = 'Hardware',
  
  /** Problemas de software */
  SOFTWARE = 'Software',
  
  /** Problemas de red/conectividad */
  RED = 'Red',
  
  /** Problemas de seguridad */
  SEGURIDAD = 'Seguridad',
  
  /** Solicitud de acceso o permisos */
  ACCESO = 'Acceso',
  
  /** Consulta o solicitud de información */
  CONSULTA = 'Consulta',
  
  /** Otro tipo de incidencia */
  OTRO = 'Otro',
}

/**
 * Tipos de acción en el historial
 * 
 * Registra los diferentes tipos de cambios en una incidencia:
 * 
 * @enum {string}
 */
export enum TipoAccionHistorial {
  /** Creación de la incidencia */
  CREACION = 'creacion',
  
  /** Asignación a un responsable */
  ASIGNACION = 'asignacion',
  
  /** Cambio de estado */
  CAMBIO_ESTADO = 'estado',
  
  /** Cambio de prioridad */
  CAMBIO_PRIORIDAD = 'prioridad',
  
  /** Nuevo comentario agregado */
  COMENTARIO = 'comentario',
  
  /** Actualización de datos */
  ACTUALIZACION = 'actualizacion',
  
  /** Eliminación (soft delete) */
  ELIMINACION = 'eliminacion',
}

/**
 * Estados de un proyecto
 * 
 * @enum {string}
 */
export enum EstadoProyecto {
  /** Proyecto activo */
  ACTIVO = 'Activo',
  
  /** Proyecto inactivo o pausado */
  INACTIVO = 'Inactivo',
  
  /** Proyecto archivado */
  ARCHIVADO = 'Archivado',
  
  /** Proyecto completado */
  COMPLETADO = 'Completado',
}

/**
 * Formatos de exportación de reportes
 * 
 * @enum {string}
 */
export enum FormatoReporte {
  /** Formato PDF */
  PDF = 'pdf',
  
  /** Formato Excel */
  EXCEL = 'excel',
  
  /** Formato CSV */
  CSV = 'csv',
  
  /** Formato JSON */
  JSON = 'json',
}

/**
 * Tipos de tema visual
 * 
 * @enum {string}
 */
export enum TemaVisual {
  /** Tema claro */
  CLARO = 'claro',
  
  /** Tema oscuro */
  OSCURO = 'oscuro',
  
  /** Tema automático según preferencias del sistema */
  AUTO = 'auto',
}

/**
 * Canales de notificación
 * 
 * @enum {string}
 */
export enum CanalNotificacion {
  /** Notificaciones por correo electrónico */
  EMAIL = 'email',
  
  /** Notificaciones por SMS */
  SMS = 'sms',
  
  /** Notificaciones push en el navegador */
  PUSH = 'push',
  
  /** Notificaciones dentro de la aplicación */
  IN_APP = 'in-app',
}

/**
 * Tipos de filtro para búsquedas
 * 
 * @enum {string}
 */
export enum TipoFiltro {
  /** Filtro por estado */
  ESTADO = 'estado',
  
  /** Filtro por prioridad */
  PRIORIDAD = 'prioridad',
  
  /** Filtro por fecha */
  FECHA = 'fecha',
  
  /** Filtro por asignado */
  ASIGNADO = 'asignado',
  
  /** Filtro por proyecto */
  PROYECTO = 'proyecto',
  
  /** Filtro por categoría */
  CATEGORIA = 'categoria',
  
  /** Búsqueda de texto libre */
  TEXTO_LIBRE = 'texto-libre',
}

/**
 * Operadores de comparación para filtros
 * 
 * @enum {string}
 */
export enum OperadorComparacion {
  /** Igual a */
  IGUAL = 'eq',
  
  /** Diferente de */
  DIFERENTE = 'ne',
  
  /** Mayor que */
  MAYOR_QUE = 'gt',
  
  /** Mayor o igual que */
  MAYOR_IGUAL = 'gte',
  
  /** Menor que */
  MENOR_QUE = 'lt',
  
  /** Menor o igual que */
  MENOR_IGUAL = 'lte',
  
  /** Contiene (para strings) */
  CONTIENE = 'contains',
  
  /** Comienza con (para strings) */
  COMIENZA_CON = 'startsWith',
  
  /** Termina con (para strings) */
  TERMINA_CON = 'endsWith',
}

/**
 * Tipos de orden para sorting
 * 
 * @enum {string}
 */
export enum OrdenSort {
  /** Orden ascendente (A-Z, 0-9) */
  ASCENDENTE = 'asc',
  
  /** Orden descendente (Z-A, 9-0) */
  DESCENDENTE = 'desc',
}

/**
 * Códigos de estado HTTP más comunes
 * 
 * @enum {number}
 */
export enum HttpStatus {
  /** Solicitud exitosa */
  OK = 200,
  
  /** Recurso creado exitosamente */
  CREATED = 201,
  
  /** Solicitud aceptada, procesamiento pendiente */
  ACCEPTED = 202,
  
  /** Solicitud exitosa sin contenido */
  NO_CONTENT = 204,
  
  /** Solicitud incorrecta */
  BAD_REQUEST = 400,
  
  /** No autenticado */
  UNAUTHORIZED = 401,
  
  /** No autorizado (sin permisos) */
  FORBIDDEN = 403,
  
  /** Recurso no encontrado */
  NOT_FOUND = 404,
  
  /** Conflicto (ej: duplicado) */
  CONFLICT = 409,
  
  /** Error interno del servidor */
  INTERNAL_SERVER_ERROR = 500,
  
  /** Servicio no disponible */
  SERVICE_UNAVAILABLE = 503,
}

/**
 * Tipos de validación de formularios
 * 
 * @enum {string}
 */
export enum TipoValidacion {
  /** Campo requerido */
  REQUERIDO = 'required',
  
  /** Longitud mínima */
  MIN_LENGTH = 'minlength',
  
  /** Longitud máxima */
  MAX_LENGTH = 'maxlength',
  
  /** Patrón regex */
  PATTERN = 'pattern',
  
  /** Email válido */
  EMAIL = 'email',
  
  /** Valor mínimo (numérico) */
  MIN = 'min',
  
  /** Valor máximo (numérico) */
  MAX = 'max',
}
