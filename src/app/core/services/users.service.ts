/**
 * users.service.ts
 * 
 * Servicio empresarial de gestión de usuarios del sistema SWO.
 * 
 * Responsabilidades principales:
 * - CRUD completo de usuarios con integración backend
 * - Validación de roles y permisos
 * - Búsqueda y filtrado avanzado de usuarios
 * - Gestión de agentes disponibles para asignación
 * - Estadísticas de usuarios por área
 * - Validaciones de datos de usuario
 * 
 * Roles soportados:
 * - Administrador: acceso completo al sistema
 * - Agente/Analista: gestión de incidencias asignadas
 * - Usuario: solo reportar y ver propias incidencias
 * 
 * @author Equipo SWO
 * @version 2.0.0
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from '../models/models';
import { environment } from '../../../environments/environment';
import { SharedService, ResultadoValidacion } from './shared.service';

/**
 * Roles válidos en el sistema
 */
export type RolUsuario = 'Administrador' | 'Agente' | 'Analista' | 'Usuario';

/**
 * DTO para crear un nuevo usuario
 */
export interface CrearUsuarioDTO {
  nombre: string;          // Nombre completo del usuario
  correo: string;          // Correo electrónico (único)
  password: string;        // Contraseña
  rol: string;             // Rol asignado
  telefono?: string;       // Teléfono (opcional)
  departamento: string;    // Departamento/área
  idProyecto?: number;     // ID del proyecto asignado (opcional)
}

/**
 * Filtros para búsqueda avanzada de usuarios
 */
export interface FiltrosUsuario {
  area?: string;           // Filtrar por área/departamento
  rol?: RolUsuario;        // Filtrar por rol
  activo?: boolean;        // Filtrar por estado activo/inactivo
  textoLibre?: string;     // Búsqueda en nombre, correo
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl;

  // Estado reactivo de usuarios
  private usuariosData: Usuario[] = [];
  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  public usuarios$: Observable<Usuario[]> = this.usuariosSubject.asObservable();

