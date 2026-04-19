/**
 * @fileoverview Componente de input reutilizable con validación y accesibilidad
 * 
 * **Características:**
 * - Múltiples tipos: text, email, password, number, tel, textarea
 * - Validación visual integrada (válido/inválido)
 * - Mensajes de error personalizables
 * - Soporte para label, placeholder, hint
 * - Iconos opcionales (prefijo y sufijo)
 * - Estados: disabled, readonly, required
 * - Integración completa con Angular Reactive Forms
 * - Accesibilidad completa (ARIA, labels, describedby)
 * - Auto-resize para textarea
 * 
 * **Uso:**
 * ```html
 * <!-- Input básico -->
 * <app-input
 *   label="Correo electrónico"
 *   type="email"
 *   placeholder="usuario@ejemplo.com"
 *   [(ngModel)]="email"
 * ></app-input>
 * 
 * <!-- Input con validación -->
 * <app-input
 *   label="Nombre"
 *   [formControl]="nombreControl"
 *   [error]="nombreControl.hasError('required') ? 'El nombre es obligatorio' : ''"
 *   required
 * ></app-input>
 * 
 * <!-- Input con iconos -->
 * <app-input
 *   label="Búsqueda"
 *   type="text"
 *   prefixIcon="🔍"
 *   [(ngModel)]="searchTerm"
 * ></app-input>
 * 
 * <!-- Textarea con auto-resize -->
 * <app-input
 *   label="Descripción"
 *   type="textarea"
 *   rows="3"
 *   maxlength="500"
 *   hint="Máximo 500 caracteres"
 *   [(ngModel)]="descripcion"
 * ></app-input>
 * 
 * <!-- Password con toggle de visibilidad -->
 * <app-input
 *   label="Contraseña"
 *   type="password"
 *   [showPasswordToggle]="true"
 *   [(ngModel)]="password"
 * ></app-input>
 * ```
 * 
 * @author Equipo SWO
 * @version 1.0.0
 * @since 2026-04-19
 */

