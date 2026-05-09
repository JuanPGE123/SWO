package com.swo.dao;

import com.swo.model.Incidencia;
import com.swo.util.ConexionBD;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class IncidenciaDAO {

    // 1. INSERCIÓN (Create) - retorna el ID generado, o -1 si falla
    public int insertarIncidencia(Incidencia incidencia) {
        String sql = "INSERT INTO incidencias (titulo, descripcion, estado, ubicacion, impacto, id_usuario_reporta, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, NOW())";
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pst = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            pst.setString(1, incidencia.getTitulo());
            pst.setString(2, incidencia.getDescripcion());
            pst.setString(3, incidencia.getEstado());
            pst.setString(4, incidencia.getUbicacion());
            pst.setString(5, incidencia.getImpacto() != null ? incidencia.getImpacto() : "Medio");
            pst.setInt(6, incidencia.getIdUsuarioReporta());
            
            int rows = pst.executeUpdate();
            if (rows > 0) {
                ResultSet keys = pst.getGeneratedKeys();
                if (keys.next()) return keys.getInt(1);
            }
            return -1;
        } catch (SQLException e) {
            System.err.println("Error al insertar: " + e.getMessage());
            return -1;
        }
    }

    // 2. CONSULTA (Read)
    public List<Incidencia> obtenerIncidencias() {
        List<Incidencia> listaIncidencias = new ArrayList<>();
        String sql = "SELECT i.*, u.nombre_completo AS asignado, u.id_usuario AS id_usuario_asignado " +
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
                     "LEFT JOIN usuarios u ON e.id_usuario = u.id_usuario";
        
        try (Connection con = ConexionBD.obtenerConexion();
             Statement st = con.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            
            while (rs.next()) {
                Incidencia inc = new Incidencia();
                inc.setIdIncidencia(rs.getInt("id_incidencia"));
                inc.setTitulo(rs.getString("titulo"));
                inc.setDescripcion(rs.getString("descripcion"));
                inc.setEstado(rs.getString("estado"));
                inc.setUbicacion(rs.getString("ubicacion"));
                inc.setImpacto(rs.getString("impacto"));
                inc.setFechaCreacion(rs.getTimestamp("fecha_creacion"));
                inc.setIdUsuarioReporta(rs.getInt("id_usuario_reporta"));
                inc.setAsignado(rs.getString("asignado"));
                try {
                    int idUsuarioAsignado = rs.getInt("id_usuario_asignado");
                    if (!rs.wasNull()) inc.setIdUsuarioAsignado(idUsuarioAsignado);
                } catch (SQLException ignored) {}
                try { inc.setResolucion(rs.getString("resolucion")); } catch (SQLException ignored) {}
                try { inc.setFechaResolucion(rs.getTimestamp("fecha_resolucion")); } catch (SQLException ignored) {}
                listaIncidencias.add(inc);
            }
        } catch (SQLException e) {
            System.err.println("Error al consultar: " + e.getMessage());
        }
        return listaIncidencias;
    }

    // 3. ACTUALIZACIÓN (Update) - (Referencia HU03 Actualizar Estado)
    public boolean actualizarEstadoIncidencia(int idIncidencia, String nuevoEstado) {
        String sql = "UPDATE incidencias SET estado = ? WHERE id_incidencia = ?";
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pst = con.prepareStatement(sql)) {
            
            pst.setString(1, nuevoEstado);
            pst.setInt(2, idIncidencia);
            
            return pst.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al actualizar: " + e.getMessage());
            return false;
        }
    }

    // 3b. ACTUALIZACIÓN COMPLETA - Editar campos y/o resolver incidencia
    public boolean actualizarIncidencia(int id, String titulo, String descripcion,
            String estado, String impacto, String ubicacion, String resolucion, boolean resolver,
            Integer idUsuarioAsignado) {
        String sql;
        if (resolver) {
            sql = "UPDATE incidencias SET titulo=?, descripcion=?, estado=?, impacto=?, ubicacion=?, " +
                  "resolucion=?, fecha_resolucion=NOW() WHERE id_incidencia=?";
        } else {
            sql = "UPDATE incidencias SET titulo=?, descripcion=?, estado=?, impacto=?, ubicacion=?, " +
                  "resolucion=? WHERE id_incidencia=?";
        }
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pst = con.prepareStatement(sql)) {
            pst.setString(1, titulo);
            pst.setString(2, descripcion);
            pst.setString(3, estado);
            pst.setString(4, impacto != null ? impacto : "Medio");
            pst.setString(5, ubicacion);
            pst.setString(6, resolucion);
            pst.setInt(7, id);
            boolean resultado = pst.executeUpdate() > 0;
            
            // Manejar la asignación de usuario
            if (resultado && idUsuarioAsignado != null) {
                if (idUsuarioAsignado > 0) {
                    // Asignar a un usuario específico
                    int idEmpleado = obtenerIdEmpleadoPorUsuario(idUsuarioAsignado);
                    if (idEmpleado > 0) {
                        asignarIncidencia(id, idEmpleado);
                    }
                } else {
                    // idUsuarioAsignado == 0 significa "Sin asignar" - completar asignación actual
                    desasignarIncidencia(id);
                }
            }
            
            return resultado;
        } catch (SQLException e) {
            System.err.println("Error al actualizar incidencia: " + e.getMessage());
            return false;
        }
    }

    // Sobrecarga para mantener compatibilidad con código existente
    public boolean actualizarIncidencia(int id, String titulo, String descripcion,
            String estado, String impacto, String ubicacion, String resolucion, boolean resolver) {
        return actualizarIncidencia(id, titulo, descripcion, estado, impacto, ubicacion, resolucion, resolver, null);
    }

    // 4. ELIMINACIÓN (Delete)
    public boolean eliminarIncidencia(int idIncidencia) {
        String sql = "DELETE FROM incidencias WHERE id_incidencia = ?";
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pst = con.prepareStatement(sql)) {
            
            pst.setInt(1, idIncidencia);
            return pst.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al eliminar: " + e.getMessage());
            return false;
        }
    }

    // 5a. Busca el id_empleado dado un id_usuario
    public int obtenerIdEmpleadoPorUsuario(int idUsuario) {
        String sql = "SELECT id_empleado FROM empleados WHERE id_usuario = ? AND estado_laboral = 'Activo' LIMIT 1";
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pst = con.prepareStatement(sql)) {
            pst.setInt(1, idUsuario);
            ResultSet rs = pst.executeQuery();
            if (rs.next()) return rs.getInt("id_empleado");
        } catch (SQLException e) {
            System.err.println("Error al buscar empleado: " + e.getMessage());
        }
        return -1;
    }

    // 5b. ASIGNACIÓN - Asignar incidencia a un empleado
    public boolean asignarIncidencia(int idIncidencia, int idEmpleado) {
        try (Connection con = ConexionBD.obtenerConexion()) {
            // Primero, completar cualquier asignación anterior
            String sqlComplete = "UPDATE asignaciones SET estado_asignacion = 'Completado' " +
                               "WHERE id_incidencia = ? AND estado_asignacion NOT IN ('Completado')";
            try (PreparedStatement pstComplete = con.prepareStatement(sqlComplete)) {
                pstComplete.setInt(1, idIncidencia);
                pstComplete.executeUpdate();
            }
            
            // Crear nueva asignación
            String sqlInsert = "INSERT INTO asignaciones (id_incidencia, id_empleado, fecha_asignacion, estado_asignacion) " +
                             "VALUES (?, ?, NOW(), 'Asignado')";
            try (PreparedStatement pst = con.prepareStatement(sqlInsert)) {
                pst.setInt(1, idIncidencia);
                pst.setInt(2, idEmpleado);
                return pst.executeUpdate() > 0;
            }
        } catch (SQLException e) {
            System.err.println("Error al asignar incidencia: " + e.getMessage());
            return false;
        }
    }
    
    // 5c. DESASIGNACIÓN - Completar asignación actual sin crear nueva
    public boolean desasignarIncidencia(int idIncidencia) {
        String sql = "UPDATE asignaciones SET estado_asignacion = 'Completado' " +
                    "WHERE id_incidencia = ? AND estado_asignacion NOT IN ('Completado')";
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pst = con.prepareStatement(sql)) {
            pst.setInt(1, idIncidencia);
            return pst.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al desasignar incidencia: " + e.getMessage());
            return false;
        }
    }

    // 6. CAMBIAR PRIORIDAD
    public boolean actualizarPrioridad(int idIncidencia, String nuevaPrioridad) {
        String sql = "UPDATE incidencias SET prioridad = ? WHERE id_incidencia = ?";
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pst = con.prepareStatement(sql)) {
            
            pst.setString(1, nuevaPrioridad);
            pst.setInt(2, idIncidencia);
            
            return pst.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al actualizar prioridad: " + e.getMessage());
            return false;
        }
    }

    // 7. OBTENER INCIDENCIA POR ID
    public Incidencia obtenerIncidenciaPorId(int idIncidencia) {
        String sql = "SELECT * FROM incidencias WHERE id_incidencia = ?";
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pst = con.prepareStatement(sql)) {
            
            pst.setInt(1, idIncidencia);
            ResultSet rs = pst.executeQuery();
            
            if (rs.next()) {
                Incidencia inc = new Incidencia();
                inc.setIdIncidencia(rs.getInt("id_incidencia"));
                inc.setTitulo(rs.getString("titulo"));
                inc.setDescripcion(rs.getString("descripcion"));
                inc.setEstado(rs.getString("estado"));
                inc.setUbicacion(rs.getString("ubicacion"));
                inc.setImpacto(rs.getString("impacto"));
                inc.setPrioridad(rs.getString("prioridad"));
                inc.setFechaCreacion(rs.getTimestamp("fecha_creacion"));
                inc.setIdUsuarioReporta(rs.getInt("id_usuario_reporta"));
                inc.setResolucion(rs.getString("resolucion"));
                inc.setFechaResolucion(rs.getTimestamp("fecha_resolucion"));
                return inc;
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener incidencia: " + e.getMessage());
        }
        return null;
    }

    // 8. CALCULAR TIEMPO PROMEDIO DE RESOLUCIÓN
    /**
     * Calcula el tiempo promedio de resolución en horas para incidencias cerradas/resueltas.
     * Solo considera incidencias con estado 'Cerrado' o 'Resuelto' y que tengan fecha_cierre.
     * 
     * @return Tiempo promedio en horas. Retorna 0 si no hay incidencias cerradas.
     */
    public double obtenerTiempoPromedioResolucion() {
        String sql = "SELECT AVG(TIMESTAMPDIFF(HOUR, fecha_creacion, fecha_cierre)) AS promedio " +
                     "FROM incidencias " +
                     "WHERE (estado = 'Cerrado' OR estado = 'Resuelto') " +
                     "AND fecha_cierre IS NOT NULL";
        
        try (Connection con = ConexionBD.obtenerConexion();
             Statement st = con.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            
            if (rs.next()) {
                return rs.getDouble("promedio");
            }
        } catch (SQLException e) {
            System.err.println("Error al calcular tiempo promedio: " + e.getMessage());
        }
        return 0.0;
    }
}
