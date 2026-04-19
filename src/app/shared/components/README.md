# Componentes Reutilizables UI - SWO

Este directorio contiene componentes UI reutilizables diseñados con los más altos estándares de calidad, accesibilidad y mejores prácticas de Angular.

## 📦 Componentes Disponibles

### 1. **ButtonComponent** (`app-button`)
Botón reutilizable con múltiples variantes, tamaños y estados.

**Características:**
- ✅ 9 variantes de estilo (primary, secondary, danger, success, warning, outline, ghost)
- ✅ 3 tamaños (small, medium, large)
- ✅ Estado de loading con spinner animado
- ✅ Soporte para iconos (prefijo/sufijo)
- ✅ Accesibilidad completa (ARIA, keyboard navigation)
- ✅ Animaciones suaves y responsive
- ✅ Respeta preferencias del sistema (reduced-motion, high-contrast)

**Uso básico:**
```html
<!-- Botón primario -->
<app-button (click)="guardar()">Guardar</app-button>

<!-- Botón con loading -->
<app-button [loading]="guardando" (click)="guardar()">
  Guardar Cambios
</app-button>

<!-- Botón peligroso con icono -->
<app-button variant="danger" icon="🗑️" (click)="eliminar()">
  Eliminar
</app-button>

<!-- Botón grande deshabilitado -->
<app-button 
  size="large" 
  [disabled]="!formularioValido" 
  (click)="enviar()">
  Enviar Formulario
</app-button>
```

**Props disponibles:**
| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `variant` | ButtonVariant | 'primary' | Estilo del botón |
| `size` | ButtonSize | 'medium' | Tamaño del botón |
| `type` | ButtonType | 'button' | Tipo HTML del botón |
| `disabled` | boolean | false | Si está deshabilitado |
| `loading` | boolean | false | Estado de carga |
| `icon` | string | - | Icono (emoji o clase CSS) |
| `iconPosition` | 'left' \| 'right' | 'left' | Posición del icono |
| `fullWidth` | boolean | false | Ancho completo (100%) |
| `ariaLabel` | string | - | Label ARIA para accesibilidad |

---

### 2. **InputComponent** (`app-input`)
Campo de entrada reutilizable con validación visual y accesibilidad completa.

**Características:**
- ✅ 8 tipos de input (text, email, password, number, tel, url, search, textarea)
- ✅ Validación visual integrada (válido/inválido)
- ✅ Mensajes de error y hints
- ✅ Iconos opcionales (prefijo y sufijo)
- ✅ Toggle de visibilidad para contraseñas
- ✅ Auto-resize para textarea
- ✅ Integración completa con Angular Reactive Forms
- ✅ Contador de caracteres para maxlength
- ✅ Accesibilidad completa (ARIA, labels, describedby)

**Uso básico:**
```html
<!-- Input simple -->
<app-input
  label="Correo electrónico"
  type="email"
  placeholder="usuario@ejemplo.com"
  [(ngModel)]="email"
></app-input>

<!-- Input con validación -->
<app-input
  label="Nombre"
  [formControl]="nombreControl"
  [error]="nombreControl.hasError('required') ? 'El nombre es obligatorio' : ''"
  required
  hint="Ingrese su nombre completo"
></app-input>

<!-- Input con iconos -->
<app-input
  label="Búsqueda"
  type="search"
  prefixIcon="🔍"
  placeholder="Buscar incidencias..."
  [(ngModel)]="searchTerm"
></app-input>

<!-- Textarea con contador -->
<app-input
  label="Descripción"
  type="textarea"
  rows="4"
  maxlength="500"
  hint="Describa el problema detalladamente"
  [(ngModel)]="descripcion"
></app-input>

<!-- Password con toggle -->
<app-input
  label="Contraseña"
  type="password"
  [showPasswordToggle]="true"
  [(ngModel)]="password"
></app-input>
```

