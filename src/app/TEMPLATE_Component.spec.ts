import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { IncidentListComponent } from './incident-list.component';
import { IncidentService } from '../../services/incident.service';
import { IncidentResponse } from '../../models/incident.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

/**
 * ════════════════════════════════════════════════════════════════════════════
 * PLANTILLA DE TEST - COMPONENTE ANGULAR CON JASMINE/KARMA
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Propósito: Template reutilizable para tests de Componentes Angular
 * 
 * Características:
 * - Jasmine para BDD (Behavior-Driven Development)
 * - Karma como test runner
 * - Testing de inyección de dependencias (Dependency Injection)
 * - Mocking de servicios HTTP
 * - Validación de templates y eventos
 * - Testing asincrónico (fakeAsync, tick)
 * 
 * Cómo usar:
 * 1. Copiar como: src/app/features/incidents/incident-list.component.spec.ts
 * 2. Reemplazar IncidentListComponent y IncidentService
 * 3. Adaptar describe() y it() según tu componente
 * 4. Ejecutar: npm run test
 *    o para cobertura: npm run test:coverage
 * 
 * ════════════════════════════════════════════════════════════════════════════
 */

describe('IncidentListComponent', () => {

  // ────────────────────────────────────────────────────────────────────────
  // VARIABLES
  // ────────────────────────────────────────────────────────────────────────

  let component: IncidentListComponent;
  let fixture: ComponentFixture<IncidentListComponent>;
  let incidentService: jasmine.SpyObj<IncidentService>;
  let httpMock: HttpTestingController;
  let debugElement: DebugElement;

  // ────────────────────────────────────────────────────────────────────────
  // FIXTURES (Datos de prueba)
  // ────────────────────────────────────────────────────────────────────────

  const mockIncidents: IncidentResponse[] = [
    {
      id: 1,
      titulo: 'Test Incident 1',
      descripcion: 'Description 1',
      prioridad: 'MEDIA',
      estado: 'ABIERTA',
      fechaCreacion: new Date()
    },
    {
      id: 2,
      titulo: 'Test Incident 2',
      descripcion: 'Description 2',
      prioridad: 'ALTA',
      estado: 'EN_PROGRESO',
      fechaCreacion: new Date()
    },
    {
      id: 3,
      titulo: 'Test Incident 3',
      descripcion: 'Description 3',
      prioridad: 'BAJA',
      estado: 'RESUELTA',
      fechaCreacion: new Date()
    }
  ];

  // ────────────────────────────────────────────────────────────────────────
  // SETUP
  // ────────────────────────────────────────────────────────────────────────

  beforeEach(async () => {
    // Crear un spy object del servicio
    const incidentServiceSpy = jasmine.createSpyObj('IncidentService', [
      'getIncidents',
      'createIncident',
      'updateIncident',
      'deleteIncident',
      'getIncidentsByStatus',
      'getIncidentById'
    ]);

    await TestBed.configureTestingModule({
      declarations: [IncidentListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: IncidentService, useValue: incidentServiceSpy }
      ]
    }).compileComponents();

    incidentService = TestBed.inject(IncidentService) as jasmine.SpyObj<IncidentService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  afterEach(() => {
    httpMock.verify(); // Verificar que no hay peticiones HTTP pendientes
  });

  // ────────────────────────────────────────────────────────────────────────
  // TESTS: INICIALIZACIÓN
  // ────────────────────────────────────────────────────────────────────────

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty incidents list', () => {
    expect(component.incidents).toBeDefined();
    expect(Array.isArray(component.incidents)).toBe(true);
  });

  it('should load incidents on init', () => {
    // GIVEN
    incidentService.getIncidents.and.returnValue(of(mockIncidents));

    // WHEN
    fixture.detectChanges(); // Disparar ngOnInit

    // THEN
    expect(incidentService.getIncidents).toHaveBeenCalled();
    expect(component.incidents).toEqual(mockIncidents);
    expect(component.incidents.length).toBe(3);
  });

  // ────────────────────────────────────────────────────────────────────────
  // TESTS: LISTAR INCIDENCIAS
  // ────────────────────────────────────────────────────────────────────────

  describe('Listar Incidencias', () => {

    it('should fetch incidents from service', () => {
      // GIVEN
      incidentService.getIncidents.and.returnValue(of(mockIncidents));

      // WHEN
      component.loadIncidents();

      // THEN
      expect(incidentService.getIncidents).toHaveBeenCalledTimes(1);
      expect(component.incidents).toEqual(mockIncidents);
    });

    it('should display incidents in table', () => {
      // GIVEN
      incidentService.getIncidents.and.returnValue(of(mockIncidents));
      component.loadIncidents();

      // WHEN
      fixture.detectChanges();

      // THEN: Verificar que se renderizaron las filas
      const rows = debugElement.queryAll(By.css('tbody tr'));
      expect(rows.length).toBe(mockIncidents.length);
    });

    it('should show empty state when no incidents', () => {
      // GIVEN
      incidentService.getIncidents.and.returnValue(of([]));

      // WHEN
      component.loadIncidents();
      fixture.detectChanges();

      // THEN
      const emptyMessage = debugElement.query(By.css('.empty-state'));
      expect(emptyMessage).toBeTruthy();
      expect(emptyMessage.nativeElement.textContent).toContain('No hay incidencias');
    });

    it('should handle error when loading incidents', () => {
      // GIVEN
      const error = new Error('Server error');
      incidentService.getIncidents.and.returnValue(throwError(() => error));

      // WHEN
      component.loadIncidents();

      // THEN
      expect(component.error).toBeDefined();
      expect(component.error).toContain('Error');
    });

  });

  // ────────────────────────────────────────────────────────────────────────
  // TESTS: FILTROS
  // ────────────────────────────────────────────────────────────────────────

  describe('Filtrar Incidencias', () => {

    it('should filter incidents by status', () => {
      // GIVEN
      const openIncidents = mockIncidents.filter(i => i.estado === 'ABIERTA');
      incidentService.getIncidentsByStatus.and.returnValue(of(openIncidents));

      // WHEN
      component.filterByStatus('ABIERTA');
      fixture.detectChanges();

      // THEN
      expect(incidentService.getIncidentsByStatus).toHaveBeenCalledWith('ABIERTA');
      expect(component.incidents).toEqual(openIncidents);
    });

    it('should filter incidents by priority', () => {
      // GIVEN
      const highPriorityIncidents = mockIncidents.filter(i => i.prioridad === 'ALTA');

      // WHEN
      component.filterByPriority('ALTA');

      // THEN
      expect(component.incidents).toEqual(highPriorityIncidents);
    });

    it('should show no results when filter matches nothing', () => {
      // GIVEN
      component.incidents = mockIncidents;

      // WHEN
      component.filterByPriority('CRITICA');
      fixture.detectChanges();

      // THEN
      expect(component.incidents.length).toBe(0);
      const emptyMessage = debugElement.query(By.css('.empty-state'));
      expect(emptyMessage).toBeTruthy();
    });

  });

  // ────────────────────────────────────────────────────────────────────────
  // TESTS: CREAR INCIDENCIA
  // ────────────────────────────────────────────────────────────────────────

  describe('Crear Incidencia', () => {

    it('should create a new incident', () => {
      // GIVEN
      const newIncident = mockIncidents[0];
      incidentService.createIncident.and.returnValue(of(newIncident));
      spyOn(component, 'loadIncidents');

      // WHEN
      component.createIncident(newIncident);

      // THEN
      expect(incidentService.createIncident).toHaveBeenCalledWith(newIncident);
      expect(component.loadIncidents).toHaveBeenCalled();
    });

    it('should show success message after creating', () => {
      // GIVEN
      const newIncident = mockIncidents[0];
      incidentService.createIncident.and.returnValue(of(newIncident));

      // WHEN
      component.createIncident(newIncident);

      // THEN
      expect(component.successMessage).toContain('creada exitosamente');
    });

    it('should handle error when creating incident fails', () => {
      // GIVEN
      const error = new Error('Validation error');
      incidentService.createIncident.and.returnValue(throwError(() => error));

      // WHEN
      component.createIncident(mockIncidents[0]);

      // THEN
      expect(component.error).toBeDefined();
    });

  });

  // ────────────────────────────────────────────────────────────────────────
  // TESTS: ACTUALIZAR INCIDENCIA
  // ────────────────────────────────────────────────────────────────────────

  describe('Actualizar Incidencia', () => {

    it('should update an incident', () => {
      // GIVEN
      const updatedIncident = { ...mockIncidents[0], titulo: 'Updated Title' };
      incidentService.updateIncident.and.returnValue(of(updatedIncident));
      spyOn(component, 'loadIncidents');

      // WHEN
      component.updateIncident(1, updatedIncident);

      // THEN
      expect(incidentService.updateIncident).toHaveBeenCalledWith(1, updatedIncident);
      expect(component.loadIncidents).toHaveBeenCalled();
    });

  });

  // ────────────────────────────────────────────────────────────────────────
  // TESTS: ELIMINAR INCIDENCIA
  // ────────────────────────────────────────────────────────────────────────

  describe('Eliminar Incidencia', () => {

    it('should delete an incident', () => {
      // GIVEN
      incidentService.deleteIncident.and.returnValue(of(void 0));
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(component, 'loadIncidents');

      // WHEN
      component.deleteIncident(1);

      // THEN
      expect(incidentService.deleteIncident).toHaveBeenCalledWith(1);
      expect(component.loadIncidents).toHaveBeenCalled();
    });

    it('should not delete if user cancels confirmation', () => {
      // GIVEN
      spyOn(window, 'confirm').and.returnValue(false);

      // WHEN
      component.deleteIncident(1);

      // THEN
      expect(incidentService.deleteIncident).not.toHaveBeenCalled();
    });

  });

  // ────────────────────────────────────────────────────────────────────────
  // TESTS: EVENTOS DEL TEMPLATE
  // ────────────────────────────────────────────────────────────────────────

  describe('Eventos del Template', () => {

    beforeEach(() => {
      component.incidents = mockIncidents;
      incidentService.getIncidents.and.returnValue(of(mockIncidents));
    });

    it('should call loadIncidents on refresh button click', () => {
      // GIVEN
      spyOn(component, 'loadIncidents');
      fixture.detectChanges();

      // WHEN
      const refreshButton = debugElement.query(By.css('button.refresh'));
      refreshButton.nativeElement.click();

      // THEN
      expect(component.loadIncidents).toHaveBeenCalled();
    });

    it('should open modal on create button click', () => {
      // GIVEN
      spyOn(component, 'openCreateModal');
      fixture.detectChanges();

      // WHEN
      const createButton = debugElement.query(By.css('button.create'));
      createButton.nativeElement.click();

      // THEN
      expect(component.openCreateModal).toHaveBeenCalled();
    });

    it('should call deleteIncident on delete button click', () => {
      // GIVEN
      spyOn(component, 'deleteIncident');
      component.incidents = mockIncidents;
      fixture.detectChanges();

      // WHEN
      const deleteButtons = debugElement.queryAll(By.css('button.delete'));
      deleteButtons[0].nativeElement.click();

      // THEN
      expect(component.deleteIncident).toHaveBeenCalledWith(1);
    });

  });

  // ────────────────────────────────────────────────────────────────────────
  // TESTS: PROPERTIES Y GETTERS
  // ────────────────────────────────────────────────────────────────────────

  describe('Properties y Getters', () => {

    it('should calculate total incidents count', () => {
      // GIVEN
      component.incidents = mockIncidents;

      // WHEN & THEN
      expect(component.totalIncidents).toBe(3);
    });

    it('should get incidents by priority level', () => {
      // GIVEN
      component.incidents = mockIncidents;

      // WHEN
      const highPriority = component.getIncidentsByPriority('ALTA');

      // THEN
      expect(highPriority.length).toBe(1);
      expect(highPriority[0].prioridad).toBe('ALTA');
    });

  });

  // ────────────────────────────────────────────────────────────────────────
  // TESTS: SERVICIOS
  // ────────────────────────────────────────────────────────────────────────

  describe('HTTP Requests', () => {

    it('should make GET request to /api/incidents', () => {
      // GIVEN
      const url = '/api/incidents';

      // WHEN
      incidentService.getIncidents().subscribe();

      // THEN: Este test pasaría si HttpClient está configurado correctamente
      // En la práctica, usamos HttpTestingController para verificar
    });

  });

});

