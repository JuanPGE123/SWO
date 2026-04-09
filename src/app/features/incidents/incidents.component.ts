/**
 * incidents.component.ts
 * Componente para la gestión y visualización de incidencias.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentsService } from '../../core/services/incidents.service';
import { NotificationService } from '../../core/services/notification.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { Incidencia } from '../../core/models/models';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {
  incidentes: Incidencia[] = [];
  incidentesFiltrados: Incidencia[] = [];
  filtroEstado: string = 'all';
  busqueda: string = '';

  // Modal nueva incidencia
  mostrarModal: boolean = false;
  mostrarDetalle: boolean = false;
  guardando: boolean = false;
  guardandoCambios: boolean = false;
  modoEdicion: boolean = false;
  modoResolucion: boolean = false;
  incidenteSeleccionado: Incidencia | null = null;

  // Copia editable del incidente seleccionado
  incidenteEditado = {
    titulo: '',
    descripcion: '',
    estado: '',
    impacto: '',
    ubicacion: '',
    resolucion: ''
  };
  
  nuevaIncidencia = {
    titulo: '',
    descripcion: '',
    estado: 'Abierto',
    impacto: 'Medio',
    ubicacion: '',
    categoria: '',
    aplicacion: '',
    actividad: '',
    urgencia: 'Media'
  };

  constructor(
    private incidentsService: IncidentsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarIncidentes();
  }

  /** Suscribe el componente al Observable de incidencias y aplica filtros iniciales. */
  cargarIncidentes(): void {
    this.incidentsService.obtenerIncidencias().subscribe(
      (incidentes: Incidencia[]) => {
        this.incidentes = incidentes;
        this.aplicarFiltros();
      }
    );
  }

  /**
   * Aplica el filtro de estado y la búsqueda de texto sobre la lista completa.
   * Actualiza {@code incidentesFiltrados} para reflejar el resultado.
   */
  aplicarFiltros(): void {
    const termino = this.busqueda.toLowerCase().trim();
    this.incidentesFiltrados = this.incidentes.filter(inc => {
      const cumpleFiltro = this.filtroEstado === 'all' || inc.state === this.filtroEstado;
      const cumpleBusqueda = termino === '' ||
        inc.id.toLowerCase().includes(termino) ||
        inc.title.toLowerCase().includes(termino) ||
        inc.reason.toLowerCase().includes(termino) ||
        inc.project.toLowerCase().includes(termino);
      return cumpleFiltro && cumpleBusqueda;
    });
  }

  /** Abre el modal de nueva incidencia y reinicia el formulario. */
  abrirModal(): void {
    this.nuevaIncidencia = {
      titulo: '',
      descripcion: '',
      estado: 'Abierto',
      impacto: 'Medio',
      ubicacion: '',
      categoria: '',
      aplicacion: '',
      actividad: '',
      urgencia: 'Media'
    };
    this.mostrarModal = true;
  }

  /** Cierra el modal de nueva incidencia sin guardar. */
  cerrarModal(): void {
    this.mostrarModal = false;
  }

  /**
   * Valida y envía la nueva incidencia al backend.
   * Muestra toast de éxito o error según la respuesta.
   */
  guardarIncidencia(): void {
    if (!this.nuevaIncidencia.titulo.trim() || !this.nuevaIncidencia.descripcion.trim()) {
      this.notificationService.toast('El título y la descripción son obligatorios', 3000, 'error');
      return;
    }
    this.guardando = true;
    this.incidentsService.crearIncidencia(this.nuevaIncidencia).subscribe({
      next: (resp) => {
        this.guardando = false;
        this.mostrarModal = false;
        if (resp?.local) {
          this.notificationService.toast('Guardado localmente (sin conexión al servidor)', 4000, 'warning');
        } else {
          this.notificationService.toast('Incidencia creada correctamente', 3000, 'success');
        }
        this.incidentsService.cargarDesdeBackend();
      },
      error: () => {
        this.guardando = false;
        this.notificationService.toast('Error inesperado al guardar', 3000, 'error');
      }
    });
  }

  /**
   * Cambia el estado de una incidencia seleccionada desde el select de la tabla.
   * @param incidente Incidencia a modificar
   * @param event     Evento change del select con el nuevo estado
   */
  cambiarEstado(incidente: Incidencia, event: Event): void {
    const nuevoEstado = (event.target as HTMLSelectElement).value;
    this.incidentsService.cambiarEstado(
      incidente.id,
      nuevoEstado as 'open' | 'inprogress' | 'pending' | 'resolved'
    );
    this.notificationService.toast(`Estado de ${incidente.id} actualizado`, 2000, 'success');
  }

  /**
   * Cambia la prioridad de una incidencia seleccionada desde el select de la tabla.
   * @param incidente    Incidencia a modificar
   * @param event        Evento change del select con la nueva prioridad
   */
  cambiarPrioridad(incidente: Incidencia, event: Event): void {
    const nuevaPrioridad = (event.target as HTMLSelectElement).value;
    this.incidentsService.cambiarPrioridad(
      incidente.id,
      nuevaPrioridad as 'Baja' | 'Media' | 'Alta' | 'Crítica'
    );
    this.notificationService.toast(`Prioridad actualizada`, 2000, 'success');
  }

  /**
   * Asigna una incidencia a un responsable.
   * @param incidente      Incidencia a asignar
   * @param nuevoAsignado  Nombre del responsable
   */
  asignar(incidente: Incidencia, nuevoAsignado: string): void {
    this.incidentsService.asignarIncidencia(incidente.id, nuevoAsignado);
    this.notificationService.toast(`Asignado a ${nuevoAsignado}`, 2000, 'success');
  }

  /** Devuelve las estadísticas actuales (total, abiertos, resueltos, etc.) desde el servicio. */
  obtenerEstadisticas() {
    return this.incidentsService.obtenerEstadísticas();
  }

  /** Alias para aplicarFiltros(); mantenido por compatibilidad con bindings existentes. */
  onFiltroChange(): void {
    this.aplicarFiltros();
  }

  /** Alias para aplicarFiltros(); mantenido por compatibilidad con bindings existentes. */
  onBusquedaChange(): void {
    this.aplicarFiltros();
  }

  /**
   * Abre el modal de detalle para la incidencia seleccionada y resetea los modos edición/resolución.
   * @param incidente Incidencia cuyo detalle se desea ver
   */
  verDetalle(incidente: Incidencia): void {
    this.incidenteSeleccionado = incidente;
    this.modoEdicion = false;
    this.modoResolucion = false;
    this.mostrarDetalle = true;
  }

  /** Cierra el modal de detalle y limpia el incidente seleccionado y modos activos. */
  cerrarDetalle(): void {
    this.mostrarDetalle = false;
    this.incidenteSeleccionado = null;
    this.modoEdicion = false;
    this.modoResolucion = false;
  }

  /**
   * Activa el modo edición pre-llenando {@code incidenteEditado} con los datos actuales.
   * Desactiva el modo resolución si estaba activo.
   */
  entrarModoEdicion(): void {
    if (!this.incidenteSeleccionado) return;
    const inc = this.incidenteSeleccionado;
    this.incidenteEditado = {
      titulo: inc.title,
      descripcion: inc.reason,
      estado: this.estadoAEspanol(inc.state),
      impacto: this.prioridadAImpacto(inc.priority),
      ubicacion: inc.project,
      resolucion: inc.resolucion || ''
    };
    this.modoEdicion = true;
    this.modoResolucion = false;
  }

  /** Cancela la edición o resolución activa y vuelve al modo Vista. */
  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.modoResolucion = false;
  }

  /**
   * Valida y envía los cambios editados al backend mediante PUT.
   * Cierra el modal y recarga la lista al completarse correctamente.
   */
  guardarEdicion(): void {
    if (!this.incidenteSeleccionado) return;
    if (!this.incidenteEditado.titulo.trim()) {
      this.notificationService.toast('El título es obligatorio', 3000, 'error');
      return;
    }
    this.guardandoCambios = true;
    this.incidentsService.actualizarIncidenciaBackend(
      this.incidenteSeleccionado.id,
      this.incidenteEditado.titulo,
      this.incidenteEditado.descripcion,
      this.incidenteEditado.estado,
      this.incidenteEditado.impacto,
      this.incidenteEditado.ubicacion,
      this.incidenteEditado.resolucion,
      false
    ).subscribe({
      next: () => {
        this.guardandoCambios = false;
        this.modoEdicion = false;
        this.notificationService.toast('Incidencia actualizada correctamente', 3000, 'success');
        this.cerrarDetalle();
        this.cargarIncidentes();
      },
      error: () => {
        this.guardandoCambios = false;
        this.notificationService.toast('Error al actualizar la incidencia', 3000, 'error');
      }
    });
  }

  /**
   * Valida la descripción de resolución y envía la incidencia al backend con estado "Resuelto".
   * Cierra el modal y recarga la lista al completarse correctamente.
   */
  resolverIncidencia(): void {
    if (!this.incidenteSeleccionado) return;
    const inc = this.incidenteSeleccionado;
    if (!this.incidenteEditado.resolucion.trim()) {
      this.notificationService.toast('Debes describir cómo se resolvió el incidente', 3000, 'error');
      return;
    }
    this.guardandoCambios = true;
    this.incidentsService.actualizarIncidenciaBackend(
      inc.id,
      inc.title,
      inc.reason,
      'Resuelto',
      this.prioridadAImpacto(inc.priority),
      inc.project,
      this.incidenteEditado.resolucion,
      true
    ).subscribe({
      next: () => {
        this.guardandoCambios = false;
        this.modoResolucion = false;
        this.notificationService.toast('Incidencia marcada como resuelta', 3000, 'success');
        this.cerrarDetalle();
        this.cargarIncidentes();
      },
      error: () => {
        this.guardandoCambios = false;
        this.notificationService.toast('Error al resolver la incidencia', 3000, 'error');
      }
    });
  }

  /**
   * Activa el modo resolución pre-cargando la resolución existente (si la hubiera).
   * Desactiva el modo edición si estaba activo.
   */
  activarModoResolucion(): void {
    if (!this.incidenteSeleccionado) return;
    this.incidenteEditado.resolucion = this.incidenteSeleccionado.resolucion || '';
    this.modoResolucion = true;
    this.modoEdicion = false;
  }

  /**
   * Convierte el estado interno de la app al texto en español para enviar al backend.
   * @param state Estado en formato interno ('open', 'inprogress', etc.)
   * @returns Texto en español ('Abierto', 'En Progreso', etc.)
   */
  private estadoAEspanol(state: string): string {
    const map: {[k: string]: string} = {
      'open': 'Abierto', 'inprogress': 'En Progreso',
      'pending': 'Pendiente', 'resolved': 'Resuelto'
    };
    return map[state] || 'Abierto';
  }

  /**
   * Convierte la prioridad del modelo Angular al campo impacto del backend.
   * @param priority Prioridad ('Baja', 'Media', 'Alta', 'Crítica')
   * @returns Impacto en formato backend ('Bajo', 'Medio', 'Alto', 'Critico')
   */
  private prioridadAImpacto(priority: string): string {
    const map: {[k: string]: string} = {
      'Baja': 'Bajo', 'Media': 'Medio', 'Alta': 'Alto', 'Crítica': 'Critico'
    };
    return map[priority] || 'Medio';
  }
}
