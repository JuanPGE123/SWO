package com.swo.model;

import java.sql.Timestamp;

/**
 * Modelo de datos para comentarios de incidencias
 * Mapea la tabla comentarios_incidencia
 */
public class Comentario {
    private int idComentario;
    private int idIncidencia;
    private int idUsuario;
    private String comentario;
    private boolean esSolucion;
    private Timestamp fechaComentario;
    private String nombreUsuario; // Para joins

    // Constructor vacío
    public Comentario() {}

    // Constructor básico
    public Comentario(int idIncidencia, int idUsuario, String comentario) {
        this.idIncidencia = idIncidencia;
        this.idUsuario = idUsuario;
        this.comentario = comentario;
        this.esSolucion = false;
    }

    // Getters y Setters
    public int getIdComentario() { return idComentario; }
    public void setIdComentario(int idComentario) { this.idComentario = idComentario; }

    public int getIdIncidencia() { return idIncidencia; }
    public void setIdIncidencia(int idIncidencia) { this.idIncidencia = idIncidencia; }

    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

    public String getComentario() { return comentario; }
    public void setComentario(String comentario) { this.comentario = comentario; }

    public boolean isEsSolucion() { return esSolucion; }
    public void setEsSolucion(boolean esSolucion) { this.esSolucion = esSolucion; }

    public Timestamp getFechaComentario() { return fechaComentario; }
    public void setFechaComentario(Timestamp fechaComentario) { this.fechaComentario = fechaComentario; }

    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }

    @Override
    public String toString() {
        return "Comentario{" +
                "idComentario=" + idComentario +
                ", idIncidencia=" + idIncidencia +
                ", usuario='" + nombreUsuario + '\'' +
                ", fecha=" + fechaComentario +
                '}';
    }
}
