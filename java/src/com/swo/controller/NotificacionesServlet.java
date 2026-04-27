package com.swo.controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Servlet para gestión de notificaciones en tiempo real
 * 
 * Endpoints:
 * - GET /api/notificaciones?idUsuario=X&desde=timestamp -> Obtener notificaciones nuevas
 * - PUT /api/notificaciones/{id}/leer -> Marcar notificación como leída
 * 
 * NOTA: Este es un ejemplo simplificado. En producción se usaría una tabla
 * de notificaciones en la BD y lógica más compleja para generar notificaciones
 * basadas en eventos (nueva incidencia, cambio de estado, etc.)
 */
@WebServlet("/api/notificaciones/*")
public class NotificacionesServlet extends HttpServlet {

    /**
     * GET: Obtener notificaciones para un usuario
     * Parámetros:
     * - idUsuario: ID del usuario
     * - desde: Timestamp desde cuando buscar (opcional)
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        
        setCorsHeaders(res);
        res.setContentType("application/json;charset=UTF-8");
        
        PrintWriter out = res.getWriter();
        
        try {
            String idUsuarioStr = req.getParameter("idUsuario");
            
            if (idUsuarioStr == null || idUsuarioStr.isEmpty()) {
                res.setStatus(400);
                out.print("{\"error\":\"idUsuario requerido\"}");
                return;
            }
            
            // Por ahora retornamos un array vacío
            // En producción, aquí consultarías la BD para obtener notificaciones
            // basadas en eventos: nueva incidencia asignada, comentario en tu incidencia, etc.
            out.print("[]");
            
        } catch (Exception e) {
            res.setStatus(500);
            out.print("{\"error\":\"" + e.getMessage() + "\"}");
            e.printStackTrace();
        } finally {
            out.flush();
        }
    }

    /**
     * PUT: Marcar notificación como leída
     */
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        
        setCorsHeaders(res);
        res.setContentType("application/json;charset=UTF-8");
        
        PrintWriter out = res.getWriter();
        
        try {
            String pathInfo = req.getPathInfo(); // /{id}/leer
            
            if (pathInfo == null || !pathInfo.matches("/\\d+/leer")) {
                res.setStatus(400);
                out.print("{\"error\":\"Ruta invalida\"}");
                return;
            }
            
            String[] parts = pathInfo.split("/");
            int idNotificacion = Integer.parseInt(parts[1]);
            
            // Aquí actualizarías la BD para marcar como leída
            // Por ahora solo retornamos éxito
            out.print("{\"success\":true}");
            
        } catch (Exception e) {
            res.setStatus(500);
            out.print("{\"error\":\"" + e.getMessage() + "\"}");
            e.printStackTrace();
        } finally {
            out.flush();
        }
    }

    /**
     * OPTIONS: Para CORS preflight
     */
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse res) {
        setCorsHeaders(res);
        res.setStatus(200);
    }

    /**
     * Configura headers CORS
     */
    private void setCorsHeaders(HttpServletResponse res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
}
