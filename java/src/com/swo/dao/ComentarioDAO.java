package com.swo.dao;

import com.swo.model.Comentario;
import com.swo.util.ConexionBD;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO para gestionar comentarios de incidencias
 */
public class ComentarioDAO {

    /**
     * Inserta un nuevo comentario en una incidencia
     * @param comentario Objeto Comentario con los datos
     * @return true si se insertó correctamente
     */
    public boolean insertarComentario(Comentario comentario) {
        String sql = "INSERT INTO comentarios_incidencia (id_incidencia, id_usuario, comentario, es_solucion, fecha_comentario) " +
                     "VALUES (?, ?, ?, ?, NOW())";
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pst = con.prepareStatement(sql)) {
            
            pst.setInt(1, comentario.getIdIncidencia());
            pst.setInt(2, comentario.getIdUsuario());
            pst.setString(3, comentario.getComentario());
            pst.setBoolean(4, comentario.isEsSolucion());
            
            return pst.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al insertar comentario: " + e.getMessage());
            return false;
        }
    }

    /**
     * Obtiene todos los comentarios de una incidencia específica
     * @param idIncidencia ID de la incidencia
     * @return Lista de comentarios con nombre del usuario
     */
    public List<Comentario> obtenerComentariosPorIncidencia(int idIncidencia) {
        List<Comentario> comentarios = new ArrayList<>();
        String sql = "SELECT c.*, u.nombre_completo " +
                     "FROM comentarios_incidencia c " +
                     "INNER JOIN usuarios u ON c.id_usuario = u.id_usuario " +
                     "WHERE c.id_incidencia = ? " +
                     "ORDER BY c.fecha_comentario ASC";
        
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pst = con.prepareStatement(sql)) {
            
            pst.setInt(1, idIncidencia);
            ResultSet rs = pst.executeQuery();
            
            while (rs.next()) {
                Comentario com = new Comentario();
                com.setIdComentario(rs.getInt("id_comentario"));
                com.setIdIncidencia(rs.getInt("id_incidencia"));
                com.setIdUsuario(rs.getInt("id_usuario"));
                com.setComentario(rs.getString("comentario"));
                com.setEsSolucion(rs.getBoolean("es_solucion"));
                com.setFechaComentario(rs.getTimestamp("fecha_comentario"));
                com.setNombreUsuario(rs.getString("nombre_completo"));
                comentarios.add(com);
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener comentarios: " + e.getMessage());
        }
        return comentarios;
    }

    /**
     * Elimina un comentario por su ID
     * @param idComentario ID del comentario a eliminar
     * @return true si se eliminó correctamente
     */
    public boolean eliminarComentario(int idComentario) {
        String sql = "DELETE FROM comentarios_incidencia WHERE id_comentario = ?";
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pst = con.prepareStatement(sql)) {
            
            pst.setInt(1, idComentario);
            return pst.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al eliminar comentario: " + e.getMessage());
            return false;
        }
    }

    /**
     * Cuenta el número de comentarios de una incidencia
     * @param idIncidencia ID de la incidencia
     * @return Número de comentarios
     */
    public int contarComentarios(int idIncidencia) {
        String sql = "SELECT COUNT(*) as total FROM comentarios_incidencia WHERE id_incidencia = ?";
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pst = con.prepareStatement(sql)) {
            
            pst.setInt(1, idIncidencia);
            ResultSet rs = pst.executeQuery();
            
            if (rs.next()) {
                return rs.getInt("total");
            }
        } catch (SQLException e) {
            System.err.println("Error al contar comentarios: " + e.getMessage());
        }
        return 0;
    }
}
