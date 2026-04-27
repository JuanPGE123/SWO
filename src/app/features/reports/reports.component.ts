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

  /** Descarga reporte de incidencias en formato PDF con tablas y estadísticas */
  descargarPDF(): void {
    this.descargando = true;
    this.notificationService.toast('Generando PDF...', 2000, 'info');

    this.http.get<any[]>(`${environment.apiUrl}/incidencias`).subscribe({
      next: async (incidencias) => {
        try {
          // Importar jsPDF dinámicamente
          const { jsPDF } = await import('jspdf');
          const { default: autoTable } = await import('jspdf-autotable');

          const doc = new jsPDF() as any;

          // Título del reporte
          doc.setFontSize(18);
          doc.setTextColor(40);
          doc.text('Reporte de Incidencias SWO', 14, 22);

          // Fecha de generación
          doc.setFontSize(11);
          doc.setTextColor(100);
          doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO', { 
            year: 'numeric', month: 'long', day: 'numeric' 
          })}`, 14, 30);

          // Estadísticas resumidas
          const abiertas = incidencias.filter(i => i.estado === 'Abierto').length;
          const enProgreso = incidencias.filter(i => i.estado === 'En Progreso').length;
          const cerradas = incidencias.filter(i => i.estado === 'Cerrado' || i.estado === 'Resuelto').length;

          doc.setFontSize(12);
          doc.setTextColor(60);
          doc.text('Resumen Ejecutivo', 14, 40);

          // Tabla de resumen
          autoTable(doc, {
            startY: 45,
            head: [['Estado', 'Cantidad', 'Porcentaje']],
            body: [
              ['Abiertas', abiertas, `${((abiertas / incidencias.length) * 100).toFixed(1)}%`],
              ['En Progreso', enProgreso, `${((enProgreso / incidencias.length) * 100).toFixed(1)}%`],
              ['Cerradas', cerradas, `${((cerradas / incidencias.length) * 100).toFixed(1)}%`],
              ['TOTAL', incidencias.length, '100%']
            ],
            theme: 'striped',
            headStyles: { fillColor: [5, 208, 230] },
            margin: { left: 14 }
          });

          // Detalle de incidencias
          const finalY = (doc as any).lastAutoTable.finalY || 85;
          doc.setFontSize(12);
          doc.text('Detalle de Incidencias', 14, finalY + 10);

          // Tabla de incidencias
          const tableData = incidencias.map(inc => [
            inc.id || '',
            (inc.titulo || '').substring(0, 40),
            inc.estado || '',
            inc.impacto || '',
            inc.fechaCreacion ? new Date(inc.fechaCreacion).toLocaleDateString('es-CO') : ''
          ]);

          autoTable(doc, {
            startY: finalY + 15,
            head: [['ID', 'Título', 'Estado', 'Impacto', 'Fecha']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [11, 17, 22], textColor: [5, 208, 230] },
            styles: { fontSize: 8 },
            columnStyles: {
              0: { cellWidth: 20 },
              1: { cellWidth: 70 },
              2: { cellWidth: 30 },
              3: { cellWidth: 30 },
              4: { cellWidth: 30 }
            },
            margin: { left: 14, right: 14 }
          });

          // Pie de página
          const pageCount = doc.getNumberOfPages();
          for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(9);
            doc.setTextColor(150);
            doc.text(
              `Página ${i} de ${pageCount}`,
              doc.internal.pageSize.getWidth() / 2,
              doc.internal.pageSize.getHeight() - 10,
              { align: 'center' }
            );
          }

          // Guardar PDF
          const fileName = `reporte_incidencias_${new Date().toISOString().split('T')[0]}.pdf`;
          doc.save(fileName);

          // Registrar el reporte en la BD
          const usuario = this.authService.getUsuarioActual();
          const params = new HttpParams()
            .set('nombre', `Reporte PDF ${new Date().toLocaleDateString('es-CO')}`)
            .set('total', String(incidencias.length))
            .set('abiertas', String(abiertas))
            .set('enProgreso', String(enProgreso))
            .set('cerradas', String(cerradas))
            .set('generadoPor', String(parseInt(usuario?.id || '0', 10) || ''));

          this.http.post(`${environment.apiUrl}/reportes`, params.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          }).subscribe({ next: () => this.cargarReportes() });

          this.descargando = false;
          this.notificationService.toast(`PDF generado: ${incidencias.length} incidencias`, 3000, 'success');

        } catch (error) {
          console.error('Error al generar PDF:', error);
          this.descargando = false;
          this.notificationService.toast('Error al generar PDF. Asegúrate de tener las librerías instaladas.', 3000, 'error');
        }
      },
      error: () => {
        this.descargando = false;
        this.notificationService.toast('Error al obtener datos. Verifica la conexión al servidor.', 3000, 'error');
      }
    });
  }

  /**
   * Muestra un toast con el resumen del reporte histórico seleccionado.
   * @param reporte Objeto de reporte con fecha y total de incidencias
   */
  descargar(reporte: any): void {
    this.notificationService.toast(`Reporte del ${reporte.fecha} — ${reporte.total} incidencias`, 3000, 'info');
  }
}