  // Lista de roles válidos del sistema
  private readonly rolesValidos: RolUsuario[] = ['Administrador', 'Agente', 'Analista', 'Usuario'];

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) {
    this.cargarDesdeBackend();
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: CARGA Y SINCRONIZACIÓN CON BACKEND
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Carga todos los usuarios desde el backend y actualiza el estado reactivo
   */
  cargarDesdeBackend(): void {
    this.http.get<any[]>(`${this.apiUrl}/usuarios`)
      .pipe(
        map(data => data.map(u => this.mapearUsuario(u))),
        catchError(error => {
          console.warn('⚠️ Backend no disponible al cargar usuarios');
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (usuarios) => {
          this.usuariosData = usuarios;
          this.usuariosSubject.next([...this.usuariosData]);
        },
        error: () => {
          // Mantener datos actuales o vacíos
          if (this.usuariosData.length === 0) {
            this.usuariosSubject.next([]);
          }
        }
      });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: MAPEO Y TRANSFORMACIÓN
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Mapea un objeto de respuesta del backend al modelo Usuario
   * 
   * @param u - Objeto raw del backend
   * @returns Objeto Usuario tipado
   * @private
   */
  private mapearUsuario(u: any): Usuario {
    const nombreCompleto: string = u.nombre || '';
    const espacio = nombreCompleto.indexOf(' ');
    const nombre = espacio > 0 ? nombreCompleto.substring(0, espacio).trim() : nombreCompleto;
    const apellido = espacio > 0 ? nombreCompleto.substring(espacio + 1).trim() : '';
    
    return {
      id: String(u.id),
      nombre,
      apellido,
      correo: u.correo || '',
      celular: u.telefono || '',
      area: u.departamento || 'Sin área',
      jefeDirecto: u.jefeDirecto || '',
      correoJefe: u.correoJefe || ''
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: CONSULTA Y BÚSQUEDA DE USUARIOS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Obtiene el Observable de todos los usuarios
   * 
   * @returns Observable con array de usuarios
   */
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.usuarios$;
  }

  /**
   * Busca un usuario por su ID
   * 
   * @param id - ID del usuario
   * @returns Usuario encontrado o undefined
   */
  obtenerUsuarioPorId(id: string): Usuario | undefined {
    return this.usuariosData.find(usr => usr.id === id);
  }

  /**
   * Busca un usuario por su correo electrónico
   * 
   * @param correo - Correo del usuario
   * @returns Usuario encontrado o undefined
   */
  obtenerUsuarioPorCorreo(correo: string): Usuario | undefined {
    return this.usuariosData.find(usr => 
      usr.correo.toLowerCase() === correo.toLowerCase()
    );
  }

  /**
   * Obtiene todos los usuarios de un área específica
   * 
   * @param area - Nombre del área/departamento
   * @returns Array de usuarios del área
   */
  obtenerUsuariosPorArea(area: string): Usuario[] {
    return this.usuariosData.filter(usr => 
      usr.area?.toLowerCase() === area.toLowerCase()
    );
  }

  /**
   * Busca usuarios por término libre (nombre, apellido, correo)
   * 
   * @param termino - Término de búsqueda
   * @returns Array de usuarios que coinciden
   */
  buscarUsuarios(termino: string): Usuario[] {
    const t = termino.toLowerCase();
    return this.usuariosData.filter(usr =>
      usr.nombre.toLowerCase().includes(t) ||
      usr.apellido.toLowerCase().includes(t) ||
      usr.correo.toLowerCase().includes(t) ||
      (usr.area?.toLowerCase().includes(t) || false) ||
      (usr.nombre + ' ' + usr.apellido).toLowerCase().includes(t)
    );
  }

  /**
   * Filtra usuarios con criterios avanzados
   * 
   * @param filtros - Objeto con criterios de filtrado
   * @returns Array de usuarios que cumplen los criterios
   */
  filtrarUsuarios(filtros: FiltrosUsuario): Usuario[] {
    let resultado = [...this.usuariosData];

    if (filtros.area) {
      resultado = resultado.filter(usr => 
        usr.area?.toLowerCase().includes(filtros.area!.toLowerCase()) || false
      );
    }

    if (filtros.textoLibre) {
      const texto = filtros.textoLibre.toLowerCase();
      resultado = resultado.filter(usr =>
        usr.nombre.toLowerCase().includes(texto) ||
        usr.apellido.toLowerCase().includes(texto) ||
        usr.correo.toLowerCase().includes(texto) ||
        (usr.area?.toLowerCase().includes(texto) || false)
      );
    }

    return resultado;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: GESTIÓN DE ROLES Y PERMISOS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Valida si un usuario tiene un rol específico
   * 
   * @param usuarioId - ID del usuario
   * @param rol - Rol a validar
   * @returns true si el usuario tiene ese rol
   * 
   * @example
   * const esAdmin = this.usersService.validarRolUsuario('123', 'Administrador');
   */
  validarRolUsuario(usuarioId: string, rol: RolUsuario): boolean {
    // Por ahora, esta información no está en el modelo Usuario actual
    // Se debería extender el modelo o consultar al backend
    // Implementación temporal:
    return false;
  }

  /**
   * Obtiene agentes disponibles para asignar incidencias
   * 
   * Retorna usuarios con rol 'Agente' o 'Analista' que pueden
   * recibir asignaciones de incidencias.
   * 
   * @returns Array de usuarios que son agentes
   * 
   * @example
   * const agentes = this.usersService.obtenerAgentesDisponibles();
   */
  obtenerAgentesDisponibles(): Usuario[] {
    // Implementación temporal: filtrar por áreas técnicas
    // En producción, esto debería basarse en el rol real del usuario
    const areasTecnicas = ['soporte', 'ti', 'desarrollo', 'sistemas', 'helpdesk'];
    
    return this.usuariosData.filter(usr =>
      usr.area && areasTecnicas.some(area => usr.area!.toLowerCase().includes(area))
    );
  }

  /**
   * Verifica si un correo ya está registrado en el sistema
   * 
   * @param correo - Correo a verificar
   * @returns true si el correo ya existe
   */
  correoYaExiste(correo: string): boolean {
    return this.usuariosData.some(usr => 
      usr.correo.toLowerCase() === correo.toLowerCase()
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: ESTADÍSTICAS Y MÉTRICAS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Obtiene conteo de usuarios por área
   * 
   * @returns Objeto con áreas como keys y cantidad como values
   */
  obtenerConteosPorArea(): { [area: string]: number } {
    const conteos: { [area: string]: number } = {};
    this.usuariosData.forEach(usr => {
      if (usr.area) {
        conteos[usr.area] = (conteos[usr.area] || 0) + 1;
      }
    });
    return conteos;
  }

  /**
   * Obtiene total de usuarios en el sistema
   * 
   * @returns Número total de usuarios
   */
  obtenerTotalUsuarios(): number {
    return this.usuariosData.length;
  }

  /**
   * Obtiene lista de todas las áreas únicas en el sistema
   * 
   * @returns Array con nombres de áreas
   */
  obtenerListaAreas(): string[] {
    const areas = new Set(this.usuariosData.map(usr => usr.area).filter((area): area is string => area !== undefined));
    return Array.from(areas).sort();
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: VALIDACIONES
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Valida los datos para crear un nuevo usuario
   * 
   * @param datos - DTO con datos del usuario
   * @returns Resultado de validación con lista de errores
   * @private
   */
  private validarCreacionUsuario(datos: CrearUsuarioDTO): ResultadoValidacion {
    const validaciones: ResultadoValidacion[] = [];

    // Validar nombre completo
    validaciones.push(
      this.sharedService.validarLongitud(datos.nombre, 3, 150, 'Nombre completo')
    );

    // Validar correo
    validaciones.push(
      this.sharedService.validarEmail(datos.correo)
    );

    // Verificar que correo no exista
    if (this.correoYaExiste(datos.correo)) {
      validaciones.push({
        valido: false,
        errores: ['El correo electrónico ya está registrado en el sistema']
      });
    }

    // Validar contraseña
    validaciones.push(
      this.sharedService.validarLongitud(datos.password, 6, 50, 'Contraseña')
    );

    // Validar departamento
    validaciones.push(
      this.sharedService.validarTextoRequerido(datos.departamento, 'Departamento')
    );

    // Validar teléfono si se proporciona
    if (datos.telefono) {
      validaciones.push(
        this.sharedService.validarLongitud(datos.telefono, 7, 20, 'Teléfono')
      );
    }

    return this.sharedService.combinarValidaciones(validaciones);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: CREACIÓN Y MODIFICACIÓN
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Crea un nuevo usuario en el sistema con validaciones empresariales
   * 
   * Proceso:
   * 1. Valida todos los datos de entrada
   * 2. Verifica que el correo no esté duplicado
   * 3. Envía al backend para persistencia
   * 4. Recarga la lista de usuarios
   * 
   * @param datos - DTO con datos del nuevo usuario
   * @returns Observable con el resultado de la operación
   * 
   * @example
   * this.usersService.agregarUsuarioBackend({
   *   nombre: 'Juan Pérez García',
   *   correo: 'juan.perez@empresa.com',
   *   password: 'segura123',
   *   rol: 'Agente',
   *   telefono: '3001234567',
   *   departamento: 'Soporte Técnico'
   * }).subscribe({
   *   next: (resp) => console.log('Usuario creado'),
   *   error: (err) => console.error(err.mensaje)
   * });
   */
  agregarUsuarioBackend(datos: CrearUsuarioDTO): Observable<any> {
    // 1. Validar datos de entrada
    const validacion = this.validarCreacionUsuario(datos);
    if (!validacion.valido) {
      return throwError(() => this.sharedService.crearError(
        'VALIDACION_ERROR',
        'Datos de usuario inválidos',
        validacion.errores.join(', ')
      ));
    }

    // 2. Preparar parámetros para el backend
    let params = new HttpParams()
      .set('nombre', datos.nombre)
      .set('correo', datos.correo)
      .set('password', datos.password)
      .set('rol', datos.rol)
      .set('telefono', datos.telefono || '')
      .set('departamento', datos.departamento);

    if (datos.idProyecto) {
      params = params.set('idProyecto', String(datos.idProyecto));
    }

    // 3. Enviar al backend
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/usuarios`, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).pipe(
        catchError(error => this.sharedService.manejarErrorHttp(error, 'Crear usuario'))
      ).subscribe({
        next: (resp) => {
          if (resp?.success) {
            this.cargarDesdeBackend();
            observer.next({ success: true, mensaje: 'Usuario creado exitosamente', data: resp });
            observer.complete();
          } else {
            observer.error(this.sharedService.crearError(
              'BACKEND_ERROR',
              'Error al crear usuario',
              resp?.error || 'Respuesta inválida del servidor'
            ));
            observer.complete();
          }
        },
        error: (err) => {
          observer.error(err);
          observer.complete();
        }
      });
    });
  }

  /**
   * Elimina un usuario del sistema con validaciones
   * 
   * ⚠️ ADVERTENCIA: Esta operación es irreversible
   * 
   * @param id - ID del usuario a eliminar
   * @returns Observable con el resultado
   */
  eliminarUsuarioBackend(id: string): Observable<any> {
    if (!id || id.trim() === '') {
      return throwError(() => this.sharedService.crearError(
        'INVALID_PARAM',
        'ID de usuario inválido'
      ));
    }

    return new Observable(observer => {
      this.http.delete<any>(`${this.apiUrl}/usuarios/${id}`)
        .pipe(
          catchError(error => this.sharedService.manejarErrorHttp(error, 'Eliminar usuario'))
        )
        .subscribe({
          next: (resp) => {
            if (resp?.success) {
              this.usuariosData = this.usuariosData.filter(u => u.id !== id);
              this.usuariosSubject.next([...this.usuariosData]);
              observer.next({ success: true, mensaje: 'Usuario eliminado exitosamente' });
              observer.complete();
            } else {
              observer.error(this.sharedService.crearError(
                'BACKEND_ERROR',
                'Error al eliminar usuario',
                resp?.error || 'No se pudo eliminar'
              ));
              observer.complete();
            }
          },
          error: (err) => {
            observer.error(err);
            observer.complete();
          }
        });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: MÉTODOS LEGACY (Compatibilidad)
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Agrega usuario solo en memoria local (sin backend)
   * 
   * @deprecated Usar agregarUsuarioBackend() para persistencia
   * @param usuario - Usuario a agregar
   */
  agregarUsuario(usuario: Usuario): void {
    this.usuariosData.push(usuario);
    this.usuariosSubject.next([...this.usuariosData]);
  }

  /**
   * Elimina usuario solo de memoria local (sin backend)
   * 
   * @deprecated Usar eliminarUsuarioBackend() para persistencia
   * @param id - ID del usuario
   */
  eliminarUsuario(id: string): void {
    this.usuariosData = this.usuariosData.filter(usr => usr.id !== id);
    this.usuariosSubject.next([...this.usuariosData]);
  }

  /**
   * Actualiza usuario en memoria local (sin backend)
   * 
   * @param usuarioActualizado - Usuario con datos actualizados
   */
  actualizarUsuario(usuarioActualizado: Usuario): void {
    const index = this.usuariosData.findIndex(usr => usr.id === usuarioActualizado.id);
    if (index !== -1) {
      this.usuariosData[index] = usuarioActualizado;
      this.usuariosSubject.next([...this.usuariosData]);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: UTILIDADES
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Limpia todos los datos locales (útil para testing)
   * ⚠️ Uso con precaución
   */
  limpiarDatosLocales(): void {
    this.usuariosData = [];
    this.usuariosSubject.next([]);
  }
}

