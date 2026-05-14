package com.swo.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Excepción lanzada cuando no se encuentra un recurso por su identificador.
 * Mapea automáticamente a {@code HTTP 404 Not Found}.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String resource, Long id) {
        super(resource + " no encontrado con ID: " + id);
    }
}
