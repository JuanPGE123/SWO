/**
 * @fileoverview Data Transfer Objects (DTOs) para comunicación con el backend
 * 
 * Este archivo define las estructuras de datos específicas utilizadas para:
 * - Enviar datos al backend (Request DTOs)
 * - Recibir datos del backend (Response DTOs)
 * - Transformación entre modelos de dominio y DTOs
 * 
 * **Propósito de los DTOs:**
 * - Desacoplar la representación interna (modelos) de la representación externa (API)
 * - Facilitar cambios en la API sin afectar la lógica de negocio
 * - Validar datos antes de enviar/recibir
 * - Optimizar la transferencia de datos (enviar solo lo necesario)
 * 
 * **Convención de nombres:**
 * - Request DTOs: terminan en `Request` o `DTO` (ej: CrearIncidenciaRequest)
 * - Response DTOs: terminan en `Response` (ej: LoginResponse)
 * - Mappers: funciones que transforman entre modelos y DTOs
 * 
 * @author Equipo SWO
 * @version 2.0.0
 * @since 2026-04-19
 */

import { Incidencia, Usuario, Proyecto, UsuarioAutenticado } from './models';
import { EstadoIncidencia, PrioridadIncidencia } from '../enums/app.enums';

// ═══════════════════════════════════════════════════════════════════════════
// DTOs DE AUTENTICACIÓN
// ═══════════════════════════════════════════════════════════════════════════

/**
 * DTO para enviar credenciales de login al backend
 * 
 * @interface
 * @example
 * ```typescript
 * const request: LoginRequest = {
 *   correo: 'usuario@empresa.com',
 *   password: 'miPassword123'
 * };
 * ```
 */
export interface LoginRequest {
  /** Correo electrónico del usuario */
  correo: string;
  
  /** Contraseña en texto plano (será encriptada en HTTPS) */
  password: string;
}

/**
 * DTO de respuesta del backend al hacer login
 * 
 * @interface
 * @example
 * ```typescript
 * const response: LoginResponse = {
 *   success: true,
 *   id: 123,
 *   nombre: 'Juan',
 *   correo: 'juan@empresa.com',
 *   rol: 'Administrador',
 *   token: 'eyJhbGciOiJIUzI1NiIs...',
 *   departamento: 'Tecnología',
 *   idProyecto: 1,
 *   proyecto: 'SWO'
 * };
 * ```
 */
export interface LoginResponse {
  /** Indica si la autenticación fue exitosa */
  success: boolean;
  
  /** ID del usuario en la base de datos */
  id?: number;
  
  /** Nombre del usuario */
  nombre?: string;
  
  /** Correo del usuario */
  correo?: string;
  
  /** Rol del usuario en el sistema */
  rol?: string;
  
  /** Token JWT de autenticación (opcional) */
  token?: string;
  
  /** Departamento o área del usuario */
  departamento?: string;
  
  /** ID del proyecto asignado al usuario */
  idProyecto?: number;
  
  /** Nombre del proyecto asignado */
  proyecto?: string;
  
  /** Indica si el usuario fue eliminado/desactivado */
  deleted?: boolean;
  
  /** Mensaje de error si falla la autenticación */
  error?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// DTOs DE INCIDENCIAS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * DTO para crear una nueva incidencia
 * 
 * Contiene solo los campos necesarios para crear una incidencia,
 * el backend generará automáticamente: id, fechaCreacion, estado inicial, etc.
 * 
 * @interface
 * @example
 * ```typescript
 * const request: CrearIncidenciaRequest = {
 *   titulo: 'No puedo acceder al sistema',
 *   descripcion: 'Al intentar ingresar aparece error de autenticación',
 *   estado: 'Abierto',
 *   impacto: 'Alto',
 *   ubicacion: 'Sistema de Nómina',
 *   idUsuarioReporta: 123,
 *   idProyecto: 1
 * };
 * ```
 */
export interface CrearIncidenciaRequest {
  /** Título de la incidencia (obligatorio) */
  titulo: string;
  
