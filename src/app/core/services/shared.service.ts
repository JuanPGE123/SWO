/**
 * shared.service.ts
 * 
 * Servicio compartido centralizado que proporciona utilidades y funciones
 * reutilizables para todos los servicios del sistema SWO.
 * 
 * Responsabilidades:
 * - Manejo centralizado de errores HTTP
 * - Validaciones comunes de datos
 * - Formateo y transformación de datos
 * - Utilidades de fecha y hora
 * - Helpers de conversión
 * 
 * @author Equipo SWO
 * @version 1.0.0
 */

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**
 * Estructura para errores personalizados de la aplicación
 */
export interface ErrorApp {
  codigo: string;           // Código único del error
  mensaje: string;          // Mensaje descriptivo del error
  detalles?: string;        // Detalles adicionales
  timestamp: Date;          // Momento en que ocurrió el error
  path?: string;            // Ruta donde ocurrió el error
}

/**
 * Resultado de validación genérico
 */
export interface ResultadoValidacion {
  valido: boolean;          // Si la validación pasó
  errores: string[];        // Lista de mensajes de error
}

/**
 * Opciones para formateo de fechas
 */
export interface OpcionesFormatoFecha {
  formato: 'corto' | 'largo' | 'iso' | 'datetime';
  incluirHora?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {}

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: MANEJO DE ERRORES
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Maneja errores HTTP de forma centralizada
   * 
   * Convierte errores HTTP en mensajes legibles y estructurados
   * para el usuario final y logging del sistema.
   * 
   * @param error - Error HTTP capturado
   * @param contexto - Contexto donde ocurrió el error (opcional)
   * @returns Observable con el error formateado
   * 
   * @example
   * this.http.get('/api/usuarios')
   *   .pipe(catchError(err => this.sharedService.manejarErrorHttp(err, 'Obtener usuarios')))
   */
  manejarErrorHttp(error: HttpErrorResponse, contexto?: string): Observable<never> {
    const errorApp: ErrorApp = {
      codigo: error.status ? `HTTP_${error.status}` : 'HTTP_UNKNOWN',
      mensaje: this.obtenerMensajeError(error),
      detalles: contexto || error.url || 'Sin contexto',
      timestamp: new Date(),
      path: error.url || undefined
    };

    // Log del error en consola para debugging (solo desarrollo)
    if (!this.esProduccion()) {
      console.error('❌ Error HTTP:', errorApp);
      console.error('Detalles:', error);
    }

    return throwError(() => errorApp);
  }

  /**
   * Extrae un mensaje de error legible desde un HttpErrorResponse
   * 
   * @param error - Error HTTP
   * @returns Mensaje de error en español
   * @private
   */
  private obtenerMensajeError(error: HttpErrorResponse): string {
    // Error del lado del cliente (problemas de red, etc)
    if (error.error instanceof ErrorEvent) {
      return `Error de red: ${error.error.message}`;
    }

    // Error del servidor
    if (error.error?.error) {
      return error.error.error;
    }

    if (error.error?.message) {
      return error.error.message;
    }

    // Errores HTTP estándar
    switch (error.status) {
      case 0:
        return 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
      case 400:
        return 'Solicitud inválida. Verifica los datos enviados.';
      case 401:
        return 'No autorizado. Por favor inicia sesión nuevamente.';
      case 403:
        return 'Acceso denegado. No tienes permisos para esta acción.';
      case 404:
        return 'Recurso no encontrado en el servidor.';
      case 409:
        return 'Conflicto con el estado actual del recurso.';
      case 500:
        return 'Error interno del servidor. Intenta nuevamente más tarde.';
      case 503:
        return 'Servicio no disponible temporalmente. Intenta más tarde.';
      default:
        return `Error del servidor: ${error.status} - ${error.statusText}`;
    }
  }

