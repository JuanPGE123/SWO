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
  guardando: boolean = false;
  nuevaIncidencia = {
    titulo: '',
    descripcion: '',
    estado: 'Abierto',
    impacto: 'Medio',
    ubicacion: ''
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
    this.incidentesFiltrados = this.incidentes.filter(inc => {
      const cumpleFiltro = this.filtroEstado === 'all' || inc.state === this.filtroEstado;
      const cumpleBusqueda = this.busqueda === '' ||
        inc.id.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        inc.title.toLowerCase().includes(this.busqueda.toLowerCase());
      return cumpleFiltro && cumpleBusqueda;
    });
  }

  abrirModal(): void {
    this.nuevaIncidencia = { titulo: '', descripcion: '', estado: 'Abierto', impacto: 'Medio', ubicacion: '' };
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
}
