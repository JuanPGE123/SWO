/**
 * @fileoverview Componente de historial de cambios de incidencia
 * 
 * **Responsabilidades:**
 * - Mostrar timeline de cambios de una incidencia
 * - Visualizar creación, modificaciones y comentarios
 * - Formato cronológico de eventos
 * - Iconos y colores según tipo de cambio
 * - Filtrado opcional por tipo de evento
 * 
 * **Características:**
 * - Timeline vertical con diseño moderno
 * - Iconos contextuales por tipo de cambio
 * - Colores diferenciados por acción
 * - Formato de fechas relativas
 * - Agrupación por fecha (opcional)
 * - Scroll automático a eventos recientes
 * 
 * **Tipos de eventos soportados:**
 * - creacion: Incidencia creada
 * - estado: Cambio de estado
 * - prioridad: Cambio de prioridad
 * - asignacion: Asignación a técnico
 * - comentario: Comentario agregado
 * - archivo: Archivo adjuntado
 * - edicion: Datos editados
 * 
 * **Uso:**
 * ```html
 * <app-incident-history
 *   [incidentId]="'INC-123'"
 *   [history]="historial">
 * </app-incident-history>
 * ```
 * 
 * @author Equipo SWO
 * @version 1.0.0
 * @since 2026-05-03
 */

import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HistorialCambio } from '../../../core/models/models';
import { environment } from '../../../../environments/environment';

/**
 * Componente de historial de cambios
 * Muestra timeline de eventos de una incidencia
 */
@Component({
  selector: 'app-incident-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-history.component.html',
  styleUrls: ['./incident-history.component.scss']
})
export class IncidentHistoryComponent implements OnInit {

  // ═════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * ID de la incidencia
   * Requerido para cargar el historial
   */
  @Input({ required: true }) incidentId!: string;

  /**
   * Lista de cambios del historial
   * Puede ser cargada externamente o internamente
   */
  @Input() history: HistorialCambio[] = [];

  /**
   * Indica si debe cargar el historial automáticamente
   * @default true
   */
  @Input() autoLoad: boolean = true;

  /**
   * Indica si debe mostrar filtros por tipo
   * @default false
   */
  @Input() showFilters: boolean = false;

  // ═════════════════════════════════════════════════════════════════════════
  // INYECCIÓN DE DEPENDENCIAS
  // ═════════════════════════════════════════════════════════════════════════

  private readonly http = inject(HttpClient);

  // ═════════════════════════════════════════════════════════════════════════
  // PROPIEDADES
  // ═════════════════════════════════════════════════════════════════════════

  /** Lista interna de cambios */
  historialInterno: HistorialCambio[] = [];

  /** Indica si se está cargando el historial */
  cargando: boolean = false;

  /** Filtro activo (all, estado, prioridad, etc.) */
  filtroActivo: string = 'all';

  /** Lista filtrada de cambios */
  historialFiltrado: HistorialCambio[] = [];

