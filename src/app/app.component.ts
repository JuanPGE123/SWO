/**
 * app.component.ts
 * 
 * Componente raíz de la aplicación Angular.
 * - Proporciona el router-outlet para la navegación
 * - Es el contenedor principal de toda la aplicación
 * - Inicia el polling de notificaciones en tiempo real
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './core/services/notification.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  
  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Iniciar polling de notificaciones si hay usuario autenticado
    const usuario = this.authService.getUsuarioActual();
    if (usuario) {
      const idUsuario = parseInt(usuario.id, 10);
      if (!isNaN(idUsuario)) {
        this.notificationService.iniciarPolling(idUsuario);
      }
    }

    // También podríamos suscribirnos a cambios en el estado de autenticación
    // y iniciar/detener el polling dinámicamente
  }

  ngOnDestroy(): void {
    // Detener polling al destruir el componente
    this.notificationService.detenerPolling();
  }

  /**
   * El componente AppComponent es el punto de entrada de toda la app.
   * El router-outlet renderizará los componentes correspondientes según la ruta activa.
   */
}
