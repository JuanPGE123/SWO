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
  cargando = false;

  readonly estadosProyecto = ['Activo', 'En Pausa', 'Completado', 'Cancelado'];

  // ── Modal nuevo proyecto ──────────────────────────────────────────────────
  mostrarModal = false;
  guardando = false;
  nuevoProyecto = { nombre: '', descripcion: '', estado: 'Activo', idJefe: 0 };
  erroresProyecto: { [k: string]: string } = {};

  jefes: { id: number; nombre: string; rol: string }[] = [];
  cargandoJefes = false;

  // ── Panel asignación ─────────────────────────────────────────────────────
  mostrarAsignar = false;
  idProyectoSeleccionado = 0;
  nombreProyectoSeleccionado = '';
  usuarios: { id: number; nombre: string; proyecto: string }[] = [];
  idUsuarioSeleccionado = 0;
  asignando = false;

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

  // ── Métricas ─────────────────────────────────────────────────────────────

  get totalActivos(): number {
    return this.proyectos.filter(p => p.estado === 'Activo').length;
  }

  get totalEnPausa(): number {
    return this.proyectos.filter(p => p.estado === 'En Pausa').length;
  }

  get totalCompletados(): number {
    return this.proyectos.filter(p => p.estado === 'Completado').length;
  }

  // ── Modal nuevo proyecto ──────────────────────────────────────────────────

  abrirModal(): void {
    this.nuevoProyecto = { nombre: '', descripcion: '', estado: 'Activo', idJefe: 0 };
    this.erroresProyecto = {};
    this.mostrarModal = true;
    this.cargarJefes();
  }

  cerrarModal(): void { this.mostrarModal = false; }

  private cargarJefes(): void {
    this.cargandoJefes = true;
    this.http.get<any>(`${environment.apiUrl}/usuarios/jefes`).subscribe({
      next: (res) => {
        const lista = res?.data ?? res ?? [];
        this.jefes = (Array.isArray(lista) ? lista : []).map((u: any) => ({
          id: u.idUsuario ?? u.id,
          nombre: u.nombreCompleto ?? u.nombre ?? '',
          rol: u.rol ?? ''
        }));
        this.cargandoJefes = false;
      },
      error: () => { this.jefes = []; this.cargandoJefes = false; }
    });
  }

  private validarProyecto(): boolean {
    this.erroresProyecto = {};
    const p = this.nuevoProyecto;

    if (!p.nombre.trim()) {
      this.erroresProyecto['nombre'] = 'El nombre del proyecto es obligatorio';
    } else if (p.nombre.trim().length < 3) {
      this.erroresProyecto['nombre'] = 'Mínimo 3 caracteres';
    } else if (p.nombre.trim().length > 150) {
      this.erroresProyecto['nombre'] = 'Máximo 150 caracteres';
    }

    if (p.descripcion && p.descripcion.length > 2000) {
      this.erroresProyecto['descripcion'] = 'La descripción no puede superar 2000 caracteres';
    }

    return Object.keys(this.erroresProyecto).length === 0;
  }

  guardarProyecto(): void {
    if (!this.validarProyecto()) return;
    this.guardando = true;
    this.http.post<any>(`${environment.apiUrl}/proyectos`, {
      nombreProyecto: this.nuevoProyecto.nombre.trim(),
      descripcion: this.nuevoProyecto.descripcion.trim() || null,
      estado: this.nuevoProyecto.estado,
      ...(this.nuevoProyecto.idJefe ? { idJefe: this.nuevoProyecto.idJefe } : {})
    }, { headers: { 'Content-Type': 'application/json' } }).subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarModal = false;
        this.notificationService.toast('Proyecto creado exitosamente', 3000, 'success');
        this.cargarProyectos();
      },
      error: (err: any) => {
        this.guardando = false;
        const msg = err?.error?.message || err?.message || 'Error al crear el proyecto';
        this.notificationService.toast(msg, 4000, 'error');
      }
    });
  }

  eliminarProyecto(id: number, nombre: string): void {
    if (!confirm(`¿Eliminar el proyecto "${nombre}"?\nEsta acción eliminará también las asignaciones de usuarios.`)) return;
    this.projectsService.eliminarProyecto(id).subscribe({
      next: () => {
        this.notificationService.toast('Proyecto eliminado', 3000, 'success');
        this.cargarProyectos();
      },
      error: (err: any) => this.notificationService.toast('Error: ' + (err?.message || err?.mensaje || err), 4000, 'error')
    });
  }

  // ── Panel asignación ─────────────────────────────────────────────────────

  abrirAsignar(idProyecto: number, nombreProyecto: string): void {
    this.idProyectoSeleccionado = idProyecto;
    this.nombreProyectoSeleccionado = nombreProyecto;
    this.idUsuarioSeleccionado = 0;
    this.mostrarAsignar = true;
    this.http.get<any>(`${environment.apiUrl}/usuarios`).subscribe({
      next: (res) => {
        const lista = res?.data ?? res ?? [];
        this.usuarios = (Array.isArray(lista) ? lista : []).map((u: any) => ({
          id: u.idUsuario ?? u.id,
          nombre: u.nombreCompleto ?? u.nombre ?? '',
          proyecto: u.proyecto || ''
        }));
      },
      error: () => { this.usuarios = []; }
    });
  }

  cerrarAsignar(): void { this.mostrarAsignar = false; }

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
        this.notificationService.toast('Error: ' + (err?.message || err?.mensaje || err), 4000, 'error');
      }
    });
  }
}
