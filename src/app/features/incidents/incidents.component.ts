/**
 * @fileoverview Componente de gestión de incidencias con Reactive Forms
 * 
 * **Responsabilidades:**
 * - Listar incidencias con filtros y búsqueda en tiempo real
 * - Crear nuevas incidencias mediante formulario validado
 * - Editar incidencias existentes con validación
 * - Cambiar estado y prioridad de incidencias
 * - Resolver incidencias con descripción obligatoria
 * - Mostrar estadísticas en tiempo real
 * 
 * **Mejoras implementadas:**
 * - ✅ Reactive Forms con FormBuilder y validadores personalizados
 * - ✅ Integración con componentes reutilizables (app-modal, app-input, app-button)
 * - ✅ Validación en tiempo real con feedback visual
 * - ✅ Modales accesibles con focus trap
 * - ✅ Estados de loading y disabled apropiados
 * - ✅ Confirmación antes de cerrar formularios con cambios
 * 
 * **Validaciones aplicadas:**
 * - Título: requerido, sin espacios en blanco, min 5 caracteres, max 100
 * - Descripción: requerido, min 10 palabras, max 500 caracteres, sin palabras prohibidas
 * - Resolución: requerido al marcar como resuelto, min 5 palabras
 * 
 * @author Equipo SWO
 * @version 2.0.0
 * @since 2026-04-19
 */

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IncidentsService } from '../../core/services/incidents.service';
import { NotificationService } from '../../core/services/notification.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { Incidencia } from '../../core/models/models';
import { CustomValidators } from '../../shared/validators/custom-validators';
import { VALIDATION_CONSTANTS, NOTIFICATION_MESSAGES } from '../../core/constants/app.constants';
import { EstadoIncidencia, PrioridadIncidencia } from '../../core/enums/app.enums';

/**
 * Componente de gestión de incidencias
 * Maneja el CRUD completo de incidencias con formularios reactivos validados
 */
