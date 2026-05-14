package com.swo.api.exception;

import com.swo.api.common.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.stream.Collectors;

/**
 * Manejador global de excepciones para la API SWO.
 * <p>
 * Centraliza todos los errores en el formato {@link ApiResponse} estándar,
 * garantizando respuestas JSON consistentes para el frontend Angular.
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // ── 400 – Validación de Bean Validation (@Valid) ──────────────────────────

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationErrors(
            MethodArgumentNotValidException ex, HttpServletRequest request) {

        String errores = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining("; "));

        log.warn("[400] Validación fallida en {}: {}", request.getRequestURI(), errores);
        return ResponseEntity.badRequest()
                .body(ApiResponse.badRequest("Error de validación: " + errores));
    }

    // ── 400 – Tipo de argumento incorrecto (ej. String en lugar de Long) ──────

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse<Object>> handleTypeMismatch(
            MethodArgumentTypeMismatchException ex, HttpServletRequest request) {

        String mensaje = "El parámetro '" + ex.getName() + "' debe ser de tipo "
                + (ex.getRequiredType() != null ? ex.getRequiredType().getSimpleName() : "desconocido");
        log.warn("[400] Tipo incorrecto en {}: {}", request.getRequestURI(), mensaje);
        return ResponseEntity.badRequest().body(ApiResponse.badRequest(mensaje));
    }

    // ── 404 – Recurso no encontrado ───────────────────────────────────────────

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleNotFound(
            ResourceNotFoundException ex, HttpServletRequest request) {

        log.warn("[404] No encontrado en {}: {}", request.getRequestURI(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.notFound(ex.getMessage()));
    }

    // ── 409 – Conflicto de regla de negocio ───────────────────────────────────

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Object>> handleBusinessException(
            BusinessException ex, HttpServletRequest request) {

        log.warn("[409] Conflicto en {}: {}", request.getRequestURI(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiResponse.conflict(ex.getMessage()));
    }

    // ── 400 – IllegalArgumentException ────────────────────────────────────────

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Object>> handleIllegalArgument(
            IllegalArgumentException ex, HttpServletRequest request) {

        log.warn("[400] Argumento ilegal en {}: {}", request.getRequestURI(), ex.getMessage());
        return ResponseEntity.badRequest()
                .body(ApiResponse.badRequest("Argumento inválido: " + ex.getMessage()));
    }

    // ── 500 – NullPointerException ────────────────────────────────────────────

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ApiResponse<Object>> handleNullPointer(
            NullPointerException ex, HttpServletRequest request) {

        log.error("[500] NullPointerException en {}: {}", request.getRequestURI(), ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error(500,
                        "Error de referencia nula. Contacte al administrador."));
    }

    // ── 500 – Error interno no controlado ─────────────────────────────────────

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGenericException(
            Exception ex, HttpServletRequest request) {

        log.error("[500] Error interno en {}: {}", request.getRequestURI(), ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error(500,
                        "Error interno del servidor. Contacte al administrador del sistema."));
    }
}
