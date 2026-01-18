/**
 * app.config.ts
 * 
 * Configuración de la aplicación Angular.
 * Define:
 * - Proveedores de la aplicación
 * - Configuración del enrutador
 * - Importaciones de módulos globales
 */

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

/**
 * Configuración principal de la aplicación
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
};
