/**
 * @fileoverview Definiciones de modelos e interfaces de dominio
 * 
 * Este archivo centraliza todas las definiciones de tipos TypeScript utilizadas
 * en la aplicación SWO. Incluye:
 * - Interfaces de entidades de dominio (Usuario, Incidencia, Proyecto)
 * - Tipos de datos complejos
 * - DTOs para comunicación con el backend
 * - Tipos auxiliares y utilitarios
 * 
 * **Convenciones de nomenclatura:**
 * - Interfaces de entidades: PascalCase (ej: Usuario, Incidencia)
 * - Propiedades: camelCase (ej: nombreUsuario, fechaCreacion)
 * - Propiedades opcionales: marcadas con `?` (ej: descripcion?: string)
 * 
 * **Principios aplicados:**
 * - Inmutabilidad: usar `readonly` donde sea apropiado
 * - Type-safety: evitar `any`, usar tipos específicos
 * - Documentación: cada interfaz y propiedad documentada con JSDoc
 * 
 * @author Equipo SWO
 * @version 2.0.0
 * @since 2026-04-19
 */

import { EstadoIncidencia, PrioridadIncidencia, RolUsuario, EstadoProyecto } from '../enums/app.enums';

// ═══════════════════════════════════════════════════════════════════════════
// ENTIDADES DE DOMINIO
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Representa un usuario del sistema SWO
 * 
 * Esta interfaz define la estructura completa de un usuario, incluyendo
 * información personal, de contacto y organizacional.
 * 
 * **Campos obligatorios:**
 * - id, nombre, apellido, correo
 * 
 * **Campos opcionales:**
 * - celular, area, jefeDirecto, correoJefe
 * 
 * **Relaciones:**
 * - Un usuario puede tener múltiples incidencias asignadas
 * - Un usuario pertenece a un área/departamento
 * - Un usuario puede tener un jefe directo
 * 
 * @interface
 * @example
 * ```typescript
 * const usuario: Usuario = {
 *   id: 'USR-001',
 *   nombre: 'Juan',
 *   apellido: 'Pérez',
 *   correo: 'juan.perez@empresa.com',
 *   celular: '+573001234567',
 *   area: 'Tecnología',
 *   jefeDirecto: 'María González',
 *   correoJefe: 'maria.gonzalez@empresa.com'
 * };
 * ```
 */
export interface Usuario {
  /** 
   * Identificador único del usuario
   * Formato: USR-XXXXX o numérico según backend
   * @example 'USR-00123' | '123'
   */
  id: string;

  /** 
   * Primer nombre del usuario
   * @minLength 2
   * @maxLength 50
   * @example 'Juan'
   */
  nombre: string;

  /** 
   * Apellido(s) del usuario
   * @minLength 2
   * @maxLength 50
   * @example 'Pérez García'
   */
  apellido: string;

  /** 
   * Correo electrónico institucional o personal
   * Debe ser único en el sistema
   * @format email
   * @example 'juan.perez@empresa.com'
   */
  correo: string;

  /** 
   * Número de celular o teléfono de contacto
   * @format phone
   * @optional
   * @example '+573001234567' | '3001234567'
   */
  celular?: string;

  /** 
   * Área, departamento o división a la que pertenece
   * @optional
   * @example 'Tecnología' | 'Recursos Humanos' | 'Finanzas'
   */
  area?: string;

  /** 
   * Nombre completo del jefe directo o supervisor
   * @optional
   * @example 'María González'
   */
  jefeDirecto?: string;

  /** 
   * Correo electrónico del jefe directo
   * @format email
   * @optional
   * @example 'maria.gonzalez@empresa.com'
   */
  correoJefe?: string;
}

/**
 * Representa un comentario en una incidencia
 * 
 * Los comentarios permiten llevar un historial de comunicación y seguimiento
 * de cada incidencia, incluyendo actualizaciones, preguntas y resoluciones.
 * 
 * **Uso:**
 * - Comunicación entre usuario reportante y técnico
 * - Registro de cambios de estado
 * - Documentación de la resolución
 * 
 * @interface
 * @example
 * ```typescript
 * const comentario: Comentario = {
 *   author: 'Juan Pérez',
 *   date: '2026-04-19T10:30:00',
 *   text: 'Se reinició el servidor y el problema se solucionó'
 * };
 * ```
 */
