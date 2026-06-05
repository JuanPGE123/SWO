package com.swo.api.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Schema(description = "Cuerpo de petición para crear o actualizar un usuario")
public class UsuarioRequestDTO {

    @NotBlank(message = "El nombre completo es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+$", message = "El nombre solo puede contener letras y espacios")
    @Schema(description = "Nombre completo del usuario", example = "Carlos Andrés Pérez")
    private String nombreCompleto;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo no tiene un formato válido")
    @Size(max = 100, message = "El correo no puede superar 100 caracteres")
    @Schema(description = "Correo electrónico único del usuario", example = "carlos.perez@swo.com")
    private String correo;

    @Size(min = 8, message = "La contraseña debe tener mínimo 8 caracteres")
    @Schema(description = "Contraseña en texto plano (se almacena hasheada)", example = "Segura@2024")
    private String password;

    @NotBlank(message = "El rol es obligatorio")
    @Pattern(
        regexp = "Soporte|Jefe|Usuario|Administrador|Técnico|Analista|Desarrollador|Mesa de Servicio|Consultor|Auditor|Coordinador|Gerente|QA",
        message = "Rol inválido. Valores permitidos: Soporte, Jefe, Usuario, Administrador, Técnico, Analista, Desarrollador, Mesa de Servicio, Consultor, Auditor, Coordinador, Gerente, QA"
    )
    @Schema(description = "Rol del usuario en el sistema", example = "Analista",
            allowableValues = {"Soporte","Jefe","Usuario","Administrador","Técnico","Analista","Desarrollador","Mesa de Servicio","Consultor","Auditor","Coordinador","Gerente","QA"})
    private String rol;

    @Pattern(regexp = "^[+]?[0-9]{7,15}$", message = "El teléfono debe contener entre 7 y 15 dígitos numéricos")
    @Schema(description = "Número de teléfono del usuario", example = "+573001234567")
    private String telefono;

    @Size(max = 50, message = "El departamento no puede superar 50 caracteres")
    @Schema(description = "Área o departamento del usuario", example = "Soporte TI")
    private String departamento;

    @Schema(description = "ID del jefe directo del usuario (opcional)", example = "5")
    private Long idJefe;
}
