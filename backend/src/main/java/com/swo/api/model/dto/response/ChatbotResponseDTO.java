package com.swo.api.model.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * DTO de respuesta para el chatbot.
 * Contiene información de la conversación y mensajes del bot.
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChatbotResponseDTO {

    private Long idConversacion;
    private String sesionId;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private String estadoConversacion;
    private String ipUsuario;
    
    // Información del usuario que envió el mensaje
    private String nombreUsuario;
    
    // Mensajes (para enviarMensaje endpoint)
    private String mensajeUsuario;
    private String respuestaBot;
    private LocalDateTime fechaMensaje;
}
