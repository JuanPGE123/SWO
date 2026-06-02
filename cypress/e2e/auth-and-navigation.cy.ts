/**
 * ════════════════════════════════════════════════════════════════════════════
 * TEST E2E - FLUJO COMPLETO: LOGIN Y NAVEGACIÓN
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Archivo: cypress/e2e/auth-and-navigation.cy.ts
 * 
 * Propósito: Test de flujo de usuario completo (E2E)
 * - Autenticación
 * - Navegación entre módulos
 * - Creación de incidencia
 * - Verificación de datos
 * 
 * Ejecución:
 *   npx cypress open --e2e                    # Interfaz gráfica
 *   npx cypress run --spec cypress/e2e/auth-and-navigation.cy.ts  # CLI
 *   npm run e2e                                # Script personalizado
 * 
 * ════════════════════════════════════════════════════════════════════════════
 */

describe('SWO - Flujo Completo: Autenticación y Navegación', () => {

  // ────────────────────────────────────────────────────────────────────────
  // CREDENCIALES DE TEST
  // ────────────────────────────────────────────────────────────────────────
  
  const testUser = {
    email: 'usuario@swo.local',
    password: 'Test123456!',
    name: 'Usuario Test'
  };

  // ────────────────────────────────────────────────────────────────────────
  // SUITE 1: AUTENTICACIÓN
  // ────────────────────────────────────────────────────────────────────────

  describe('1. Autenticación', () => {

    beforeEach(() => {
      // Limpiar datos de sesión anterior
      cy.clearAuth();
      cy.visit('/login');
    });

    it('should display login form', () => {
      // WHEN
      cy.visit('/login');

      // THEN: Verificar que se muestra el formulario
      cy.get('h1').should('contain.text', 'Iniciar Sesión');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should show error message with invalid credentials', () => {
      // GIVEN: Credenciales inválidas
      const invalidEmail = 'nonexistent@example.com';
      const invalidPassword = 'WrongPassword123!';

      // WHEN: Intentar login
      cy.get('input[name="email"]').type(invalidEmail);
      cy.get('input[name="password"]').type(invalidPassword);
      cy.get('button[type="submit"]').click();

      // THEN: Mostrar mensaje de error
      cy.get('.alert-danger')
        .should('be.visible')
        .should('contain.text', 'Correo o contraseña inválidos');
    });

    it('should validate required fields', () => {
      // GIVEN: Formulario vacío
      // WHEN: Click en submit sin llenar campos
      cy.get('button[type="submit"]').click();

      // THEN: Mostrar validaciones
      cy.get('input[name="email"]')
        .parent()
        .should('contain.text', 'El correo es requerido');

      cy.get('input[name="password"]')
        .parent()
        .should('contain.text', 'La contraseña es requerida');
    });

    it('should login successfully with valid credentials', () => {
      // GIVEN: Credenciales válidas
      // WHEN: Completar formulario y enviar
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="password"]').type(testUser.password);
      cy.get('button[type="submit"]').click();

      // THEN: Redireccionar al dashboard
      cy.url().should('not.include', '/login');
      cy.url().should('include', '/dashboard');
      
      // Verificar que se muestra el nombre del usuario
      cy.get('.user-name')
        .should('contain.text', testUser.name);

      // Verificar que el token se guardó
      cy.getStorageToken().should('exist');
    });

    it('should show "Remember me" checkbox', () => {
      // THEN
      cy.get('input[type="checkbox"]')
        .parent()
        .should('contain.text', 'Recuérdame');
    });

    it('should show "Forgot password" link', () => {
      // THEN
      cy.get('a')
        .should('contain.text', '¿Olvidó su contraseña?');
    });

  });

  // ────────────────────────────────────────────────────────────────────────
  // SUITE 2: NAVEGACIÓN POST-LOGIN
  // ────────────────────────────────────────────────────────────────────────

  describe('2. Navegación después de Login', () => {

    beforeEach(() => {
      // Login antes de cada test
      cy.visit('/login');
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="password"]').type(testUser.password);
      cy.get('button[type="submit"]').click();
      
      // Esperar a que cargue el dashboard
      cy.url().should('include', '/dashboard');
    });

    it('should display dashboard with welcome message', () => {
      // THEN: Verificar elementos del dashboard
      cy.get('h1').should('contain.text', 'Panel de Control');
      cy.get('.card-summary').should('have.length', 4); // 4 tarjetas de resumen
    });

    it('should display sidebar with all modules', () => {
      // THEN: Verificar menú lateral
      cy.get('[data-test="nav-dashboard"]').should('be.visible');
      cy.get('[data-test="nav-incidents"]').should('be.visible');
      cy.get('[data-test="nav-users"]').should('be.visible');
      cy.get('[data-test="nav-reports"]').should('be.visible');
      cy.get('[data-test="nav-chatbot"]').should('be.visible');
    });

    it('should navigate to Incidents module', () => {
      // WHEN: Click en módulo de incidencias
      cy.get('[data-test="nav-incidents"]').click();

      // THEN: Verificar navegación
      cy.url().should('include', '/incidents');
      cy.get('h1').should('contain.text', 'Incidencias');
    });

    it('should navigate to Users module', () => {
      // WHEN
      cy.get('[data-test="nav-users"]').click();

      // THEN
      cy.url().should('include', '/users');
      cy.get('h1').should('contain.text', 'Usuarios');
    });

    it('should navigate to Reports module', () => {
      // WHEN
      cy.get('[data-test="nav-reports"]').click();

      // THEN
      cy.url().should('include', '/reports');
      cy.get('h1').should('contain.text', 'Reportes');
    });

    it('should navigate to Chatbot', () => {
      // WHEN
      cy.get('[data-test="nav-chatbot"]').click();

      // THEN
      cy.url().should('include', '/chatbot');
      cy.get('.chat-interface').should('be.visible');
    });

  });

  // ────────────────────────────────────────────────────────────────────────
  // SUITE 3: CREAR INCIDENCIA
  // ────────────────────────────────────────────────────────────────────────

  describe('3. Crear Incidencia', () => {

    beforeEach(() => {
      // Login y navegar a incidencias
      cy.visit('/login');
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="password"]').type(testUser.password);
      cy.get('button[type="submit"]').click();
      
      cy.url().should('include', '/dashboard');
      cy.get('[data-test="nav-incidents"]').click();
      cy.url().should('include', '/incidents');
    });

    it('should display incidents list', () => {
      // THEN: Verificar que se muestra la lista
      cy.get('table tbody tr').should('have.length.greaterThan', 0);
      cy.get('th').should('contain.text', 'Título');
      cy.get('th').should('contain.text', 'Estado');
      cy.get('th').should('contain.text', 'Prioridad');
    });

    it('should open create incident modal', () => {
      // WHEN: Click en botón "Nueva Incidencia"
      cy.get('[data-test="btn-create-incident"]').click();

      // THEN: Verificar que se abre el modal
      cy.get('.modal-dialog').should('be.visible');
      cy.get('.modal-title').should('contain.text', 'Nueva Incidencia');
    });

    it('should create new incident successfully', () => {
      // GIVEN: Datos de la nueva incidencia
      const incidentData = {
        titulo: 'Test Incident',
        descripcion: 'Descripción de prueba',
        prioridad: 'MEDIA'
      };

      // WHEN: Crear incidencia
      cy.get('[data-test="btn-create-incident"]').click();
      
      // Llenar formulario
      cy.get('input[name="titulo"]').type(incidentData.titulo);
      cy.get('textarea[name="descripcion"]').type(incidentData.descripcion);
      cy.get('select[name="prioridad"]').select(incidentData.prioridad);
      
      // Enviar
      cy.get('[data-test="btn-submit"]').click();

      // THEN: Mostrar confirmación
      cy.get('.alert-success')
        .should('be.visible')
        .should('contain.text', 'Incidencia creada exitosamente');

      // Verificar que aparece en la tabla
      cy.get('table tbody')
        .should('contain.text', incidentData.titulo);
    });

    it('should filter incidents by status', () => {
      // WHEN: Aplicar filtro
      cy.get('select[name="estado"]').select('ABIERTA');
      cy.get('[data-test="btn-filter"]').click();

      // THEN: Verificar que solo muestra incidencias abiertas
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).should('contain.text', 'ABIERTA');
      });
    });

    it('should filter incidents by priority', () => {
      // WHEN: Aplicar filtro de prioridad
      cy.get('select[name="prioridad"]').select('ALTA');
      cy.get('[data-test="btn-filter"]').click();

      // THEN: Verificar que solo muestra incidencias con prioridad alta
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).should('contain.text', 'ALTA');
      });
    });

  });

  // ────────────────────────────────────────────────────────────────────────
  // SUITE 4: LOGOUT
  // ────────────────────────────────────────────────────────────────────────

  describe('4. Logout', () => {

    beforeEach(() => {
      // Login
      cy.visit('/login');
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="password"]').type(testUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });

    it('should logout successfully', () => {
      // WHEN: Click en botón de logout
      cy.get('[data-test="btn-logout"]').click();

      // THEN: Redireccionar a login
      cy.url().should('include', '/login');
      
      // Verificar que se limpió el token
      cy.getStorageToken().should('not.exist');
    });

    it('should not allow access to protected routes after logout', () => {
      // WHEN: Logout
      cy.get('[data-test="btn-logout"]').click();

      // THEN: Intentar acceder a ruta protegida
      cy.visit('/dashboard');
      cy.url().should('include', '/login');
    });

  });

  // ────────────────────────────────────────────────────────────────────────
  // SUITE 5: MANEJO DE ERRORES
  // ────────────────────────────────────────────────────────────────────────

  describe('5. Manejo de Errores', () => {

    it('should handle network errors gracefully', () => {
      // GIVEN: Interceptar request y simular error de servidor
      cy.intercept('POST', '**/api/auth/login', {
        statusCode: 500,
        body: { message: 'Error del servidor' }
      });

      // WHEN
      cy.visit('/login');
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="password"]').type(testUser.password);
      cy.get('button[type="submit"]').click();

      // THEN: Mostrar mensaje de error
      cy.get('.alert-danger')
        .should('contain.text', 'Error del servidor');
    });

    it('should show timeout error', () => {
      // GIVEN: Simular timeout
      cy.intercept('POST', '**/api/auth/login', (req) => {
        req.destroy();
      });

      // WHEN
      cy.visit('/login');
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="password"]').type(testUser.password);
      cy.get('button[type="submit"]').click();

      // THEN
      cy.get('.alert-danger').should('be.visible');
    });

  });

});

