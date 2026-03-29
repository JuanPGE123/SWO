package com.swo.dao;

import com.swo.model.Conocimiento;
import com.swo.util.ConexionBD;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ConocimientoDAO {

    /**
     * Busca entradas de la base de conocimiento cuyas palabras_clave contengan
     * al menos una de las palabras del texto de consulta.
     * Devuelve hasta 5 resultados ordenados por número de coincidencias (aproximado).
     */
    public List<Conocimiento> buscarPorTexto(String consulta) {
        List<Conocimiento> resultados = new ArrayList<>();
        if (consulta == null || consulta.trim().isEmpty()) return resultados;

        String texto = consulta.toLowerCase().trim();
        // Dividir la consulta en tokens de al menos 3 caracteres
        String[] tokens = texto.split("[\\s,;.!?]+");
        List<String> palabras = new ArrayList<>();
        for (String t : tokens) {
            if (t.length() >= 3) palabras.add(t);
        }
        if (palabras.isEmpty()) return resultados;

        // Construir la cláusula WHERE con OR para cada palabra
        StringBuilder sb = new StringBuilder();
        sb.append("SELECT id, categoria, palabras_clave, pregunta, respuesta, pasos, nivel_soporte ");
        sb.append("FROM chatbot_conocimiento WHERE activo = 1 AND (");
        for (int i = 0; i < palabras.size(); i++) {
            if (i > 0) sb.append(" OR ");
            sb.append("LOWER(palabras_clave) LIKE ? OR LOWER(pregunta) LIKE ? OR LOWER(respuesta) LIKE ?");
        }
        sb.append(") ORDER BY id LIMIT 5");

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement ps = conn.prepareStatement(sb.toString())) {

            int idx = 1;
            for (String p : palabras) {
                String like = "%" + p + "%";
                ps.setString(idx++, like);
                ps.setString(idx++, like);
                ps.setString(idx++, like);
            }

            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Conocimiento c = new Conocimiento(
                    rs.getInt("id"),
                    rs.getString("categoria"),
                    rs.getString("palabras_clave"),
                    rs.getString("pregunta"),
                    rs.getString("respuesta"),
                    rs.getString("pasos"),
                    rs.getInt("nivel_soporte")
                );
                resultados.add(c);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultados;
    }

    /** Obtiene todas las categorías únicas disponibles. */
    public List<String> obtenerCategorias() {
        List<String> categorias = new ArrayList<>();
        String sql = "SELECT DISTINCT categoria FROM chatbot_conocimiento WHERE activo = 1 ORDER BY categoria";
        try (Connection conn = ConexionBD.obtenerConexion();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                categorias.add(rs.getString("categoria"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return categorias;
    }
}
