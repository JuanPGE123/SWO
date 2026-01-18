/**
 * incidents.service.ts
 * 
 * Servicio de incidencias: gestiona toda la lógica relacionada con incidentes.
 * - Almacena y manipula datos de incidentes
 * - Proporciona métodos para filtrado, actualización y búsqueda
 * - Emite cambios como Observables para reactividad
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Incidencia } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  // Datos de ejemplo inicial
  private incidenciasData: Incidencia[] = [
    {
      id: 'INC-2314',
      title: 'Fallo en la pasarela de pagos',
      state: 'open',
      priority: 'Alta',
      assignee: 'Lucía',
      project: 'Ecommerce',
      date: '2025-08-25',
      tags: ['pagos', 'producción'],
      comments: [
        {
          author: 'Cliente A',
          date: '2025-08-25 11:12',
          text: 'La compra muestra error 500 al intentar pagar'
        },
        {
          author: 'Soporte',
          date: '2025-08-25 11:30',
          text: 'Revisando logs, posible error en certificación del gateway'
        }
      ],
      user: 'Cliente A',
      userEmail: 'clientea@ejemplo.com',
      userPhones: ['+34123456789'],
      app: 'Pasarela',
      reason: 'Error 500 al confirmar pago',
      activity: 'Intentaba pagar con tarjeta'
    },
    {
      id: 'INC-2298',
      title: 'Error en el módulo de usuarios',
      state: 'inprogress',
      priority: 'Media',
      assignee: 'Carlos',
      project: 'Portal',
      date: '2025-08-24',
      tags: ['usuarios'],
      comments: [
        {
          author: 'Cliente B',
          date: '2025-08-24 10:05',
          text: 'No puedo actualizar mi perfil'
        }
      ],
      user: 'Cliente B',
      userEmail: 'clienteb@ejemplo.com',
      userPhones: ['+34987654321'],
      app: 'Portal',
      reason: 'Excepción en updateProfile',
      activity: 'Editando perfil'
    },
    {
      id: 'INC-2201',
      title: 'Servidor con alta latencia',
      state: 'pending',
      priority: 'Crítica',
      assignee: 'María',
      project: 'Infra',
      date: '2025-08-20',
      tags: ['infra'],
      comments: [
        {
          author: 'Monitor',
          date: '2025-08-20 03:22',
          text: 'Alertas de CPU al 95%'
        }
      ],
      user: 'Cliente C',
      userEmail: 'clienteC@ejemplo.com',
      userPhones: ['+34111222333'],
      app: 'Infra',
      reason: 'Alto consumo CPU',
      activity: 'Proceso batch nocturno'
    },
    {
      id: 'INC-2202',
      title: 'Nuevo incidente de prueba',
      state: 'resolved',
      priority: 'Baja',
      assignee: 'Roberto',
      project: 'Integraciones',
      date: '2025-08-26',
      tags: ['test'],
      comments: [
        {
          author: 'QA',
          date: '2025-08-26 09:00',
          text: 'Prueba automatizada: OK'
        }
      ],
      user: 'Cliente D',
      userEmail: 'cliented@ejemplo.com',
      userPhones: ['+34999888777'],
      app: 'Integraciones',
      reason: 'Prueba',
      activity: 'Test'
    }
  ];

  // BehaviorSubject para emitir cambios en la lista de incidencias
  private incidenciasSubject = new BehaviorSubject<Incidencia[]>(this.incidenciasData);
  public incidencias$: Observable<Incidencia[]> = this.incidenciasSubject.asObservable();

  constructor() {}

  /**
   * Método obtenerIncidencias: obtiene todas las incidencias
   * 
   * @returns Observable<Incidencia[]> - Stream de incidencias
   */
  obtenerIncidencias(): Observable<Incidencia[]> {
    return this.incidencias$;
  }

  /**
   * Método obtenerIncidenciaPorId: obtiene una incidencia específica
   * 
   * @param id - ID de la incidencia
   * @returns Incidencia | undefined - Incidencia encontrada o undefined
   */
  obtenerIncidenciaPorId(id: string): Incidencia | undefined {
    return this.incidenciasData.find(inc => inc.id === id);
  }

  /**
   * Método actualizarIncidencia: actualiza una incidencia existente
   * 
   * @param incidenciaActualizada - Incidencia con los datos actualizados
   */
  actualizarIncidencia(incidenciaActualizada: Incidencia): void {
    const index = this.incidenciasData.findIndex(inc => inc.id === incidenciaActualizada.id);
    if (index !== -1) {
      this.incidenciasData[index] = incidenciaActualizada;
      // Emitimos el cambio a todos los observadores
      this.incidenciasSubject.next([...this.incidenciasData]);
    }
  }

  /**
   * Método cambiarEstado: actualiza el estado de una incidencia
   * 
   * @param id - ID de la incidencia
   * @param nuevoEstado - Nuevo estado (open, inprogress, pending, resolved)
   */
  cambiarEstado(id: string, nuevoEstado: 'open' | 'inprogress' | 'pending' | 'resolved'): void {
    const incidencia = this.incidenciasData.find(inc => inc.id === id);
    if (incidencia) {
      incidencia.state = nuevoEstado;
      this.incidenciasSubject.next([...this.incidenciasData]);
    }
  }

  /**
   * Método cambiarPrioridad: actualiza la prioridad de una incidencia
   * 
   * @param id - ID de la incidencia
   * @param nuevaPrioridad - Nueva prioridad
   */
  cambiarPrioridad(id: string, nuevaPrioridad: 'Baja' | 'Media' | 'Alta' | 'Crítica'): void {
    const incidencia = this.incidenciasData.find(inc => inc.id === id);
    if (incidencia) {
      incidencia.priority = nuevaPrioridad;
      this.incidenciasSubject.next([...this.incidenciasData]);
    }
  }

  /**
   * Método asignarIncidencia: asigna una incidencia a un usuario
   * 
   * @param id - ID de la incidencia
   * @param nuevoAsignado - Nombre del nuevo asignado
   */
  asignarIncidencia(id: string, nuevoAsignado: string): void {
    const incidencia = this.incidenciasData.find(inc => inc.id === id);
    if (incidencia) {
      incidencia.assignee = nuevoAsignado;
      this.incidenciasSubject.next([...this.incidenciasData]);
    }
  }

  /**
   * Método agregarComentario: añade un comentario a una incidencia
   * 
   * @param id - ID de la incidencia
   * @param autor - Autor del comentario
   * @param texto - Contenido del comentario
   */
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

  /**
   * Método obtenerEstadísticas: calcula estadísticas de las incidencias
   * 
   * @returns objeto con conteos por estado
   */
  obtenerEstadísticas(): { abiertos: number; enProgreso: number; pendientes: number; resueltos: number } {
    return {
      abiertos: this.incidenciasData.filter(i => i.state === 'open').length,
      enProgreso: this.incidenciasData.filter(i => i.state === 'inprogress').length,
      pendientes: this.incidenciasData.filter(i => i.state === 'pending').length,
      resueltos: this.incidenciasData.filter(i => i.state === 'resolved').length
    };
  }
}
