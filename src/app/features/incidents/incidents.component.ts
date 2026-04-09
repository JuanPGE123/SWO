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

  cargarIncidentes(): void {
    this.incidentsService.obtenerIncidencias().subscribe(
      (incidentes: Incidencia[]) => {
        this.incidentes = incidentes;
        this.aplicarFiltros();
      }
    );
  }

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

  cerrarModal(): void {
    this.mostrarModal = false;
  }

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

  cambiarEstado(incidente: Incidencia, event: Event): void {
    const nuevoEstado = (event.target as HTMLSelectElement).value;
    this.incidentsService.cambiarEstado(
      incidente.id,
      nuevoEstado as 'open' | 'inprogress' | 'pending' | 'resolved'
    );
    this.notificationService.toast(`Estado de ${incidente.id} actualizado`, 2000, 'success');
  }

  cambiarPrioridad(incidente: Incidencia, event: Event): void {
    const nuevaPrioridad = (event.target as HTMLSelectElement).value;
    this.incidentsService.cambiarPrioridad(
      incidente.id,
      nuevaPrioridad as 'Baja' | 'Media' | 'Alta' | 'Crítica'
    );
    this.notificationService.toast(`Prioridad actualizada`, 2000, 'success');
  }

  asignar(incidente: Incidencia, nuevoAsignado: string): void {
    this.incidentsService.asignarIncidencia(incidente.id, nuevoAsignado);
    this.notificationService.toast(`Asignado a ${nuevoAsignado}`, 2000, 'success');
  }

  obtenerEstadisticas() {
    return this.incidentsService.obtenerEstadísticas();
  }

  onFiltroChange(): void {
    this.aplicarFiltros();
  }

  onBusquedaChange(): void {
    this.aplicarFiltros();
  }

  verDetalle(incidente: Incidencia): void {
    this.incidenteSeleccionado = incidente;
    this.modoEdicion = false;
    this.modoResolucion = false;
    this.mostrarDetalle = true;
  }

  cerrarDetalle(): void {
    this.mostrarDetalle = false;
    this.incidenteSeleccionado = null;
    this.modoEdicion = false;
    this.modoResolucion = false;
  }

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

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.modoResolucion = false;
  }

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

  activarModoResolucion(): void {
    if (!this.incidenteSeleccionado) return;
    this.incidenteEditado.resolucion = this.incidenteSeleccionado.resolucion || '';
    this.modoResolucion = true;
    this.modoEdicion = false;
  }

  private estadoAEspanol(state: string): string {
    const map: {[k: string]: string} = {
      'open': 'Abierto', 'inprogress': 'En Progreso',
      'pending': 'Pendiente', 'resolved': 'Resuelto'
    };
    return map[state] || 'Abierto';
  }

  private prioridadAImpacto(priority: string): string {
    const map: {[k: string]: string} = {
      'Baja': 'Bajo', 'Media': 'Medio', 'Alta': 'Alto', 'Crítica': 'Critico'
    };
    return map[priority] || 'Medio';
  }
}
