/**
 * @fileoverview Constantes globales de la aplicación SWO
 * 
 * Centraliza todos los valores constantes utilizados en la aplicación para:
 * - Evitar valores "mágicos" dispersos en el código
 * - Facilitar el mantenimiento y actualizaciones
 * - Mejorar la legibilidad y comprensión del código
 * - Garantizar consistencia en toda la aplicación
 * 
 * @author Equipo SWO
 * @version 2.0.0
 */

/**
 * Constantes de autenticación y seguridad
 */
export const AUTH_CONSTANTS = {
  /** Clave para almacenar el usuario autenticado en sessionStorage */
  SESSION_USER_KEY: 'usuarioAutenticado',
  
  /** Clave para almacenar el token JWT en sessionStorage */
  SESSION_TOKEN_KEY: 'authToken',
  
  /** Tiempo de expiración de la sesión en milisegundos (30 minutos) */
  SESSION_TIMEOUT: 30 * 60 * 1000,
  
  /** Email del usuario master (solo para desarrollo) */
  MASTER_EMAIL: 'master@swo.com',
  
  /** Password del usuario master (solo para desarrollo) */
  MASTER_PASSWORD: '123456',
  
  /** Rol por defecto para nuevos usuarios */
  DEFAULT_ROLE: 'Usuario',
} as const;

/**
 * Constantes de mensajes de notificación
 */
export const NOTIFICATION_MESSAGES = {
  /** Mensajes de éxito */
  SUCCESS: {
    LOGIN: '¡Autenticación exitosa! Bienvenido al sistema SWO',
    LOGOUT: 'Sesión cerrada correctamente',
    INCIDENT_CREATED: 'Incidencia creada exitosamente',
    INCIDENT_UPDATED: 'Incidencia actualizada correctamente',
    INCIDENT_DELETED: 'Incidencia eliminada correctamente',
    USER_CREATED: 'Usuario registrado exitosamente',
    USER_UPDATED: 'Usuario actualizado correctamente',
    USER_DELETED: 'Usuario eliminado correctamente',
    PROJECT_CREATED: 'Proyecto creado exitosamente',
    PROJECT_UPDATED: 'Proyecto actualizado correctamente',
    STATE_CHANGED: 'Estado actualizado correctamente',
    PRIORITY_CHANGED: 'Prioridad actualizada correctamente',
    ASSIGNED: 'Incidencia asignada correctamente',
  },
  
  /** Mensajes de error */
  ERROR: {
    INVALID_CREDENTIALS: 'Credenciales incorrectas. Verifica tu correo y contraseña',
    USER_DELETED: 'Este usuario no existe en la plataforma. Contacta con tu supervisor',
    REQUIRED_FIELDS: 'Por favor completa todos los campos obligatorios',
    SERVER_ERROR: 'Error en el servidor. Por favor, intenta más tarde',
    NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet',
    UNAUTHORIZED: 'No tienes permisos para realizar esta acción',
    NOT_FOUND: 'El recurso solicitado no fue encontrado',
    INVALID_DATA: 'Los datos ingresados no son válidos',
    GENERIC: 'Ha ocurrido un error inesperado',
  },
  
  /** Mensajes de advertencia */
  WARNING: {
    UNSAVED_CHANGES: 'Tienes cambios sin guardar. ¿Deseas continuar?',
    DELETE_CONFIRM: '¿Estás seguro de eliminar este elemento?',
    LOGOUT_CONFIRM: '¿Estás seguro de cerrar sesión?',
    OFFLINE_MODE: 'Sin conexión al servidor. Los cambios se guardarán localmente',
    SESSION_EXPIRING: 'Tu sesión está por expirar. ¿Deseas continuar?',
  },
  
  /** Mensajes informativos */
  INFO: {
    LOADING: 'Cargando...',
    SAVING: 'Guardando...',
    PROCESSING: 'Procesando...',
    NO_DATA: 'No hay datos disponibles',
    NO_RESULTS: 'No se encontraron resultados',
    EMPTY_LIST: 'La lista está vacía',
  },
} as const;

/**
 * Constantes de configuración de UI
 */
export const UI_CONSTANTS = {
  /** Duración por defecto de las notificaciones toast en milisegundos */
  TOAST_DURATION: 3000,
  
  /** Duración extendida para mensajes importantes */
  TOAST_DURATION_LONG: 5000,
  
  /** Duración corta para mensajes breves */
  TOAST_DURATION_SHORT: 2000,
  
  /** Número de items por página en tablas */
  ITEMS_PER_PAGE: 10,
  
  /** Número máximo de incidencias recientes a mostrar */
  MAX_RECENT_INCIDENTS: 5,
  
  /** Número máximo de notificaciones a mostrar */
  MAX_NOTIFICATIONS: 10,
  
  /** Delay para el debounce de búsqueda en milisegundos */
  SEARCH_DEBOUNCE_TIME: 300,
} as const;

/**
 * Constantes de validación de formularios
 */
export const VALIDATION_CONSTANTS = {
  /** Longitud mínima de contraseña */
  PASSWORD_MIN_LENGTH: 6,
  
  /** Longitud máxima de contraseña */
  PASSWORD_MAX_LENGTH: 50,
  
  /** Longitud mínima de título de incidencia */
  TITLE_MIN_LENGTH: 5,
  
  /** Longitud máxima de título de incidencia */
  TITLE_MAX_LENGTH: 200,
  
  /** Longitud mínima de descripción */
  DESCRIPTION_MIN_LENGTH: 10,
  
  /** Longitud máxima de descripción */
  DESCRIPTION_MAX_LENGTH: 2000,
  
  /** Longitud mínima de nombre de usuario */
  NAME_MIN_LENGTH: 2,
  
  /** Longitud máxima de nombre de usuario */
  NAME_MAX_LENGTH: 100,
  
  /** Patrón regex para validación de email */
  EMAIL_PATTERN: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  
  /** Patrón regex para validación de teléfono colombiano */
  PHONE_PATTERN: /^(\+57|57)?[0-9]{10}$/,
} as const;

