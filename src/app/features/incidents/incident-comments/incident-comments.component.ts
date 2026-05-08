/**
 * @fileoverview Componente de comentarios de incidencia
 * 
 * **Responsabilidades:**
 * - Mostrar lista de comentarios de una incidencia
 * - Permitir agregar nuevos comentarios
 * - Validar comentarios antes de enviar
 * - Mostrar fecha y autor de cada comentario
 * - Actualizar lista en tiempo real
 * 
 * **Características:**
 * - Lista cronológica de comentarios
 * - Formulario de nuevo comentario con validación
 * - Estados de carga (loading)
 * - Formato de fechas legible
 * - Avatar de usuario (opcional)
 * - Scroll automático al último comentario
 * 
 * **Validaciones:**
 * - Comentario no puede estar vacío
 * - Mínimo 3 caracteres
 * - Máximo 1000 caracteres
 * 
 * **Uso:**
 * ```html
 * <app-incident-comments
 *   [incidentId]="'INC-123'"
 *   [comments]="comentarios"
 *   (onCommentAdded)="recargarComentarios()">
 * </app-incident-comments>
 * ```
 * 
 * @author Equipo SWO
 * @version 1.0.0
 * @since 2026-05-03
 */

import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../../../core/models/models';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { environment } from '../../../../environments/environment';

/**
 * Interfaz para comentario con ID opcional
 */
interface ComentarioExtendido extends Comentario {
  id?: number;
}

/**
 * Componente de gestión de comentarios
 * Muestra y permite agregar comentarios a una incidencia
 */
@Component({
  selector: 'app-incident-comments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent
  ],
  templateUrl: './incident-comments.component.html',
  styleUrls: ['./incident-comments.component.scss']
})
export class IncidentCommentsComponent implements OnInit {

  // ═════════════════════════════════════════════════════════════════════════
  // INPUTS Y OUTPUTS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * ID de la incidencia
   * Requerido para cargar y agregar comentarios
   */
  @Input({ required: true }) incidentId!: string;

  /**
   * Lista de comentarios a mostrar
   * Puede ser cargada externamente o internamente
   */
  @Input() comments: Comentario[] = [];

  /**
   * Indica si debe cargar los comentarios automáticamente
   * @default true
   */
  @Input() autoLoad: boolean = true;

  /**
   * Evento emitido cuando se agrega un nuevo comentario
   * Permite al componente padre actualizar su estado
   */
  @Output() onCommentAdded = new EventEmitter<Comentario>();

  /**
   * Evento emitido cuando ocurre un error
   */
  @Output() onError = new EventEmitter<string>();

  // ═════════════════════════════════════════════════════════════════════════
  // REFERENCIAS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Referencia al contenedor de comentarios para scroll automático
   */
  @ViewChild('commentsContainer') commentsContainer?: ElementRef;