@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SidebarComponent,
    ModalComponent,
    ButtonComponent,
    InputComponent
  ],
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {

  // ═════════════════════════════════════════════════════════════════════════
  // INYECCIÓN DE DEPENDENCIAS
  // ═════════════════════════════════════════════════════════════════════════

  private readonly fb = inject(FormBuilder);
  private readonly incidentsService = inject(IncidentsService);
  private readonly notificationService = inject(NotificationService);

  // ═════════════════════════════════════════════════════════════════════════
  // DATOS Y ESTADO
  // ═════════════════════════════════════════════════════════════════════════

  /** Lista completa de incidencias del servicio */
  incidentes: Incidencia[] = [];

  /** Lista filtrada según criterios de búsqueda y estado */
  incidentesFiltrados: Incidencia[] = [];

  /** Filtro de estado seleccionado (all, open, inprogress, pending, resolved) */
  filtroEstado: string = 'all';

  /** Término de búsqueda para filtrar incidencias */
  busqueda: string = '';

  /** Incidencia seleccionada para ver/editar detalle */
  incidenteSeleccionado: Incidencia | null = null;

  // ═════════════════════════════════════════════════════════════════════════
  // FORMULARIOS REACTIVOS
  // ═════════════════════════════════════════════════════════════════════════

  /** Formulario reactivo para crear nueva incidencia */
  nuevaIncidenciaForm!: FormGroup;

  /** Formulario reactivo para editar incidencia existente */
  edicionForm!: FormGroup;

  /** Formulario reactivo para resolver incidencia */
  resolucionForm!: FormGroup;

  // ═════════════════════════════════════════════════════════════════════════
  // ESTADOS DE UI
  // ═════════════════════════════════════════════════════════════════════════

  /** Controla la visibilidad del modal de nueva incidencia */
  mostrarModalNueva: boolean = false;

  /** Controla la visibilidad del modal de detalle */
  mostrarDetalle: boolean = false;

  /** Indica si está guardando una nueva incidencia */
  guardando: boolean = false;

  /** Indica si está guardando cambios en edición/resolución */
  guardandoCambios: boolean = false;

  /** Indica si el modal de detalle está en modo edición */
  modoEdicion: boolean = false;

  /** Indica si el modal de detalle está en modo resolución */
  modoResolucion: boolean = false;

  // ═════════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═════════════════════════════════════════════════════════════════════════

  ngOnInit(): void {
    this.initForms();
    this.cargarIncidentes();
  }

  // ═════════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═════════════════════════════════════════════════════════════════════════

  ngOnInit(): void {
    this.initForms();
    this.cargarIncidentes();
  }

  // ═════════════════════════════════════════════════════════════════════════
  // INICIALIZACIÓN DE FORMULARIOS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Inicializa todos los formularios reactivos con validadores
   * @private
   */
  private initForms(): void {
    // Formulario de nueva incidencia
    this.nuevaIncidenciaForm = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          CustomValidators.noWhitespace(),
          Validators.minLength(VALIDATION_CONSTANTS.TITULO_MIN_LENGTH),
          Validators.maxLength(VALIDATION_CONSTANTS.TITULO_MAX_LENGTH)
        ]
      ],
      descripcion: [
        '',
        [
          Validators.required,
          CustomValidators.noWhitespace(),
          CustomValidators.minWords(10),
          Validators.maxLength(500),
          CustomValidators.forbiddenWords(['test', 'prueba', 'spam'])
        ]
      ],
      estado: ['Abierto'],
      impacto: ['Medio'],
      ubicacion: ['', Validators.maxLength(100)],
      categoria: [''],
      aplicacion: [''],
      actividad: [''],
      urgencia: ['Media']
    });

    // Formulario de edición
    this.edicionForm = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          CustomValidators.noWhitespace(),
          Validators.minLength(VALIDATION_CONSTANTS.TITULO_MIN_LENGTH),
          Validators.maxLength(VALIDATION_CONSTANTS.TITULO_MAX_LENGTH)
        ]
      ],
      descripcion: [
        '',
        [
          Validators.required,
          CustomValidators.noWhitespace(),
          Validators.maxLength(500)
        ]
      ],
      estado: [''],
      impacto: [''],
      ubicacion: ['', Validators.maxLength(100)]
    });

    // Formulario de resolución
    this.resolucionForm = this.fb.group({
      resolucion: [
        '',
        [
          Validators.required,
          CustomValidators.noWhitespace(),
          CustomValidators.minWords(5),
          Validators.maxLength(500)
        ]
      ]
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CARGA Y FILTRADO DE DATOS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Carga las incidencias desde el servicio y aplica filtros
   */
  cargarIncidentes(): void {
    this.incidentsService.obtenerIncidencias().subscribe(
      (incidentes: Incidencia[]) => {
        this.incidentes = incidentes;
        this.aplicarFiltros();
      }
    );
  }

  /**
   * Aplica filtros de estado y búsqueda sobre la lista de incidencias
   */
  aplicarFiltros(): void {
    const termino = this.busqueda.toLowerCase().trim();
    
    this.incidentesFiltrados = this.incidentes.filter(inc => {
      // Filtro por estado
      const cumpleFiltro = this.filtroEstado === 'all' || inc.state === this.filtroEstado;
      
      // Búsqueda en múltiples campos
      const cumpleBusqueda = termino === '' ||
        inc.id.toLowerCase().includes(termino) ||
        inc.title.toLowerCase().includes(termino) ||
        inc.reason.toLowerCase().includes(termino) ||
        inc.project.toLowerCase().includes(termino);
      
      return cumpleFiltro && cumpleBusqueda;
    });
  }

  /**
   * Manejador para cambio de filtro de estado
   */
  onFiltroChange(): void {
    this.aplicarFiltros();
  }

  /**
   * Manejador para cambio en búsqueda
   */
  onBusquedaChange(): void {
    this.aplicarFiltros();
  }

  // ═════════════════════════════════════════════════════════════════════════
  // GESTIÓN DE MODALES - NUEVA INCIDENCIA
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Abre el modal de nueva incidencia y resetea el formulario
   */
  abrirModalNueva(): void {
    this.nuevaIncidenciaForm.reset({
      titulo: '',
      descripcion: '',
      estado: 'Abierto',
      impacto: 'Medio',
      ubicacion: '',
      categoria: '',
      aplicacion: '',
      actividad: '',
      urgencia: 'Media'
    });
    this.mostrarModalNueva = true;
  }

  /**
   * Cierra el modal de nueva incidencia
   */
  cerrarModalNueva(): void {
    this.mostrarModalNueva = false;
    this.nuevaIncidenciaForm.reset();
  }

  /**
   * Guarda una nueva incidencia con validación
   */
  guardarNuevaIncidencia(): void {
    // Validar formulario
    if (this.nuevaIncidenciaForm.invalid) {
      this.nuevaIncidenciaForm.markAllAsTouched();
      this.notificationService.toast(
        NOTIFICATION_MESSAGES.ERROR.VALIDATION_FAILED,
        3000,
        'error'
      );
      return;
    }

    this.guardando = true;
    const datos = this.nuevaIncidenciaForm.value;

    this.incidentsService.crearIncidencia(datos).subscribe({
      next: (resp) => {
        this.guardando = false;
        this.cerrarModalNueva();
        
        if (resp?.local) {
          this.notificationService.toast(
            'Guardado localmente (sin conexión al servidor)',
            4000,
            'warning'
          );
        } else {
          this.notificationService.toast(
            NOTIFICATION_MESSAGES.SUCCESS.INCIDENT_CREATED,
            3000,
            'success'
          );
        }
        
        this.incidentsService.cargarDesdeBackend();
      },
      error: () => {
        this.guardando = false;
        this.notificationService.toast(
          NOTIFICATION_MESSAGES.ERROR.SAVE_FAILED,
          3000,
          'error'
        );
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GESTIÓN DE MODALES - DETALLE/EDICIÓN
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Abre el modal de detalle para una incidencia
   * @param incidente - Incidencia a mostrar
   */
  verDetalle(incidente: Incidencia): void {
    this.incidenteSeleccionado = incidente;
    this.modoEdicion = false;
    this.modoResolucion = false;
    this.mostrarDetalle = true;
  }

  /**
   * Cierra el modal de detalle
   */
  cerrarDetalle(): void {
    this.mostrarDetalle = false;
    this.incidenteSeleccionado = null;
    this.modoEdicion = false;
    this.modoResolucion = false;
    this.edicionForm.reset();
    this.resolucionForm.reset();
  }

  /**
   * Activa el modo edición y pre-llena el formulario
   */
  entrarModoEdicion(): void {
    if (!this.incidenteSeleccionado) return;
    
    const inc = this.incidenteSeleccionado;
    this.edicionForm.patchValue({
      titulo: inc.title,
      descripcion: inc.reason,
      estado: this.estadoAEspanol(inc.state),
      impacto: this.prioridadAImpacto(inc.priority),
      ubicacion: inc.project
    });

    this.modoEdicion = true;
    this.modoResolucion = false;
  }

  /**
   * Cancela la edición y vuelve al modo vista
   */
  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.modoResolucion = false;
    this.edicionForm.reset();
    this.resolucionForm.reset();
  }

  /**
   * Guarda los cambios de la edición
   */
  guardarEdicion(): void {
    if (!this.incidenteSeleccionado) return;

    if (this.edicionForm.invalid) {
      this.edicionForm.markAllAsTouched();
      this.notificationService.toast(
        NOTIFICATION_MESSAGES.ERROR.VALIDATION_FAILED,
        3000,
        'error'
      );
      return;
    }

    this.guardandoCambios = true;
    const datos = this.edicionForm.value;

    this.incidentsService.actualizarIncidenciaBackend(
      this.incidenteSeleccionado.id,
      datos.titulo,
      datos.descripcion,
      datos.estado,
      datos.impacto,
      datos.ubicacion,
      '',
      false
    ).subscribe({
      next: () => {
        this.guardandoCambios = false;
        this.modoEdicion = false;
        this.notificationService.toast(
          NOTIFICATION_MESSAGES.SUCCESS.INCIDENT_UPDATED,
          3000,
          'success'
        );
        this.cerrarDetalle();
        this.cargarIncidentes();
      },
      error: () => {
        this.guardandoCambios = false;
        this.notificationService.toast(
          NOTIFICATION_MESSAGES.ERROR.UPDATE_FAILED,
          3000,
          'error'
        );
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GESTIÓN DE RESOLUCIÓN
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Activa el modo resolución
   */
  activarModoResolucion(): void {
    if (!this.incidenteSeleccionado) return;
    
    this.resolucionForm.patchValue({
      resolucion: this.incidenteSeleccionado.resolucion || ''
    });

    this.modoResolucion = true;
    this.modoEdicion = false;
  }

  /**
   * Marca la incidencia como resuelta
   */
  resolverIncidencia(): void {
    if (!this.incidenteSeleccionado) return;

    if (this.resolucionForm.invalid) {
      this.resolucionForm.markAllAsTouched();
      this.notificationService.toast(
        'Debes describir cómo se resolvió la incidencia',
        3000,
        'error'
      );
      return;
    }

    this.guardandoCambios = true;
    const inc = this.incidenteSeleccionado;
    const resolucion = this.resolucionForm.value.resolucion;

    this.incidentsService.actualizarIncidenciaBackend(
      inc.id,
      inc.title,
      inc.reason,
      'Resuelto',
      this.prioridadAImpacto(inc.priority),
      inc.project,
      resolucion,
      true
    ).subscribe({
      next: () => {
        this.guardandoCambios = false;
        this.modoResolucion = false;
        this.notificationService.toast(
          'Incidencia marcada como resuelta',
          3000,
          'success'
        );
        this.cerrarDetalle();
        this.cargarIncidentes();
      },
      error: () => {
        this.guardandoCambios = false;
        this.notificationService.toast(
          'Error al resolver la incidencia',
          3000,
          'error'
        );
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ACCIONES RÁPIDAS (TABLA)
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Cambia el estado de una incidencia desde la tabla
   */
  cambiarEstado(incidente: Incidencia, event: Event): void {
    const nuevoEstado = (event.target as HTMLSelectElement).value;
    this.incidentsService.cambiarEstado(
      incidente.id,
      nuevoEstado as 'open' | 'inprogress' | 'pending' | 'resolved'
    );
    this.notificationService.toast(
      `Estado de ${incidente.id} actualizado`,
      2000,
      'success'
    );
  }

  /**
   * Cambia la prioridad de una incidencia desde la tabla
   */
  cambiarPrioridad(incidente: Incidencia, event: Event): void {
    const nuevaPrioridad = (event.target as HTMLSelectElement).value;
    this.incidentsService.cambiarPrioridad(
      incidente.id,
      nuevaPrioridad as 'Baja' | 'Media' | 'Alta' | 'Crítica'
    );
    this.notificationService.toast(
      'Prioridad actualizada',
      2000,
      'success'
    );
  }

  /**
   * Asigna una incidencia a un responsable
   */
  asignar(incidente: Incidencia, nuevoAsignado: string): void {
    this.incidentsService.asignarIncidencia(incidente.id, nuevoAsignado);
    this.notificationService.toast(
      `Asignado a ${nuevoAsignado}`,
      2000,
      'success'
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ESTADÍSTICAS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Obtiene las estadísticas actuales del servicio
   */
  obtenerEstadisticas() {
    return this.incidentsService.obtenerEstadísticas();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GETTERS PARA MENSAJES DE ERROR
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Mensaje de error para el campo título (nueva incidencia)
   */
  get tituloNuevaError(): string {
    return this.getFieldError(this.nuevaIncidenciaForm, 'titulo');
  }

  /**
   * Mensaje de error para el campo descripción (nueva incidencia)
   */
  get descripcionNuevaError(): string {
    return this.getFieldError(this.nuevaIncidenciaForm, 'descripcion');
  }

  /**
   * Mensaje de error para el campo título (edición)
   */
  get tituloEdicionError(): string {
    return this.getFieldError(this.edicionForm, 'titulo');
  }

  /**
   * Mensaje de error para el campo descripción (edición)
   */
  get descripcionEdicionError(): string {
    return this.getFieldError(this.edicionForm, 'descripcion');
  }

  /**
   * Mensaje de error para el campo resolución
   */
  get resolucionError(): string {
    return this.getFieldError(this.resolucionForm, 'resolucion');
  }

  /**
   * Obtiene el mensaje de error apropiado para un campo
   * @private
   */
  private getFieldError(form: FormGroup, fieldName: string): string {
    const control = form.get(fieldName);
    
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'Este campo es obligatorio';
    }

    if (control.errors['whitespace']) {
      return 'No puede contener solo espacios en blanco';
    }

    if (control.errors['minlength']) {
      return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    }

    if (control.errors['maxlength']) {
      return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
    }

    if (control.errors['minWords']) {
      return `Debe contener al menos ${control.errors['minWords'].required} palabras`;
    }

    if (control.errors['forbiddenWords']) {
      return `Contiene palabras no permitidas: ${control.errors['forbiddenWords'].word}`;
    }

    return 'Campo inválido';
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // UTILIDADES
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Convierte estado interno a formato español
   * @private
   */
  private estadoAEspanol(state: string): string {
    const map: {[k: string]: string} = {
      'open': 'Abierto',
      'inprogress': 'En Progreso',
      'pending': 'Pendiente',
      'resolved': 'Resuelto'
    };
    return map[state] || 'Abierto';
  }

  /**
   * Convierte prioridad a formato de impacto del backend
   * @private
   */
  private prioridadAImpacto(priority: string): string {
    const map: {[k: string]: string} = {
      'Baja': 'Bajo',
      'Media': 'Medio',
      'Alta': 'Alto',
      'Crítica': 'Critico'
    };
    return map[priority] || 'Medio';
  }

  /**
   * Verifica si el formulario de nueva incidencia tiene cambios sin guardar
   */
  get formularioNuevaTieneCambios(): boolean {
    return this.nuevaIncidenciaForm.dirty;
  }

  /**
   * Verifica si el formulario de edición tiene cambios sin guardar
   */
  get formularioEdicionTieneCambios(): boolean {
    return this.edicionForm.dirty || this.resolucionForm.dirty) return;

    if (this.edicionForm.invalid) {
      this.edicionForm.markAllAsTouched();
      this.notificationService.toast(
        NOTIFICATION_MESSAGES.ERROR.VALIDATION_FAILED,
        3000,
        'error'
      );
      return;
    }

    this.guardandoCambios = true;
    const datos = this.edicionForm.value;

    this.incidentsService.actualizarIncidenciaBackend(
      this.incidenteSeleccionado.id,
      datos.titulo,
      datos.descripcion,
      datos.estado,
      datos.impacto,
      datos.ubicacion,
      '',
      false
    ).subscribe({
      next: () => {
        this.guardandoCambios = false;
        this.modoEdicion = false;
        this.notificationService.toast(
          NOTIFICATION_MESSAGES.SUCCESS.INCIDENT_UPDATED,
          3000,
          'success'
        );
        this.cerrarDetalle();
        this.cargarIncidentes();
      },
      error: () => {
        this.guardandoCambios = false;
        this.notificationService.toast(
          NOTIFICATION_MESSAGES.ERROR.UPDATE_FAILED,
          3000,
          'error'
        );
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GESTIÓN DE RESOLUCIÓN
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Activa el modo resolución
   */
  activarModoResolucion(): void {
    if (!this.incidenteSeleccionado) return;
    
    this.resolucionForm.patchValue({
      resolucion: this.incidenteSeleccionado.resolucion || ''
    });

    this.modoResolucion = true;
    this.modoEdicion = false;
  }

  /**
   * Marca la incidencia como resuelta
   */
  resolverIncidencia(): void {
    if (!this.incidenteSeleccionado) return;

    if (this.resolucionForm.invalid) {
      this.resolucionForm.markAllAsTouched();
      this.notificationService.toast(
        'Debes describir cómo se resolvió la incidencia',
        3000,
        'error'
      );
      return;
    }

    this.guardandoCambios = true;
    const inc = this.incidenteSeleccionado;
    const resolucion = this.resolucionForm.value.resolucion;

    this.incidentsService.actualizarIncidenciaBackend(
      inc.id,
      inc.title,
      inc.reason,
      'Resuelto',
      this.prioridadAImpacto(inc.priority),
      inc.project,
      resolucion,
      true
    ).subscribe({
      next: () => {
        this.guardandoCambios = false;
        this.modoResolucion = false;
        this.notificationService.toast(
          'Incidencia marcada como resuelta',
          3000,
          'success'
        );
        this.cerrarDetalle();
        this.cargarIncidentes();
      },
      error: () => {
        this.guardandoCambios = false;
        this.notificationService.toast(
          'Error al resolver la incidencia',
          3000,
          'error'
        );
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ACCIONES RÁPIDAS (TABLA)
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Cambia el estado de una incidencia desde la tabla
   */
  cambiarEstado(incidente: Incidencia, event: Event): void {
    const nuevoEstado = (event.target as HTMLSelectElement).value;
    this.incidentsService.cambiarEstado(
      incidente.id,
      nuevoEstado as 'open' | 'inprogress' | 'pending' | 'resolved'
    );
    this.notificationService.toast(
      `Estado de ${incidente.id} actualizado`,
      2000,
      'success'
    );
  }

  /**
   * Cambia la prioridad de una incidencia desde la tabla
   */
  cambiarPrioridad(incidente: Incidencia, event: Event): void {
    const nuevaPrioridad = (event.target as HTMLSelectElement).value;
    this.incidentsService.cambiarPrioridad(
      incidente.id,
      nuevaPrioridad as 'Baja' | 'Media' | 'Alta' | 'Crítica'
    );
    this.notificationService.toast(
      'Prioridad actualizada',
      2000,
      'success'
    );
  }

  /**
   * Asigna una incidencia a un responsable
   */
  asignar(incidente: Incidencia, nuevoAsignado: string): void {
    this.incidentsService.asignarIncidencia(incidente.id, nuevoAsignado);
    this.notificationService.toast(
      `Asignado a ${nuevoAsignado}`,
      2000,
      'success'
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ESTADÍSTICAS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Obtiene las estadísticas actuales del servicio
   */
  obtenerEstadisticas() {
    return this.incidentsService.obtenerEstadísticas();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GETTERS PARA MENSAJES DE ERROR
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Mensaje de error para el campo título (nueva incidencia)
   */
  get tituloNuevaError(): string {
    return this.getFieldError(this.nuevaIncidenciaForm, 'titulo');
  }

  /**
   * Mensaje de error para el campo descripción (nueva incidencia)
   */
  get descripcionNuevaError(): string {
    return this.getFieldError(this.nuevaIncidenciaForm, 'descripcion');
  }

  /**
   * Mensaje de error para el campo título (edición)
   */
  get tituloEdicionError(): string {
    return this.getFieldError(this.edicionForm, 'titulo');
  }

  /**
   * Mensaje de error para el campo descripción (edición)
   */
  get descripcionEdicionError(): string {
    return this.getFieldError(this.edicionForm, 'descripcion');
  }

  /**
   * Mensaje de error para el campo resolución
   */
  get resolucionError(): string {
    return this.getFieldError(this.resolucionForm, 'resolucion');
  }

  /**
   * Obtiene el mensaje de error apropiado para un campo
   * @private
   */
  private getFieldError(form: FormGroup, fieldName: string): string {
    const control = form.get(fieldName);
    
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'Este campo es obligatorio';
    }

    if (control.errors['whitespace']) {
      return 'No puede contener solo espacios en blanco';
    }

    if (control.errors['minlength']) {
      return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    }

    if (control.errors['maxlength']) {
      return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
    }

    if (control.errors['minWords']) {
      return `Debe contener al menos ${control.errors['minWords'].required} palabras`;
    }

    if (control.errors['forbiddenWords']) {
      return `Contiene palabras no permitidas: ${control.errors['forbiddenWords'].word}`;
    }

    return 'Campo inválido';
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // UTILIDADES
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Convierte estado interno a formato español
   * @private
   */
  private estadoAEspanol(state: string): string {
    const map: {[k: string]: string} = {
      'open': 'Abierto',
      'inprogress': 'En Progreso',
      'pending': 'Pendiente',
      'resolved': 'Resuelto'
    };
    return map[state] || 'Abierto';
  }

  /**
   * Convierte prioridad a formato de impacto del backend
   * @private
   */
  private prioridadAImpacto(priority: string): string {
    const map: {[k: string]: string} = {
      'Baja': 'Bajo',
      'Media': 'Medio',
      'Alta': 'Alto',
      'Crítica': 'Critico'
    };
    return map[priority] || 'Medio';
  }

  /**
   * Verifica si el formulario de nueva incidencia tiene cambios sin guardar
   */
  get formularioNuevaTieneCambios(): boolean {
    return this.nuevaIncidenciaForm.dirty;
  }

  /**
   * Verifica si el formulario de edición tiene cambios sin guardar
   */
  get formularioEdicionTieneCambios(): boolean {
    return this.edicionForm.dirty || this.resolucionForm.dirty;
  }
}
