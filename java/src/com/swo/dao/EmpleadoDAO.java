package com.swo.dao;

import com.swo.model.Empleado;
import com.swo.util.ConexionBD;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO para gestionar operaciones CRUD de Empleados
 */
public class EmpleadoDAO {

    /**
     * Obtiene todos los empleados activos
     */
    public List<Empleado> obtenerEmpleados() {
        List<Empleado> empleados = new ArrayList<>();
        String sql = "SELECT e.*, u.nombre_completo " +
                     "FROM empleados e " +
                     "INNER JOIN usuarios u ON e.id_usuario = u.id_usuario " +
                     "WHERE e.estado_laboral = 'Activo' " +
                     "ORDER BY u.nombre_completo";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                Empleado empleado = new Empleado();
                empleado.setIdEmpleado(rs.getInt("id_empleado"));
                empleado.setIdUsuario(rs.getInt("id_usuario"));
                empleado.setCodigoEmpleado(rs.getString("codigo_empleado"));
                empleado.setCargo(rs.getString("cargo"));
                empleado.setArea(rs.getString("area"));
                empleado.setFechaIngreso(rs.getDate("fecha_ingreso"));
                empleado.setEstadoLaboral(rs.getString("estado_laboral"));
                empleados.add(empleado);
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener empleados: " + e.getMessage());
        }
        return empleados;
    }

    /**
     * Busca empleados por área
     */
    public List<Empleado> obtenerEmpleadosPorArea(String area) {
        List<Empleado> empleados = new ArrayList<>();
        String sql = "SELECT e.*, u.nombre_completo " +
                     "FROM empleados e " +
                     "INNER JOIN usuarios u ON e.id_usuario = u.id_usuario " +
                     "WHERE e.area = ? AND e.estado_laboral = 'Activo'";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, area);
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                Empleado empleado = new Empleado();
                empleado.setIdEmpleado(rs.getInt("id_empleado"));
                empleado.setCodigoEmpleado(rs.getString("codigo_empleado"));
                empleado.setCargo(rs.getString("cargo"));
                empleado.setArea(rs.getString("area"));
                empleados.add(empleado);
            }
        } catch (SQLException e) {
            System.err.println("Error al buscar empleados por área: " + e.getMessage());
        }
        return empleados;
    }

    /**
     * Obtiene técnicos de soporte disponibles
     */
    public void obtenerTecnicosSoporte() {
        String sql = "SELECT u.id_usuario, u.nombre_completo, e.cargo, e.area, " +
                     "COUNT(a.id_asignacion) AS asignaciones_activas " +
                     "FROM empleados e " +
                     "INNER JOIN usuarios u ON e.id_usuario = u.id_usuario " +
                     "LEFT JOIN asignaciones a ON e.id_empleado = a.id_empleado " +
                     "   AND a.estado_asignacion IN ('Asignado', 'En Proceso') " +
                     "WHERE u.rol = 'Soporte' AND e.estado_laboral = 'Activo' " +
                     "GROUP BY u.id_usuario, u.nombre_completo, e.cargo, e.area " +
                     "ORDER BY asignaciones_activas ASC";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            System.out.println("\n=== TÉCNICOS DE SOPORTE DISPONIBLES ===");
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id_usuario") + 
                                 " | " + rs.getString("nombre_completo"));
                System.out.println("  Cargo: " + rs.getString("cargo") + 
                                 " | Área: " + rs.getString("area"));
                System.out.println("  Asignaciones activas: " + rs.getInt("asignaciones_activas"));
                System.out.println("--------------------");
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener técnicos: " + e.getMessage());
        }
    }
}
