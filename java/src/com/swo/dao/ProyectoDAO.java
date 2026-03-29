package com.swo.dao;

import com.swo.model.Proyecto;
import com.swo.util.ConexionBD;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProyectoDAO {

    public List<Proyecto> obtenerProyectos() {
        List<Proyecto> lista = new ArrayList<>();
        String sql = "SELECT * FROM proyectos WHERE estado != 'Archivado' ORDER BY nombre";
        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                Proyecto p = new Proyecto();
                p.setIdProyecto(rs.getInt("id_proyecto"));
                p.setNombre(rs.getString("nombre"));
                p.setDescripcion(rs.getString("descripcion"));
                p.setEstado(rs.getString("estado"));
                p.setFechaCreacion(rs.getTimestamp("fecha_creacion"));
                lista.add(p);
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener proyectos: " + e.getMessage());
        }
        return lista;
    }

    public boolean insertarProyecto(Proyecto proyecto) {
        String sql = "INSERT INTO proyectos (nombre, descripcion, estado) VALUES (?, ?, ?)";
        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, proyecto.getNombre());
            ps.setString(2, proyecto.getDescripcion());
            ps.setString(3, proyecto.getEstado() != null ? proyecto.getEstado() : "Activo");
            int rows = ps.executeUpdate();
            if (rows > 0) {
                ResultSet keys = ps.getGeneratedKeys();
                if (keys.next()) proyecto.setIdProyecto(keys.getInt(1));
                return true;
            }
        } catch (SQLException e) {
            System.err.println("Error al insertar proyecto: " + e.getMessage());
        }
        return false;
    }

    public boolean eliminarProyecto(int idProyecto) {
        // Desasignar usuarios antes de eliminar
        String desasignar = "UPDATE usuarios SET id_proyecto = NULL WHERE id_proyecto = ?";
        String sql = "DELETE FROM proyectos WHERE id_proyecto = ?";
        try (Connection conn = ConexionBD.obtenerConexion()) {
            try (PreparedStatement ps = conn.prepareStatement(desasignar)) {
                ps.setInt(1, idProyecto); ps.executeUpdate();
            }
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setInt(1, idProyecto);
                return ps.executeUpdate() > 0;
            }
        } catch (SQLException e) {
            System.err.println("Error al eliminar proyecto: " + e.getMessage());
        }
        return false;
    }

    public boolean asignarUsuarioAProyecto(int idUsuario, int idProyecto) {
        String sql = "UPDATE usuarios SET id_proyecto = ? WHERE id_usuario = ?";
        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, idProyecto);
            ps.setInt(2, idUsuario);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al asignar proyecto: " + e.getMessage());
        }
        return false;
    }
}
