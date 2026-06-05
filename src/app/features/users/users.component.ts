import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../core/services/users.service';
import { NotificationService } from '../../core/services/notification.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { Usuario } from '../../core/models/models';
import { environment } from '../../../environments/environment';

export const ROLES_SISTEMA = [
  'Administrador', 'Gerente', 'Coordinador', 'Jefe',
  'Analista', 'Desarrollador', 'Técnico', 'Soporte',
  'Mesa de Servicio', 'Auditor', 'Consultor', 'QA', 'Usuario'
];

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
  areas = ['TI', 'Soporte', 'Desarrollo', 'Infraestructura', 'RRHH', 'Administración', 'QA', 'Consultoría'];

  readonly roles = ROLES_SISTEMA;

  // ── Modal nuevo usuario ──────────────────────────────────────────────────
  mostrarModal = false;
  guardando = false;
  nuevoUsuario = {
    nombre: '', correo: '', password: '',
    confirmarPassword: '', rol: 'Usuario',
    telefono: '', departamento: '', idProyecto: 0, idJefe: 0
  };
  erroresForm: { [k: string]: string } = {};

  proyectos: { id: number; nombre: string }[] = [];
  jefes: { id: number; nombre: string; rol: string }[] = [];
  cargandoProyectos = false;
  cargandoJefes = false;

  // ── Modal cambiar contraseña ─────────────────────────────────────────────
  mostrarModalPassword = false;
  usuarioPasswordId = '';
  usuarioPasswordNombre = '';
  nuevaPassword = '';
  confirmarNuevaPassword = '';
  cambiandoPassword = false;
  errorPassword = '';

  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usersService.obtenerUsuarios().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.aplicarFiltros();
    });
    this.usersService.cargarDesdeBackend();
  }

  aplicarFiltros(): void {
    this.usuariosFiltrados = this.usuarios.filter(usr => {
      const cumpleArea = this.areaFiltro === 'all' || usr.area === this.areaFiltro;
      const term = this.busqueda.toLowerCase();
      const cumpleBusqueda = !term ||
        usr.nombre.toLowerCase().includes(term) ||
        usr.apellido.toLowerCase().includes(term) ||
        usr.correo.toLowerCase().includes(term);
      return cumpleArea && cumpleBusqueda;
    });
  }

  exportar(): void {
    const csv = this.generarCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usuarios_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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

  onBusquedaChange(): void { this.aplicarFiltros(); }
  onAreaChange(): void { this.aplicarFiltros(); }

  // ── Modal nuevo usuario ──────────────────────────────────────────────────

  abrirModal(): void {
    this.nuevoUsuario = {
      nombre: '', correo: '', password: '', confirmarPassword: '',
      rol: 'Usuario', telefono: '', departamento: '', idProyecto: 0, idJefe: 0
    };
    this.erroresForm = {};
    this.mostrarModal = true;
    this.cargarProyectosYJefes();
  }

  private cargarProyectosYJefes(): void {
    this.cargandoProyectos = true;
    this.cargandoJefes = true;

    this.http.get<any>(`${environment.apiUrl}/proyectos`).subscribe({
      next: (res) => {
        const lista = res?.data ?? res ?? [];
        this.proyectos = (Array.isArray(lista) ? lista : []).map((p: any) => ({
          id: p.idProyecto ?? p.id,
          nombre: p.nombreProyecto ?? p.nombre ?? ''
        }));
        this.cargandoProyectos = false;
      },
      error: () => { this.proyectos = []; this.cargandoProyectos = false; }
    });

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

  cerrarModal(): void { this.mostrarModal = false; }

  private validarFormulario(): boolean {
    this.erroresForm = {};
    const u = this.nuevoUsuario;

    if (!u.nombre.trim()) {
      this.erroresForm['nombre'] = 'El nombre es obligatorio';
    } else if (u.nombre.trim().length < 3) {
      this.erroresForm['nombre'] = 'Mínimo 3 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+$/.test(u.nombre.trim())) {
      this.erroresForm['nombre'] = 'Solo se permiten letras y espacios';
    }

    if (!u.correo.trim()) {
      this.erroresForm['correo'] = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.correo.trim())) {
      this.erroresForm['correo'] = 'Formato de correo inválido';
    }

    if (!u.password) {
      this.erroresForm['password'] = 'La contraseña es obligatoria';
    } else if (u.password.length < 8) {
      this.erroresForm['password'] = 'Mínimo 8 caracteres';
    }

    if (u.password && u.confirmarPassword && u.password !== u.confirmarPassword) {
      this.erroresForm['confirmarPassword'] = 'Las contraseñas no coinciden';
    }

    if (u.telefono && !/^[+]?[0-9]{7,15}$/.test(u.telefono)) {
      this.erroresForm['telefono'] = 'Formato inválido (7-15 dígitos)';
    }

    if (u.departamento && u.departamento.length > 50) {
      this.erroresForm['departamento'] = 'Máximo 50 caracteres';
    }

    return Object.keys(this.erroresForm).length === 0;
  }

  guardarUsuario(): void {
    if (!this.validarFormulario()) return;
    this.guardando = true;
    this.usersService.agregarUsuarioBackend({
      nombre: this.nuevoUsuario.nombre.trim(),
      correo: this.nuevoUsuario.correo.trim(),
      password: this.nuevoUsuario.password,
      rol: this.nuevoUsuario.rol,
      telefono: this.nuevoUsuario.telefono.trim() || undefined,
      departamento: this.nuevoUsuario.departamento.trim(),
      idProyecto: this.nuevoUsuario.idProyecto || undefined,
      idJefe: this.nuevoUsuario.idJefe || undefined
    }).subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarModal = false;
        this.notificationService.toast(`Usuario ${this.nuevoUsuario.nombre} creado exitosamente`, 3000, 'success');
        this.cargarUsuarios();
      },
      error: (err: any) => {
        this.guardando = false;
        this.notificationService.toast('Error: ' + (err?.message || err?.mensaje || 'Error al guardar'), 4000, 'error');
      }
    });
  }

  // ── Modal cambiar contraseña ─────────────────────────────────────────────

  abrirCambiarPassword(id: string, nombre: string): void {
    this.usuarioPasswordId = id;
    this.usuarioPasswordNombre = nombre;
    this.nuevaPassword = '';
    this.confirmarNuevaPassword = '';
    this.errorPassword = '';
    this.mostrarModalPassword = true;
  }

  cerrarModalPassword(): void { this.mostrarModalPassword = false; }

  guardarNuevaPassword(): void {
    this.errorPassword = '';
    if (!this.nuevaPassword) {
      this.errorPassword = 'La contraseña es obligatoria';
      return;
    }
    if (this.nuevaPassword.length < 8) {
      this.errorPassword = 'La contraseña debe tener mínimo 8 caracteres';
      return;
    }
    if (this.nuevaPassword !== this.confirmarNuevaPassword) {
      this.errorPassword = 'Las contraseñas no coinciden';
      return;
    }
    this.cambiandoPassword = true;
    this.usersService.cambiarPasswordBackend(this.usuarioPasswordId, this.nuevaPassword).subscribe({
      next: () => {
        this.cambiandoPassword = false;
        this.mostrarModalPassword = false;
        this.notificationService.toast(`Contraseña de ${this.usuarioPasswordNombre} actualizada`, 3000, 'success');
      },
      error: (err: any) => {
        this.cambiandoPassword = false;
        this.errorPassword = err?.message || err?.mensaje || 'Error al cambiar la contraseña';
      }
    });
  }

  // ── Eliminar usuario ─────────────────────────────────────────────────────

  eliminarUsuario(id: string, nombre: string): void {
    if (!confirm(`¿Eliminar al usuario "${nombre}"?\nEsta acción es irreversible.`)) return;
    this.usersService.eliminarUsuarioBackend(id).subscribe({
      next: () => {
        this.notificationService.toast(`Usuario ${nombre} eliminado`, 3000, 'success');
        this.cargarUsuarios();
      },
      error: (err: any) => this.notificationService.toast('Error: ' + (err?.message || err?.mensaje || err), 4000, 'error')
    });
  }
}
