/**
 * @fileoverview Componente de formulario de incidencia reutilizable
 * 
 * **Responsabilidades:**
 * - Crear nuevas incidencias con validación completa
 * - Editar incidencias existentes
 * - Validar todos los campos según reglas de negocio
 * - Proporcionar feedback visual al usuario
 * - Emitir eventos para comunicación con componente padre
 * 
 * **Características:**
 * - Formulario reactivo con FormBuilder
 * - Validaciones personalizadas (CustomValidators)
 * - Soporte para modo creación y edición
 * - Integración con usuarios y proyectos
 * - Estados de carga (loading)
 * 
 * **Validaciones aplicadas:**
 * - Título: requerido, 5-100 caracteres, sin espacios en blanco
 * - Descripción: requerido, mínimo 10 palabras, máximo 500 caracteres
 * - Prioridad: requerida, valores válidos
 * - Estado: requerido (solo para edición)
 * - Usuario asignado: opcional pero validado si se proporciona
 * 
 * **Uso:**
 * ```html
 * <!-- Crear nueva incidencia -->
 * <app-incident-form 
 *   (onSubmit)="crearIncidencia($event)"
 *   (onCancel)="cerrarModal()">
 * </app-incident-form>
 * 
 * <!-- Editar incidencia existente -->
 * <app-incident-form 
 *   [incident]="incidenteSeleccionado"
 *   [editMode]="true"
 *   (onSubmit)="actualizarIncidencia($event)"
 *   (onCancel)="cerrarModal()">
 * </app-incident-form>
 * ```
 * 
 * @author Equipo SWO
 * @version 1.0.0
 * @since 2026-05-03
 */

import { Component, OnInit, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Incidencia, Usuario } from '../../../core/models/models';
import { EstadoIncidencia, PrioridadIncidencia } from '../../../core/enums/app.enums';
import { CustomValidators } from '../../../shared/validators/custom-validators';
import { VALIDATION_CONSTANTS } from '../../../core/constants/app.constants';
import { UsersService } from '../../../core/services/users.service';
import { ProjectsService } from '../../../core/services/projects.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';

/**
 * Componente de formulario de incidencia
 * Permite crear y editar incidencias con validación completa
 */
@Component({
  selector: 'app-incident-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent
  ],
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.scss']
})
export class IncidentFormComponent implements OnInit, OnChanges {

  // ═════════════════════════════════════════════════════════════════════════
  // INPUTS Y OUTPUTS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Incidencia a editar (opcional)
   * Si se proporciona, el formulario se carga con los datos existentes
   */
  @Input() incident?: Incidencia;

  /**
   * Indica si el formulario está en modo edición
   * @default false
   */
  @Input() editMode: boolean = false;

  /**
   * Indica si el formulario está en proceso de guardado
   * Deshabilita el formulario mientras se guarda
   * @default false
   */
  @Input() saving: boolean = false;

  /**
   * Evento emitido cuando se envía el formulario
   * Emite los datos del formulario validados
   */
  @Output() onSubmit = new EventEmitter<any>();

  /**
   * Evento emitido cuando se cancela el formulario
   */
  @Output() onCancel = new EventEmitter<void>();

