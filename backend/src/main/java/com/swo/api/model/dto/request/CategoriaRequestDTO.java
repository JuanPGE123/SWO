package com.swo.api.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

/**
 * DTO de entrada para crear o actualizar una {@link com.swo.api.model.entity.Categoria}.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(description = "Cuerpo de petición para crear o actualizar una categoría de incidencias")
public class CategoriaRequestDTO {

    @NotBlank(message = "El nombre de la categoría es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    @Schema(description = "Nombre único de la categoría", example = "Hardware")
    private String nombreCategoria;

    @Size(max = 500, message = "La descripción no puede superar 500 caracteres")
    @Schema(description = "Descripción de la categoría", example = "Incidencias relacionadas con equipos físicos")
    private String descripcion;

    @Pattern(regexp = "^#([A-Fa-f0-9]{6})$",
             message = "El color debe ser un código hexadecimal válido (ej. #4CAF50)")
    @Schema(description = "Color HEX para representar la categoría en la UI", example = "#F44336")
    private String color;

    @Size(max = 50, message = "El nombre del ícono no puede superar 50 caracteres")
    @Schema(description = "Nombre del ícono (clase CSS o clave de ícono)", example = "fas fa-server")
    private String icono;
}
