/**
 * @fileoverview Interceptor HTTP para manejo centralizado de peticiones y respuestas
 * 
 * Este interceptor actúa como middleware entre la aplicación y las peticiones HTTP,
 * proporcionando funcionalidades transversales:
 * 
 * **Funcionalidades implementadas:**
 * - Inyección automática de tokens de autenticación en headers
 * - Manejo centralizado y consistente de errores HTTP
 * - Logging de peticiones y respuestas (en modo desarrollo)
 * - Transformación de errores del servidor a mensajes amigables
 * - Redirección automática en caso de errores de autenticación
 * - Implementación de timeout para peticiones largas
 * - Retry logic para peticiones fallidas por problemas de red
 * 
 * **Uso:**
 * Este interceptor se registra automáticamente en app.config.ts mediante:
 * ```typescript
 * provideHttpClient(withInterceptors([httpInterceptor]))
 * ```
 * 
 * No requiere uso explícito en componentes o servicios, se aplica automáticamente
 * a todas las peticiones HttpClient.
 * 
 * @author Equipo SWO
 * @version 2.0.0
 * @since 2026-04-19
 */

import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, timeout, retry } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { AUTH_CONSTANTS, NOTIFICATION_MESSAGES, HTTP_CONSTANTS, ROUTES } from '../constants/app.constants';
import { HttpStatus, TipoNotificacion } from '../enums/app.enums';
import { environment } from '../../../environments/environment';

/**
 * Interceptor funcional de HTTP para Angular 17+
 * 
 * Intercepta todas las peticiones HTTP salientes y respuestas entrantes para:
 * 1. Agregar headers de autenticación
 * 2. Aplicar timeout
 * 3. Implementar retry logic
 * 4. Manejar errores de manera centralizada
 * 5. Logging en desarrollo
 * 
 * @param req - La petición HTTP que se está realizando
 * @param next - El siguiente handler en la cadena de interceptores
 * @returns Observable con la respuesta HTTP o error manejado
 * 
 * @example
 * // No requiere uso directo, se aplica automáticamente:
 * this.http.get('/api/users') // Ya incluye el interceptor
 */
export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  // Inyectar servicios necesarios
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  // ─────────────────────────────────────────────────────────────────────
  // 1. AGREGAR TOKEN DE AUTENTICACIÓN (si existe)
  // ─────────────────────────────────────────────────────────────────────
  const token = sessionStorage.getItem(AUTH_CONSTANTS.SESSION_TOKEN_KEY);
  let clonedRequest = req;

  if (token) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // ─────────────────────────────────────────────────────────────────────
  // 2. AGREGAR CONTENT-TYPE si no está presente (para POST/PUT)
  // ─────────────────────────────────────────────────────────────────────
  if (
    (req.method === 'POST' || req.method === 'PUT') &&
    !req.headers.has('Content-Type') &&
    !(req.body instanceof FormData) // No agregar Content-Type si es FormData
  ) {
    clonedRequest = clonedRequest.clone({
      setHeaders: {
        'Content-Type': HTTP_CONSTANTS.DEFAULT_CONTENT_TYPE,
      },
    });
  }

  // ─────────────────────────────────────────────────────────────────────
  // 3. LOGGING EN DESARROLLO
  // ─────────────────────────────────────────────────────────────────────
  if (!environment.production) {
    console.group(`🌐 HTTP ${clonedRequest.method} Request`);
    console.log('URL:', clonedRequest.url);
    console.log('Headers:', clonedRequest.headers);
    console.log('Body:', clonedRequest.body);
    console.groupEnd();
  }

  // ─────────────────────────────────────────────────────────────────────
  // 4. EJECUTAR LA PETICIÓN CON TIMEOUT Y RETRY
  // ─────────────────────────────────────────────────────────────────────
  return next(clonedRequest).pipe(
    // Aplicar timeout para evitar peticiones colgadas
    timeout(HTTP_CONSTANTS.REQUEST_TIMEOUT),

    // Implementar retry logic solo para errores de red (no para errores 4xx o 5xx)
    retry({
      count: HTTP_CONSTANTS.MAX_RETRIES,
      delay: (error, retryCount) => {
        // Solo reintentar en errores de red, no en errores de servidor
        if (error instanceof HttpErrorResponse && error.status >= 400 && error.status < 600) {
          throw error; // No reintentar errores de servidor
        }
        
        if (!environment.production) {
          console.warn(`⚠️ Reintento ${retryCount} de ${HTTP_CONSTANTS.MAX_RETRIES}`);
        }
        
        // Delay exponencial: 1s, 2s, 4s...
        return new Promise(resolve => 
          setTimeout(resolve, HTTP_CONSTANTS.RETRY_DELAY * Math.pow(2, retryCount - 1))
        );
      },
    }),

    // ─────────────────────────────────────────────────────────────────
    // 5. MANEJO CENTRALIZADO DE ERRORES
    // ─────────────────────────────────────────────────────────────────
    catchError((error: HttpErrorResponse) => {
      // Logging del error en desarrollo
      if (!environment.production) {
        console.group('❌ HTTP Error');
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('Error:', error.error);
        console.groupEnd();
      }

      // Determinar el mensaje de error apropiado
      const errorMessage = determinarMensajeError(error);

      // Mostrar notificación al usuario
      notificationService.toast(errorMessage, 4000, TipoNotificacion.ERROR);

      // ─────────────────────────────────────────────────────────────
      // 6. MANEJO ESPECÍFICO POR CÓDIGO DE ERROR
      // ─────────────────────────────────────────────────────────────

      switch (error.status) {
        case HttpStatus.UNAUTHORIZED:
          // 401 - No autenticado: redirigir a login
          handleUnauthorized(router);
          break;

        case HttpStatus.FORBIDDEN:
          // 403 - Sin permisos: redirigir a página de no autorizado
          handleForbidden(router);
          break;

        case HttpStatus.NOT_FOUND:
          // 404 - Recurso no encontrado
          // No redirigir, solo mostrar mensaje
          break;

        case HttpStatus.INTERNAL_SERVER_ERROR:
        case HttpStatus.SERVICE_UNAVAILABLE:
          // 500, 503 - Error de servidor
          // Podría implementarse un reintentar más tarde
          break;

        case 0:
          // Error de red (sin conexión)
          // Ya mostrado en el mensaje
          break;

        default:
          // Otros errores
          break;
      }

      // Propagar el error para que los servicios puedan manejarlo si necesitan
      return throwError(() => error);
    })
  );
};

