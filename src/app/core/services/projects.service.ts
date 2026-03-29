/**
 * projects.service.ts
 * Gestiona proyectos conectando al backend Java REST API.
 * GET /api/proyectos, POST /api/proyectos, DELETE /api/proyectos/{id}
 * POST /api/proyectos/asignar
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Proyecto } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = environment.apiUrl;

  private proyectosData: Proyecto[] = [];
  private proyectosSubject = new BehaviorSubject<Proyecto[]>([]);
  public proyectos$: Observable<Proyecto[]> = this.proyectosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarDesdeBackend();
  }

  cargarDesdeBackend(): void {
    this.http.get<any[]>(`${this.apiUrl}/proyectos`).subscribe({
      next: (data) => {
        this.proyectosData = data.map(p => ({
          id: p.id,
          nombre: p.nombre || '',
          descripcion: p.descripcion || '',
          estado: p.estado || 'Activo',
          fechaCreacion: p.fechaCreacion || ''
        }));
        this.proyectosSubject.next([...this.proyectosData]);
      },
      error: () => this.proyectosSubject.next([])
    });
  }

  obtenerProyectos(): Observable<Proyecto[]> {
    return this.proyectos$;
  }

  crearProyecto(nombre: string, descripcion: string, estado: string): Observable<any> {
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('descripcion', descripcion)
      .set('estado', estado);

    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/proyectos`, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).subscribe({
        next: (resp) => {
          if (resp?.success) {
            this.cargarDesdeBackend();
            observer.next(resp);
          } else {
            observer.error(resp?.error || 'Error al crear');
          }
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  eliminarProyecto(id: number): Observable<any> {
    return new Observable(observer => {
      this.http.delete<any>(`${this.apiUrl}/proyectos/${id}`).subscribe({
        next: (resp) => {
          if (resp?.success) {
            this.proyectosData = this.proyectosData.filter(p => p.id !== id);
            this.proyectosSubject.next([...this.proyectosData]);
            observer.next(resp);
          } else {
            observer.error(resp?.error || 'Error al eliminar');
          }
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  asignarUsuario(idUsuario: number, idProyecto: number): Observable<any> {
    const params = new HttpParams()
      .set('idUsuario', String(idUsuario))
      .set('idProyecto', String(idProyecto));

    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/proyectos/asignar`, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).subscribe({
        next: (resp) => { observer.next(resp); observer.complete(); },
        error: (err) => observer.error(err)
      });
    });
  }
}
