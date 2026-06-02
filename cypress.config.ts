/**
 * ════════════════════════════════════════════════════════════════════════════
 * CONFIGURACIÓN CYPRESS PARA SWO
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Archivo: cypress.config.ts
 * Ubicación: Raíz del proyecto
 * 
 * Propósito: Configurar el framework Cypress para pruebas E2E
 * 
 * ════════════════════════════════════════════════════════════════════════════
 */

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // ────────────────────────────────────────────────────────────────────
    // URLS
    // ────────────────────────────────────────────────────────────────────
    baseUrl: "http://localhost:4200",
    
    // ────────────────────────────────────────────────────────────────────
    // TIMEOUTS
    // ────────────────────────────────────────────────────────────────────
    defaultCommandTimeout: 5000,        // 5s para comandos normales
    requestTimeout: 5000,               // 5s para requests
    responseTimeout: 10000,             // 10s para respuestas
    execTimeout: 60000,                 // 60s para ejecución total
    
    // ────────────────────────────────────────────────────────────────────
    // VIEWPORT
    // ────────────────────────────────────────────────────────────────────
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // ────────────────────────────────────────────────────────────────────
    // ESPECIFICACIONES
    // ────────────────────────────────────────────────────────────────────
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    
    // ────────────────────────────────────────────────────────────────────
    // SCREENSSHOTS & VIDEOS
    // ────────────────────────────────────────────────────────────────────
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    trashAssetsBeforeRuns: true,
    video: false,  // Desactivar videos por defecto (activar para CI)
    
    // ────────────────────────────────────────────────────────────────────
    // NAVEGADOR
    // ────────────────────────────────────────────────────────────────────
    chromeWebSecurity: false,  // Desactivar CORS en desarrollo
    
    // ────────────────────────────────────────────────────────────────────
    // HOOKS GLOBALES
    // ────────────────────────────────────────────────────────────────────
    setupNodeEvents(on, config) {
      // Aquí se pueden añadir plugins y listeners
      // Ejemplo: cy.task() para comandos Node.js
      on("task", {
        log(message) {
          console.log("[CYPRESS]", message);
          return null;
        },
        table(data) {
          console.table(data);
          return null;
        }
      });
      
      return config;
    }
  },
  
  // ────────────────────────────────────────────────────────────────────
  // CONFIGURACIÓN GLOBAL (component & e2e)
  // ────────────────────────────────────────────────────────────────────
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack"
    },
    specPattern: "src/**/*.cy.ts"
  }
});
