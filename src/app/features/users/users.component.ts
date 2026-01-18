/**
 * users.component.ts
 * Componente para la gestión de usuarios
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { NotificationService } from '../../core/services/notification.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { Usuario } from '../../core/models/models';

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

  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService
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
}
