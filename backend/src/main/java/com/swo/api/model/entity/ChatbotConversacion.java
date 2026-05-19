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

    @Column(name = "sesion_id", length = 100)
    private String sesionId; // Para agrupar conversaciones de una misma sesión

    @Column(name = "fecha_inicio")
    private LocalDateTime fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDateTime fechaFin;

    @Column(name = "estado_conversacion", length = 50)
    private String estadoConversacion;

    @Column(name = "ip_usuario", length = 50)
    private String ipUsuario;
}
