package com.swo.api.service.impl;

import com.swo.api.exception.ResourceNotFoundException;
import com.swo.api.model.dto.request.ChatbotRequestDTO;
import com.swo.api.model.dto.response.ChatbotResponseDTO;
import com.swo.api.model.entity.ChatbotConversacion;
import com.swo.api.model.entity.ChatbotMensaje;
import com.swo.api.model.entity.Usuario;
import com.swo.api.repository.ChatbotConversacionRepository;
import com.swo.api.repository.ChatbotMensajeRepository;
import com.swo.api.repository.UsuarioRepository;
import com.swo.api.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Implementación del servicio de Chatbot.
 * Gestiona conversaciones y genera respuestas simuladas inteligentes.
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ChatbotServiceImpl implements ChatbotService {

    private final ChatbotConversacionRepository conversacionRepository;
    private final ChatbotMensajeRepository mensajeRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public ChatbotResponseDTO enviarMensaje(ChatbotRequestDTO dto) {
        log.info("[ChatbotService] Usuario {} enviando mensaje. SessionID: {}", 
                 dto.getIdUsuario(), dto.getSessionId());
        
        try {
            // Validar que el usuario exista
            Usuario usuario = usuarioRepository.findById(dto.getIdUsuario())
                .orElseThrow(() -> {
                    log.warn("[ChatbotService] Usuario no encontrado con ID: {}", dto.getIdUsuario());
                    return new ResourceNotFoundException("Usuario no encontrado con ID: " + dto.getIdUsuario());
                });

            // Buscar o crear la conversación
            String sessionId = dto.getSessionId() != null ? dto.getSessionId() : generarSessionId();
            log.debug("[ChatbotService] Buscando conversación activa para sesión: {}", sessionId);
            
            ChatbotConversacion conversacion = conversacionRepository
                .findBySesionIdOrderByFechaInicioAsc(sessionId).stream()
                .filter(c -> "Iniciada".equals(c.getEstadoConversacion()) || "Activa".equals(c.getEstadoConversacion()))
                .findFirst()
                .orElseGet(() -> {
                    log.info("[ChatbotService] Creando nueva conversación para sesión: {}", sessionId);
                    ChatbotConversacion nueva = new ChatbotConversacion();
                    nueva.setUsuario(usuario);
                    nueva.setSesionId(sessionId);
                    nueva.setFechaInicio(java.time.LocalDateTime.now());
                    nueva.setEstadoConversacion("Activa");
                    return conversacionRepository.save(nueva);
                });

            // Crear mensaje del usuario
            log.debug("[ChatbotService] Guardando mensaje del usuario en conversación ID: {}", 
                      conversacion.getIdConversacion());
            ChatbotMensaje mensajeUsuario = new ChatbotMensaje();
            mensajeUsuario.setConversacion(conversacion);
            mensajeUsuario.setTipoMensaje("Usuario");
            mensajeUsuario.setContenido(dto.getMensaje() != null ? dto.getMensaje() : "");
            mensajeUsuario.setMensajeUsuario(usuario.getNombreCompleto() != null ? 
                                             usuario.getNombreCompleto() : 
                                             "Usuario ID: " + usuario.getIdUsuario());
            mensajeRepository.save(mensajeUsuario);

            // Generar respuesta del bot
            String respuesta = generarRespuestaBot(dto.getMensaje(), dto.getTipoConsulta());
            log.debug("[ChatbotService] Respuesta del bot generada: {} caracteres", respuesta.length());

            // Crear mensaje del bot
            ChatbotMensaje mensajeBot = new ChatbotMensaje();
            mensajeBot.setConversacion(conversacion);
            mensajeBot.setTipoMensaje("Bot");
            mensajeBot.setContenido(respuesta);
            mensajeBot.setMensajeUsuario("SWO Chatbot Assistant"); // Identificador del bot
            ChatbotMensaje botGuardado = mensajeRepository.save(mensajeBot);

            // Construir respuesta
            ChatbotResponseDTO response = new ChatbotResponseDTO();
            response.setIdConversacion(conversacion.getIdConversacion());
            response.setSesionId(conversacion.getSesionId());
            response.setFechaInicio(conversacion.getFechaInicio());
            response.setEstadoConversacion(conversacion.getEstadoConversacion());
            response.setNombreUsuario(usuario.getNombreCompleto() != null ? 
                                     usuario.getNombreCompleto() : "Usuario sin nombre");
            response.setMensajeUsuario(dto.getMensaje());
            response.setRespuestaBot(respuesta);
            response.setFechaMensaje(botGuardado.getFechaMensaje());

            log.info("[ChatbotService] Mensaje procesado exitosamente. ConversaciónID: {}", 
                     conversacion.getIdConversacion());
            return response;
            
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            log.error("[ChatbotService] Error inesperado al procesar mensaje del usuario {}: {}", 
                      dto.getIdUsuario(), e.getMessage(), e);
            throw new RuntimeException("Error al procesar mensaje del chatbot: " + e.getMessage(), e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatbotResponseDTO> obtenerHistorialUsuario(Long idUsuario) {
        if (!usuarioRepository.existsById(idUsuario)) {
            throw new ResourceNotFoundException("Usuario no encontrado con ID: " + idUsuario);
        }

        return conversacionRepository.findByUsuario_IdUsuarioOrderByFechaInicioDesc(idUsuario).stream()
            .map(this::mapearEntidadADto)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatbotResponseDTO> obtenerPorSession(String sessionId) {
        return conversacionRepository.findBySesionIdOrderByFechaInicioAsc(sessionId).stream()
            .map(this::mapearEntidadADto)
            .collect(Collectors.toList());
    }

    @Override
    public ChatbotResponseDTO marcarComoResuelta(Long idConversacion) {
        ChatbotConversacion conversacion = conversacionRepository.findById(idConversacion)
            .orElseThrow(() -> new ResourceNotFoundException("Conversación no encontrada con ID: " + idConversacion));

        conversacion.setEstadoConversacion("Finalizada");
        conversacion.setFechaFin(java.time.LocalDateTime.now());
        ChatbotConversacion actualizada = conversacionRepository.save(conversacion);

        return mapearEntidadADto(actualizada);
    }

    /**
     * Genera una respuesta inteligente del bot basándose en el mensaje del usuario.
     * Esta es una implementación simplificada. En producción, integraría con un modelo de IA.
     */
    private String generarRespuestaBot(String mensaje, String tipoConsulta) {
        if (mensaje == null || mensaje.isBlank()) {
            return "No recibí ningún mensaje. Por favor escribe tu consulta y con gusto te ayudo.";
        }
        String mensajeLower = mensaje.toLowerCase();

        // Respuestas contextuales según palabras clave
        if (mensajeLower.contains("incidencia") || mensajeLower.contains("incidente") || mensajeLower.contains("problema")) {
            return "Entiendo que tienes un problema técnico. Para reportar una incidencia, ve a la sección de 'Incidencias' " +
                   "y haz clic en 'Crear Nueva Incidencia'. Asegúrate de proporcionar una descripción detallada del problema, " +
                   "el impacto que tiene y la ubicación. ¿Necesitas ayuda con algún paso específico?";
        }

        if (mensajeLower.contains("estado") || mensajeLower.contains("seguimiento")) {
            return "Para consultar el estado de tus incidencias, dirígete a 'Mis Incidencias' en el menú principal. " +
                   "Allí verás una lista con todas tus solicitudes y su estado actual (Abierto, En Progreso, Resuelto, etc.). " +
                   "También recibirás notificaciones cuando haya actualizaciones.";
        }

        if (mensajeLower.contains("contraseña") || mensajeLower.contains("password") || mensajeLower.contains("login")) {
            return "Si olvidaste tu contraseña, usa la opción '¿Olvidaste tu contraseña?' en la pantalla de inicio de sesión. " +
                   "Te enviaremos un enlace de recuperación a tu correo registrado. Si no recibes el correo, verifica tu " +
                   "carpeta de spam o contacta al administrador del sistema.";
        }

        if (mensajeLower.contains("proyecto")) {
            return "Los proyectos del sistema te permiten organizar y gestionar iniciativas con tu equipo. " +
                   "Puedes crear proyectos, asignar usuarios, establecer fechas y hacer seguimiento del progreso. " +
                   "¿Necesitas ayuda para crear un proyecto o asignar miembros?";
        }

        if (mensajeLower.contains("usuario") || mensajeLower.contains("cuenta")) {
            return "Para gestionar tu perfil, ve a 'Mi Perfil' en el menú superior derecho. " +
                   "Allí podrás actualizar tu información personal, cambiar tu contraseña y configurar tus preferencias. " +
                   "Si necesitas permisos adicionales, contacta con tu supervisor o el administrador del sistema.";
        }

        if (mensajeLower.contains("ayuda") || mensajeLower.contains("help") || mensajeLower.contains("soporte")) {
            return "Estoy aquí para ayudarte. Puedo asistirte con:\n" +
                   "- Reportar y consultar incidencias\n" +
                   "- Gestionar proyectos\n" +
                   "- Configurar tu perfil\n" +
                   "- Navegar por el sistema\n" +
                   "- Resolver problemas técnicos comunes\n\n" +
                   "¿Sobre qué tema específico necesitas ayuda?";
        }

        if (mensajeLower.contains("gracias") || mensajeLower.contains("thank")) {
            return "¡De nada! Estoy aquí para ayudarte siempre que lo necesites. " +
                   "Si tienes más preguntas, no dudes en consultarme. ¡Que tengas un excelente día! 😊";
        }

        if (mensajeLower.contains("hola") || mensajeLower.contains("buenos") || mensajeLower.contains("hi") || mensajeLower.contains("hello")) {
            return "¡Hola! 👋 Soy el asistente virtual de SWO. Estoy aquí para ayudarte con cualquier duda o problema " +
                   "que tengas con el sistema. ¿En qué puedo asistirte hoy?";
        }

        // Respuesta por defecto
        return "Gracias por tu mensaje. He registrado tu consulta. Un agente de soporte revisará tu solicitud " +
               "y te responderá pronto. Mientras tanto, puedes explorar nuestra sección de preguntas frecuentes " +
               "o describir tu problema con más detalle para que pueda ayudarte mejor.";
    }

    /**
     * Genera un ID de sesión único para agrupar conversaciones.
     */
    private String generarSessionId() {
        return "SESSION-" + UUID.randomUUID().toString();
    }

    /**
     * Mapea la entidad ChatbotConversacion a DTO de respuesta.
     */
    private ChatbotResponseDTO mapearEntidadADto(ChatbotConversacion conversacion) {
        if (conversacion == null) {
            log.warn("[ChatbotService] Intento de mapear conversación null");
            return null;
        }
        
        ChatbotResponseDTO dto = new ChatbotResponseDTO();
        dto.setIdConversacion(conversacion.getIdConversacion());
        dto.setSesionId(conversacion.getSesionId());
        dto.setFechaInicio(conversacion.getFechaInicio());
        dto.setFechaFin(conversacion.getFechaFin());
        dto.setEstadoConversacion(conversacion.getEstadoConversacion());
        dto.setIpUsuario(conversacion.getIpUsuario());
        
        // Validar null-safety para usuario
        if (conversacion.getUsuario() != null) {
            dto.setNombreUsuario(conversacion.getUsuario().getNombreCompleto() != null ? 
                                conversacion.getUsuario().getNombreCompleto() : 
                                "Usuario sin nombre");
        } else {
            log.warn("[ChatbotService] Conversación ID {} no tiene usuario asociado", 
                     conversacion.getIdConversacion());
            dto.setNombreUsuario("Usuario desconocido");
        }
        
        return dto;
    }
}
