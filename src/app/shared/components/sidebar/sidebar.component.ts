/**
 * sidebar.component.ts
 * 
 * Componente de barra lateral compartida.
 * - Navegación principal de la aplicación
 * - Logo y branding
 * - Información del usuario
 * - Usado en todos los módulos excepto auth
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioAutenticado } from '../../../core/models/models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // Usuario autenticado actual
  usuarioActual: UsuarioAutenticado | null = null;

  /**
   * Constructor inyecta servicios necesarios
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * ngOnInit: se ejecuta al inicializar el componente
   */
  ngOnInit(): void {
    // Obtener el usuario autenticado actual
    this.usuarioActual = this.authService.getUsuarioActual();
  }

  /**
   * Método logout: cierra la sesión del usuario
   */
  logout(): void {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  /**
   * Método getNavItems: retorna los elementos del menú de navegación
   * 
   * @returns array con los items del navegación incluyendo iconos
   */
  getNavItems() {
    return [
      { label: 'Inicio', route: '/dashboard', icon: '🏠' },
      { label: 'Panel', route: '/dashboard', icon: '📊' },
      { label: 'Incidencias', route: '/incidents', icon: '🎫' },
      { label: 'Usuarios', route: '/users', icon: '👥' },
      { label: 'Proyectos', route: '/projects', icon: '🗂️' },
      { label: 'Reportes', route: '/reports', icon: '📈' },
      { label: 'ChatBot', route: '/chatbot', icon: '🤖' }
    ];
  }

  /**
   * Método isActive: verifica si una ruta está activa
   * 
   * @param route - Ruta a verificar
   * @returns boolean
   */
  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
