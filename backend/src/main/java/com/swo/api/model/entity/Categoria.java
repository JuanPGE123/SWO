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
 * Entidad JPA que mapea la tabla {@code categorias} del esquema {@code swo_db}.
 * <p>
 * Las categorías clasifican las incidencias por tipo de servicio o área.
 */
@Entity
@Table(name = "categorias")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Long idCategoria;

    @Column(name = "nombre_categoria", nullable = false, unique = true, length = 100)
    private String nombreCategoria;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "color", length = 7)
    private String color = "#4CAF50";

    @Column(name = "icono", length = 50)
    private String icono;

    @Column(name = "estado")
    private Boolean estado = Boolean.TRUE;

    @CreatedDate
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;
}
