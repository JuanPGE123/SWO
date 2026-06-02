import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthComponent } from './auth.component';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

/**
 * Pruebas Unitarias para AuthComponent
 *
 * Cobertura:
 * - Inicialización del formulario reactivo
 * - Happy Path: Login exitoso redirige a dashboard
 * - Error: Credenciales inválidas muestra mensaje de error
 * - Validación: Email con formato inválido
 * - Validación: Password con menos de 6 caracteres
 * - Estado: Botón deshabilitado con formulario inválido
 * - Estado: Redirección si ya está autenticado
 *
 * @author Equipo SWO
 * @version 1.0
 */
describe('AuthComponent - Pruebas Unitarias', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'isAutenticado']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['toast']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    authServiceSpy.isAutenticado.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [AuthComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Inicialización ────────────────────────────────────────────────────────

  it('✅ Debe crear el componente AuthComponent', () => {
    expect(component).toBeTruthy();
  });

  it('✅ El formulario debe inicializarse con campos vacíos', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('✅ Si ya está autenticado, redirige al dashboard en ngOnInit', () => {
    authServiceSpy.isAutenticado.and.returnValue(true);
    component.ngOnInit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  // ── Happy Path ────────────────────────────────────────────────────────────

  it('✅ HAPPY PATH: Login exitoso redirige al dashboard', fakeAsync(() => {
    // ARRANGE
    authServiceSpy.login.and.returnValue(of(true));
    component.loginForm.setValue({ email: 'admin@swo.com', password: 'Admin123' });

    // ACT
    component.onSubmit();
    tick();

    // ASSERT
    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.isLoading).toBeFalse();
    expect(component.errorMessage).toBe('');
  }));

  // ── Errores de autenticación ──────────────────────────────────────────────

  it('❌ ERROR: Login fallido (retorna false) muestra mensaje de error', fakeAsync(() => {
    // ARRANGE
    authServiceSpy.login.and.returnValue(of(false));
    component.loginForm.setValue({ email: 'admin@swo.com', password: 'Wrong123' });

    // ACT
    component.onSubmit();
    tick();

    // ASSERT
    expect(component.errorMessage).toBeTruthy();
    expect(component.isLoading).toBeFalse();
    expect(routerSpy.navigate).not.toHaveBeenCalledWith(['/dashboard']);
  }));

  it('❌ ERROR: Error de red muestra mensaje de error', fakeAsync(() => {
    // ARRANGE
    authServiceSpy.login.and.returnValue(throwError(() => ({ status: 500 })));
    component.loginForm.setValue({ email: 'admin@swo.com', password: 'Admin123' });

    // ACT
    component.onSubmit();
    tick();

    // ASSERT
    expect(component.errorMessage).toBeTruthy();
    expect(component.isLoading).toBeFalse();
  }));

  it('❌ ERROR: Usuario eliminado muestra mensaje específico', fakeAsync(() => {
    // ARRANGE
    authServiceSpy.login.and.returnValue(throwError(() => ({ deleted: true })));
    component.loginForm.setValue({ email: 'deleted@swo.com', password: 'Admin123' });

    // ACT
    component.onSubmit();
    tick();

    // ASSERT
    expect(component.errorMessage).toBeTruthy();
    expect(component.isLoading).toBeFalse();
  }));

  // ── Validaciones del formulario ───────────────────────────────────────────

  it('❌ VALIDACIÓN: Email vacío hace el formulario inválido', () => {
    component.loginForm.setValue({ email: '', password: 'Admin123' });
    expect(component.loginForm.get('email')?.hasError('required')).toBeTrue();
    expect(component.isFormValid).toBeFalse();
  });

  it('❌ VALIDACIÓN: Email con formato inválido hace el formulario inválido', () => {
    component.loginForm.setValue({ email: 'no-es-email', password: 'Admin123' });
    expect(component.loginForm.get('email')?.hasError('email')).toBeTrue();
    expect(component.isFormValid).toBeFalse();
  });

  it('❌ VALIDACIÓN: Password vacío hace el formulario inválido', () => {
    component.loginForm.setValue({ email: 'admin@swo.com', password: '' });
    expect(component.loginForm.get('password')?.hasError('required')).toBeTrue();
    expect(component.isFormValid).toBeFalse();
  });

  it('❌ VALIDACIÓN: Password con menos de 6 caracteres es inválido', () => {
    component.loginForm.setValue({ email: 'admin@swo.com', password: '123' });
    expect(component.loginForm.get('password')?.hasError('minlength')).toBeTrue();
    expect(component.isFormValid).toBeFalse();
  });

  it('✅ VALIDACIÓN: Formulario válido con email y password correctos', () => {
    component.loginForm.setValue({ email: 'admin@swo.com', password: 'Admin123' });
    expect(component.isFormValid).toBeTrue();
  });

  // ── Estado del botón ──────────────────────────────────────────────────────

  it('✅ Botón Submit deshabilitado cuando formulario es inválido', () => {
    component.loginForm.setValue({ email: '', password: '' });
    expect(component.isSubmitDisabled).toBeTrue();
  });

  it('✅ Botón Submit deshabilitado durante carga (isLoading = true)', () => {
    component.loginForm.setValue({ email: 'admin@swo.com', password: 'Admin123' });
    component.isLoading = true;
    expect(component.isSubmitDisabled).toBeTrue();
  });

  it('✅ Botón Submit habilitado con formulario válido y sin carga', () => {
    component.loginForm.setValue({ email: 'admin@swo.com', password: 'Admin123' });
    component.isLoading = false;
    expect(component.isSubmitDisabled).toBeFalse();
  });

  // ── Getters de mensajes de error ──────────────────────────────────────────

  it('✅ emailError retorna vacío si el campo no fue tocado', () => {
    component.loginForm.get('email')?.setValue('');
    expect(component.emailError).toBe('');
  });

  it('✅ emailError retorna mensaje de obligatoriedad cuando campo tocado y vacío', () => {
    const emailCtrl = component.loginForm.get('email');
    emailCtrl?.setValue('');
    emailCtrl?.markAsTouched();
    expect(component.emailError).toContain('obligatorio');
  });

  it('✅ emailError retorna mensaje de formato cuando email inválido y tocado', () => {
    const emailCtrl = component.loginForm.get('email');
    emailCtrl?.setValue('no-es-email');
    emailCtrl?.markAsTouched();
    expect(component.emailError).toContain('válido');
  });

  it('✅ passwordError retorna mensaje cuando contraseña muy corta y tocada', () => {
    const pwCtrl = component.loginForm.get('password');
    pwCtrl?.setValue('123');
    pwCtrl?.markAsTouched();
    expect(component.passwordError).toContain('caracteres');
  });

  // ── Submit con formulario inválido ────────────────────────────────────────

  it('✅ onSubmit con formulario inválido no llama al servicio', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.onSubmit();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });
});
