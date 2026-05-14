package com.swo.api.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/** DTO de salida para {@link com.swo.api.model.entity.Incidencia}. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Representación de una incidencia registrada en el sistema")
public class IncidenciaResponseDTO {

    @Schema(description = "Identificador único de la incidencia", example = "42")
    private Long idIncidencia;

    @Schema(description = "Título de la incidencia", example = "Falla en el sistema de autenticación")
    private String titulo;

    @Schema(description = "Descripción detallada de la incidencia")
    private String descripcion;

    @Schema(description = "Estado actual", example = "En Progreso")
    private String estado;

    @Schema(description = "Nivel de impacto", example = "Alto")
    private String impacto;

    @Schema(description = "Ubicación donde ocurrió la incidencia", example = "Piso 3 - Sala Servidores")
    private String ubicacion;

    @Schema(description = "Fecha y hora de creación")
    private LocalDateTime fechaCreacion;

    @Schema(description = "Fecha y hora de última actualización")
    private LocalDateTime fechaActualizacion;

    @Schema(description = "Fecha y hora de cierre (si fue resuelta)")
    private LocalDateTime fechaCierre;

    @Schema(description = "ID del usuario que reportó la incidencia", example = "5")
    private Long idUsuarioReporta;

    @Schema(description = "Nombre del usuario que reportó la incidencia", example = "Ana García")
    private String nombreUsuarioReporta;

    @Schema(description = "ID de la categoría asociada", example = "2")
    private Long idCategoria;

    @Schema(description = "Nombre de la categoría asociada", example = "Hardware")
    private String nombreCategoria;
}
