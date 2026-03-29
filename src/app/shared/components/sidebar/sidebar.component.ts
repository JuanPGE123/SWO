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
   * Método getNavItems: retorna los elementos del menú de navegación.
   * Usuarios y Proyectos solo visibles para Administrador.
   */
  getNavItems() {
    const isAdmin = this.usuarioActual?.role === 'Administrador';
    const items: { label: string; route: string; icon: string }[] = [
      { label: 'Panel', route: '/dashboard', icon: '📊' },
      { label: 'Incidencias', route: '/incidents', icon: '🎫' },
    ];
    if (isAdmin) {
      items.push({ label: 'Usuarios', route: '/users', icon: '👥' });
      items.push({ label: 'Proyectos', route: '/projects', icon: '🗂️' });
    }
    items.push({ label: 'Reportes', route: '/reports', icon: '📈' });
    items.push({ label: 'ChatBot', route: '/chatbot', icon: '🤖' });
    return items;
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
