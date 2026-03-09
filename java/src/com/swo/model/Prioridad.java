package com.swo.model;

/**
 * Clase que representa un nivel de prioridad para incidencias
 */
public class Prioridad {
    private int idPrioridad;
    private String nombrePrioridad;
    private int nivel;
    private int tiempoRespuestaHrs;
    private String color;
    private String descripcion;
    private boolean estado;

    // Constructor vacío
    public Prioridad() {
    }

    // Constructor completo
    public Prioridad(int idPrioridad, String nombrePrioridad, int nivel, int tiempoRespuestaHrs, String color, String descripcion) {
        this.idPrioridad = idPrioridad;
        this.nombrePrioridad = nombrePrioridad;
        this.nivel = nivel;
        this.tiempoRespuestaHrs = tiempoRespuestaHrs;
        this.color = color;
        this.descripcion = descripcion;
        this.estado = true;
    }

    // Getters y Setters
    public int getIdPrioridad() {
        return idPrioridad;
    }

    public void setIdPrioridad(int idPrioridad) {
        this.idPrioridad = idPrioridad;
    }

    public String getNombrePrioridad() {
        return nombrePrioridad;
    }

    public void setNombrePrioridad(String nombrePrioridad) {
        this.nombrePrioridad = nombrePrioridad;
    }

    public int getNivel() {
        return nivel;
    }

    public void setNivel(int nivel) {
        this.nivel = nivel;
    }

    public int getTiempoRespuestaHrs() {
        return tiempoRespuestaHrs;
    }

    public void setTiempoRespuestaHrs(int tiempoRespuestaHrs) {
        this.tiempoRespuestaHrs = tiempoRespuestaHrs;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "Prioridad{" +
                "idPrioridad=" + idPrioridad +
                ", nombrePrioridad='" + nombrePrioridad + '\'' +
                ", nivel=" + nivel +
                ", tiempoRespuestaHrs=" + tiempoRespuestaHrs +
                ", color='" + color + '\'' +
                '}';
    }
}