  /**
   * Crea un error personalizado de la aplicación
   * 
   * @param codigo - Código único del error
   * @param mensaje - Mensaje descriptivo
   * @param detalles - Detalles adicionales (opcional)
   * @returns ErrorApp estructurado
   */
  crearError(codigo: string, mensaje: string, detalles?: string): ErrorApp {
    return {
      codigo,
      mensaje,
      detalles,
      timestamp: new Date()
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: VALIDACIONES
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Valida que un campo de texto no esté vacío
   * 
   * @param valor - Texto a validar
   * @param nombreCampo - Nombre del campo (para mensajes de error)
   * @returns Resultado de validación
   */
  validarTextoRequerido(valor: string | undefined | null, nombreCampo: string): ResultadoValidacion {
    const errores: string[] = [];

    if (!valor || valor.trim().length === 0) {
      errores.push(`${nombreCampo} es obligatorio`);
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }

  /**
   * Valida un correo electrónico
   * 
   * @param email - Correo a validar
   * @returns Resultado de validación
   */
  validarEmail(email: string | undefined | null): ResultadoValidacion {
    const errores: string[] = [];

    if (!email || email.trim().length === 0) {
      errores.push('El correo electrónico es obligatorio');
      return { valido: false, errores };
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      errores.push('El formato del correo electrónico no es válido');
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }

  /**
   * Valida que un texto tenga una longitud mínima y máxima
   * 
   * @param valor - Texto a validar
   * @param min - Longitud mínima
   * @param max - Longitud máxima
   * @param nombreCampo - Nombre del campo
   * @returns Resultado de validación
   */
  validarLongitud(
    valor: string | undefined | null,
    min: number,
    max: number,
    nombreCampo: string
  ): ResultadoValidacion {
    const errores: string[] = [];

    if (!valor) {
      errores.push(`${nombreCampo} es obligatorio`);
      return { valido: false, errores };
    }

    if (valor.length < min) {
      errores.push(`${nombreCampo} debe tener al menos ${min} caracteres`);
    }

    if (valor.length > max) {
      errores.push(`${nombreCampo} no puede exceder ${max} caracteres`);
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }

  /**
   * Valida que un valor numérico esté dentro de un rango
   * 
   * @param valor - Número a validar
   * @param min - Valor mínimo
   * @param max - Valor máximo
   * @param nombreCampo - Nombre del campo
   * @returns Resultado de validación
   */
  validarRango(
    valor: number | undefined | null,
    min: number,
    max: number,
    nombreCampo: string
  ): ResultadoValidacion {
    const errores: string[] = [];

    if (valor === undefined || valor === null) {
      errores.push(`${nombreCampo} es obligatorio`);
      return { valido: false, errores };
    }

    if (valor < min) {
      errores.push(`${nombreCampo} debe ser mayor o igual a ${min}`);
    }

    if (valor > max) {
      errores.push(`${nombreCampo} debe ser menor o igual a ${max}`);
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }

  /**
   * Valida múltiples campos y combina los resultados
   * 
   * @param validaciones - Array de resultados de validación
   * @returns Resultado combinado
   */
  combinarValidaciones(validaciones: ResultadoValidacion[]): ResultadoValidacion {
    const todosErrores: string[] = [];

    validaciones.forEach(v => {
      todosErrores.push(...v.errores);
    });

    return {
      valido: todosErrores.length === 0,
      errores: todosErrores
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: FORMATEO DE DATOS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Formatea una fecha según las opciones especificadas
   * 
   * @param fecha - Fecha a formatear (Date, string o timestamp)
   * @param opciones - Opciones de formato
   * @returns Fecha formateada como string
   * 
   * @example
   * formatearFecha(new Date(), { formato: 'corto' }) // "09/04/2026"
   * formatearFecha(new Date(), { formato: 'largo' }) // "9 de abril de 2026"
   */
  formatearFecha(fecha: Date | string | number, opciones: OpcionesFormatoFecha): string {
    const fechaObj = typeof fecha === 'string' || typeof fecha === 'number' 
      ? new Date(fecha) 
      : fecha;

    if (isNaN(fechaObj.getTime())) {
      return 'Fecha inválida';
    }

    switch (opciones.formato) {
      case 'corto':
        return fechaObj.toLocaleDateString('es-ES');

      case 'largo':
        return fechaObj.toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

      case 'iso':
        return fechaObj.toISOString().split('T')[0];

      case 'datetime':
        return fechaObj.toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

      default:
        return fechaObj.toLocaleDateString('es-ES');
    }
  }

  /**
   * Formatea un número como moneda colombiana (COP)
   * 
   * @param valor - Valor numérico
   * @returns Texto formateado como moneda
   * 
   * @example
   * formatearMoneda(1500000) // "$1.500.000"
   */
  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  }

  /**
   * Capitaliza la primera letra de cada palabra
   * 
   * @param texto - Texto a capitalizar
   * @returns Texto capitalizado
   * 
   * @example
   * capitalizarTexto("juan pérez garcía") // "Juan Pérez García"
   */
  capitalizarTexto(texto: string): string {
    if (!texto) return '';

    return texto
      .toLowerCase()
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  }

  /**
   * Trunca un texto a una longitud máxima agregando "..."
   * 
   * @param texto - Texto a truncar
   * @param maxLength - Longitud máxima
   * @returns Texto truncado
   */
  truncarTexto(texto: string, maxLength: number): string {
    if (!texto || texto.length <= maxLength) {
      return texto;
    }

    return texto.substring(0, maxLength - 3) + '...';
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: UTILIDADES DE TRANSFORMACIÓN
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Convierte un objeto en parámetros URL (query string)
   * 
   * @param obj - Objeto a convertir
   * @returns Query string
   * 
   * @example
   * objetoAQueryString({ nombre: 'Juan', edad: 25 }) // "nombre=Juan&edad=25"
   */
  objetoAQueryString(obj: { [key: string]: any }): string {
    const params = new URLSearchParams();

    Object.keys(obj).forEach(key => {
      if (obj[key] !== undefined && obj[key] !== null) {
        params.append(key, String(obj[key]));
      }
    });

    return params.toString();
  }

  /**
   * Clona profundamente un objeto (deep clone)
   * 
   * @param obj - Objeto a clonar
   * @returns Copia profunda del objeto
   */
  clonarObjeto<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Elimina propiedades undefined, null o vacías de un objeto
   * 
   * @param obj - Objeto a limpiar
   * @returns Objeto limpio
   */
  limpiarObjeto<T extends { [key: string]: any }>(obj: T): Partial<T> {
    const resultado: any = {};

    Object.keys(obj).forEach(key => {
      const valor = obj[key];
      if (valor !== undefined && valor !== null && valor !== '') {
        resultado[key] = valor;
      }
    });

    return resultado;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: UTILIDADES DE ARRAYS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Ordena un array de objetos por una propiedad específica
   * 
   * @param array - Array a ordenar
   * @param propiedad - Nombre de la propiedad
   * @param orden - 'asc' o 'desc'
   * @returns Array ordenado
   */
  ordenarPor<T>(array: T[], propiedad: keyof T, orden: 'asc' | 'desc' = 'asc'): T[] {
    return [...array].sort((a, b) => {
      const valorA = a[propiedad];
      const valorB = b[propiedad];

      if (valorA < valorB) return orden === 'asc' ? -1 : 1;
      if (valorA > valorB) return orden === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /**
   * Agrupa un array de objetos por una propiedad
   * 
   * @param array - Array a agrupar
   * @param propiedad - Propiedad para agrupar
   * @returns Objeto con arrays agrupados
   */
  agruparPor<T>(array: T[], propiedad: keyof T): { [key: string]: T[] } {
    return array.reduce((grupos, item) => {
      const clave = String(item[propiedad]);
      if (!grupos[clave]) {
        grupos[clave] = [];
      }
      grupos[clave].push(item);
      return grupos;
    }, {} as { [key: string]: T[] });
  }

  /**
   * Elimina duplicados de un array
   * 
   * @param array - Array con posibles duplicados
   * @param propiedad - Propiedad única (opcional)
   * @returns Array sin duplicados
   */
  eliminarDuplicados<T>(array: T[], propiedad?: keyof T): T[] {
    if (!propiedad) {
      return [...new Set(array)];
    }

    const vistos = new Set();
    return array.filter(item => {
      const valor = item[propiedad];
      if (vistos.has(valor)) {
        return false;
      }
      vistos.add(valor);
      return true;
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SECCIÓN: UTILIDADES GENERALES
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Genera un ID único temporal
   * 
   * @param prefijo - Prefijo opcional para el ID
   * @returns ID único
   * 
   * @example
   * generarId('INC') // "INC-1712629384723-abc"
   */
  generarId(prefijo?: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 5);
    return prefijo ? `${prefijo}-${timestamp}-${random}` : `${timestamp}-${random}`;
  }

  /**
   * Espera un tiempo determinado (útil para testing o delays)
   * 
   * @param ms - Milisegundos a esperar
   * @returns Promise que se resuelve después del tiempo especificado
   */
  async esperar(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Verifica si el entorno es producción
   * 
   * @returns true si está en producción
   * @private
   */
  private esProduccion(): boolean {
    // Ajustar según la configuración de environment
    return false; // Por defecto, en desarrollo
  }

  /**
   * Genera un hash simple de un string (para identificadores)
   * 
   * @param texto - Texto a hashear
   * @returns Hash numérico
   */
  generarHash(texto: string): number {
    let hash = 0;
    for (let i = 0; i < texto.length; i++) {
      const char = texto.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Descarga un archivo desde el navegador
   * 
   * @param contenido - Contenido del archivo
   * @param nombreArchivo - Nombre del archivo
   * @param tipoMime - Tipo MIME del archivo
   */
  descargarArchivo(contenido: string | Blob, nombreArchivo: string, tipoMime: string): void {
    const blob = typeof contenido === 'string' 
      ? new Blob([contenido], { type: tipoMime })
      : contenido;

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
