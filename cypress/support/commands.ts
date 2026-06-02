/**
 * ════════════════════════════════════════════════════════════════════════════
 * CYPRESS COMMANDS - HELPERS REUTILIZABLES
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Archivo: cypress/support/commands.ts
 * 
 * Propósito: Definir comandos custom adicionales
 * 
 * ════════════════════════════════════════════════════════════════════════════
 */

/**
 * Comando: cy.dataTest(value)
 * Propósito: Selector mediante atributo data-test
 * Uso: <button data-test="submit-btn"></button>
 *      cy.dataTest('submit-btn').click();
 */
Cypress.Commands.add('dataTest', (value) => {
  return cy.get(`[data-test="${value}"]`);
});

/**
 * Comando: cy.fillForm(data)
 * Propósito: Llenar un formulario completo
 * Uso: cy.fillForm({ email: 'test@example.com', password: '123456' })
 */
Cypress.Commands.add('fillForm', (data: Record<string, string>) => {
  Object.keys(data).forEach((key) => {
    cy.get(`input[name="${key}"]`).type(data[key]);
  });
});

/**
 * Comando: cy.selectDropdown(label, option)
 * Propósito: Seleccionar opción de dropdown
 */
Cypress.Commands.add('selectDropdown', (label: string, option: string) => {
  cy.get(`label:contains("${label}")`).parent().find('select').select(option);
});

/**
 * Comando: cy.waitForElement(selector, timeout)
 * Propósito: Esperar a que aparezca un elemento
 */
Cypress.Commands.add('waitForElement', (selector: string, timeout = 5000) => {
  return cy.get(selector, { timeout });
});

/**
 * Comando: cy.assertVisible(selector)
 * Propósito: Verificar que un elemento es visible
 */
Cypress.Commands.add('assertVisible', (selector: string) => {
  cy.get(selector).should('be.visible');
});

/**
 * Comando: cy.assertHidden(selector)
 * Propósito: Verificar que un elemento está oculto
 */
Cypress.Commands.add('assertHidden', (selector: string) => {
  cy.get(selector).should('not.be.visible');
});

/**
 * Comando: cy.assertText(selector, text)
 * Propósito: Verificar que un elemento contiene texto específico
 */
Cypress.Commands.add('assertText', (selector: string, text: string) => {
  cy.get(selector).should('contain.text', text);
});

/**
 * Comando: cy.mockApi(method, url, fixture, statusCode)
 * Propósito: Mockear una petición HTTP
 */
Cypress.Commands.add('mockApi', (method, url, fixture, statusCode = 200) => {
  cy.intercept(method, url, {
    statusCode: statusCode,
    fixture: fixture
  });
});

export {};
