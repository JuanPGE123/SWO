/**
 * auth.component.ts
 * 
 * Componente de autenticación / login.
 * Proporciona un formulario para que los usuarios inicien sesión.
 * 
 * Funcionalidades:
 * - Formulario reactivo con validación
 * - Toggle de visibilidad de contraseña
 * - Manejo de carga del logo con fallback
 * - Redirect a dashboard tras login exitoso
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { Credenciales } from '../../core/models/models';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  // Estado del formulario
  email: string = '';
  password: string = '';
  project: string = '101';
  
  // Estado de UI
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  /**
   * Constructor inyecta los servicios necesarios
   */
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  /**
   * ngOnInit: se ejecuta al inicializar el componente
   * - Verifica si ya hay una sesión activa
   * - Configura listeners de eventos
   */
  ngOnInit(): void {
    // Si ya hay un usuario autenticado, redirigimos al dashboard
    if (this.authService.isAutenticado()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    // Configurar listeners para manejo del logo
    this.setupLogoHandling();
  }

  /**
   * Método togglePassword: alterna la visibilidad de la contraseña
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Método onSubmit: maneja el envío del formulario de login
   * 
   * @param event - Evento del formulario
   */
  onSubmit(event: Event): void {
    event.preventDefault();

    // Validaciones básicas
    if (!this.email || !this.password || !this.project) {
      this.errorMessage = 'Por favor rellena todos los campos.';
      this.notificationService.toast('Por favor rellena todos los campos.', 3000, 'warning');
      return;
    }

    // Establecer estado de carga
    this.isLoading = true;
    this.errorMessage = '';

    // Preparar credenciales
    const credenciales: Credenciales = {
      email: this.email.trim(),
      password: this.password,
      project: this.project
    };

    // Llamar al servicio de autenticación
    this.authService.login(credenciales).subscribe(
      (success: boolean) => {
        this.isLoading = false;

        if (success) {
          // Autenticación exitosa
          this.notificationService.toast('¡Autenticación exitosa!', 3000, 'success');
          this.router.navigate(['/dashboard']);
        } else {
          // Autenticación fallida
          this.errorMessage = 'Credenciales incorrectas o proyecto no válido.';
          this.notificationService.toast(this.errorMessage, 3000, 'error');
        }
      },
      (error: any) => {
        this.isLoading = false;
        this.errorMessage = 'Error en la autenticación. Intenta de nuevo.';
        this.notificationService.toast(this.errorMessage, 3000, 'error');
      }
    );
  }

  /**
   * Método privado setupLogoHandling: configura el manejo del logo con fallback
   */
  private setupLogoHandling(): void {
    // Este método se puede expandir si se necesita más lógica de manejo de logo
  }
}
