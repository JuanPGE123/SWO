/**
 * users.component.ts
 * Componente para la gestión de usuarios
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../core/services/users.service';
import { NotificationService } from '../../core/services/notification.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { Usuario } from '../../core/models/models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  busqueda: string = '';
  areaFiltro: string = 'all';
  areas = ['TI', 'Soporte', 'Desarrollo', 'Infraestructura', 'RRHH', 'Administración'];

  // Modal nuevo usuario
  mostrarModal: boolean = false;
  guardando: boolean = false;
  nuevoUsuario = {
    nombre: '', correo: '', password: '123456',
    rol: 'Usuario', telefono: '', departamento: '', idProyecto: 0
  };

  proyectos: { id: number; nombre: string }[] = [];
  cargandoProyectos: boolean = false;

  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usersService.obtenerUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.aplicarFiltros();
      }
    );
  }

  aplicarFiltros(): void {
    this.usuariosFiltrados = this.usuarios.filter(usr => {
      const cumpleArea = this.areaFiltro === 'all' || usr.area === this.areaFiltro;
      const cumpleBusqueda = this.busqueda === '' ||
        usr.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        usr.apellido.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        usr.correo.toLowerCase().includes(this.busqueda.toLowerCase());
      return cumpleArea && cumpleBusqueda;
    });
  }

  exportar(): void {
    const csv = this.generarCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios.csv';
    a.click();
    this.notificationService.toast('Usuarios exportados', 2000, 'success');
  }

  generarCSV(): string {
    const headers = ['ID', 'Nombre', 'Apellido', 'Correo', 'Celular', 'Área', 'Jefe Directo'];
    const rows = this.usuariosFiltrados.map(usr =>
      [usr.id, usr.nombre, usr.apellido, usr.correo, usr.celular, usr.area, usr.jefeDirecto].join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  }

  obtenerConteos() {
    const conteos = this.usersService.obtenerConteosPorArea();
    return {
      total: this.usuarios.length,
      ti: conteos['TI'] || 0,
      soporte: conteos['Soporte'] || 0,
      otros: this.usuarios.length - ((conteos['TI'] || 0) + (conteos['Soporte'] || 0))
    };
  }

  onBusquedaChange(): void {
    this.aplicarFiltros();
  }

  onAreaChange(): void {
    this.aplicarFiltros();
  }

  abrirModal(): void {
    this.nuevoUsuario = { nombre: '', correo: '', password: '123456', rol: 'Usuario', telefono: '', departamento: '', idProyecto: 0 };
    this.mostrarModal = true;
    // Cargar proyectos disponibles
    this.cargandoProyectos = true;
    this.http.get<any[]>(`${environment.apiUrl}/proyectos`).subscribe({
      next: (data) => { this.proyectos = data.map(p => ({ id: p.id, nombre: p.nombre })); this.cargandoProyectos = false; },
      error: () => { this.proyectos = []; this.cargandoProyectos = false; }
    });
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardarUsuario(): void {
    if (!this.nuevoUsuario.nombre.trim() || !this.nuevoUsuario.correo.trim()) {
      this.notificationService.toast('Nombre y correo son obligatorios', 3000, 'error');
      return;
    }
    this.guardando = true;
    this.usersService.agregarUsuarioBackend({
      nombre: this.nuevoUsuario.nombre.trim(),
      correo: this.nuevoUsuario.correo.trim(),
      password: this.nuevoUsuario.password || '123456',
      rol: this.nuevoUsuario.rol,
      telefono: this.nuevoUsuario.telefono.trim(),
      departamento: this.nuevoUsuario.departamento.trim(),
      idProyecto: this.nuevoUsuario.idProyecto || undefined
    }).subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarModal = false;
        this.notificationService.toast(`Usuario ${this.nuevoUsuario.nombre} creado`, 3000, 'success');
      },
      error: (err: any) => {
        this.guardando = false;
        this.notificationService.toast('Error al guardar: ' + (err?.message || err), 4000, 'error');
      }
    });
  }

  eliminarUsuario(id: string, nombre: string): void {
    if (!confirm(`¿Eliminar al usuario "${nombre}"? Esta acción no se puede deshacer.`)) return;
    this.usersService.eliminarUsuarioBackend(id).subscribe({
      next: () => this.notificationService.toast(`Usuario ${nombre} eliminado`, 3000, 'success'),
      error: (err: any) => this.notificationService.toast('Error al eliminar: ' + (err?.message || err), 4000, 'error')
    });
  }
}
