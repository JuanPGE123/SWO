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

  // ─── Credenciales del usuario master (hardcoded, sin base de datos) ───────
  private readonly MASTER_EMAIL    = 'master@swo.com';
  private readonly MASTER_PASSWORD = '123456';

  /**
   * Constructor del servicio
   */
  constructor(private http: HttpClient) {
    // Al inicializar el servicio, intentamos recuperar el usuario de sessionStorage
    this.cargarUsuarioGuardado();
  }

  /**
   * Método login: valida credenciales y autentica al usuario.
   *
   * 1. Si son las credenciales master → acceso inmediato sin tocar el backend.
   * 2. En caso contrario → llama al backend REST.
   *
   * @param credenciales - Objeto con email y password
   * @returns Observable<boolean> - true si la autenticación fue exitosa
   */
  login(credenciales: Credenciales): Observable<boolean> {
    return new Observable(observer => {

      // ── 1. Chequeo master (bypasa el backend completamente) ──────────────
      if (
        credenciales.email.trim().toLowerCase() === this.MASTER_EMAIL &&
        credenciales.password === this.MASTER_PASSWORD
      ) {
        const master: UsuarioAutenticado = {
          id: 'USR-MASTER',
          nombre: 'Master',
          apellido: 'SWO',
          correo: this.MASTER_EMAIL,
          celular: '',
          area: 'TI',
          jefeDirecto: '',
          correoJefe: '',
          role: 'Administrador'
        };
        this.usuarioAutenticadoSubject.next(master);
        this.guardarUsuario(master);
        observer.next(true);
        observer.complete();
        return;
      }

      // ── 2. Login normal contra el backend ────────────────────────────────
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