export interface Comentario {
  /** 
   * Nombre del autor del comentario
   * @example 'Juan Pérez' | 'Sistema Automático'
   */
  author: string;

  /** 
   * Fecha y hora de creación del comentario
   * @format ISO 8601
   * @example '2026-04-19T10:30:00.000Z'
   */
  date: string;

  /** 
   * Contenido textual del comentario
   * Puede incluir detalles técnicos, actualizaciones o resoluciones
   * @minLength 1
   * @maxLength 1000
   * @example 'Se identificó problema en el servidor. Procediendo a reiniciar servicios.'
   */
  text: string;
}

/**
 * Representa una incidencia en el sistema de gestión
 * 
 * Las incidencias son el núcleo del sistema SWO. Cada incidencia representa
 * un problema, solicitud o tarea que debe ser atendida por el equipo técnico.
 * 
 * **Ciclo de vida:**
 * 1. Creación (estado: 'open')
 * 2. Asignación a técnico
 * 3. En proceso (estado: 'inprogress')
 * 4. Resolución (estado: 'resolved')
 * 
 * **Estados posibles:**
 * - 'open': Recién creada, sin asignar
 * - 'inprogress': En proceso de resolución
 * - 'pending': Pausada, esperando información
 * - 'resolved': Solucionada y cerrada
 * 
 * @interface
 * @example
 * ```typescript
 * const incidencia: Incidencia = {
 *   id: 'INC-2314',
 *   title: 'No puedo acceder al sistema de nómina',
 *   state: 'open',
 *   priority: 'Alta',
 *   assignee: 'María González',
 *   project: 'SWO',
 *   date: '2026-04-19',
 *   tags: ['acceso', 'nómina', 'urgente'],
 *   comments: [],
 *   user: 'Juan Pérez',
 *   userEmail: 'juan.perez@empresa.com',
 *   userPhones: ['+573001234567'],
 *   app: 'Sistema de Nómina',
 *   reason: 'Error de autenticación',
 *   activity: 'Intentando ingresar al sistema'
 * };
 * ```
 */
export interface Incidencia {
  /** 
   * Identificador único de la incidencia
   * Formato: INC-XXXX (con padding de ceros)
   * @readonly
   * @example 'INC-0001' | 'INC-2314'
   */
  id: string;

  /** 
   * Título o descripción breve de la incidencia
   * Debe ser claro y descriptivo
   * @minLength 5
   * @maxLength 200
   * @example 'No puedo acceder al sistema de nómina'
   */
  title: string;

  /** 
   * Estado actual de la incidencia
   * @see EstadoIncidencia enum para valores válidos
   * @default 'open'
   */
  state: EstadoIncidencia | 'open' | 'inprogress' | 'pending' | 'resolved';

  /** 
   * Nivel de prioridad de la incidencia
   * Determina el orden de atención
   * @see PrioridadIncidencia enum para valores válidos
   * @default 'Media'
   */
  priority: PrioridadIncidencia | 'Baja' | 'Media' | 'Alta' | 'Crítica';

  /** 
   * Nombre del técnico o persona asignada
   * @default 'Sin asignar'
   * @example 'María González' | 'Sin asignar'
   */
  assignee: string;

  /** 
   * Proyecto o sistema al que pertenece la incidencia
   * @example 'SWO' | 'Sistema de Nómina' | 'Portal Web'
   */
  project: string;

  /** 
   * Fecha de creación de la incidencia
   * @format YYYY-MM-DD
   * @example '2026-04-19'
   */
  date: string;

  /** 
   * Etiquetas o categorías para clasificación
   * Facilita la búsqueda y filtrado
   * @example ['acceso', 'red', 'urgente']
   */
  tags: string[];

  /** 
   * Historial de comentarios y seguimiento
   * Ordenados cronológicamente (más reciente al final)
   */
  comments: Comentario[];

  /** 
   * Nombre del usuario que reportó la incidencia
   * @example 'Juan Pérez'
   */
  user: string;

