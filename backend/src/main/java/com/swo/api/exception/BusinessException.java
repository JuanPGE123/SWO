package com.swo.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Excepción lanzada por violaciones de reglas de negocio.
 * Mapea a {@code HTTP 409 Conflict} (ej. correo duplicado, nombre de categoría existente).
 */
@ResponseStatus(HttpStatus.CONFLICT)
public class BusinessException extends RuntimeException {

    public BusinessException(String message) {
        super(message);
    }
}
