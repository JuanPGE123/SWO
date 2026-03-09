package com.swo.dao;

import com.swo.model.Incidencia;
import com.swo.util.ConexionBD;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class IncidenciaDAO {

    // 1. INSERCIÓN (Create)
    public boolean insertarIncidencia(Incidencia incidencia) {
        String sql = "INSERT INTO incidencias (titulo, descripcion, estado, id_usuario_reporta, fecha_creacion) VALUES (?, ?, ?, ?, NOW())";
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pst = con.prepareStatement(sql)) {
            
            pst.setString(1, incidencia.getTitulo());
            pst.setString(2, incidencia.getDescripcion());
            pst.setString(3, incidencia.getEstado());
            pst.setInt(4, incidencia.getIdUsuarioReporta());
            
            return pst.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al insertar: " + e.getMessage());
            return false;
        }
    }

    // 2. CONSULTA (Read)
    public List<Incidencia> obtenerIncidencias() {
        List<Incidencia> listaIncidencias = new ArrayList<>();
        String sql = "SELECT * FROM incidencias";
        
        try (Connection con = ConexionBD.obtenerConexion();
             Statement st = con.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            
            while (rs.next()) {
                Incidencia inc = new Incidencia();
                inc.setIdIncidencia(rs.getInt("id_incidencia"));
                inc.setTitulo(rs.getString("titulo"));
                inc.setDescripcion(rs.getString("descripcion"));
                inc.setEstado(rs.getString("estado"));
                inc.setFechaCreacion(rs.getTimestamp("fecha_creacion"));
                inc.setIdUsuarioReporta(rs.getInt("id_usuario_reporta"));
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
}
