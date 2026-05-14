package com.swo.api.model.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO para recibir datos al crear o actualizar un Proyecto.
 * Incluye validaciones de Bean Validation.
 */
@Data
public class ProyectoRequestDTO {

    @NotBlank(message = "El nombre del proyecto es obligatorio")
    @Size(min = 3, max = 150, message = "El nombre debe tener entre 3 y 150 caracteres")
    private String nombreProyecto;

    @Size(max = 2000, message = "La descripción no puede exceder 2000 caracteres")
    private String descripcion;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    @Pattern(regexp = "Activo|En Pausa|Completado|Cancelado", 
             message = "Estado debe ser: Activo, En Pausa, Completado o Cancelado")
    private String estado;

    @DecimalMin(value = "0.0", message = "El presupuesto no puede ser negativo")
    private BigDecimal presupuesto;

    @Pattern(regexp = "Baja|Media|Alta|Crítica", 
             message = "Prioridad debe ser: Baja, Media, Alta o Crítica")
    private String prioridad;
}
