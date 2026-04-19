/**
 * @fileoverview Configuración de entorno para DESARROLLO
 * 
 * Este archivo contiene todas las variables de configuración específicas
 * para el entorno de desarrollo local.
 * 
 * **IMPORTANTE:**
 * - NO commitear credenciales reales en este archivo
 * - Usar variables de entorno del sistema para datos sensibles en producción
 * - Este archivo es reemplazado automáticamente al hacer build con --configuration production
 * 
 * **Uso:**
 * ```typescript
 * import { environment } from 'src/environments/environment';
 * 
 * const apiUrl = environment.apiUrl; // 'http://localhost:8080/SWO/api'
 * ```
 * 
 * @author Equipo SWO
 * @version 2.0.0
 * @since 2026-04-19
 */

/**
 * Configuración del entorno de desarrollo
 */
export const environment = {
  /**
   * Indica si la aplicación está corriendo en modo producción
   * - false: modo desarrollo (logging habilitado, debugging, etc.)
   * - true: modo producción (optimizaciones, sin logging)
   */
  production: false,

  /**
   * URL base de la API REST del backend
   * 
   * **Desarrollo local:**
   * - Backend Java corriendo en Tomcat local en puerto 8080
   * - Contexto: /SWO
   * - Prefijo de API: /api
   * 
   * **Nota:** Asegúrate que el backend esté corriendo antes de iniciar el frontend
   */
  apiUrl: 'http://localhost:8080/SWO/api',

  /**
   * URL base de la aplicación frontend
   * Usado para construir URLs absolutas cuando sea necesario
   */
  appUrl: 'http://localhost:4200',

  /**
   * Configuración de logging
   */
  enableLogging: true,
  
  /**
   * Nivel de logging: 'debug' | 'info' | 'warn' | 'error'
   */
  logLevel: 'debug',

  /**
   * Habilitar modo de desarrollo del chatbot (respuestas simuladas)
   */
  chatbotDevMode: true,

  /**
   * Timeout para peticiones HTTP en milisegundos
   */
  httpTimeout: 30000,

  /**
   * Versión de la aplicación (debe coincidir con package.json)
   */
  version: '1.0.0',

  /**
   * Nombre de la aplicación
   */
  appName: 'SWO - Sistema de Gestión de Incidencias',

  /**
   * Configuración de características (feature flags)
   */
  features: {
    /** Habilitar chatbot */
    enableChatbot: true,
    
    /** Habilitar reportes */
    enableReports: true,
    
    /** Habilitar notificaciones push */
    enablePushNotifications: false,
    
    /** Habilitar modo offline */
    enableOfflineMode: false,
  },
};
