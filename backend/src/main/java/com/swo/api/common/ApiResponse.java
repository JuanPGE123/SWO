package com.swo.api.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * Sobre (envelope) estándar para todas las respuestas de la API.
 * <pre>
 * {
 *   "success": true,
 *   "code":    200,
 *   "message": "Operación exitosa",
 *   "data":    { ... },
 *   "timestamp": "2024-06-01T10:30:00"
 * }
 * </pre>
 *
 * @param <T> Tipo del payload de datos
 */
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "Sobre estándar de respuesta de la API SWO")
public class ApiResponse<T> {

    @Schema(description = "Indica si la operación fue exitosa", example = "true")
    private final boolean success;

    @Schema(description = "Código HTTP semántico de la operación", example = "200")
    private final int code;

    @Schema(description = "Mensaje descriptivo del resultado", example = "Usuario creado exitosamente")
    private final String message;

    @Schema(description = "Payload de datos retornado (puede ser objeto, lista o null)")
    private final T data;

    @Schema(description = "Marca temporal de la respuesta en formato ISO-8601")
    private final LocalDateTime timestamp;

    // ── Constructor privado: usar los factories ──────────────────────────────

    private ApiResponse(boolean success, int code, String message, T data) {
        this.success   = success;
        this.code      = code;
        this.message   = message;
        this.data      = data;
        this.timestamp = LocalDateTime.now();
    }

    // ── Factories de éxito ───────────────────────────────────────────────────

    /** 200 OK con datos */
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, 200, "Operación exitosa", data);
    }

    /** 200 OK con mensaje personalizado */
    public static <T> ApiResponse<T> ok(String message, T data) {
        return new ApiResponse<>(true, 200, message, data);
    }

    /** 201 Created */
    public static <T> ApiResponse<T> created(T data) {
        return new ApiResponse<>(true, 201, "Recurso creado exitosamente", data);
    }

    /** 204 No Content (para deletes exitosos) */
    public static <Void> ApiResponse<Void> noContent() {
        return new ApiResponse<>(true, 204, "Recurso eliminado exitosamente", null);
    }

    // ── Factories de error ───────────────────────────────────────────────────

    /** Error genérico con código explícito */
    public static <T> ApiResponse<T> error(int code, String message) {
        return new ApiResponse<>(false, code, message, null);
    }

    /** 400 Bad Request */
    public static <T> ApiResponse<T> badRequest(String message) {
        return new ApiResponse<>(false, 400, message, null);
    }

    /** 404 Not Found */
    public static <T> ApiResponse<T> notFound(String message) {
        return new ApiResponse<>(false, 404, message, null);
    }

    /** 409 Conflict */
    public static <T> ApiResponse<T> conflict(String message) {
        return new ApiResponse<>(false, 409, message, null);
    }
}
