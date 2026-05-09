package com.swo.controller;

import com.swo.dao.ComentarioDAO;
import com.swo.dao.ConocimientoDAO;
import com.swo.dao.IncidenciaDAO;
import com.swo.dao.ProyectoDAO;
import com.swo.dao.ReporteDAO;
import com.swo.dao.UsuarioDAO;
import com.swo.model.Comentario;
import com.swo.model.Conocimiento;
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
    private ConocimientoDAO conocimientoDAO;
    private ComentarioDAO comentarioDAO;

    /**
     * Inicializa los DAOs al arrancar el servlet.
     * Se llama automáticamente por el contenedor al desplegar la aplicación.
     */
    /**
     * Inicializa los DAOs al arrancar el servlet.
     * Se llama automáticamente por el contenedor al desplegar la aplicación.
     */
    @Override
    public void init() throws ServletException {
        super.init();
        incidenciaDAO = new IncidenciaDAO();
        usuarioDAO = new UsuarioDAO();
        proyectoDAO = new ProyectoDAO();
        reporteDAO = new ReporteDAO();
        comentarioDAO = new ComentarioDAO();
        conocimientoDAO = new ConocimientoDAO();
    }

    /**
     * Maneja peticiones HTTP GET.
     * Rutas soportadas:
     * <ul>
     *   <li>{@code /incidencias}    - Lista todas las incidencias</li>
     *   <li>{@code /usuarios}       - Lista todos los usuarios activos</li>
     *   <li>{@code /proyectos}      - Lista todos los proyectos</li>
     *   <li>{@code /reportes}       - Lista los últimos reportes</li>
     *   <li>{@code /chatbot?q=...}  - Consulta la base de conocimiento</li>
     *   <li>{@code /estadisticas}   - Conteo de incidencias por estado</li>
     * </ul>
     */
    /**
     * Maneja peticiones HTTP GET.
     * Rutas soportadas:
     * <ul>
     *   <li>{@code /incidencias}    - Lista todas las incidencias</li>
     *   <li>{@code /usuarios}       - Lista todos los usuarios activos</li>
     *   <li>{@code /proyectos}      - Lista todos los proyectos</li>
     *   <li>{@code /reportes}       - Lista los últimos reportes</li>
     *   <li>{@code /chatbot?q=...}  - Consulta la base de conocimiento</li>
     *   <li>{@code /estadisticas}   - Conteo de incidencias por estado</li>
     * </ul>
     */
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

        } else if ("/chatbot".equals(path)) {
            String q = req.getParameter("q");
            if (q == null || q.trim().isEmpty()) {
                out.print("{\"resultados\":[],\"categorias\":[]}");
            } else {
                List<Conocimiento> resultados = conocimientoDAO.buscarPorTexto(q);
                List<String> categorias = conocimientoDAO.obtenerCategorias();
                out.print("{\"resultados\":" + conocimientoToJson(resultados)
                    + ",\"categorias\":" + categoriasToJson(categorias) + "}");
            }

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
            
            // Calcular tiempo promedio de resolución
            double tiempoPromedioHoras = incidenciaDAO.obtenerTiempoPromedioResolucion();
            
            out.print("{\"total\":" + inc.size()
                + ",\"abiertas\":" + abiertas
                + ",\"enProgreso\":" + enProgreso
                + ",\"pendientes\":" + pendientes
                + ",\"cerradas\":" + cerradas
                + ",\"tiempoPromedioResolucionHoras\":" + String.format("%.1f", tiempoPromedioHoras)
                + "}");

        } else if (path.matches("/incidencias/\\d+/comentarios")) {
            // GET /api/incidencias/{id}/comentarios - Obtener comentarios de una incidencia
            try {
                int idIncidencia = Integer.parseInt(path.split("/")[2]);
                List<Comentario> comentarios = comentarioDAO.obtenerComentariosPorIncidencia(idIncidencia);
                out.print(comentariosToJson(comentarios));
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

    /**
     * Maneja peticiones HTTP POST.
     * Rutas soportadas:
     * <ul>
     *   <li>{@code /incidencias}         - Crea una nueva incidencia</li>
     *   <li>{@code /usuarios}            - Crea un nuevo usuario</li>
     *   <li>{@code /proyectos}           - Crea un nuevo proyecto</li>
     *   <li>{@code /proyectos/asignar}   - Asigna un usuario a un proyecto</li>
     *   <li>{@code /reportes}            - Guarda un reporte de estadísticas</li>
     *   <li>{@code /login}              - Autentica al usuario</li>
     *   <li>{@code /logout}             - Cierra la sesión del usuario</li>
     * </ul>
     */
    /**
     * Maneja peticiones HTTP POST.
     * Rutas soportadas:
     * <ul>
     *   <li>{@code /incidencias}         - Crea una nueva incidencia</li>
     *   <li>{@code /usuarios}            - Crea un nuevo usuario</li>
     *   <li>{@code /proyectos}           - Crea un nuevo proyecto</li>
     *   <li>{@code /proyectos/asignar}   - Asigna un usuario a un proyecto</li>
     *   <li>{@code /reportes}            - Guarda un reporte de estadísticas</li>
     *   <li>{@code /login}              - Autentica al usuario</li>
     *   <li>{@code /logout}             - Cierra la sesión del usuario</li>
     * </ul>
     */
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
                String idUsuarioAsignadoStr = req.getParameter("idUsuarioAsignado");

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

                int newId = incidenciaDAO.insertarIncidencia(inc);
                if (newId > 0) {
                    // Si se indicó usuario asignado, crear la asignación
                    if (idUsuarioAsignadoStr != null && !idUsuarioAsignadoStr.isEmpty()) {
                        try {
                            int idUsuarioAsignado = Integer.parseInt(idUsuarioAsignadoStr);
                            int idEmpleado = incidenciaDAO.obtenerIdEmpleadoPorUsuario(idUsuarioAsignado);
                            if (idEmpleado > 0) {
                                incidenciaDAO.asignarIncidencia(newId, idEmpleado);
                            }
                        } catch (NumberFormatException ignored) {}
                    }
                    out.print("{\"success\":true,\"id\":" + newId + ",\"mensaje\":\"Incidencia creada\"}");
                } else {
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

        } else if (path.matches("/incidencias/\\d+/comentarios")) {
            // POST /api/incidencias/{id}/comentarios - Agregar comentario
            try {
                int idIncidencia = Integer.parseInt(path.split("/")[2]);
                String comentarioTexto = req.getParameter("comentario");
                String idUsuarioStr = req.getParameter("idUsuario");
                
                if (comentarioTexto == null || comentarioTexto.trim().isEmpty()) {
                    res.setStatus(400);
                    out.print("{\"error\":\"El comentario no puede estar vacio\"}");
                    return;
                }
                
                int idUsuario = 1; // Usuario por defecto
                if (idUsuarioStr != null && !idUsuarioStr.isEmpty()) {
                    idUsuario = Integer.parseInt(idUsuarioStr);
                } else {
                    HttpSession session = req.getSession(false);
                    if (session != null && session.getAttribute("idUsuario") != null) {
                        idUsuario = (Integer) session.getAttribute("idUsuario");
                    }
                }
                
                Comentario comentario = new Comentario(idIncidencia, idUsuario, comentarioTexto);
                boolean ok = comentarioDAO.insertarComentario(comentario);
                
                if (ok) {
                    out.print("{\"success\":true,\"mensaje\":\"Comentario agregado\"}");
                } else {
                    res.setStatus(500);
                    out.print("{\"error\":\"No se pudo agregar el comentario\"}");
                }
            } catch (Exception e) {
                res.setStatus(400);
                out.print("{\"error\":\"" + escJson(e.getMessage()) + "\"}");
            }

        } else if (path.matches("/incidencias/\\d+/asignar")) {
            // POST /api/incidencias/{id}/asignar - Asignar incidencia a un empleado
            try {
                int idIncidencia = Integer.parseInt(path.split("/")[2]);
                String idEmpleadoStr = req.getParameter("idEmpleado");
                
                if (idEmpleadoStr == null || idEmpleadoStr.trim().isEmpty()) {
                    res.setStatus(400);
                    out.print("{\"error\":\"idEmpleado es obligatorio\"}");
                    return;
                }
                
                int idEmpleado = Integer.parseInt(idEmpleadoStr);
                boolean ok = incidenciaDAO.asignarIncidencia(idIncidencia, idEmpleado);
                
                if (ok) {
                    out.print("{\"success\":true,\"mensaje\":\"Incidencia asignada\"}");
                } else {
                    res.setStatus(500);
                    out.print("{\"error\":\"No se pudo asignar la incidencia\"}");
                }
            } catch (Exception e) {
                res.setStatus(400);
                out.print("{\"error\":\"" + escJson(e.getMessage()) + "\"}");
            }

        } else {
            res.setStatus(404);
            out.print("{\"error\":\"Ruta no encontrada\"}");
        }
        out.flush();
    }

    /**
     * Maneja peticiones HTTP DELETE.
     * Rutas soportadas:
     * <ul>
     *   <li>{@code /usuarios/{id}}   - Eliminación lógica del usuario (estado=false)</li>
     *   <li>{@code /proyectos/{id}}  - Elimina el proyecto y desasigna sus usuarios</li>
     * </ul>
     */
    /**
     * Maneja peticiones HTTP DELETE.
     * Rutas soportadas:
     * <ul>
     *   <li>{@code /usuarios/{id}}   - Eliminación lógica del usuario (estado=false)</li>
     *   <li>{@code /proyectos/{id}}  - Elimina el proyecto y desasigna sus usuarios</li>
     * </ul>
     */
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

    /**
     * Maneja peticiones HTTP PUT.
     * Rutas soportadas:
     * <ul>
     *   <li>{@code /incidencias/{id}} - Actualiza o resuelve una incidencia existente</li>
     * </ul>
     * Nota: Tomcat 7 no parsea el body en PUT con {@code getParameter()},
     * por lo que se lee y decodifica el body manualmente.
     */
    /**
     * Maneja peticiones HTTP PUT.
     * Rutas soportadas:
     * <ul>
     *   <li>{@code /incidencias/{id}} - Actualiza o resuelve una incidencia existente</li>
     * </ul>
     * Nota: Tomcat 7 no parsea el body en PUT con {@code getParameter()},
     * por lo que se lee y decodifica el body manualmente.
     */
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        setCorsHeaders(res);
        res.setContentType("application/json;charset=UTF-8");
        req.setCharacterEncoding("UTF-8");
        PrintWriter out = res.getWriter();
        String path = req.getPathInfo();
        if (path == null) path = "/";

        if (path.startsWith("/incidencias/")) {
            try {
                int id = Integer.parseInt(path.substring("/incidencias/".length()));
                // Tomcat 7 no parsea body de PUT — leer manualmente
                java.util.Map<String, String> params = new java.util.HashMap<>();
                java.io.BufferedReader reader = req.getReader();
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) sb.append(line);
                String body = sb.toString();
                if (body != null && !body.isEmpty()) {
                    for (String pair : body.split("&")) {
                        int eq = pair.indexOf('=');
                        if (eq > 0) {
                            String k = java.net.URLDecoder.decode(pair.substring(0, eq), "UTF-8");
                            String v = java.net.URLDecoder.decode(pair.substring(eq + 1), "UTF-8");
                            params.put(k, v);
                        }
                    }
                }
                String titulo = params.get("titulo");
                String descripcion = params.get("descripcion");
                String estado = params.get("estado");
                String impacto = params.get("impacto");
                String ubicacion = params.get("ubicacion");
                String resolucion = params.get("resolucion");
                String resolverStr = params.get("resolver");
                boolean resolver = "true".equals(resolverStr);
                String idUsuarioAsignadoStr = params.get("idUsuarioAsignado");
                Integer idUsuarioAsignado = null;
                if (idUsuarioAsignadoStr != null && !idUsuarioAsignadoStr.isEmpty()) {
                    try {
                        idUsuarioAsignado = Integer.parseInt(idUsuarioAsignadoStr);
                    } catch (NumberFormatException e) {
                        // Ignorar si no es un número válido
                    }
                }

                if (titulo == null || titulo.isEmpty()) {
                    res.setStatus(400);
                    out.print("{\"error\":\"titulo es obligatorio\"}");
                    return;
                }

                boolean ok = incidenciaDAO.actualizarIncidencia(id, titulo,
                    descripcion != null ? descripcion : "",
                    estado != null ? estado : "Abierto",
                    impacto, ubicacion, resolucion, resolver, idUsuarioAsignado);

                if (ok) out.print("{\"success\":true,\"mensaje\":\"Incidencia actualizada\"}");
                else { res.setStatus(500); out.print("{\"error\":\"No se pudo actualizar\"}"); }
            } catch (NumberFormatException e) {
                res.setStatus(400);
                out.print("{\"error\":\"ID invalido\"}");
            } catch (Exception e) {
                res.setStatus(500);
                out.print("{\"error\":\"" + escJson(e.getMessage()) + "\"}");
            }
        } else if (path.matches("/incidencias/\\d+/estado")) {
            // PUT /api/incidencias/{id}/estado - Cambiar estado
            try {
                int idIncidencia = Integer.parseInt(path.split("/")[2]);
                java.util.Map<String, String> params = parsePutBody(req);
                String nuevoEstado = params.get("estado");
                
                if (nuevoEstado == null || nuevoEstado.trim().isEmpty()) {
                    res.setStatus(400);
                    out.print("{\"error\":\"estado es obligatorio\"}");
                    return;
                }
                
                boolean ok = incidenciaDAO.actualizarEstadoIncidencia(idIncidencia, nuevoEstado);
                
                if (ok) {
                    out.print("{\"success\":true,\"mensaje\":\"Estado actualizado\"}");
                } else {
                    res.setStatus(500);
                    out.print("{\"error\":\"No se pudo actualizar el estado\"}");
                }
            } catch (Exception e) {
                res.setStatus(400);
                out.print("{\"error\":\"" + escJson(e.getMessage()) + "\"}");
            }
        } else if (path.matches("/incidencias/\\d+/prioridad")) {
            // PUT /api/incidencias/{id}/prioridad - Cambiar prioridad
            try {
                int idIncidencia = Integer.parseInt(path.split("/")[2]);
                java.util.Map<String, String> params = parsePutBody(req);
                String nuevaPrioridad = params.get("prioridad");
                
                if (nuevaPrioridad == null || nuevaPrioridad.trim().isEmpty()) {
                    res.setStatus(400);
                    out.print("{\"error\":\"prioridad es obligatoria\"}");
                    return;
                }
                
                boolean ok = incidenciaDAO.actualizarPrioridad(idIncidencia, nuevaPrioridad);
                
                if (ok) {
                    out.print("{\"success\":true,\"mensaje\":\"Prioridad actualizada\"}");
                } else {
                    res.setStatus(500);
                    out.print("{\"error\":\"No se pudo actualizar la prioridad\"}");
                }
            } catch (Exception e) {
                res.setStatus(400);
                out.print("{\"error\":\"" + escJson(e.getMessage()) + "\"}");
            }
        } else {
            res.setStatus(404);
            out.print("{\"error\":\"Ruta no encontrada\"}");
        }
        out.flush();
    }

    /**
     * Responde las peticiones HTTP OPTIONS para CORS preflight.
     * Permite que el navegador valide los métodos y cabeceras permitidos.
     */
    /**
     * Responde las peticiones HTTP OPTIONS para CORS preflight.
     * Permite que el navegador valide los métodos y cabeceras permitidos.
     */
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        setCorsHeaders(res);
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setStatus(200);
    }

    /**
     * Maneja la creación de un nuevo usuario a partir de los parámetros POST.
     * Requiere los campos {@code nombre} y {@code correo}; el resto son opcionales.
     *
     * @param req Petición HTTP
     * @param res Respuesta HTTP
     * @param out PrintWriter para escribir JSON de respuesta
     */
    /**
     * Maneja la creación de un nuevo usuario a partir de los parámetros POST.
     * Requiere los campos {@code nombre} y {@code correo}; el resto son opcionales.
     *
     * @param req Petición HTTP
     * @param res Respuesta HTTP
     * @param out PrintWriter para escribir JSON de respuesta
     */
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

    /**
     * Maneja la creación de un nuevo proyecto a partir de los parámetros POST.
     * Requiere el campo {@code nombre}; {@code descripcion} y {@code estado} son opcionales.
     *
     * @param req Petición HTTP
     * @param res Respuesta HTTP
     * @param out PrintWriter para escribir JSON de respuesta
     */
    /**
     * Maneja la creación de un nuevo proyecto a partir de los parámetros POST.
     * Requiere el campo {@code nombre}; {@code descripcion} y {@code estado} son opcionales.
     *
     * @param req Petición HTTP
     * @param res Respuesta HTTP
     * @param out PrintWriter para escribir JSON de respuesta
     */
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

    /**
     * Establece los encabezados CORS en la respuesta para permitir llamadas cross-origin
     * desde el frontend Angular (localhost:4200).
     *
     * @param res Respuesta HTTP donde se agregan los encabezados
     */
    /**
     * Establece los encabezados CORS en la respuesta para permitir llamadas cross-origin
     * desde el frontend Angular (localhost:4200).
     *
     * @param res Respuesta HTTP donde se agregan los encabezados
     */
    private void setCorsHeaders(HttpServletResponse res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    /**
     * Escapa caracteres especiales JSON en una cadena de texto.
     * Reemplaza {@code \} por {@code \\} y {@code "} por {@code \"}.
     *
     * @param s Cadena a escapar
     * @return Cadena escapada, o cadena vacía si {@code s} es null
     */
    /**
     * Escapa caracteres especiales JSON en una cadena de texto.
     * Reemplaza {@code \} por {@code \\} y {@code "} por {@code \"}.
     *
     * @param s Cadena a escapar
     * @return Cadena escapada, o cadena vacía si {@code s} es null
     */
    private String escJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }

    /**
     * Serializa una lista de incidencias a formato JSON.
     * Incluye todos los campos del modelo incluidos {@code resolucion} y {@code fechaResolucion}.
     *
     * @param lista Lista de objetos Incidencia
     * @return String JSON con el array de incidencias
     */
    /**
     * Serializa una lista de incidencias a formato JSON.
     * Incluye todos los campos del modelo incluidos {@code resolucion} y {@code fechaResolucion}.
     *
     * @param lista Lista de objetos Incidencia
     * @return String JSON con el array de incidencias
     */
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
              .append("\"resolucion\":\"").append(inc.getResolucion() != null ? escJson(inc.getResolucion()) : "").append("\",")
              .append("\"fechaResolucion\":\"").append(inc.getFechaResolucion() != null ? sdf.format(inc.getFechaResolucion()) : "").append("\",")
              .append("\"fechaCreacion\":\"")
              .append(inc.getFechaCreacion() != null ? sdf.format(inc.getFechaCreacion()) : "")
              .append("\",")
              .append("\"asignado\":\"")
              .append(inc.getAsignado() != null ? escJson(inc.getAsignado()) : "")
              .append("\",")
              .append("\"idUsuarioAsignado\":")
              .append(inc.getIdUsuarioAsignado() != null ? inc.getIdUsuarioAsignado() : "null")
              .append("}");
        }
        sb.append("]");
        return sb.toString();
    }

    /**
     * Serializa una lista de usuarios a formato JSON.
     *
     * @param lista Lista de objetos Usuario
     * @return String JSON con el array de usuarios
     */
    /**
     * Serializa una lista de usuarios a formato JSON.
     *
     * @param lista Lista de objetos Usuario
     * @return String JSON con el array de usuarios
     */
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

    /**
     * Serializa una lista de proyectos a formato JSON.
     *
     * @param lista Lista de objetos Proyecto
     * @return String JSON con el array de proyectos
     */
    /**
     * Serializa una lista de proyectos a formato JSON.
     *
     * @param lista Lista de objetos Proyecto
     * @return String JSON con el array de proyectos
     */
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

    /**
     * Serializa una lista de entradas de conocimiento a formato JSON.
     *
     * @param lista Lista de objetos Conocimiento
     * @return String JSON con el array de conocimientos
     */
    /**
     * Serializa una lista de entradas de conocimiento a formato JSON.
     *
     * @param lista Lista de objetos Conocimiento
     * @return String JSON con el array de conocimientos
     */
    private String conocimientoToJson(List<Conocimiento> lista) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < lista.size(); i++) {
            Conocimiento c = lista.get(i);
            if (i > 0) sb.append(",");
            sb.append("{")
              .append("\"id\":").append(c.getId()).append(",")
              .append("\"categoria\":\"").append(escJson(c.getCategoria())).append("\",")
              .append("\"pregunta\":\"").append(escJson(c.getPregunta())).append("\",")
              .append("\"respuesta\":\"").append(escJson(c.getRespuesta())).append("\",")
              .append("\"pasos\":\"").append(escJson(c.getPasos() != null ? c.getPasos() : "")).append("\",")
              .append("\"nivel\":").append(c.getNivelSoporte())
              .append("}");
        }
        sb.append("]");
        return sb.toString();
    }

    /**
     * Serializa una lista de categorías a formato JSON como array de strings.
     *
     * @param lista Lista de nombres de categorías
     * @return String JSON con el array de categorías
     */
    /**
     * Serializa una lista de categorías a formato JSON como array de strings.
     *
     * @param lista Lista de nombres de categorías
     * @return String JSON con el array de categorías
     */
    private String categoriasToJson(List<String> lista) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < lista.size(); i++) {
            if (i > 0) sb.append(",");
            sb.append("\"").append(escJson(lista.get(i))).append("\"");
        }
        sb.append("]");
        return sb.toString();
    }

    /**
     * Serializa una lista de reportes a formato JSON.
     *
     * @param lista Lista de objetos Reporte
     * @return String JSON con el array de reportes
     */
    /**
     * Serializa una lista de reportes a formato JSON.
     *
     * @param lista Lista de objetos Reporte
     * @return String JSON con el array de reportes
     */
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

    /**
     * Serializa una lista de comentarios a formato JSON.
     *
     * @param lista Lista de objetos Comentario
     * @return String JSON con el array de comentarios
     */
    private String comentariosToJson(List<Comentario> lista) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < lista.size(); i++) {
            Comentario c = lista.get(i);
            if (i > 0) sb.append(",");
            sb.append("{")
              .append("\"id\":").append(c.getIdComentario()).append(",")
              .append("\"idIncidencia\":").append(c.getIdIncidencia()).append(",")
              .append("\"idUsuario\":").append(c.getIdUsuario()).append(",")
              .append("\"autor\":\"").append(escJson(c.getNombreUsuario())).append("\",")
              .append("\"comentario\":\"").append(escJson(c.getComentario())).append("\",")
              .append("\"esSolucion\":").append(c.isEsSolucion()).append(",")
              .append("\"fecha\":\"").append(c.getFechaComentario() != null ? sdf.format(c.getFechaComentario()) : "").append("\"")
              .append("}");
        }
        sb.append("]");
        return sb.toString();
    }

    /**
     * Parsea el body de una petición PUT y extrae los parámetros.
     * Necesario porque Tomcat 7 no parsea automáticamente el body de PUT.
     *
     * @param req Petición HTTP
     * @return Mapa con los parámetros extraídos
     * @throws IOException Si hay error leyendo el body
     */
    private java.util.Map<String, String> parsePutBody(HttpServletRequest req) throws IOException {
        java.util.Map<String, String> params = new java.util.HashMap<>();
        java.io.BufferedReader reader = req.getReader();
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        String body = sb.toString();
        if (body != null && !body.isEmpty()) {
            for (String pair : body.split("&")) {
                int eq = pair.indexOf('=');
                if (eq > 0) {
                    String k = java.net.URLDecoder.decode(pair.substring(0, eq), "UTF-8");
                    String v = java.net.URLDecoder.decode(pair.substring(eq + 1), "UTF-8");
                    params.put(k, v);
                }
            }
        }
        return params;
    }
}
