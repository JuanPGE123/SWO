package com.swo.api.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Entidad JPA que mapea la tabla {@code chatbot_conversaciones} del esquema {@code swo_db}.
 * <p>
 * Almacena el historial de conversaciones entre usuarios y el chatbot del sistema.
 */
@Entity
@Table(name = "chatbot_conversaciones")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
public class ChatbotConversacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_conversacion")
    private Long idConversacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "mensaje_usuario", nullable = false, columnDefinition = "TEXT")
    private String mensajeUsuario;

    @Column(name = "respuesta_bot", nullable = false, columnDefinition = "TEXT")
    private String respuestaBot;

    @Column(name = "session_id", length = 100)
    private String sessionId; // Para agrupar conversaciones de una misma sesión

    @CreatedDate
    @Column(name = "fecha_mensaje", updatable = false)
    private LocalDateTime fechaMensaje;

    @Column(name = "tipo_consulta", length = 50)
    private String tipoConsulta; // ej: "incidencia", "soporte", "información", "otro"

    @Column(name = "resuelto", nullable = false)
    private Boolean resuelto = Boolean.FALSE;
}
