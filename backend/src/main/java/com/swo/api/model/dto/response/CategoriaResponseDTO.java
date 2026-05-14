package com.swo.api.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/** DTO de salida para {@link com.swo.api.model.entity.Categoria}. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Representación de una categoría de incidencias")
public class CategoriaResponseDTO {

    @Schema(description = "Identificador único de la categoría", example = "3")
    private Long idCategoria;

    @Schema(description = "Nombre de la categoría", example = "Hardware")
    private String nombreCategoria;

    @Schema(description = "Descripción de la categoría")
    private String descripcion;

    @Schema(description = "Color hexadecimal de representación", example = "#F44336")
    private String color;

    @Schema(description = "Nombre del ícono asociado", example = "fas fa-server")
    private String icono;

    @Schema(description = "Estado activo/inactivo", example = "true")
    private Boolean estado;

    @Schema(description = "Fecha de creación de la categoría")
    private LocalDateTime fechaCreacion;
}
