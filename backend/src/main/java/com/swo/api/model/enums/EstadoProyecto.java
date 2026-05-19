package com.swo.api.model.enums;

import lombok.Getter;

/**
 * Enumeración de los estados válidos para un proyecto.
 * <p>
 * Estos valores deben coincidir con el CHECK constraint {@code chk_estado_proy} 
 * de la tabla {@code proyectos} en la base de datos.
 */
@Getter
public enum EstadoProyecto {
    ACTIVO("Activo"),
    EN_PAUSA("En Pausa"),
    COMPLETADO("Completado"),
    CANCELADO("Cancelado");

    private final String valor;

    EstadoProyecto(String valor) {
        this.valor = valor;
    }

    /**
     * Valida si un string corresponde a un estado válido.
     * 
     * @param estado el estado a validar
     * @return true si el estado es válido, false en caso contrario
     */
    public static boolean esValido(String estado) {
        if (estado == null || estado.trim().isEmpty()) {
            return false;
        }
        String estadoNormalizado = estado.trim();
        for (EstadoProyecto e : values()) {
            if (e.valor.equals(estadoNormalizado)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Normaliza un estado (trim) y lo retorna si es válido.
     * 
     * @param estado el estado a normalizar
     * @return el estado normalizado
     * @throws IllegalArgumentException si el estado no es válido
     */
    public static String normalizar(String estado) {
        if (estado == null) {
            return ACTIVO.valor; // Valor por defecto
        }
        String estadoNormalizado = estado.trim();
        if (!esValido(estadoNormalizado)) {
            throw new IllegalArgumentException(
                "Estado inválido: '" + estado + "'. " +
                "Valores permitidos: Activo, En Pausa, Completado, Cancelado"
            );
        }
        return estadoNormalizado;
    }
}