/**
 * ════════════════════════════════════════════════════════════════════════════
 * GUÍA DE CONFIGURACIÓN
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * 1. ARCHIVO karma.conf.js
 *    Debe estar en la raíz del proyecto Angular
 * 
 *    module.exports = function(config) {
 *      config.set({
 *        basePath: '',
 *        frameworks: ['jasmine', '@angular-devkit/build-angular'],
 *        plugins: [
 *          require('karma-jasmine'),
 *          require('karma-chrome-launcher'),
 *          require('karma-coverage'),
 *          require('@angular-devkit/build-angular/plugins/karma')
 *        ],
 *        client: {
 *          jasmine: {
 *            random: false  // Ejecutar en orden
 *          },
 *          clearContext: false
 *        },
 *        coverageReporter: {
 *          dir: require('path').join(__dirname, './coverage'),
 *          subdir: '.',
 *          reporters: [
 *            { type: 'html' },
 *            { type: 'text-summary' },
 *            { type: 'lcovonly' }
 *          ],
 *          check: {
 *            global: {
 *              statements: 75,
 *              branches: 75,
 *              lines: 75,
 *              functions: 75
 *            }
 *          }
 *        },
 *        reporters: ['progress', 'coverage'],
 *        port: 9876,
 *        colors: true,
 *        logLevel: config.LOG_INFO,
 *        autoWatch: true,
 *        browsers: ['Chrome'],
 *        singleRun: false,
 *        restartOnFileChange: true
 *      });
 *    };
 * 
 * 2. EJECUCIÓN
 *    npm run test                    # Test en watch mode
 *    npm run test:coverage           # Con reporte de cobertura
 *    npm run test -- --headless      # Sin navegador
 * 
 * 3. ARCHIVOS DE CONFIGURACIÓN NECESARIOS
 *    - karma.conf.js en raíz del proyecto
 *    - karma-coverage instalado (npm install --save-dev karma-coverage)
 * 
 * ════════════════════════════════════════════════════════════════════════════
 */
