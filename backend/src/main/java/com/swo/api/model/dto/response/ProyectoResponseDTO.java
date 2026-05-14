package com.swo.api.model.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO de respuesta para Proyecto.
 * Incluye información resumida de usuarios asignados.
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProyectoResponseDTO {

    private Long idProyecto;
    private String nombreProyecto;
    private String descripcion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String estado;
    private BigDecimal presupuesto;
    private String prioridad;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    
    // Lista de usuarios asignados (solo información básica)
    private List<UsuarioResumenDTO> usuariosAsignados;

    /**
     * DTO interno para representar información resumida de un usuario.
     */
    @Data
    public static class UsuarioResumenDTO {
        private Long idUsuario;
        private String nombreCompleto;
        private String correo;
        private String rol;
    }
}
