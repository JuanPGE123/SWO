-- ============================================
-- Script de Base de Datos para SWO
-- Sistema Web para la Gestión de Incidencias
-- Versión Completa - Todos los Módulos
-- ============================================

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS swo_db;

-- Usar la base de datos
USE swo_db;

-- ============================================
-- ELIMINAR TABLAS EXISTENTES (en orden correcto)
-- ============================================
DROP TABLE IF EXISTS logs_actividad;
DROP TABLE IF EXISTS notificaciones;
DROP TABLE IF EXISTS reportes_personalizados;
DROP TABLE IF EXISTS chatbot_mensajes;
DROP TABLE IF EXISTS chatbot_conversaciones;
DROP TABLE IF EXISTS archivos_adjuntos;
DROP TABLE IF EXISTS comentarios_incidencia;
DROP TABLE IF EXISTS asignaciones;
DROP TABLE IF EXISTS incidencias;
DROP TABLE IF EXISTS prioridades;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS empleados;
DROP TABLE IF EXISTS usuarios;

-- ============================================
-- TABLA: usuarios
-- ============================================
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'Usuario',
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    telefono VARCHAR(20),
    departamento VARCHAR(50),
    foto_perfil VARCHAR(255),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultima_conexion DATETIME,
    CONSTRAINT chk_rol CHECK (rol IN ('Soporte', 'Jefe', 'Usuario', 'Administrador'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: empleados
-- ============================================
CREATE TABLE empleados (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    codigo_empleado VARCHAR(20) NOT NULL UNIQUE,
    cargo VARCHAR(100) NOT NULL,
    area VARCHAR(50) NOT NULL,
    jefe_inmediato INT,
    salario DECIMAL(10, 2),
    fecha_ingreso DATE NOT NULL,
    fecha_salida DATE,
    estado_laboral VARCHAR(20) DEFAULT 'Activo',
    CONSTRAINT fk_empleado_usuario FOREIGN KEY (id_usuario) 
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_jefe_inmediato FOREIGN KEY (jefe_inmediato)
        REFERENCES empleados(id_empleado)
        ON DELETE SET NULL,
    CONSTRAINT chk_estado_laboral CHECK (estado_laboral IN ('Activo', 'Inactivo', 'Suspendido', 'Retirado'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: categorias
-- ============================================
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    color VARCHAR(7) DEFAULT '#4CAF50',
    icono VARCHAR(50),
    estado BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: prioridades
-- ============================================
CREATE TABLE prioridades (
    id_prioridad INT AUTO_INCREMENT PRIMARY KEY,
    nombre_prioridad VARCHAR(50) NOT NULL UNIQUE,
    nivel INT NOT NULL,
    tiempo_respuesta_hrs INT NOT NULL,
    color VARCHAR(7) DEFAULT '#2196F3',
    descripcion TEXT,
    estado BOOLEAN DEFAULT TRUE,
    CONSTRAINT chk_nivel_prioridad CHECK (nivel BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: incidencias
-- ============================================
CREATE TABLE incidencias (
    id_incidencia INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'Abierto',
    id_categoria INT,
    id_prioridad INT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    fecha_cierre DATETIME,
    id_usuario_reporta INT NOT NULL,
    ubicacion VARCHAR(100),
    impacto VARCHAR(20) DEFAULT 'Medio',
    CONSTRAINT fk_usuario_reporta FOREIGN KEY (id_usuario_reporta) 
        REFERENCES usuarios(id_usuario)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT fk_categoria_incidencia FOREIGN KEY (id_categoria)
        REFERENCES categorias(id_categoria)
        ON DELETE SET NULL,
    CONSTRAINT fk_prioridad_incidencia FOREIGN KEY (id_prioridad)
        REFERENCES prioridades(id_prioridad)
        ON DELETE SET NULL,
    CONSTRAINT chk_estado CHECK (estado IN ('Abierto', 'En Progreso', 'Pendiente', 'Resuelto', 'Cerrado', 'Cancelado')),
    CONSTRAINT chk_impacto CHECK (impacto IN ('Bajo', 'Medio', 'Alto', 'Crítico'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: asignaciones
-- ============================================
CREATE TABLE asignaciones (
    id_asignacion INT AUTO_INCREMENT PRIMARY KEY,
    id_incidencia INT NOT NULL,
    id_empleado INT NOT NULL,
    fecha_asignacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_finalizacion DATETIME,
    estado_asignacion VARCHAR(20) DEFAULT 'Asignado',
    notas TEXT,
    calificacion INT,
    CONSTRAINT fk_asignacion_incidencia FOREIGN KEY (id_incidencia)
        REFERENCES incidencias(id_incidencia)
        ON DELETE CASCADE,
    CONSTRAINT fk_asignacion_empleado FOREIGN KEY (id_empleado)
        REFERENCES empleados(id_empleado)
        ON DELETE RESTRICT,
    CONSTRAINT chk_estado_asignacion CHECK (estado_asignacion IN ('Asignado', 'En Proceso', 'Completado', 'Reasignado')),
    CONSTRAINT chk_calificacion CHECK (calificacion BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: comentarios_incidencia
-- ============================================
CREATE TABLE comentarios_incidencia (
    id_comentario INT AUTO_INCREMENT PRIMARY KEY,
    id_incidencia INT NOT NULL,
    id_usuario INT NOT NULL,
    comentario TEXT NOT NULL,
    es_solucion BOOLEAN DEFAULT FALSE,
    fecha_comentario DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comentario_incidencia FOREIGN KEY (id_incidencia)
        REFERENCES incidencias(id_incidencia)
        ON DELETE CASCADE,
    CONSTRAINT fk_comentario_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: archivos_adjuntos
-- ============================================
CREATE TABLE archivos_adjuntos (
    id_archivo INT AUTO_INCREMENT PRIMARY KEY,
    id_incidencia INT NOT NULL,
    nombre_archivo VARCHAR(255) NOT NULL,
    ruta_archivo VARCHAR(500) NOT NULL,
    tipo_archivo VARCHAR(50),
    tamano_kb INT,
    id_usuario_subio INT NOT NULL,
    fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_archivo_incidencia FOREIGN KEY (id_incidencia)
        REFERENCES incidencias(id_incidencia)
        ON DELETE CASCADE,
    CONSTRAINT fk_archivo_usuario FOREIGN KEY (id_usuario_subio)
        REFERENCES usuarios(id_usuario)
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: chatbot_conversaciones
-- ============================================
CREATE TABLE chatbot_conversaciones (
    id_conversacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    sesion_id VARCHAR(100) NOT NULL UNIQUE,
    fecha_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_fin DATETIME,
    estado_conversacion VARCHAR(20) DEFAULT 'Activa',
    ip_usuario VARCHAR(45),
    CONSTRAINT fk_chatbot_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE SET NULL,
    CONSTRAINT chk_estado_conversacion CHECK (estado_conversacion IN ('Activa', 'Finalizada', 'Abandonada'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: chatbot_mensajes
-- ============================================
CREATE TABLE chatbot_mensajes (
    id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
    id_conversacion INT NOT NULL,
    tipo_mensaje VARCHAR(20) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_mensaje DATETIME DEFAULT CURRENT_TIMESTAMP,
    intencion VARCHAR(100),
    confianza DECIMAL(3, 2),
    CONSTRAINT fk_mensaje_conversacion FOREIGN KEY (id_conversacion)
        REFERENCES chatbot_conversaciones(id_conversacion)
        ON DELETE CASCADE,
    CONSTRAINT chk_tipo_mensaje CHECK (tipo_mensaje IN ('Usuario', 'Bot', 'Sistema'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: reportes_personalizados
-- ============================================
CREATE TABLE reportes_personalizados (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre_reporte VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tipo_reporte VARCHAR(50) NOT NULL,
    parametros JSON,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultima_ejecucion DATETIME,
    es_publico BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_reporte_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: notificaciones
-- ============================================
CREATE TABLE notificaciones (
    id_notificacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo_notificacion VARCHAR(50) NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    leida BOOLEAN DEFAULT FALSE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_lectura DATETIME,
    enlace VARCHAR(255),
    CONSTRAINT fk_notificacion_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: logs_actividad
-- ============================================
CREATE TABLE logs_actividad (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    accion VARCHAR(100) NOT NULL,
    tabla_afectada VARCHAR(50),
    id_registro_afectado INT,
    descripcion TEXT,
    ip_origen VARCHAR(45),
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_log_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- ÍNDICES PARA MEJORAR RENDIMIENTO
-- ============================================
CREATE INDEX idx_usuario_rol ON usuarios(rol);
CREATE INDEX idx_usuario_estado ON usuarios(estado);
CREATE INDEX idx_usuario_correo ON usuarios(correo);

CREATE INDEX idx_empleado_codigo ON empleados(codigo_empleado);
CREATE INDEX idx_empleado_estado ON empleados(estado_laboral);

CREATE INDEX idx_incidencia_estado ON incidencias(estado);
CREATE INDEX idx_incidencia_fecha ON incidencias(fecha_creacion);
CREATE INDEX idx_incidencia_prioridad ON incidencias(id_prioridad);
CREATE INDEX idx_incidencia_categoria ON incidencias(id_categoria);

CREATE INDEX idx_asignacion_estado ON asignaciones(estado_asignacion);
CREATE INDEX idx_asignacion_fecha ON asignaciones(fecha_asignacion);

CREATE INDEX idx_comentario_fecha ON comentarios_incidencia(fecha_comentario);

CREATE INDEX idx_chatbot_sesion ON chatbot_conversaciones(sesion_id);
CREATE INDEX idx_chatbot_estado ON chatbot_conversaciones(estado_conversacion);

CREATE INDEX idx_notificacion_leida ON notificaciones(leida);
CREATE INDEX idx_notificacion_fecha ON notificaciones(fecha_creacion);

CREATE INDEX idx_log_fecha ON logs_actividad(fecha_hora);
CREATE INDEX idx_log_accion ON logs_actividad(accion);

-- ============================================
-- DATOS DE PRUEBA
-- ============================================

-- ========== usuarios ==========
INSERT INTO usuarios (nombre_completo, correo, password_hash, rol, estado, telefono, departamento) VALUES
('María García López', 'maria.garcia@swo.com', '$2y$10$example1', 'Jefe', TRUE, '3001234567', 'Administración'),
('Carlos Rodríguez Pérez', 'carlos.rodriguez@swo.com', '$2y$10$example2', 'Soporte', TRUE, '3007654321', 'TI'),
('Ana Martínez Sánchez', 'ana.martinez@swo.com', '$2y$10$example3', 'Usuario', TRUE, '3009876543', 'Ventas'),
('Luis Hernández Torres', 'luis.hernandez@swo.com', '$2y$10$example4', 'Usuario', TRUE, '3002345678', 'Contabilidad'),
('Sandra López Ramírez', 'sandra.lopez@swo.com', '$2y$10$example5', 'Soporte', TRUE, '3003456789', 'TI'),
('Pedro González Díaz', 'pedro.gonzalez@swo.com', '$2y$10$example6', 'Administrador', TRUE, '3004567890', 'TI'),
('Laura Fernández Castro', 'laura.fernandez@swo.com', '$2y$10$example7', 'Usuario', TRUE, '3005678901', 'Recursos Humanos');

-- ========== empleados ==========
INSERT INTO empleados (id_usuario, codigo_empleado, cargo, area, fecha_ingreso, salario, estado_laboral) VALUES
(1, 'EMP-001', 'Gerente General', 'Administración', '2020-01-15', 8000000, 'Activo'),
(2, 'EMP-002', 'Técnico de Soporte TI', 'TI', '2021-03-20', 3500000, 'Activo'),
(3, 'EMP-003', 'Asistente de Ventas', 'Ventas', '2022-06-10', 2800000, 'Activo'),
(4, 'EMP-004', 'Contador', 'Contabilidad', '2021-09-01', 4200000, 'Activo'),
(5, 'EMP-005', 'Ingeniero de Soporte', 'TI', '2023-02-14', 4500000, 'Activo'),
(6, 'EMP-006', 'Administrador de Sistemas', 'TI', '2020-05-10', 6000000, 'Activo'),
(7, 'EMP-007', 'Analista de RRHH', 'Recursos Humanos', '2022-11-20', 3800000, 'Activo');

-- ========== categorias ==========
INSERT INTO categorias (nombre_categoria, descripcion, color, icono) VALUES
('Hardware', 'Problemas con equipos físicos (PC, impresoras, etc.)', '#FF5722', 'fa-desktop'),
('Software', 'Errores en aplicaciones y sistemas', '#2196F3', 'fa-code'),
('Red', 'Problemas de conectividad e internet', '#4CAF50', 'fa-wifi'),
('Acceso', 'Permisos y autenticación', '#FFC107', 'fa-key'),
('Email', 'Problemas con correo electrónico', '#9C27B0', 'fa-envelope'),
('Telefonía', 'Problemas con líneas telefónicas', '#00BCD4', 'fa-phone'),
('Infraestructura', 'Servidores, bases de datos', '#607D8B', 'fa-server'),
('Otros', 'Incidencias no categorizadas', '#9E9E9E', 'fa-question-circle');

-- ========== prioridades ==========
INSERT INTO prioridades (nombre_prioridad, nivel, tiempo_respuesta_hrs, color, descripcion) VALUES
('Crítica', 1, 1, '#D32F2F', 'Afecta operaciones críticas, requiere atención inmediata'),
('Alta', 2, 4, '#FF6F00', 'Impacto significativo en el negocio'),
('Media', 3, 24, '#FBC02D', 'Impacto moderado, puede esperar'),
('Baja', 4, 72, '#388E3C', 'Impacto mínimo, sin urgencia'),
('Planificada', 5, 168, '#1976D2', 'Cambios o mejoras programadas');

-- ========== incidencias ==========
INSERT INTO incidencias (titulo, descripcion, estado, id_categoria, id_prioridad, id_usuario_reporta, impacto) VALUES
('Error en el sistema de autenticación', 'Los usuarios no pueden iniciar sesión con sus credenciales correctas. El sistema muestra mensaje de error 500.', 'Abierto', 4, 1, 3, 'Crítico'),
('Lentitud en la carga de reportes', 'El módulo de reportes tarda más de 2 minutos en cargar la información mensual. Esto afecta la productividad del equipo.', 'En Progreso', 2, 2, 4, 'Alto'),
('Actualización de permisos de usuario', 'Solicito actualizar los permisos para poder acceder al módulo de configuración avanzada.', 'Abierto', 4, 3, 3, 'Medio'),
('Base de datos desconectada', 'El sistema perdió conexión con la base de datos principal durante la mañana. Se requiere revisión urgente.', 'Cerrado', 7, 1, 4, 'Crítico'),
('Impresora no funciona en recepción', 'La impresora HP del área de recepción no responde. Muestra luz roja intermitente.', 'Abierto', 1, 3, 7, 'Medio'),
('Solicitud de instalación de software', 'Necesito que instalen Adobe Reader en mi computador para poder abrir documentos PDF.', 'Pendiente', 2, 4, 3, 'Bajo'),
('Internet lento en toda la oficina', 'La velocidad de internet está muy reducida desde el mediodía. Afecta a todos los usuarios.', 'En Progreso', 3, 2, 7, 'Alto');

-- ========== asignaciones ==========
INSERT INTO asignaciones (id_incidencia, id_empleado, estado_asignacion, notas) VALUES
(1, 2, 'En Proceso', 'Revisando logs del servidor de autenticación'),
(2, 2, 'En Proceso', 'Optimizando consultas a la base de datos'),
(4, 2, 'Completado', 'Se reinició el servicio MySQL y se verificó la conexión'),
(7, 5, 'En Proceso', 'Contactando al proveedor de internet para diagnóstico');

-- Actualizar calificación para asignación completada
UPDATE asignaciones SET calificacion = 5, fecha_finalizacion = NOW() WHERE id_asignacion = 3;

-- ========== comentarios_incidencia ==========
INSERT INTO comentarios_incidencia (id_incidencia, id_usuario, comentario, es_solucion) VALUES
(1, 2, 'Estoy revisando los logs del servidor. Parece ser un problema con la sesión de PHP.', FALSE),
(1, 3, 'El problema persiste. No puedo acceder aún.', FALSE),
(2, 2, 'He identificado varias consultas lentas. Trabajando en optimización.', FALSE),
(4, 2, 'Se reinició el servicio y se verificó la configuración. Todo operativo.', TRUE),
(4, 4, 'Confirmado. Ya puedo acceder sin problemas. Gracias!', FALSE);

-- ========== archivos_adjuntos ==========
INSERT INTO archivos_adjuntos (id_incidencia, nombre_archivo, ruta_archivo, tipo_archivo, tamano_kb, id_usuario_subio) VALUES
(1, 'captura_error_login.png', '/uploads/incidencias/1/captura_error_login.png', 'image/png', 245, 3),
(2, 'reporte_tiempos_carga.xlsx', '/uploads/incidencias/2/reporte_tiempos_carga.xlsx', 'application/vnd.ms-excel', 89, 4),
(5, 'foto_impresora.jpg', '/uploads/incidencias/5/foto_impresora.jpg', 'image/jpeg', 512, 7);

-- ========== chatbot_conversaciones ==========
INSERT INTO chatbot_conversaciones (id_usuario, sesion_id, estado_conversacion, ip_usuario) VALUES
(3, 'SESS-2026-03-09-001', 'Finalizada', '192.168.1.45'),
(7, 'SESS-2026-03-09-002', 'Activa', '192.168.1.78'),
(NULL, 'SESS-2026-03-09-003', 'Finalizada', '192.168.1.92');

-- ========== chatbot_mensajes ==========
INSERT INTO chatbot_mensajes (id_conversacion, tipo_mensaje, contenido, intencion, confianza) VALUES
(1, 'Usuario', 'Hola, necesito ayuda con mi password', 'saludo.ayuda', 0.95),
(1, 'Bot', '¡Hola! Claro, puedo ayudarte. ¿Olvidaste tu contraseña?', NULL, NULL),
(1, 'Usuario', 'Sí, no puedo iniciar sesión', 'problema.acceso', 0.89),
(1, 'Bot', 'Entiendo. ¿Quieres que te envíe un enlace para restablecer tu contraseña?', NULL, NULL),
(1, 'Usuario', 'Sí por favor', 'confirmacion.positiva', 0.97),
(2, 'Usuario', '¿Cómo reporto una incidencia?', 'consulta.proceso', 0.92),
(2, 'Bot', 'Para reportar una incidencia, haz clic en el botón "Nueva Incidencia" en el menú principal.', NULL, NULL);

-- ========== reportes_personalizados ==========
INSERT INTO reportes_personalizados (id_usuario, nombre_reporte, descripcion, tipo_reporte, parametros, es_publico) VALUES
(1, 'Incidencias por Prioridad', 'Muestra distribución de incidencias según nivel de prioridad', 'grafico', '{"tipo_grafico": "pie", "campo": "prioridad"}', TRUE),
(1, 'Reporte Mensual de Incidencias', 'Todas las incidencias del mes actual', 'tabla', '{"periodo": "mes_actual", "campos": ["titulo", "estado", "prioridad"]}', TRUE),
(2, 'Mis Asignaciones Activas', 'Incidencias asignadas a mí que están en proceso', 'tabla', '{"filtro": "mis_asignaciones", "estado": "En Proceso"}', FALSE);

-- ========== notificaciones ==========
INSERT INTO notificaciones (id_usuario, tipo_notificacion, titulo, mensaje, leida, enlace) VALUES
(3, 'incidencia_actualizada', 'Tu incidencia fue actualizada', 'La incidencia "Error en el sistema de autenticación" tiene nuevos comentarios', FALSE, '/incidencias/1'),
(4, 'incidencia_resuelta', 'Incidencia Resuelta', 'Tu incidencia "Base de datos desconectada" ha sido marcada como resuelta', TRUE, '/incidencias/4'),
(2, 'nueva_asignacion', 'Nueva Asignación', 'Se te ha asignado la incidencia "Internet lento en toda la oficina"', FALSE, '/incidencias/7'),
(7, 'mensaje_chatbot', 'Respuesta del Chatbot', 'El chatbot respondió tu consulta sobre reportar incidencias', TRUE, '/chatbot'),
(3, 'incidencia_creada', 'Incidencia Creada', 'Tu incidencia ha sido registrada exitosamente con el ID #6', TRUE, '/incidencias/6');

-- ========== logs_actividad ==========
INSERT INTO logs_actividad (id_usuario, accion, tabla_afectada, id_registro_afectado, descripcion, ip_origen) VALUES
(3, 'CREAR', 'incidencias', 1, 'Creó nueva incidencia: Error en el sistema de autenticación', '192.168.1.45'),
(2, 'ASIGNAR', 'asignaciones', 1, 'Asignó incidencia #1 a empleado #2', '192.168.1.102'),
(2, 'COMENTAR', 'comentarios_incidencia', 1, 'Agregó comentario a incidencia #1', '192.168.1.102'),
(4, 'CREAR', 'incidencias', 2, 'Creó nueva incidencia: Lentitud en la carga de reportes', '192.168.1.67'),
(2, 'CERRAR', 'incidencias', 4, 'Cerró incidencia #4: Base de datos desconectada', '192.168.1.102'),
(1, 'LOGIN', 'usuarios', 1, 'Inicio de sesión exitoso', '192.168.1.100'),
(6, 'CONFIGURAR', 'sistema', NULL, 'Actualizó configuración de notificaciones', '192.168.1.105');

-- ============================================
-- CONSULTAS DE VERIFICACIÓN Y REPORTES
-- ============================================

-- Ver dashboard completo
SELECT 
    (SELECT COUNT(*) FROM incidencias WHERE estado IN ('Abierto', 'En Progreso')) AS incidencias_activas,
    (SELECT COUNT(*) FROM incidencias WHERE estado = 'Cerrado') AS incidencias_cerradas,
    (SELECT COUNT(*) FROM usuarios WHERE estado = TRUE) AS usuarios_activos,
    (SELECT COUNT(*) FROM empleados WHERE estado_laboral = 'Activo') AS empleados_activos;

-- Incidencias con detalles completos
SELECT 
    i.id_incidencia,
    i.titulo,
    i.estado,
    c.nombre_categoria AS categoria,
    p.nombre_prioridad AS prioridad,
    p.color AS color_prioridad,
    i.impacto,
    u.nombre_completo AS reportado_por,
    u.departamento,
    i.fecha_creacion,
    TIMESTAMPDIFF(HOUR, i.fecha_creacion, COALESCE(i.fecha_cierre, NOW())) AS horas_transcurridas
FROM incidencias i
INNER JOIN usuarios u ON i.id_usuario_reporta = u.id_usuario
LEFT JOIN categorias c ON i.id_categoria = c.id_categoria
LEFT JOIN prioridades p ON i.id_prioridad = p.id_prioridad
ORDER BY p.nivel ASC, i.fecha_creacion DESC;

-- Asignaciones activas con información del técnico
SELECT 
    i.id_incidencia,
    i.titulo,
    i.estado,
    CONCAT(u.nombre_completo, ' (', e.cargo, ')') AS tecnico_asignado,
    a.estado_asignacion,
    a.fecha_asignacion,
    TIMESTAMPDIFF(HOUR, a.fecha_asignacion, NOW()) AS horas_asignadas
FROM asignaciones a
INNER JOIN incidencias i ON a.id_incidencia = i.id_incidencia
INNER JOIN empleados e ON a.id_empleado = e.id_empleado
INNER JOIN usuarios u ON e.id_usuario = u.id_usuario
WHERE a.estado_asignacion IN ('Asignado', 'En Proceso')
ORDER BY a.fecha_asignacion ASC;

-- Estadísticas por categoría
SELECT 
    c.nombre_categoria,
    COUNT(i.id_incidencia) AS total_incidencias,
    SUM(CASE WHEN i.estado = 'Abierto' THEN 1 ELSE 0 END) AS abiertas,
    SUM(CASE WHEN i.estado IN ('En Progreso', 'Pendiente') THEN 1 ELSE 0 END) AS en_proceso,
    SUM(CASE WHEN i.estado = 'Cerrado' THEN 1 ELSE 0 END) AS cerradas
FROM categorias c
LEFT JOIN incidencias i ON c.id_categoria = i.id_categoria
GROUP BY c.id_categoria, c.nombre_categoria
ORDER BY total_incidencias DESC;

-- Top usuarios que reportan más incidencias
SELECT 
    u.nombre_completo,
    u.departamento,
    COUNT(i.id_incidencia) AS total_incidencias,
    SUM(CASE WHEN i.estado IN ('Abierto', 'En Progreso') THEN 1 ELSE 0 END) AS activas
FROM usuarios u
LEFT JOIN incidencias i ON u.id_usuario = i.id_usuario_reporta
GROUP BY u.id_usuario, u.nombre_completo, u.departamento
HAVING total_incidencias > 0
ORDER BY total_incidencias DESC
LIMIT 10;

-- Rendimiento de técnicos de soporte
SELECT 
    u.nombre_completo AS tecnico,
    COUNT(a.id_asignacion) AS total_asignaciones,
    SUM(CASE WHEN a.estado_asignacion = 'Completado' THEN 1 ELSE 0 END) AS completadas,
    AVG(a.calificacion) AS calificacion_promedio,
    AVG(TIMESTAMPDIFF(HOUR, a.fecha_asignacion, a.fecha_finalizacion)) AS hrs_promedio_resolucion
FROM empleados e
INNER JOIN usuarios u ON e.id_usuario = u.id_usuario
LEFT JOIN asignaciones a ON e.id_empleado = a.id_empleado
WHERE u.rol = 'Soporte'
GROUP BY e.id_empleado, u.nombre_completo
ORDER BY completadas DESC;

-- Actividad reciente del sistema (últimas 50 acciones)
SELECT 
    l.fecha_hora,
    COALESCE(u.nombre_completo, 'Sistema') AS usuario,
    l.accion,
    l.tabla_afectada,
    l.descripcion
FROM logs_actividad l
LEFT JOIN usuarios u ON l.id_usuario = u.id_usuario
ORDER BY l.fecha_hora DESC
LIMIT 50;

-- ============================================
-- FIN DEL SCRIPT COMPLETO
-- ============================================
