package com.swo.api.service;

import com.swo.api.model.dto.request.ChatbotRequestDTO;
import com.swo.api.model.dto.response.ChatbotResponseDTO;

import java.util.List;

/**
 * Interfaz de servicio para la gestión del Chatbot.
 */
public interface ChatbotService {

    /**
     * Procesa un mensaje del usuario y genera una respuesta del bot.
     * Almacena la conversación en la base de datos.
     */
    ChatbotResponseDTO enviarMensaje(ChatbotRequestDTO dto);

    /**
     * Obtiene el historial de conversaciones de un usuario.
     */
    List<ChatbotResponseDTO> obtenerHistorialUsuario(Long idUsuario);

    /**
     * Obtiene las conversaciones de una sesión específica.
     */
    List<ChatbotResponseDTO> obtenerPorSession(String sessionId);

    /**
     * Marca una conversación como resuelta.
     */
    ChatbotResponseDTO marcarComoResuelta(Long idConversacion);
}
