package com.swo.model;

import java.sql.Timestamp;

/**
 * Clase que representa un proyecto del sistema SWO.
 * Un proyecto agrupa usuarios e incidencias relacionadas.
 */
public class Proyecto {
    private int idProyecto;
    private String nombre;
    private String descripcion;
    private String estado;
    private Timestamp fechaCreacion;

    /** Constructor vacío requerido para instanciación desde ResultSet. */
    public Proyecto() {}

    /**
     * Constructor principal para crear un proyecto nuevo.
     * @param nombre      Nombre identificador del proyecto
     * @param descripcion Descripción general del proyecto
     * @param estado      Estado inicial (Activo, Archivado)
     */
    public Proyecto(String nombre, String descripcion, String estado) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
    }

    public int getIdProyecto() { return idProyecto; }
    public void setIdProyecto(int idProyecto) { this.idProyecto = idProyecto; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public Timestamp getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(Timestamp fechaCreacion) { this.fechaCreacion = fechaCreacion; }
}
