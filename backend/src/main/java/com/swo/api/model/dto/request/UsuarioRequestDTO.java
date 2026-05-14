package com.swo.api.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

/**
 * DTO de entrada para crear o actualizar un {@link com.swo.api.model.entity.Usuario}.
 * La contraseña se recibe en texto plano y se hashea en la capa de servicio.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(description = "Cuerpo de petición para crear o actualizar un usuario")
public class UsuarioRequestDTO {

    @NotBlank(message = "El nombre completo es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    @Schema(description = "Nombre completo del usuario", example = "Carlos Andrés Pérez")
    private String nombreCompleto;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo no tiene un formato válido")
    @Schema(description = "Correo electrónico único del usuario", example = "carlos.perez@swo.com")
    private String correo;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, message = "La contraseña debe tener mínimo 8 caracteres")
    @Schema(description = "Contraseña en texto plano (se almacena hasheada)", example = "Segura@2024")
    private String password;

    @NotBlank(message = "El rol es obligatorio")
    @Pattern(regexp = "Soporte|Jefe|Usuario|Administrador|Técnico",
             message = "Rol inválido. Valores permitidos: Soporte, Jefe, Usuario, Administrador, Técnico")
    @Schema(description = "Rol del usuario en el sistema", example = "Soporte",
            allowableValues = {"Soporte", "Jefe", "Usuario", "Administrador", "Técnico"})
    private String rol;

    @Pattern(regexp = "^[+]?[0-9]{7,15}$", message = "El teléfono no tiene un formato válido")
    @Schema(description = "Número de teléfono del usuario", example = "+573001234567")
    private String telefono;

    @Size(max = 50, message = "El departamento no puede superar 50 caracteres")
    @Schema(description = "Área o departamento del usuario", example = "Soporte TI")
    private String departamento;
}
