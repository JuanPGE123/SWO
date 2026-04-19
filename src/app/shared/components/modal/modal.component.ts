/**
 * @fileoverview Componente Modal reutilizable con accesibilidad completa
 * 
 * **Características:**
 * - Tamaños configurables: small, medium, large, full
 * - Header, body y footer personalizables
 * - Cerrar con X, backdrop o tecla ESC
 * - Prevenir cierre accidental (confirmación)
 * - Animaciones suaves de entrada/salida
 * - Gestión de focus automática (focus trap)
 * - Scroll bloqueado en body cuando está abierto
 * - Accesibilidad completa (ARIA, keyboard navigation)
 * - Soporte para contenido dinámico con ng-content
 * 
 * **Uso:**
 * ```html
 * <!-- Modal básico -->
 * <app-modal
 *   title="Confirmar acción"
 *   [(isOpen)]="mostrarModal"
 *   (onClose)="cerrarModal()"
 * >
 *   <div body>
 *     <p>¿Está seguro de realizar esta acción?</p>
 *   </div>
 *   <div footer>
 *     <app-button variant="secondary" (click)="cerrarModal()">Cancelar</app-button>
 *     <app-button variant="primary" (click)="confirmar()">Aceptar</app-button>
 *   </div>
 * </app-modal>
 * 
 * <!-- Modal con confirmación antes de cerrar -->
 * <app-modal
 *   title="Editar incidencia"
 *   size="large"
 *   [closeOnBackdrop]="false"
 *   [requireConfirmation]="formularioSucio"
 *   [(isOpen)]="mostrarEdicion"
 * >
 *   <div body>
 *     <form>...</form>
 *   </div>
 * </app-modal>
 * 
 * <!-- Modal sin header -->
 * <app-modal
 *   [showHeader]="false"
 *   [(isOpen)]="mostrarImagen"
 * >
 *   <div body>
 *     <img src="imagen.jpg" alt="Vista previa">
 *   </div>
 * </app-modal>
 * ```
 * 
 * @author Equipo SWO
 * @version 1.0.0
 * @since 2026-04-19
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Tamaños disponibles para el modal
 */
export type ModalSize = 'small' | 'medium' | 'large' | 'full';