  /** Descripción detallada del problema (obligatorio) */
  descripcion: string;
  
  /** Estado inicial (por defecto 'Abierto') */
  estado?: string;
  
  /** Nivel de impacto/prioridad (por defecto 'Medio') */
  impacto?: string;
  
  /** Ubicación o área afectada */
  ubicacion?: string;
  
  /** ID del usuario que reporta la incidencia */
  idUsuarioReporta?: number;
  
  /** ID del proyecto asociado */
  idProyecto?: number;
  
  /** Actividad que estaba realizando */
  actividad?: string;
  
  /** Aplicación o sistema afectado */
  aplicacion?: string;
  
  /** Categoría de la incidencia */
  categoria?: string;
  
  /** Nivel de urgencia */
  urgencia?: string;
}

/**
 * DTO para actualizar una incidencia existente
 * 
 * Todos los campos son opcionales, se actualizan solo los que se envíen.
 * 
 * @interface
 * @example
 * ```typescript
 * const request: ActualizarIncidenciaRequest = {
 *   titulo: 'Problema de acceso al sistema (ACTUALIZADO)',
 *   estado: 'En Progreso',
 *   impacto: 'Crítico',
 *   asignado: 'María González'
 * };
 * ```
 */
export interface ActualizarIncidenciaRequest {
  /** Nuevo título */
  titulo?: string;
  
  /** Nueva descripción */
  descripcion?: string;
  
  /** Nuevo estado */
  estado?: string;
  
  /** Nuevo nivel de impacto */
  impacto?: string;
  
  /** Nueva ubicación */
  ubicacion?: string;
  
  /** Nuevo asignado */
  asignado?: string;
  
  /** Descripción de la resolución */
  resolucion?: string;
  
  /** Fecha de resolución */
  fechaResolucion?: string;
}

/**
 * DTO de respuesta del backend al crear/actualizar incidencia
 * 
 * @interface
 */
export interface IncidenciaResponse {
  /** Indica si la operación fue exitosa */
  success: boolean;
  
  /** ID de la incidencia creada/actualizada */
  id?: number;
  
  /** Mensaje informativo */
  message?: string;
  
  /** Mensaje de error si falla */
  error?: string;
  
  /** Indica si se guardó localmente (modo offline) */
  local?: boolean;
}

/**
 * DTO de incidencia recibida del backend
 * 
 * Estructura de datos tal como viene del servidor,
 * debe ser mapeada al modelo Incidencia del frontend
 * 
 * @interface
 */
export interface IncidenciaBackendDTO {
  /** ID numérico de la incidencia */
  id: number;
  
  /** Título de la incidencia */
  titulo: string;
  
  /** Estado en español */
  estado: string;
  
  /** Nivel de impacto en español */
  impacto: string;
  
  /** Persona asignada */
  asignado?: string;
  
  /** Ubicación/proyecto */
  ubicacion: string;
  
  /** Fecha de creación */
  fechaCreacion: string;
  
  /** Tags en formato JSON string */
  tags?: string;
  
  /** Comentarios en formato JSON string */
  comentarios?: string;
  
  /** ID del usuario reportante */
  idUsuarioReporta: number;
  
  /** Correo del usuario */
  correoUsuario?: string;
  
  /** Teléfonos en formato JSON string */
  telefonosUsuario?: string;
  
  /** Descripción del problema */
  descripcion: string;
  
  /** Actividad que realizaba */
  actividad?: string;
  
  /** Aplicación afectada */
  aplicacion?: string;
  
  /** Resolución de la incidencia */
  resolucion?: string;
  
  /** Fecha de resolución */
  fechaResolucion?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// DTOs DE USUARIOS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * DTO para crear un nuevo usuario
 * 
 * @interface
 */
export interface CrearUsuarioRequest {
  /** Nombre del usuario */
  nombre: string;
  
  /** Apellido del usuario */
  apellido: string;
  
  /** Correo electrónico (debe ser único) */
  correo: string;
  
