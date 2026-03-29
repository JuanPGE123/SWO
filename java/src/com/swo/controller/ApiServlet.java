package com.swo.controller;

import com.swo.dao.IncidenciaDAO;
import com.swo.dao.ProyectoDAO;
import com.swo.dao.ReporteDAO;
import com.swo.dao.UsuarioDAO;
import com.swo.model.Incidencia;
import com.swo.model.Proyecto;
import com.swo.model.Reporte;
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
 *   GET    /api/incidencias          -> lista de incidencias
 *   POST   /api/incidencias          -> crear incidencia
 *   GET    /api/usuarios             -> lista usuarios
 *   POST   /api/usuarios             -> crear usuario
 *   DELETE /api/usuarios/{id}        -> eliminar usuario (lógico)
 *   GET    /api/proyectos            -> lista proyectos
 *   POST   /api/proyectos            -> crear proyecto
 *   DELETE /api/proyectos/{id}       -> eliminar proyecto
 *   POST   /api/proyectos/asignar    -> asignar usuario a proyecto
 *   GET    /api/estadisticas         -> estadísticas dashboard
 *   POST   /api/login               -> autenticar usuario
 *   POST   /api/logout              -> cerrar sesión
 */
@WebServlet("/api/*")
public class ApiServlet extends HttpServlet {

    private IncidenciaDAO incidenciaDAO;
    private UsuarioDAO usuarioDAO;
    private ProyectoDAO proyectoDAO;
    private ReporteDAO reporteDAO;

