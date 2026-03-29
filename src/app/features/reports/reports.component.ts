/**
 * reports.component.ts
 * Componente para ver reportes y análisis
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../core/services/notification.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
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

  reportes = [
    { nombre: 'Incidencias Semana 34', fecha: '25/08/2025', formato: 'PDF' },
    { nombre: 'Backlog por categoría', fecha: '22/08/2025', formato: 'CSV' },
    { nombre: 'SLA Mensual', fecha: '20/08/2025', formato: 'Excel' }
  ];

  topCategorias = [
    { nombre: 'Red y conectividad', count: 0 },
    { nombre: 'Aplicaciones', count: 0 },
    { nombre: 'Hardware', count: 0 },
    { nombre: 'Seguridad', count: 0 }
  ];

  constructor(
    private notificationService: NotificationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.cargandoStats = true;
    this.http.get<any>(`${environment.apiUrl}/estadisticas`).subscribe({
      next: (data) => { this.estadisticas = data; this.cargandoStats = false; },
      error: () => { this.cargandoStats = false; }
    });
  }

  actualizar(): void {
    this.notificationService.toast('Actualizando datos...', 2000, 'info');
    this.cargarEstadisticas();
  }

  exportar(): void {
    this.notificationService.toast('Exportando reportes...', 2000, 'success');
  }

  descargar(reporte: any): void {
    this.notificationService.toast(`Descargando ${reporte.nombre}...`, 2000, 'success');
  }
}
