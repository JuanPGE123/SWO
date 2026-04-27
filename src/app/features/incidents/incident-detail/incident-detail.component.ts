/**
 * incident-detail.component.ts
 * Componente para visualizar el detalle de una incidencia con comentarios
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IncidentsService } from '../../../core/services/incidents.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Incidencia } from '../../../core/models/models';
import { environment } from '../../../../environments/environment';

interface Comentario {
  id?: number;
  autor: string;
  fecha: string;
  comentario: string;
}

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, RouterModule],
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.scss']
})
export class IncidentDetailComponent implements OnInit {
  incidente: Incidencia | undefined;
  incidenteId: string = '';
  comentarios: Comentario[] = [];
  nuevoComentario: string = '';
  agregandoComentario: boolean = false;
  cargandoComentarios: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private incidentsService: IncidentsService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.incidenteId = params['id'];
      this.cargarIncidente();
      this.cargarComentarios();
    });
  }

  cargarIncidente(): void {
    this.incidente = this.incidentsService.obtenerIncidenciaPorId(this.incidenteId);
  }

  cargarComentarios(): void {
    this.cargandoComentarios = true;
    const idIncidencia = parseInt(this.incidenteId.replace('INC-', ''));
    
    this.http.get<any[]>(`${environment.apiUrl}/incidencias/${idIncidencia}/comentarios`)
      .subscribe({
        next: (comentarios) => {
          this.comentarios = comentarios.map(c => ({
            id: c.id,
            autor: c.autor,
            fecha: c.fecha,
            comentario: c.comentario
          }));
          this.cargandoComentarios = false;
        },
        error: (err) => {
          console.error('Error al cargar comentarios:', err);
          this.cargandoComentarios = false;
        }
      });
  }

  agregarComentario(): void {
    if (!this.nuevoComentario.trim()) {
      this.notificationService.toast('El comentario no puede estar vacío', 3000, 'warning');
      return;
    }

    this.agregandoComentario = true;
    const idIncidencia = parseInt(this.incidenteId.replace('INC-', ''));
    const usuario = this.authService.getUsuarioActual();
    
    const formData = new URLSearchParams();
    formData.set('comentario', this.nuevoComentario);
    formData.set('idUsuario', usuario?.id?.toString() || '1');

    this.http.post(`${environment.apiUrl}/incidencias/${idIncidencia}/comentarios`, 
      formData.toString(), 
      { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .subscribe({
        next: () => {
          this.notificationService.toast('Comentario agregado correctamente', 3000, 'success');
          this.nuevoComentario = '';
          this.agregandoComentario = false;
          this.cargarComentarios(); // Recargar comentarios
        },
        error: (err) => {
          console.error('Error al agregar comentario:', err);
          this.notificationService.toast('Error al agregar comentario', 3000, 'error');
          this.agregandoComentario = false;
        }
      });
  }
}
