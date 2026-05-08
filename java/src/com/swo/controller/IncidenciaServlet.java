package com.swo.controller;

import com.swo.dao.IncidenciaDAO;
import com.swo.model.Incidencia;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

/**
 * Servlet para gestionar operaciones CRUD de Incidencias
 * Mapeo: /IncidenciaServlet
 */
@WebServlet("/IncidenciaServlet")
public class IncidenciaServlet extends HttpServlet {
    
    private IncidenciaDAO incidenciaDAO;
    
    @Override
    public void init() throws ServletException {
        super.init();
        incidenciaDAO = new IncidenciaDAO();
    }
    
    /**
     * Método doPost: Recibe el formulario de registro de incidencia
     * Captura los parámetros, crea la incidencia y redirige al método GET
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Configurar codificación UTF-8
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        
        try {
            // Capturar parámetros del formulario
            String titulo = request.getParameter("titulo");
            String descripcion = request.getParameter("descripcion");
            String estado = request.getParameter("estado");
            String ubicacion = request.getParameter("ubicacion");
            String impacto = request.getParameter("impacto");
            String idUsuarioStr = request.getParameter("idUsuarioReporta");
            
            // Validar parámetros
            if (titulo == null || titulo.trim().isEmpty() ||
                descripcion == null || descripcion.trim().isEmpty() ||
                estado == null || estado.trim().isEmpty()) {
                
                request.setAttribute("mensaje", "Error: Todos los campos son obligatorios");
                request.setAttribute("tipoMensaje", "error");
                RequestDispatcher rd = request.getRequestDispatcher("registroIncidencia.html");
                rd.forward(request, response);
                return;
            }
            
            // Parsear ID de usuario (por defecto 1 si no está en sesión)
            int idUsuarioReporta = 1;
            if (idUsuarioStr != null && !idUsuarioStr.isEmpty()) {
                idUsuarioReporta = Integer.parseInt(idUsuarioStr);
            } else {
                // Intentar obtener de la sesión
                HttpSession session = request.getSession(false);
                if (session != null && session.getAttribute("idUsuario") != null) {
                    idUsuarioReporta = (Integer) session.getAttribute("idUsuario");
                }
            }
            
            // Crear objeto Incidencia con todos los campos
            Incidencia incidencia = new Incidencia(titulo, descripcion, estado, idUsuarioReporta);
            incidencia.setUbicacion(ubicacion);
            incidencia.setImpacto(impacto != null && !impacto.isEmpty() ? impacto : "Medio");
            
            // Insertar en la base de datos
            int resultado = incidenciaDAO.insertarIncidencia(incidencia);
            
            if (resultado > 0) {
                // Redirigir al método GET para mostrar la lista actualizada
                response.sendRedirect("IncidenciaServlet?mensaje=Incidencia registrada exitosamente");
            } else {
                request.setAttribute("mensaje", "Error: No se pudo registrar la incidencia");
                request.setAttribute("tipoMensaje", "error");
                RequestDispatcher rd = request.getRequestDispatcher("registroIncidencia.html");
                rd.forward(request, response);
            }
            
        } catch (NumberFormatException e) {
            request.setAttribute("mensaje", "Error: ID de usuario inválido");
            request.setAttribute("tipoMensaje", "error");
            RequestDispatcher rd = request.getRequestDispatcher("registroIncidencia.html");
            rd.forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            request.setAttribute("mensaje", "Error del servidor: " + e.getMessage());
            request.setAttribute("tipoMensaje", "error");
            RequestDispatcher rd = request.getRequestDispatcher("registroIncidencia.html");
            rd.forward(request, response);
        }
    }
    
    /**
     * Método doGet: Obtiene todas las incidencias y las muestra en JSP
     * Invoca al DAO, guarda la lista en request y hace forward al JSP
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Configurar codificación UTF-8
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        
        try {
            // Obtener todas las incidencias de la base de datos
            List<Incidencia> listaIncidencias = incidenciaDAO.obtenerIncidencias();
            
            // Guardar la lista en el request para enviarla al JSP
            request.setAttribute("listaIncidencias", listaIncidencias);
            
            // Capturar mensaje de éxito si existe
            String mensaje = request.getParameter("mensaje");
            if (mensaje != null && !mensaje.isEmpty()) {
                request.setAttribute("mensaje", mensaje);
                request.setAttribute("tipoMensaje", "success");
            }
            
            // Forward hacia el JSP que mostrará la lista
            RequestDispatcher dispatcher = request.getRequestDispatcher("jsp/listarIncidencias.jsp");
            dispatcher.forward(request, response);
            
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                             "Error al obtener incidencias: " + e.getMessage());
        }
    }
    
    /**
     * Método DELETE personalizado para actualizar estado de incidencias
     */
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String idStr = request.getParameter("id");
        
        if (idStr != null && !idStr.isEmpty()) {
            try {
                int id = Integer.parseInt(idStr);
                boolean resultado = incidenciaDAO.eliminarIncidencia(id);
                
                if (resultado) {
                    response.setStatus(HttpServletResponse.SC_OK);
                    response.getWriter().write("Incidencia eliminada exitosamente");
                } else {
                    response.sendError(HttpServletResponse.SC_NOT_FOUND, 
                                     "No se encontró la incidencia");
                }
            } catch (NumberFormatException e) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID inválido");
            }
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID no proporcionado");
        }
    }
}
