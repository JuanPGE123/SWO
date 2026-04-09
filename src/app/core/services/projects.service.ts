/**
 * projects.service.ts
 * 
 * Servicio empresarial de gestión de proyectos del sistema SWO.
 * 
 * Responsabilidades principales:
 * - CRUD completo de proyectos
 * - Asociación de usuarios a proyectos
 * - Asociación de incidencias a proyectos
 * - Búsqueda y filtrado de proyectos
 * - Estadísticas de proyectos
 * - Validaciones de datos
 * 
 * @author Equipo SWO
 * @version 2.0.0
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Proyecto } from '../models/models';
import { environment } from '../../../environments/environment';
import { SharedService, ResultadoValidacion } from './shared.service';

/**
 * DTO para crear un nuevo proyecto
 */
export interface CrearProyectoDTO {
  nombre: string;
  descripcion: string;
  estado?: string;
}

/**
 * Estadísticas de un proyecto
 */
export interface EstadisticasProyecto {
  usuariosAsignados: number;
  incidenciasAsociadas: number;
  incidenciasAbiertas: number;
  incidenciasResueltas: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = environment.apiUrl;

  // Estado reactivo de proyectos
  private proyectosData: Proyecto[] = [];
  private proyectosSubject = new BehaviorSubject<Proyecto[]>([]);
  public proyectos$: Observable<Proyecto[]> = this.proyectosSubject.asObservable();

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
   * Carga todos los proyectos desde el backend
   */
  cargarDesdeBackend(): void {
    this.http.get<any[]>(`${this.apiUrl}/proyectos`)
      .pipe(
        map(data => data.map(p => ({
          id: p.id,
          nombre: p.nombre || '',
          descripcion: p.descripcion || '',
          estado: p.estado || 'Activo',
          fechaCreacion: p.fechaCreacion || ''
        }))),
        catchError(error => {
          console.warn('⚠️ Backend no disponible al cargar proyectos');
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (proyectos) => {
          this.proyectosData = proyectos;
          this.proyectosSubject.next([...this.proyectosData]);
        },
        error: () => {
          if (this.proyectosData.length === 0) {
            this.proyectosSubject.next([]);
          }
        }
      });
   }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: CONSULTA Y BÚSQUEDA
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Obtiene el Observable de todos los proyectos
   * 
   * @returns Observable con array de proyectos
   */
  obtenerProyectos(): Observable<Proyecto[]> {
    return this.proyectos$;
  }

  /**
   * Obtiene un proyecto específico por ID
   * 
   * @param id - ID del proyecto
   * @returns Proyecto encontrado o undefined
   */
  obtenerProyectoPorId(id: number): Proyecto | undefined {
    return this.proyectosData.find(p => p.id === id);
  }

  /**
   * Busca proyectos por nombre o descripción
   * 
   * @param termino - Término de búsqueda
   * @returns Array de proyectos que coinciden
   */
  buscarProyectos(termino: string): Proyecto[] {
    const t = termino.toLowerCase();
    return this.proyectosData.filter(p =>
      p.nombre.toLowerCase().includes(t) ||
      p.descripcion.toLowerCase().includes(t)
    );
  }

  /**
   * Obtiene solo proyectos activos
   * 
   * @returns Array de proyectos con estado 'Activo'
   */
  obtenerProyectosActivos(): Proyecto[] {
    return this.proyectosData.filter(p => p.estado === 'Activo');
  }

  /**
   * Obtiene proyectos por estado específico
   * 
   * @param estado - Estado del proyecto ('Activo', 'Archivado', etc)
   * @returns Array de proyectos con ese estado
   */
  obtenerProyectosPorEstado(estado: string): Proyecto[] {
    return this.proyectosData.filter(p => p.estado === estado);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: VALIDACIONES
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Valida los datos para crear un proyecto
   * 
   * @param datos - DTO con datos del proyecto
   * @returns Resultado de validación
   * @private
   */
  private validarCreacionProyecto(datos: CrearProyectoDTO): ResultadoValidacion {
    const validaciones: ResultadoValidacion[] = [];

    // Validar nombre
    validaciones.push(
      this.sharedService.validarLongitud(datos.nombre, 3, 150, 'Nombre del proyecto')
    );

    // Validar descripción
    validaciones.push(
      this.sharedService.validarLongitud(datos.descripcion, 10, 500, 'Descripción')
    );

    // Verificar que el nombre no esté duplicado
    if (this.nombreProyectoExiste(datos.nombre)) {
      validaciones.push({
        valido: false,
        errores: ['Ya existe un proyecto con ese nombre']
      });
    }

    return this.sharedService.combinarValidaciones(validaciones);
  }

  /**
   * Verifica si un nombre de proyecto ya existe
   * 
   * @param nombre - Nombre a verificar
   * @returns true si existe
   * @private
   */
  private nombreProyectoExiste(nombre: string): boolean {
    return this.proyectosData.some(p => 
      p.nombre.toLowerCase() === nombre.toLowerCase()
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: CREACIÓN Y MODIFICACIÓN
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Crea un nuevo proyecto con validaciones empresariales
   * 
   * @param datos - DTO con datos del proyecto
   * @returns Observable con el resultado
   * 
   * @example
   * this.projectsService.crearProyecto({
   *   nombre: 'Sistema de Gestión',
   *   descripcion: 'Plataforma web para gestión administrativa',
   *   estado: 'Activo'
   * }).subscribe({
   *   next: (resp) => console.log('Proyecto creado'),
   *   error: (err) => console.error(err.mensaje)
   * });
   */
  crearProyecto(datos: CrearProyectoDTO): Observable<any>;
  crearProyecto(nombre: string, descripcion: string, estado: string): Observable<any>;
  crearProyecto(datosONombre: CrearProyectoDTO | string, descripcion?: string, estado?: string): Observable<any> {
    // Normalizar parámetros (sobrecarga de método)
    let datos: CrearProyectoDTO;
    
    if (typeof datosONombre === 'string') {
      datos = {
        nombre: datosONombre,
        descripcion: descripcion!,
        estado: estado || 'Activo'
      };
    } else {
      datos = datosONombre;
    }

    // Validar datos
    const validacion = this.validarCreacionProyecto(datos);
    if (!validacion.valido) {
      return throwError(() => this.sharedService.crearError(
        'VALIDACION_ERROR',
        'Datos de proyecto inválidos',
        validacion.errores.join(', ')
      ));
    }

    // Preparar parámetros
    const params = new HttpParams()
      .set('nombre', datos.nombre)
      .set('descripcion', datos.descripcion)
      .set('estado', datos.estado || 'Activo');

    // Enviar al backend
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/proyectos`, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).pipe(
        catchError(error => this.sharedService.manejarErrorHttp(error, 'Crear proyecto'))
      ).subscribe({
        next: (resp) => {
          if (resp?.success) {
            this.cargarDesdeBackend();
            observer.next({ success: true, mensaje: 'Proyecto creado exitosamente', data: resp });
            observer.complete();
          } else {
            observer.error(this.sharedService.crearError(
              'BACKEND_ERROR',
              'Error al crear proyecto',
              resp?.error || 'Error desconocido'
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
   * Actualiza un proyecto existente (local)
   * 
   * @param proyecto - Proyecto actualizado
   */
  actualizarProyecto(proyecto: Proyecto): void {
    const index = this.proyectosData.findIndex(p => p.id === proyecto.id);
    if (index !== -1) {
      this.proyectosData[index] = proyecto;
      this.proyectosSubject.next([...this.proyectosData]);
    }
  }

  /**
   * Elimina un proyecto con validación
   * 
   * ⚠️ ADVERTENCIA: Esta operación es irreversible
   * 
   * @param id - ID del proyecto a eliminar
   * @returns Observable con el resultado
   */
  eliminarProyecto(id: number): Observable<any> {
    if (!id || id <= 0) {
      return throwError(() => this.sharedService.crearError(
        'INVALID_PARAM',
        'ID de proyecto inválido'
      ));
    }

    return new Observable(observer => {
      this.http.delete<any>(`${this.apiUrl}/proyectos/${id}`)
        .pipe(
          catchError(error => this.sharedService.manejarErrorHttp(error, 'Eliminar proyecto'))
        )
        .subscribe({
          next: (resp) => {
            if (resp?.success) {
              this.proyectosData = this.proyectosData.filter(p => p.id !== id);
              this.proyectosSubject.next([...this.proyectosData]);
              observer.next({ success: true, mensaje: 'Proyecto eliminado exitosamente' });
              observer.complete();
            } else {
              observer.error(this.sharedService.crearError(
                'BACKEND_ERROR',
                'Error al eliminar proyecto',
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
  // SECCIÓN: ASOCIACIONES
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Asigna un usuario a un proyecto
   * 
   * @param idUsuario - ID del usuario
   * @param idProyecto - ID del proyecto
   * @returns Observable con el resultado
   */
  asignarUsuario(idUsuario: number, idProyecto: number): Observable<any> {
    if (!idUsuario || !idProyecto) {
      return throwError(() => this.sharedService.crearError(
        'INVALID_PARAM',
        'IDs inválidos',
        'Se requieren IDs válidos de usuario y proyecto'
      ));
    }

    const params = new HttpParams()
      .set('idUsuario', String(idUsuario))
      .set('idProyecto', String(idProyecto));

    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/proyectos/asignar`, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).pipe(
        catchError(error => this.sharedService.manejarErrorHttp(error, 'Asignar usuario a proyecto'))
      ).subscribe({
        next: (resp) => {
          observer.next({ success: true, mensaje: 'Usuario asignado exitosamente', data: resp });
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
   * Asocia una incidencia a un proyecto (método futuro)
   * 
   * Actualmente las incidencias se asocian por el campo 'ubicacion'
   * Este método permite una asociación explícita futura.
   * 
   * @param idIncidencia - ID numérico de la incidencia
   * @param idProyecto - ID del proyecto
   * @returns Observable con el resultado
   */
  asociarIncidenciaAProyecto(idIncidencia: number, idProyecto: number): Observable<any> {
    // Implementación futura cuando el backend soporte este endpoint
    console.warn('⚠️ Endpoint de asociación de incidencia no disponible aún');
    return new Observable(observer => {
      observer.next({ 
        success: false, 
        mensaje: 'Funcionalidad en desarrollo. Use el campo ubicacion en la incidencia.' 
      });
      observer.complete();
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: ESTADÍSTICAS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Obtiene el total de proyectos
   * 
   * @returns Número total de proyectos
   */
  obtenerTotalProyectos(): number {
    return this.proyectosData.length;
  }

  /**
   * Obtiene conteo de proyectos por estado
   * 
   * @returns Objeto con estados y sus conteos
   */
  obtenerConteosPorEstado(): { [estado: string]: number } {
    const conteos: { [estado: string]: number } = {};
    this.proyectosData.forEach(p => {
      conteos[p.estado] = (conteos[p.estado] || 0) + 1;
    });
    return conteos;
  }

  /**
   * Obtiene estadísticas de un proyecto específico
   * 
   * Nota: Requiere integración con UsersService e IncidentsService
   * para datos completos.
   * 
   * @param idProyecto - ID del proyecto
   * @returns Estadísticas del proyecto
   */
  obtenerEstadisticasProyecto(idProyecto: number): EstadisticasProyecto {
    // Implementación básica - requiere integración con otros servicios
    return {
      usuariosAsignados: 0,
      incidenciasAsociadas: 0,
      incidenciasAbiertas: 0,
      incidenciasResueltas: 0
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: UTILIDADES
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Limpia todos los datos locales
   * ⚠️ Uso con precaución
   */
  limpiarDatosLocales(): void {
    this.proyectosData = [];
    this.proyectosSubject.next([]);
  }
}
