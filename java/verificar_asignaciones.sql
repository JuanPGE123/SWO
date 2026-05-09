-- Verificar asignaciones en la base de datos

-- Ver todas las asignaciones
SELECT 
    a.id_asignacion,
    a.id_incidencia,
    CONCAT('INC-', a.id_incidencia) AS incidencia,
    a.id_empleado,
    e.id_usuario,
    u.nombre_completo AS usuario_asignado,
    a.fecha_asignacion,
    a.estado_asignacion
FROM asignaciones a
LEFT JOIN empleados e ON a.id_empleado = e.id_empleado
LEFT JOIN usuarios u ON e.id_usuario = u.id_usuario
ORDER BY a.id_incidencia DESC, a.fecha_asignacion DESC;

-- Ver asignaciones activas (no completadas)
SELECT 
    a.id_asignacion,
    CONCAT('INC-', a.id_incidencia) AS incidencia,
    u.nombre_completo AS usuario_asignado,
    a.fecha_asignacion,
    a.estado_asignacion
FROM asignaciones a
LEFT JOIN empleados e ON a.id_empleado = e.id_empleado
LEFT JOIN usuarios u ON e.id_usuario = u.id_usuario
WHERE a.estado_asignacion NOT IN ('Completado')
ORDER BY a.id_incidencia DESC;

-- Ver incidencias con sus asignaciones (mismo query que usa el backend)
SELECT 
    i.id_incidencia,
    CONCAT('INC-', i.id_incidencia) AS codigo,
    i.titulo,
    i.estado,
    u.nombre_completo AS asignado,
    u.id_usuario AS id_usuario_asignado
FROM incidencias i
LEFT JOIN (
    SELECT a1.id_incidencia, a1.id_empleado
    FROM asignaciones a1
    INNER JOIN (
        SELECT id_incidencia, MAX(fecha_asignacion) AS max_fecha
        FROM asignaciones
        WHERE estado_asignacion NOT IN ('Completado')
        GROUP BY id_incidencia
    ) a2 ON a1.id_incidencia = a2.id_incidencia AND a1.fecha_asignacion = a2.max_fecha
    WHERE a1.estado_asignacion NOT IN ('Completado')
) a ON i.id_incidencia = a.id_incidencia
LEFT JOIN empleados e ON a.id_empleado = e.id_empleado
LEFT JOIN usuarios u ON e.id_usuario = u.id_usuario
ORDER BY i.id_incidencia DESC;

-- Ver empleados y sus usuarios
SELECT 
    e.id_empleado,
    e.id_usuario,
    u.nombre_completo,
    u.correo,
    e.estado_laboral
FROM empleados e
LEFT JOIN usuarios u ON e.id_usuario = u.id_usuario;
