package com.swo.util;

import java.sql.*;

public class VerificarAsignaciones {
    public static void main(String[] args) {
        System.out.println("=".repeat(80));
        System.out.println("VERIFICACION DE ASIGNACIONES EN BASE DE DATOS");
        System.out.println("=".repeat(80));
        
        try (Connection con = ConexionBD.obtenerConexion()) {
            if (con == null) {
                System.err.println("No se pudo conectar a la base de datos");
                return;
            }
            
            // 1. Ver asignaciones activas
            System.out.println("\n1. ASIGNACIONES ACTIVAS (no completadas):");
            System.out.println("-".repeat(80));
            String sql1 = "SELECT a.id_asignacion, CONCAT('INC-', a.id_incidencia) AS incidencia, " +
                         "u.nombre_completo AS usuario_asignado, a.fecha_asignacion, a.estado_asignacion " +
                         "FROM asignaciones a " +
                         "LEFT JOIN empleados e ON a.id_empleado = e.id_empleado " +
                         "LEFT JOIN usuarios u ON e.id_usuario = u.id_usuario " +
                         "WHERE a.estado_asignacion NOT IN ('Completado') " +
                         "ORDER BY a.id_incidencia DESC";
            
            try (Statement st = con.createStatement(); ResultSet rs = st.executeQuery(sql1)) {
                if (!rs.isBeforeFirst()) {
                    System.out.println("No hay asignaciones activas.");
                } else {
                    while (rs.next()) {
                        System.out.printf("  %d | %s | %s | %s | %s%n",
                            rs.getInt("id_asignacion"),
                            rs.getString("incidencia"),
                            rs.getString("usuario_asignado"),
                            rs.getTimestamp("fecha_asignacion"),
                            rs.getString("estado_asignacion"));
                    }
                }
            }
            
            // 2. Ver empleados y usuarios
            System.out.println("\n2. EMPLEADOS Y USUARIOS:");
            System.out.println("-".repeat(80));
            String sql2 = "SELECT e.id_empleado, e.id_usuario, u.nombre_completo, u.correo, e.estado_laboral " +
                         "FROM empleados e LEFT JOIN usuarios u ON e.id_usuario = u.id_usuario";
            
            try (Statement st = con.createStatement(); ResultSet rs = st.executeQuery(sql2)) {
                while (rs.next()) {
                    System.out.printf("  Empleado ID: %d | Usuario ID: %d | Nombre: %s | Correo: %s | Estado: %s%n",
                        rs.getInt("id_empleado"),
                        rs.getInt("id_usuario"),
                        rs.getString("nombre_completo"),
                        rs.getString("correo"),
                        rs.getString("estado_laboral"));
                }
            }
            
            // 3. Ver incidencias con asignaciones (mismo query del backend)
            System.out.println("\n3. INCIDENCIAS CON ASIGNACIONES (query del backend):");
            System.out.println("-".repeat(80));
            String sql3 = "SELECT i.id_incidencia, CONCAT('INC-', i.id_incidencia) AS codigo, " +
                         "i.titulo, i.estado, u.nombre_completo AS asignado, u.id_usuario AS id_usuario_asignado " +
                         "FROM incidencias i " +
                         "LEFT JOIN (" +
                         "  SELECT a1.id_incidencia, a1.id_empleado " +
                         "  FROM asignaciones a1 " +
                         "  INNER JOIN (" +
                         "    SELECT id_incidencia, MAX(fecha_asignacion) AS max_fecha " +
                         "    FROM asignaciones " +
                         "    WHERE estado_asignacion NOT IN ('Completado') " +
                         "    GROUP BY id_incidencia" +
                         "  ) a2 ON a1.id_incidencia = a2.id_incidencia AND a1.fecha_asignacion = a2.max_fecha " +
                         "  WHERE a1.estado_asignacion NOT IN ('Completado') " +
                         ") a ON i.id_incidencia = a.id_incidencia " +
                         "LEFT JOIN empleados e ON a.id_empleado = e.id_empleado " +
                         "LEFT JOIN usuarios u ON e.id_usuario = u.id_usuario " +
                         "ORDER BY i.id_incidencia DESC LIMIT 10";
            
            try (Statement st = con.createStatement(); ResultSet rs = st.executeQuery(sql3)) {
                while (rs.next()) {
                    String asignado = rs.getString("asignado");
                    int idUsuarioAsignado = rs.getInt("id_usuario_asignado");
                    boolean wasNull = rs.wasNull();
                    
                    System.out.printf("  %s | %s | Estado: %s | Asignado: %s%s%n",
                        rs.getString("codigo"),
                        rs.getString("titulo"),
                        rs.getString("estado"),
                        asignado != null ? asignado : "Sin asignar",
                        !wasNull ? " (ID: " + idUsuarioAsignado + ")" : "");
                }
            }
            
            // 4. Contar asignaciones por estado
            System.out.println("\n4. RESUMEN DE ASIGNACIONES POR ESTADO:");
            System.out.println("-".repeat(80));
            String sql4 = "SELECT estado_asignacion, COUNT(*) as total FROM asignaciones GROUP BY estado_asignacion";
            
            try (Statement st = con.createStatement(); ResultSet rs = st.executeQuery(sql4)) {
                while (rs.next()) {
                    System.out.printf("  %s: %d%n",
                        rs.getString("estado_asignacion"),
                        rs.getInt("total"));
                }
            }
            
            System.out.println("\n" + "=".repeat(80));
            
        } catch (SQLException e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
