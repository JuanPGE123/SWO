package com.swo.api.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Entidad JPA que mapea la tabla {@code asignaciones_proyecto} del esquema {@code swo_db}.
 * <p>
 * Representa la relación Many-to-Many entre Usuarios y Proyectos.
 * Permite asignar múltiples usuarios a un proyecto con roles específicos.
 */
@Entity
@Table(name = "asignaciones_proyecto",
       uniqueConstraints = @UniqueConstraint(columnNames = {"id_proyecto", "id_usuario"}))
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
public class AsignacionProyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_asignacion")
    private Long idAsignacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_proyecto", nullable = false)
    private Proyecto proyecto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "rol_asignado", length = 50)
    private String rolAsignado = "Miembro";

    @CreatedDate
    @Column(name = "fecha_asignacion", updatable = false)
    private LocalDateTime fechaAsignacion;
}
