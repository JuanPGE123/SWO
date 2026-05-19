-- ============================================
-- Script para crear tablas faltantes
-- Proyectos y Chatbot
-- ============================================

USE swo_db;

-- ============================================
-- TABLA: proyectos
-- ============================================
CREATE TABLE IF NOT EXISTS proyectos (
    id_proyecto BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_proyecto VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    estado VARCHAR(20) NOT NULL DEFAULT 'Activo',
    presupuesto DECIMAL(15, 2),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_estado_proyecto CHECK (estado IN ('Activo', 'En Pausa', 'Completado', 'Cancelado'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: asignaciones_proyecto (relación M:M entre usuarios y proyectos)
-- ============================================
CREATE TABLE IF NOT EXISTS asignaciones_proyecto (
    id_asignacion BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_proyecto BIGINT NOT NULL,
    id_usuario INT(11) NOT NULL,
    rol_asignado VARCHAR(50) DEFAULT 'Miembro',
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_asignacion_proyecto FOREIGN KEY (id_proyecto)
        REFERENCES proyectos(id_proyecto)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_asignacion_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT uk_asignacion_unica UNIQUE (id_proyecto, id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: chatbot_conversaciones
-- ============================================
CREATE TABLE IF NOT EXISTS chatbot_conversaciones (
    id_conversacion BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT(11) NOT NULL,
    mensaje_usuario TEXT NOT NULL,
    respuesta_bot TEXT NOT NULL,
    session_id VARCHAR(100),
    fecha_mensaje TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_consulta VARCHAR(50),
    resuelto TINYINT DEFAULT 0,
    CONSTRAINT fk_chatbot_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_proyectos_estado ON proyectos(estado);
CREATE INDEX idx_proyectos_nombre ON proyectos(nombre_proyecto);
CREATE INDEX idx_asignaciones_proyecto ON asignaciones_proyecto(id_proyecto);
CREATE INDEX idx_asignaciones_usuario ON asignaciones_proyecto(id_usuario);
CREATE INDEX idx_chatbot_usuario ON chatbot_conversaciones(id_usuario);
CREATE INDEX idx_chatbot_session ON chatbot_conversaciones(session_id);
CREATE INDEX idx_chatbot_fecha ON chatbot_conversaciones(fecha_mensaje);

-- Verificar creación de tablas
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'swo_db' 
  AND TABLE_NAME IN ('proyectos', 'asignaciones_proyecto', 'chatbot_conversaciones')
ORDER BY TABLE_NAME;

SELECT 'Tablas creadas exitosamente' AS status;