/**
 * ════════════════════════════════════════════════════════════════════════════
 * GUÍA PARA ESCRIBIR MÁS TESTS E2E
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * ESTRUCTURA DE UN TEST:
 * 1. GIVEN  - Preparar el estado inicial (cy.visit, cy.login, etc.)
 * 2. WHEN   - Ejecutar la acción (cy.click, cy.type, cy.get, etc.)
 * 3. THEN   - Verificar el resultado (cy.should, cy.url, etc.)
 * 
 * COMANDOS MÁS USADOS:
 * cy.visit(url)                        - Visitar una URL
 * cy.get(selector)                     - Obtener elemento del DOM
 * cy.contains(text)                    - Buscar por texto
 * cy.click()                           - Hacer click
 * cy.type(text)                        - Escribir texto
 * cy.select(value)                     - Seleccionar opción
 * cy.should(assertion)                 - Hacer assertiones
 * cy.intercept()                       - Mockear peticiones HTTP
 * cy.wait()                            - Esperar tiempo o petición
 * 
 * SELECTORES RECOMENDADOS:
 * data-test     - Atributo personalizado para tests (recomendado)
 * id            - ID del elemento
 * class         - Clases CSS
 * type          - Tipo de elemento (input, button, etc.)
 * 
 * EJECUCIÓN:
 * npx cypress open                     - Abrir interfaz gráfica
 * npx cypress run                      - Ejecutar todos los tests
 * npx cypress run --spec cypress/e2e/auth-and-navigation.cy.ts  # Un archivo específico
 * npx cypress run --browser chrome     # Con navegador específico
 * npx cypress run --headless           # Sin interfaz gráfica
 * 
 * ════════════════════════════════════════════════════════════════════════════
 */
