/**
 * @fileoverview Validadores personalizados para Angular Reactive Forms
 * 
 * Proporciona validadores reutilizables para formularios en toda la aplicación.
 * Todos los validadores retornan `null` si la validación pasa, o un objeto
 * con el error si falla.
 * 
 * **Validadores disponibles:**
 * - `noWhitespace` - Rechaza strings vacíos o solo espacios en blanco
 * - `forbiddenWords` - Rechaza texto que contenga palabras prohibidas
 * - `minWords` - Requiere un mínimo de palabras
 * - `maxWords` - Limita el máximo de palabras
 * - `phoneFormat` - Valida formato de teléfono
 * - `alphanumericOnly` - Solo caracteres alfanuméricos
 * - `strongPassword` - Contraseña fuerte (mayúscula, minúscula, número)
 * - `emailDomain` - Restringe dominios de email permitidos
 * - `futureDate` - Rechaza fechas en el futuro
 * - `pastDate` - Rechaza fechas en el pasado
 * - `matchFields` - Compara dos campos (ej: confirmar contraseña)
 * - `fileSize` - Valida tamaño máximo de archivo
 * - `fileType` - Valida extensión de archivo
 * 
 * @example
 * ```typescript
 * // Uso en FormControl
 * this.form = this.fb.group({
 *   titulo: ['', [Validators.required, CustomValidators.noWhitespace()]],
 *   descripcion: ['', [
 *     Validators.required,
 *     CustomValidators.minWords(5),
 *     CustomValidators.forbiddenWords(['spam', 'test'])
 *   ]],
 *   telefono: ['', CustomValidators.phoneFormat()],
 *   password: ['', CustomValidators.strongPassword()],
 *   confirmPassword: ['']
 * }, {
 *   validators: CustomValidators.matchFields('password', 'confirmPassword')
 * });
 * ```
 * 
 * @author Equipo SWO
 * @version 1.0.0
 * @since 2026-04-19
 */

import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

/**
 * Clase con validadores personalizados estáticos
 */
export class CustomValidators {

