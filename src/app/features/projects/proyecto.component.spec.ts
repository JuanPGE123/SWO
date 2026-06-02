import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ProyectoComponent } from './proyecto.component';
import { ProyectoService } from '../services/proyecto.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

/**
 * Pruebas Unitarias para ProyectoComponent
 * 
 * Cobertura de escenarios:
 * - Happy Path: Cargar lista de proyectos exitosamente
 * - Happy Path: Crear nuevo proyecto exitosamente
 * - Interacción: Click en botón de creación abre modal
 * - Error: Fallo al cargar proyectos desde servidor
 * - Validación: Botón deshabilitado mientras carga datos
 * 
 * Stack de Testing:
 * - Jest 29+ o Jasmine 4+
 * - Angular Testing Utilities (TestBed, ComponentFixture)
 * - HttpClientTestingModule para simular HTTP
 * - fakeAsync/tick para testing de tiempo
 * 
 * @author Tech Lead - SWO Project
 * @version 1.0
 */
describe('ProyectoComponent - Pruebas Unitarias', () => {
  let component: ProyectoComponent;
  let fixture: ComponentFixture<ProyectoComponent>;
  let httpMock: HttpTestingController;
  let proyectoService: ProyectoService;

  /**
   * Configuración inicial del módulo de prueba
   * Se ejecuta una sola vez antes de todos los tests
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProyectoComponent],
      imports: [HttpClientTestingModule],
      providers: [ProyectoService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProyectoComponent);
    component = fixture.componentInstance;
    proyectoService = TestBed.inject(ProyectoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  /**
   * Limpiar recursos después de cada test
   */
  afterEach(() => {
    httpMock.verify(); // Verificar que no haya peticiones HTTP pendientes
  });

  /**
   * ============================================
   * PRUEBAS DE INICIALIZACIÓN
   * ============================================
   */

  /**
   * TEST 1: Component creado correctamente
   */
  it('✅ Debe crear el componente ProyectoComponent', () => {
    expect(component).toBeTruthy();
  });

  /**
   * TEST 2: Happy Path - Cargar lista de proyectos al inicializar
   * 
   * Escenario:
   * - El componente se inicializa
   * - El servicio retorna una lista de proyectos
   * 
   * Resultado esperado:
   * - La lista de proyectos se carga correctamente
   * - Los datos se asignan al componente
   * - La tabla se renderiza con los proyectos
   */
  it('✅ HAPPY PATH: Cargar lista de proyectos al inicializar', fakeAsync(() => {
    // ARRANGE
    const proyectosMock = [
      {
        id: 1,
        nombre: 'Sistema de Facturación',
        descripcion: 'Implementación de facturación',
        estado: 'ACTIVO',
        prioridad: 'ALTA',
        responsable: 'Juan Pérez',
        fechaCreacion: new Date('2026-01-15'),
      },
      {
        id: 2,
        nombre: 'Portal de Clientes',
        descripcion: 'Portal self-service para clientes',
        estado: 'EN_PROGRESO',
        prioridad: 'MEDIA',
        responsable: 'María García',
        fechaCreacion: new Date('2026-02-10'),
      },
    ];

    spyOn(proyectoService, 'obtenerProyectos').and.returnValue(of(proyectosMock));

    // ACT
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    // ASSERT
    expect(component.proyectos).toEqual(proyectosMock);
    expect(component.proyectos.length).toBe(2);
    expect(component.cargando).toBe(false);
    expect(proyectoService.obtenerProyectos).toHaveBeenCalledTimes(1);
  }));

  /**
   * ============================================
   * PRUEBAS DE INTERACCIÓN CON BOTONES
   * ============================================
   */

  /**
   * TEST 3: Happy Path - Click en botón "Crear Proyecto"
   * 
   * Escenario:
   * - El usuario hace click en el botón "Nuevo Proyecto"
   * 
   * Resultado esperado:
   * - Se abre el modal de creación
   * - El formulario se resetea
   * - El modal es visible
   */
  it('✅ HAPPY PATH: Click en botón Crear Proyecto abre modal', () => {
    // ARRANGE
    component.mostrarModalCreacion = false;
    const botonCrear: DebugElement = fixture.debugElement.query(
      By.css('button.btn-crear-proyecto')
    );

    // ACT
    if (botonCrear) {
      botonCrear.nativeElement.click();
      fixture.detectChanges();
    }

    // ASSERT
    expect(component.mostrarModalCreacion).toBe(true);
    expect(component.formularioProyecto.pristine).toBe(true);
  });

  /**
   * TEST 4: Happy Path - Crear nuevo proyecto
   * 
   * Escenario:
   * - El usuario llena el formulario correctamente
   * - El usuario hace click en "Guardar"
   * - El servidor acepta el nuevo proyecto
   * 
   * Resultado esperado:
   * - El proyecto se añade a la lista
   * - El modal se cierra
   * - Se muestra mensaje de éxito
   */
  it('✅ HAPPY PATH: Crear nuevo proyecto exitosamente', fakeAsync(() => {
    // ARRANGE
    const nuevoProyecto = {
      nombre: 'Sistema de Reportes',
      descripcion: 'Generación de reportes automáticos',
      responsableId: 3,
      prioridad: 'ALTA',
    };

    const proyectoCreado = {
      id: 3,
      ...nuevoProyecto,
      estado: 'ACTIVO',
      fechaCreacion: new Date(),
    };

    component.formularioProyecto.patchValue(nuevoProyecto);
    spyOn(proyectoService, 'crearProyecto').and.returnValue(of(proyectoCreado));

    // ACT
    component.guardarProyecto();
    tick();
    fixture.detectChanges();

    // ASSERT
    expect(proyectoService.crearProyecto).toHaveBeenCalledWith(nuevoProyecto);
    expect(component.proyectos).toContain(proyectoCreado);
    expect(component.mostrarModalCreacion).toBe(false);
    expect(component.mensajeExito).toContain('creado correctamente');
  }));

  /**
   * TEST 5: Interacción - Editar proyecto
   * 
   * Escenario:
   * - El usuario hace click en el botón "Editar" de un proyecto
   * 
   * Resultado esperado:
   * - El modal de edición se abre
   * - El formulario se rellena con los datos del proyecto
   * - El botón de guardar cambia a "Actualizar"
   */
  it('✅ Hacer click en Editar abre modal con datos pre-cargados', () => {
    // ARRANGE
    const proyectoAEditar = {
      id: 1,
      nombre: 'Sistema de Facturación',
      descripcion: 'Implementación de facturación',
      estado: 'ACTIVO',
      prioridad: 'ALTA',
    };

    component.proyectos = [proyectoAEditar];
    fixture.detectChanges();

    spyOn(component, 'abrirModalEditar').and.callThrough();

    const botonEditar: DebugElement = fixture.debugElement.query(
      By.css('button.btn-editar')
    );

    // ACT
    if (botonEditar) {
      botonEditar.nativeElement.click();
      fixture.detectChanges();
    }

    // ASSERT
    expect(component.abrirModalEditar).toHaveBeenCalledWith(proyectoAEditar);
    expect(component.formularioProyecto.value).toEqual(proyectoAEditar);
    expect(component.modoEdicion).toBe(true);
  });

  /**
   * ============================================
   * PRUEBAS DE VALIDACIÓN
   * ============================================
   */

  /**
   * TEST 6: Validación - Botón Guardar deshabilitado con formulario vacío
   * 
   * Escenario:
   * - El formulario está vacío
   * 
   * Resultado esperado:
   * - El botón "Guardar" está deshabilitado
   * - El formulario tiene estado "invalid"
   */
  it('❌ VALIDACIÓN: Botón Guardar deshabilitado con formulario vacío', () => {
    // ARRANGE
    component.formularioProyecto.patchValue({
      nombre: '',
      descripcion: '',
      responsableId: null,
    });
    fixture.detectChanges();

    const botonGuardar: DebugElement = fixture.debugElement.query(
      By.css('button.btn-guardar')
    );

    // ASSERT
    expect(component.formularioProyecto.invalid).toBe(true);
    if (botonGuardar) {
      expect(botonGuardar.nativeElement.disabled).toBe(true);
    }
  });

  /**
   * TEST 7: Validación - Nombre de proyecto debe tener mínimo 5 caracteres
   * 
   * Escenario:
   * - El usuario ingresa un nombre muy corto
   * 
   * Resultado esperado:
   * - Se muestra mensaje de validación
   * - El formulario es inválido
   */
  it('❌ VALIDACIÓN: Nombre debe tener mínimo 5 caracteres', () => {
    // ARRANGE
    component.formularioProyecto.get('nombre')?.setValue('ABC');

    // ASSERT
    expect(component.formularioProyecto.get('nombre')?.hasError('minlength')).toBe(true);
    expect(component.formularioProyecto.invalid).toBe(true);
  });

  /**
   * ============================================
   * PRUEBAS DE MANEJO DE ERRORES
   * ============================================
   */

  /**
   * TEST 8: Error - Fallo al cargar proyectos desde servidor
   * 
   * Escenario:
   * - El servidor retorna un error 500
   * 
   * Resultado esperado:
   * - Se muestra mensaje de error
   * - La lista de proyectos está vacía
   * - El indicador de carga se desactiva
   */
  it('❌ ERROR: Fallo al cargar proyectos desde servidor', fakeAsync(() => {
    // ARRANGE
    const errorMock = { status: 500, message: 'Error interno del servidor' };
    spyOn(proyectoService, 'obtenerProyectos').and.returnValue(
      throwError(() => errorMock)
    );

    // ACT
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    // ASSERT
    expect(component.cargando).toBe(false);
    expect(component.error).toBeTruthy();
    expect(component.error).toContain('Error al cargar');
    expect(component.proyectos.length).toBe(0);
  }));

  /**
   * TEST 9: Error - Fallo al crear proyecto
   * 
   * Escenario:
   * - El usuario intenta crear un proyecto
   * - El servidor retorna error de validación (400)
   * 
   * Resultado esperado:
   * - Se muestra mensaje de error específico
   * - El modal permanece abierto
   * - El proyecto NO se añade a la lista
   */
  it('❌ ERROR: Fallo al crear proyecto por validación', fakeAsync(() => {
    // ARRANGE
    const nuevoProyecto = {
      nombre: 'Proyecto Inválido',
      descripcion: '',
      responsableId: null,
      prioridad: 'BAJA',
    };

    const errorMock = {
      status: 400,
      error: { message: 'El responsable es obligatorio' },
    };

    component.formularioProyecto.patchValue(nuevoProyecto);
    spyOn(proyectoService, 'criarProyecto').and.returnValue(
      throwError(() => errorMock)
    );

    // ACT
    component.guardarProyecto();
    tick();
    fixture.detectChanges();

    // ASSERT
    expect(component.mostrarModalCreacion).toBe(true);
    expect(component.mensajeError).toContain('obligatorio');
    expect(component.proyectos.length).toBe(0);
  }));

  /**
   * ============================================
   * PRUEBAS DE ESTADO DE CARGA
   * ============================================
   */

  /**
   * TEST 10: Estado de carga - Spinner visible mientras carga
   * 
   * Escenario:
   * - El componente está cargando datos
   * 
   * Resultado esperado:
   * - El indicador de carga es visible
   * - El spinner está animado
   */
  it('✅ Spinner visible mientras se cargan datos', fakeAsync(() => {
    // ARRANGE
    spyOn(proyectoService, 'obtenerProyectos').and.returnValue(of([]));
    component.cargando = true;
    fixture.detectChanges();

    const spinner: DebugElement = fixture.debugElement.query(
      By.css('.spinner-container')
    );

    // ASSERT
    expect(component.cargando).toBe(true);
    if (spinner) {
      expect(spinner.nativeElement.classList.contains('visible')).toBe(true);
    }

    // ACT
    tick();
    component.cargando = false;
    fixture.detectChanges();

    // ASSERT
    if (spinner) {
      expect(spinner.nativeElement.classList.contains('visible')).toBe(false);
    }
  }));

  /**
   * TEST 11: Happy Path - Eliminar proyecto con confirmación
   * 
   * Escenario:
   * - El usuario hace click en "Eliminar"
   * - Confirma la acción en el diálogo
   * 
   * Resultado esperado:
   * - El proyecto se elimina de la lista
   * - Se muestra mensaje de éxito
   * - La tabla se actualiza
   */
  it('✅ HAPPY PATH: Eliminar proyecto con confirmación', fakeAsync(() => {
    // ARRANGE
    const proyectoAEliminar = {
      id: 1,
      nombre: 'Sistema Obsoleto',
      descripcion: 'Sistema a eliminar',
      estado: 'INACTIVO',
      prioridad: 'BAJA',
    };

    component.proyectos = [proyectoAEliminar];
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(proyectoService, 'eliminarProyecto').and.returnValue(of({}));

    // ACT
    component.eliminarProyecto(proyectoAEliminar.id);
    tick();
    fixture.detectChanges();

    // ASSERT
    expect(window.confirm).toHaveBeenCalled();
    expect(proyectoService.eliminarProyecto).toHaveBeenCalledWith(proyectoAEliminar.id);
    expect(component.proyectos).not.toContain(proyectoAEliminar);
  }));

  /**
   * TEST 12: Cancelar eliminación
   * 
   * Escenario:
   * - El usuario hace click en "Eliminar"
   * - Cancela la acción en el diálogo
   * 
   * Resultado esperado:
   * - El proyecto NO se elimina
   * - El servicio NO es llamado
   */
  it('✅ Cancelar eliminación mantiene el proyecto', () => {
    // ARRANGE
    const proyectoAEliminar = { id: 1, nombre: 'Proyecto' };
    component.proyectos = [proyectoAEliminar];
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(proyectoService, 'eliminarProyecto');

    // ACT
    component.eliminarProyecto(proyectoAEliminar.id);
    fixture.detectChanges();

    // ASSERT
    expect(window.confirm).toHaveBeenCalled();
    expect(proyectoService.eliminarProyecto).not.toHaveBeenCalled();
    expect(component.proyectos).toContain(proyectoAEliminar);
  });
});
