package com.swo.controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

/**
 * Servlet para integración con Ollama (IA local)
 * Maneja las consultas del chatbot usando modelos de lenguaje locales
 * 
 * Mapeo: /api/ollama
 * 
 * Requiere:
 * - Ollama instalado y ejecutándose en localhost:11434
 * - Modelo descargado (por defecto: llama2)
 */
@WebServlet("/api/ollama")
public class OllamaServlet extends HttpServlet {
    
    private static final String OLLAMA_URL = "http://localhost:11434/api/generate";
    private static final String DEFAULT_MODEL = "llama2";
    private static final int TIMEOUT = 30000; // 30 segundos
    
    /**
     * Maneja peticiones POST para generar respuestas con Ollama
     * 
     * Parámetros esperados:
     * - mensaje: Texto de la consulta del usuario
     * - modelo (opcional): Modelo a usar (por defecto: llama2)
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        
        // Configurar CORS y encoding
        setCorsHeaders(res);
        res.setContentType("application/json;charset=UTF-8");
        req.setCharacterEncoding("UTF-8");
        
        PrintWriter out = res.getWriter();
        
        try {
            // Obtener parámetros
            String mensaje = req.getParameter("mensaje");
            String modelo = req.getParameter("modelo");
            
            if (mensaje == null || mensaje.trim().isEmpty()) {
                res.setStatus(400);
                out.print("{\"error\":\"El mensaje no puede estar vacío\"}");
                return;
            }
            
            if (modelo == null || modelo.trim().isEmpty()) {
                modelo = DEFAULT_MODEL;
            }
            
            // Preparar el contexto del sistema
            String contextoPrevio = getContextoSistema();
            String promptCompleto = contextoPrevio + "\n\nUsuario: " + mensaje + "\n\nAsistente:";
            
            // Llamar a Ollama
            String respuesta = llamarOllama(promptCompleto, modelo);
            
            if (respuesta != null) {
                out.print("{\"success\":true,\"respuesta\":\"" + escapeJson(respuesta) + "\"}");
            } else {
                res.setStatus(500);
                out.print("{\"error\":\"No se pudo obtener respuesta de Ollama. Verifica que esté ejecutándose.\"}");
            }
            
        } catch (Exception e) {
            res.setStatus(500);
            out.print("{\"error\":\"Error interno: " + escapeJson(e.getMessage()) + "\"}");
            e.printStackTrace();
        } finally {
            out.flush();
        }
    }
    
    /**
     * Maneja peticiones OPTIONS para CORS preflight
     */
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse res) {
        setCorsHeaders(res);
        res.setStatus(200);
    }
    
    /**
     * Realiza una petición HTTP POST a la API de Ollama
     * 
     * @param prompt Texto del prompt a enviar
     * @param modelo Nombre del modelo a usar
     * @return Texto de la respuesta generada
     */
    private String llamarOllama(String prompt, String modelo) {
        HttpURLConnection conn = null;
        try {
            // Crear conexión
            URL url = new URL(OLLAMA_URL);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setConnectTimeout(TIMEOUT);
            conn.setReadTimeout(TIMEOUT);
            conn.setDoOutput(true);
            
            // Construir JSON del request
            String jsonRequest = String.format(
                "{\"model\":\"%s\",\"prompt\":\"%s\",\"stream\":false}",
                modelo,
                escapeJson(prompt)
            );
            
            // Enviar request
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonRequest.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }
            
            // Leer respuesta
            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                StringBuilder response = new StringBuilder();
                try (BufferedReader br = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                    String line;
                    while ((line = br.readLine()) != null) {
                        response.append(line);
                    }
                }
                
                // Parsear JSON de respuesta (extrae el campo "response")
                String jsonResponse = response.toString();
                return extraerRespuestaDeJson(jsonResponse);
                
            } else {
                System.err.println("Ollama respondió con código: " + responseCode);
                return null;
            }
            
        } catch (Exception e) {
            System.err.println("Error al comunicarse con Ollama: " + e.getMessage());
            e.printStackTrace();
            return null;
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
    }
    
    /**
     * Extrae el texto de respuesta del JSON devuelto por Ollama
     * 
     * @param json JSON completo de respuesta
     * @return Texto de la respuesta
     */
    private String extraerRespuestaDeJson(String json) {
        try {
            // Buscar el campo "response" en el JSON
            int inicio = json.indexOf("\"response\":\"");
            if (inicio == -1) return "Error al parsear respuesta";
            
            inicio += 12; // Longitud de "response":"
            int fin = json.indexOf("\"", inicio);
            
            if (fin == -1) return "Error al parsear respuesta";
            
            String respuesta = json.substring(inicio, fin);
            
            // Decodificar escapes de JSON
            respuesta = respuesta.replace("\\n", "\n")
                                .replace("\\t", "\t")
                                .replace("\\\"", "\"")
                                .replace("\\\\", "\\");
            
            return respuesta.trim();
            
        } catch (Exception e) {
            System.err.println("Error al extraer respuesta: " + e.getMessage());
            return "Error al procesar respuesta";
        }
    }
    
    /**
     * Devuelve el contexto del sistema para el chatbot
     * Define el rol y comportamiento del asistente
     */
    private String getContextoSistema() {
        return "Eres un asistente técnico experto del sistema SWO (Service Work Order), " +
               "un sistema de gestión de incidencias de TI. Tu función es ayudar a los usuarios " +
               "a resolver problemas técnicos comunes, guiarlos en el uso del sistema y " +
               "proporcionar información sobre procedimientos de soporte.\n\n" +
               
               "Áreas de conocimiento:\n" +
               "- Gestión de incidencias (crear, consultar, actualizar)\n" +
               "- Problemas de red y conectividad\n" +
               "- Problemas de correo electrónico\n" +
               "- Problemas con aplicaciones de negocio\n" +
               "- Problemas de hardware (impresoras, PC, periféricos)\n" +
               "- Seguridad informática básica\n" +
               "- Gestión de contraseñas\n\n" +
               
               "Instrucciones:\n" +
               "1. Responde de manera clara, concisa y profesional\n" +
               "2. Usa lenguaje técnico pero comprensible\n" +
               "3. Proporciona pasos numerados cuando sea apropiado\n" +
               "4. Si no sabes algo, sugiere contactar al equipo de soporte\n" +
               "5. Mantén un tono amigable y servicial\n" +
               "6. Responde en español\n" +
               "7. Limita tus respuestas a máximo 200 palabras";
    }
    
    /**
     * Escapa caracteres especiales para JSON
     */
    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
    
    /**
     * Configura headers CORS
     */
    private void setCorsHeaders(HttpServletResponse res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
}
