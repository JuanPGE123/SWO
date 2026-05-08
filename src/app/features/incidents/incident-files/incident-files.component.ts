/**
 * @fileoverview Componente de archivos adjuntos de incidencia
 * 
 * **Responsabilidades:**
 * - Mostrar lista de archivos adjuntos de una incidencia
 * - Permitir subir nuevos archivos
 * - Validar tipo y tamaño de archivos
 * - Descargar archivos
 * - Eliminar archivos (con confirmación)
 * - Previsualizar imágenes
 * 
 * **Características:**
 * - Drag & drop para subir archivos
 * - Validación de tipo MIME
 * - Límite de tamaño configurable
 * - Preview de imágenes
 * - Iconos según tipo de archivo
 * - Progress bar durante la subida
 * 
 * **Validaciones:**
 * - Tipos permitidos: PDF, imágenes (PNG, JPG, JPEG), Word, Excel, TXT
 * - Tamaño máximo: 10MB por archivo
 * - Múltiples archivos permitidos
 * 
 * **Uso:**
 * ```html
 * <app-incident-files
 *   [incidentId]="'INC-123'"
 *   [files]="archivos"
 *   (onFileUploaded)="recargarArchivos()"
 *   (onFileDeleted)="recargarArchivos()">
 * </app-incident-files>
 * ```
 * 
 * @author Equipo SWO
 * @version 1.0.0
 * @since 2026-05-03
 */

import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ArchivoAdjunto } from '../../../core/models/models';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { environment } from '../../../../environments/environment';

/**
 * Componente de gestión de archivos adjuntos
 * Permite subir, ver y descargar archivos de una incidencia
 */
@Component({
  selector: 'app-incident-files',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './incident-files.component.html',
  styleUrls: ['./incident-files.component.scss']
})
export class IncidentFilesComponent implements OnInit {

  // ═════════════════════════════════════════════════════════════════════════
  // INPUTS Y OUTPUTS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * ID de la incidencia
   * Requerido para subir y gestionar archivos
   */
  @Input({ required: true }) incidentId!: string;

  /**
   * Lista de archivos adjuntos
   */
  @Input() files: ArchivoAdjunto[] = [];

  /**
   * Indica si debe cargar los archivos automáticamente
   * @default true
   */
  @Input() autoLoad: boolean = true;

  /**
   * Tamaño máximo permitido en bytes (por defecto 10MB)
   * @default 10485760
   */
  @Input() maxFileSize: number = 10 * 1024 * 1024; // 10MB

