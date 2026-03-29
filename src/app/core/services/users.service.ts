/**
 * users.service.ts
 *
 * Servicio de usuarios: gestiona usuarios conectando al backend Java REST API.
 * Endpoints: GET/POST /api/usuarios, DELETE /api/usuarios/{id}
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl;

  private usuariosData: Usuario[] = [];
  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  public usuarios$: Observable<Usuario[]> = this.usuariosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarDesdeBackend();
  }

  /** Carga usuarios desde el backend y actualiza el Subject */
  cargarDesdeBackend(): void {
    this.http.get<any[]>(`${this.apiUrl}/usuarios`).subscribe({
      next: (data) => {
        this.usuariosData = data.map(u => this.mapearUsuario(u));
        this.usuariosSubject.next([...this.usuariosData]);
      },
      error: () => {
        // Backend no disponible: mantener datos vacíos
        this.usuariosSubject.next([]);
      }
    });
  }

  private mapearUsuario(u: any): Usuario {
    const nombreCompleto: string = u.nombre || '';
    const espacio = nombreCompleto.indexOf(' ');
    const nombre = espacio > 0 ? nombreCompleto.substring(0, espacio) : nombreCompleto;
    const apellido = espacio > 0 ? nombreCompleto.substring(espacio + 1) : '';
    return {
      id: String(u.id),
      nombre,
      apellido,
      correo: u.correo || '',
      celular: u.telefono || '',
      area: u.departamento || '',
      jefeDirecto: '',
      correoJefe: ''
    };
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.usuarios$;
  }

  obtenerUsuarioPorId(id: string): Usuario | undefined {
    return this.usuariosData.find(usr => usr.id === id);
  }

  obtenerUsuariosPorArea(area: string): Usuario[] {
    return this.usuariosData.filter(usr => usr.area === area);
  }

  buscarUsuarios(termino: string): Usuario[] {
    const t = termino.toLowerCase();
    return this.usuariosData.filter(usr =>
      usr.nombre.toLowerCase().includes(t) ||
      usr.apellido.toLowerCase().includes(t) ||
      usr.correo.toLowerCase().includes(t)
    );
  }

  obtenerConteosPorArea(): { [area: string]: number } {
    const conteos: { [area: string]: number } = {};
    this.usuariosData.forEach(usr => {
      conteos[usr.area] = (conteos[usr.area] || 0) + 1;
    });
    return conteos;
  }

  /** Crea un usuario en el backend. nuevoUsuario incluye campos del backend */
  agregarUsuarioBackend(datos: {
    nombre: string; correo: string; password: string;
    rol: string; telefono: string; departamento: string; idProyecto?: number;
  }): Observable<any> {
    let params = new HttpParams()
      .set('nombre', datos.nombre)
      .set('correo', datos.correo)
      .set('password', datos.password)
      .set('rol', datos.rol)
      .set('telefono', datos.telefono)
      .set('departamento', datos.departamento);
    if (datos.idProyecto) params = params.set('idProyecto', String(datos.idProyecto));

    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/usuarios`, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).subscribe({
        next: (resp) => {
          if (resp?.success) {
            this.cargarDesdeBackend();
            observer.next(resp);
          } else {
            observer.error(resp?.error || 'Error al guardar');
          }
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  /** Elimina usuario por lógica en el backend */
  eliminarUsuarioBackend(id: string): Observable<any> {
    return new Observable(observer => {
      this.http.delete<any>(`${this.apiUrl}/usuarios/${id}`).subscribe({
        next: (resp) => {
          if (resp?.success) {
            this.usuariosData = this.usuariosData.filter(u => u.id !== id);
            this.usuariosSubject.next([...this.usuariosData]);
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

  /** Mantiene compatibilidad con código legacy que llama agregarUsuario/eliminarUsuario */
  agregarUsuario(usuario: Usuario): void {
    this.usuariosData.push(usuario);
    this.usuariosSubject.next([...this.usuariosData]);
  }

  eliminarUsuario(id: string): void {
    this.usuariosData = this.usuariosData.filter(usr => usr.id !== id);
    this.usuariosSubject.next([...this.usuariosData]);
  }

  actualizarUsuario(usuarioActualizado: Usuario): void {
    const index = this.usuariosData.findIndex(usr => usr.id === usuarioActualizado.id);
    if (index !== -1) {
      this.usuariosData[index] = usuarioActualizado;
      this.usuariosSubject.next([...this.usuariosData]);
    }
  }
}