/**
 * Determina el mensaje de error apropiado basado en el HttpErrorResponse
 * 
 * Traduce códigos de error HTTP y errores de red a mensajes amigables
 * para el usuario final, evitando mostrar detalles técnicos confusos.
 * 
 * @param error - El error HTTP recibido
 * @returns Mensaje de error amigable para mostrar al usuario
 * 
 * @private
 */
function determinarMensajeError(error: HttpErrorResponse): string {
  // Verificar si el backend envió un mensaje de error personalizado
  if (error.error?.message) {
    return error.error.message;
  }

  if (error.error?.error) {
    return error.error.error;
  }

  // Mensajes basados en código de estado HTTP
  switch (error.status) {
    case HttpStatus.BAD_REQUEST:
      return NOTIFICATION_MESSAGES.ERROR.INVALID_DATA;

    case HttpStatus.UNAUTHORIZED:
      return NOTIFICATION_MESSAGES.ERROR.INVALID_CREDENTIALS;

    case HttpStatus.FORBIDDEN:
      return NOTIFICATION_MESSAGES.ERROR.UNAUTHORIZED;

    case HttpStatus.NOT_FOUND:
      return NOTIFICATION_MESSAGES.ERROR.NOT_FOUND;

    case HttpStatus.CONFLICT:
      return 'El recurso ya existe o hay un conflicto con el estado actual';

    case HttpStatus.INTERNAL_SERVER_ERROR:
      return NOTIFICATION_MESSAGES.ERROR.SERVER_ERROR;

    case HttpStatus.SERVICE_UNAVAILABLE:
      return 'El servicio no está disponible temporalmente. Por favor, intenta más tarde';

    case 0:
      // Error de red (sin conexión, CORS, etc.)
      return NOTIFICATION_MESSAGES.ERROR.NETWORK_ERROR;

    default:
      // Error genérico para códigos no manejados específicamente
      return `${NOTIFICATION_MESSAGES.ERROR.GENERIC} (Código: ${error.status})`;
  }
}

/**
 * Maneja errores 401 (No autenticado)
 * 
 * Limpia la sesión y redirige al login
 * 
 * @param router - Instancia del Router de Angular
 * @private
 */
function handleUnauthorized(router: Router): void {
  // Limpiar sesión
  sessionStorage.removeItem(AUTH_CONSTANTS.SESSION_USER_KEY);
  sessionStorage.removeItem(AUTH_CONSTANTS.SESSION_TOKEN_KEY);

  // Redirigir a login
  router.navigate([ROUTES.LOGIN], {
    queryParams: { returnUrl: router.url },
  });
}

/**
 * Maneja errores 403 (Sin permisos)
 * 
 * Redirige a página de no autorizado
 * 
 * @param router - Instancia del Router de Angular
 * @private
 */
function handleForbidden(router: Router): void {
  // Redirigir a página de no autorizado (si existe)
  // Si no existe, mostrar el error y mantener en la página actual
  if (router.config.some(route => route.path === '403')) {
    router.navigate([ROUTES.UNAUTHORIZED]);
  }
}

/**
 * Función helper para logging de peticiones exitosas (opcional)
 * 
 * Puede ser utilizada para auditoría o debugging
 * 
 * @param req - La petición HTTP
 * @param response - La respuesta HTTP
 * @private
 */
function logSuccessfulRequest(req: HttpRequest<any>, response: any): void {
  if (!environment.production) {
    console.group(`✅ HTTP ${req.method} Success`);
    console.log('URL:', req.url);
    console.log('Response:', response);
    console.groupEnd();
  }
}