  /** Contraseña inicial */
  password: string;
  
  /** Número de celular */
  celular?: string;
  
  /** Área o departamento */
  area?: string;
  
  /** Rol en el sistema */
  rol?: string;
  
  /** ID del proyecto asignado */
  idProyecto?: number;
  
  /** Jefe directo */
  jefeDirecto?: string;
  
  /** Correo del jefe */
  correoJefe?: string;
}

/**
 * DTO para actualizar un usuario existente
 * 
 * @interface
 */
export interface ActualizarUsuarioRequest {
  /** Nuevo nombre */
  nombre?: string;
  
  /** Nuevo apellido */
  apellido?: string;
  
  /** Nuevo correo */
  correo?: string;
  
  /** Nueva contraseña */
  password?: string;
  
  /** Nuevo celular */
  celular?: string;
  
  /** Nueva área */
  area?: string;
  
  /** Nuevo rol */
  rol?: string;
  
  /** Nuevo proyecto */
  idProyecto?: number;
  
  /** Nuevo jefe directo */
  jefeDirecto?: string;
  
  /** Nuevo correo de jefe */
  correoJefe?: string;
  
  /** Estado activo/inactivo */
  activo?: boolean;
}

/**
 * DTO de usuario recibido del backend
 * 
 * @interface
 */
export interface UsuarioBackendDTO {
  /** ID del usuario */
  id: number;
  
  /** Nombre */
  nombre: string;
  
  /** Apellido */
  apellido: string;
  
  /** Correo */
  correo: string;
  
  /** Celular */
  celular?: string;
  
  /** Área/departamento */
  area?: string;
  
  /** Rol */
  rol?: string;
  
  /** ID del proyecto */
  idProyecto?: number;
  
  /** Nombre del proyecto */
  nombreProyecto?: string;
  
  /** Jefe directo */
  jefeDirecto?: string;
  
  /** Correo del jefe */
  correoJefe?: string;
  
  /** Fecha de creación */
  fechaCreacion?: string;
  
  /** Estado activo/inactivo */
  activo?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// DTOs DE PROYECTOS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * DTO para crear un nuevo proyecto
 * 
 * @interface
 */
export interface CrearProyectoRequest {
  /** Nombre del proyecto */
  nombre: string;
  
  /** Descripción del proyecto */
  descripcion: string;
  
  /** Estado inicial (por defecto 'Activo') */
  estado?: string;
}

/**
 * DTO para actualizar un proyecto
 * 
 * @interface
 */
export interface ActualizarProyectoRequest {
  /** Nuevo nombre */
  nombre?: string;
  
  /** Nueva descripción */
  descripcion?: string;
  
  /** Nuevo estado */
  estado?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// DTOs DE REPORTES Y ESTADÍSTICAS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * DTO para solicitar generación de un reporte
 * 
 * @interface
 */
export interface GenerarReporteRequest {
  /** Tipo de reporte */
  tipo: 'incidencias' | 'usuarios' | 'proyectos' | 'estadisticas';
  
  /** Formato de exportación */
  formato: 'pdf' | 'excel' | 'csv' | 'json';
  
  /** Fecha de inicio del rango */
  fechaInicio?: string;
  
  /** Fecha de fin del rango */
  fechaFin?: string;
  
  /** Filtros adicionales */
  filtros?: {
    estado?: string;
    prioridad?: string;
    proyecto?: string;
    asignado?: string;
  };
}

/**
 * DTO de estadísticas del sistema
 * 
 * @interface
 */
export interface EstadisticasResponse {
  /** Total de incidencias */
  totalIncidencias: number;
  
  /** Incidencias abiertas */
  incidenciasAbiertas: number;
  
  /** Incidencias en progreso */
  incidenciasEnProgreso: number;
  
  /** Incidencias pendientes */
  incidenciasPendientes: number;
  
  /** Incidencias resueltas */
  incidenciasResueltas: number;
  
  /** Distribución por prioridad */
  porPrioridad?: {
    baja: number;
    media: number;
    alta: number;
    critica: number;
  };
  