    @Override
    public void init() throws ServletException {
        super.init();
        incidenciaDAO = new IncidenciaDAO();
        usuarioDAO = new UsuarioDAO();
        proyectoDAO = new ProyectoDAO();
        reporteDAO = new ReporteDAO();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        setCorsHeaders(res);
        res.setContentType("application/json;charset=UTF-8");
        req.setCharacterEncoding("UTF-8");

        String path = req.getPathInfo();
        if (path == null) path = "/";
        PrintWriter out = res.getWriter();

        if ("/incidencias".equals(path)) {
            out.print(incidenciasToJson(incidenciaDAO.obtenerIncidencias()));

        } else if ("/usuarios".equals(path)) {
            out.print(usuariosToJson(usuarioDAO.obtenerUsuarios()));

        } else if ("/proyectos".equals(path)) {
            out.print(proyectosToJson(proyectoDAO.obtenerProyectos()));

        } else if ("/reportes".equals(path)) {
            out.print(reportesToJson(reporteDAO.obtenerReportes()));

        } else if ("/estadisticas".equals(path)) {
            List<Incidencia> inc = incidenciaDAO.obtenerIncidencias();
            long abiertas = 0, enProgreso = 0, pendientes = 0, cerradas = 0;
            for (Incidencia i : inc) {
                switch (i.getEstado()) {
                    case "Abierto": abiertas++; break;
                    case "En Progreso": enProgreso++; break;
                    case "Pendiente": pendientes++; break;
                    case "Cerrado": case "Resuelto": cerradas++; break;
                }
            }
            out.print("{\"total\":" + inc.size()
                + ",\"abiertas\":" + abiertas
                + ",\"enProgreso\":" + enProgreso
                + ",\"pendientes\":" + pendientes
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
        if (path == null) path = "/";
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

        } else if ("/usuarios".equals(path)) {
            handleCrearUsuario(req, res, out);

        } else if ("/proyectos/asignar".equals(path)) {
            try {
                int idUsr = Integer.parseInt(req.getParameter("idUsuario"));
                int idPrj = Integer.parseInt(req.getParameter("idProyecto"));
                boolean ok = proyectoDAO.asignarUsuarioAProyecto(idUsr, idPrj);
                out.print(ok ? "{\"success\":true}" : "{\"error\":\"No se pudo asignar\"}");
            } catch (Exception e) {
                res.setStatus(400);
                out.print("{\"error\":\"Parametros invalidos\"}");
            }

        } else if ("/proyectos".equals(path)) {
            handleCrearProyecto(req, res, out);

        } else if ("/reportes".equals(path)) {
            try {
                String nombre = req.getParameter("nombre");
                String totalStr = req.getParameter("total");
                String abiertasStr = req.getParameter("abiertas");
                String enProgresoStr = req.getParameter("enProgreso");
                String cerradasStr = req.getParameter("cerradas");
                String usuarioStr = req.getParameter("generadoPor");

                if (nombre == null || nombre.isEmpty()) {
                    res.setStatus(400);
                    out.print("{\"error\":\"nombre es obligatorio\"}");
                    out.flush(); return;
                }
                Reporte rep = new Reporte(
                    nombre,
                    totalStr != null ? Integer.parseInt(totalStr) : 0,
                    abiertasStr != null ? Integer.parseInt(abiertasStr) : 0,
                    enProgresoStr != null ? Integer.parseInt(enProgresoStr) : 0,
                    cerradasStr != null ? Integer.parseInt(cerradasStr) : 0,
                    usuarioStr != null && !usuarioStr.isEmpty() ? Integer.parseInt(usuarioStr) : null
                );
                HttpSession session = req.getSession(false);
                if (rep.getGeneradoPor() == null && session != null && session.getAttribute("idUsuario") != null) {
                    rep.setGeneradoPor((Integer) session.getAttribute("idUsuario"));
                }
                boolean ok = reporteDAO.insertarReporte(rep);
                out.print(ok ? "{\"success\":true}" : "{\"error\":\"No se pudo guardar el reporte\"}");
            } catch (Exception e) {
                res.setStatus(500);
                out.print("{\"error\":\"" + escJson(e.getMessage()) + "\"}");
            }

        } else if ("/login".equals(path)) {
            String correo = req.getParameter("correo");
            String password = req.getParameter("password");
            try {
                Usuario usuario = usuarioDAO.obtenerUsuarioPorCorreo(correo);
                if (usuario != null && !usuario.isEstado()) {
                    res.setStatus(403);
                    out.print("{\"success\":false,\"deleted\":true,\"error\":\"Este usuario ha sido eliminado. Valide con su jefe encargado.\"}");
                    out.flush();
                    return;
                }
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
                        + ",\"departamento\":\"" + escJson(usuario.getDepartamento()) + "\""
                        + ",\"idProyecto\":" + (usuario.getIdProyecto() != null ? usuario.getIdProyecto() : "null")
                        + ",\"proyecto\":\"" + escJson(usuario.getNombreProyecto()) + "\"}");
                } else {
                    res.setStatus(401);
                    out.print("{\"success\":false,\"error\":\"Credenciales incorrectas\"}");
                }
            } catch (Exception e) {
                res.setStatus(500);
                out.print("{\"success\":false,\"error\":\"Error del servidor: " + escJson(e.getMessage()) + "\"}");
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

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        setCorsHeaders(res);
        res.setContentType("application/json;charset=UTF-8");
        PrintWriter out = res.getWriter();
        String path = req.getPathInfo();
        if (path == null) path = "/";

        if (path.startsWith("/usuarios/")) {
            try {
                int id = Integer.parseInt(path.substring("/usuarios/".length()));
                boolean ok = usuarioDAO.eliminarUsuario(id);
                out.print(ok ? "{\"success\":true}" : "{\"error\":\"No encontrado\"}");
            } catch (Exception e) {
                res.setStatus(400);
                out.print("{\"error\":\"ID invalido\"}");
            }
        } else if (path.startsWith("/proyectos/")) {
            try {
                int id = Integer.parseInt(path.substring("/proyectos/".length()));
                boolean ok = proyectoDAO.eliminarProyecto(id);
                out.print(ok ? "{\"success\":true}" : "{\"error\":\"No encontrado\"}");
            } catch (Exception e) {
                res.setStatus(400);
                out.print("{\"error\":\"ID invalido\"}");
            }
        } else {
            res.setStatus(404);
            out.print("{\"error\":\"Ruta no encontrada\"}");
        }
        out.flush();
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        setCorsHeaders(res);
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
        res.setStatus(200);
    }

    private void handleCrearUsuario(HttpServletRequest req, HttpServletResponse res, PrintWriter out)
            throws IOException {
        try {
            String nombre = req.getParameter("nombre");
            String correo = req.getParameter("correo");
            String password = req.getParameter("password");
            String rol = req.getParameter("rol");
            String telefono = req.getParameter("telefono");
            String departamento = req.getParameter("departamento");
            String idPrStr = req.getParameter("idProyecto");

            if (nombre == null || nombre.isEmpty() || correo == null || correo.isEmpty()) {
                res.setStatus(400);
                out.print("{\"error\":\"nombre y correo son obligatorios\"}");
                return;
            }
            Usuario u = new Usuario();
            u.setNombreCompleto(nombre);
            u.setCorreo(correo);
            u.setPasswordHash(password != null && !password.isEmpty() ? password : "123456");
            u.setRol(rol != null && !rol.isEmpty() ? rol : "Usuario");
            u.setTelefono(telefono != null ? telefono : "");
            u.setDepartamento(departamento != null ? departamento : "");
            if (idPrStr != null && !idPrStr.isEmpty()) u.setIdProyecto(Integer.parseInt(idPrStr));

            boolean ok = usuarioDAO.insertarUsuario(u);
            if (ok) out.print("{\"success\":true,\"mensaje\":\"Usuario creado\"}");
            else { res.setStatus(500); out.print("{\"error\":\"No se pudo crear el usuario\"}"); }
        } catch (Exception e) {
            res.setStatus(500);
            out.print("{\"error\":\"" + escJson(e.getMessage()) + "\"}");
        }
    }

    private void handleCrearProyecto(HttpServletRequest req, HttpServletResponse res, PrintWriter out)
            throws IOException {
        try {
            String nombre = req.getParameter("nombre");
            String descripcion = req.getParameter("descripcion");
            String estado = req.getParameter("estado");

            if (nombre == null || nombre.isEmpty()) {
                res.setStatus(400);
                out.print("{\"error\":\"nombre es obligatorio\"}");
                return;
            }
            Proyecto p = new Proyecto(nombre,
                    descripcion != null ? descripcion : "",
                    estado != null && !estado.isEmpty() ? estado : "Activo");
            boolean ok = proyectoDAO.insertarProyecto(p);
            if (ok) out.print("{\"success\":true,\"id\":" + p.getIdProyecto() + ",\"mensaje\":\"Proyecto creado\"}");
            else { res.setStatus(500); out.print("{\"error\":\"No se pudo crear el proyecto\"}"); }
        } catch (Exception e) {
            res.setStatus(500);
            out.print("{\"error\":\"" + escJson(e.getMessage()) + "\"}");
        }
    }

    private void setCorsHeaders(HttpServletResponse res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
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
              .append("\"telefono\":\"").append(escJson(u.getTelefono())).append("\",")
              .append("\"departamento\":\"").append(escJson(u.getDepartamento())).append("\",")
              .append("\"idProyecto\":").append(u.getIdProyecto() != null ? u.getIdProyecto() : "null").append(",")
              .append("\"proyecto\":\"").append(escJson(u.getNombreProyecto())).append("\"")
              .append("}");
        }
        sb.append("]");
        return sb.toString();
    }

