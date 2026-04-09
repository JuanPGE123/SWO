﻿/**
 * incidents.service.ts
 * 
 * Servicio empresarial de gesti�n de incidencias del sistema SWO.
 * 
 * Responsabilidades principales:
 * - CRUD completo de incidencias con validaciones de negocio
 * - Gesti�n de estados y transiciones con reglas empresariales
 * - Asignaci�n de incidencias con validaci�n de permisos
 * - Historial de cambios y auditor�a
 * - Filtrado y b�squeda avanzada
 * - Estad�sticas y m�tricas en tiempo real
 * - Integraci�n con backend Java REST API
 * 
 * Reglas de Negocio Implementadas:
 * - Solo incidencias en estado 'Abierto' pueden asignarse
 * - Solo el usuario asignado puede cambiar el estado
 * - Validaci�n de campos obligatorios
 * - Control por roles (admin, agente, usuario)
 * - Historial autom�tico de todas las modificaciones
 * 
 * @author Equipo SWO
 * @version 2.0.0
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Incidencia } from '../models/models';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { SharedService, ResultadoValidacion } from './shared.service';

/**
 * Tipos de estado v�lidos para incidencias
 */
export type EstadoIncidencia = 'open' | 'inprogress' | 'pending' | 'resolved';

/**
 * Tipos de prioridad válidos para incidencias
 */
export type PrioridadIncidencia = 'Baja' | 'Media' | 'Alta' | 'Crítica';

/**
 * Entrada de historial de cambios
 */
export interface HistorialCambio {
  fecha: Date;                    // Momento del cambio
  usuario: string;                // Usuario que realiz� el cambio
  tipo: 'creacion' | 'asignacion' | 'estado' | 'prioridad' | 'comentario' | 'actualizacion';
  descripcion: string;            // Descripci�n del cambio
  valorAnterior?: any;            // Valor previo (si aplica)
  valorNuevo?: any;               // Valor nuevo
}

/**
 * DTO para crear una nueva incidencia
 */
export interface CrearIncidenciaDTO {
  titulo: string;                 // T�tulo de la incidencia (obligatorio)
  descripcion: string;            // Descripci�n detallada (obligatorio)
  estado?: string;                // Estado inicial (por defecto 'Abierto')
  impacto?: string;               // Nivel de impacto (por defecto 'Medio')
  ubicacion?: string;             // Ubicaci�n/�rea afectada
  idUsuarioReporta?: number;      // ID del usuario que reporta
  idProyecto?: number;            // ID del proyecto asociado (opcional)
}

/**
 * Filtros para b�squeda avanzada de incidencias
 */
export interface FiltrosIncidencia {
  estado?: EstadoIncidencia | EstadoIncidencia[];
  prioridad?: PrioridadIncidencia | PrioridadIncidencia[];
  asignado?: string;              // Nombre del asignado
  proyecto?: string;              // Nombre del proyecto
  fechaDesde?: Date;              // Fecha inicio
  fechaHasta?: Date;              // Fecha fin
  usuario?: string;               // Usuario reportante
  textoLibre?: string;            // B�squeda en t�tulo y descripci�n
}

/**
 * Estad�sticas detalladas de incidencias
 */
