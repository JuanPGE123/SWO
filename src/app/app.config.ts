/**
 * @fileoverview Configuración principal de la aplicación Angular
 * 
 * Define todos los providers y configuraciones globales necesarias para la aplicación:
 * - Configuración del router con estrategias de navegación
 * - Cliente HTTP con interceptores
 * - Animaciones del navegador
 * - Servicios globales
 * 
 * Este archivo es el punto de entrada de la configuración de la aplicación standalone
 * de Angular 17+, reemplazando el tradicional app.module.ts
 * 
 * @author Equipo SWO
 * @version 2.0.0
 * @since 2026-04-19
 */

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { httpInterceptor } from './core/interceptors/http.interceptor';

/**
 * Configuración principal de la aplicación
 * 
 * **Proveedores incluidos:**
 * - **Router**: Configurado con:
 *   - `withComponentInputBinding`: Permite pasar parámetros de ruta como @Input()
 *   - `withViewTransitions`: Habilita transiciones de vista suaves
 * 
 * - **HttpClient**: Configurado con:
 *   - `withFetch`: Usa Fetch API en lugar de XMLHttpRequest (mejor rendimiento)
 *   - `withInterceptors`: Registra el interceptor HTTP para manejo centralizado
 * 
 * - **Animations**: Habilita animaciones de Angular Material y personalizadas
 * 
 * @constant
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Configuración del router con funcionalidades modernas
    provideRouter(
      routes,
      withComponentInputBinding(), // Permite usar route params como inputs
      withViewTransitions() // Transiciones suaves entre vistas
    ),

    // Configuración del cliente HTTP con interceptor
    provideHttpClient(
      withFetch(), // Usa Fetch API moderna
      withInterceptors([httpInterceptor]) // Interceptor centralizado
    ),

    // Habilitar animaciones
    provideAnimations(),
  ]
};
