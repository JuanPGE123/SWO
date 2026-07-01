/**
 * ════════════════════════════════════════════════════════════════════════════
 * CYPRESS E2E SUPPORT & HELPERS
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Archivo: cypress/support/e2e.ts
 * 
 * Propósito:
 * - Declarar comandos custom de Cypress
 * - Configurar hooks globales
 * - Helpers de autenticación y navegación
 * 
 * ════════════════════════════════════════════════════════════════════════════
 */

import './commands';

// ────────────────────────────────────────────────────────────────────────
// HOOKS GLOBALES
// ────────────────────────────────────────────────────────────────────────

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignorar errores específicos que no afectan el test
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  // Dejar que otros errores rompan el test
  return true;
});

// ────────────────────────────────────────────────────────────────────────
// COMANDOS CUSTOM
// ────────────────────────────────────────────────────────────────────────

/**
 * Comando: cy.login(email, password)
 * Propósito: Autenticarse en la aplicación
 */
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email, { delay: 100 });
  cy.get('input[name="password"]').type(password, { delay: 100 });
  cy.get('button[type="submit"]').click();
  cy.url().should('not.include', '/login');
  cy.get('.welcome-message').should('exist');
});

/**
 * Comando: cy.logout()
 * Propósito: Cerrar sesión
 */
Cypress.Commands.add('logout', () => {
  cy.get('button[aria-label="menu"]').click();
  cy.get('a[routerLink="/login"]').click();
  cy.url().should('include', '/login');
});

/**
 * Comando: cy.navigateTo(route)
 * Propósito: Navegar a una ruta específica
 */
Cypress.Commands.add('navigateTo', (route: string) => {
  cy.visit(route);
  cy.url().should('include', route);
});

/**
 * Comando: cy.createIncident(data)
 * Propósito: Crear una incidencia vía API
 */
Cypress.Commands.add('createIncident', (data) => {
  return cy.request({
    method: 'POST',
    url: '/api/incidents',
    body: data,
    headers: {
      'Authorization': `Bearer ${Cypress.env('authToken')}`
    }
  });
});

/**
 * Comando: cy.getStorageToken()
 * Propósito: Recuperar token de autenticación del localStorage
 */
Cypress.Commands.add('getStorageToken', () => {
  return cy.window().then((win) => {
    return win.localStorage.getItem('authToken');
  });
});

/**
 * Comando: cy.setStorageToken(token)
 * Propósito: Guardar token en localStorage
 */
Cypress.Commands.add('setStorageToken', (token: string) => {
  cy.window().then((win) => {
    win.localStorage.setItem('authToken', token);
  });
});

/**
 * Comando: cy.clearAuth()
 * Propósito: Limpiar datos de autenticación
 * Nota: AuthService usa sessionStorage con claves 'authToken' y 'usuarioAutenticado'
 */
Cypress.Commands.add('clearAuth', () => {
  cy.clearAllSessionStorage();
});

// ────────────────────────────────────────────────────────────────────────
// EXTENSIONES DEL TIPO DE CYPRESS
// ────────────────────────────────────────────────────────────────────────

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      login(email: string, password: string): Chainable<any>;
      logout(): Chainable<any>;
      navigateTo(route: string): Chainable<any>;
      createIncident(data: any): Chainable<any>;
      getStorageToken(): Chainable<string>;
      setStorageToken(token: string): Chainable<any>;
      clearAuth(): Chainable<any>;
    }
  }
}

export {};
