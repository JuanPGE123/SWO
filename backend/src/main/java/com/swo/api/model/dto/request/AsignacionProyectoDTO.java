package com.swo.api.model.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

/**
 * DTO para asignar un usuario a un proyecto.
 */
@Data
public class AsignacionProyectoDTO {

    @NotNull(message = "El ID del proyecto es obligatorio")
    @Positive(message = "El ID del proyecto debe ser un número positivo")
    private Long idProyecto;

    @NotNull(message = "El ID del usuario es obligatorio")
    @Positive(message = "El ID del usuario debe ser un número positivo")
    private Long idUsuario;
}
