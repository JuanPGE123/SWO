import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ProjectsComponent } from './projects.component';
import { ProjectsService } from '../../core/services/projects.service';
import { NotificationService } from '../../core/services/notification.service';
import { Proyecto } from '../../core/models/models';

/**
 * Pruebas Unitarias para ProjectsComponent
 *
 * Cobertura:
 * - Inicialización y carga de datos
 * - Happy Path: Abrir/cerrar modal de creación
 * - Happy Path: Guardar proyecto exitosamente
 * - Happy Path: Eliminar proyecto con confirmación
 * - Validación: Guardar proyecto sin nombre muestra toast de error
 * - Error: Fallo al guardar proyecto
 *
 * @version 1.0
 */
describe('ProjectsComponent - Pruebas Unitarias', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let projectsServiceSpy: jasmine.SpyObj<ProjectsService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  const proyectosMock: Proyecto[] = [
    {
      idProyecto: 1,
      nombre: 'Sistema de Facturación',
      descripcion: 'Módulo de facturación',
      estado: 'Activo',
      fechaCreacion: '2026-01-15',
    } as any,
    {
      idProyecto: 2,
      nombre: 'Portal de Clientes',
      descripcion: 'Portal self-service',
      estado: 'Activo',
      fechaCreacion: '2026-02-10',
    } as any,
  ];

  beforeEach(async () => {
    projectsServiceSpy = jasmine.createSpyObj('ProjectsService', [
      'obtenerProyectos',
      'cargarDesdeBackend',
      'crearProyecto',
      'eliminarProyecto',
      'asignarUsuario',
    ]);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['toast']);

    projectsServiceSpy.obtenerProyectos.and.returnValue(of(proyectosMock));
    projectsServiceSpy.cargarDesdeBackend.and.returnValue(undefined as any);

    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: ProjectsService, useValue: projectsServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Inicialización ────────────────────────────────────────────────────────

  it('✅ Debe crear el componente ProjectsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('✅ HAPPY PATH: Cargar proyectos al inicializar', () => {
    expect(projectsServiceSpy.obtenerProyectos).toHaveBeenCalled();
    expect(component.proyectos).toEqual(proyectosMock);
    expect(component.cargando).toBeFalse();
  });

  it('✅ El estado inicial no muestra modales', () => {
    expect(component.mostrarModal).toBeFalse();
    expect(component.mostrarAsignar).toBeFalse();
  });

  // ── Modal de creación ─────────────────────────────────────────────────────

  it('✅ HAPPY PATH: abrirModal() muestra el modal y reinicia el formulario', () => {
    component.nuevoProyecto = { nombre: 'existente', descripcion: 'desc', estado: 'Activo' };
    component.abrirModal();

    expect(component.mostrarModal).toBeTrue();
    expect(component.nuevoProyecto.nombre).toBe('');
    expect(component.nuevoProyecto.descripcion).toBe('');
  });

  it('✅ HAPPY PATH: cerrarModal() oculta el modal', () => {
    component.mostrarModal = true;
    component.cerrarModal();
    expect(component.mostrarModal).toBeFalse();
  });

  // ── Guardar proyecto ──────────────────────────────────────────────────────

  it('✅ HAPPY PATH: guardarProyecto() crea proyecto y cierra modal', fakeAsync(() => {
    projectsServiceSpy.crearProyecto.and.returnValue(of({} as any));
    component.mostrarModal = true;
    component.nuevoProyecto = { nombre: 'Nuevo Sistema', descripcion: 'Descripción', estado: 'Activo' };

    component.guardarProyecto();
    tick();

    expect(projectsServiceSpy.crearProyecto).toHaveBeenCalledWith('Nuevo Sistema', 'Descripción', 'Activo');
    expect(component.mostrarModal).toBeFalse();
    expect(component.guardando).toBeFalse();
    expect(notificationServiceSpy.toast).toHaveBeenCalled();
  }));

  it('❌ VALIDACIÓN: guardarProyecto() con nombre vacío muestra toast de error', () => {
    component.nuevoProyecto = { nombre: '   ', descripcion: '', estado: 'Activo' };

    component.guardarProyecto();

    expect(projectsServiceSpy.crearProyecto).not.toHaveBeenCalled();
    expect(notificationServiceSpy.toast).toHaveBeenCalledWith('El nombre es obligatorio', 3000, 'error');
  });

  it('❌ ERROR: guardarProyecto() con error del servidor muestra toast de error', fakeAsync(() => {
    projectsServiceSpy.crearProyecto.and.returnValue(throwError(() => ({ message: 'Server error' })));
    component.nuevoProyecto = { nombre: 'Proyecto X', descripcion: '', estado: 'Activo' };

    component.guardarProyecto();
    tick();

    expect(component.guardando).toBeFalse();
    expect(notificationServiceSpy.toast).toHaveBeenCalled();
  }));

  // ── Eliminar proyecto ─────────────────────────────────────────────────────

  it('✅ HAPPY PATH: eliminarProyecto() con confirmación llama al servicio', fakeAsync(() => {
    projectsServiceSpy.eliminarProyecto.and.returnValue(of({} as any));
    spyOn(window, 'confirm').and.returnValue(true);

    component.eliminarProyecto(1, 'Sistema de Facturación');
    tick();

    expect(projectsServiceSpy.eliminarProyecto).toHaveBeenCalledWith(1);
    expect(notificationServiceSpy.toast).toHaveBeenCalled();
  }));

  it('✅ Cancelar eliminación no llama al servicio', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.eliminarProyecto(1, 'Sistema de Facturación');

    expect(projectsServiceSpy.eliminarProyecto).not.toHaveBeenCalled();
  });

  // ── Panel de asignación ───────────────────────────────────────────────────

  it('✅ cerrarAsignar() oculta el panel de asignación', () => {
    component.mostrarAsignar = true;
    component.cerrarAsignar();
    expect(component.mostrarAsignar).toBeFalse();
  });

  it('❌ confirmarAsignacion() sin usuario seleccionado muestra toast de advertencia', () => {
    component.idUsuarioSeleccionado = 0;

    component.confirmarAsignacion();

    expect(notificationServiceSpy.toast).toHaveBeenCalledWith('Selecciona un usuario', 3000, 'warning');
    expect(projectsServiceSpy.asignarUsuario).not.toHaveBeenCalled();
  });
});
