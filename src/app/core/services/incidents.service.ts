/**
 * incidents.service.ts
 *
 * Servicio de incidencias: gestiona toda la lÃ³gica relacionada con incidentes.
 * Conecta con el backend Java REST API en /SWO/api/incidencias.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Incidencia } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private apiUrl = environment.apiUrl;

  // Cache en memoria para bÃºsquedas por ID y estadÃ­sticas reactivas
  private incidenciasData: Incidencia[] = [];
  private incidenciasSubject = new BehaviorSubject<Incidencia[]>([]);
  public incidencias$: Observable<Incidencia[]> = this.incidenciasSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarDesdeBackend();
  }

  /** Carga todas las incidencias desde el backend */
  cargarDesdeBackend(): void {
    this.http.get<any[]>(`${this.apiUrl}/incidencias`).subscribe({
      next: (datos) => {
        this.incidenciasData = datos.map(d => this.mapearDesdeDB(d));
        this.incidenciasSubject.next([...this.incidenciasData]);
      },
      error: () => {
        // Si falla la conexiÃ³n al backend, usar datos locales vacÃ­os
        this.incidenciasSubject.next([]);
      }
    });
  }

  /** Mapea respuesta del backend al modelo Angular */
  private mapearDesdeDB(db: any): Incidencia {
    return {
      id: 'INC-' + db.id,
      title: db.titulo || '',
      state: this.mapearEstado(db.estado),
      priority: this.mapearImpacto(db.impacto),
      assignee: 'Sin asignar',
      project: db.ubicacion || 'SWO',
      date: db.fechaCreacion || '',
      tags: [],
      comments: [],
      user: 'Usuario ' + (db.idUsuarioReporta || 1),
      userEmail: '',
      userPhones: [],
      app: 'SWO',
      reason: db.descripcion || '',
      activity: ''
    };
  }

  private mapearEstado(estado: string): 'open' | 'inprogress' | 'pending' | 'resolved' {
    switch (estado) {
      case 'Abierto':     return 'open';
      case 'En Progreso': return 'inprogress';
      case 'Pendiente':   return 'pending';
      case 'Cerrado':     return 'resolved';
      default:            return 'open';
    }
  }

  private mapearImpacto(impacto: string): 'Baja' | 'Media' | 'Alta' | 'Crítica' {
    switch (impacto) {
      case 'Bajo':    return 'Baja';
      case 'Alto':    return 'Alta';
      case 'Critico': return 'Crítica';
      case 'Medio':   return 'Media';
      default:        return 'Media';
    }
  }

  /** Devuelve el Observable de la lista reactiva */
  obtenerIncidencias(): Observable<Incidencia[]> {
    return this.incidencias$;
  }

  /** Busca una incidencia por ID en el cache local */
  obtenerIncidenciaPorId(id: string): Incidencia | undefined {
    return this.incidenciasData.find(inc => inc.id === id);
  }

  /** Crea una nueva incidencia en el backend; si falla, guarda localmente */
  crearIncidencia(datos: {
    titulo: string;
    descripcion: string;
    estado: string;
    impacto: string;
    ubicacion: string;
    idUsuarioReporta?: number;
  }): Observable<any> {
    const params = new HttpParams()
      .set('titulo', datos.titulo)
      .set('descripcion', datos.descripcion)
      .set('estado', datos.estado)
      .set('impacto', datos.impacto)
      .set('ubicacion', datos.ubicacion)
      .set('idUsuarioReporta', String(datos.idUsuarioReporta || 1));

    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/incidencias`, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).subscribe({
        next: (resp) => {
          this.cargarDesdeBackend();
          observer.next({ local: false, ...resp });
          observer.complete();
        },
        error: () => {
          // Backend no disponible (ej: GitHub Pages) — guardar en memoria
          const tmpId = 'TMP-' + Date.now();
          const nueva: any = {
            id: tmpId, titulo: datos.titulo, descripcion: datos.descripcion,
            estado: datos.estado, impacto: datos.impacto, ubicacion: datos.ubicacion,
            fechaCreacion: new Date().toISOString().split('T')[0],
            idUsuarioReporta: datos.idUsuarioReporta || 1
          };
          const incidencia = this.mapearDesdeDB(nueva);
          this.incidenciasData = [incidencia, ...this.incidenciasData];
          this.incidenciasSubject.next([...this.incidenciasData]);
          observer.next({ local: true });
          observer.complete();
        }
      });
    });
  }

  /** Actualiza incidencia en memoria (cambios de estado/prioridad locales) */
  actualizarIncidencia(incidenciaActualizada: Incidencia): void {
    const index = this.incidenciasData.findIndex(inc => inc.id === incidenciaActualizada.id);
    if (index !== -1) {
      this.incidenciasData[index] = incidenciaActualizada;
      this.incidenciasSubject.next([...this.incidenciasData]);
    }
  }

  cambiarEstado(id: string, nuevoEstado: 'open' | 'inprogress' | 'pending' | 'resolved'): void {
    const incidencia = this.incidenciasData.find(inc => inc.id === id);
    if (incidencia) {
      incidencia.state = nuevoEstado;
      this.incidenciasSubject.next([...this.incidenciasData]);
    }
  }

  cambiarPrioridad(id: string, nuevaPrioridad: 'Baja' | 'Media' | 'Alta' | 'Crítica'): void {
    const incidencia = this.incidenciasData.find(inc => inc.id === id);
    if (incidencia) {
      incidencia.priority = nuevaPrioridad;
      this.incidenciasSubject.next([...this.incidenciasData]);
    }
  }

  asignarIncidencia(id: string, nuevoAsignado: string): void {
    const incidencia = this.incidenciasData.find(inc => inc.id === id);
    if (incidencia) {
      incidencia.assignee = nuevoAsignado;
      this.incidenciasSubject.next([...this.incidenciasData]);
    }
  }

  agregarComentario(id: string, autor: string, texto: string): void {
    const incidencia = this.incidenciasData.find(inc => inc.id === id);
    if (incidencia) {
      incidencia.comments.push({
        author: autor,
        date: new Date().toLocaleString(),
        text: texto
      });
      this.incidenciasSubject.next([...this.incidenciasData]);
    }
  }

  obtenerEstadísticas(): { abiertos: number; enProgreso: number; pendientes: number; resueltos: number } {
    return {
      abiertos:    this.incidenciasData.filter(i => i.state === 'open').length,
      enProgreso:  this.incidenciasData.filter(i => i.state === 'inprogress').length,
      pendientes:  this.incidenciasData.filter(i => i.state === 'pending').length,
      resueltos:   this.incidenciasData.filter(i => i.state === 'resolved').length
    };
  }
}

