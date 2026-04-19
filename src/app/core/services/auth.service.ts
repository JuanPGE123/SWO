/**
 * @fileoverview Servicio de autenticación y gestión de sesión
 * 
 * **Responsabilidades principales:**
 * - Autenticar usuarios mediante credenciales (email + password)
 * - Gestionar la sesión del usuario autenticado
 * - Almacenar y recuperar información del usuario en sessionStorage
 * - Validar si un usuario tiene una sesión activa
 * - Cerrar sesión y limpiar datos de sesión
 * - Proveer un Observable reactivo del estado de autenticación
 * 
 * **Flujo de autenticación:**
 * 1. Usuario ingresa credenciales en formulario de login
 * 2. AuthService valida credenciales contra el backend
 * 3. Si es exitoso, almacena usuario en memoria y sessionStorage
 * 4. Emite el nuevo estado a través de BehaviorSubject
 * 5. Componentes suscritos reciben actualización del estado
 * 
 * **Seguridad:**
 * - Contraseñas nunca se almacenan, solo se envían para validación
 * - Sesión se guarda en sessionStorage (se limpia al cerrar navegador)
 * - Usuario master solo para desarrollo (debe removerse en producción)
 * - Implementa refresh de sesión al recargar página
 * 
 * **Uso:**
 * ```typescript
 * // En un componente:
 * constructor(private authService: AuthService) {}
 * 
 * // Hacer login:
 * this.authService.login({ email, password }).subscribe(
 *   success => {
 *     if (success) this.router.navigate(['/dashboard']);
 *   }
 * );
 * 
 * // Verificar si está autenticado:
 * if (this.authService.isAutenticado()) {
 *   // Usuario tiene sesión activa
 * }
 * 
 * // Obtener usuario actual:
 * const user = this.authService.getUsuarioActual();
 * 
 * // Suscribirse a cambios de autenticación:
 * this.authService.usuarioAutenticado$.subscribe(user => {
 *   console.log('Usuario actual:', user);
 * });
 * ```
 * 
 * @author Equipo SWO
 * @version 2.0.0
 * @since 2026-04-19
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { UsuarioAutenticado, Credenciales } from '../models/models';
import { LoginRequest, LoginResponse } from '../models/dtos';
import { AUTH_CONSTANTS, NOTIFICATION_MESSAGES } from '../constants/app.constants';
import { RolUsuario } from '../enums/app.enums';
import { environment } from '../../../environments/environment';

/**
 * Servicio de autenticación
 * 
 * Maneja toda la lógica de autenticación, sesión y autorización de usuarios.
 * Proporciona un estado reactivo observable del usuario autenticado.
 * 
 * @Injectable Registrado en el root injector (singleton)
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ═════════════════════════════════════════════════════════════════════════
  // PROPIEDADES PRIVADAS
  // ═════════════════════════════════════════════════════════════════════════

  /** Cliente HTTP inyectado */
  private readonly http = inject(HttpClient);

  /**
   * BehaviorSubject que mantiene el estado actual del usuario autenticado
   * 
   * - BehaviorSubject vs Subject: mantiene el último valor emitido y lo entrega
   *   inmediatamente a nuevos suscriptores
   * - Valor inicial: null (ningún usuario autenticado)
   * - Se actualiza en login exitoso y se limpia en logout
   * 
   * @private
   */
  private readonly usuarioAutenticadoSubject = new BehaviorSubject<UsuarioAutenticado | null>(null);

  // ═════════════════════════════════════════════════════════════════════════
  // PROPIEDADES PÚBLICAS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Observable público del usuario autenticado
   * 
   * Los componentes pueden suscribirse a este observable para recibir
   * actualizaciones en tiempo real del estado de autenticación.
   * 
   * **Casos de uso:**
   * - Mostrar/ocultar elementos según usuario autenticado
   * - Personalizar UI según rol del usuario
   * - Reaccionar a cambios de sesión (login/logout)
   * 
   * @readonly
   * @example
   * ```typescript
   * this.authService.usuarioAutenticado$.subscribe(user => {
   *   if (user) {
   *     console.log('Usuario logueado:', user.nombre);
   *   } else {
   *     console.log('No hay usuario autenticado');
   *   }
   * });
   * ```
   */
  public readonly usuarioAutenticado$: Observable<UsuarioAutenticado | null> = 
    this.usuarioAutenticadoSubject.asObservable();

  // ═════════════════════════════════════════════════════════════════════════
  // CONSTRUCTOR
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Constructor del servicio de autenticación
   * 
   * **Inicialización:**
   * - Intenta recuperar sesión guardada en sessionStorage
   * - Si encuentra usuario guardado y es válido, restaura la sesión
   * - Si no hay usuario o datos corruptos, inicia con sesión vacía
   * 
   * Esto permite que el usuario mantenga su sesión al recargar la página.
   */
  constructor() {
    this.cargarUsuarioGuardado();
    
    if (!environment.production) {
      console.log('🔐 AuthService inicializado');
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS PÚBLICOS - AUTENTICACIÓN
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Autentica un usuario con sus credenciales
   * 
   * **Flujo de autenticación:**
   * 1. Verifica si son credenciales del usuario master (bypass)
   * 2. Si no, realiza petición HTTP POST al backend
   * 3. Si backend responde OK, crea objeto UsuarioAutenticado
   * 4. Almacena usuario en memoria y sessionStorage
   * 5. Emite el nuevo estado a través del BehaviorSubject
   * 6. Retorna Observable<boolean> indicando éxito/fallo
   * 
   * **Usuario Master (solo desarrollo):**
   * - Email: master@swo.com
   * - Password: 123456
   * - Bypasea completamente el backend
   * - Solo debe usarse en desarrollo
   * - ⚠️ DEBE SER REMOVIDO EN PRODUCCIÓN
   * 
   * **Manejo de errores:**
   * - Usuario eliminado: error.deleted = true
   * - Credenciales incorrectas: retorna false
   * - Error de red: retorna false y el interceptor maneja el error
   * 
   * @param credenciales - Email y password del usuario
   * @returns Observable que emite true si login exitoso, false si falla
   * 
   * @throws Error con { deleted: true } si el usuario fue eliminado
   * 
   * @example
   * ```typescript
   * this.authService.login({ email: 'user@test.com', password: '123456' })
   *   .subscribe({
   *     next: (success) => {
   *       if (success) {
   *         console.log('Login exitoso');
   *         this.router.navigate(['/dashboard']);
   *       } else {
   *         console.log('Credenciales incorrectas');
   *       }
   *     },
   *     error: (err) => {
   *       if (err.deleted) {
   *         console.log('Usuario eliminado del sistema');
   *       }
   *     }
   *   });
   * ```
   */
  login(credenciales: Credenciales): Observable<boolean> {
    return new Observable(observer => {
      // ─────────────────────────────────────────────────────────────────────
      // 1. BYPASS CON USUARIO MASTER (solo desarrollo)
      // ─────────────────────────────────────────────────────────────────────
      if (
        credenciales.email.trim().toLowerCase() === AUTH_CONSTANTS.MASTER_EMAIL &&
        credenciales.password === AUTH_CONSTANTS.MASTER_PASSWORD
      ) {
        if (!environment.production) {
          console.warn('⚠️ Login con usuario master (solo desarrollo)');
        }

        const master: UsuarioAutenticado = {
          id: 'USR-MASTER',
          nombre: 'Master',
          apellido: 'SWO',
          correo: AUTH_CONSTANTS.MASTER_EMAIL,
          celular: '',
          area: 'TI',
          jefeDirecto: '',
          correoJefe: '',
          role: RolUsuario.ADMINISTRADOR,
        };

        this.establecerSesion(master);
        observer.next(true);
        observer.complete();
        return;
      }

      // ─────────────────────────────────────────────────────────────────────
      // 2. AUTENTICACIÓN NORMAL CONTRA BACKEND
      // ─────────────────────────────────────────────────────────────────────
      
      // Preparar datos en formato application/x-www-form-urlencoded
      const params = new HttpParams()
        .set('correo', credenciales.email.trim())
        .set('password', credenciales.password);

      // Realizar petición POST al endpoint de login
      this.http.post<LoginResponse>(`${environment.apiUrl}/login`, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).pipe(
        // Transformar respuesta del backend a booleano
        map(resp => {
          if (resp && resp.success) {
            // Login exitoso: crear objeto UsuarioAutenticado
            const usuario: UsuarioAutenticado = {
              id: String(resp.id),
              nombre: resp.nombre || '',
              apellido: '',
              correo: resp.correo || credenciales.email,
              celular: '',
              area: resp.departamento || 'TI',
              jefeDirecto: '',
              correoJefe: '',
              role: resp.rol || RolUsuario.USUARIO,
              token: resp.token,
              idProyecto: resp.idProyecto,
              proyecto: resp.proyecto || '',
            };

            this.establecerSesion(usuario);
            return true;
          } else {
            // Respuesta del servidor indica fallo
            return false;
          }
        }),
        // Manejar errores HTTP
        catchError(httpErr => {
          const body = httpErr?.error;
          
          // Caso especial: usuario fue eliminado
          if (body?.deleted) {
            return throwError(() => ({ 
              deleted: true, 
              message: NOTIFICATION_MESSAGES.ERROR.USER_DELETED 
            }));
          }
          
          // Otros errores: credenciales incorrectas
          return of(false);
        })
      ).subscribe({
        next: (success) => {
          observer.next(success);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
          observer.complete();
        }
      });
    });
  }

  /**
   * Cierra la sesión del usuario actual
   * 
   * **Acciones realizadas:**
   * 1. Limpia el BehaviorSubject (establece valor a null)
   * 2. Elimina el usuario de sessionStorage
   * 3. Elimina el token de sessionStorage (si existe)
   * 4. Componentes suscritos reciben notificación de logout
   * 
   * **Nota:** No realiza petición al backend para invalidar sesión.
   * Si el backend maneja tokens JWT, debería implementarse un endpoint
   * de logout para invalidar el token.
   * 
   * @example
   * ```typescript
   * logout() {
   *   if (confirm('¿Cerrar sesión?')) {
   *     this.authService.logout();
   *     this.router.navigate(['/login']);
   *   }
   * }
   * ```
   */
  logout(): void {
    // Limpiar estado en memoria
    this.usuarioAutenticadoSubject.next(null);
    
    // Limpiar almacenamiento
    sessionStorage.removeItem(AUTH_CONSTANTS.SESSION_USER_KEY);
    sessionStorage.removeItem(AUTH_CONSTANTS.SESSION_TOKEN_KEY);

    if (!environment.production) {
      console.log('🚪 Usuario deslogueado');
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS PÚBLICOS - CONSULTAS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Verifica si existe una sesión activa
   * 
   * Un usuario está autenticado si el BehaviorSubject tiene un valor
   * diferente de null.
   * 
   * **Uso común:**
   * - En guards de rutas protegidas
   * - Para mostrar/ocultar elementos de UI
   * - Para determinar si redirigir a login
   * 
   * @returns true si hay usuario autenticado, false en caso contrario
   * 
   * @example
   * ```typescript
   * // En un guard:
   * canActivate(): boolean {
   *   if (this.authService.isAutenticado()) {
   *     return true;
   *   }
   *   this.router.navigate(['/login']);
   *   return false;
   * }
   * 
   * // En un componente:
   * ngOnInit() {
   *   if (!this.authService.isAutenticado()) {
   *     this.router.navigate(['/login']);
   *   }
   * }
   * ```
   */
  isAutenticado(): boolean {
    return this.usuarioAutenticadoSubject.value !== null;
  }

  /**
   * Obtiene el usuario actualmente autenticado
   * 
   * Retorna el valor actual del BehaviorSubject, que puede ser:
   * - Un objeto UsuarioAutenticado si hay sesión activa
   * - null si no hay usuario autenticado
   * 
   * **Nota:** Este método retorna el valor actual de forma síncrona.
   * Si necesitas reaccionar a cambios, suscríbete a `usuarioAutenticado$`.
   * 
   * @returns El usuario autenticado o null
   * 
   * @example
   * ```typescript
   * const user = this.authService.getUsuarioActual();
   * if (user) {
   *   console.log('Bienvenido', user.nombre);
   *   if (user.role === 'Administrador') {
   *     // Mostrar opciones de admin
   *   }
   * }
   * ```
   */
  getUsuarioActual(): UsuarioAutenticado | null {
    return this.usuarioAutenticadoSubject.value;
  }

  /**
   * Verifica si el usuario actual tiene un rol específico
   * 
   * Útil para control de acceso granular en la UI.
   * 
   * @param rol - El rol a verificar (ej: 'Administrador', 'Analista')
   * @returns true si el usuario tiene ese rol, false en caso contrario
   * 
   * @example
   * ```typescript
   * // En una plantilla:
   * <button *ngIf="authService.tieneRol('Administrador')">
   *   Gestionar Usuarios
   * </button>
   * 
   * // En un componente:
   * if (this.authService.tieneRol('Administrador')) {
   *   this.cargarOpcionesAdmin();
   * }
   * ```
   */
  tieneRol(rol: string): boolean {
    const usuario = this.getUsuarioActual();
    return usuario !== null && usuario.role === rol;
  }

  /**
   * Verifica si el usuario actual es administrador
   * 
   * Método de conveniencia para verificar el rol más común.
   * 
   * @returns true si el usuario es administrador, false en caso contrario
   * 
   * @example
   * ```typescript
   * if (this.authService.esAdministrador()) {
   *   // Mostrar panel de administración
   * }
   * ```
   */
  esAdministrador(): boolean {
    return this.tieneRol(RolUsuario.ADMINISTRADOR);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS PRIVADOS - HELPERS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Establece una sesión de usuario autenticado
   * 
   * Centraliza la lógica de establecer sesión para reutilizar en login
   * normal y login master.
   * 
   * **Acciones:**
   * 1. Actualiza el BehaviorSubject con el nuevo usuario
   * 2. Guarda el usuario en sessionStorage
   * 3. Guarda el token en sessionStorage (si existe)
   * 
   * @param usuario - Usuario autenticado a establecer
   * @private
   */
  private establecerSesion(usuario: UsuarioAutenticado): void {
    this.usuarioAutenticadoSubject.next(usuario);
    this.guardarUsuario(usuario);

    if (usuario.token) {
      sessionStorage.setItem(AUTH_CONSTANTS.SESSION_TOKEN_KEY, usuario.token);
    }

    if (!environment.production) {
      console.log('✓ Sesión establecida:', usuario.nombre, usuario.role);
    }
  }

  /**
   * Persiste el usuario en sessionStorage
   * 
   * Serializa el objeto usuario a JSON y lo almacena en sessionStorage
   * con la clave definida en constantes.
   * 
   * **Nota:** sessionStorage se limpia automáticamente al cerrar el navegador,
   * a diferencia de localStorage que persiste indefinidamente.
   * 
   * @param usuario - Usuario a guardar
   * @private
   */
  private guardarUsuario(usuario: UsuarioAutenticado): void {
    try {
      const usuarioJSON = JSON.stringify(usuario);
      sessionStorage.setItem(AUTH_CONSTANTS.SESSION_USER_KEY, usuarioJSON);
    } catch (error) {
      console.error('❌ Error al guardar usuario en sessionStorage:', error);
    }
  }

  /**
   * Recupera el usuario de sessionStorage al inicializar el servicio
   * 
   * Intenta cargar y deserializar el usuario guardado. Si hay algún error
   * (datos corruptos, formato inválido, etc.), limpia el storage y continúa
   * con sesión vacía.
   * 
   * **Esto permite:**
   * - Mantener la sesión al recargar la página
   * - Recuperar sesión tras navegar entre tabs (mismo dominio)
   * - Evitar re-login innecesario
   * 
   * @private
   */
  private cargarUsuarioGuardado(): void {
    try {
      const usuarioJSON = sessionStorage.getItem(AUTH_CONSTANTS.SESSION_USER_KEY);
      
      if (usuarioJSON) {
        const usuario: UsuarioAutenticado = JSON.parse(usuarioJSON);
        
        // Validar que el objeto tiene propiedades básicas
        if (usuario.id && usuario.correo && usuario.role) {
          this.usuarioAutenticadoSubject.next(usuario);
          
          if (!environment.production) {
            console.log('✓ Sesión recuperada:', usuario.nombre);
          }
        } else {
          throw new Error('Datos de usuario inválidos');
        }
      }
    } catch (error) {
      console.error('❌ Error al cargar usuario guardado:', error);
      // Limpiar datos corruptos
      sessionStorage.removeItem(AUTH_CONSTANTS.SESSION_USER_KEY);
      sessionStorage.removeItem(AUTH_CONSTANTS.SESSION_TOKEN_KEY);
    }
  }
}
