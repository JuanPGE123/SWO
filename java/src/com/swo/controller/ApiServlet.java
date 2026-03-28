package com.swo.controller;

import com.swo.dao.IncidenciaDAO;
import com.swo.dao.UsuarioDAO;
import com.swo.model.Incidencia;
import com.swo.model.Usuario;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 * API REST JSON para consumir desde Angular
 * Rutas:
 *   GET  /api/incidencias         -> lista de incidencias
 *   POST /api/incidencias         -> crear incidencia
 *   GET  /api/usuarios            -> lista de usuarios
 *   POST /api/login               -> autenticar usuario
 *   POST /api/logout              -> cerrar sesión
 */
@WebServlet("/api/*")
public class ApiServlet extends HttpServlet {

    private IncidenciaDAO incidenciaDAO;
    private UsuarioDAO usuarioDAO;

    @Override
    public void init() throws ServletException {
        super.init();
        incidenciaDAO = new IncidenciaDAO();
        usuarioDAO = new UsuarioDAO();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        setCorsHeaders(res);
        res.setContentType("application/json;charset=UTF-8");
        req.setCharacterEncoding("UTF-8");

        String path = req.getPathInfo();
        PrintWriter out = res.getWriter();

        if ("/incidencias".equals(path)) {
            List<Incidencia> lista = incidenciaDAO.obtenerIncidencias();
            out.print(incidenciasToJson(lista));

        } else if ("/usuarios".equals(path)) {
            List<Usuario> lista = usuarioDAO.obtenerUsuarios();
            out.print(usuariosToJson(lista));

        } else if ("/estadisticas".equals(path)) {
            List<Incidencia> inc = incidenciaDAO.obtenerIncidencias();
            long abiertas = 0, enProgreso = 0, cerradas = 0;
            for (Incidencia i : inc) {
                if ("Abierto".equals(i.getEstado())) abiertas++;
                else if ("En Progreso".equals(i.getEstado())) enProgreso++;
                else if ("Cerrado".equals(i.getEstado())) cerradas++;
            }
            out.print("{\"total\":" + inc.size()
                + ",\"abiertas\":" + abiertas
                + ",\"enProgreso\":" + enProgreso
                + ",\"cerradas\":" + cerradas + "}");

        } else {
            res.setStatus(404);
            out.print("{\"error\":\"Ruta no encontrada\"}");
        }
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        setCorsHeaders(res);
        res.setContentType("application/json;charset=UTF-8");
        req.setCharacterEncoding("UTF-8");

        String path = req.getPathInfo();
        PrintWriter out = res.getWriter();

        if ("/incidencias".equals(path)) {
            try {
                String titulo = req.getParameter("titulo");
                String descripcion = req.getParameter("descripcion");
                String estado = req.getParameter("estado");
                String ubicacion = req.getParameter("ubicacion");
                String impacto = req.getParameter("impacto");
                String idStr = req.getParameter("idUsuarioReporta");

                if (titulo == null || titulo.isEmpty() || descripcion == null || descripcion.isEmpty()) {
                    res.setStatus(400);
                    out.print("{\"error\":\"titulo y descripcion son obligatorios\"}");
                    return;
                }

                int idUsuario = 1;
                if (idStr != null && !idStr.isEmpty()) idUsuario = Integer.parseInt(idStr);
                HttpSession session = req.getSession(false);
                if (session != null && session.getAttribute("idUsuario") != null) {
                    idUsuario = (Integer) session.getAttribute("idUsuario");
                }

                Incidencia inc = new Incidencia(titulo, descripcion,
                        estado != null ? estado : "Abierto", idUsuario);
                inc.setUbicacion(ubicacion);
                inc.setImpacto(impacto != null && !impacto.isEmpty() ? impacto : "Medio");

                boolean ok = incidenciaDAO.insertarIncidencia(inc);
                if (ok) out.print("{\"success\":true,\"mensaje\":\"Incidencia creada\"}");
                else {
                    res.setStatus(500);
                    out.print("{\"error\":\"No se pudo guardar la incidencia\"}");
                }
            } catch (Exception e) {
                res.setStatus(500);
                out.print("{\"error\":\"" + e.getMessage().replace("\"", "'") + "\"}");
            }

        } else if ("/login".equals(path)) {
            String correo = req.getParameter("correo");
            String password = req.getParameter("password");
            try {
                Usuario usuario = usuarioDAO.obtenerUsuarioPorCorreo(correo);
                if (usuario != null && usuario.getPasswordHash().equals(password)) {
                    HttpSession session = req.getSession();
                    session.setAttribute("idUsuario", usuario.getIdUsuario());
                    session.setAttribute("nombreUsuario", usuario.getNombreCompleto());
                    session.setAttribute("rolUsuario", usuario.getRol());
                    usuarioDAO.actualizarUltimaConexion(usuario.getIdUsuario());
                    out.print("{\"success\":true"
                        + ",\"id\":" + usuario.getIdUsuario()
                        + ",\"nombre\":\"" + escJson(usuario.getNombreCompleto()) + "\""
                        + ",\"correo\":\"" + escJson(usuario.getCorreo()) + "\""
                        + ",\"rol\":\"" + escJson(usuario.getRol()) + "\""
                        + ",\"departamento\":\"" + escJson(usuario.getDepartamento()) + "\"}");
                } else {
                    res.setStatus(401);
                    out.print("{\"success\":false,\"error\":\"Credenciales incorrectas\"}");
                }
            } catch (Exception e) {
                res.setStatus(500);
                out.print("{\"success\":false,\"error\":\"Error del servidor: " + e.getMessage().replace("\"", "'") + "\"}");
            }

        } else if ("/logout".equals(path)) {
            HttpSession session = req.getSession(false);
            if (session != null) session.invalidate();
            out.print("{\"success\":true}");

        } else {
            res.setStatus(404);
            out.print("{\"error\":\"Ruta no encontrada\"}");
        }
        out.flush();
    }

