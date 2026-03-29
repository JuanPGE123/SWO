/**
 * projects.component.ts
 * Gestión de proyectos del sistema
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProjectsService } from '../../core/services/projects.service';
import { NotificationService } from '../../core/services/notification.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { Proyecto } from '../../core/models/models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  proyectos: Proyecto[] = [];
  cargando: boolean = false;

  // Modal nuevo proyecto
  mostrarModal: boolean = false;
  guardando: boolean = false;
  nuevoProyecto = { nombre: '', descripcion: '', estado: 'Activo' };

  // Panel asignación
  mostrarAsignar: boolean = false;
  idProyectoSeleccionado: number = 0;
  usuarios: { id: number; nombre: string; proyecto: string }[] = [];
  idUsuarioSeleccionado: number = 0;
  asignando: boolean = false;

  constructor(
    private projectsService: ProjectsService,
    private notificationService: NotificationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.cargando = true;
    this.projectsService.cargarDesdeBackend();
    this.projectsService.obtenerProyectos().subscribe(data => {
      this.proyectos = data;
      this.cargando = false;
    });
  }

  abrirModal(): void {
    this.nuevoProyecto = { nombre: '', descripcion: '', estado: 'Activo' };
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardarProyecto(): void {
    if (!this.nuevoProyecto.nombre.trim()) {
      this.notificationService.toast('El nombre es obligatorio', 3000, 'error');
      return;
    }
    this.guardando = true;
    this.projectsService.crearProyecto(
      this.nuevoProyecto.nombre.trim(),
      this.nuevoProyecto.descripcion.trim(),
      this.nuevoProyecto.estado
    ).subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarModal = false;
        this.notificationService.toast('Proyecto creado', 3000, 'success');
        this.cargarProyectos();
      },
      error: (err: any) => {
        this.guardando = false;
        this.notificationService.toast('Error: ' + (err?.message || err), 4000, 'error');
      }
    });
  }

  eliminarProyecto(id: number, nombre: string): void {
    if (!confirm(`¿Eliminar proyecto "${nombre}"?`)) return;
    this.projectsService.eliminarProyecto(id).subscribe({
      next: () => this.notificationService.toast('Proyecto eliminado', 3000, 'success'),
      error: (err: any) => this.notificationService.toast('Error: ' + (err?.message || err), 4000, 'error')
    });
  }

  abrirAsignar(idProyecto: number): void {
    this.idProyectoSeleccionado = idProyecto;
    this.idUsuarioSeleccionado = 0;
    this.mostrarAsignar = true;
    this.http.get<any[]>(`${environment.apiUrl}/usuarios`).subscribe({
      next: (data) => {
        this.usuarios = data.map(u => ({ id: u.id, nombre: u.nombre, proyecto: u.proyecto || '' }));
      },
      error: () => { this.usuarios = []; }
    });
  }

  cerrarAsignar(): void {
    this.mostrarAsignar = false;
  }

  confirmarAsignacion(): void {
    if (!this.idUsuarioSeleccionado) {
      this.notificationService.toast('Selecciona un usuario', 3000, 'warning');
      return;
    }
    this.asignando = true;
    this.projectsService.asignarUsuario(this.idUsuarioSeleccionado, this.idProyectoSeleccionado).subscribe({
      next: () => {
        this.asignando = false;
        this.mostrarAsignar = false;
        this.notificationService.toast('Usuario asignado al proyecto', 3000, 'success');
        this.cargarProyectos();
      },
      error: (err: any) => {
        this.asignando = false;
        this.notificationService.toast('Error al asignar: ' + (err?.message || err), 4000, 'error');
      }
    });
  }
}
