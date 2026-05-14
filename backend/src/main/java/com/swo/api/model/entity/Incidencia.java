package com.swo.api.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Entidad JPA que mapea la tabla {@code incidencias} del esquema {@code swo_db}.
 * <p>
 * Estados válidos:   Abierto | En Progreso | Pendiente | Resuelto | Cerrado | Cancelado
 * Impactos válidos:  Bajo | Medio | Alto | Crítico
 */
@Entity
@Table(name = "incidencias")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
public class Incidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_incidencia")
    private Long idIncidencia;

    @Column(name = "titulo", nullable = false, length = 200)
    private String titulo;

    @Column(name = "descripcion", nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "estado", nullable = false, length = 20)
    private String estado = "Abierto";

    @Column(name = "ubicacion", length = 100)
    private String ubicacion;

    @Column(name = "impacto", length = 20)
    private String impacto = "Medio";

    @Column(name = "fecha_cierre")
    private LocalDateTime fechaCierre;

    @CreatedDate
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @LastModifiedDate
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    /** Usuario que reportó la incidencia (FK → usuarios.id_usuario). */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_usuario_reporta", nullable = false,
                foreignKey = @ForeignKey(name = "fk_usuario_reporta"))
    private Usuario usuarioReporta;

    /** Categoría de la incidencia (FK → categorias.id_categoria). */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categoria",
                foreignKey = @ForeignKey(name = "fk_categoria_incidencia"))
    private Categoria categoria;
}
