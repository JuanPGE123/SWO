package com.swo.api.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Schema(description = "DTO para cambiar la contraseña de un usuario")
public class CambiarPasswordDTO {

    @NotBlank(message = "La nueva contraseña es obligatoria")
    @Size(min = 8, message = "La contraseña debe tener mínimo 8 caracteres")
    @Schema(description = "Nueva contraseña en texto plano", example = "NuevaSegura@2024")
    private String nuevaPassword;
}
