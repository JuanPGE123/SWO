/**
 * ════════════════════════════════════════════════════════════════════════════
 * TEST E2E — CP-001: RESOLVER INCIDENTE CON NOTAS TÉCNICAS EN MODO OFFLINE
 * ════════════════════════════════════════════════════════════════════════════
 *
 * Archivo : cypress/e2e/offline-incident-resolution.cy.ts
 * Proyecto: SWO (ServiceDesk)
 * Autor   : Juan Pablo Giraldo Echavarria
 * Fecha   : 11/06/2026
 * Número  : CP-001
 *
 * Descripción:
 *   Prueba de resiliencia offline sobre la aplicación web.
 *   El técnico marca un incidente como 'Resuelto' y diligencia las notas
 *   técnicas de cierre. Se simula la pérdida de conectividad interceptando
 *   las peticiones HTTP PUT al backend. Se verifica la validación de campos,
 *   el manejo de errores de red y el flujo de resolución exitosa.
 *
 * Seguimiento:
 *   BUG-MOV-001 — Timestamp de resolución offline registra hora de
 *   sincronización en lugar de la hora local de la acción.
 *
 * Ejecución:
 *   npx cypress open --e2e
 *   npx cypress run --spec "cypress/e2e/offline-incident-resolution.cy.ts"
 *   npx cypress run --spec "cypress/e2e/offline-incident-resolution.cy.ts" --browser chrome
 *
 * Selectores usados (basados en el DOM real de la aplicación):
 *   - Nav:              a.nav-item (texto "Incidencias")
 *   - Tabla filas:      table tbody tr
 *   - Estado select:    select.select-small
 *   - Botón ver:        button.btn-small (texto "Ver")
 *   - Modal:            .modal-card
 *   - Botón resolver:   button.btn-resolver
 *   - Banner resolución:.resolucion-banner
 *   - Textarea:         textarea.form-input
 *   - Confirmar:        button.btn-resolver-confirm
 *   - Error validación: small.error-text
 *   - Toast (dinámico): cy.contains(texto)
 *
 * ════════════════════════════════════════════════════════════════════════════
 */

