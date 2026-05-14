package com.swo.api.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO de salida para {@link com.swo.api.model.entity.Usuario}.
 * El campo {@code passwordHash} está EXCLUIDO por seguridad.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Representación pública de un usuario (sin datos sensibles)")
public class UsuarioResponseDTO {

    @Schema(description = "Identificador único del usuario", example = "1")
    private Long idUsuario;

    @Schema(description = "Nombre completo del usuario", example = "Carlos Andrés Pérez")
    private String nombreCompleto;

    @Schema(description = "Correo electrónico del usuario", example = "carlos.perez@swo.com")
    private String correo;

    @Schema(description = "Rol asignado al usuario", example = "Soporte")
    private String rol;

    @Schema(description = "Estado activo/inactivo del usuario", example = "true")
    private Boolean estado;

    @Schema(description = "Teléfono de contacto", example = "+573001234567")
    private String telefono;

    @Schema(description = "Departamento o área del usuario", example = "Soporte TI")
    private String departamento;

    @Schema(description = "URL de la foto de perfil")
    private String fotoPerfil;

    @Schema(description = "Fecha y hora de registro en el sistema")
    private LocalDateTime fechaRegistro;

    @Schema(description = "Última vez que el usuario inició sesión")
    private LocalDateTime ultimaConexion;
}
