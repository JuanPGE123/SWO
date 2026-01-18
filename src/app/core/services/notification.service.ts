/**
 * notification.service.ts
 * 
 * Servicio de notificaciones: proporciona métodos para mostrar toasts y alertas.
 * - Toast: pequeña notificación temporal en esquina
 * - Usado por toda la aplicación para feedback visual
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
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