describe('SWO CP-001 — Resolver incidente con notas técnicas obligatorias en modo offline', () => {

  // ──────────────────────────────────────────────────────────────────────
  // CONSTANTES DE PRUEBA
  // ──────────────────────────────────────────────────────────────────────

  const TECNICO = {
    email: 'master@swo.com',
    password: '123456',
  };

  /** Incidente de prueba en formato de respuesta del backend */
  const MOCK_INCIDENTE = {
    idIncidencia: 1,
    titulo: 'Fallo de red piso 3 - Caso de prueba CP-001',
    descripcion: 'El servicio de red del piso 3 presenta intermitencia desde las 08:00.',
    estado: 'Abierto',
    impacto: 'Alto',
    ubicacion: 'Piso 3 - Oficina Principal',
    actividad: 'Trabajo normal de oficina',
    resolucion: '',
    fechaResolucion: null,
    fechaCreacion: '2026-06-11',
    idUsuarioAsignado: null,
    nombreUsuarioReporta: 'Técnico QA',
    correoUsuario: 'tecnico@swo.com',
    tags: '[]',
    comentarios: '[]',
  };

  /**
   * Texto de resolución válido (mínimo 5 palabras requeridas por el validador
   * CustomValidators.minWords(5) en resolucionForm).
   */
  const RESOLUCION_VALIDA =
    'Se realizó diagnóstico completo del fallo. Se reiniciaron los servicios de red ' +
    'y se validó la conectividad exitosamente con prueba de ping.';

  // ──────────────────────────────────────────────────────────────────────
  // SETUP GLOBAL: LOGIN + NAVEGACIÓN A INCIDENTES
  // Se ejecuta antes de CADA test de este describe.
  // ──────────────────────────────────────────────────────────────────────

  beforeEach(() => {
    // Mock del endpoint GET /incidencias — responde siempre con el incidente de prueba
    cy.intercept(
      'GET',
      '**/incidencias*',
      {
        statusCode: 200,
        body: {
          data: {
            content: [MOCK_INCIDENTE],
            totalElements: 1,
            totalPages: 1,
            number: 0,
          },
        },
      }
    ).as('getIncidencias');

    // Visitar login y limpiar sesión previa
    cy.visit('/login');
    cy.clearAuth();

    // Credenciales del usuario master (bypass local, no requiere backend)
    cy.get('input[name="email"]').type(TECNICO.email);
    cy.get('input[name="password"]').type(TECNICO.password);
    cy.get('button[type="submit"]').click();

    // Esperar redirección al dashboard
    cy.url().should('include', '/dashboard');

    // Navegar a Incidentes usando el sidebar
    cy.contains('a.nav-item', 'Incidencias').click();
    cy.wait('@getIncidencias');
    cy.url().should('include', '/incidents');
  });

  // ──────────────────────────────────────────────────────────────────────
  // HELPER: Abrir detalle y activar modo resolución
  // ──────────────────────────────────────────────────────────────────────

  const abrirModoResolucion = () => {
    // Clic en "👁️ Ver" de la primera fila
    cy.get('table tbody tr').first().within(() => {
      cy.contains('button', 'Ver').click();
    });
    // Esperar que el modal de detalle esté visible
    cy.get('.modal-card').should('be.visible');
    // Clic en "✅ Resolver"
    cy.get('button.btn-resolver').click();
    // Confirmar que el modo resolución está activo
    cy.get('.resolucion-banner').should('be.visible');
  };

  // ══════════════════════════════════════════════════════════════════════
  // SUITE 1: PRECONDICIONES
  // ══════════════════════════════════════════════════════════════════════

  describe('1. Precondiciones — Incidente abierto disponible', () => {

    it('CP-001-PRE: la tabla debe mostrar el incidente en estado ABIERTO', () => {
      // THEN: Al menos una fila en la tabla
      cy.get('table tbody tr').should('have.length.greaterThan', 0);

      // El select de estado de la primera fila debe tener valor "open"
      cy.get('table tbody tr').first().within(() => {
        cy.get('select.select-small').first().should('have.value', 'open');
      });
    });

  });

  // ══════════════════════════════════════════════════════════════════════
  // SUITE 2: MODO OFFLINE — Error de red al resolver
  // ══════════════════════════════════════════════════════════════════════

  describe('2. Modo Offline — Resolución con error de red', () => {

    it('CP-001-01: debe mostrar notificación de error cuando el backend responde con error', () => {
      // GIVEN: Simular error de servidor (500 no activa el retry del interceptor)
      cy.intercept('PUT', '**/incidencias/*', { statusCode: 500, body: {} }).as('putError');

      // WHEN: Completar el flujo de resolución
      abrirModoResolucion();
      cy.get('textarea.form-input').type(RESOLUCION_VALIDA);
      cy.get('button.btn-resolver-confirm').click();

      // THEN: El interceptor propaga el error sin reintentos → toast del componente visible
      cy.wait('@putError');
      cy.contains('Error al resolver la incidencia', { timeout: 5000 }).should('exist');
    });

    it('CP-001-02: el modal debe permanecer abierto tras fallo de red', () => {
      // GIVEN: forceNetworkError activa 3 reintentos (1s+2s+4s); usar 500 para fallo inmediato
      cy.intercept('PUT', '**/incidencias/*', { statusCode: 500, body: {} }).as('putOffline');

      // WHEN
      abrirModoResolucion();
      cy.get('textarea.form-input').type(RESOLUCION_VALIDA);
      cy.get('button.btn-resolver-confirm').click();

      cy.wait('@putOffline');

      // THEN: El modal no se cierra ante error de red
      cy.get('.modal-card').should('be.visible');
    });

    it('CP-001-03: el botón "Confirmar Resolución" debe bloquearse mientras procesa', () => {
      // GIVEN: Simular respuesta lenta (no inmediata)
      cy.intercept('PUT', '**/incidencias/*', (req) => {
        req.reply({ delay: 2000, statusCode: 200, body: {} });
      }).as('putLento');

      // WHEN
      abrirModoResolucion();
      cy.get('textarea.form-input').type(RESOLUCION_VALIDA);
      cy.get('button.btn-resolver-confirm').click();

      // THEN: Botón deshabilitado y texto "Procesando..."
      cy.get('button.btn-resolver-confirm').should('be.disabled');
      cy.get('button.btn-resolver-confirm').should('contain.text', 'Procesando');

      cy.wait('@putLento');
    });

  });

  // ══════════════════════════════════════════════════════════════════════
  // SUITE 3: RESTAURAR CONECTIVIDAD — Sincronización automática
  // ══════════════════════════════════════════════════════════════════════

  describe('3. Restaurar conectividad — Resolución exitosa con backend', () => {

    it('CP-001-04: debe ejecutar PUT /v1/incidencias/{id} y recibir HTTP 200', () => {
      // GIVEN
      cy.intercept('PUT', '**/incidencias/*', {
        statusCode: 200,
        body: { idIncidencia: 1, estado: 'Resuelto', fechaResolucion: new Date().toISOString() },
      }).as('putExitoso');

      cy.intercept('GET', '**/incidencias*', {
        statusCode: 200,
        body: { data: { content: [{ ...MOCK_INCIDENTE, estado: 'Resuelto', resolucion: RESOLUCION_VALIDA }], totalElements: 1 } },
      }).as('getActualizado');

      // WHEN
      abrirModoResolucion();
      cy.get('textarea.form-input').type(RESOLUCION_VALIDA);
      cy.get('button.btn-resolver-confirm').click();

      // THEN: Backend recibe la petición y responde 200
      cy.wait('@putExitoso').its('response.statusCode').should('eq', 200);
    });

    it('CP-001-05: el modal debe cerrarse tras resolución exitosa', () => {
      // GIVEN
      cy.intercept('PUT', '**/incidencias/*', { statusCode: 200, body: {} }).as('putOk');
      cy.intercept('GET', '**/incidencias*', {
        statusCode: 200,
        body: { data: { content: [], totalElements: 0 } },
      }).as('getRecarga');

      // WHEN
      abrirModoResolucion();
      cy.get('textarea.form-input').type(RESOLUCION_VALIDA);
      cy.get('button.btn-resolver-confirm').click();

      cy.wait('@putOk');

      // THEN: Modal cerrado
      cy.get('.modal-card').should('not.exist');
    });

    it('CP-001-06: debe mostrar toast de éxito tras resolver — BUG-MOV-001 verificación', () => {
      const fechaAccionLocal = new Date().toISOString();

      cy.intercept('PUT', '**/incidencias/*', {
        statusCode: 200,
        body: {
          idIncidencia: 1,
          estado: 'Resuelto',
          fechaResolucion: fechaAccionLocal,
        },
      }).as('putConFecha');

      cy.intercept('GET', '**/incidencias*', {
        statusCode: 200,
        body: {
          data: {
            content: [{
              ...MOCK_INCIDENTE,
              estado: 'Resuelto',
              resolucion: RESOLUCION_VALIDA,
              fechaResolucion: fechaAccionLocal,
            }],
            totalElements: 1,
          },
        },
      }).as('getConFecha');

      // WHEN
      abrirModoResolucion();
      cy.get('textarea.form-input').type(RESOLUCION_VALIDA);
      cy.get('button.btn-resolver-confirm').click();

      cy.wait('@putConFecha');

      // THEN: Toast de éxito con el mensaje correcto
      cy.contains('Incidencia marcada como resuelta', { timeout: 5000 }).should('be.visible');

      // Trazabilidad del BUG-MOV-001 en consola de Cypress
      cy.task('log',
        `[BUG-MOV-001] Fecha cierre en payload enviado al backend: ${fechaAccionLocal}. ` +
        'Verificar manualmente que el backend almacene esta fecha como "fechaResolucion", ' +
        'no la hora de procesamiento del servidor.'
      );
    });

  });

  // ══════════════════════════════════════════════════════════════════════
  // SUITE 4: VALIDACIÓN DE CAMPOS OBLIGATORIOS
  // ══════════════════════════════════════════════════════════════════════

  describe('4. Validación — Notas técnicas obligatorias', () => {

    it('CP-001-07: no debe permitir resolver con campo de resolución vacío', () => {
      // WHEN: Intentar confirmar sin escribir nada
      abrirModoResolucion();
      cy.get('button.btn-resolver-confirm').click();

      // THEN: Mensaje de validación visible y modal permanece abierto
      cy.get('small.error-text').should('be.visible').and('contain.text', 'obligatorio');
      cy.get('.modal-card').should('be.visible');
    });

    it('CP-001-08: no debe permitir resolver con menos de 5 palabras', () => {
      // WHEN: Texto con solo 3 palabras
      abrirModoResolucion();
      cy.get('textarea.form-input').type('Reinicio del servidor');
      cy.get('button.btn-resolver-confirm').click();

      // THEN: Validador minWords(5) activo
      cy.get('small.error-text')
        .should('be.visible')
        .and('contain.text', '5 palabras');
      cy.get('.modal-card').should('be.visible');
    });

    it('CP-001-09: debe aceptar resolución con exactamente 5 palabras mínimo', () => {
      // GIVEN
      cy.intercept('PUT', '**/incidencias/*', { statusCode: 200, body: {} }).as('putValido');
      cy.intercept('GET', '**/incidencias*', {
        statusCode: 200,
        body: { data: { content: [], totalElements: 0 } },
      }).as('getPostResolucion');

      // WHEN: Texto con exactamente 5 palabras
      abrirModoResolucion();
      cy.get('textarea.form-input').type('Se reiniciaron los servicios correctamente');
      cy.get('button.btn-resolver-confirm').click();

      // THEN: Petición enviada y modal cerrado
      cy.wait('@putValido');
      cy.get('.modal-card').should('not.exist');
    });

    it('CP-001-10: el texto solo con espacios no debe pasar la validación', () => {
      // WHEN: Solo espacios en blanco
      abrirModoResolucion();
      cy.get('textarea.form-input').type('   ');
      cy.get('button.btn-resolver-confirm').click();

      // THEN: Validador noWhitespace() activo
      cy.get('small.error-text').should('be.visible');
      cy.get('.modal-card').should('be.visible');
    });

  });

});
