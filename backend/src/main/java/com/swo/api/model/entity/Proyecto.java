package com.swo.api.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Entidad JPA que mapea la tabla {@code proyectos} del esquema {@code swo_db}.
 * <p>
 * Gestiona proyectos del sistema con asignación de usuarios mediante relación ManyToMany.
 */
@Entity
@Table(name = "proyectos")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
public class Proyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proyecto")
    private Long idProyecto;

    @Column(name = "nombre_proyecto", nullable = false, length = 150)
    private String nombreProyecto;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    @Column(name = "estado", nullable = false, length = 20)
    private String estado = "Activo"; // Activo, En Pausa, Completado, Cancelado

    @Column(name = "presupuesto", precision = 15, scale = 2)
    private BigDecimal presupuesto;

    @Column(name = "prioridad", length = 15)
    private String prioridad; // Baja, Media, Alta, Crítica

    @CreatedDate
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @LastModifiedDate
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    /**
     * Relación ManyToMany con Usuario.
     * Un proyecto puede tener múltiples usuarios asignados.
     * Un usuario puede estar asignado a múltiples proyectos.
     */
    @ManyToMany
    @JoinTable(
        name = "proyecto_usuario",
        joinColumns = @JoinColumn(name = "id_proyecto"),
        inverseJoinColumns = @JoinColumn(name = "id_usuario")
    )
    private Set<Usuario> usuariosAsignados = new HashSet<>();
}
