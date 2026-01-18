/**
 * dashboard.component.ts
 * 
 * Componente de panel principal (Dashboard).
 * Proporciona:
 * - Resumen del sistema
 * - Incidentes recientes
 * - Notificaciones
 * - Acceso a funcionalidades principales
 * - Información de canales y reglas
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsService } from '../../core/services/incidents.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { Incidencia, UsuarioAutenticado } from '../../core/models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Usuario autenticado
  usuarioActual: UsuarioAutenticado | null = null;

  // Datos de incidentes
  incidentes: Incidencia[] = [];
  incidentesRecientes: Incidencia[] = [];

  // Estados de canales
  canalesActivos: { [key: string]: boolean } = {
    email: true,
    sms: true,
    push: true
  };

  /**
   * Constructor inyecta servicios necesarios
   */
  constructor(
    private incidentsService: IncidentsService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  /**
   * ngOnInit: se ejecuta al inicializar el componente
   */
  ngOnInit(): void {
    // Obtener usuario autenticado
    this.usuarioActual = this.authService.getUsuarioActual();

    // Obtener incidentes
    this.incidentsService.obtenerIncidencias().subscribe(
      (incidentes: Incidencia[]) => {
        this.incidentes = incidentes;
        // Obtener los últimos 2 incidentes
        this.incidentesRecientes = incidentes.slice(0, 2);
      }
    );
  }

  /**
   * Método probarAlerta: simula la llegada de una notificación
   */
  probarAlerta(): void {
    this.notificationService.toast(
      '✓ Notificación de prueba enviada correctamente',
      3000,
      'success'
    );
  }

  /**
   * Método toggleCanal: alterna el estado de un canal
   * 
   * @param canal - Nombre del canal (email, sms, push)
   */
  toggleCanal(canal: string): void {
    this.canalesActivos[canal] = !this.canalesActivos[canal];
    const estado = this.canalesActivos[canal] ? 'activado' : 'desactivado';
    this.notificationService.toast(
      `Canal ${canal} ${estado}`,
      2000,
      'info'
    );
  }

  /**
   * Método logout: cierra la sesión
   */
  logout(): void {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
    }
  }

  /**
   * Método obtenerEstadísticas: calcula estadísticas de incidentes
   * 
   * @returns objeto con conteos
   */
  obtenerEstadísticas() {
    return this.incidentsService.obtenerEstadísticas();
  }
}
