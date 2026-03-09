package com.swo.dao;

import com.swo.model.Categoria;
import com.swo.util.ConexionBD;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO para gestionar operaciones CRUD de Categorías
 */
public class CategoriaDAO {

    /**
     * Obtiene todas las categorías activas
     */
    public List<Categoria> obtenerCategorias() {
        List<Categoria> categorias = new ArrayList<>();
        String sql = "SELECT * FROM categorias WHERE estado = TRUE ORDER BY nombre_categoria";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                Categoria categoria = new Categoria();
                categoria.setIdCategoria(rs.getInt("id_categoria"));
                categoria.setNombreCategoria(rs.getString("nombre_categoria"));
                categoria.setDescripcion(rs.getString("descripcion"));
                categoria.setColor(rs.getString("color"));
                categoria.setIcono(rs.getString("icono"));
                categoria.setEstado(rs.getBoolean("estado"));
                categoria.setFechaCreacion(rs.getTimestamp("fecha_creacion"));
                categorias.add(categoria);
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener categorías: " + e.getMessage());
        }
        return categorias;
    }

    /**
     * Inserta una nueva categoría
     */
    public boolean insertarCategoria(Categoria categoria) {
        String sql = "INSERT INTO categorias (nombre_categoria, descripcion, color, icono) VALUES (?, ?, ?, ?)";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, categoria.getNombreCategoria());
            pstmt.setString(2, categoria.getDescripcion());
            pstmt.setString(3, categoria.getColor());
            pstmt.setString(4, categoria.getIcono());

            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al insertar categoría: " + e.getMessage());
            return false;
        }
    }

    /**
     * Obtiene estadísticas de incidencias por categoría
     */
    public void obtenerEstadisticasPorCategoria() {
        String sql = "SELECT c.nombre_categoria, COUNT(i.id_incidencia) AS total, " +
                     "SUM(CASE WHEN i.estado = 'Abierto' THEN 1 ELSE 0 END) AS abiertas, " +
                     "SUM(CASE WHEN i.estado = 'Cerrado' THEN 1 ELSE 0 END) AS cerradas " +
                     "FROM categorias c " +
                     "LEFT JOIN incidencias i ON c.id_categoria = i.id_categoria " +
                     "GROUP BY c.id_categoria, c.nombre_categoria " +
                     "ORDER BY total DESC";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            System.out.println("\n=== ESTADÍSTICAS POR CATEGORÍA ===");
            while (rs.next()) {
                System.out.println("Categoría: " + rs.getString("nombre_categoria"));
                System.out.println("  Total: " + rs.getInt("total") + 
                                 " | Abiertas: " + rs.getInt("abiertas") +
                                 " | Cerradas: " + rs.getInt("cerradas"));
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener estadísticas: " + e.getMessage());
        }
    }
}
