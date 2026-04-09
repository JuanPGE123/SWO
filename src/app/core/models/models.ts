/**
 * models.ts
 * 
 * Archivo de definiciones de interfaces y tipos para la aplicación SWO.
 * Centraliza todas las estructuras de datos usadas en toda la app para
 * mantener consistencia de tipos y facilitar el mantenimiento.
 */

/**
 * Usuario: representa un usuario del sistema
 * - Contiene datos básicos, contacto y relaciones organizacionales
 */
export interface Usuario {
  id: string;           // ID único del usuario
  nombre: string;       // Primer nombre
  apellido: string;     // Apellido
  correo: string;       // Correo electrónico
  celular: string;      // Número de celular
  area: string;         // Área/departamento al que pertenece
  jefeDirecto: string;  // Nombre del jefe directo
  correoJefe: string;   // Correo del jefe directo
}

/**
 * Comentario: representa un comentario en un incidente
 * - Usado para el historial de comunicación dentro de incidentes
 */
export interface Comentario {
  author: string;       // Nombre/usuario del autor
  date: string;         // Fecha y hora del comentario
  text: string;         // Contenido del comentario
}

/**
 * Incidencia: representa un incidente en el sistema
 * - Estructura completa con todos los datos relacionados a un ticket
 */
export interface Incidencia {
  id: string;                  // ID único del incidente (ej: INC-2314)
  title: string;               // Título/descripción breve
  state: 'open' | 'inprogress' | 'pending' | 'resolved'; // Estado actual
  priority: 'Baja' | 'Media' | 'Alta' | 'Crítica';  // Nivel de prioridad
  assignee: string;            // Persona asignada
  project: string;             // Proyecto asociado
  date: string;                // Fecha de creación
  tags: string[];              // Etiquetas/categorías
  comments: Comentario[];       // Historial de comentarios
  user: string;                // Usuario reportante
  userEmail: string;           // Email del usuario reportante
  userPhones: string[];        // Teléfonos del usuario
  app: string;                 // Aplicación afectada
  reason: string;              // Motivo/causa del incidente
  activity: string;            // Actividad que estaba realizando
  resolucion?: string;         // Descripción de cómo se resolvió
  fechaResolucion?: string;    // Fecha de resolución
}

/**
 * Reporte: estructura para los reportes del sistema
 * - Agregación de datos para análisis
 */
export interface Reporte {
  nombre: string;        // Nombre del reporte
  fecha: string;         // Fecha del reporte
  formato: string;       // Formato (PDF, CSV, Excel)
  descripcion?: string;  // Descripción adicional
}

/**
 * Credenciales: datos de autenticación
 * - Usadas en el formulario de login
 */
export interface Credenciales {
  email: string;         // Correo del usuario
  password: string;      // Contraseña
  project?: string;      // ID del proyecto (opcional, se carga desde backend)
}

/**
 * Proyecto: proyecto del sistema al que se pueden asignar usuarios
 */
export interface Proyecto {
  id: number;            // ID único
  nombre: string;        // Nombre del proyecto
  descripcion: string;   // Descripción
  estado: string;        // Activo | Archivado
  fechaCreacion?: string; // Fecha de creación
}

/**
 * Usuario Autenticado: información del usuario en sesión
 * - Extendida de Usuario con información adicional de sesión
 */
export interface UsuarioAutenticado extends Usuario {
  role: string;          // Rol del usuario (Administrador, Analista, etc)
  token?: string;        // Token de autenticación (si aplica)
  idProyecto?: number;   // ID del proyecto asignado
  proyecto?: string;     // Nombre del proyecto asignado
}

/**
 * Métrica: estructura para datos cuantitativos
 * - Usada en dashboards y reportes
 */
export interface Metrica {
  nombre: string;        // Nombre de la métrica
  valor: number;         // Valor numérico
  unidad?: string;       // Unidad de medida
  delta?: string;        // Cambio vs período anterior
}

/**
 * Configuración: estructura para opciones del usuario
 * - Preferencias y configuraciones personales
 */
export interface Configuracion {
  guardarHistorial: boolean;  // Si guardar historial de chat
  tema: 'oscuro' | 'claro';   // Tema visual preferido
  notificaciones: boolean;    // Habilitar notificaciones
}
