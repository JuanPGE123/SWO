/**
 * notification.service.ts
 * 
 * Servicio de notificaciones: proporciona métodos para mostrar toasts y alertas.
 * - Toast: pequeña notificación temporal en esquina
 * - Usado por toda la aplicación para feedback visual
 * - Polling de notificaciones en tiempo real
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Notificacion {
  id: number;
  mensaje: string;
  tipo: 'info' | 'success' | 'warning' | 'error';
  leida: boolean;
  fecha: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  private notificacionesSubject = new BehaviorSubject<Notificacion[]>([]);
  public notificaciones$ = this.notificacionesSubject.asObservable();
  
  private ultimaActualizacion: number = Date.now();
  private pollingInterval: any = null;

  constructor(private http: HttpClient) {}

  /**
   * Inicia el polling de notificaciones cada 30 segundos
   * @param idUsuario - ID del usuario actual
   */
  iniciarPolling(idUsuario: number): void {
    if (this.pollingInterval) return; // Ya está corriendo

    // Cargar notificaciones iniciales
    this.cargarNotificaciones(idUsuario);

    // Polling cada 30 segundos
    this.pollingInterval = setInterval(() => {
      this.cargarNotificaciones(idUsuario);
    }, 30000); // 30 segundos
  }

  /**
   * Detiene el polling de notificaciones
   */
  detenerPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  /**
   * Carga notificaciones desde el backend
   */
  private cargarNotificaciones(idUsuario: number): void {
    this.http.get<any[]>(`${environment.apiUrl}/notificaciones?idUsuario=${idUsuario}&desde=${this.ultimaActualizacion}`)
      .subscribe({
        next: (notificaciones) => {
          if (notificaciones && notificaciones.length > 0) {
            const nuevasNotifs = notificaciones.map(n => ({
              id: n.id,
              mensaje: n.mensaje,
              tipo: n.tipo || 'info',
              leida: n.leida || false,
              fecha: new Date(n.fecha)
            }));

            // Actualizar lista de notificaciones
            const actual = this.notificacionesSubject.value;
            this.notificacionesSubject.next([...nuevasNotifs, ...actual]);

            // Mostrar toast para nuevas notificaciones no leídas
            nuevasNotifs.filter(n => !n.leida).forEach(n => {
              this.toast(n.mensaje, 4000, n.tipo);
            });

            this.ultimaActualizacion = Date.now();
          }
        },
        error: (err) => {
          console.error('Error al cargar notificaciones:', err);
        }
      });
  }

  /**
   * Marca una notificación como leída
   */
  marcarComoLeida(idNotificacion: number): void {
    this.http.put(`${environment.apiUrl}/notificaciones/${idNotificacion}/leer`, {})
      .subscribe({
        next: () => {
          const notificaciones = this.notificacionesSubject.value.map(n =>
            n.id === idNotificacion ? { ...n, leida: true } : n
          );
          this.notificacionesSubject.next(notificaciones);
        },
        error: (err) => console.error('Error al marcar como leída:', err)
      });
  }

  /**
   * Obtiene el número de notificaciones no leídas
   */
  obtenerNoLeidas(): number {
    return this.notificacionesSubject.value.filter(n => !n.leida).length;
  }

  /**
   * Método toast: muestra una notificación temporal
   * 
   * @param mensaje - Texto a mostrar
   * @param duracion - Duración en ms (default: 3000)
   * @param tipo - Tipo de notificación: 'info', 'success', 'warning', 'error'
   */
  toast(mensaje: string, duracion: number = 3000, tipo: string = 'info'): void {
    const elemento = document.createElement('div');
    elemento.textContent = mensaje;
    elemento.style.position = 'fixed';
    elemento.style.right = '18px';
    elemento.style.bottom = '18px';
    elemento.style.padding = '8px 12px';
    elemento.style.borderRadius = '8px';
    elemento.style.zIndex = '9999';
    elemento.style.color = 'white';
    elemento.style.fontSize = '14px';
    elemento.style.fontFamily = 'inherit';

    // Colores según el tipo de notificación
    switch (tipo) {
      case 'success':
        elemento.style.background = 'rgba(25, 211, 143, 0.9)'; // Verde
        break;
      case 'error':
        elemento.style.background = 'rgba(255, 87, 87, 0.9)'; // Rojo
        break;
      case 'warning':
        elemento.style.background = 'rgba(255, 193, 7, 0.9)'; // Amarillo
        break;
      default:
        elemento.style.background = 'rgba(0, 0, 0, 0.75)'; // Negro (info)
    }

    document.body.appendChild(elemento);
    setTimeout(() => elemento.remove(), duracion);
  }
}