  /** Tiempo promedio de resolución en horas */
  tiempoPromedioResolucion?: number;
  
  /** Porcentaje de incidencias resueltas */
  porcentajeResueltas?: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIONES DE MAPEO (MAPPERS)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Mapea un IncidenciaBackendDTO a un objeto Incidencia del frontend
 * 
 * @param dto - Objeto recibido del backend
 * @returns Objeto Incidencia para uso en el frontend
 * 
 * @example
 * ```typescript
 * const incidencia = mapIncidenciaFromBackend(dtoDelBackend);
 * ```
 */
export function mapIncidenciaFromBackend(dto: IncidenciaBackendDTO): Incidencia {
  return {
    id: `INC-${String(dto.id).padStart(4, '0')}`,
    title: dto.titulo || 'Sin título',
    state: mapEstadoFromBackend(dto.estado),
    priority: mapPrioridadFromBackend(dto.impacto),
    assignee: dto.asignado || 'Sin asignar',
    project: dto.ubicacion || 'SWO',
    date: dto.fechaCreacion || new Date().toISOString().split('T')[0],
    tags: dto.tags ? JSON.parse(dto.tags) : [],
    comments: dto.comentarios ? JSON.parse(dto.comentarios) : [],
    user: `Usuario ${dto.idUsuarioReporta}`,
    userEmail: dto.correoUsuario || '',
    userPhones: dto.telefonosUsuario ? JSON.parse(dto.telefonosUsuario) : [],
    app: dto.aplicacion || 'SWO',
    reason: dto.descripcion || '',
    activity: dto.actividad || '',
    resolucion: dto.resolucion,
    fechaResolucion: dto.fechaResolucion,
  };
}

/**
 * Mapea el estado del backend al formato del frontend
 * 
 * @param estado - Estado en español del backend
 * @returns Estado en formato EstadoIncidencia
 */
export function mapEstadoFromBackend(estado: string): EstadoIncidencia | 'open' | 'inprogress' | 'pending' | 'resolved' {
  const mapeo: { [key: string]: any } = {
    'Abierto': 'open',
    'En Progreso': 'inprogress',
    'En progreso': 'inprogress',
    'Pendiente': 'pending',
    'Cerrado': 'resolved',
    'Resuelto': 'resolved',
  };
  return mapeo[estado] || 'open';
}

/**
 * Mapea el estado del frontend al formato del backend
 * 
 * @param estado - Estado en formato EstadoIncidencia
 * @returns Estado en español para el backend
 */
export function mapEstadoToBackend(estado: string): string {
  const mapeo: { [key: string]: string } = {
    'open': 'Abierto',
    'inprogress': 'En Progreso',
    'pending': 'Pendiente',
    'resolved': 'Resuelto',
  };
  return mapeo[estado] || 'Abierto';
}

/**
 * Mapea la prioridad del backend al formato del frontend
 * 
 * @param impacto - Impacto en español del backend
 * @returns Prioridad en formato PrioridadIncidencia
 */
export function mapPrioridadFromBackend(impacto: string): PrioridadIncidencia | 'Baja' | 'Media' | 'Alta' | 'Crítica' {
  const mapeo: { [key: string]: any } = {
    'Bajo': 'Baja',
    'Medio': 'Media',
    'Alto': 'Alta',
    'Critico': 'Crítica',
    'Crítico': 'Crítica',
  };
  return mapeo[impacto] || 'Media';
}

/**
 * Mapea la prioridad del frontend al formato del backend
 * 
 * @param prioridad - Prioridad en formato PrioridadIncidencia
 * @returns Impacto en español para el backend
 */
export function mapPrioridadToBackend(prioridad: string): string {
  const mapeo: { [key: string]: string } = {
    'Baja': 'Bajo',
    'Media': 'Medio',
    'Alta': 'Alto',
    'Crítica': 'Crítico',
  };
  return mapeo[prioridad] || 'Medio';
}
