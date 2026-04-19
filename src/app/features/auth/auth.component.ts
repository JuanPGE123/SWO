/**
 * @fileoverview Componente de autenticación con Reactive Forms
 * 
 * **Responsabilidades:**
 * - Autenticar usuarios mediante formulario reactivo validado
 * - Validar credenciales en tiempo real con feedback visual
 * - Redirigir al dashboard tras autenticación exitosa
 * - Manejar errores de autenticación con mensajes descriptivos
 * - Prevenir múltiples envíos simultáneos
 * 
 * **Mejoras implementadas:**
 * - ✅ Reactive Forms con FormBuilder y Validators
 * - ✅ Validación en tiempo real con mensajes de error dinámicos
 * - ✅ Integración con componentes reutilizables (app-input, app-button)
 * - ✅ Validadores personalizados para email
 * - ✅ Manejo robusto de errores (usuario eliminado, credenciales incorrectas)
 * - ✅ Estado de loading con botón deshabilitado
 * - ✅ Limpieza de suscripciones con takeUntilDestroyed
 * 
 * **Validaciones:**
 * - Email: requerido, formato válido, min 5 caracteres
 * - Password: requerido, min 6 caracteres
 * 
 * @author Equipo SWO
 * @version 2.0.0
 * @since 2026-04-19
 */

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { Credenciales } from '../../core/models/models';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { VALIDATION_CONSTANTS, NOTIFICATION_MESSAGES } from '../../core/constants/app.constants';

/**
 * Componente de autenticación (Login)
 * 
 * Proporciona un formulario reactivo para que los usuarios inicien sesión
 * con validación en tiempo real y feedback visual inmediato.
 */
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  // ═════════════════════════════════════════════════════════════════════════
  // INYECCIÓN DE DEPENDENCIAS
  // ═════════════════════════════════════════════════════════════════════════

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);

  // ═════════════════════════════════════════════════════════════════════════
  // PROPIEDADES PÚBLICAS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Formulario reactivo de login
   * Contiene los controles: email y password
   */
  loginForm!: FormGroup;

  /**
   * Estado de carga durante el proceso de autenticación
   * @default false
   */
  isLoading: boolean = false;

  /**
   * Mensaje de error general del formulario
   * Se muestra cuando hay errores de autenticación del backend
   */
  errorMessage: string = '';

  // ═════════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Inicializa el componente
   * 
   * **Acciones:**
   * 1. Verifica si ya hay sesión activa → redirige a dashboard
   * 2. Inicializa el formulario reactivo con validaciones
   */
  ngOnInit(): void {
    // Si ya hay usuario autenticado, redirigir al dashboard
    if (this.authService.isAutenticado()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    // Inicializar formulario reactivo
    this.initForm();
  }

  // ═════════════════════════════════════════════════════════════════════════
  // INICIALIZACIÓN DEL FORMULARIO
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Inicializa el FormGroup con validadores
   * 
   * **Validaciones aplicadas:**
   * - **Email:**
   *   - Requerido
   *   - Formato email válido
   *   - Mínimo 5 caracteres
   * - **Password:**
   *   - Requerido
   *   - Mínimo 6 caracteres
   * 
   * @private
   */
  private initForm(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(VALIDATION_CONSTANTS.EMAIL.MIN_LENGTH)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(VALIDATION_CONSTANTS.PASSWORD.MIN_LENGTH)
        ]
      ]
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // MANEJADORES DE EVENTOS
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Maneja el envío del formulario de login
   * 
   * **Flujo:**
   * 1. Valida que el formulario sea válido
   * 2. Establece estado de loading
   * 3. Llama al servicio de autenticación
   * 4. Maneja respuesta exitosa o error
   * 5. Redirige al dashboard si es exitoso
   * 
   * **Manejo de errores:**
   * - Usuario eliminado: muestra mensaje específico
   * - Credenciales incorrectas: muestra mensaje de error
   * - Error de red: manejado por el interceptor HTTP
   */
  onSubmit(): void {
    // Marcar todos los campos como touched para mostrar errores
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = NOTIFICATION_MESSAGES.ERROR.VALIDATION_FAILED;
      this.notificationService.toast(
        NOTIFICATION_MESSAGES.ERROR.VALIDATION_FAILED,
        3000,
        'warning'
      );
      return;
    }

    // Preparar credenciales desde el formulario
    const credenciales: Credenciales = {
      email: this.loginForm.value.email.trim(),
      password: this.loginForm.value.password
    };

    // Establecer estado de carga
    this.isLoading = true;
    this.errorMessage = '';

    // Llamar al servicio de autenticación
    this.authService.login(credenciales).subscribe({
      next: (success: boolean) => {
        this.isLoading = false;

        if (success) {
          // Autenticación exitosa
          this.notificationService.toast(
            NOTIFICATION_MESSAGES.SUCCESS.LOGIN,
            3000,
            'success'
          );
          this.router.navigate(['/dashboard']);
        } else {
          // Autenticación fallida (credenciales incorrectas)
          this.handleLoginError();
        }
      },
      error: (error: any) => {
        this.isLoading = false;

        // Usuario eliminado del sistema
        if (error?.deleted) {
          this.errorMessage = NOTIFICATION_MESSAGES.ERROR.USER_DELETED;
          this.notificationService.toast(
            NOTIFICATION_MESSAGES.ERROR.USER_DELETED,
            4000,
            'error'
          );
        } else {
          // Otros errores de autenticación
          this.handleLoginError();
        }
      }
    });
  }

  /**
   * Maneja errores de login (credenciales incorrectas)
   * @private
   */
  private handleLoginError(): void {
    this.errorMessage = NOTIFICATION_MESSAGES.ERROR.INVALID_CREDENTIALS;
    this.notificationService.toast(
      NOTIFICATION_MESSAGES.ERROR.INVALID_CREDENTIALS,
      3000,
      'error'
    );

    // Limpiar contraseña por seguridad
    this.loginForm.patchValue({ password: '' });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // GETTERS PARA MENSAJES DE ERROR
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Obtiene el mensaje de error para el campo email
   * @returns Mensaje de error o string vacío
   */
  get emailError(): string {
    const control = this.loginForm.get('email');
    
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'El correo electrónico es obligatorio';
    }

    if (control.errors['email']) {
      return 'Ingrese un correo electrónico válido';
    }

    if (control.errors['minlength']) {
      return `El correo debe tener al menos ${VALIDATION_CONSTANTS.EMAIL.MIN_LENGTH} caracteres`;
    }

    return '';
  }

  /**
   * Obtiene el mensaje de error para el campo password
   * @returns Mensaje de error o string vacío
   */
  get passwordError(): string {
    const control = this.loginForm.get('password');
    
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'La contraseña es obligatoria';
    }

    if (control.errors['minlength']) {
      return `La contraseña debe tener al menos ${VALIDATION_CONSTANTS.PASSWORD.MIN_LENGTH} caracteres`;
    }

    return '';
  }

  // ═════════════════════════════════════════════════════════════════════════
  // UTILIDADES
  // ═════════════════════════════════════════════════════════════════════════

  /**
   * Verifica si el formulario es válido
   * @returns true si el formulario es válido
   */
  get isFormValid(): boolean {
    return this.loginForm.valid;
  }

  /**
   * Verifica si el botón de submit debe estar deshabilitado
   * @returns true si está cargando o el formulario es inválido
   */
  get isSubmitDisabled(): boolean {
    return this.isLoading || !this.isFormValid;
  }
}