    // Preflight CORS para Angular en GitHub Pages o localhost:4200
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        setCorsHeaders(res);
        res.setStatus(200);
    }

    private void setCorsHeaders(HttpServletResponse res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    private String escJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }

    private String incidenciasToJson(List<Incidencia> lista) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < lista.size(); i++) {
            Incidencia inc = lista.get(i);
            if (i > 0) sb.append(",");
            sb.append("{")
              .append("\"id\":").append(inc.getIdIncidencia()).append(",")
              .append("\"titulo\":\"").append(escJson(inc.getTitulo())).append("\",")
              .append("\"descripcion\":\"").append(escJson(inc.getDescripcion())).append("\",")
              .append("\"estado\":\"").append(escJson(inc.getEstado())).append("\",")
              .append("\"impacto\":\"").append(escJson(inc.getImpacto())).append("\",")
              .append("\"ubicacion\":\"").append(escJson(inc.getUbicacion())).append("\",")
              .append("\"idUsuarioReporta\":").append(inc.getIdUsuarioReporta()).append(",")
              .append("\"fechaCreacion\":\"")
              .append(inc.getFechaCreacion() != null ? sdf.format(inc.getFechaCreacion()) : "")
              .append("\"}");;
        }
        sb.append("]");
        return sb.toString();
    }

    private String usuariosToJson(List<Usuario> lista) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < lista.size(); i++) {
            Usuario u = lista.get(i);
            if (i > 0) sb.append(",");
            sb.append("{")
              .append("\"id\":").append(u.getIdUsuario()).append(",")
              .append("\"nombre\":\"").append(escJson(u.getNombreCompleto())).append("\",")
              .append("\"correo\":\"").append(escJson(u.getCorreo())).append("\",")
              .append("\"rol\":\"").append(escJson(u.getRol())).append("\",")
              .append("\"departamento\":\"").append(escJson(u.getDepartamento())).append("\"")
              .append("}");
        }
        sb.append("]");
        return sb.toString();
    }
}