  /** 
   * Correo del usuario reportante
   * @format email
   * @example 'juan.perez@empresa.com'
   */
  userEmail: string;

  /** 
   * Teléfonos de contacto del usuario reportante
   * @example ['+573001234567', '3109876543']
   */
  userPhones: string[];

  /** 
   * Aplicación o sistema afectado
   * @example 'Sistema de Nómina' | 'Correo Corporativo'
   */
  app: string;

  /** 
   * Motivo o causa de la incidencia
   * Descripción detallada del problema
   * @example 'Error de autenticación al intentar ingresar'
   */
  reason: string;

  /** 
   * Actividad que estaba realizando el usuario cuando ocurrió el problema
   * @example 'Intentando generar reporte mensual'
   */
  activity: string;

  /** 
   * Descripción de cómo se resolvió la incidencia
   * Solo se llena cuando la incidencia está resuelta
   * @optional
   * @example 'Se reiniciaron las credenciales del usuario'
   */
  resolucion?: string;

  /** 
   * Fecha en que se resolvió la incidencia
   * @format ISO 8601 o YYYY-MM-DD
   * @optional
   * @example '2026-04-19T15:30:00'
   */
  fechaResolucion?: string;
}

/**
 * Representa un proyecto en el sistema
 * 
 * Los proyectos permiten agrupar incidencias y usuarios por contexto organizacional.
 * Ejemplo: "Sistema de Nómina", "Portal Web", "ERP Empresarial"
 * 
 * @interface
 * @example
 * ```typescript
 * const proyecto: Proyecto = {
 *   id: 1,
 *   nombre: 'Sistema de Nómina',
 *   descripcion: 'Sistema de gestión de nómina y pagos',
 *   estado: 'Activo',
 *   fechaCreacion: '2026-01-15'
 * };
 * ```
 */
export interface Proyecto {
  /** 
   * Identificador único del proyecto
   * @example 1 | 42 | 123
   */
  id: number;

  /** 
   * Nombre del proyecto
   * @minLength 3
   * @maxLength 100
   * @example 'Sistema de Nómina' | 'Portal Web Corporativo'
   */
  nombre: string;

  /** 
   * Descripción detallada del proyecto
   * @minLength 10
   * @maxLength 500
   * @example 'Sistema integral de gestión de nómina y pagos de la empresa'
   */
  descripcion: string;

  /** 
   * Estado actual del proyecto
   * @see EstadoProyecto enum para valores válidos
   * @example 'Activo' | 'Inactivo' | 'Archivado'
   */
  estado: string;

  /** 
   * Fecha de creación del proyecto
   * @format YYYY-MM-DD
   * @optional
   * @example '2026-01-15'
   */
  fechaCreacion?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// MODELOS DE AUTENTICACIÓN
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Credenciales de autenticación para login
 * 
 * Estructura mínima requerida para autenticar un usuario en el sistema.
 * 
 * @interface
 * @example
 * ```typescript
 * const credenciales: Credenciales = {
 *   email: 'usuario@empresa.com',
 *   password: 'miPassword123'
 * };
 * ```
 */
export interface Credenciales {
  /** 
   * Correo electrónico del usuario
   * @format email
   * @required
   */
  email: string;

  /** 
   * Contraseña del usuario
   * @minLength 6
   * @required
   * @sensitive No debe ser logueada ni almacenada en texto plano
   */
  password: string;

  /** 
   * ID del proyecto (opcional, cargado desde backend)
   * @optional
   */
  project?: string;
}

/**
 * Usuario autenticado (extiende Usuario con información de sesión)
 * 
 * Representa un usuario con sesión activa, incluyendo información adicional
 * como rol, token de autenticación y proyecto asignado.
 * 
 * **Uso:**
 * - Almacenar en sessionStorage tras login exitoso
 * - Acceder desde AuthService.usuarioAutenticado$
 * - Usar para control de permisos y personalización de UI
 * 
 * @interface
 * @extends Usuario
 * @example
 * ```typescript
 * const usuarioAutenticado: UsuarioAutenticado = {
 *   id: 'USR-001',
 *   nombre: 'Juan',
 *   apellido: 'Pérez',
 *   correo: 'juan.perez@empresa.com',
 *   celular: '+573001234567',
 *   area: 'Tecnología',
 *   jefeDirecto: '',
 *   correoJefe: '',
 *   role: 'Administrador',
 *   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   idProyecto: 1,
 *   proyecto: 'SWO'
 * };
 * ```
 */
export interface UsuarioAutenticado extends Usuario {
  /** 
   * Rol del usuario en el sistema
   * Determina los permisos y funcionalidades disponibles
   * @see RolUsuario enum para valores válidos
   * @example 'Administrador' | 'Analista' | 'Técnico' | 'Usuario'
   */
  role: string;

