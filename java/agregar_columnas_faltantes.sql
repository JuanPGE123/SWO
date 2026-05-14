-- ============================================================================
-- Script para agregar columnas faltantes en las nuevas tablas
-- Fecha: 14 de mayo de 2026
-- Autor: Sistema SWO
-- Descripción: Agrega campos de auditoría faltantes en proyectos y chatbot
-- ============================================================================

USE swo_db;

-- ── 1. Agregar columna fecha_actualizacion a tabla proyectos ───────────────

ALTER TABLE proyectos 
ADD COLUMN fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
AFTER fecha_creacion;

-- Verificar columnas de proyectos
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'swo_db' 
  AND TABLE_NAME = 'proyectos'
ORDER BY ORDINAL_POSITION;

-- ── 2. Renombrar columna en chatbot_conversaciones ─────────────────────────
-- La entidad usa 'fechaMensaje' pero la tabla tiene posiblemente otro nombre

-- Verificar estructura actual
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'swo_db' 
  AND TABLE_NAME = 'chatbot_conversaciones'
ORDER BY ORDINAL_POSITION;

-- Si existe una columna de fecha con otro nombre, renombrarla:
-- ALTER TABLE chatbot_conversaciones CHANGE fecha_conversacion fecha_mensaje TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Si no existe ninguna columna de fecha, agregarla:
ALTER TABLE chatbot_conversaciones 
ADD COLUMN fecha_mensaje TIMESTAMP DEFAULT CURRENT_TIMESTAMP
AFTER id_conversacion;

-- ── 3. Verificar que el presupuesto sea DECIMAL, no DOUBLE ─────────────────

ALTER TABLE proyectos 
MODIFY COLUMN presupuesto DECIMAL(15,2) NULL;

-- ── 4. Resumen de cambios realizados ───────────────────────────────────────

SELECT 'Tablas actualizadas correctamente' AS resultado;

-- Verificar registros en las tablas nuevas
SELECT COUNT(*) AS total_proyectos FROM proyectos;
SELECT COUNT(*) AS total_conversaciones FROM chatbot_conversaciones;
