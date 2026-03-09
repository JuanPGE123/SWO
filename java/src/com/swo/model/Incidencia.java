package com.swo.model;

import java.sql.Timestamp;

// Nombre de clase en PascalCase
public class Incidencia {
    // Variables en camelCase
    private int idIncidencia;
    private String titulo;
    private String descripcion;
    private String estado;
    private Timestamp fechaCreacion;
    private int idUsuarioReporta;

    // Constructor vacío
    public Incidencia() {}

    // Constructor con parámetros (excepto ID y Fecha, manejados por BD)
    public Incidencia(String titulo, String descripcion, String estado, int idUsuarioReporta) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.idUsuarioReporta = idUsuarioReporta;
    }

    // Getters y Setters (Estándar de encapsulamiento)
    public int getIdIncidencia() { return idIncidencia; }
    public void setIdIncidencia(int idIncidencia) { this.idIncidencia = idIncidencia; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public Timestamp getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(Timestamp fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public int getIdUsuarioReporta() { return idUsuarioReporta; }
    public void setIdUsuarioReporta(int idUsuarioReporta) { this.idUsuarioReporta = idUsuarioReporta; }
}