  /** 
   * Token JWT de autenticación
   * Usado para autenticar peticiones al backend
   * @optional
   * @sensitive No debe ser expuesto en logs
   * @example 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM...'
   */
  token?: string;

  /** 
   * ID del proyecto asignado al usuario
   * @optional
   * @example 1 | 5 | 42
   */
  idProyecto?: number;

  /** 
   * Nombre del proyecto asignado al usuario
   * @optional
   * @example 'SWO' | 'Sistema de Nómina'
   */
  proyecto?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// MODELOS AUXILIARES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Representa un reporte generado del sistema
 * 
 * @interface
 * @example
 * ```typescript
 * const reporte: Reporte = {
 *   nombre: 'Incidencias Mensuales',
 *   fecha: '2026-04-19',
 *   formato: 'PDF',
 *   descripcion: 'Reporte de todas las incidencias del mes de abril'
 * };
 * ```
 */
export interface Reporte {
  /** 
   * Nombre descriptivo del reporte
   * @example 'Incidencias Mensuales' | 'Estadísticas Anuales'
   */
  nombre: string;

  /** 
   * Fecha de generación del reporte
   * @format YYYY-MM-DD
   * @example '2026-04-19'
   */
  fecha: string;

  /** 
   * Formato de exportación del reporte
   * @example 'PDF' | 'CSV' | 'Excel' | 'JSON'
   */
  formato: string;

  /** 
   * Descripción adicional del reporte
   * @optional
   * @example 'Reporte de todas las incidencias del mes de abril'
   */
  descripcion?: string;
}

/**
 * Métrica o KPI del sistema
 * 
 * Representa un valor cuantitativo para dashboards y reportes
 * 
 * @interface
 * @example
 * ```typescript
 * const metrica: Metrica = {
 *   nombre: 'Incidencias Abiertas',
 *   valor: 42,
 *   unidad: 'tickets',
 *   delta: '+5%'
 * };
 * ```
 */
export interface Metrica {
  /** 
   * Nombre de la métrica
   * @example 'Incidencias Abiertas' | 'Tiempo Promedio de Resolución'
   */
  nombre: string;

  /** 
   * Valor numérico de la métrica
   * @example 42 | 3.5 | 1234
   */
  valor: number;

  /** 
   * Unidad de medida
   * @optional
   * @example 'tickets' | 'horas' | 'días' | '%'
   */
  unidad?: string;

  /** 
   * Variación respecto al período anterior
   * @optional
   * @example '+5%' | '-10%' | '+3 tickets'
   */
  delta?: string;
}

/**
 * Configuración de preferencias del usuario
 * 
 * @interface
 * @example
 * ```typescript
 * const config: Configuracion = {
 *   guardarHistorial: true,
 *   tema: 'oscuro',
 *   notificaciones: true
 * };
 * ```
 */
export interface Configuracion {
  /** 
   * Si se debe guardar el historial del chatbot
   * @default false
   */
  guardarHistorial: boolean;

  /** 
   * Tema visual preferido
   * @example 'oscuro' | 'claro'
   */
  tema: 'oscuro' | 'claro';

  /** 
   * Si las notificaciones están habilitadas
   * @default true
   */
  notificaciones: boolean;
  