**Props disponibles:**
| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `type` | InputType | 'text' | Tipo de input |
| `label` | string | - | Etiqueta del campo |
| `placeholder` | string | - | Placeholder |
| `hint` | string | - | Texto de ayuda |
| `error` | string | - | Mensaje de error |
| `required` | boolean | false | Si es obligatorio |
| `disabled` | boolean | false | Si está deshabilitado |
| `readonly` | boolean | false | Si es de solo lectura |
| `minlength` | number | - | Longitud mínima |
| `maxlength` | number | - | Longitud máxima |
| `min` | number | - | Valor mínimo (number) |
| `max` | number | - | Valor máximo (number) |
| `pattern` | string | - | Patrón regex |
| `prefixIcon` | string | - | Icono prefijo |
| `suffixIcon` | string | - | Icono sufijo |
| `autocomplete` | string | 'off' | Autocompletar |
| `rows` | number | 3 | Filas (textarea) |
| `autoResize` | boolean | true | Auto-resize (textarea) |
| `showPasswordToggle` | boolean | false | Toggle para passwords |

---

### 3. **ModalComponent** (`app-modal`)
Cuadro de diálogo modal accesible con header, body y footer personalizables.

**Características:**
- ✅ 4 tamaños configurables (small, medium, large, full)
- ✅ Header, body y footer personalizables con ng-content
- ✅ Cerrar con botón X, backdrop o tecla ESC
- ✅ Confirmación antes de cerrar (para formularios sucios)
- ✅ Animaciones suaves de entrada/salida
- ✅ Focus trap automático
- ✅ Scroll bloqueado en body cuando está abierto
- ✅ Accesibilidad completa (ARIA dialog, keyboard navigation)
- ✅ Responsive (fullscreen en móvil)

**Uso básico:**
```html
<!-- Modal simple -->
<app-modal
  title="Confirmar acción"
  [(isOpen)]="mostrarModal"
  (onClose)="cerrarModal()"
>
  <div body>
    <p>¿Está seguro de realizar esta acción?</p>
  </div>
  <div footer>
    <app-button variant="secondary" (click)="cerrarModal()">
      Cancelar
    </app-button>
    <app-button variant="primary" (click)="confirmar()">
      Aceptar
    </app-button>
  </div>
</app-modal>

<!-- Modal grande con formulario -->
<app-modal
  title="Editar incidencia"
  size="large"
  [closeOnBackdrop]="false"
  [requireConfirmation]="formularioSucio"
  [(isOpen)]="mostrarEdicion"
>
  <div body>
    <form [formGroup]="formulario">
      <app-input label="Título" formControlName="titulo"></app-input>
      <app-input type="textarea" label="Descripción" formControlName="descripcion"></app-input>
    </form>
  </div>
  <div footer>
    <app-button variant="outline-secondary" (click)="cancelar()">
      Cancelar
    </app-button>
    <app-button 
      variant="primary" 
      [loading]="guardando"
      [disabled]="!formulario.valid"
      (click)="guardar()">
      Guardar Cambios
    </app-button>
  </div>
</app-modal>

<!-- Modal sin header -->
<app-modal
  [showHeader]="false"
  size="medium"
  [(isOpen)]="mostrarImagen"
>
  <div body>
    <img src="imagen.jpg" alt="Vista previa" style="width: 100%;">
  </div>
</app-modal>
```

**Props disponibles:**
| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `isOpen` | boolean | false | Si está abierto (two-way) |
| `title` | string | - | Título del modal |
| `size` | ModalSize | 'medium' | Tamaño del modal |
| `closeOnBackdrop` | boolean | true | Cerrar al click en backdrop |
| `closeOnEsc` | boolean | true | Cerrar con tecla ESC |
| `showCloseButton` | boolean | true | Mostrar botón X |
| `showHeader` | boolean | true | Mostrar header |
| `requireConfirmation` | boolean | false | Pedir confirmación al cerrar |
| `confirmationMessage` | string | '¿Está seguro...' | Mensaje de confirmación |

**Eventos:**
| Evento | Tipo | Descripción |
|--------|------|-------------|
| `onClose` | void | Se emite al cerrar el modal |
| `isOpenChange` | boolean | Two-way binding del estado |

---

## 🎨 Personalización de Estilos

Todos los componentes utilizan variables SCSS que pueden ser sobrescritas:

```scss
// En tu styles.scss global o en el componente que los usa

// Personalizar colores del botón
$btn-primary-bg: #your-color;
$btn-primary-hover: #your-hover-color;

// Personalizar colores del input
$input-border-color: #your-border-color;
$input-border-color-focus: #your-focus-color;

// Personalizar modal
$modal-overlay-bg: rgba(0, 0, 0, 0.7);
$modal-border-radius: 12px;
```

---