  // ═════════════════════════════════════════════════════════════════════════
  // INYECCIÓN DE DEPENDENCIAS
  // ═════════════════════════════════════════════════════════════════════════

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);

  // ═════════════════════════════════════════════════════════════════════════
  // PROPIEDADES
  // ═════════════════════════════════════════════════════════════════════════

  /** Texto del nuevo comentario */
  nuevoComentario: string = '';

  /** Indica si se están cargando los comentarios */
  cargando: boolean = false;

  /** Indica si se está agregando un comentario */
  agregando: boolean = false;

  /** Lista interna de comentarios */
  comentariosInternos: ComentarioExtendido[] = [];

  // ═════════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Inicializa el componente
   * Carga comentarios si autoLoad está activado
   */
  ngOnInit(): void {
    if (this.autoLoad && this.incidentId) {
      this.cargarComentarios();
    } else {
      this.comentariosInternos = this.comments.map(c => ({
        ...c,
        id: undefined
      }));
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS DE CARGA
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Carga los comentarios desde el servidor
   * Actualiza la lista interna de comentarios
   */
  cargarComentarios(): void {
    if (!this.incidentId) {
      console.error('No se puede cargar comentarios sin ID de incidencia');
      return;
    }

    this.cargando = true;
    const idIncidencia = parseInt(this.incidentId.replace('INC-', ''));
    
    this.http.get<any[]>(`${environment.apiUrl}/incidencias/${idIncidencia}/comentarios`)
      .subscribe({
        next: (comentarios) => {
          this.comentariosInternos = comentarios.map(c => ({
            id: c.id,
            author: c.autor || c.author,
            date: c.fecha || c.date,
            text: c.comentario || c.text
          }));
          this.cargando = false;
          
          // Scroll al último comentario después de cargar
          setTimeout(() => this.scrollToBottom(), 100);
        },
        error: (err) => {
          console.error('Error al cargar comentarios:', err);
          this.cargando = false;
          this.onError.emit('Error al cargar los comentarios');
        }
      });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS DE AGREGAR COMENTARIO
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Agrega un nuevo comentario
   * Valida el comentario y lo envía al servidor
   */
  agregarComentario(): void {
    // Validar comentario vacío
    if (!this.nuevoComentario.trim()) {
      this.notificationService.toast('El comentario no puede estar vacío', 3000, 'warning');
      return;
    }

    // Validar longitud mínima
    if (this.nuevoComentario.trim().length < 3) {
      this.notificationService.toast('El comentario debe tener al menos 3 caracteres', 3000, 'warning');
      return;
    }

    // Validar longitud máxima
    if (this.nuevoComentario.length > 1000) {
      this.notificationService.toast('El comentario no puede exceder 1000 caracteres', 3000, 'warning');
      return;
    }

    this.agregando = true;
    const idIncidencia = parseInt(this.incidentId.replace('INC-', ''));
    const usuario = this.authService.getUsuarioActual();
    
    // Preparar datos del formulario
    const formData = new URLSearchParams();
    formData.set('comentario', this.nuevoComentario);
    formData.set('idUsuario', usuario?.id?.toString() || '1');

    // Enviar al servidor
    this.http.post(`${environment.apiUrl}/incidencias/${idIncidencia}/comentarios`, 
      formData.toString(), 
      { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .subscribe({
        next: () => {
          // Crear objeto de comentario para la lista local
          const nuevoComentarioObj: Comentario = {
            author: `${usuario?.nombre || 'Usuario'} ${usuario?.apellido || ''}`.trim(),
            date: new Date().toISOString(),
            text: this.nuevoComentario
          };

          // Agregar a la lista local
          this.comentariosInternos.push(nuevoComentarioObj);

          // Emitir evento
          this.onCommentAdded.emit(nuevoComentarioObj);

          // Limpiar campo
          this.nuevoComentario = '';
          this.agregando = false;

          // Mostrar notificación
          this.notificationService.toast('Comentario agregado correctamente', 3000, 'success');

          // Scroll al último comentario
          setTimeout(() => this.scrollToBottom(), 100);
        },
        error: (err) => {
          console.error('Error al agregar comentario:', err);
          this.agregando = false;
          this.notificationService.toast('Error al agregar el comentario', 3000, 'error');
          this.onError.emit('Error al agregar el comentario');
        }
      });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS AUXILIARES
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Hace scroll automático al último comentario
   * @private
   */
  private scrollToBottom(): void {
    if (this.commentsContainer) {
      const element = this.commentsContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  /**
   * Formatea una fecha en formato legible
   * @param dateString Fecha en formato ISO 8601
   * @returns Fecha formateada
   * 
   * @example
   * formatDate('2026-05-03T10:30:00.000Z') // '3 de mayo de 2026, 10:30'
   */
  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      
      // Verificar si la fecha es válida
      if (isNaN(date.getTime())) {
        return dateString;
      }

      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      // Si es menos de 1 hora: "hace X minutos"
      if (diffMins < 60) {
        if (diffMins < 1) return 'Ahora mismo';
        return `Hace ${diffMins} minuto${diffMins !== 1 ? 's' : ''}`;
      }

      // Si es menos de 24 horas: "hace X horas"
      if (diffHours < 24) {
        return `Hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
      }

      // Si es menos de 7 días: "hace X días"
      if (diffDays < 7) {
        return `Hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
      }

      // Fecha completa
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  }

  /**
   * Obtiene las iniciales de un nombre para el avatar
   * @param name Nombre completo
   * @returns Iniciales (máximo 2 caracteres)
   * 
   * @example
   * getInitials('Juan Pérez') // 'JP'
   */
  getInitials(name: string): string {
    if (!name) return 'U';
    
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    
    return name.substring(0, 2).toUpperCase();
  }

  /**
   * Verifica si el comentario es válido
   * @returns true si el comentario es válido
   */
  isCommentValid(): boolean {
    return this.nuevoComentario.trim().length >= 3 && 
           this.nuevoComentario.length <= 1000;
  }

  /**
   * Obtiene el conteo de caracteres del comentario
   * @returns Texto del contador
   */
  getCharCount(): string {
    return `${this.nuevoComentario.length} / 1000`;
  }
}