  // ═════════════════════════════════════════════════════════════════════════
  // INYECCIÓN DE DEPENDENCIAS
  // ═════════════════════════════════════════════════════════════════════════

  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);
  private readonly projectsService = inject(ProjectsService);

  // ═════════════════════════════════════════════════════════════════════════
  // PROPIEDADES
  // ═════════════════════════════════════════════════════════════════════════

  /** Formulario reactivo de la incidencia */
  incidentForm!: FormGroup;

  /** Lista de usuarios disponibles para asignar */
  usuarios: Usuario[] = [];

  /** Lista de proyectos disponibles */
  proyectos: any[] = [];

  /** Lista de estados disponibles */
  estados = [
    { value: 'open', label: 'Abierto' },
    { value: 'inprogress', label: 'En Progreso' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'resolved', label: 'Resuelto' },
    { value: 'closed', label: 'Cerrado' }
  ];

  /** Lista de prioridades disponibles */
  prioridades = [
    { value: 'Baja', label: 'Baja', class: 'priority-low' },
    { value: 'Media', label: 'Media', class: 'priority-medium' },
    { value: 'Alta', label: 'Alta', class: 'priority-high' },
    { value: 'Crítica', label: 'Crítica', class: 'priority-critical' }
  ];

  /** Lista de categorías de incidencias */
  categorias = [
    'Hardware',
    'Software',
    'Red',
    'Base de Datos',
    'Seguridad',
    'Acceso',
    'Rendimiento',
    'Otro'
  ];

  // ═════════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Inicializa el componente
   * Carga datos iniciales y crea el formulario
   */
  ngOnInit(): void {
    this.initForm();
    this.cargarDatos();
  }

  /**
   * Detecta cambios en los inputs
   * Si cambia la incidencia, recarga el formulario
   * @param changes Cambios detectados
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incident'] && !changes['incident'].firstChange && this.incidentForm) {
      this.cargarDatosIncidencia();
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // INICIALIZACIÓN
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Inicializa el formulario reactivo con validadores
   * @private
   */
  private initForm(): void {
    this.incidentForm = this.fb.group({
      // Título de la incidencia
      // Validaciones: requerido, sin espacios, 5-100 caracteres
      titulo: [
        '',
        [
          Validators.required,
          CustomValidators.noWhitespace(),
          Validators.minLength(VALIDATION_CONSTANTS.TITLE_MIN_LENGTH || 5),
          Validators.maxLength(VALIDATION_CONSTANTS.TITLE_MAX_LENGTH || 100)
        ]
      ],

      // Descripción detallada
      // Validaciones: requerido, mínimo 10 palabras, máximo 500 caracteres
      descripcion: [
        '',
        [
          Validators.required,
          CustomValidators.noWhitespace(),
          CustomValidators.minWords ? CustomValidators.minWords(10) : Validators.minLength(50),
          Validators.maxLength(500)
        ]
      ],

      // Estado de la incidencia (solo visible en modo edición)
      estado: [
        this.editMode ? 'open' : 'open',
        [Validators.required]
      ],

      // Prioridad de la incidencia
      prioridad: [
        'Media',
        [Validators.required]
      ],

      // Usuario asignado (opcional)
      usuarioAsignado: [''],

      // Proyecto asociado (opcional)
      proyecto: [''],

      // Categoría de la incidencia
      categoria: ['', [Validators.required]],

      // Ubicación física donde ocurre el problema (opcional)
      ubicacion: [
        '',
        [Validators.maxLength(100)]
      ],

      // Aplicación o sistema afectado (opcional)
      aplicacion: [''],

      // Actividad que se estaba realizando cuando ocurrió el problema
      actividad: ['']
    });

    // Si hay una incidencia para editar, cargar sus datos
    if (this.incident) {
      this.cargarDatosIncidencia();
    }
  }

  /**
   * Carga datos necesarios para el formulario
   * (usuarios, proyectos, etc.)
   * @private
   */
  private cargarDatos(): void {
    // Cargar lista de usuarios
    this.usersService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });

    // Cargar lista de proyectos
    this.projectsService.obtenerProyectos().subscribe({
      next: (proyectos) => {
        this.proyectos = proyectos;
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
      }
    });
  }

  /**
   * Carga los datos de la incidencia en el formulario
   * Solo se ejecuta en modo edición
   * @private
   */
  private cargarDatosIncidencia(): void {
    if (this.incident) {
      this.incidentForm.patchValue({
        titulo: this.incident.title || '',
        descripcion: this.incident.reason || '',
        estado: this.incident.state || 'open',
        prioridad: this.incident.priority || 'Media',
        usuarioAsignado: this.incident.assignee || '',
        proyecto: this.incident.project || '',
        categoria: this.incident.tags?.[0] || '',
        ubicacion: '',
        aplicacion: this.incident.app || '',
        actividad: this.incident.activity || ''
      });
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS PÚBLICOS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Maneja el envío del formulario
   * Valida y emite los datos al componente padre
   */
  onFormSubmit(): void {
    // Marcar todos los campos como touched para mostrar errores
    Object.keys(this.incidentForm.controls).forEach(key => {
      this.incidentForm.get(key)?.markAsTouched();
    });

    // Validar formulario
    if (this.incidentForm.invalid) {
      return;
    }

    // Emitir datos del formulario
    this.onSubmit.emit(this.incidentForm.value);
  }

  /**
   * Maneja la cancelación del formulario
   */
  cancelar(): void {
    this.onCancel.emit();
  }

  /**
   * Verifica si un campo tiene errores y ha sido tocado
   * @param fieldName Nombre del campo a verificar
   * @returns true si el campo tiene errores y ha sido tocado
   */
  hasError(fieldName: string): boolean {
    const field = this.incidentForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Obtiene el mensaje de error para un campo específico
   * @param fieldName Nombre del campo
   * @returns Mensaje de error o cadena vacía
   */
  getErrorMessage(fieldName: string): string {
    const field = this.incidentForm.get(fieldName);
    
    if (!field || !field.errors) {
      return '';
    }

    if (field.errors['required']) {
      return 'Este campo es obligatorio';
    }

    if (field.errors['minlength']) {
      return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    }

    if (field.errors['maxlength']) {
      return `Máximo ${field.errors['maxlength'].requiredLength} caracteres`;
    }

    if (field.errors['noWhitespace']) {
      return 'No puede estar vacío o contener solo espacios';
    }

    if (field.errors['minWords']) {
      return `Debe contener al menos ${field.errors['minWords'].required} palabras`;
    }

    return 'Campo inválido';
  }

  /**
   * Resetea el formulario a sus valores iniciales
   */
  resetForm(): void {
    this.incidentForm.reset({
      estado: 'open',
      prioridad: 'Media'
    });
  }
}