/**
 * Constantes de formato de fecha y hora
 */
export const DATE_CONSTANTS = {
  /** Formato de fecha corta (DD/MM/YYYY) */
  SHORT_DATE_FORMAT: 'dd/MM/yyyy',
  
  /** Formato de fecha larga (DD de MMMM de YYYY) */
  LONG_DATE_FORMAT: 'dd \'de\' MMMM \'de\' yyyy',
  
  /** Formato de fecha y hora (DD/MM/YYYY HH:mm) */
  DATETIME_FORMAT: 'dd/MM/yyyy HH:mm',
  
  /** Formato de hora (HH:mm:ss) */
  TIME_FORMAT: 'HH:mm:ss',
  
  /** Locale para fechas en español */
  LOCALE: 'es-CO',
} as const;

/**
 * Constantes de rutas de la aplicación
 */
export const ROUTES = {
  /** Ruta de login */
  LOGIN: '/login',
  
  /** Ruta del dashboard */
  DASHBOARD: '/dashboard',
  
  /** Ruta de incidencias */
  INCIDENTS: '/incidents',
  
  /** Ruta de usuarios */
  USERS: '/users',
  
  /** Ruta de proyectos */
  PROJECTS: '/projects',
  
  /** Ruta de reportes */
  REPORTS: '/reports',
  
  /** Ruta del chatbot */
  CHATBOT: '/chatbot',
  
  /** Ruta de página no encontrada */
  NOT_FOUND: '/404',
  
  /** Ruta de no autorizado */
  UNAUTHORIZED: '/403',
} as const;

/**
 * Constantes de API endpoints
 */
export const API_ENDPOINTS = {
  /** Endpoint de autenticación */
  LOGIN: '/login',
  
  /** Endpoint de logout */
  LOGOUT: '/logout',
  
  /** Endpoint de incidencias */
  INCIDENTS: '/incidencias',
  
  /** Endpoint de usuarios */
  USERS: '/usuarios',
  
  /** Endpoint de proyectos */
  PROJECTS: '/proyectos',
  
  /** Endpoint de reportes */
  REPORTS: '/reportes',
  
  /** Endpoint del chatbot */
  CHATBOT: '/chatbot',
  
  /** Endpoint de estadísticas */
  STATS: '/estadisticas',
} as const;

/**
 * Constantes de configuración de almacenamiento
 */
export const STORAGE_CONSTANTS = {
  /** Prefijo para todas las claves de localStorage */
  PREFIX: 'swo_',
  
  /** Versión del esquema de datos almacenados */
  SCHEMA_VERSION: '1.0',
  
  /** Tamaño máximo de almacenamiento en bytes (5MB) */
  MAX_STORAGE_SIZE: 5 * 1024 * 1024,
} as const;

/**
 * Constantes de roles de usuario
 */
export const USER_ROLES = {
  /** Rol de administrador (acceso total) */
  ADMIN: 'Administrador',
  
  /** Rol de analista/técnico (gestión de incidencias) */
  ANALYST: 'Analista',
  
  /** Rol de técnico */
  TECHNICIAN: 'Técnico',
  
  /** Rol de usuario final (reportar incidencias) */
  USER: 'Usuario',
} as const;

/**
 * Constantes de permisos
 */
export const PERMISSIONS = {
  /** Permisos de administrador */
  ADMIN: {
    CAN_MANAGE_USERS: true,
    CAN_MANAGE_PROJECTS: true,
    CAN_MANAGE_INCIDENTS: true,
    CAN_VIEW_REPORTS: true,
    CAN_DELETE: true,
  },
  
  /** Permisos de analista */
  ANALYST: {
    CAN_MANAGE_USERS: false,
    CAN_MANAGE_PROJECTS: false,
    CAN_MANAGE_INCIDENTS: true,
    CAN_VIEW_REPORTS: true,
    CAN_DELETE: false,
  },
  
  /** Permisos de usuario */
  USER: {
    CAN_MANAGE_USERS: false,
    CAN_MANAGE_PROJECTS: false,
    CAN_MANAGE_INCIDENTS: false,
    CAN_VIEW_REPORTS: false,
    CAN_DELETE: false,
  },
} as const;

/**
 * Constantes de configuración de HTTP
 */
export const HTTP_CONSTANTS = {
  /** Timeout para peticiones HTTP en milisegundos (30 segundos) */
  REQUEST_TIMEOUT: 30000,
  
  /** Número máximo de reintentos para peticiones fallidas */
  MAX_RETRIES: 3,
  
  /** Delay entre reintentos en milisegundos */
  RETRY_DELAY: 1000,
  
  /** Content-Type por defecto */
  DEFAULT_CONTENT_TYPE: 'application/json',
} as const;

/**
 * Constantes de iconos (emojis) para la interfaz
 */
export const ICONS = {
  DASHBOARD: '📊',
  INCIDENTS: '🎫',
  USERS: '👥',
  PROJECTS: '🗂️',
  REPORTS: '📈',
  CHATBOT: '🤖',
  SUCCESS: '✓',
  ERROR: '✕',
  WARNING: '⚠',
  INFO: 'ℹ',
  LOADING: '⏳',
  SETTINGS: '⚙️',
  LOGOUT: '🚪',
  SEARCH: '🔍',
  FILTER: '🔎',
  EDIT: '✏️',
  DELETE: '🗑️',
  ADD: '➕',
  SAVE: '💾',
  CANCEL: '❌',
} as const;
