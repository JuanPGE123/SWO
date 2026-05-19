package com.swo.api.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entidad JPA que mapea la tabla {@code chatbot_mensajes} del esquema {@code swo_db}.
 * <p>
 * Representa mensajes individuales dentro de una conversación del chatbot.
 * Los mensajes pueden ser de tipo: Usuario, Bot, o Sistema.
 */
@Entity
@Table(name = "chatbot_mensajes")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
public class ChatbotMensaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mensaje")
    private Long idMensaje;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_conversacion", nullable = false)
    private ChatbotConversacion conversacion;

    @Column(name = "tipo_mensaje", nullable = false, length = 20)
    private String tipoMensaje; // Usuario, Bot, Sistema

    @Column(name = "contenido", nullable = false, columnDefinition = "TEXT")
    private String contenido;

    @Column(name = "mensaje_usuario", columnDefinition = "TEXT")
    private String mensajeUsuario; // Nombre o identificador del usuario que envió el mensaje

    @CreatedDate
    @Column(name = "fecha_mensaje", updatable = false)
    private LocalDateTime fechaMensaje;

    @Column(name = "intencion", length = 100)
    private String intencion;

    @Column(name = "confianza", precision = 3, scale = 2)
    private BigDecimal confianza;
}
