package com.swo.api.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/** DTO de salida para {@link com.swo.api.model.entity.Incidencia}. */
@Getter
@Setter
@NoArgsConstructor
@Schema(description = "Representación de una incidencia registrada en el sistema")
public class IncidenciaResponseDTO {

    @Schema(description = "Identificador único de la incidencia", example = "42")
    private Long idIncidencia;

    @Schema(description = "Título de la incidencia")
    private String titulo;

    @Schema(description = "Descripción detallada de la incidencia")
    private String descripcion;

    @Schema(description = "Estado actual", example = "En Progreso")
    private String estado;

    @Schema(description = "Nivel de impacto", example = "Alto")
    private String impacto;

    @Schema(description = "Ubicación donde ocurrió la incidencia")
    private String ubicacion;

    @Schema(description = "Fecha y hora de creación")
    private LocalDateTime fechaCreacion;

    @Schema(description = "Fecha y hora de última actualización")
    private LocalDateTime fechaActualizacion;

    @Schema(description = "Fecha y hora de cierre")
    private LocalDateTime fechaCierre;

    @Schema(description = "ID del usuario que reportó la incidencia")
    private Long idUsuarioReporta;

    @Schema(description = "Nombre del usuario que reportó la incidencia")
    private String nombreUsuarioReporta;

    @Schema(description = "ID de la categoría asociada")
    private Long idCategoria;

    @Schema(description = "Nombre de la categoría asociada")
    private String nombreCategoria;

    @Schema(description = "ID del usuario asignado para resolver la incidencia")
    private Long idUsuarioAsignado;

    @Schema(description = "Texto de resolución al cerrar la incidencia")
    private String resolucion;
}
