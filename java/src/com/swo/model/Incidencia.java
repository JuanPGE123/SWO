package com.swo.model;

import java.sql.Timestamp;

// Nombre de clase en PascalCase
public class Incidencia {
    // Variables en camelCase
    private int idIncidencia;
    private String titulo;
    private String descripcion;
    private String estado;
    private String ubicacion;
    private String impacto;
    private String prioridad;
    private Timestamp fechaCreacion;
    private int idUsuarioReporta;
    private String resolucion;
    private Timestamp fechaResolucion;

    // Constructor vacío
    public Incidencia() {}

    // Constructor con parámetros (excepto ID y Fecha, manejados por BD)
    public Incidencia(String titulo, String descripcion, String estado, int idUsuarioReporta) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.idUsuarioReporta = idUsuarioReporta;
    }

    // Getters y Setters
    public int getIdIncidencia() { return idIncidencia; }
    public void setIdIncidencia(int idIncidencia) { this.idIncidencia = idIncidencia; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getUbicacion() { return ubicacion; }
    public void setUbicacion(String ubicacion) { this.ubicacion = ubicacion; }

    public String getImpacto() { return impacto; }
    public void setImpacto(String impacto) { this.impacto = impacto; }

    public String getPrioridad() { return prioridad; }
    public void setPrioridad(String prioridad) { this.prioridad = prioridad; }

    public Timestamp getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(Timestamp fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public int getIdUsuarioReporta() { return idUsuarioReporta; }
    public void setIdUsuarioReporta(int idUsuarioReporta) { this.idUsuarioReporta = idUsuarioReporta; }

    public String getResolucion() { return resolucion; }
    public void setResolucion(String resolucion) { this.resolucion = resolucion; }

    public Timestamp getFechaResolucion() { return fechaResolucion; }
    public void setFechaResolucion(Timestamp fechaResolucion) { this.fechaResolucion = fechaResolucion; }
}
