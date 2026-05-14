package com.swo.api.model.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * DTO de respuesta para el chatbot.
 * Contiene la respuesta del bot y metadatos del mensaje.
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChatbotResponseDTO {

    private Long idConversacion;
    private String mensajeUsuario;
    private String respuestaBot;
    private String sessionId;
    private LocalDateTime fechaMensaje;
    private String tipoConsulta;
    private Boolean resuelto;
    
    // Información del usuario que envió el mensaje
    private String nombreUsuario;
}
