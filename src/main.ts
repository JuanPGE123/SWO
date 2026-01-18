/**
 * main.ts
 * 
 * Punto de entrada de la aplicación Angular.
 * - Importa el módulo raíz (AppModule o bootstrap)
 * - Inicia la compilación Just-in-Time (JIT) o usa la compilación previa (AOT)
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
