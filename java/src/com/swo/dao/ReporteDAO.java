package com.swo.dao;

import com.swo.model.Reporte;
import com.swo.util.ConexionBD;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ReporteDAO {

    public List<Reporte> obtenerReportes() {
        List<Reporte> lista = new ArrayList<>();
        String sql = "SELECT * FROM reportes ORDER BY fecha_generacion DESC LIMIT 20";
        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                Reporte r = new Reporte();
                r.setIdReporte(rs.getInt("id_reporte"));
                r.setNombre(rs.getString("nombre"));
                r.setTotalIncidencias(rs.getInt("total_incidencias"));
                r.setAbiertas(rs.getInt("abiertas"));
                r.setEnProgreso(rs.getInt("en_progreso"));
                r.setCerradas(rs.getInt("cerradas"));
                r.setFechaGeneracion(rs.getTimestamp("fecha_generacion"));
                int gp = rs.getInt("generado_por");
                if (!rs.wasNull()) r.setGeneradoPor(gp);
                lista.add(r);
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener reportes: " + e.getMessage());
        }
        return lista;
    }

    public boolean insertarReporte(Reporte reporte) {
        String sql = "INSERT INTO reportes (nombre, total_incidencias, abiertas, en_progreso, cerradas, generado_por) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, reporte.getNombre());
            ps.setInt(2, reporte.getTotalIncidencias());
            ps.setInt(3, reporte.getAbiertas());
            ps.setInt(4, reporte.getEnProgreso());
            ps.setInt(5, reporte.getCerradas());
            if (reporte.getGeneradoPor() != null) ps.setInt(6, reporte.getGeneradoPor());
            else ps.setNull(6, java.sql.Types.INTEGER);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al insertar reporte: " + e.getMessage());
            return false;
        }
    }
}
