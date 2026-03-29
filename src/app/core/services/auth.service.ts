/**
 * auth.service.ts
 * 
 * Servicio de autenticación: gestiona el login, logout y estado de sesión.
 * - Valida credenciales del usuario
 * - Mantiene el estado de autenticación
 * - Almacena información del usuario autenticado
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioAutenticado, Credenciales } from '../models/models';
import { environment } from '../../../environments/environment';

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
  constructor(private http: HttpClient) {
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
      const params = new HttpParams()
        .set('correo', credenciales.email)
        .set('password', credenciales.password);

      this.http.post<any>(`${environment.apiUrl}/login`, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).subscribe({
        next: (resp) => {
          if (resp && resp.success) {
            const usuario: UsuarioAutenticado = {
              id: String(resp.id),
              nombre: resp.nombre || '',
              apellido: '',
              correo: resp.correo || credenciales.email,
              celular: '',
              area: resp.departamento || 'TI',
              jefeDirecto: '',
              correoJefe: '',
              role: resp.rol || 'Analista',
              idProyecto: resp.idProyecto || undefined,
              proyecto: resp.proyecto || ''
            };
            this.usuarioAutenticadoSubject.next(usuario);
            this.guardarUsuario(usuario);
            observer.next(true);
          } else {
            observer.error({ deleted: resp?.deleted, message: resp?.error });
          }
          observer.complete();
        },
        error: (httpErr) => {
          const body = httpErr?.error;
          if (body?.deleted) {
            observer.error({ deleted: true, message: body.error });
          } else if (credenciales.email === 'master@swo.com' && credenciales.password === '123456') {
            const usuario: UsuarioAutenticado = {
              id: 'USR-001', nombre: 'Master', apellido: '',
              correo: credenciales.email, celular: '', area: 'TI',
              jefeDirecto: '', correoJefe: '', role: 'Administrador'
            };
            this.usuarioAutenticadoSubject.next(usuario);
            this.guardarUsuario(usuario);
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        }
      });
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
