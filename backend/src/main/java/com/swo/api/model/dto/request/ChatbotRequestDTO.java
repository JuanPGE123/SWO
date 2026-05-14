package com.swo.api.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * DTO para recibir mensajes del usuario hacia el chatbot.
 */
@Data
public class ChatbotRequestDTO {

    @NotNull(message = "El ID del usuario es obligatorio")
    @Positive(message = "El ID del usuario debe ser un número positivo")
    private Long idUsuario;

    @NotBlank(message = "El mensaje no puede estar vacío")
    @Size(min = 1, max = 2000, message = "El mensaje debe tener entre 1 y 2000 caracteres")
    private String mensaje;

    @Size(max = 100, message = "El sessionId no puede exceder 100 caracteres")
    private String sessionId; // Opcional: para mantener contexto de conversación

    @Size(max = 50, message = "El tipo de consulta no puede exceder 50 caracteres")
    private String tipoConsulta; // ej: "incidencia", "soporte", "información"
}
