-- ============================================
-- Script de Datos de Prueba - SWO
-- Insertar datos de ejemplo para testing
-- ============================================

USE swo_db;

-- ============================================
-- INSERTAR USUARIOS DE PRUEBA
-- ============================================

-- Limpiar datos existentes
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE usuarios;
TRUNCATE TABLE incidencias;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO usuarios (nombre_completo, correo, password_hash, rol, telefono, departamento) VALUES
('Juan Pérez Administrador', 'admin@swo.com', 'admin123', 'Administrador', '3001234567', 'Sistemas'),
('María González Técnico', 'maria@swo.com', 'maria123', 'Técnico', '3009876543', 'Soporte Técnico'),
('Carlos Rodríguez', 'carlos@swo.com', 'carlos123', 'Usuario', '3005551234', 'Ventas'),
('Ana Martínez', 'ana@swo.com', 'ana123', 'Usuario', '3007778888', 'Recursos Humanos'),
('Luis Fernández Jefe', 'luis@swo.com', 'luis123', 'Jefe', '3002223333', 'Operaciones');

-- ============================================
-- INSERTAR INCIDENCIAS DE PRUEBA
-- ============================================

INSERT INTO incidencias (titulo, descripcion, estado, id_usuario_reporta, fecha_creacion) VALUES
-- Incidencias Abiertas
('Error en sistema de login', 'Los usuarios no pueden acceder al sistema desde hace 2 horas. Se muestra mensaje de error 401', 'Abierto', 3, NOW()),
('Impresora no funciona', 'La impresora del segundo piso no imprime documentos. Se queda en cola', 'Abierto', 4, NOW()),
('Lentitud en el servidor', 'El servidor de archivos está muy lento, toma más de 5 minutos abrir documentos', 'Abierto', 5, NOW()),

-- Incidencias En Progreso
('Actualización de software', 'Se requiere actualizar el software de contabilidad a la última versión', 'En Progreso', 3, DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Configurar nuevo equipo', 'Instalación y configuración de computadora para nuevo empleado', 'En Progreso', 4, DATE_SUB(NOW(), INTERVAL 2 DAY)),
('Problema con correo electrónico', 'Algunos correos no llegan o se envían a spam', 'En Progreso', 5, DATE_SUB(NOW(), INTERVAL 1 DAY)),

-- Incidencias Cerradas
('Cambio de contraseña', 'Usuario solicitó reseteo de contraseña de acceso al sistema', 'Cerrado', 3, DATE_SUB(NOW(), INTERVAL 5 DAY)),
('Instalación de antivirus', 'Instalar y configurar antivirus en equipo nuevo', 'Cerrado', 4, DATE_SUB(NOW(), INTERVAL 7 DAY)),
('Backup no se ejecutó', 'El backup programado falló la noche anterior', 'Cerrado', 5, DATE_SUB(NOW(), INTERVAL 10 DAY)),
('Error en aplicación web', 'Usuarios reportan error 500 al guardar formularios', 'Cerrado', 3, DATE_SUB(NOW(), INTERVAL 15 DAY)),

-- Más incidencias para tener datos variados
('Red WiFi inestable', 'La conexión WiFi se cae constantemente en el área de cafetería', 'Abierto', 4, NOW()),
('Solicitud de acceso a carpeta', 'Usuario requiere permisos de lectura/escritura en carpeta compartida', 'En Progreso', 3, DATE_SUB(NOW(), INTERVAL 3 HOUR)),
('Actualizar drivers', 'Los drivers de la tarjeta gráfica están desactualizados', 'Cerrado', 5, DATE_SUB(NOW(), INTERVAL 20 DAY)),
('Problema con Teams', 'Microsoft Teams se cierra inesperadamente durante videollamadas', 'En Progreso', 4, DATE_SUB(NOW(), INTERVAL 6 HOUR)),
('Configurar VPN', 'Configurar acceso VPN para trabajo remoto', 'Cerrado', 3, DATE_SUB(NOW(), INTERVAL 12 DAY));

-- ============================================
-- VERIFICAR DATOS INSERTADOS
-- ============================================

-- Ver usuarios creados
SELECT 
    id_usuario,
    nombre_completo,
    correo,
    rol,
    departamento
FROM usuarios
ORDER BY rol, nombre_completo;

-- Ver estadísticas de incidencias
SELECT 
    estado,
    COUNT(*) as total,
    CONCAT(ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM incidencias), 2), '%') as porcentaje
FROM incidencias
GROUP BY estado;

-- Ver todas las incidencias
SELECT 
    id_incidencia,
    titulo,
    estado,
    DATE_FORMAT(fecha_creacion, '%Y-%m-%d %H:%i') as fecha,
    (SELECT nombre_completo FROM usuarios WHERE id_usuario = incidencias.id_usuario_reporta) as reportado_por
FROM incidencias
ORDER BY fecha_creacion DESC;

-- ============================================
-- RESUMEN
-- ============================================
SELECT 
    'USUARIOS CREADOS' as resumen,
    COUNT(*) as total
FROM usuarios
UNION ALL
SELECT 
    'INCIDENCIAS CREADAS' as resumen,
    COUNT(*) as total
FROM incidencias;

-- ============================================
-- CONSULTAS ÚTILES PARA TESTING
-- ============================================

-- Ver incidencias por usuario
SELECT 
    u.nombre_completo,
    COUNT(i.id_incidencia) as total_incidencias
FROM usuarios u
LEFT JOIN incidencias i ON u.id_usuario = i.id_usuario_reporta
GROUP BY u.id_usuario, u.nombre_completo
ORDER BY total_incidencias DESC;

-- Ver distribución por estado
SELECT 
    estado,
    COUNT(*) as cantidad,
    GROUP_CONCAT(titulo SEPARATOR ' | ') as incidencias
FROM incidencias
GROUP BY estado;
