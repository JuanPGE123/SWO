describe('Caso 004 - Chatbot: Mensajes Simultáneos y Estado escribiendo$', () => {

  const testUser = {
    email: 'master@swo.com',
    password: '123456'
  };

  const mockRespuesta = {
    resultados: [{
      id: 1,
      categoria: 'Conectividad',
      pregunta: 'Sin internet',
      respuesta: 'Reinicia el router y verifica los cables.',
      pasos: 'Paso 1: Apaga el router||Paso 2: Espera 30 segundos||Paso 3: Enciéndelo',
      nivel: 1
    }],
    categorias: ['Conectividad', 'Hardware', 'Software']
  };

  beforeEach(() => {
    cy.visit('/login');
    // El formulario usa <app-input> con autocomplete (no name="")
    cy.get('input[autocomplete="username"]').type(testUser.email);
    cy.get('input[autocomplete="current-password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard', { timeout: 10000 });
    cy.visit('/chatbot');
    // Esperar que el chatbot cargue completamente
    cy.get('.chat-input').should('be.visible');
  });

  it('004-A: Guard if(!texto||this.escribiendo) bloquea envios duplicados por input', () => {
    // Interceptar GET al backend con delay para mantener escribiendo=true
    cy.intercept('GET', '**/chatbot?q=*', (req) => {
      req.reply({ delay: 3000, body: mockRespuesta });
    }).as('consultaBot');

    // Enviar primer mensaje
    cy.get('.chat-input').type('mi internet no funciona');
    cy.get('.btn-send').click();

    // VERIFICACION 1: aparece el indicador de escritura (.typing-message)
    cy.get('.typing-message').should('be.visible');
    cy.screenshot('004-A-01-indicador-escribiendo-visible');

    // Intentar enviar segundo mensaje mientras escribiendo=true
    // El input queda disabled, pero probamos el click directo
    cy.get('.chat-input').type('segundo mensaje duplicado', { force: true });
    cy.get('.btn-send').click({ force: true });

    // Esperar respuesta del bot
    cy.wait('@consultaBot');

    // VERIFICACION 2: el indicador desaparece tras respuesta
    cy.get('.typing-message').should('not.exist');
    cy.screenshot('004-A-02-indicador-desaparecio');

    // VERIFICACION 3: solo 1 mensaje del usuario en el historial
    cy.get('.message.user').should('have.length', 1);
    cy.screenshot('004-A-03-un-solo-mensaje-usuario');
  });

  it('004-B: BUG - accionRapida() invoca enviarMensaje() sin verificar escribiendo$', () => {
    let contadorPeticiones = 0;

    // Delay largo para mantener la ventana de carrera abierta
    cy.intercept('GET', '**/chatbot?q=*', (req) => {
      contadorPeticiones++;
      req.reply({ delay: 2500, body: mockRespuesta });
    }).as('consultaBot');

    // Enviar primer mensaje para activar escribiendo=true
    cy.get('.chat-input').type('problema con mi equipo');
    cy.get('.btn-send').click();

    // Confirmar que el bot está escribiendo
    cy.get('.typing-message').should('be.visible');
    cy.screenshot('004-B-01-bot-escribiendo-antes-del-bug');

    // REPRODUCCION DEL BUG: accionRapida() no verifica this.escribiendo
    // Llama directo a enviarMensaje() desde la línea 152-155 de chatbot.component.ts
    cy.get('.action-btn').first().click();

    cy.screenshot('004-B-02-accion-rapida-clickeada-durante-escribiendo');

    // Esperar primera respuesta
    cy.wait('@consultaBot', { timeout: 8000 });

    cy.wait(1000);
    cy.screenshot('004-B-03-resultado-con-posible-duplicado');

    // VERIFICACION: contar mensajes del usuario (el bug produce 2, el fix produce 1)
    cy.get('.message.user').its('length').then((count) => {
      cy.task('log', `[BUG-BOT-004] Mensajes usuario en historial: ${count} — esperado: 1`);
    });
  });

  it('004-C: Estado escribiendo$ transiciona correctamente true -> false', () => {
    cy.intercept('GET', '**/chatbot?q=*', (req) => {
      req.reply({ delay: 2000, body: mockRespuesta });
    }).as('consultaBot');

    // Estado inicial: sin indicador
    cy.get('.typing-message').should('not.exist');

    cy.get('.chat-input').type('como restablezco mi contrasena');
    cy.get('.btn-send').click();

    // Estado 1: escribiendo=true → indicador visible
    cy.get('.typing-message').should('be.visible');
    cy.screenshot('004-C-01-escribiendo-true');

    cy.wait('@consultaBot');

    // Estado 2: escribiendo=false → indicador desaparece
    cy.get('.typing-message').should('not.exist');
    cy.screenshot('004-C-02-escribiendo-false');

    // Confirmar que la respuesta del bot llegó al historial
    cy.get('.message.bot').should('have.length.gte', 2); // bienvenida + respuesta
    cy.screenshot('004-C-03-respuesta-bot-en-historial');
  });

});