    private String proyectosToJson(List<Proyecto> lista) {
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < lista.size(); i++) {
            Proyecto p = lista.get(i);
            if (i > 0) sb.append(",");
            sb.append("{")
              .append("\"id\":").append(p.getIdProyecto()).append(",")
              .append("\"nombre\":\"").append(escJson(p.getNombre())).append("\",")
              .append("\"descripcion\":\"").append(escJson(p.getDescripcion())).append("\",")
              .append("\"estado\":\"").append(escJson(p.getEstado())).append("\",")
              .append("\"fechaCreacion\":\"").append(p.getFechaCreacion() != null ? sdf.format(p.getFechaCreacion()) : "").append("\"")
              .append("}");
        }
        sb.append("]");
        return sb.toString();
    }

    private String reportesToJson(List<Reporte> lista) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < lista.size(); i++) {
            Reporte r = lista.get(i);
            if (i > 0) sb.append(",");
            sb.append("{")
              .append("\"id\":").append(r.getIdReporte()).append(",")
              .append("\"nombre\":\"").append(escJson(r.getNombre())).append("\",")
              .append("\"total\":").append(r.getTotalIncidencias()).append(",")
              .append("\"abiertas\":").append(r.getAbiertas()).append(",")
              .append("\"enProgreso\":").append(r.getEnProgreso()).append(",")
              .append("\"cerradas\":").append(r.getCerradas()).append(",")
              .append("\"fecha\":\"").append(r.getFechaGeneracion() != null ? sdf.format(r.getFechaGeneracion()) : "").append("\"")
              .append("}");
        }
        sb.append("]");
        return sb.toString();
    }
}
