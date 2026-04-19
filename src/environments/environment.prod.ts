/**
 * @fileoverview Configuración de entorno para PRODUCCIÓN
 * 
 * Este archivo contiene todas las variables de configuración específicas
 * para el entorno de producción.
 * 
 * **IMPORTANTE:**
 * - Este archivo se usa cuando se hace build con: ng build --configuration production
 * - NUNCA commitear credenciales reales o URLs de producción
 * - Usar variables de entorno del servidor para datos sensibles
 * - Revisar todas las URLs y configuraciones antes del deploy
 * 
 * **Proceso de deploy:**
 * 1. Actualizar apiUrl con la URL real del servidor
 * 2. Deshabilitar feature flags que no estén listos
 * 3. Ejecutar: ng build --configuration production --base-href /SWO/
 * 4. Los archivos generados estarán en dist/ listos para deploy
 * 
 * @author Equipo SWO
 * @version 2.0.0
 * @since 2026-04-19
 */

/**
 * Configuración del entorno de producción
 */
export const environment = {
  /**
   * Indica que la aplicación está corriendo en modo producción
   * - Logging deshabilitado
   * - Optimizaciones habilitadas
   * - Sin debugging
   */
  production: true,

  /**
   * URL base de la API REST del backend en producción
   * 
   * **IMPORTANTE:** Actualizar con la URL real del servidor de producción
   * 
   * Ejemplos:
   * - Servidor local: 'http://192.168.1.100:8080/SWO/api'
   * - Servidor remoto: 'https://api.swo.empresa.com/api'
   * - Azure: 'https://swo-backend.azurewebsites.net/api'
   */
  apiUrl: 'http://localhost:8080/SWO/api', // ⚠️ ACTUALIZAR ANTES DE DEPLOY

  /**
   * URL base de la aplicación frontend en producción
   */
  appUrl: 'http://localhost/SWO', // ⚠️ ACTUALIZAR ANTES DE DEPLOY

  /**
   * Configuración de logging
   * En producción, solo errores críticos
   */
  enableLogging: false,
  
  /**
   * Nivel de logging: solo errores en producción
   */
  logLevel: 'error',

  /**
   * Deshabilitar modo de desarrollo del chatbot
   * En producción debe usar el servicio real
   */
  chatbotDevMode: false,

  /**
   * Timeout para peticiones HTTP en milisegundos
   * Mayor timeout en producción por posible latencia de red
   */
  httpTimeout: 60000,

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
   * Solo habilitar características que estén completamente probadas
   */
  features: {
    /** Habilitar chatbot */
    enableChatbot: true,
    
    /** Habilitar reportes */
    enableReports: true,
    
    /** Habilitar notificaciones push */
    enablePushNotifications: false, // ⚠️ Habilitar cuando esté configurado
    
    /** Habilitar modo offline */
    enableOfflineMode: false, // ⚠️ Habilitar cuando esté implementado
  },
};