  /**
   * Correo del jefe directo
   * @format email
   * @optional
   * @example 'maria.gonzalez@empresa.com'
   */
  correoJefe?: string;
}

/**
 * Representa un comentario en una incidencia
 * 
 * Los comentarios permiten llevar un historial de comunicación y seguimiento
 * de cada incidencia, incluyendo actualizaciones, preguntas y resoluciones.
 * 
 * **Uso:**
 * - Comunicación entre usuario reportante y técnico
 * - Registro de cambios de estado
 * - Documentación de la resolución
 * 
 * @interface
 * @example
 * ```typescript
 * const comentario: Comentario = {
 *   author: 'Juan Pérez',
 *   date: '2026-04-19T10:30:00',
 *   text: 'Se reinició el servidor y el problema se solucionó'
 * };
 * ```
 */
export interface Comentario {
  /** 
   * Nombre del autor del comentario
   * @example 'Juan Pérez' | 'Sistema Automático'
   */
  author: string;

  /** 
   * Fecha y hora de creación del comentario
   * @format ISO 8601
   * @example '2026-04-19T10:30:00.000Z'
   */
  date: string;

  /** 
   * Contenido textual del comentario
   * Puede incluir detalles técnicos, actualizaciones o resoluciones
   * @minLength 1
   * @maxLength 1000
   * @example 'Se identificó problema en el servidor. Procediendo a reiniciar servicios.'
   */
  text: string;
}

/**
 * Representa una incidencia en el sistema de gestión
 * 
 * Las incidencias son el núcleo del sistema SWO. Cada incidencia representa
 * un problema, solicitud o tarea que debe ser atendida por el equipo técnico.
 * 
 * **Ciclo de vida:**
 * 1. Creación (estado: 'open')
 * 2. Asignación a técnico
 * 3. En proceso (estado: 'inprogress')
 * 4. Resolución (estado: 'resolved')
 * 
 * **Estados posibles:**
 * - 'open': Recién creada, sin asignar
 * - 'inprogress': En proceso de resolución
 * - 'pending': Pausada, esperando información
 * - 'resolved': Solucionada y cerrada
 * 
 * @interface
 * @example
 * ```typescript
 * const incidencia: Incidencia = {
 *   id: 'INC-2314',
 *   title: 'No puedo acceder al sistema de nómina',
 *   state: 'open',
 *   priority: 'Alta',
 *   assignee: 'María González',
 *   project: 'SWO',
 *   date: '2026-04-19',
 *   tags: ['acceso', 'nómina', 'urgente'],
 *   comments: [],
 *   user: 'Juan Pérez',
 *   userEmail: 'juan.perez@empresa.com',
 *   userPhones: ['+573001234567'],
 *   app: 'Sistema de Nómina',
 *   reason: 'Error de autenticación',
 *   activity: 'Intentando ingresar al sistema'
 * };
 * ```
 */
export interface Incidencia {
  /** 
   * Identificador único de la incidencia
   * Formato: INC-XXXX (con padding de ceros)
   * @readonly
   * @example 'INC-0001' | 'INC-2314'
   */
  id: string;

  /** 
   * Título o descripción breve de la incidencia
   * Debe ser claro y descriptivo
   * @minLength 5
   * @maxLength 200
   * @example 'No puedo acceder al sistema de nómina'
   */
  title: string;

  /** 
   * Estado actual de la incidencia
   * @see EstadoIncidencia enum para valores válidos
   * @default 'open'
   */
  state: EstadoIncidencia | 'open' | 'inprogress' | 'pending' | 'resolved';

  /** 
   * Nivel de prioridad de la incidencia
   * Determina el orden de atención
   * @see PrioridadIncidencia enum para valores válidos
   * @default 'Media'
   */
  priority: PrioridadIncidencia | 'Baja' | 'Media' | 'Alta' | 'Crítica';

  /** 
   * Nombre del técnico o persona asignada
   * @default 'Sin asignar'
   * @example 'María González' | 'Sin asignar'
   */
  assignee: string;

  /** 
   * Proyecto o sistema al que pertenece la incidencia
   * @example 'SWO' | 'Sistema de Nómina' | 'Portal Web'
   */
  project: string;

  /** 
   * Fecha de creación de la incidencia
   * @format YYYY-MM-DD
   * @example '2026-04-19'
   */
  date: string;

  /** 
   * Etiquetas o categorías para clasificación
   * Facilita la búsqueda y filtrado
   * @example ['acceso', 'red', 'urgente']
   */
  tags: string[];

