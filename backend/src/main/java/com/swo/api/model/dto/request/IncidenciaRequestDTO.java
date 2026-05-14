package com.swo.api.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

/**
 * DTO de entrada para crear o actualizar una {@link com.swo.api.model.entity.Incidencia}.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(description = "Cuerpo de petición para crear o actualizar una incidencia")
public class IncidenciaRequestDTO {

    @NotBlank(message = "El título es obligatorio")
    @Size(min = 5, max = 200, message = "El título debe tener entre 5 y 200 caracteres")
    @Schema(description = "Título descriptivo de la incidencia", example = "Falla en el sistema de autenticación")
    private String titulo;

    @NotBlank(message = "La descripción es obligatoria")
    @Size(min = 10, message = "La descripción debe tener mínimo 10 caracteres")
    @Schema(description = "Descripción detallada de la incidencia",
            example = "Los usuarios no pueden iniciar sesión desde las 08:00 am.")
    private String descripcion;

    @Pattern(regexp = "Abierto|En Progreso|Pendiente|Resuelto|Cerrado|Cancelado",
             message = "Estado inválido")
    @Schema(description = "Estado de la incidencia", example = "Abierto",
            allowableValues = {"Abierto", "En Progreso", "Pendiente", "Resuelto", "Cerrado", "Cancelado"})
    private String estado = "Abierto";

    @Pattern(regexp = "Bajo|Medio|Alto|Crítico",
             message = "Impacto inválido. Valores: Bajo, Medio, Alto, Crítico")
    @Schema(description = "Nivel de impacto de la incidencia", example = "Alto",
            allowableValues = {"Bajo", "Medio", "Alto", "Crítico"})
    private String impacto = "Medio";

    @Size(max = 100, message = "La ubicación no puede superar 100 caracteres")
    @Schema(description = "Ubicación física o lógica donde ocurrió la incidencia", example = "Piso 3 - Sala Servidores")
    private String ubicacion;

    @NotNull(message = "El ID del usuario que reporta es obligatorio")
    @Positive(message = "El ID de usuario debe ser un número positivo")
    @Schema(description = "ID del usuario que reporta la incidencia", example = "5")
    private Long idUsuarioReporta;

    @Positive(message = "El ID de categoría debe ser un número positivo")
    @Schema(description = "ID de la categoría asociada (opcional)", example = "2")
    private Long idCategoria;
}