## ♿ Accesibilidad

Todos los componentes siguen las mejores prácticas de accesibilidad:

- ✅ **ARIA attributes** completos (roles, labels, describedby, etc.)
- ✅ **Navegación por teclado** funcional (Tab, Enter, Esc, Arrow keys)
- ✅ **Focus management** correcto (focus visible, focus trap en modales)
- ✅ **Contraste de colores** cumple WCAG AA
- ✅ **Respeta preferencias del sistema** (reduced-motion, high-contrast)
- ✅ **Screen readers** completamente soportados
- ✅ **Feedback visual y auditivo** para acciones importantes

---

## 🧪 Testing

Todos los componentes están diseñados para ser fácilmente testeables:

```typescript
// Ejemplo de test para ButtonComponent
it('should emit click event when clicked', () => {
  const fixture = TestBed.createComponent(ButtonComponent);
  const component = fixture.componentInstance;
  let clicked = false;

  component.buttonClick.subscribe(() => {
    clicked = true;
  });

  const button = fixture.nativeElement.querySelector('button');
  button.click();

  expect(clicked).toBe(true);
});

// Ejemplo de test para InputComponent
it('should display error message when error prop is set', () => {
  const fixture = TestBed.createComponent(InputComponent);
  const component = fixture.componentInstance;
  
  component.error = 'Campo obligatorio';
  component.touched = true;
  fixture.detectChanges();

  const errorElement = fixture.nativeElement.querySelector('.input-description-error');
  expect(errorElement.textContent).toContain('Campo obligatorio');
});
```

---

## 📱 Responsive

Todos los componentes son completamente responsive:

- **Breakpoint móvil:** 640px
- **Botones:** Se adaptan al contenedor
- **Inputs:** Ancho 100% por defecto
- **Modales:** Fullscreen en móvil con animación desde abajo

---

## 🚀 Mejores Prácticas de Uso

### 1. **Importar como standalone components**
```typescript
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { ModalComponent } from '@app/shared/components/modal/modal.component';

@Component({
  standalone: true,
  imports: [ButtonComponent, InputComponent, ModalComponent],
  // ...
})
export class MiComponente {}
```

### 2. **Usar con Reactive Forms**
```typescript
this.formulario = this.fb.group({
  nombre: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]],
  descripcion: ['', Validators.maxLength(500)]
});
```

```html
<form [formGroup]="formulario">
  <app-input
    label="Nombre"
    formControlName="nombre"
    [error]="formulario.get('nombre')?.hasError('required') ? 'Obligatorio' : ''"
    required
  ></app-input>
</form>
```

### 3. **Combinar componentes**
```html
<app-modal title="Nuevo registro" [(isOpen)]="showModal">
  <div body>
    <app-input 
      label="Nombre" 
      [(ngModel)]="nombre"
      prefixIcon="👤"
    ></app-input>
    <app-input 
      type="email" 
      label="Correo" 
      [(ngModel)]="email"
      prefixIcon="📧"
    ></app-input>
  </div>
  <div footer>
    <app-button variant="outline-secondary" (click)="showModal = false">
      Cancelar
    </app-button>
    <app-button 
      variant="success"
      [loading]="saving"
      (click)="guardar()">
      Crear
    </app-button>
  </div>
</app-modal>
```

---

## 📝 Notas Adicionales

- **Todos los componentes son standalone:** No requieren módulos adicionales
- **TypeScript strict mode:** Completamente tipados y seguros
- **Documentación JSDoc completa:** Intellisense y autocomplete en el IDE
- **Sin dependencias externas:** Solo Angular core y common
- **Performance optimizado:** ChangeDetection OnPush donde aplica
- **Estilos encapsulados:** No hay conflictos de CSS

---

## 🔄 Próximas Mejoras

- [ ] Componente **Table** con sorting y paginación
- [ ] Componente **Card** para contenedores de información
- [ ] Componente **Toast/Notification** para mensajes
- [ ] Componente **Dropdown** para menús desplegables
- [ ] Componente **Tabs** para navegación interna
- [ ] Componente **Badge** para etiquetas y estados
- [ ] Componente **Avatar** para imágenes de usuario
- [ ] Componente **Skeleton** para estados de carga

---

**Versión:** 1.0.0  
**Última actualización:** 2026-04-19  
**Mantenido por:** Equipo SWO
