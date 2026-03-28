package com.swo.controller;

import com.swo.dao.IncidenciaDAO;
import com.swo.dao.UsuarioDAO;
import com.swo.model.Incidencia;
import com.swo.model.Usuario;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Servlet para generar reportes y estadísticas
 * Mapeo: /ReporteServlet
 */
@WebServlet("/ReporteServlet")
public class ReporteServlet extends HttpServlet {
    
    private IncidenciaDAO incidenciaDAO;
    private UsuarioDAO usuarioDAO;
    
    @Override
    public void init() throws ServletException {
        super.init();
        incidenciaDAO = new IncidenciaDAO();
        usuarioDAO = new UsuarioDAO();
    }
    
    /**
     * Método doGet: Generar reportes y estadísticas
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        
        try {
            // Obtener datos
            List<Incidencia> incidencias = incidenciaDAO.obtenerIncidencias();
            List<Usuario> usuarios = usuarioDAO.obtenerUsuarios();
            
            // Calcular estadísticas generales
            Map<String, Object> estadisticas = calcularEstadisticas(incidencias, usuarios);
            
            // Enviar al JSP
            request.setAttribute("estadisticas", estadisticas);
            request.setAttribute("incidencias", incidencias);
            request.setAttribute("usuarios", usuarios);
            
            RequestDispatcher dispatcher = request.getRequestDispatcher("jsp/reportes.jsp");
            dispatcher.forward(request, response);
            
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                             "Error al generar reportes: " + e.getMessage());
        }
    }
    
    /**
     * Calcula estadísticas del sistema
     */
    private Map<String, Object> calcularEstadisticas(List<Incidencia> incidencias, 
                                                      List<Usuario> usuarios) {
        Map<String, Object> stats = new HashMap<>();
        
        // Estadísticas de incidencias
        stats.put("totalIncidencias", incidencias.size());
        stats.put("incidenciasAbiertas", 
                 incidencias.stream().filter(i -> "Abierto".equals(i.getEstado())).count());
        stats.put("incidenciasEnProgreso", 
                 incidencias.stream().filter(i -> "En Progreso".equals(i.getEstado())).count());
        stats.put("incidenciasCerradas", 
                 incidencias.stream().filter(i -> "Cerrado".equals(i.getEstado())).count());
        
        // Porcentajes
        if (incidencias.size() > 0) {
            stats.put("porcentajeCerradas", 
                     (incidencias.stream().filter(i -> "Cerrado".equals(i.getEstado())).count() * 100.0) 
                     / incidencias.size());
            stats.put("porcentajeAbiertas", 
                     (incidencias.stream().filter(i -> "Abierto".equals(i.getEstado())).count() * 100.0) 
                     / incidencias.size());
            stats.put("porcentajeEnProgreso", 
                     (incidencias.stream().filter(i -> "En Progreso".equals(i.getEstado())).count() * 100.0) 
                     / incidencias.size());
        } else {
            stats.put("porcentajeCerradas", 0.0);
            stats.put("porcentajeAbiertas", 0.0);
            stats.put("porcentajeEnProgreso", 0.0);
        }
        
        // Estadísticas de usuarios
        stats.put("totalUsuarios", usuarios.size());
        stats.put("usuariosActivos", 
                 usuarios.stream().filter(Usuario::isEstado).count());
        stats.put("administradores", 
                 usuarios.stream().filter(u -> "Administrador".equals(u.getRol())).count());
        stats.put("tecnicos", 
                 usuarios.stream().filter(u -> "Técnico".equals(u.getRol())).count());
        stats.put("usuariosRegulares", 
                 usuarios.stream().filter(u -> "Usuario".equals(u.getRol())).count());
        
        // Incidencias por usuario (Top 5)
        Map<Integer, Long> incidenciasPorUsuario = incidencias.stream()
            .collect(Collectors.groupingBy(Incidencia::getIdUsuarioReporta, Collectors.counting()));
        stats.put("incidenciasPorUsuario", incidenciasPorUsuario);
        
        return stats;
    }
}
