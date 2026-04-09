/**
 * auth.guard.ts
 * 
 * Guard de autenticación: protege las rutas que requieren autenticación.
 * - Verifica si el usuario está autenticado antes de navegar
 * - Redirige a login si no está autenticado
 */

import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Implementación del guard como función
   * 
   * @param route - Información de la ruta
   * @param state - Estado del router
   * @returns boolean - true si puede activar la ruta
   */
  canActivate(): boolean {
    if (this.authService.isAutenticado()) {
      return true;
    }
    // Si no está autenticado, redirige a la página de login
    this.router.navigate(['/login']);
    return false;
  }
}

/**
 * Función guard para Angular 17+
 * Se usa directamente en la configuración de rutas
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAutenticado()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
