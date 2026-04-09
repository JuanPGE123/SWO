/**
 * reports.component.ts
 * Componente para ver reportes y análisis
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationService } from '../../core/services/notification.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  estadisticas: any = null;
  cargandoStats: boolean = false;
  descargando: boolean = false;

  reportes: any[] = [];
  cargandoReportes: boolean = false;

  topCategorias = [
    { nombre: 'Red y conectividad', count: 0 },
    { nombre: 'Aplicaciones', count: 0 },
    { nombre: 'Hardware', count: 0 },
    { nombre: 'Seguridad', count: 0 }
  ];

  constructor(
    private notificationService: NotificationService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
    this.cargarReportes();
  }

  /** Obtiene el resumen de estadísticas de incidencias desde el endpoint /estadisticas. */
  cargarEstadisticas(): void {
    this.cargandoStats = true;
    this.http.get<any>(`${environment.apiUrl}/estadisticas`).subscribe({
      next: (data) => { this.estadisticas = data; this.cargandoStats = false; },
      error: () => { this.cargandoStats = false; }
    });
  }

  /** Obtiene los últimos reportes guardados en la BD desde el endpoint /reportes. */
  cargarReportes(): void {
    this.cargandoReportes = true;
    this.http.get<any[]>(`${environment.apiUrl}/reportes`).subscribe({
      next: (data) => { this.reportes = data; this.cargandoReportes = false; },
      error: () => { this.cargandoReportes = false; }
    });
  }

  /** Fuerza la recarga de estadísticas y reportes mostrando un toast informativo. */
  actualizar(): void {
    this.notificationService.toast('Actualizando datos...', 2000, 'info');
    this.cargarEstadisticas();
    this.cargarReportes();
  }

  /** Descarga todas las incidencias como CSV compatible con Excel */
  descargarExcel(): void {
    this.descargando = true;
    this.notificationService.toast('Generando reporte...', 2000, 'info');

    this.http.get<any[]>(`${environment.apiUrl}/incidencias`).subscribe({
      next: (incidencias) => {
        // UTF-8 BOM para que Excel reconozca tildes y especiales
        const bom = '\uFEFF';
        const headers = ['ID', 'Titulo', 'Descripcion', 'Estado', 'Impacto', 'Ubicacion', 'ID_Usuario', 'Fecha'];

        const rows = incidencias.map(inc => [
          inc.id,
          `"${(inc.titulo || '').replace(/"/g, '""')}"`,
          `"${(inc.descripcion || '').replace(/"/g, '""')}"`,
          inc.estado || '',
          inc.impacto || '',
          `"${(inc.ubicacion || '').replace(/"/g, '""')}"`,
          inc.idUsuarioReporta || '',
          inc.fechaCreacion || ''
        ].join(';')); // punto y coma para compatibilidad con Excel en español

        const csv = bom + headers.join(';') + '\n' + rows.join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `incidencias_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // Registrar el reporte en la BD
        const usuario = this.authService.getUsuarioActual();
        const abiertas = incidencias.filter(i => i.estado === 'Abierto').length;
        const enProgreso = incidencias.filter(i => i.estado === 'En Progreso').length;
        const cerradas = incidencias.filter(i => i.estado === 'Cerrado' || i.estado === 'Resuelto').length;

        const params = new HttpParams()
          .set('nombre', `Reporte Incidencias ${new Date().toLocaleDateString('es-CO')}`)
          .set('total', String(incidencias.length))
          .set('abiertas', String(abiertas))
          .set('enProgreso', String(enProgreso))
          .set('cerradas', String(cerradas))
          .set('generadoPor', String(parseInt(usuario?.id || '0', 10) || ''));

        this.http.post(`${environment.apiUrl}/reportes`, params.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).subscribe({ next: () => this.cargarReportes() });

        this.descargando = false;
        this.notificationService.toast(`Excel generado: ${incidencias.length} incidencias`, 3000, 'success');
      },
      error: () => {
        this.descargando = false;
        this.notificationService.toast('Error al obtener datos. Verifica la conexión al servidor.', 3000, 'error');
      }
    });
  }

  /** Alias público para {@code descargarExcel}; llamado desde el botón Exportar del template. */
  exportar(): void {
    this.descargarExcel();
  }

  /**
   * Muestra un toast con el resumen del reporte histórico seleccionado.
   * @param reporte Objeto de reporte con fecha y total de incidencias
   */
  descargar(reporte: any): void {
    this.notificationService.toast(`Reporte del ${reporte.fecha} — ${reporte.total} incidencias`, 3000, 'info');
  }
}
