-- ============================================
-- Script para crear tablas faltantes
-- asignaciones_proyecto y chatbot_mensajes
-- ============================================

USE swo_db;

-- ============================================
-- TABLA: asignaciones_proyecto
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
-- TABLA: chatbot_mensajes
-- ============================================
CREATE TABLE IF NOT EXISTS chatbot_mensajes (
    id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
    id_conversacion BIGINT NOT NULL,
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

-- Verificar tablas creadas
SELECT 'Tabla asignaciones_proyecto creada' AS resultado
FROM information_schema.tables 
WHERE table_schema = 'swo_db' AND table_name = 'asignaciones_proyecto'
UNION ALL
SELECT 'Tabla chatbot_mensajes creada' AS resultado
FROM information_schema.tables 
WHERE table_schema = 'swo_db' AND table_name = 'chatbot_mensajes';
