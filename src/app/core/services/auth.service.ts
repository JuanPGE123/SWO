/**
 * auth.service.ts
 * 
 * Servicio de autenticación: gestiona el login, logout y estado de sesión.
 * - Valida credenciales del usuario
 * - Mantiene el estado de autenticación
 * - Almacena información del usuario autenticado
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioAutenticado, Credenciales } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject para mantener y emitir el estado del usuario autenticado
  private usuarioAutenticadoSubject = new BehaviorSubject<UsuarioAutenticado | null>(null);
  public usuarioAutenticado$: Observable<UsuarioAutenticado | null> = this.usuarioAutenticadoSubject.asObservable();

  /**
   * Constructor del servicio
   */
  constructor() {
    // Al inicializar el servicio, intentamos recuperar el usuario de sessionStorage
    this.cargarUsuarioGuardado();
  }

  /**
   * Método login: valida credenciales y autentica al usuario
   * 
   * @param credenciales - Objeto con email, password y project
   * @returns Observable<boolean> - true si la autenticación fue exitosa
   * 
   * Nota: Esta es una validación DEMO en frontend.
   * En producción, siempre validar en backend con conexión segura HTTPS.
   */
  login(credenciales: Credenciales): Observable<boolean> {
    return new Observable(observer => {
      // Simulamos un pequeño delay para mimificar una llamada HTTP
      setTimeout(() => {
        // Credenciales de DEMO (debe ser validado en backend en producción)
        if (
          credenciales.email === 'administrador@swo.com' &&
          credenciales.password === '123456' &&
          credenciales.project === '101'
        ) {
          // Usuario autenticado exitosamente
          const usuario: UsuarioAutenticado = {
            id: 'USR-001',
            nombre: 'Juan Pablo',
            apellido: 'Ramírez',
            correo: credenciales.email,
            celular: '+57 310 123 4567',
            area: 'TI',
            jefeDirecto: 'María García',
            correoJefe: 'maria.garcia@swo.com',
            role: 'Administrador'
          };

          // Guardamos el usuario en el BehaviorSubject
          this.usuarioAutenticadoSubject.next(usuario);
          // Persistimos en sessionStorage para no perder la sesión al recargar
          this.guardarUsuario(usuario);
          observer.next(true);
        } else {
          // Credenciales incorrectas
          observer.next(false);
        }
        observer.complete();
      }, 500);
    });
  }

  /**
   * Método logout: cierra la sesión del usuario
   * - Limpia el estado de autenticación
   * - Elimina datos de sessionStorage
   */
  logout(): void {
    this.usuarioAutenticadoSubject.next(null);
    sessionStorage.removeItem('usuarioAutenticado');
  }

  /**
   * Método isAutenticado: verifica si hay un usuario autenticado
   * 
   * @returns boolean - true si hay usuario autenticado
   */
  isAutenticado(): boolean {
    return this.usuarioAutenticadoSubject.value !== null;
  }

  /**
   * Método getUsuarioActual: obtiene el usuario autenticado actual
   * 
   * @returns UsuarioAutenticado | null - Usuario actual o null si no está autenticado
   */
  getUsuarioActual(): UsuarioAutenticado | null {
    return this.usuarioAutenticadoSubject.value;
  }

  /**
   * Método privado guardarUsuario: persiste el usuario en sessionStorage
   * 
   * @param usuario - Usuario a guardar
   */
  private guardarUsuario(usuario: UsuarioAutenticado): void {
    sessionStorage.setItem('usuarioAutenticado', JSON.stringify(usuario));
  }

  /**
   * Método privado cargarUsuarioGuardado: recupera el usuario de sessionStorage
   */
  private cargarUsuarioGuardado(): void {
    const usuarioGuardado = sessionStorage.getItem('usuarioAutenticado');
    if (usuarioGuardado) {
      try {
        const usuario: UsuarioAutenticado = JSON.parse(usuarioGuardado);
        this.usuarioAutenticadoSubject.next(usuario);
      } catch (error) {
        console.error('Error al cargar usuario guardado:', error);
        sessionStorage.removeItem('usuarioAutenticado');
      }
    }
  }
}
