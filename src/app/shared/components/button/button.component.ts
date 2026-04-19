/**
 * @fileoverview Componente de botón reutilizable con múltiples variantes y estados
 * 
 * **Características:**
 * - Múltiples variantes: primary, secondary, danger, success, outline
 * - Tamaños configurables: small, medium, large
 * - Estados: loading, disabled
 * - Soporte para iconos (emoji o clases de iconos)
 * - Accesibilidad completa con ARIA attributes
 * - Eventos de click propagados al componente padre
 * 
 * **Uso:**
 * ```html
 * <!-- Botón primario básico -->
 * <app-button (click)="guardar()">Guardar</app-button>
 * 
 * <!-- Botón con variante y tamaño -->
 * <app-button variant="danger" size="large" (click)="eliminar()">
 *   Eliminar
 * </app-button>
 * 
 * <!-- Botón con loading -->
 * <app-button [loading]="guardando" (click)="guardar()">
 *   Guardar Cambios
 * </app-button>
 * 
 * <!-- Botón con icono -->
 * <app-button variant="success" icon="✓" (click)="confirmar()">
 *   Confirmar
 * </app-button>
 * 
 * <!-- Botón deshabilitado -->
 * <app-button [disabled]="!formularioValido" (click)="enviar()">
 *   Enviar
 * </app-button>
 * 
 * <!-- Botón outline (borde sin relleno) -->
 * <app-button variant="outline-primary" (click)="cancelar()">
 *   Cancelar
 * </app-button>
 * ```
 * 
 * @author Equipo SWO
 * @version 1.0.0
 * @since 2026-04-19
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Variantes de estilo disponibles para el botón
 */
export type ButtonVariant = 
  | 'primary'          // Azul, acción principal
  | 'secondary'        // Gris, acción secundaria
  | 'danger'           // Rojo, acciones destructivas
  | 'success'          // Verde, confirmaciones
  | 'warning'          // Naranja, advertencias
  | 'outline-primary'  // Borde azul, fondo transparente
  | 'outline-secondary'// Borde gris, fondo transparente
  | 'outline-danger'   // Borde rojo, fondo transparente
  | 'ghost';           // Solo texto, sin borde ni fondo

/**
 * Tamaños disponibles para el botón
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Tipo del botón HTML
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Componente Button reutilizable
 * 
 * Proporciona un botón consistente con variantes de estilo, tamaños,
 * estados de loading/disabled y soporte para iconos.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  /**
   * Variante de estilo del botón
   * @default 'primary'
   */
  @Input() variant: ButtonVariant = 'primary';

  /**
   * Tamaño del botón
   * @default 'medium'
   */
  @Input() size: ButtonSize = 'medium';

  /**
   * Tipo del botón HTML
   * @default 'button'
   */
  @Input() type: ButtonType = 'button';

  /**
   * Si el botón está deshabilitado
   * @default false
   */
  @Input() disabled: boolean = false;

  /**
   * Si el botón está en estado de carga
   * Muestra un spinner y deshabilita el botón
   * @default false
   */
  @Input() loading: boolean = false;

  /**
   * Icono a mostrar (emoji o clase CSS)
   * @example '✓' | '✕' | 'icon-save'
   * @optional
   */
  @Input() icon?: string;

  /**
   * Posición del icono relativa al texto
   * @default 'left'
   */
  @Input() iconPosition: 'left' | 'right' = 'left';

  /**
   * Ancho completo (100%)
   * @default false
   */
  @Input() fullWidth: boolean = false;

  /**
   * Clase CSS adicional
   * @optional
   */
  @Input() customClass?: string;

  /**
   * Aria label para accesibilidad
   * @optional
   */
  @Input() ariaLabel?: string;

  /**
   * Evento emitido al hacer click
   * Solo se emite si el botón no está disabled o loading
   */
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  /**
   * Maneja el evento de click del botón
   * 
   * Previene la propagación si el botón está disabled o loading.
   * Emite el evento al componente padre.
   * 
   * @param event - Evento del mouse
   */
  handleClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.buttonClick.emit(event);
  }

  /**
   * Obtiene las clases CSS del botón según su configuración
   * 
   * @returns String con todas las clases CSS aplicables
   */
  getButtonClasses(): string {
    const classes = [
      'btn',
      `btn-${this.variant}`,
      `btn-${this.size}`,
    ];

    if (this.fullWidth) {
      classes.push('btn-full-width');
    }

    if (this.loading) {
      classes.push('btn-loading');
    }

    if (this.customClass) {
      classes.push(this.customClass);
    }

    return classes.join(' ');
  }

  /**
   * Verifica si el botón está efectivamente deshabilitado
   * (por disabled o por loading)
   * 
   * @returns true si el botón no debe ser clickeable
   */
  isDisabled(): boolean {
    return this.disabled || this.loading;
  }
}
