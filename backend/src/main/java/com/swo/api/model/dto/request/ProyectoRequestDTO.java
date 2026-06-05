package com.swo.api.model.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ProyectoRequestDTO {

    @NotBlank(message = "El nombre del proyecto es obligatorio")
    @Size(min = 3, max = 150, message = "El nombre debe tener entre 3 y 150 caracteres")
    private String nombreProyecto;

    @Size(max = 2000, message = "La descripción no puede exceder 2000 caracteres")
    private String descripcion;

    @Pattern(regexp = "Activo|En Pausa|Completado|Cancelado",
             message = "Estado debe ser: Activo, En Pausa, Completado o Cancelado")
    private String estado;

    private Long idJefe;
}