  /**
   * Tipos de archivo permitidos
   */
  @Input() allowedTypes: string[] = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ];

  /**
   * Evento emitido cuando se sube un archivo
   */
  @Output() onFileUploaded = new EventEmitter<ArchivoAdjunto>();

  /**
   * Evento emitido cuando se elimina un archivo
   */
  @Output() onFileDeleted = new EventEmitter<string>();

  /**
   * Evento emitido cuando ocurre un error
   */
  @Output() onError = new EventEmitter<string>();

  // ═════════════════════════════════════════════════════════════════════════
  // INYECCIÓN DE DEPENDENCIAS
  // ═════════════════════════════════════════════════════════════════════════

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);

  // ═════════════════════════════════════════════════════════════════════════
  // PROPIEDADES
  // ═════════════════════════════════════════════════════════════════════════

  /** Lista interna de archivos */
  archivosInternos: ArchivoAdjunto[] = [];

  /** Indica si se están cargando los archivos */
  cargando: boolean = false;

  /** Indica si se está subiendo un archivo */
  subiendo: boolean = false;

  /** Progreso de subida (0-100) */
  progresoSubida: number = 0;

  /** Indica si el área de drag está activa */
  dragActive: boolean = false;

  /** Archivo en preview */
  archivoPreview: ArchivoAdjunto | null = null;

  // ═════════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Inicializa el componente
   */
  ngOnInit(): void {
    if (this.autoLoad && this.incidentId) {
      this.cargarArchivos();
    } else {
      this.archivosInternos = [...this.files];
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS DE CARGA
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Carga los archivos desde el servidor
   */
  cargarArchivos(): void {
    if (!this.incidentId) {
      console.error('No se puede cargar archivos sin ID de incidencia');
      return;
    }

    this.cargando = true;
    const idIncidencia = parseInt(this.incidentId.replace('INC-', ''));
    
    this.http.get<any[]>(`${environment.apiUrl}/incidencias/${idIncidencia}/archivos`)
      .subscribe({
        next: (archivos) => {
          this.archivosInternos = archivos.map(a => ({
            id: a.id,
            nombre: a.nombre,
            tamanio: a.tamanio || a.tamano,
            tipo: a.tipo || this.getTipoMime(a.nombre),
            url: a.url || `${environment.apiUrl}/archivos/${a.id}`,
            fechaCarga: a.fechaCarga || a.fecha,
            usuarioCarga: a.usuarioCarga || a.usuario,
            descripcion: a.descripcion
          }));
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al cargar archivos:', err);
          this.cargando = false;
          
          // Usar datos mock si falla la carga
          this.archivosInternos = this.files;
        }
      });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS DE SUBIDA
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Maneja el evento de selección de archivos
   * @param event Evento del input file
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.procesarArchivos(Array.from(input.files));
    }
  }

  /**
   * Maneja el evento de drop de archivos
   * @param event Evento de drop
   */
  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragActive = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.procesarArchivos(Array.from(event.dataTransfer.files));
    }
  }

  /**
   * Maneja el evento de drag over
   * @param event Evento de drag over
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragActive = true;
  }

  /**
   * Maneja el evento de drag leave
   */
  onDragLeave(): void {
    this.dragActive = false;
  }

  /**
   * Procesa y valida los archivos seleccionados
   * @param files Lista de archivos a procesar
   * @private
   */
  private procesarArchivos(files: File[]): void {
    for (const file of files) {
      // Validar tamaño
      if (file.size > this.maxFileSize) {
        this.notificationService.toast(
          `El archivo "${file.name}" excede el tamaño máximo de ${this.formatFileSize(this.maxFileSize)}`,
          5000,
          'warning'
        );
        continue;
      }

      // Validar tipo
      if (!this.allowedTypes.includes(file.type)) {
        this.notificationService.toast(
          `El tipo de archivo "${file.name}" no está permitido`,
          5000,
          'warning'
        );
        continue;
      }

      // Subir archivo
      this.subirArchivo(file);
    }
  }

  /**
   * Sube un archivo al servidor
   * @param file Archivo a subir
   * @private
   */
  private subirArchivo(file: File): void {
    this.subiendo = true;
    this.progresoSubida = 0;

    const idIncidencia = parseInt(this.incidentId.replace('INC-', ''));
    const usuario = this.authService.getUsuarioActual();

    // Crear FormData
    const formData = new FormData();
    formData.append('archivo', file);
    formData.append('idIncidencia', idIncidencia.toString());
    formData.append('idUsuario', usuario?.id?.toString() || '1');

    // Subir con progreso
    this.http.post(`${environment.apiUrl}/incidencias/${idIncidencia}/archivos`, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progresoSubida = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          // Archivo subido exitosamente
          const nuevoArchivo: ArchivoAdjunto = {
            id: `FILE-${Date.now()}`,
            nombre: file.name,
            tamanio: file.size,
            tipo: file.type,
            url: URL.createObjectURL(file),
            fechaCarga: new Date().toISOString(),
            usuarioCarga: `${usuario?.nombre || 'Usuario'} ${usuario?.apellido || ''}`.trim()
          };

          this.archivosInternos.push(nuevoArchivo);
          this.onFileUploaded.emit(nuevoArchivo);

          this.subiendo = false;
          this.progresoSubida = 0;

          this.notificationService.toast('Archivo subido correctamente', 3000, 'success');
        }
      },
      error: (err) => {
        console.error('Error al subir archivo:', err);
        this.subiendo = false;
        this.progresoSubida = 0;
        this.notificationService.toast('Error al subir el archivo', 3000, 'error');
        this.onError.emit('Error al subir el archivo');
      }
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS DE ACCIONES
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Descarga un archivo
   * @param archivo Archivo a descargar
   */
  descargarArchivo(archivo: ArchivoAdjunto): void {
    window.open(archivo.url, '_blank');
  }

  /**
   * Elimina un archivo (con confirmación)
   * @param archivo Archivo a eliminar
   */
  eliminarArchivo(archivo: ArchivoAdjunto): void {
    if (!confirm(`¿Estás seguro de eliminar el archivo "${archivo.nombre}"?`)) {
      return;
    }

    const index = this.archivosInternos.indexOf(archivo);
    if (index > -1) {
      this.archivosInternos.splice(index, 1);
      this.onFileDeleted.emit(archivo.id);
      this.notificationService.toast('Archivo eliminado', 3000, 'success');
    }
  }

  /**
   * Muestra preview de un archivo (solo imágenes)
   * @param archivo Archivo a previsualizar
   */
  previewArchivo(archivo: ArchivoAdjunto): void {
    if (this.esImagen(archivo)) {
      this.archivoPreview = archivo;
    }
  }

  /**
   * Cierra el preview
   */
  cerrarPreview(): void {
    this.archivoPreview = null;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MÉTODOS AUXILIARES
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Verifica si un archivo es una imagen
   * @param archivo Archivo a verificar
   * @returns true si es imagen
   */
  esImagen(archivo: ArchivoAdjunto): boolean {
    return archivo.tipo.startsWith('image/');
  }

  /**
   * Obtiene el icono apropiado para un tipo de archivo
   * @param archivo Archivo
   * @returns Nombre del icono
   */
  getIcono(archivo: ArchivoAdjunto): string {
    if (archivo.tipo.includes('pdf')) return 'picture_as_pdf';
    if (archivo.tipo.includes('image')) return 'image';
    if (archivo.tipo.includes('word')) return 'description';
    if (archivo.tipo.includes('excel') || archivo.tipo.includes('spreadsheet')) return 'table_chart';
    if (archivo.tipo.includes('text')) return 'text_snippet';
    return 'attach_file';
  }

  /**
   * Formatea el tamaño de un archivo
   * @param bytes Tamaño en bytes
   * @returns Tamaño formateado
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Obtiene el tipo MIME de un archivo por su extensión
   * @param filename Nombre del archivo
   * @returns Tipo MIME
   * @private
   */
  private getTipoMime(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      'pdf': 'application/pdf',
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'txt': 'text/plain'
    };
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }

  /**
   * Formatea una fecha
   * @param dateString Fecha en formato ISO
   * @returns Fecha formateada
   */
  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  }
}