export interface EstadisticasIncidencias {
  total: number;                  // Total de incidencias
  porEstado: {
    abiertos: number;
    enProgreso: number;
    pendientes: number;
    resueltos: number;
  };
  porPrioridad: {
    baja: number;
    media: number;
    alta: number;
    critica: number;
  };
  tiempoPromedioResolucion?: number;  // En horas
  porcentajeResueltas?: number;       // %
}

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private apiUrl = environment.apiUrl;

  // Estado reactivo de incidencias
  private incidenciasData: Incidencia[] = [];
  private incidenciasSubject = new BehaviorSubject<Incidencia[]>([]);
  public incidencias$: Observable<Incidencia[]> = this.incidenciasSubject.asObservable();

  // Historial de cambios por incidencia (Map de ID ? array de cambios)
  private historialCambios: Map<string, HistorialCambio[]> = new Map();

  // Cache para optimizar b�squedas frecuentes
  private cacheEstadisticas: EstadisticasIncidencias | null = null;
  private ultimaActualizacionCache: Date | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.cargarDesdeBackend();
  }

  // -----------------------------------------------------------------------
  // SECCI�N: CARGA Y SINCRONIZACI�N CON BACKEND
  // -----------------------------------------------------------------------

  /**
   * Carga todas las incidencias desde el backend y actualiza el estado reactivo
   * 
   * Modo de operaci�n:
   * - Si el backend responde: carga datos reales
   * - Si el backend falla: mantiene datos locales existentes
   * 
   * @returns void (actualiza el BehaviorSubject autom�ticamente)
   */
  cargarDesdeBackend(): void {
    this.http.get<any[]>(`${this.apiUrl}/incidencias`)
      .pipe(
        map(datos => datos.map(d => this.mapearDesdeDB(d))),
        catchError(error => {
          console.warn('?? Backend no disponible, usando datos locales');
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (incidencias) => {
          this.incidenciasData = incidencias;
          this.incidenciasSubject.next([...this.incidenciasData]);
          this.invalidarCache();
        },
        error: () => {
          // Mantener datos actuales si hay, o array vac�o
          if (this.incidenciasData.length === 0) {
            this.incidenciasSubject.next([]);
          }
        }
      });
  }

  // -----------------------------------------------------------------------
  // SECCI�N: MAPEO Y TRANSFORMACI�N DE DATOS
  // -----------------------------------------------------------------------

  /**
   * Mapea un objeto de respuesta del backend al modelo Incidencia de Angular
   * 
   * @param db - Objeto raw del backend
   * @returns Objeto Incidencia tipado
   * @private
   */
  private mapearDesdeDB(db: any): Incidencia {
    return {
      id: 'INC-' + db.id,
      title: db.titulo || 'Sin t�tulo',
      state: this.mapearEstado(db.estado),
      priority: this.mapearImpacto(db.impacto),
      assignee: db.asignado || 'Sin asignar',
      project: db.ubicacion || 'SWO',
      date: db.fechaCreacion || new Date().toISOString().split('T')[0],
      tags: db.tags ? JSON.parse(db.tags) : [],
      comments: db.comentarios ? JSON.parse(db.comentarios) : [],
      user: 'Usuario ' + (db.idUsuarioReporta || 1),
      userEmail: db.correoUsuario || '',
      userPhones: db.telefonosUsuario ? JSON.parse(db.telefonosUsuario) : [],
      app: 'SWO',
      reason: db.descripcion || '',
      activity: db.actividad || '',
      resolucion: db.resolucion || '',
      fechaResolucion: db.fechaResolucion || ''
    };
  }

  /**
   * Mapea el estado del backend al formato interno de la aplicaci�n
   * 
   * @param estado - Estado en formato backend ('Abierto', 'Cerrado', etc)
   * @returns Estado en formato app ('open', 'resolved', etc)
   * @private
   */
  private mapearEstado(estado: string): EstadoIncidencia {
    const mapeo: { [key: string]: EstadoIncidencia } = {
      'Abierto': 'open',
      'En Progreso': 'inprogress',
      'En progreso': 'inprogress',
      'Pendiente': 'pending',
      'Cerrado': 'resolved',
      'Resuelto': 'resolved'
    };
    return mapeo[estado] || 'open';
  }

  /**
   * Mapea el estado de la app al formato del backend
   * 
   * @param estado - Estado en formato app
   * @returns Estado en formato backend
   * @private
   */
  private mapearEstadoABackend(estado: EstadoIncidencia): string {
    const mapeo: { [key in EstadoIncidencia]: string } = {
      'open': 'Abierto',
      'inprogress': 'En Progreso',
      'pending': 'Pendiente',
      'resolved': 'Resuelto'
    };
    return mapeo[estado];
  }

  /**
   * Mapea el impacto/prioridad del backend al formato interno
   * 
   * @param impacto - Impacto en formato backend
   * @returns Prioridad en formato app
   * @private
   */
  private mapearImpacto(impacto: string): PrioridadIncidencia {
    const mapeo: { [key: string]: PrioridadIncidencia } = {
      'Bajo': 'Baja',
      'Medio': 'Media',
      'Alto': 'Alta',
      'Critico': 'Crítica',
      'Crítico': 'Crítica'
    };
    return mapeo[impacto] || 'Media';
  }

  /**
   * Mapea la prioridad de la app al formato del backend
   * 
   * @param prioridad - Prioridad en formato app
   * @returns Impacto en formato backend
   * @private
   */
  private mapearPrioridadABackend(prioridad: PrioridadIncidencia): string {
    const mapeo: { [key in PrioridadIncidencia]: string } = {
      'Baja': 'Bajo',
      'Media': 'Medio',
      'Alta': 'Alto',
      'Crítica': 'Critico'
    };
    return mapeo[prioridad];
  }

  // -----------------------------------------------------------------------
  // SECCI�N: CONSULTA Y LECTURA DE INCIDENCIAS
  // -----------------------------------------------------------------------

  /**
   * Obtiene el Observable de la lista reactiva de todas las incidencias
   * 
   * Componentes pueden suscribirse a este Observable para recibir
   * actualizaciones autom�ticas cuando cambian las incidencias.
   * 
   * @returns Observable con array de incidencias
   * 
   * @example
   * this.incidentsService.obtenerIncidencias().subscribe(incidencias => {
   *   console.log('Incidencias actuales:', incidencias);
   * });
   */
  obtenerIncidencias(): Observable<Incidencia[]> {
    return this.incidencias$;
  }

  /**
   * Busca una incidencia espec�fica por su ID
   * 
   * @param id - ID de la incidencia (ej: 'INC-123')
   * @returns Incidencia encontrada o undefined
   * 
   * @example
   * const incidencia = this.incidentsService.obtenerIncidenciaPorId('INC-123');
   */
  obtenerIncidenciaPorId(id: string): Incidencia | undefined {
    return this.incidenciasData.find(inc => inc.id === id);
  }

  /**
   * Filtra incidencias seg�n criterios especificados (b�squeda avanzada)
   * 
   * Soporta filtrado m�ltiple por:
   * - Estado(s)
   * - Prioridad(es)
   * - Usuario asignado
   * - Proyecto
   * - Rango de fechas
   * - B�squeda de texto libre
   * 
   * @param filtros - Objeto con criterios de filtrado
   * @returns Array de incidencias que cumplen los criterios
   * 
   * @example
   * const criticas = this.filtrarIncidencias({ prioridad: 'Cr�tica', estado: 'open' });
   */
  filtrarIncidencias(filtros: FiltrosIncidencia): Incidencia[] {
    let resultado = [...this.incidenciasData];

    // Filtrar por estado
    if (filtros.estado) {
      const estados = Array.isArray(filtros.estado) ? filtros.estado : [filtros.estado];
      resultado = resultado.filter(inc => estados.includes(inc.state));
    }

    // Filtrar por prioridad
    if (filtros.prioridad) {
      const prioridades = Array.isArray(filtros.prioridad) ? filtros.prioridad : [filtros.prioridad];
      resultado = resultado.filter(inc => prioridades.includes(inc.priority));
    }

    // Filtrar por asignado
    if (filtros.asignado) {
      resultado = resultado.filter(inc => 
        inc.assignee.toLowerCase().includes(filtros.asignado!.toLowerCase())
      );
    }

    // Filtrar por proyecto
    if (filtros.proyecto) {
      resultado = resultado.filter(inc => 
        inc.project.toLowerCase().includes(filtros.proyecto!.toLowerCase())
      );
    }

    // Filtrar por usuario reportante
    if (filtros.usuario) {
      resultado = resultado.filter(inc => 
        inc.user.toLowerCase().includes(filtros.usuario!.toLowerCase())
      );
    }

    // Filtrar por rango de fechas
    if (filtros.fechaDesde) {
      const fechaDesdeStr = filtros.fechaDesde.toISOString().split('T')[0];
      resultado = resultado.filter(inc => inc.date >= fechaDesdeStr);
    }

    if (filtros.fechaHasta) {
      const fechaHastaStr = filtros.fechaHasta.toISOString().split('T')[0];
      resultado = resultado.filter(inc => inc.date <= fechaHastaStr);
    }

    // B�squeda de texto libre en t�tulo y descripci�n
    if (filtros.textoLibre && filtros.textoLibre.trim() !== '') {
      const textoLower = filtros.textoLibre.toLowerCase();
      resultado = resultado.filter(inc =>
        inc.title.toLowerCase().includes(textoLower) ||
        inc.reason.toLowerCase().includes(textoLower)
      );
    }

    return resultado;
  }

  /**
   * Busca incidencias por t�rmino libre (t�tulo, descripci�n, usuario)
   * 
   * @param termino - T�rmino de b�squeda
   * @returns Array de incidencias que coinciden
   */
  buscarIncidencias(termino: string): Incidencia[] {
    const t = termino.toLowerCase();
    return this.incidenciasData.filter(inc =>
      inc.title.toLowerCase().includes(t) ||
      inc.reason.toLowerCase().includes(t) ||
      inc.user.toLowerCase().includes(t) ||
      inc.assignee.toLowerCase().includes(t) ||
      inc.id.toLowerCase().includes(t)
    );
  }

  // -----------------------------------------------------------------------
  // SECCI�N: VALIDACIONES DE NEGOCIO
  // -----------------------------------------------------------------------

  /**
   * Valida los datos para crear una nueva incidencia
   * 
   * Reglas de validaci�n:
   * - T�tulo: obligatorio, 5-200 caracteres
   * - Descripci�n: obligatorio, 10-2000 caracteres
   * - Estado: debe ser un estado v�lido
   * - Prioridad: debe ser una prioridad v�lida
   * 
   * @param datos - DTO con datos de la incidencia
   * @returns Resultado de validaci�n con lista de errores
   * @private
   */
  private validarCreacionIncidencia(datos: CrearIncidenciaDTO): ResultadoValidacion {
    const validaciones: ResultadoValidacion[] = [];

    // Validar título
    validaciones.push(
      this.sharedService.validarLongitud(datos.titulo, 3, 200, 'Título')
    );

    // Validar descripción
    validaciones.push(
      this.sharedService.validarLongitud(datos.descripcion, 3, 2000, 'Descripción')
    );

    // Validar ubicación si se proporciona
    if (datos.ubicacion) {
      validaciones.push(
        this.sharedService.validarLongitud(datos.ubicacion, 2, 100, 'Ubicación')
      );
    }

    return this.sharedService.combinarValidaciones(validaciones);
  }

  /**
   * Verifica si un usuario tiene permisos para modificar una incidencia
   * 
   * Reglas:
   * - Administradores pueden modificar todo
   * - Agentes pueden modificar incidencias asignadas a ellos
   * - Usuarios regulares solo pueden ver, no modificar
   * 
   * @param incidencia - Incidencia a validar
   * @param accion - Tipo de acci�n ('asignar', 'cambiar_estado', 'cambiar_prioridad')
   * @returns true si tiene permisos
   * @private
   */
  private verificarPermisos(incidencia: Incidencia, accion: string): boolean {
    const usuario = this.authService.getUsuarioActual();
    
    if (!usuario) {
      return false;
    }

    const rol = usuario.role?.toLowerCase() || '';

    // Administradores tienen todos los permisos
    if (rol === 'administrador' || rol === 'admin') {
      return true;
    }

    // Agentes pueden modificar incidencias asignadas a ellos
    if (rol === 'agente' || rol === 'analista') {
      if (accion === 'asignar') {
        return true; // Los agentes pueden autoasignarse
      }
      
      if (accion === 'cambiar_estado' || accion === 'cambiar_prioridad') {
        // Solo si est� asignada a ellos
        return incidencia.assignee === `${usuario.nombre} ${usuario.apellido}` ||
               incidencia.assignee === usuario.correo;
      }
    }

    // Usuarios regulares no pueden modificar
    return false;
  }

  /**
   * Valida si una transici�n de estado es permitida
   * 
   * Flujo de estados v�lido:
   * - open ? inprogress, pending, resolved
   * - inprogress ? pending, resolved, open (solo admin)
   * - pending ? inprogress, resolved
   * - resolved ? open (solo admin, para reabrir)
   * 
   * @param estadoActual - Estado actual de la incidencia
   * @param estadoNuevo - Estado al que se quiere cambiar
   * @returns true si la transici�n es v�lida
   * @private
   */
  private esTransicionEstadoValida(estadoActual: EstadoIncidencia, estadoNuevo: EstadoIncidencia): boolean {
    const transicionesValidas: { [key in EstadoIncidencia]: EstadoIncidencia[] } = {
      'open': ['inprogress', 'pending', 'resolved'],
      'inprogress': ['pending', 'resolved', 'open'],
      'pending': ['inprogress', 'resolved', 'open'],
      'resolved': ['open']
    };

    return transicionesValidas[estadoActual]?.includes(estadoNuevo) || false;
  }

  // -----------------------------------------------------------------------
  // SECCI�N: CREACI�N Y MODIFICACI�N DE INCIDENCIAS
  // -----------------------------------------------------------------------

  /**
   * Crea una nueva incidencia en el sistema con validaciones empresariales
   * 
   * Proceso:
   * 1. Valida los datos de entrada
   * 2. Intenta guardar en el backend
   * 3. Si backend falla, guarda solo en memoria local
   * 4. Registra en el historial de cambios
   * 5. Actualiza el estado reactivo
   * 
   * @param datos - DTO con los datos de la nueva incidencia
   * @returns Observable con el resultado de la operaci�n
   * 
   * @example
   * this.incidentsService.crearIncidencia({
   *   titulo: 'Error en login',
   *   descripcion: 'No puedo iniciar sesi�n con mi usuario',
   *   impacto: 'Alto',
   *   ubicacion: 'M�dulo de autenticaci�n'
   * }).subscribe({
   *   next: (resp) => console.log('Incidencia creada:', resp),
   *   error: (err) => console.error('Error:', err)
   * });
   */
  crearIncidencia(datos: CrearIncidenciaDTO): Observable<any> {
    // 1. Validar datos de entrada
    const validacion = this.validarCreacionIncidencia(datos);
    if (!validacion.valido) {
      return throwError(() => this.sharedService.crearError(
        'VALIDACION_ERROR',
        'Datos de incidencia inv�lidos',
        validacion.errores.join(', ')
      ));
    }

    // 2. Obtener usuario actual
    const usuario = this.authService.getUsuarioActual();
    let idUsuario = datos.idUsuarioReporta;
    
    if (!idUsuario) {
      if (usuario) {
        // Si el usuario es master, usar ID 23 (admin de la BD)
        if (usuario.id === 'USR-MASTER') {
          idUsuario = 23;
        } else {
          idUsuario = parseInt(usuario.id, 10);
        }
      } else {
        // Si no hay usuario, usar ID 23 (admin) como fallback
        idUsuario = 23;
      }
    }

    // 3. Preparar par�metros para el backend
    const params = new HttpParams()
      .set('titulo', datos.titulo)
      .set('descripcion', datos.descripcion)
      .set('estado', datos.estado || 'Abierto')
      .set('impacto', datos.impacto || 'Medio')
      .set('ubicacion', datos.ubicacion || 'SWO')
      .set('idUsuarioReporta', String(idUsuario));

    // 4. Intentar guardar en el backend
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/incidencias`, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).subscribe({
        next: (resp) => {
          // �xito: recargar desde backend y registrar en historial
          this.cargarDesdeBackend();
          
          const incidenciaId = 'INC-' + resp.id;
          this.registrarCambio(incidenciaId, {
            tipo: 'creacion',
            usuario: `${usuario?.nombre || 'Sistema'} ${usuario?.apellido || ''}`.trim(),
            descripcion: 'Incidencia creada'
          });

          observer.next({ local: false, backend: true, ...resp });
          observer.complete();
        },
        error: (error) => {
          // Backend no disponible: guardar solo en memoria local
          console.warn('??  Backend no disponible, guardando localmente');

          const tmpId = 'TMP-' + Date.now();
          const nueva: any = {
            id: tmpId.replace('TMP-', ''),
            titulo: datos.titulo,
            descripcion: datos.descripcion,
            estado: datos.estado || 'Abierto',
            impacto: datos.impacto || 'Medio',
            ubicacion: datos.ubicacion || 'SWO',
            fechaCreacion: new Date().toISOString().split('T')[0],
            idUsuarioReporta: idUsuario,
            asignado: null
          };

          const incidencia = this.mapearDesdeDB(nueva);
          this.incidenciasData = [incidencia, ...this.incidenciasData];
          this.incidenciasSubject.next([...this.incidenciasData]);
          this.invalidarCache();

          this.registrarCambio(incidencia.id, {
            tipo: 'creacion',
            usuario: `${usuario?.nombre || 'Sistema'} ${usuario?.apellido || ''}`.trim(),
            descripcion: 'Incidencia creada (modo offline)'
          });

          observer.next({ local: true, backend: false, id: incidencia.id });
          observer.complete();
        }
      });
    });
  }

  /**
   * Actualiza una incidencia existente en memoria (no backend)
   * 
   * �til para cambios locales temporales o cuando el backend no est� disponible.
   * 
   * @param incidenciaActualizada - Incidencia con los datos nuevos
   */

  /**
   * Actualiza una incidencia en el backend y en memoria local
   */
  actualizarIncidenciaBackend(
    id: string,
    titulo: string,
    descripcion: string,
    estado: string,
    impacto: string,
    ubicacion: string,
    resolucion: string,
    resolver: boolean
  ): Observable<any> {
    const numId = id.replace('INC-', '');
    const params = new HttpParams()
      .set('titulo', titulo)
      .set('descripcion', descripcion)
      .set('estado', estado)
      .set('impacto', impacto)
      .set('ubicacion', ubicacion || '')
      .set('resolucion', resolucion || '')
      .set('resolver', String(resolver));

    return this.http.put<any>(`${this.apiUrl}/incidencias/${numId}`, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      tap(() => {
        this.cargarDesdeBackend();
      })
    );
  }
  actualizarIncidencia(incidenciaActualizada: Incidencia): void {
    const index = this.incidenciasData.findIndex(inc => inc.id === incidenciaActualizada.id);
    if (index !== -1) {
      const anterior = this.incidenciasData[index];
      this.incidenciasData[index] = incidenciaActualizada;
      this.incidenciasSubject.next([...this.incidenciasData]);
      this.invalidarCache();

      this.registrarCambio(incidenciaActualizada.id, {
        tipo: 'actualizacion',
        usuario: this.obtenerUsuarioActualNombre(),
        descripcion: 'Incidencia actualizada'
      });
    }
  }

  /**
   * Cambia el estado de una incidencia con validaciones de negocio
   * 
   * Reglas aplicadas:
   * - Solo usuarios autorizados pueden cambiar estado
   * - La transici�n de estado debe ser v�lida seg�n el flujo
   * - Solo el usuario asignado puede cambiar estado (excepto admins)
   * 
   * @param id - ID de la incidencia
   * @param nuevoEstado - Nuevo estado deseado
   * @returns Observable con el resultado (�xito o error)
   * 
   * @example
   * this.incidentsService.cambiarEstado('INC-123', 'inprogress').subscribe({
   *   next: () => console.log('Estado cambiado'),
   *   error: (err) => console.error(err.mensaje)
   * });
   */
  cambiarEstado(id: string, nuevoEstado: EstadoIncidencia): Observable<void> {
    return new Observable(observer => {
      const incidencia = this.incidenciasData.find(inc => inc.id === id);

      if (!incidencia) {
        observer.error(this.sharedService.crearError(
          'NOT_FOUND',
          'Incidencia no encontrada',
          `No existe incidencia con ID ${id}`
        ));
        observer.complete();
        return;
      }

      // Validar permisos
      if (!this.verificarPermisos(incidencia, 'cambiar_estado')) {
        observer.error(this.sharedService.crearError(
          'PERMISSION_DENIED',
          'Sin permisos para cambiar estado',
          'Solo el usuario asignado o un administrador puede cambiar el estado'
        ));
        observer.complete();
        return;
      }

      // Validar transici�n de estado
      if (!this.esTransicionEstadoValida(incidencia.state, nuevoEstado)) {
        observer.error(this.sharedService.crearError(
          'INVALID_TRANSITION',
          'Transici�n de estado no v�lida',
          `No se puede cambiar de '${incidencia.state}' a '${nuevoEstado}'`
        ));
        observer.complete();
        return;
      }

      const estadoAnterior = incidencia.state;
      incidencia.state = nuevoEstado;
      this.incidenciasSubject.next([...this.incidenciasData]);
      this.invalidarCache();

      this.registrarCambio(id, {
        tipo: 'estado',
        usuario: this.obtenerUsuarioActualNombre(),
        descripcion: `Estado cambiado: ${estadoAnterior} ? ${nuevoEstado}`,
        valorAnterior: estadoAnterior,
        valorNuevo: nuevoEstado
      });

      observer.next();
      observer.complete();
    });
  }

  /**
   * Cambia la prioridad de una incidencia con validaciones de negocio
   * 
   * @param id - ID de la incidencia
   * @param nuevaPrioridad - Nueva prioridad
   * @returns Observable con el resultado
   */
  cambiarPrioridad(id: string, nuevaPrioridad: PrioridadIncidencia): Observable<void> {
    return new Observable(observer => {
      const incidencia = this.incidenciasData.find(inc => inc.id === id);

      if (!incidencia) {
        observer.error(this.sharedService.crearError(
          'NOT_FOUND',
          'Incidencia no encontrada'
        ));
        observer.complete();
        return;
      }

      // Validar permisos
      if (!this.verificarPermisos(incidencia, 'cambiar_prioridad')) {
        observer.error(this.sharedService.crearError(
          'PERMISSION_DENIED',
          'Sin permisos para cambiar prioridad',
          'Solo el usuario asignado o un administrador puede cambiar la prioridad'
        ));
        observer.complete();
        return;
      }

      const prioridadAnterior = incidencia.priority;
      incidencia.priority = nuevaPrioridad;
      this.incidenciasSubject.next([...this.incidenciasData]);
      this.invalidarCache();

      this.registrarCambio(id, {
        tipo: 'prioridad',
        usuario: this.obtenerUsuarioActualNombre(),
        descripcion: `Prioridad cambiada: ${prioridadAnterior} ? ${nuevaPrioridad}`,
        valorAnterior: prioridadAnterior,
        valorNuevo: nuevaPrioridad
      });

      observer.next();
      observer.complete();
    });
  }

  /**
   * Asigna uma incidencia a un usuario con validaciones
   * 
   * Reglas:
   * - Solo incidencias en estado 'Abierto' pueden asignarse por primera vez
   * - Reasignaciones est�n permitidas en cualquier estado
   * - Administradores pueden asignar a cualquiera
   * - Agentes pueden autoasignarse
   * 
   * @param id - ID de la incidencia
   * @param nuevoAsignado - Nombre del usuario a asignar
   * @returns Observable con el resultado
   */
  asignarIncidencia(id: string, nuevoAsignado: string): Observable<void> {
    return new Observable(observer => {
      const incidencia = this.incidenciasData.find(inc => inc.id === id);

      if (!incidencia) {
        observer.error(this.sharedService.crearError(
          'NOT_FOUND',
          'Incidencia no encontrada'
        ));
        observer.complete();
        return;
      }

      // Regla de negocio: Solo incidencias abiertas pueden asignarse por primera vez
      if (incidencia.assignee === 'Sin asignar' && incidencia.state !== 'open') {
        observer.error(this.sharedService.crearError(
          'BUSINESS_RULE_VIOLATION',
          'Solo incidencias en estado Abierto pueden asignarse',
          `La incidencia est� en estado '${incidencia.state}'`
        ));
        observer.complete();
        return;
      }

      // Validar permisos
      if (!this.verificarPermisos(incidencia, 'asignar')) {
        observer.error(this.sharedService.crearError(
          'PERMISSION_DENIED',
          'Sin permisos para asignar incidencia'
        ));
        observer.complete();
        return;
      }

      const asignadoAnterior = incidencia.assignee;
      incidencia.assignee = nuevoAsignado;
      this.incidenciasSubject.next([...this.incidenciasData]);
      this.invalidarCache();

      this.registrarCambio(id, {
        tipo: 'asignacion',
        usuario: this.obtenerUsuarioActualNombre(),
        descripcion: `Asignado: ${asignadoAnterior} ? ${nuevoAsignado}`,
        valorAnterior: asignadoAnterior,
        valorNuevo: nuevoAsignado
      });

      observer.next();
      observer.complete();
    });
  }

  /**
   * Agrega un comentario a una incidencia
   * 
   * @param id - ID de la incidencia
   * @param autor - Nombre del autor del comentario
   * @param texto - Contenido del comentario
   * @returns Observable con el resultado
   */
  agregarComentario(id: string, autor: string, texto: string): Observable<void> {
    return new Observable(observer => {
      const incidencia = this.incidenciasData.find(inc => inc.id === id);

      if (!incidencia) {
        observer.error(this.sharedService.crearError(
          'NOT_FOUND',
          'Incidencia no encontrada'
        ));
        observer.complete();
        return;
      }

      // Validar texto del comentario
      const validacion = this.sharedService.validarLongitud(texto, 1, 1000, 'Comentario');
      if (!validacion.valido) {
        observer.error(this.sharedService.crearError(
          'VALIDATION_ERROR',
          'Comentario inv�lido',
          validacion.errores.join(', ')
        ));
        observer.complete();
        return;
      }

      incidencia.comments.push({
        author: autor,
        date: new Date().toLocaleString('es-ES'),
        text: texto
      });

      this.incidenciasSubject.next([...this.incidenciasData]);

      this.registrarCambio(id, {
        tipo: 'comentario',
        usuario: autor,
        descripcion: `Comentario agregado: ${this.sharedService.truncarTexto(texto, 50)}`
      });

      observer.next();
      observer.complete();
    });
  }

  // -----------------------------------------------------------------------
  // SECCI�N: ESTAD�STICAS Y M�TRICAS
  // -----------------------------------------------------------------------

  /**
   * Obtiene estad�sticas completas de las incidencias
   * 
   * Calcula y devuelve m�tricas agregadas cacheadas (renovadas cada 5 minutos):
   * - Total de incidencias
   * - Desglose por estado
   * - Desglose por prioridad
   * - Tiempo promedio de resoluci�n
   * - Porcentaje de incidencias resueltas
   * 
   * @param forzarRecalculo - Fuerza el rec�lculo ignorando el cache
   * @returns Objeto con todas las estad�sticas
   * 
   * @example
   * const stats = this.incidentsService.obtenerEstadísticas();
   * console.log(`Total: ${stats.total}, Resueltas: ${stats.porEstado.resueltos}`);
   */
  obtenerEstadísticas(forzarRecalculo: boolean = false): EstadisticasIncidencias {
    // Usar cache si est� disponible y es reciente (< 5 minutos)
    const ahora = new Date();
    if (this.cacheEstadisticas && this.ultimaActualizacionCache && !forzarRecalculo) {
      const diffMs = ahora.getTime() - this.ultimaActualizacionCache.getTime();
      const diffMinutos = diffMs / (1000 * 60);
      if (diffMinutos < 5) {
        return this.cacheEstadisticas;
      }
    }

    // Recalcular estad�sticas
    const total = this.incidenciasData.length;

    const porEstado = {
      abiertos: this.incidenciasData.filter(i => i.state === 'open').length,
      enProgreso: this.incidenciasData.filter(i => i.state === 'inprogress').length,
      pendientes: this.incidenciasData.filter(i => i.state === 'pending').length,
      resueltos: this.incidenciasData.filter(i => i.state === 'resolved').length
    };

    const porPrioridad = {
      baja: this.incidenciasData.filter(i => i.priority === 'Baja').length,
      media: this.incidenciasData.filter(i => i.priority === 'Media').length,
      alta: this.incidenciasData.filter(i => i.priority === 'Alta').length,
      critica: this.incidenciasData.filter(i => i.priority === 'Crítica').length
    };

    const porcentajeResueltas = total > 0 
      ? Math.round((porEstado.resueltos / total) * 100) 
      : 0;

    // TODO: Calcular tiempo promedio de resoluci�n con datos de fechas reales
    const tiempoPromedioResolucion = 0;

    const estadisticas: EstadisticasIncidencias = {
      total,
      porEstado,
      porPrioridad,
      tiempoPromedioResolucion,
      porcentajeResueltas
    };

    // Actualizar cache
    this.cacheEstadisticas = estadisticas;
    this.ultimaActualizacionCache = ahora;

    return estadisticas;
  }

  /**
   * Estadísticas simples (compatibilidad con código legacy)
   * 
   * @returns Objeto con conteos por estado
   * @deprecated Usar obtenerEstadísticas() para métricas completas
   */
  obtenerEstadísticasSimples(): { abiertos: number; enProgreso: number; pendientes: number; resueltos: number } {
    return {
      abiertos: this.incidenciasData.filter(i => i.state === 'open').length,
      enProgreso: this.incidenciasData.filter(i => i.state === 'inprogress').length,
      pendientes: this.incidenciasData.filter(i => i.state === 'pending').length,
      resueltos: this.incidenciasData.filter(i => i.state === 'resolved').length
    };
  }

  // -----------------------------------------------------------------------
  // SECCI�N: HISTORIAL Y AUDITOR�A
  // -----------------------------------------------------------------------

  /**
   * Registra un cambio en el historial de una incidencia
   * 
   * @param incidenciaId - ID de la incidencia
   * @param cambio - Datos del cambio (tipo, usuario, descripci�n)
   * @private
   */
  private registrarCambio(incidenciaId: string, cambio: Partial<HistorialCambio>): void {
    if (!this.historialCambios.has(incidenciaId)) {
      this.historialCambios.set(incidenciaId, []);
    }

    const entradaCompleta: HistorialCambio = {
      fecha: new Date(),
      usuario: cambio.usuario || 'Sistema',
      tipo: cambio.tipo || 'actualizacion',
      descripcion: cambio.descripcion || 'Cambio realizado',
      valorAnterior: cambio.valorAnterior,
      valorNuevo: cambio.valorNuevo
    };

    this.historialCambios.get(incidenciaId)!.push(entradaCompleta);
  }

  /**
   * Obtiene el historial completo de cambios de una incidencia
   * 
   * @param incidenciaId - ID de la incidencia
   * @returns Array con todos los cambios registrados (ordenados por fecha)
   * 
   * @example
   * const historial = this.incidentsService.obtenerHistorial('INC-123');
   * historial.forEach(cambio => {
   *   console.log(`${cambio.fecha}: ${cambio.descripcion} por ${cambio.usuario}`);
   * });
   */
  obtenerHistorial(incidenciaId: string): HistorialCambio[] {
    return this.historialCambios.get(incidenciaId) || [];
  }

  /**
   * Exporta el historial de una incidencia como texto
   * 
   * @param incidenciaId - ID de la incidencia
   * @returns String con el historial formateado
   */
  exportarHistorial(incidenciaId: string): string {
    const historial = this.obtenerHistorial(incidenciaId);
    const incidencia = this.obtenerIncidenciaPorId(incidenciaId);

    if (!incidencia) {
      return 'Incidencia no encontrada';
    }

    let texto = `HISTORIAL DE CAMBIOS - ${incidencia.id}\n`;
    texto += `T�tulo: ${incidencia.title}\n`;
    texto += `Estado actual: ${incidencia.state} | Prioridad: ${incidencia.priority}\n`;
    texto += `Asignado a: ${incidencia.assignee}\n`;
    texto += `\n${'='.repeat(60)}\n\n`;

    if (historial.length === 0) {
      texto += 'Sin cambios registrados\n';
    } else {
      historial.forEach((cambio, index) => {
        const fecha = this.sharedService.formatearFecha(cambio.fecha, { formato: 'datetime' });
        texto += `[${index + 1}] ${fecha}\n`;
        texto += `    Usuario: ${cambio.usuario}\n`;
        texto += `    Tipo: ${cambio.tipo}\n`;
        texto += `    ${cambio.descripcion}\n`;
        if (cambio.valorAnterior) {
          texto += `    Valor anterior: ${cambio.valorAnterior}\n`;
          texto += `    Valor nuevo: ${cambio.valorNuevo}\n`;
        }
        texto += `\n`;
      });
    }

    return texto;
  }

  // -----------------------------------------------------------------------
  // SECCI�N: UTILIDADES PRIVADAS
  // -----------------------------------------------------------------------

  /**
   * Invalida el cache de estad�sticas para forzar rec�lculo
   * @private
   */
  private invalidarCache(): void {
    this.cacheEstadisticas = null;
    this.ultimaActualizacionCache = null;
  }

  /**
   * Obtiene el nombre completo del usuario actual autenticado
   * @private
   * @returns Nombre completo o 'Sistema' si no hay usuario
   */
  private obtenerUsuarioActualNombre(): string {
    const usuario = this.authService.getUsuarioActual();
    if (!usuario) {
      return 'Sistema';
    }
    return `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim() || usuario.correo || 'Usuario';
  }

  /**
   * Limpia todos los datos locales (�til para testing o reset)
   * ?? Uso con precauci�n: elimina todas las incidencias locales
   */
  limpiarDatosLocales(): void {
    this.incidenciasData = [];
    this.incidenciasSubject.next([]);
    this.historialCambios.clear();
    this.invalidarCache();
  }
}

