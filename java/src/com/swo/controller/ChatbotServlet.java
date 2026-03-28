package com.swo.controller;

import com.swo.dao.IncidenciaDAO;
import com.swo.model.Incidencia;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * Servlet para manejar el chatbot de asistencia
 * Mapeo: /ChatbotServlet
 */
@WebServlet("/ChatbotServlet")
public class ChatbotServlet extends HttpServlet {
    
    private IncidenciaDAO incidenciaDAO;
    
    @Override
    public void init() throws ServletException {
        super.init();
        incidenciaDAO = new IncidenciaDAO();
    }
    
    /**
     * Método doGet: Mostrar interfaz del chatbot
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        
        request.getRequestDispatcher("jsp/chatbot.jsp").forward(request, response);
    }
    
    /**
     * Método doPost: Procesar mensaje del chatbot
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        
        String mensaje = request.getParameter("mensaje");
        String respuesta = procesarMensaje(mensaje);
        
        PrintWriter out = response.getWriter();
        out.print("{\"respuesta\": \"" + escaparJSON(respuesta) + "\"}");
        out.flush();
    }
    
    /**
     * Procesa el mensaje del usuario y genera una respuesta
     */
    private String procesarMensaje(String mensaje) {
        if (mensaje == null || mensaje.trim().isEmpty()) {
            return "Por favor, escribe un mensaje.";
        }
        
        mensaje = mensaje.toLowerCase().trim();
        
        // Saludos
        if (mensaje.matches(".*\\b(hola|buenos días|buenas tardes|buenas noches|hey|hi)\\b.*")) {
            return "¡Hola! 👋 Soy el asistente virtual de SWO. ¿En qué puedo ayudarte hoy?";
        }
        
        // Ayuda
        if (mensaje.matches(".*\\b(ayuda|help|qué puedes hacer|comandos)\\b.*")) {
            return "Puedo ayudarte con:\n" +
                   "• 📋 Ver estadísticas de incidencias\n" +
                   "• ❓ Responder preguntas sobre el sistema\n" +
                   "• 🔍 Buscar información sobre incidencias\n" +
                   "• 📝 Guiarte para crear una nueva incidencia\n\n" +
                   "Pregúntame: '¿Cuántas incidencias hay?' o 'Crear incidencia'";
        }
        
        // Estadísticas de incidencias
        if (mensaje.matches(".*\\b(cuántas incidencias|total incidencias|estadísticas|números)\\b.*")) {
            List<Incidencia> incidencias = incidenciaDAO.obtenerIncidencias();
            long abiertas = incidencias.stream().filter(i -> "Abierto".equals(i.getEstado())).count();
            long enProgreso = incidencias.stream().filter(i -> "En Progreso".equals(i.getEstado())).count();
            long cerradas = incidencias.stream().filter(i -> "Cerrado".equals(i.getEstado())).count();
            
            return String.format("📊 Estadísticas de incidencias:\n\n" +
                               "Total: %d incidencias\n" +
                               "✓ Cerradas: %d\n" +
                               "⚙ En progreso: %d\n" +
                               "⚠ Abiertas: %d\n\n" +
                               "¿Necesitas más información?",
                               incidencias.size(), cerradas, enProgreso, abiertas);
        }
        
        // Crear incidencia
        if (mensaje.matches(".*\\b(crear incidencia|nueva incidencia|reportar|registrar incidencia)\\b.*")) {
            return "Para crear una nueva incidencia:\n\n" +
                   "1. Ve a la sección 'Incidencias'\n" +
                   "2. Haz clic en '+ Nueva Incidencia'\n" +
                   "3. Completa el formulario con:\n" +
                   "   • Título descriptivo\n" +
                   "   • Descripción detallada\n" +
                   "   • Estado inicial\n\n" +
                   "O haz clic aquí: registroIncidencia.html";
        }
        
        // Ver reportes
        if (mensaje.matches(".*\\b(reportes|informes|gráficos|dashboard)\\b.*")) {
            return "📊 Para ver reportes detallados, visita la sección de Reportes donde encontrarás:\n\n" +
                   "• Gráficos de estadísticas\n" +
                   "• Métricas del sistema\n" +
                   "• Análisis de rendimiento\n\n" +
                   "Accede aquí: ReporteServlet";
        }
        
        // Usuarios
        if (mensaje.matches(".*\\b(usuarios|usuarios registrados|quién|personas)\\b.*")) {
            return "👥 Para gestionar usuarios:\n\n" +
                   "• Ver lista de usuarios: UsuarioServlet\n" +
                   "• Registrar nuevo usuario: registroUsuario.html\n\n" +
                   "Los usuarios pueden tener roles: Administrador, Técnico o Usuario";
        }
        
        // Despedida
        if (mensaje.matches(".*\\b(adiós|chao|hasta luego|gracias|bye)\\b.*")) {
            return "¡Hasta pronto! 👋 Si necesitas ayuda, aquí estaré. ¡Que tengas un excelente día!";
        }
        
        // Respuesta por defecto
        return "Interesante pregunta. 🤔 Puedo ayudarte con:\n\n" +
               "• Estadísticas: '¿Cuántas incidencias hay?'\n" +
               "• Crear incidencia: 'Crear nueva incidencia'\n" +
               "• Ayuda: 'Comandos disponibles'\n\n" +
               "¿Qué te gustaría saber?";
    }
    
    /**
     * Escapa caracteres especiales para JSON
     */
    private String escaparJSON(String texto) {
        return texto.replace("\\", "\\\\")
                   .replace("\"", "\\\"")
                   .replace("\n", "\\n")
                   .replace("\r", "\\r")
                   .replace("\t", "\\t");
    }
}
