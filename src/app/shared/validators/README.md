# Validadores Personalizados - Angular Reactive Forms

Biblioteca de validadores reutilizables para formularios reactivos de Angular.

## 📋 Tabla de Contenidos

- [Validadores de Texto](#validadores-de-texto)
- [Validadores de Formato](#validadores-de-formato)
- [Validadores de Contraseña](#validadores-de-contraseña)
- [Validadores de Email](#validadores-de-email)
- [Validadores de Fecha](#validadores-de-fecha)
- [Validadores de Comparación](#validadores-de-comparación-cross-field)
- [Validadores de Archivos](#validadores-de-archivos)
- [Uso en Formularios](#uso-en-formularios)
- [Mensajes de Error](#mensajes-de-error)

---

## Validadores de Texto

### `noWhitespace()`
Rechaza strings vacíos o que contengan solo espacios en blanco.

**Uso:**
```typescript
titulo: ['', [Validators.required, CustomValidators.noWhitespace()]]
```

**Error:** `{ whitespace: true }`

---

### `forbiddenWords(words: string[])`
Rechaza texto que contenga palabras prohibidas (case-insensitive).

**Parámetros:**
- `words` - Array de palabras prohibidas

**Uso:**
```typescript
descripcion: ['', CustomValidators.forbiddenWords(['spam', 'test', 'prueba'])]
```

**Error:** `{ forbiddenWords: { word: 'palabra_encontrada' } }`

---

### `minWords(min: number)`
Requiere un mínimo de palabras en el texto.

**Parámetros:**
- `min` - Número mínimo de palabras

**Uso:**
```typescript
descripcion: ['', CustomValidators.minWords(10)]
// Error si tiene menos de 10 palabras
```

**Error:** `{ minWords: { required: 10, actual: 5 } }`

---

### `maxWords(max: number)`
Limita el máximo de palabras en el texto.

**Parámetros:**
- `max` - Número máximo de palabras

**Uso:**
```typescript
resumen: ['', CustomValidators.maxWords(50)]
```

**Error:** `{ maxWords: { max: 50, actual: 65 } }`

---

## Validadores de Formato

### `phoneFormat()`
Valida formato de teléfono colombiano (móvil o fijo).

**Formatos aceptados:**
- `3001234567`
- `300-123-4567`
- `(300) 123-4567`
- `+57 300 123 4567`

**Uso:**
```typescript
celular: ['', CustomValidators.phoneFormat()]
```

**Error:** `{ phoneFormat: true }`

---

### `alphanumericOnly()`
Solo permite caracteres alfanuméricos (a-z, A-Z, 0-9).

**Uso:**
```typescript
codigoProducto: ['', CustomValidators.alphanumericOnly()]
```

**Error:** `{ alphanumericOnly: true }`

---

## Validadores de Contraseña

### `strongPassword()`
Valida que la contraseña sea fuerte.

**Requisitos:**
- ✅ Al menos 1 letra mayúscula
- ✅ Al menos 1 letra minúscula
- ✅ Al menos 1 número
- ✅ Mínimo 8 caracteres

**Uso:**
```typescript
password: ['', [Validators.required, CustomValidators.strongPassword()]]
```

**Error:**
```typescript
{
  strongPassword: {
    hasUpperCase: false,
    hasLowerCase: true,
    hasNumber: true,
    hasMinLength: true
  }
}
```

**Mensaje personalizado:**
```typescript
if (control.errors?.['strongPassword']) {
  const errors = control.errors['strongPassword'];
  if (!errors.hasUpperCase) return 'Debe contener al menos una mayúscula';
  if (!errors.hasLowerCase) return 'Debe contener al menos una minúscula';
  if (!errors.hasNumber) return 'Debe contener al menos un número';
  if (!errors.hasMinLength) return 'Debe tener al menos 8 caracteres';
}
```

---

## Validadores de Email

### `emailDomain(allowedDomains: string[])`
Restringe el email a dominios específicos.

**Parámetros:**
- `allowedDomains` - Array de dominios permitidos

**Uso:**
```typescript
email: ['', [
  Validators.required,
  Validators.email,
  CustomValidators.emailDomain(['empresa.com', 'empresa.co'])
]]
```

**Error:**
```typescript
{
  emailDomain: {
    allowedDomains: ['empresa.com', 'empresa.co'],
    actualDomain: 'gmail.com'
  }
}
```

---

## Validadores de Fecha

### `futureDate()`
Rechaza fechas en el futuro (útil para fechas de nacimiento).

**Uso:**
```typescript
fechaNacimiento: ['', CustomValidators.futureDate()]
```

**Error:** `{ futureDate: true }`

---

### `pastDate()`
Rechaza fechas en el pasado (útil para fechas de eventos futuros).

**Uso:**
```typescript
fechaEvento: ['', CustomValidators.pastDate()]
```

**Error:** `{ pastDate: true }`

---

### `minAge(years: number)`
Valida que se cumpla una edad mínima.

**Parámetros:**
- `years` - Edad mínima requerida

**Uso:**
```typescript
fechaNacimiento: ['', CustomValidators.minAge(18)]
// Error si la persona es menor de 18 años
```

**Error:** `{ minAge: { required: 18, actual: 16 } }`

---

## Validadores de Comparación (Cross-Field)

### `matchFields(field1: string, field2: string)`
Valida que dos campos tengan el mismo valor.

**⚠️ IMPORTANTE:** Este validador se aplica al **FormGroup**, no al FormControl.

**Parámetros:**
- `field1` - Nombre del primer campo
- `field2` - Nombre del segundo campo (mostrará el error)

**Uso:**
```typescript
this.form = this.fb.group({
  password: ['', Validators.required],
  confirmPassword: ['', Validators.required]
}, {
  validators: CustomValidators.matchFields('password', 'confirmPassword')
});
```

**Verificar error en el template:**
```html
<app-input
  label="Confirmar contraseña"
  type="password"
  formControlName="confirmPassword"
  [error]="form.get('confirmPassword')?.hasError('fieldsMismatch') ? 
           'Las contraseñas no coinciden' : ''"
></app-input>
```

**Error:** `{ fieldsMismatch: true }`

---

## Validadores de Archivos

### `fileSize(maxSizeMB: number)`
Valida el tamaño máximo de un archivo.

**Parámetros:**
- `maxSizeMB` - Tamaño máximo en megabytes

**Uso:**
```typescript
archivo: ['', CustomValidators.fileSize(5)] // Máximo 5MB
```

**Error:** `{ fileSize: { max: 5, actual: '7.85' } }`

---

### `fileType(allowedTypes: string[])`
Valida la extensión del archivo.

**Parámetros:**
- `allowedTypes` - Array de extensiones permitidas (con o sin punto)

**Uso:**
```typescript
// Imágenes
imagen: ['', CustomValidators.fileType(['jpg', 'png', 'gif'])]

// Documentos
documento: ['', CustomValidators.fileType(['.pdf', '.docx', '.xlsx'])]
```

**Error:**
```typescript
{
  fileType: {
    allowedTypes: ['jpg', 'png', 'gif'],
    actualType: '.bmp'
  }
}
```

---

## Uso en Formularios

### Ejemplo Completo: Formulario de Registro

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '@app/shared/validators/custom-validators';
import { VALIDATION_CONSTANTS } from '@app/core/constants/app.constants';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      // Nombre completo
      nombre: [
        '',
        [
          Validators.required,
          CustomValidators.noWhitespace(),
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],

      // Email corporativo
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          CustomValidators.emailDomain(['empresa.com', 'empresa.co'])
        ]
      ],

      // Teléfono
      celular: [
        '',
        [
          Validators.required,
          CustomValidators.phoneFormat()
        ]
      ],

      // Contraseña fuerte
      password: [
        '',
        [
          Validators.required,
          CustomValidators.strongPassword()
        ]
      ],

      // Confirmar contraseña
      confirmPassword: [
        '',
        Validators.required
      ],

      // Fecha de nacimiento (mayor de edad)
      fechaNacimiento: [
        '',
        [
          Validators.required,
          CustomValidators.futureDate(),
          CustomValidators.minAge(18)
        ]
      ],

      // Descripción personal
      bio: [
        '',
        [
          CustomValidators.minWords(10),
          CustomValidators.maxWords(100),
          CustomValidators.forbiddenWords(['spam', 'test'])
        ]
      ],

      // Foto de perfil
      foto: [
        '',
        [
          CustomValidators.fileSize(2), // Máx 2MB
          CustomValidators.fileType(['jpg', 'png', 'gif'])
        ]
      ]
    }, {
      // Validador a nivel de formulario
      validators: CustomValidators.matchFields('password', 'confirmPassword')
    });
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    console.log(this.registroForm.value);
  }
}
```

---

## Mensajes de Error

### Helper Function para Mensajes

```typescript
/**
 * Obtiene el mensaje de error apropiado para un campo
 */
getFieldError(fieldName: string): string {
  const control = this.form.get(fieldName);
  
  if (!control || !control.touched || !control.errors) {
    return '';
  }

  const errors = control.errors;

  // Validadores nativos de Angular
  if (errors['required']) return 'Este campo es obligatorio';
  if (errors['email']) return 'Email inválido';
  if (errors['minlength']) {
    return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
  }
  if (errors['maxlength']) {
    return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
  }

  // Validadores personalizados
  if (errors['whitespace']) return 'No puede contener solo espacios';
  if (errors['forbiddenWords']) {
    return `Palabra no permitida: ${errors['forbiddenWords'].word}`;
  }
  if (errors['minWords']) {
    return `Debe contener al menos ${errors['minWords'].required} palabras`;
  }
  if (errors['maxWords']) {
    return `Máximo ${errors['maxWords'].max} palabras`;
  }
  if (errors['phoneFormat']) {
    return 'Formato de teléfono inválido (ej: 300 123 4567)';
  }
  if (errors['alphanumericOnly']) {
    return 'Solo se permiten letras y números';
  }
  if (errors['strongPassword']) {
    const pw = errors['strongPassword'];
    if (!pw.hasUpperCase) return 'Debe contener al menos una mayúscula';
    if (!pw.hasLowerCase) return 'Debe contener al menos una minúscula';
    if (!pw.hasNumber) return 'Debe contener al menos un número';
    if (!pw.hasMinLength) return 'Debe tener al menos 8 caracteres';
  }
  if (errors['emailDomain']) {
    return `Email debe ser de: ${errors['emailDomain'].allowedDomains.join(', ')}`;
  }
  if (errors['futureDate']) return 'La fecha no puede ser en el futuro';
  if (errors['pastDate']) return 'La fecha no puede ser en el pasado';
  if (errors['minAge']) {
    return `Debe ser mayor de ${errors['minAge'].required} años`;
  }
  if (errors['fieldsMismatch']) return 'Los campos no coinciden';
  if (errors['fileSize']) {
    return `Archivo demasiado grande (máx ${errors['fileSize'].max}MB)`;
  }
  if (errors['fileType']) {
    return `Tipo de archivo no permitido (use: ${errors['fileType'].allowedTypes.join(', ')})`;
  }

  return 'Campo inválido';
}
```

### Uso en Template con app-input

```html
<app-input
  label="Email corporativo"
  type="email"
  formControlName="email"
  [error]="getFieldError('email')"
  hint="Use su correo institucional"
  prefixIcon="📧"
  required
></app-input>

<app-input
  label="Contraseña"
  type="password"
  formControlName="password"
  [error]="getFieldError('password')"
  [showPasswordToggle]="true"
  hint="Mínimo 8 caracteres, con mayúsculas, minúsculas y números"
  required
></app-input>

<app-input
  label="Confirmar contraseña"
  type="password"
  formControlName="confirmPassword"
  [error]="getFieldError('confirmPassword')"
  [showPasswordToggle]="true"
  required
></app-input>
```

---

## Testing

### Ejemplo de Test para Validadores

```typescript
import { FormControl } from '@angular/forms';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
  describe('noWhitespace', () => {
    it('should return null for valid input', () => {
      const control = new FormControl('Hola Mundo');
      const result = CustomValidators.noWhitespace()(control);
      expect(result).toBeNull();
    });

    it('should return error for whitespace-only input', () => {
      const control = new FormControl('   ');
      const result = CustomValidators.noWhitespace()(control);
      expect(result).toEqual({ whitespace: true });
    });
  });

  describe('minWords', () => {
    it('should return null when word count is sufficient', () => {
      const control = new FormControl('one two three four five');
      const result = CustomValidators.minWords(5)(control);
      expect(result).toBeNull();
    });

    it('should return error when word count is insufficient', () => {
      const control = new FormControl('one two three');
      const result = CustomValidators.minWords(5)(control);
      expect(result).toEqual({ minWords: { required: 5, actual: 3 } });
    });
  });

  describe('strongPassword', () => {
    it('should return null for strong password', () => {
      const control = new FormControl('Abcd1234');
      const result = CustomValidators.strongPassword()(control);
      expect(result).toBeNull();
    });

    it('should return error for weak password', () => {
      const control = new FormControl('abcd1234'); // Sin mayúscula
      const result = CustomValidators.strongPassword()(control);
      expect(result?.['strongPassword']?.hasUpperCase).toBe(false);
    });
  });
});
```

---

## Mejores Prácticas

1. **Combinar validadores:** Usa arrays para múltiples validaciones
   ```typescript
   campo: ['', [Validators.required, CustomValidators.noWhitespace()]]
   ```

2. **Validadores cross-field:** Aplícalos al FormGroup
   ```typescript
   this.fb.group({...}, { validators: CustomValidators.matchFields(...) })
   ```

3. **Mensajes claros:** Proporciona feedback específico al usuario
   ```typescript
   if (errors['minWords']) {
     return `Debe escribir al menos ${errors['minWords'].required} palabras`;
   }
   ```

4. **Testing:** Testea cada validador con casos edge
   - Valores null/undefined
   - Strings vacíos
   - Solo espacios en blanco
   - Valores en el límite (min/max)

5. **Performance:** Los validadores se ejecutan en cada cambio del input
   - Evita operaciones costosas
   - No hagas llamadas HTTP en validadores síncronos
   - Usa AsyncValidators para validaciones que requieren backend

---

**Versión:** 1.0.0  
**Última actualización:** 2026-04-19  
**Mantenido por:** Equipo SWO
