package com.swo.dao;

import com.swo.model.Notificacion;
import com.swo.util.ConexionBD;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO para gestionar operaciones CRUD de Notificaciones
 */
public class NotificacionDAO {

    /**
     * Crea una nueva notificación
     */
    public boolean crearNotificacion(Notificacion notificacion) {
        String sql = "INSERT INTO notificaciones (id_usuario, tipo_notificacion, titulo, mensaje, enlace) " +
                     "VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, notificacion.getIdUsuario());
            pstmt.setString(2, notificacion.getTipoNotificacion());
            pstmt.setString(3, notificacion.getTitulo());
            pstmt.setString(4, notificacion.getMensaje());
            pstmt.setString(5, notificacion.getEnlace());

            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al crear notificación: " + e.getMessage());
            return false;
        }
    }

    /**
     * Obtiene notificaciones no leídas de un usuario
     */
    public List<Notificacion> obtenerNotificacionesNoLeidas(int idUsuario) {
        List<Notificacion> notificaciones = new ArrayList<>();
        String sql = "SELECT * FROM notificaciones WHERE id_usuario = ? AND leida = FALSE " +
                     "ORDER BY fecha_creacion DESC";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, idUsuario);
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                Notificacion notif = new Notificacion();
                notif.setIdNotificacion(rs.getInt("id_notificacion"));
                notif.setIdUsuario(rs.getInt("id_usuario"));
                notif.setTipoNotificacion(rs.getString("tipo_notificacion"));
                notif.setTitulo(rs.getString("titulo"));
                notif.setMensaje(rs.getString("mensaje"));
                notif.setLeida(rs.getBoolean("leida"));
                notif.setFechaCreacion(rs.getTimestamp("fecha_creacion"));
                notif.setEnlace(rs.getString("enlace"));
                notificaciones.add(notif);
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener notificaciones: " + e.getMessage());
        }
        return notificaciones;
    }

    /**
     * Marca una notificación como leída
     */
    public boolean marcarComoLeida(int idNotificacion) {
        String sql = "UPDATE notificaciones SET leida = TRUE, fecha_lectura = NOW() WHERE id_notificacion = ?";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, idNotificacion);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al marcar notificación como leída: " + e.getMessage());
            return false;
        }
    }

    /**
     * Cuenta notificaciones no leídas de un usuario
     */
    public int contarNoLeidas(int idUsuario) {
        String sql = "SELECT COUNT(*) AS total FROM notificaciones WHERE id_usuario = ? AND leida = FALSE";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, idUsuario);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                return rs.getInt("total");
            }
        } catch (SQLException e) {
            System.err.println("Error al contar notificaciones: " + e.getMessage());
        }
        return 0;
    }
}
