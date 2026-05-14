-- =====================================================
-- Script de Migración: Corregir Tipos de Datos
-- Convierte INT a BIGINT para compatibilidad con JPA
-- =====================================================

USE swo_db;

-- Desactivar verificación de FK temporalmente
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================
-- TABLA: usuarios
-- ============================================
ALTER TABLE usuarios 
  MODIFY COLUMN id_usuario BIGINT AUTO_INCREMENT;

-- ============================================
-- TABLA: categorias
-- ============================================
ALTER TABLE categorias 
  MODIFY COLUMN id_categoria BIGINT AUTO_INCREMENT;

-- ============================================
-- TABLA: incidencias
-- ============================================
ALTER TABLE incidencias 
  MODIFY COLUMN id_incidencia BIGINT AUTO_INCREMENT,
  MODIFY COLUMN id_usuario_reporta BIGINT NOT NULL,
  MODIFY COLUMN id_categoria BIGINT;

-- ============================================
-- TABLA: empleados (si existe)
-- ============================================
ALTER TABLE empleados 
  MODIFY COLUMN id_empleado BIGINT AUTO_INCREMENT,
  MODIFY COLUMN id_usuario BIGINT NOT NULL,
  MODIFY COLUMN jefe_inmediato BIGINT;

-- ============================================
-- TABLA: prioridades (si existe)
-- ============================================
ALTER TABLE prioridades 
  MODIFY COLUMN id_prioridad BIGINT AUTO_INCREMENT;

-- Reactivar verificación de FK
SET FOREIGN_KEY_CHECKS = 1;

-- Verificar cambios
SHOW COLUMNS FROM usuarios WHERE Field = 'id_usuario';
SHOW COLUMNS FROM categorias WHERE Field = 'id_categoria';
SHOW COLUMNS FROM incidencias WHERE Field IN ('id_incidencia', 'id_usuario_reporta', 'id_categoria');

SELECT 'Migración completada exitosamente' AS Status;
