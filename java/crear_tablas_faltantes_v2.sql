-- ============================================
-- Script para crear tablas faltantes (CORREGIDO)
-- Proyectos y Chatbot
-- ============================================

USE swo_db;

-- Verificar tipos de datos actuales en usuarios
SELECT COLUMN_NAME, DATA_TYPE 
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'swo_db' AND TABLE_NAME = 'usuarios' AND COLUMN_NAME = 'id_usuario';

-- ============================================
-- TABLA: proyectos (ya creada, solo verificar)
-- ============================================
-- Tabla ya existe, solo verificar su estructura
SHOW CREATE TABLE proyectos\G

-- ============================================
-- TABLA: asignaciones_proyecto (relación M:M entre usuarios y proyectos)
-- ============================================
CREATE TABLE IF NOT EXISTS asignaciones_proyecto (
    id_asignacion INT AUTO_INCREMENT PRIMARY KEY,
    id_proyecto INT NOT NULL,
    id_usuario INT NOT NULL,
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
-- TABLA: chatbot_conversaciones (ya creada, solo verificar)
-- ============================================
-- Tabla ya existe, solo verificar su estructura
SHOW CREATE TABLE chatbot_conversaciones\G

-- Crear índices para mejorar rendimiento si no existen
ALTER TABLE proyectos ADD INDEX IF NOT EXISTS idx_proyectos_estado (estado);
ALTER TABLE proyectos ADD INDEX IF NOT EXISTS idx_proyectos_nombre (nombre_proyecto);
ALTER TABLE chatbot_conversaciones ADD INDEX IF NOT EXISTS idx_chatbot_usuario (id_usuario);
ALTER TABLE chatbot_conversaciones ADD INDEX IF NOT EXISTS idx_chatbot_session (session_id);
ALTER TABLE chatbot_conversaciones ADD INDEX IF NOT EXISTS idx_chatbot_fecha (fecha_mensaje);

-- Verificar que las tablas existan
SELECT 
    TABLE_NAME,
    COLUMN_COUNT,
    CREATED,
    UPDATED
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'swo_db' 
  AND TABLE_NAME IN ('proyectos', 'asignaciones_proyecto', 'chatbot_conversaciones')
ORDER BY TABLE_NAME;

SELECT 'Tablas verificadas/creadas exitosamente' AS status;
