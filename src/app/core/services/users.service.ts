/**
 * users.service.ts
 * 
 * Servicio de usuarios: gestiona la información y operaciones de usuarios.
 * - Almacena lista de usuarios
 * - Proporciona búsqueda y filtrado
 * - Emite cambios como Observables
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Datos de ejemplo de usuarios
  private usuariosData: Usuario[] = [
    {
      id: 'USR-001',
      nombre: 'Juan Pablo',
      apellido: 'Ramírez',
      correo: 'juan.ramirez@swo.com',
      celular: '+57 310 123 4567',
      area: 'TI',
      jefeDirecto: 'María García',
      correoJefe: 'maria.garcia@swo.com'
    },
    {
      id: 'USR-002',
      nombre: 'Ana María',
      apellido: 'López',
      correo: 'ana.lopez@swo.com',
      celular: '+57 320 234 5678',
      area: 'Soporte',
      jefeDirecto: 'Carlos Mendoza',
      correoJefe: 'carlos.mendoza@swo.com'
    },
    {
      id: 'USR-003',
      nombre: 'Carlos',
      apellido: 'Mendoza',
      correo: 'carlos.mendoza@swo.com',
      celular: '+57 315 345 6789',
      area: 'Soporte',
      jefeDirecto: 'María García',
      correoJefe: 'maria.garcia@swo.com'
    },
    {
      id: 'USR-004',
      nombre: 'María',
      apellido: 'García',
      correo: 'maria.garcia@swo.com',
      celular: '+57 318 456 7890',
      area: 'TI',
      jefeDirecto: 'Director General',
      correoJefe: 'director@swo.com'
    },
    {
      id: 'USR-005',
      nombre: 'Luis',
      apellido: 'Hernández',
      correo: 'luis.hernandez@swo.com',
      celular: '+57 311 567 8901',
      area: 'Desarrollo',
      jefeDirecto: 'María García',
      correoJefe: 'maria.garcia@swo.com'
    }
  ];

  // BehaviorSubject para emitir cambios en la lista de usuarios
  private usuariosSubject = new BehaviorSubject<Usuario[]>(this.usuariosData);
  public usuarios$: Observable<Usuario[]> = this.usuariosSubject.asObservable();

  constructor() {}

  /**
   * Método obtenerUsuarios: obtiene todos los usuarios
   * 
   * @returns Observable<Usuario[]> - Stream de usuarios
   */
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.usuarios$;
  }

  /**
   * Método obtenerUsuarioPorId: obtiene un usuario específico
   * 
   * @param id - ID del usuario
   * @returns Usuario | undefined - Usuario encontrado o undefined
   */
  obtenerUsuarioPorId(id: string): Usuario | undefined {
    return this.usuariosData.find(usr => usr.id === id);
  }

  /**
   * Método obtenerUsuariosPorArea: filtra usuarios por área
   * 
   * @param area - Nombre del área
   * @returns Usuario[] - Usuarios que pertenecen al área
   */
  obtenerUsuariosPorArea(area: string): Usuario[] {
    return this.usuariosData.filter(usr => usr.area === area);
  }

  /**
   * Método buscarUsuarios: búsqueda por nombre o correo
   * 
   * @param termino - Término de búsqueda
   * @returns Usuario[] - Usuarios que coinciden
   */
  buscarUsuarios(termino: string): Usuario[] {
    const terminoLower = termino.toLowerCase();
    return this.usuariosData.filter(usr =>
      usr.nombre.toLowerCase().includes(terminoLower) ||
      usr.apellido.toLowerCase().includes(terminoLower) ||
      usr.correo.toLowerCase().includes(terminoLower)
    );
  }

  /**
   * Método obtenerConteosPorArea: obtiene estadísticas de usuarios por área
   * 
   * @returns objeto con conteos por área
   */
  obtenerConteosPorArea(): { [area: string]: number } {
    const conteos: { [area: string]: number } = {};
    this.usuariosData.forEach(usr => {
      conteos[usr.area] = (conteos[usr.area] || 0) + 1;
    });
    return conteos;
  }

  /**
   * Método actualizarUsuario: actualiza datos de un usuario
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

  /**
   * Método agregarUsuario: añade un nuevo usuario
   * 
   * @param usuario - Nuevo usuario a agregar
   */
  agregarUsuario(usuario: Usuario): void {
    this.usuariosData.push(usuario);
    this.usuariosSubject.next([...this.usuariosData]);
  }

  /**
   * Método eliminarUsuario: elimina un usuario
   * 
   * @param id - ID del usuario a eliminar
   */
  eliminarUsuario(id: string): void {
    this.usuariosData = this.usuariosData.filter(usr => usr.id !== id);
    this.usuariosSubject.next([...this.usuariosData]);
  }
}