  /** 
   * Historial de comentarios y seguimiento
   * Ordenados cronológicamente (más reciente al final)
   */
  comments: Comentario[];

  /** 
   * Nombre del usuario que reportó la incidencia
   * @example 'Juan Pérez'
   */
  user: string;

  /** 
   * Correo del usuario reportante
   * @format email
   * @example 'juan.perez@empresa.com'
   */
  userEmail: string;

  /** 
   * Teléfonos de contacto del usuario reportante
   * @example ['+573001234567', '3109876543']
   */
  userPhones: string[];

  /** 
   * Aplicación o sistema afectado
   * @example 'Sistema de Nómina' | 'Correo Corporativo'
   */
  app: string;

  /** 
   * Motivo o causa de la incidencia
   * Descripción detallada del problema
   * @example 'Error de autenticación al intentar ingresar'
   */
  reason: string;

  /** 
   * Actividad que estaba realizando el usuario cuando ocurrió el problema
   * @example 'Intentando generar reporte mensual'
   */
  activity: string;

  /** 
   * Descripción de cómo se resolvió la incidencia
   * Solo se llena cuando la incidencia está resuelta
   * @optional
   * @example 'Se reiniciaron las credenciales del usuario'
   */
  resolucion?: string;

  /** 
   * Fecha en que se resolvió la incidencia
   * @format ISO 8601 o YYYY-MM-DD
   * @optional
   * @example '2026-04-19T15:30:00'
   */
  fechaResolucion?: string;
}

/**
 * Representa un proyecto en el sistema
 * 
 * Los proyectos permiten agrupar incidencias y usuarios por contexto organizacional.
 * Ejemplo: "Sistema de Nómina", "Portal Web", "ERP Empresarial"
 * 
 * @interface
 * @example
 * ```typescript
 * const proyecto: Proyecto = {
 *   id: 1,
 *   nombre: 'Sistema de Nómina',
 *   descripcion: 'Sistema de gestión de nómina y pagos',
 *   estado: 'Activo',
 *   fechaCreacion: '2026-01-15'
 * };
 * ```
 */
export interface Proyecto {
  /** 
   * Identificador único del proyecto
   * @example 1 | 42 | 123
   */
  id: number;

  /** 
   * Nombre del proyecto
   * @minLength 3
   * @maxLength 100
   * @example 'Sistema de Nómina' | 'Portal Web Corporativo'
   */
  nombre: string;

  /** 
   * Descripción detallada del proyecto
   * @minLength 10
   * @maxLength 500
   * @example 'Sistema integral de gestión de nómina y pagos de la empresa'
   */
  descripcion: string;

  /** 
   * Estado actual del proyecto
   * @see EstadoProyecto enum para valores válidos
   * @example 'Activo' | 'Inactivo' | 'Archivado'
   */
  estado: string;

  /** 
   * Fecha de creación del proyecto
   * @format YYYY-MM-DD
   * @optional
   * @example '2026-01-15'
   */
  fechaCreacion?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// MODELOS DE AUTENTICACIÓN
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Credenciales de autenticación para login
 * 
 * Estructura mínima requerida para autenticar un usuario en el sistema.
 * 
 * @interface
 * @example
 * ```typescript
 * const credenciales: Credenciales = {
 *   email: 'usuario@empresa.com',
 *   password: 'miPassword123'
 * };
 * ```
 */
export interface Credenciales {
  /** 
   * Correo electrónico del usuario
   * @format email
   * @required
   */
  email: string;

  /** 
   * Contraseña del usuario
   * @minLength 6
   * @required
   * @sensitive No debe ser logueada ni almacenada en texto plano
   */
  password: string;

