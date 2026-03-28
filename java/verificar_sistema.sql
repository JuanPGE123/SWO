-- ============================================
-- Script de Verificación - SWO
-- Ejecutar después del despliegue
-- ============================================

USE swo_db;

-- ============================================
-- VERIFICACIÓN 1: Tablas Creadas
-- ============================================
SELECT 
    'VERIFICACION DE TABLAS' as check_type,
    COUNT(*) as total_tablas
FROM information_schema.tables 
WHERE table_schema = 'swo_db';

-- ============================================
-- VERIFICACIÓN 2: Usuarios
-- ============================================
SELECT 
    '=== USUARIOS REGISTRADOS ===' as titulo;

SELECT 
    id_usuario as ID,
    nombre_completo as Nombre,
    correo as Email,
    rol as Rol,
    departamento as Depto,
    CASE 
        WHEN estado = 1 THEN 'ACTIVO'
        ELSE 'INACTIVO'
    END as Estado
FROM usuarios
ORDER BY rol, id_usuario;

SELECT 
    'Total de usuarios:' as resumen,
    COUNT(*) as cantidad
FROM usuarios;

-- ============================================
-- VERIFICACIÓN 3: Incidencias
-- ============================================
SELECT 
    '=== INCIDENCIAS REGISTRADAS ===' as titulo;

SELECT 
    id_incidencia as ID,
    LEFT(titulo, 40) as Titulo,
    estado as Estado,
    DATE_FORMAT(fecha_creacion, '%d/%m/%Y %H:%i') as Fecha,
    id_usuario_reporta as Usuario
FROM incidencias
ORDER BY fecha_creacion DESC
LIMIT 10;

-- ============================================
-- VERIFICACIÓN 4: Estadísticas por Estado
-- ============================================
SELECT 
    '=== ESTADISTICAS POR ESTADO ===' as titulo;

SELECT 
    estado as Estado,
    COUNT(*) as Cantidad,
    CONCAT(ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM incidencias), 1), '%') as Porcentaje
FROM incidencias
GROUP BY estado
ORDER BY 
    CASE 
        WHEN estado = 'Abierto' THEN 1
        WHEN estado = 'En Progreso' THEN 2
        WHEN estado = 'Cerrado' THEN 3
    END;

-- ============================================
-- VERIFICACIÓN 5: Incidencias por Usuario
-- ============================================
SELECT 
    '=== INCIDENCIAS POR USUARIO ===' as titulo;

SELECT 
    u.nombre_completo as Usuario,
    u.rol as Rol,
    COUNT(i.id_incidencia) as Total_Incidencias
FROM usuarios u
LEFT JOIN incidencias i ON u.id_usuario = i.id_usuario_reporta
GROUP BY u.id_usuario, u.nombre_completo, u.rol
ORDER BY Total_Incidencias DESC;

-- ============================================
-- VERIFICACIÓN 6: Resumen General
-- ============================================
SELECT 
    '=== RESUMEN GENERAL DEL SISTEMA ===' as titulo;

SELECT 'Total Usuarios' as Metrica, COUNT(*) as Valor FROM usuarios
UNION ALL
SELECT 'Usuarios Activos', COUNT(*) FROM usuarios WHERE estado = 1
UNION ALL
SELECT 'Total Incidencias', COUNT(*) FROM incidencias
UNION ALL
SELECT 'Incidencias Abiertas', COUNT(*) FROM incidencias WHERE estado = 'Abierto'
UNION ALL
SELECT 'Incidencias En Progreso', COUNT(*) FROM incidencias WHERE estado = 'En Progreso'
UNION ALL
SELECT 'Incidencias Cerradas', COUNT(*) FROM incidencias WHERE estado = 'Cerrado';

-- ============================================
-- VERIFICACIÓN 7: Últimas Actividades
-- ============================================
SELECT 
    '=== ULTIMAS 5 INCIDENCIAS ===' as titulo;

SELECT 
    i.id_incidencia as ID,
    i.titulo as Titulo,
    i.estado as Estado,
    u.nombre_completo as Reportado_Por,
    DATE_FORMAT(i.fecha_creacion, '%d/%m/%Y %H:%i') as Fecha
FROM incidencias i
JOIN usuarios u ON i.id_usuario_reporta = u.id_usuario
ORDER BY i.fecha_creacion DESC
LIMIT 5;

-- ============================================
-- VERIFICACIÓN 8: Datos para Testing
-- ============================================
SELECT 
    '=== CREDENCIALES DE PRUEBA ===' as titulo;

SELECT 
    correo as Email,
    password_hash as Password,
    rol as Rol,
    'Para testing' as Nota
FROM usuarios
WHERE correo IN ('admin@swo.com', 'maria@swo.com', 'carlos@swo.com')
ORDER BY rol;

-- ============================================
-- VERIFICACIÓN FINAL
-- ============================================
SELECT 
    '========================================' as separador
UNION ALL
SELECT 
    'VERIFICACION COMPLETADA - SISTEMA LISTO'
UNION ALL
SELECT 
    '========================================';

-- ============================================
-- URLs para pruebas
-- ============================================
SELECT 
    'URLs PARA PROBAR:' as info
UNION ALL
SELECT 
    'Inicio: http://localhost:8080/SWO/'
UNION ALL
SELECT 
    'Incidencias: http://localhost:8080/SWO/IncidenciaServlet'
UNION ALL
SELECT 
    'Usuarios: http://localhost:8080/SWO/UsuarioServlet'
UNION ALL
SELECT 
    'Reportes: http://localhost:8080/SWO/ReporteServlet'
UNION ALL
SELECT 
    'Chatbot: http://localhost:8080/SWO/ChatbotServlet';
