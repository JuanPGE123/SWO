/**
 * reports.component.ts
 * Componente para ver reportes y análisis
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  reportes = [
    { nombre: 'Incidencias Semana 34', fecha: '25/08/2025', formato: 'PDF' },
    { nombre: 'Backlog por categoría', fecha: '22/08/2025', formato: 'CSV' },
    { nombre: 'SLA Mensual', fecha: '20/08/2025', formato: 'Excel' }
  ];

  topCategorias = [
    { nombre: 'Red y conectividad', count: 86 },
    { nombre: 'Aplicaciones', count: 74 },
    { nombre: 'Hardware', count: 61 },
    { nombre: 'Seguridad', count: 44 }
  ];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {}

  actualizar(): void {
    this.notificationService.toast('Actualizando datos...', 2000, 'info');
  }

  exportar(): void {
    this.notificationService.toast('Exportando reportes...', 2000, 'success');
  }

  descargar(reporte: any): void {
    this.notificationService.toast(`Descargando ${reporte.nombre}...`, 2000, 'success');
  }
}