import { Component, Input, forwardRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * Tipos de input soportados
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'textarea';

/**
 * Componente Input reutilizable con validación visual
 * 
 * Implementa ControlValueAccessor para integración con Angular Forms.
 */
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnInit {
  /**
   * Tipo de input
   * @default 'text'
   */
  @Input() type: InputType = 'text';

  /**
   * Etiqueta del campo
   * @example 'Correo electrónico' | 'Nombre completo'
   */
  @Input() label?: string;

  /**
   * Placeholder del input
   * @example 'usuario@ejemplo.com'
   */
  @Input() placeholder?: string;

  /**
   * Texto de ayuda que aparece debajo del input
   * @example 'Ingrese su correo corporativo'
   */
  @Input() hint?: string;

  /**
   * Mensaje de error a mostrar
   * Solo se muestra si el campo es inválido
   * @example 'El correo es obligatorio'
   */
  @Input() error?: string;

  /**
   * Si el campo es obligatorio
   * @default false
   */
  @Input() required: boolean = false;

  /**
   * Si el campo está deshabilitado
   * @default false
   */
  @Input() disabled: boolean = false;

  /**
   * Si el campo es de solo lectura
   * @default false
   */
  @Input() readonly: boolean = false;

  /**
   * Longitud mínima del texto
   * @optional
   */
  @Input() minlength?: number;

  /**
   * Longitud máxima del texto
   * @optional
   */
  @Input() maxlength?: number;

  /**
   * Valor mínimo (para type="number")
   * @optional
   */
  @Input() min?: number;

  /**
   * Valor máximo (para type="number")
   * @optional
   */
  @Input() max?: number;

  /**
   * Patrón regex para validación
   * @optional
   * @example '^[0-9]{10}$' para 10 dígitos
   */
  @Input() pattern?: string;

  /**
   * Icono prefijo (emoji o clase CSS)
   * @optional
   * @example '📧' | 'icon-email'
   */
  @Input() prefixIcon?: string;

  /**
   * Icono sufijo (emoji o clase CSS)
   * @optional
   * @example '✓' | 'icon-check'
   */
  @Input() suffixIcon?: string;

  /**
   * Autocompletar del navegador
   * @default 'off'
   */
  @Input() autocomplete: string = 'off';

  /**
   * Número de filas (solo para textarea)
   * @default 3
   */
  @Input() rows: number = 3;

  /**
   * Habilitar auto-resize para textarea
   * @default true
   */
  @Input() autoResize: boolean = true;

  /**
   * Mostrar botón de toggle para contraseñas
   * @default false
   */
  @Input() showPasswordToggle: boolean = false;

  /**
   * Clase CSS adicional para el contenedor
   * @optional
   */
  @Input() customClass?: string;

  /**
   * ID único del input
   * Se genera automáticamente si no se proporciona
   */
  @Input() inputId: string = `input-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * Referencia al elemento input/textarea
   */
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

  /**
   * Valor interno del input
   * @private
   */
  value: string = '';

  /**
   * Si la contraseña está visible (para type="password")
   * @private
   */
  showPassword: boolean = false;

  /**
   * Si el input ha sido tocado
   * @private
   */
  touched: boolean = false;

  /**
   * Callbacks de ControlValueAccessor
   * @private
   */
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    // Configuración inicial si es necesaria
  }

  // ═════════════════════════════════════════════════════════════════════════
  // IMPLEMENTACIÓN DE ControlValueAccessor
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Escribe un nuevo valor en el componente
   * @param value - Nuevo valor del input
   */
  writeValue(value: string): void {
    this.value = value || '';
  }

  /**
   * Registra una función callback para cambios de valor
   * @param fn - Función a llamar cuando cambia el valor
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Registra una función callback para el evento touch
   * @param fn - Función a llamar cuando el input es tocado
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Establece el estado deshabilitado
   * @param isDisabled - Si el input debe estar deshabilitado
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MANEJADORES DE EVENTOS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Maneja el evento input (cuando cambia el valor)
   * @param event - Evento del input
   */
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);

    // Auto-resize para textarea
    if (this.type === 'textarea' && this.autoResize) {
      this.resizeTextarea();
    }
  }

  /**
   * Maneja el evento blur (cuando el input pierde el foco)
   */
  onBlur(): void {
    this.touched = true;
    this.onTouched();
  }

  /**
   * Alterna la visibilidad de la contraseña
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Auto-ajusta la altura del textarea según su contenido
   * @private
   */
  private resizeTextarea(): void {
    if (this.inputElement && this.type === 'textarea') {
      const textarea = this.inputElement.nativeElement as HTMLTextAreaElement;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // UTILIDADES
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Obtiene el tipo actual del input (considerando showPassword)
   * @returns Tipo de input HTML
   */
  getInputType(): string {
    if (this.type === 'password' && this.showPassword) {
      return 'text';
    }
    return this.type === 'textarea' ? 'text' : this.type;
  }

  /**
   * Verifica si el input debe mostrar estado de error
   * @returns true si debe mostrar error
   */
  shouldShowError(): boolean {
    return !!this.error && this.touched;
  }

  /**
   * Obtiene las clases CSS del contenedor
   * @returns String con las clases CSS
   */
  getContainerClasses(): string {
    const classes = ['input-container'];

    if (this.customClass) {
      classes.push(this.customClass);
    }

    if (this.shouldShowError()) {
      classes.push('input-container-error');
    }

    if (this.disabled) {
      classes.push('input-container-disabled');
    }

    return classes.join(' ');
  }

  /**
   * Obtiene las clases CSS del input
   * @returns String con las clases CSS
   */
  getInputClasses(): string {
    const classes = ['input-field'];

    if (this.prefixIcon) {
      classes.push('input-with-prefix');
    }

    if (this.suffixIcon || (this.type === 'password' && this.showPasswordToggle)) {
      classes.push('input-with-suffix');
    }

    if (this.shouldShowError()) {
      classes.push('input-error');
    }

    return classes.join(' ');
  }
}
