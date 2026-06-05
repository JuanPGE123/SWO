package com.swo.api.model.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProyectoResponseDTO {

    private Long idProyecto;
    private String nombreProyecto;
    private String descripcion;
    private String estado;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;

    private Long idJefe;
    private String nombreJefe;

    private List<UsuarioResumenDTO> usuariosAsignados;

    @Data
    public static class UsuarioResumenDTO {
        private Long idUsuario;
        private String nombreCompleto;
        private String correo;
        private String rol;
    }
}