  /** 
   * ID del proyecto (opcional, cargado desde backend)
   * @optional
   */
  project?: string;
}

/**
 * Usuario autenticado (extiende Usuario con información de sesión)
 * 
 * Representa un usuario con sesión activa, incluyendo información adicional
 * como rol, token de autenticación y proyecto asignado.
 * 
 * **Uso:**
 * - Almacenar en sessionStorage tras login exitoso
 * - Acceder desde AuthService.usuarioAutenticado$
 * - Usar para control de permisos y personalización de UI
 * 
 * @interface
 * @extends Usuario
 * @example
 * ```typescript
 * const usuarioAutenticado: UsuarioAutenticado = {
 *   id: 'USR-001',
 *   nombre: 'Juan',
 *   apellido: 'Pérez',
 *   correo: 'juan.perez@empresa.com',
 *   celular: '+573001234567',
 *   area: 'Tecnología',
 *   jefeDirecto: '',
 *   correoJefe: '',
 *   role: 'Administrador',
 *   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   idProyecto: 1,
 *   proyecto: 'SWO'
 * };
 * ```
 */
export interface UsuarioAutenticado extends Usuario {
  /** 
   * Rol del usuario en el sistema
   * Determina los permisos y funcionalidades disponibles
   * @see RolUsuario enum para valores válidos
   * @example 'Administrador' | 'Analista' | 'Técnico' | 'Usuario'
   */
  role: string;

  /** 
   * Token JWT de autenticación
   * Usado para autenticar peticiones al backend
   * @optional
   * @sensitive No debe ser expuesto en logs
   * @example 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM...'
   */
  token?: string;

  /** 
   * ID del proyecto asignado al usuario
   * @optional
   * @example 1 | 5 | 42
   */
  idProyecto?: number;

  /** 
   * Nombre del proyecto asignado al usuario
   * @optional
   * @example 'SWO' | 'Sistema de Nómina'
   */
  proyecto?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// MODELOS AUXILIARES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Representa un reporte generado del sistema
 * 
 * @interface
 * @example
 * ```typescript
 * const reporte: Reporte = {
 *   nombre: 'Incidencias Mensuales',
 *   fecha: '2026-04-19',
 *   formato: 'PDF',
 *   descripcion: 'Reporte de todas las incidencias del mes de abril'
 * };
 * ```
 */
export interface Reporte {
  /** 
   * Nombre descriptivo del reporte
   * @example 'Incidencias Mensuales' | 'Estadísticas Anuales'
   */
  nombre: string;

  /** 
   * Fecha de generación del reporte
   * @format YYYY-MM-DD
   * @example '2026-04-19'
   */
  fecha: string;

  /** 
   * Formato de exportación del reporte
   * @example 'PDF' | 'CSV' | 'Excel' | 'JSON'
   */
  formato: string;

  /** 
   * Descripción adicional del reporte
   * @optional
   * @example 'Reporte de todas las incidencias del mes de abril'
   */
  descripcion?: string;
}

/**
 * Métrica o KPI del sistema
 * 
 * Representa un valor cuantitativo para dashboards y reportes
 * 
 * @interface
 * @example
 * ```typescript
 * const metrica: Metrica = {
 *   nombre: 'Incidencias Abiertas',
 *   valor: 42,
 *   unidad: 'tickets',
 *   delta: '+5%'
 * };
 * ```
 */
export interface Metrica {
  /** 
   * Nombre de la métrica
   * @example 'Incidencias Abiertas' | 'Tiempo Promedio de Resolución'
   */
  nombre: string;

  /** 
   * Valor numérico de la métrica
   * @example 42 | 3.5 | 1234
   */
  valor: number;

  /** 
   * Unidad de medida
   * @optional
   * @example 'tickets' | 'horas' | 'días' | '%'
   */
  unidad?: string;

  /** 
   * Variación respecto al período anterior
   * @optional
   * @example '+5%' | '-10%' | '+3 tickets'
   */
  delta?: string;
}

/**
 * Configuración de preferencias del usuario
 * 
 * @interface
 * @example
 * ```typescript
 * const config: Configuracion = {
 *   guardarHistorial: true,
 *   tema: 'oscuro',
 *   notificaciones: true
 * };
 * ```
 */
export interface Configuracion {
  /** 
   * Si se debe guardar el historial del chatbot
   * @default false
   */
  guardarHistorial: boolean;

  /** 
   * Tema visual preferido
   * @example 'oscuro' | 'claro'
   */
  tema: 'oscuro' | 'claro';

  /** 
   * Si las notificaciones están habilitadas
   * @default true
   */
  notificaciones: boolean;
}