  // ═══════════════════════════════════════════════════════════════════════════
  // VALIDADORES DE TEXTO
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Valida que el valor no sea solo espacios en blanco
   * 
   * @returns ValidatorFn que retorna error 'whitespace' si falla
   * 
   * @example
   * ```typescript
   * titulo: ['', [Validators.required, CustomValidators.noWhitespace()]]
   * ```
   */
  static noWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // No validar si está vacío (usar Validators.required)
      }

      const isWhitespace = (control.value as string).trim().length === 0;
      return isWhitespace ? { whitespace: true } : null;
    };
  }

  /**
   * Valida que el texto no contenga palabras prohibidas
   * 
   * @param forbiddenWords - Array de palabras prohibidas (case-insensitive)
   * @returns ValidatorFn que retorna error 'forbiddenWords' con la palabra encontrada
   * 
   * @example
   * ```typescript
   * descripcion: ['', CustomValidators.forbiddenWords(['spam', 'test', 'prueba'])]
   * ```
   */
  static forbiddenWords(forbiddenWords: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }

      const value = control.value.toLowerCase();
      const foundWord = forbiddenWords.find(word => 
        value.includes(word.toLowerCase())
      );

      return foundWord 
        ? { forbiddenWords: { word: foundWord } } 
        : null;
    };
  }

  /**
   * Valida que el texto tenga un mínimo de palabras
   * 
   * @param min - Número mínimo de palabras
   * @returns ValidatorFn que retorna error 'minWords'
   * 
   * @example
   * ```typescript
   * razon: ['', CustomValidators.minWords(10)]
   * // Error: "La descripción debe tener al menos 10 palabras"
   * ```
   */
  static minWords(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }

      const words = control.value.trim().split(/\s+/).filter(w => w.length > 0);
      return words.length < min 
        ? { minWords: { required: min, actual: words.length } } 
        : null;
    };
  }

  /**
   * Valida que el texto no exceda un máximo de palabras
   * 
   * @param max - Número máximo de palabras
   * @returns ValidatorFn que retorna error 'maxWords'
   */
  static maxWords(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }

      const words = control.value.trim().split(/\s+/).filter(w => w.length > 0);
      return words.length > max 
        ? { maxWords: { max, actual: words.length } } 
        : null;
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VALIDADORES DE FORMATO
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Valida formato de teléfono colombiano
   * Acepta: 3001234567, 300-123-4567, (300) 123-4567, +57 300 123 4567
   * 
   * @returns ValidatorFn que retorna error 'phoneFormat'
   * 
   * @example
   * ```typescript
   * celular: ['', CustomValidators.phoneFormat()]
   * ```
   */
  static phoneFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      // Regex para teléfono colombiano (móvil o fijo)
      const phoneRegex = /^(\+?57)?[\s\-]?(\()?[1-9]\d{1,2}(\))?[\s\-]?\d{3}[\s\-]?\d{4}$/;
      const isValid = phoneRegex.test(control.value);

      return isValid ? null : { phoneFormat: true };
    };
  }

  /**
   * Valida que solo contenga caracteres alfanuméricos
   * 
   * @returns ValidatorFn que retorna error 'alphanumericOnly'
   */
  static alphanumericOnly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const alphanumericRegex = /^[a-zA-Z0-9]+$/;
      const isValid = alphanumericRegex.test(control.value);

      return isValid ? null : { alphanumericOnly: true };
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VALIDADORES DE CONTRASEÑA
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Valida contraseña fuerte
   * Requiere: al menos 1 mayúscula, 1 minúscula, 1 número, mínimo 8 caracteres
   * 
   * @returns ValidatorFn que retorna error 'strongPassword' con detalles
   * 
   * @example
   * ```typescript
   * password: ['', [Validators.required, CustomValidators.strongPassword()]]
   * ```
   */
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = control.value as string;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasMinLength = value.length >= 8;

      const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasMinLength;

      return passwordValid ? null : {
        strongPassword: {
          hasUpperCase,
          hasLowerCase,
          hasNumber,
          hasMinLength
        }
      };
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VALIDADORES DE EMAIL
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Restringe el email a dominios específicos
   * 
   * @param allowedDomains - Array de dominios permitidos (ej: ['empresa.com', 'empresa.net'])
   * @returns ValidatorFn que retorna error 'emailDomain'
   * 
   * @example
   * ```typescript
   * email: ['', [
   *   Validators.required,
   *   Validators.email,
   *   CustomValidators.emailDomain(['empresa.com', 'empresa.co'])
   * ]]
   * ```
   */
  static emailDomain(allowedDomains: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }

      const email = control.value.toLowerCase();
      const domain = email.split('@')[1];

      if (!domain) {
        return null; // Dejar que Validators.email maneje esto
      }

      const isAllowed = allowedDomains.some(allowedDomain => 
        domain === allowedDomain.toLowerCase()
      );

      return isAllowed ? null : {
        emailDomain: {
          allowedDomains,
          actualDomain: domain
        }
      };
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VALIDADORES DE FECHA
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Valida que la fecha NO sea en el futuro
   * 
   * @returns ValidatorFn que retorna error 'futureDate'
   * 
   * @example
   * ```typescript
   * fechaNacimiento: ['', CustomValidators.futureDate()]
   * ```
   */
  static futureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const inputDate = new Date(control.value);
      const now = new Date();
      now.setHours(23, 59, 59, 999); // Fin del día actual

      return inputDate > now ? { futureDate: true } : null;
    };
  }

  /**
   * Valida que la fecha NO sea en el pasado
   * 
   * @returns ValidatorFn que retorna error 'pastDate'
   */
  static pastDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const inputDate = new Date(control.value);
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Inicio del día actual

      return inputDate < now ? { pastDate: true } : null;
    };
  }

  /**
   * Valida que la edad mínima sea alcanzada
   * 
   * @param minAge - Edad mínima requerida en años
   * @returns ValidatorFn que retorna error 'minAge'
   * 
   * @example
   * ```typescript
   * fechaNacimiento: ['', CustomValidators.minAge(18)]
   * // Error: "Debe ser mayor de 18 años"
   * ```
   */
  static minAge(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const birthDate = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age < minAge ? { minAge: { required: minAge, actual: age } } : null;
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VALIDADORES DE COMPARACIÓN (CROSS-FIELD)
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Valida que dos campos tengan el mismo valor (ej: confirmar contraseña)
   * 
   * **IMPORTANTE:** Este validador se debe aplicar al FormGroup, no al FormControl
   * 
   * @param field1 - Nombre del primer campo
   * @param field2 - Nombre del segundo campo (el que mostrará el error)
   * @returns ValidatorFn que retorna error 'fieldsMismatch' en field2
   * 
   * @example
   * ```typescript
   * this.form = this.fb.group({
   *   password: ['', Validators.required],
   *   confirmPassword: ['', Validators.required]
   * }, {
   *   validators: CustomValidators.matchFields('password', 'confirmPassword')
   * });
   * 
   * // Verificar error en el template:
   * // form.get('confirmPassword')?.hasError('fieldsMismatch')
   * ```
   */
  static matchFields(field1: string, field2: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const formGroup = group as FormGroup;
      const control1 = formGroup.get(field1);
      const control2 = formGroup.get(field2);

      if (!control1 || !control2) {
        return null;
      }

      // Si el segundo campo ya tiene otros errores, no agregar este
      if (control2.errors && !control2.errors['fieldsMismatch']) {
        return null;
      }

      // Comparar valores
      if (control1.value !== control2.value) {
        control2.setErrors({ fieldsMismatch: true });
        return { fieldsMismatch: true };
      } else {
        // Limpiar el error si los campos coinciden
        control2.setErrors(null);
        return null;
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VALIDADORES DE ARCHIVOS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Valida el tamaño máximo de un archivo
   * 
   * @param maxSizeMB - Tamaño máximo en megabytes
   * @returns ValidatorFn que retorna error 'fileSize'
   * 
   * @example
   * ```typescript
   * archivo: ['', CustomValidators.fileSize(5)] // Máximo 5MB
   * ```
   */
  static fileSize(maxSizeMB: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const file = control.value as File;
      if (!file.size) {
        return null;
      }

      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      const actualSizeMB = file.size / (1024 * 1024);

      return file.size > maxSizeBytes 
        ? { fileSize: { max: maxSizeMB, actual: actualSizeMB.toFixed(2) } } 
        : null;
    };
  }

  /**
   * Valida la extensión de un archivo
   * 
   * @param allowedTypes - Array de extensiones permitidas (con o sin punto)
   * @returns ValidatorFn que retorna error 'fileType'
   * 
   * @example
   * ```typescript
   * imagen: ['', CustomValidators.fileType(['jpg', 'png', 'gif'])]
   * documento: ['', CustomValidators.fileType(['.pdf', '.docx'])]
   * ```
   */
  static fileType(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const file = control.value as File;
      if (!file.name) {
        return null;
      }

      const fileName = file.name.toLowerCase();
      const fileExtension = fileName.substring(fileName.lastIndexOf('.'));

      const isAllowed = allowedTypes.some(type => {
        const normalizedType = type.startsWith('.') ? type : `.${type}`;
        return fileExtension === normalizedType.toLowerCase();
      });

      return isAllowed ? null : {
        fileType: {
          allowedTypes,
          actualType: fileExtension
        }
      };
    };
  }
}