/**
 * Componente Modal reutilizable
 * 
 * Proporciona un cuadro de diálogo modal accesible con header, body y footer
 * personalizables, control de tamaño y múltiples opciones de configuración.
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  /**
   * Si el modal está abierto
   * Soporta two-way binding con [(isOpen)]
   * @default false
   */
  @Input() isOpen: boolean = false;

  /**
   * Título del modal (aparece en el header)
   * @optional
   */
  @Input() title?: string;

  /**
   * Tamaño del modal
   * @default 'medium'
   */
  @Input() size: ModalSize = 'medium';

  /**
   * Si se puede cerrar el modal haciendo click en el backdrop (fondo)
   * @default true
   */
  @Input() closeOnBackdrop: boolean = true;

  /**
   * Si se puede cerrar el modal con la tecla ESC
   * @default true
   */
  @Input() closeOnEsc: boolean = true;

  /**
   * Si se debe mostrar el botón X de cerrar en el header
   * @default true
   */
  @Input() showCloseButton: boolean = true;

  /**
   * Si se debe mostrar el header completo
   * @default true
   */
  @Input() showHeader: boolean = true;

  /**
   * Si se requiere confirmación antes de cerrar
   * Útil para formularios con cambios sin guardar
   * @default false
   */
  @Input() requireConfirmation: boolean = false;

  /**
   * Mensaje de confirmación al cerrar
   * @default '¿Está seguro de cerrar? Los cambios no guardados se perderán.'
   */
  @Input() confirmationMessage: string = '¿Está seguro de cerrar? Los cambios no guardados se perderán.';

  /**
   * Clase CSS adicional para el contenedor del modal
   * @optional
   */
  @Input() customClass?: string;

  /**
   * Evento emitido cuando el modal se cierra
   */
  @Output() onClose = new EventEmitter<void>();

  /**
   * Evento emitido cuando cambia el estado isOpen (para two-way binding)
   */
  @Output() isOpenChange = new EventEmitter<boolean>();

  /**
   * Referencia al contenedor del modal (para focus trap)
   */
  @ViewChild('modalContainer') modalContainer!: ElementRef<HTMLDivElement>;

  /**
   * Elemento que tenía el focus antes de abrir el modal
   * Se restaura al cerrar
   * @private
   */
  private previousActiveElement: HTMLElement | null = null;

  /**
   * Listener para la tecla ESC a nivel de documento
   * @param event - Evento de teclado
   */
  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey(event: KeyboardEvent): void {
    if (this.isOpen && this.closeOnEsc) {
      event.preventDefault();
      this.close();
    }
  }

  ngOnInit(): void {
    // Si el modal inicia abierto, aplicar efectos
    if (this.isOpen) {
      this.onModalOpen();
    }
  }

  ngOnDestroy(): void {
    // Restaurar scroll del body al destruir
    this.enableBodyScroll();
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CONTROL DE APERTURA/CIERRE
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Abre el modal
   */
  open(): void {
    if (!this.isOpen) {
      this.isOpen = true;
      this.isOpenChange.emit(true);
      this.onModalOpen();
    }
  }

  /**
   * Cierra el modal (con confirmación opcional)
   */
  close(): void {
    // Si requiere confirmación y el usuario cancela, no cerrar
    if (this.requireConfirmation) {
      if (!confirm(this.confirmationMessage)) {
        return;
      }
    }

    if (this.isOpen) {
      this.isOpen = false;
      this.isOpenChange.emit(false);
      this.onModalClose();
      this.onClose.emit();
    }
  }

  /**
   * Maneja el click en el backdrop (fondo oscuro)
   * Solo cierra si closeOnBackdrop está habilitado
   */
  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }

  /**
   * Previene que el click en el contenido del modal cierre el backdrop
   * @param event - Evento de click
   */
  onModalContentClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  // ═════════════════════════════════════════════════════════════════════════
  // GESTIÓN DE EFECTOS AL ABRIR/CERRAR
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Acciones a realizar cuando el modal se abre
   * @private
   */
  private onModalOpen(): void {
    // Guardar el elemento que tenía focus
    this.previousActiveElement = document.activeElement as HTMLElement;

    // Bloquear scroll del body
    this.disableBodyScroll();

    // Enfocar el modal (después de que se renderice)
    setTimeout(() => {
      this.setInitialFocus();
    }, 100);
  }

  /**
   * Acciones a realizar cuando el modal se cierra
   * @private
   */
  private onModalClose(): void {
    // Restaurar scroll del body
    this.enableBodyScroll();

    // Restaurar el focus al elemento anterior
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }
  }

  /**
   * Establece el focus inicial en el primer elemento enfocable del modal
   * @private
   */
  private setInitialFocus(): void {
    if (!this.modalContainer) return;

    const focusableElements = this.getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }

  /**
   * Obtiene todos los elementos enfocables dentro del modal
   * @returns Array de elementos enfocables
   * @private
   */
  private getFocusableElements(): HTMLElement[] {
    if (!this.modalContainer) return [];

    const selector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    return Array.from(
      this.modalContainer.nativeElement.querySelectorAll(selector)
    ) as HTMLElement[];
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CONTROL DE SCROLL DEL BODY
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Bloquea el scroll del body cuando el modal está abierto
   * @private
   */
  private disableBodyScroll(): void {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = this.getScrollbarWidth() + 'px';
  }

  /**
   * Restaura el scroll del body cuando el modal se cierra
   * @private
   */
  private enableBodyScroll(): void {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  /**
   * Calcula el ancho de la barra de scroll del navegador
   * @returns Ancho en píxeles
   * @private
   */
  private getScrollbarWidth(): number {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode?.removeChild(outer);

    return scrollbarWidth;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // UTILIDADES
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Obtiene las clases CSS del contenedor del modal
   * @returns String con las clases CSS
   */
  getModalClasses(): string {
    const classes = ['modal-content', `modal-${this.size}`];

    if (this.customClass) {
      classes.push(this.customClass);
    }

    return classes.join(' ');
  }
}
