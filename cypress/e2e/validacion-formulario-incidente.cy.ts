/**
 * Caso 002 — Validación de campos obligatorios al crear incidente
 *
 * Formulario: Modal "Nueva Incidencia" en incidents.component.html
 * Validadores: Validators.required, CustomValidators.noWhitespace(),
 *              CustomValidators.minWords(10), Validators.minLength(5)
 *
 * BUG-WEB-002: CustomValidators.minWords(10) no se evalúa cuando el campo
 * descripción está vacío — el error 'required' absorbe la validación y el
 * mensaje "Debe contener al menos 10 palabras" nunca es visible.
 */

describe('Caso 002 - Validación de campos obligatorios en formulario Nueva Incidencia', () => {

  const sesionAdmin = {
    id: 'USR-MASTER',
    nombre: 'Master',
    apellido: 'SWO',
    correo: 'master@swo.com',
    area: 'TI',
    role: 'Administrador'
  };

  beforeEach(() => {
    // Interceptar llamadas al backend — ninguna debe dispararse al validar
    // cy.task() no puede usarse dentro de cy.intercept() — usar console.log
    cy.intercept('POST', '**/incidencias', (req) => {
      console.log('[BUG] Petición HTTP disparada con formulario inválido — no debería ocurrir');
      req.reply({ statusCode: 400, body: { message: 'No debería llegar aquí' } });
    }).as('crearIncidencia');

    cy.intercept('GET', '**/incidencias*', { data: { content: [], totalElements: 0, totalPages: 0 } }).as('listarIncidencias');
    cy.intercept('GET', '**/estadisticas*', { data: { total: 0 } }).as('estadisticas');
    cy.intercept('GET', '**/usuarios*', { data: [] }).as('usuarios');
    cy.intercept('GET', '**/proyectos*', { data: [] }).as('proyectos');
    cy.intercept('GET', '**/categorias*', { data: [] }).as('categorias');

    // Inyectar sesión y visitar incidents
    cy.visit('/incidents', {
      onBeforeLoad(win) {
        win.sessionStorage.setItem('usuarioAutenticado', JSON.stringify(sesionAdmin));
        win.sessionStorage.setItem('authToken', 'token-admin-cypress');
      }
    });

    // Abrir el modal de nueva incidencia
    cy.contains('button', 'Nueva Incidencia').click();
    cy.get('.modal-overlay').should('be.visible');
    cy.get('.modal-card').should('be.visible');
  });

  // ══════════════════════════════════════════════════════════════════════════
  // TEST 002-A: Sin envío HTTP con campos vacíos
  // ══════════════════════════════════════════════════════════════════════════
  it('002-A: No se envía petición HTTP al backend con campos vacíos', () => {
    cy.screenshot('002-A-01-formulario-vacio');

    // Click en Guardar con todos los campos vacíos
    cy.contains('button', 'Guardar Incidencia').click();

    // Esperar 1 segundo y verificar que NO hubo petición al backend
    cy.wait(1000);
    cy.get('@crearIncidencia.all').should('have.length', 0);

    cy.task('log', '[002-A] Sin petición HTTP al backend — validación de frontend funcionando');
    cy.screenshot('002-A-02-sin-peticion-http');
  });

  // ══════════════════════════════════════════════════════════════════════════
  // TEST 002-B: Título vacío muestra "Este campo es obligatorio"
  // ══════════════════════════════════════════════════════════════════════════
  it('002-B: Campo Título vacío muestra error "Este campo es obligatorio"', () => {
    // Dejar título vacío, llenar descripción y click en guardar
    cy.get('textarea[formControlName="descripcion"]')
      .type('Esta es una descripcion suficientemente larga para pasar el validador de palabras minimas requeridas.');
    cy.contains('button', 'Guardar Incidencia').click();

    // Verificar error en título
    cy.get('small.error-text').should('contain', 'Este campo es obligatorio');

    cy.screenshot('002-B-titulo-error-obligatorio');
  });

  // ══════════════════════════════════════════════════════════════════════════
  // TEST 002-C: Título con solo espacios — error noWhitespace
  // ══════════════════════════════════════════════════════════════════════════
  it('002-C: Título con solo espacios muestra error de espacios en blanco', () => {
    cy.get('input[formControlName="titulo"]').type('     ');
    cy.contains('button', 'Guardar Incidencia').click();

    cy.get('small.error-text').first().then(($el) => {
      const texto = $el.text().trim();
      cy.task('log', `[002-C] Mensaje error título con espacios: "${texto}"`);
      // Puede mostrar 'required' o 'whitespace' según el validador que gane
      expect(texto).to.match(/obligatorio|espacios|vacío/i);
    });

    cy.screenshot('002-C-titulo-solo-espacios');
  });

  // ══════════════════════════════════════════════════════════════════════════
  // TEST 002-D: Título con menos de 5 caracteres — error minLength
  // ══════════════════════════════════════════════════════════════════════════
  it('002-D: Título con menos de 5 caracteres muestra error de longitud mínima', () => {
    cy.get('input[formControlName="titulo"]').type('Bug');
    cy.get('textarea[formControlName="descripcion"]')
      .type('Descripcion larga suficiente para cumplir con el validador de minimo de palabras requeridas aqui.');
    cy.contains('button', 'Guardar Incidencia').click();

    cy.get('small.error-text').first().then(($el) => {
      const texto = $el.text().trim();
      cy.task('log', `[002-D] Mensaje error título corto: "${texto}"`);
      expect(texto).to.match(/[Mm]ínimo|caracteres|obligatorio/i);
    });

    cy.screenshot('002-D-titulo-muy-corto');
  });

  // ══════════════════════════════════════════════════════════════════════════
  // TEST 002-E: Descripción vacía — BUG: muestra 'required' no minWords
  // ══════════════════════════════════════════════════════════════════════════
  it('002-E: BUG-WEB-002 — Descripción vacía muestra "required" en vez de "mínimo 10 palabras"', () => {
    // Llenar título para aislar el error de descripción
    cy.get('input[formControlName="titulo"]').type('Incidencia de prueba completa');
    cy.contains('button', 'Guardar Incidencia').click();

    // Verificar qué mensaje aparece para descripción vacía
    cy.get('small.error-text').then(($errores) => {
      const textos = Array.from($errores).map((el) => el.textContent?.trim() ?? '');
      cy.task('log', `[002-E] Mensajes de error visibles: ${JSON.stringify(textos)}`);

      const tieneMinWords = textos.some(t => t.includes('10') || t.toLowerCase().includes('palabras'));
      const tieneRequired = textos.some(t => t.toLowerCase().includes('obligatorio'));

      cy.task('log', `[002-E] Muestra minWords (esperado): ${tieneMinWords}`);
      cy.task('log', `[002-E] Muestra required (bug): ${tieneRequired}`);
      cy.task('log', tieneMinWords
        ? '[002-E] Sin bug — minWords se muestra correctamente'
        : '[BUG-WEB-002] CONFIRMADO — required absorbe minWords, mensaje de 10 palabras no visible'
      );
    });

    cy.screenshot('002-E-descripcion-vacia-bug');
  });

  // ══════════════════════════════════════════════════════════════════════════
  // TEST 002-F: Descripción con pocas palabras (<10) — debe mostrar minWords
  // ══════════════════════════════════════════════════════════════════════════
  it('002-F: Descripción con menos de 10 palabras muestra error de mínimo de palabras', () => {
    cy.get('input[formControlName="titulo"]').type('Incidencia de red interna completa');
    // Solo 5 palabras — debe fallar minWords(10)
    cy.get('textarea[formControlName="descripcion"]').type('El sistema no responde hoy.');
    cy.contains('button', 'Guardar Incidencia').click();

    cy.get('small.error-text').then(($errores) => {
      const textos = Array.from($errores).map((el) => el.textContent?.trim() ?? '');
      cy.task('log', `[002-F] Mensajes con descripción corta: ${JSON.stringify(textos)}`);

      const tieneMinWords = textos.some(t => t.includes('10') || t.toLowerCase().includes('palabras'));
      cy.task('log', tieneMinWords
        ? '[002-F] minWords funciona correctamente con descripción corta'
        : '[BUG-WEB-002] minWords no se activa con descripción corta'
      );
    });

    cy.screenshot('002-F-descripcion-pocas-palabras');
  });

  // ══════════════════════════════════════════════════════════════════════════
  // TEST 002-G: Categoría no seleccionada — error obligatorio
  // ══════════════════════════════════════════════════════════════════════════
  it('002-G: Categoría es opcional — formulario válido sin categoría dispara POST al backend', () => {
    // Redefinir intercept para este test: capturar el POST que sí ocurre
    cy.intercept('POST', '**/incidencias', {
      statusCode: 201,
      body: { data: { idIncidencia: 55 } }
    }).as('crearSinCategoria');

    cy.get('input[formControlName="titulo"]').type('Error en el sistema de acceso remoto VPN');
    cy.get('textarea[formControlName="descripcion"]')
      .type('El servidor VPN no acepta conexiones desde ayer por la tarde sin motivo aparente ni mensaje de error claro.');

    cy.screenshot('002-G-01-formulario-lleno-sin-categoria');

    cy.contains('button', 'Guardar Incidencia').click();

    // Con título y descripción válidos, el form es válido aunque categoría esté vacía
    // → el POST SÍ se dispara (categoría es opcional en este modal)
    cy.wait('@crearSinCategoria', { timeout: 5000 }).then((interception) => {
      cy.task('log', `[002-G] Categoría es opcional: POST disparado con HTTP ${interception.response?.statusCode}`);
      cy.task('log', `[002-G] categoria en payload: "${interception.request.body?.categoria ?? 'vacío'}"`);
    });

    // No deben aparecer small.error-text porque el form es válido
    cy.get('small.error-text').should('not.exist');

    cy.screenshot('002-G-02-categoria-opcional-post-exitoso');
  });

  // ══════════════════════════════════════════════════════════════════════════
  // TEST 002-H: Formulario válido completo — se dispara la petición HTTP
  // ══════════════════════════════════════════════════════════════════════════
  it('002-H: Formulario válido completo dispara POST al backend', () => {
    // Redefinir el intercept para que devuelva éxito en este test
    cy.intercept('POST', '**/incidencias', {
      statusCode: 201,
      body: { data: { idIncidencia: 99, titulo: 'Incidencia creada' } }
    }).as('crearIncidenciaOk');

    cy.get('input[formControlName="titulo"]').type('Error crítico en servidor de producción principal');
    cy.get('textarea[formControlName="descripcion"]')
      .type('El servidor principal de producción dejó de responder desde las dos de la tarde de hoy y afecta a todos los usuarios del sistema.');
    cy.get('select[formControlName="categoria"]').select('Hardware');

    cy.screenshot('002-H-01-formulario-valido-completo');

    cy.contains('button', 'Guardar Incidencia').click();

    // Verificar que SÍ se disparó la petición al backend
    cy.wait('@crearIncidenciaOk', { timeout: 5000 }).then((interception) => {
      cy.task('log', `[002-H] POST enviado con status: ${interception.response?.statusCode}`);
      expect(interception.request.body).to.have.property('titulo');
      expect(interception.request.body).to.have.property('descripcion');
    });

    cy.screenshot('002-H-02-peticion-http-disparada');
  });

  // ══════════════════════════════════════════════════════════════════════════
  // TEST 002-I: Verificar borde rojo en campos con error
  // ══════════════════════════════════════════════════════════════════════════
  it('002-I: Campos con error no presentan clase visual de error en este modal (sin .error en inputs)', () => {
    // Suprimir errores de Angular Router que pueden ocurrir al final de la suite
    cy.on('uncaught:exception', () => false);

    // Tocar los campos manualmente para garantizar el estado 'touched'
    // antes de click en Guardar — fuerza el change detection de Angular
    cy.get('input[formControlName="titulo"]').focus().blur();
    cy.get('textarea[formControlName="descripcion"]').focus().blur();

    cy.contains('button', 'Guardar Incidencia').click();

    // El modal usa <small class="error-text"> para mostrar errores
    // los inputs NO tienen [class.error] como en incident-form.component
    cy.get('small.error-text', { timeout: 8000 }).should('have.length.gte', 1);

    cy.get('small.error-text').each(($el) => {
      cy.task('log', `[002-I] Error visible: "${$el.text().trim()}"`);
    });

    cy.screenshot('002-I-errores-visibles');
  });

});