  // ═════════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Inicializa el componente
   */
  ngOnInit(): void {
    if (this.autoLoad && this.incidentId) {
      this.cargarHistorial();
    } else {
      this.historialInterno = this.generarHistorialConMetadata(this.history);
      this.aplicarFiltro();
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS DE CARGA
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Carga el historial desde el servidor
   */
  cargarHistorial(): void {
    if (!this.incidentId) {
      console.error('No se puede cargar historial sin ID de incidencia');
      return;
    }

    this.cargando = true;
    const idIncidencia = parseInt(this.incidentId.replace('INC-', ''));
    
    this.http.get<any[]>(`${environment.apiUrl}/incidencias/${idIncidencia}/historial`)
      .subscribe({
        next: (historial) => {
          this.historialInterno = historial.map(h => ({
            id: h.id || `HIST-${Date.now()}`,
            fecha: h.fecha,
            usuario: h.usuario,
            tipo: h.tipo || 'edicion',
            accion: h.accion,
            descripcion: h.descripcion,
            valorAnterior: h.valorAnterior,
            valorNuevo: h.valorNuevo,
            icono: this.getIconoPorTipo(h.tipo),
            color: this.getColorPorTipo(h.tipo)
          }));
          
          this.aplicarFiltro();
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al cargar historial:', err);
          this.cargando = false;
          
          // Usar datos mock si falla
          this.historialInterno = this.generarHistorialConMetadata(this.history);
          this.aplicarFiltro();
        }
      });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS DE FILTRADO
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Aplica el filtro actual al historial
   * @private
   */
  private aplicarFiltro(): void {
    if (this.filtroActivo === 'all') {
      this.historialFiltrado = [...this.historialInterno];
    } else {
      this.historialFiltrado = this.historialInterno.filter(
        h => h.tipo === this.filtroActivo
      );
    }
  }

  /**
   * Cambia el filtro activo
   * @param tipo Tipo de filtro a aplicar
   */
  cambiarFiltro(tipo: string): void {
    this.filtroActivo = tipo;
    this.aplicarFiltro();
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS AUXILIARES
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Genera historial con metadatos (icono, color)
   * @param historial Lista de cambios sin metadatos
   * @returns Lista de cambios con metadatos
   * @private
   */
  private generarHistorialConMetadata(historial: HistorialCambio[]): HistorialCambio[] {
    return historial.map(h => ({
      ...h,
      icono: h.icono || this.getIconoPorTipo(h.tipo),
      color: h.color || this.getColorPorTipo(h.tipo)
    }));
  }

  /**
   * Obtiene el icono según el tipo de cambio
   * @param tipo Tipo de cambio
   * @returns Nombre del icono
   */
  getIconoPorTipo(tipo: string): string {
    const iconos: { [key: string]: string } = {
      'creacion': 'add_circle',
      'estado': 'sync',
      'prioridad': 'flag',
      'asignacion': 'person_add',
      'comentario': 'comment',
      'archivo': 'attach_file',
      'edicion': 'edit'
    };
    return iconos[tipo] || 'history';
  }

  /**
   * Obtiene el color según el tipo de cambio
   * @param tipo Tipo de cambio
   * @returns Clase de color
   */
  getColorPorTipo(tipo: string): string {
    const colores: { [key: string]: string } = {
      'creacion': 'success',
      'estado': 'primary',
      'prioridad': 'warning',
      'asignacion': 'info',
      'comentario': 'secondary',
      'archivo': 'info',
      'edicion': 'secondary'
    };
    return colores[tipo] || 'secondary';
  }

  /**
   * Formatea una fecha de manera relativa
   * @param dateString Fecha en formato ISO 8601
   * @returns Fecha formateada
   */
  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return dateString;
      }

      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      // Hace menos de 1 hora
      if (diffMins < 60) {
        if (diffMins < 1) return 'Ahora mismo';
        return `Hace ${diffMins} minuto${diffMins !== 1 ? 's' : ''}`;
      }

      // Hace menos de 24 horas
      if (diffHours < 24) {
        return `Hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
      }

      // Hace menos de 7 días
      if (diffDays < 7) {
        return `Hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
      }

      // Fecha completa
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  }

  /**
   * Formatea la hora de una fecha
   * @param dateString Fecha en formato ISO 8601
   * @returns Hora formateada
   */
  formatTime(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '';
    }
  }

  /**
   * Obtiene el nombre del filtro
   * @param tipo Tipo de filtro
   * @returns Nombre legible
   */
  getNombreFiltro(tipo: string): string {
    const nombres: { [key: string]: string } = {
      'all': 'Todos',
      'creacion': 'Creación',
      'estado': 'Estados',
      'prioridad': 'Prioridad',
      'asignacion': 'Asignaciones',
      'comentario': 'Comentarios',
      'archivo': 'Archivos',
      'edicion': 'Ediciones'
    };
    return nombres[tipo] || tipo;
  }

  /**
   * Obtiene los tipos únicos de cambios en el historial
   * @returns Lista de tipos únicos
   */
  getTiposUnicos(): string[] {
    const tipos = new Set(this.historialInterno.map(h => h.tipo));
    return ['all', ...Array.from(tipos)];
  }
}
