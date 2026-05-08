/**
 * @fileoverview Componente de detalle de incidencia mejorado
 * 
 * **Responsabilidades:**
 * - Mostrar información completa de una incidencia
 * - Integrar componentes modulares (comentarios, archivos, historial)
 * - Permitir cambiar estado y prioridad
 * - Gestionar flujo completo de la incidencia
 * 
 * **Componentes integrados:**
 * - IncidentFormComponent: Edición de incidencia
 * - IncidentCommentsComponent: Gestión de comentarios
 * - IncidentFilesComponent: Archivos adjuntos
 * - IncidentHistoryComponent: Historial de cambios
 * 
 * **Características:**
 * - Navegación por pestañas (tabs)
 * - Cambio de estado con validación
 * - Asignación de técnicos
 * - Indicadores visuales de estado y prioridad
 * - Breadcrumb de navegación
 * - Acciones rápidas
 * 
 * @author Equipo SWO
 * @version 2.0.0
 * @since 2026-05-03
 */

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { IncidentsService } from '../../../core/services/incidents.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Incidencia, ArchivoAdjunto, HistorialCambio, Comentario } from '../../../core/models/models';
import { IncidentFormComponent } from '../incident-form/incident-form.component';
import { IncidentCommentsComponent } from '../incident-comments/incident-comments.component';
import { IncidentFilesComponent } from '../incident-files/incident-files.component';
import { IncidentHistoryComponent } from '../incident-history/incident-history.component';

/**
 * Componente de detalle de incidencia completo
 * Integra todos los componentes modulares del sistema
 */
@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SidebarComponent,
    ButtonComponent,
    IncidentFormComponent,
    IncidentCommentsComponent,
    IncidentFilesComponent,
    IncidentHistoryComponent
  ],
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.scss']
})
export class IncidentDetailComponent implements OnInit {

  // ═════════════════════════════════════════════════════════════════════════
  // INYECCIÓN DE DEPENDENCIAS
  // ═════════════════════════════════════════════════════════════════════════

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly incidentsService = inject(IncidentsService);
  private readonly notificationService = inject(NotificationService);
  private readonly authService = inject(AuthService);

  // ═════════════════════════════════════════════════════════════════════════
  // PROPIEDADES
  // ═════════════════════════════════════════════════════════════════════════

  /** ID de la incidencia actual */
  incidenteId: string = '';

  /** Incidencia completa */
  incidente?: Incidencia;

  /** Pestaña activa (info, comments, files, history) */
  tabActiva: string = 'info';

  /** Indica si está en modo edición */
  modoEdicion: boolean = false;

  /** Indica si está guardando cambios */
  guardando: boolean = false;

  /** Estado seleccionado para cambio */
  nuevoEstado: string = '';

  /** Muestra el selector de estado */
  mostrarSelectorEstado: boolean = false;

  /** Lista de estados disponibles */
  estados = [
    { value: 'open', label: 'Abierto', class: 'status-open' },
    { value: 'inprogress', label: 'En Progreso', class: 'status-inprogress' },
    { value: 'pending', label: 'Pendiente', class: 'status-pending' },
    { value: 'resolved', label: 'Resuelto', class: 'status-resolved' },
    { value: 'closed', label: 'Cerrado', class: 'status-closed' }
  ];

  /** Lista mock de archivos */
  archivos: ArchivoAdjunto[] = [];

  /** Lista mock de historial */
  historial: HistorialCambio[] = [];

  // ═════════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Inicializa el componente
   * Carga la incidencia según el ID de la ruta
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.incidenteId = params['id'];
      this.cargarIncidente();
      this.generarHistorialMock();
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS DE CARGA
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Carga los datos de la incidencia
   */
  cargarIncidente(): void {
    this.incidente = this.incidentsService.obtenerIncidenciaPorId(this.incidenteId);
    
    if (!this.incidente) {
      this.notificationService.toast('Incidencia no encontrada', 3000, 'error');
      this.router.navigate(['/dashboard/incidents']);
    }
  }

