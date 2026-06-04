package com.swo.api.controller;

import com.swo.api.common.ApiResponse;
import com.swo.api.model.dto.request.ChatbotRequestDTO;
import com.swo.api.model.dto.response.ChatbotResponseDTO;
import com.swo.api.service.ChatbotService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controlador REST para el Chatbot del sistema.
 * Gestiona la interacción con usuarios y mantiene historial de conversaciones.
 */
@Slf4j
@RestController
@RequestMapping("/v1/chatbot")
@RequiredArgsConstructor
@Tag(name = "Chatbot", description = "Interacción con el asistente virtual del sistema")
public class ChatbotController {

    private final ChatbotService chatbotService;

    /**
     * GET /v1/chatbot?q= — Endpoint ligero que el frontend usa para ping y consultas rápidas.
     * No requiere sesión ni usuario autenticado.
     */
    @GetMapping
    @Operation(summary = "Consulta rápida al chatbot (sin sesión)")
    public ApiResponse<Map<String, Object>> consultarRapido(
            @RequestParam(required = false, defaultValue = "") String q) {
        log.debug("[GET /v1/chatbot] Consulta rápida: {}", q);
        String respuesta = q.isBlank()
                ? "Sistema SWO ChatBot disponible. Inicia sesión para una experiencia completa."
                : "Consulta recibida. Para asistencia personalizada utiliza el chat con sesión iniciada.";
        return ApiResponse.ok(Map.of(
                "respuesta",  respuesta,
                "exito",      true,
                "tipo",       "rapida"
        ));
    }

    @PostMapping("/enviar")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Enviar mensaje al chatbot", 
               description = "Envía un mensaje del usuario al chatbot y recibe una respuesta. " +
                           "La conversación se almacena en el historial vinculado al usuario.")
    public ApiResponse<ChatbotResponseDTO> enviarMensaje(@Valid @RequestBody ChatbotRequestDTO dto) {
        log.info("[POST /v1/chatbot/enviar] Usuario {} enviando mensaje. Sesión: {}", 
                 dto.getIdUsuario(), dto.getSessionId());
        ChatbotResponseDTO respuesta = chatbotService.enviarMensaje(dto);
        log.info("[POST /v1/chatbot/enviar] Mensaje procesado exitosamente. ConversacionID: {}", 
                 respuesta.getIdConversacion());
        return ApiResponse.created(respuesta);
    }

    @GetMapping("/historial/{idUsuario}")
    @Operation(summary = "Obtener historial de conversaciones", 
               description = "Retorna todo el historial de conversaciones de un usuario con el chatbot, " +
                           "ordenado por fecha descendente (más reciente primero)")
    public ApiResponse<List<ChatbotResponseDTO>> obtenerHistorial(
            @Parameter(description = "ID del usuario") @PathVariable Long idUsuario) {
        List<ChatbotResponseDTO> historial = chatbotService.obtenerHistorialUsuario(idUsuario);
        return ApiResponse.ok(historial);
    }

    @GetMapping("/sesion/{sessionId}")
    @Operation(summary = "Obtener conversaciones por sesión", 
               description = "Retorna todas las conversaciones de una sesión específica, " +
                           "útil para mantener el contexto de una conversación en curso")
    public ApiResponse<List<ChatbotResponseDTO>> obtenerPorSession(
            @Parameter(description = "ID de la sesión") @PathVariable String sessionId) {
        List<ChatbotResponseDTO> conversaciones = chatbotService.obtenerPorSession(sessionId);
        return ApiResponse.ok(conversaciones);
    }

    @PatchMapping("/{idConversacion}/resolver")
    @Operation(summary = "Marcar conversación como resuelta", 
               description = "Marca una conversación específica como resuelta. " +
                           "Útil para tracking de soporte y estadísticas.")
    public ApiResponse<ChatbotResponseDTO> marcarComoResuelta(
            @Parameter(description = "ID de la conversación") @PathVariable Long idConversacion) {
        ChatbotResponseDTO conversacion = chatbotService.marcarComoResuelta(idConversacion);
        return ApiResponse.ok("Conversación marcada como resuelta", conversacion);
    }
}