  /**
   * Genera historial mock para demostración
   * En producción, esto vendría del servicio
   * @private
   */
  private generarHistorialMock(): void {
    if (!this.incidente) return;

    this.historial = [
      {
        id: 'HIST-1',
        fecha: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        usuario: 'Sistema',
        tipo: 'creacion',
        accion: 'Incidencia creada',
        descripcion: `Se creó la incidencia ${this.incidenteId}`,
        icono: 'add_circle',
        color: 'success'
      },
      {
        id: 'HIST-2',
        fecha: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        usuario: 'María González',
        tipo: 'asignacion',
        accion: 'Asignación realizada',
        descripcion: `Incidencia asignada a ${this.incidente?.assignee || 'técnico'}`,
        valorNuevo: this.incidente?.assignee,
        icono: 'person_add',
        color: 'info'
      },
      {
        id: 'HIST-3',
        fecha: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        usuario: this.incidente?.assignee || 'Técnico',
        tipo: 'estado',
        accion: 'Cambio de estado',
        descripcion: 'Estado actualizado a En Progreso',
        valorAnterior: 'Abierto',
        valorNuevo: 'En Progreso',
        icono: 'sync',
        color: 'primary'
      }
    ];
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS DE NAVEGACIÓN
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Cambia la pestaña activa
   * @param tab Nombre de la pestaña
   */
  cambiarTab(tab: string): void {
    this.tabActiva = tab;
  }

  /**
   * Vuelve al listado de incidencias
   */
  volver(): void {
    this.router.navigate(['/dashboard/incidents']);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS DE EDICIÓN
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Activa el modo edición
   */
  activarEdicion(): void {
    this.modoEdicion = true;
  }

  /**
   * Cancela el modo edición
   */
  cancelarEdicion(): void {
    this.modoEdicion = false;
  }

  /**
   * Guarda los cambios de la incidencia
   * @param datos Datos del formulario
   */
  guardarCambios(datos: any): void {
    if (!this.incidente) return;

    this.guardando = true;

    // Preparar datos actualizados
    const incidenciaActualizada = {
      ...this.incidente,
      title: datos.titulo,
      description: datos.descripcion,
      state: datos.estado,
      priority: datos.prioridad,
      assignee: datos.usuarioAsignado || this.incidente.assignee,
      project: datos.proyecto || this.incidente.project,
      category: datos.categoria,
      location: datos.ubicacion,
      app: datos.aplicacion,
      activity: datos.actividad
    };

    // Simular guardado
    setTimeout(() => {
      this.incidente = incidenciaActualizada as Incidencia;
      this.modoEdicion = false;
      this.guardando = false;
      this.notificationService.toast('Cambios guardados correctamente', 3000, 'success');
      
      // Agregar al historial
      this.agregarHistorial('edicion', 'Incidencia actualizada', 'Se actualizaron los datos de la incidencia');
    }, 1000);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS DE ESTADO
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Muestra el selector de estado
   */
  mostrarCambioEstado(): void {
    this.mostrarSelectorEstado = true;
    this.nuevoEstado = this.incidente?.state || 'open';
  }

  /**
   * Cambia el estado de la incidencia
   */
  cambiarEstado(): void {
    if (!this.incidente || !this.nuevoEstado) return;

    const estadoAnterior = this.incidente.state;
    this.incidente.state = this.nuevoEstado as any;

    this.notificationService.toast('Estado actualizado correctamente', 3000, 'success');
    this.mostrarSelectorEstado = false;

    // Agregar al historial
    const estadoLabel = this.estados.find(e => e.value === this.nuevoEstado)?.label || this.nuevoEstado;
    const estadoAnteriorLabel = this.estados.find(e => e.value === estadoAnterior)?.label || estadoAnterior;
    
    this.agregarHistorial(
      'estado',
      'Cambio de estado',
      `Estado cambiado de "${estadoAnteriorLabel}" a "${estadoLabel}"`,
      estadoAnteriorLabel,
      estadoLabel
    );
  }

  /**
   * Cancela el cambio de estado
   */
  cancelarCambioEstado(): void {
    this.mostrarSelectorEstado = false;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS DE EVENTOS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Maneja el evento de comentario agregado
   * @param comentario Nuevo comentario
   */
  onComentarioAgregado(comentario: Comentario): void {
    this.agregarHistorial(
      'comentario',
      'Comentario agregado',
      `Se agregó un nuevo comentario: "${comentario.text.substring(0, 50)}..."`
    );
  }

  /**
   * Maneja el evento de archivo subido
   * @param archivo Archivo subido
   */
  onArchivoSubido(archivo: ArchivoAdjunto): void {
    this.archivos.push(archivo);
    this.agregarHistorial(
      'archivo',
      'Archivo adjuntado',
      `Se adjuntó el archivo "${archivo.nombre}"`
    );
  }

  /**
   * Maneja el evento de archivo eliminado
   * @param archivoId ID del archivo eliminado
   */
  onArchivoEliminado(archivoId: string): void {
    const index = this.archivos.findIndex(a => a.id === archivoId);
    if (index > -1) {
      const archivo = this.archivos[index];
      this.archivos.splice(index, 1);
      this.agregarHistorial(
        'archivo',
        'Archivo eliminado',
        `Se eliminó el archivo "${archivo.nombre}"`
      );
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS AUXILIARES
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Agrega una entrada al historial
   * @param tipo Tipo de cambio
   * @param accion Acción realizada
   * @param descripcion Descripción del cambio
   * @param valorAnterior Valor anterior (opcional)
   * @param valorNuevo Valor nuevo (opcional)
   * @private
   */
  private agregarHistorial(
    tipo: string,
    accion: string,
    descripcion: string,
    valorAnterior?: any,
    valorNuevo?: any
  ): void {
    const usuario = this.authService.getUsuarioActual();
    const nuevoEvento: HistorialCambio = {
      id: `HIST-${Date.now()}`,
      fecha: new Date().toISOString(),
      usuario: `${usuario?.nombre || 'Usuario'} ${usuario?.apellido || ''}`.trim(),
      tipo: tipo as any,
      accion,
      descripcion,
      valorAnterior,
      valorNuevo
    };

    this.historial = [nuevoEvento, ...this.historial];
  }

  /**
   * Obtiene la clase CSS según el estado
   * @param estado Estado de la incidencia
   * @returns Clase CSS
   */
  getEstadoClass(estado: string): string {
    const clases: { [key: string]: string } = {
      'open': 'status-open',
      'inprogress': 'status-inprogress',
      'pending': 'status-pending',
      'resolved': 'status-resolved',
      'closed': 'status-closed'
    };
    return clases[estado] || 'status-open';
  }

  /**
   * Obtiene la etiqueta según el estado
   * @param estado Estado de la incidencia
   * @returns Etiqueta
   */
  getEstadoLabel(estado: string): string {
    return this.estados.find(e => e.value === estado)?.label || estado;
  }

  /**
   * Obtiene la clase CSS según la prioridad
   * @param prioridad Prioridad de la incidencia
   * @returns Clase CSS
   */
  getPrioridadClass(prioridad: string): string {
    const clases: { [key: string]: string } = {
      'Baja': 'priority-low',
      'Media': 'priority-medium',
      'Alta': 'priority-high',
      'Crítica': 'priority-critical'
    };
    return clases[prioridad] || 'priority-medium';
  }

  /**
   * Formatea una fecha
   * @param dateString Fecha en formato ISO o string
   * @returns Fecha formateada
   */
  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  }
}
