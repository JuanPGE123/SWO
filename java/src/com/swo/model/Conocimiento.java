package com.swo.model;

/**
 * Clase que representa una entrada de la base de conocimiento del chatbot.
 * Cada entrada contiene una pregunta frecuente con su respuesta y palabras clave
 * usadas para búsqueda por texto.
 */
public class Conocimiento {
    private int id;
    private String categoria;
    private String palabrasClave;
    private String pregunta;
    private String respuesta;
    private String pasos;
    private int nivelSoporte;

    /** Constructor vacío requerido para instanciación por reflexión. */
    public Conocimiento() {}

    /**
     * Constructor completo para instanciar desde ResultSet.
     * @param id           ID único de la entrada
     * @param categoria    Categoría temática (ej: Red, Hardware)
     * @param palabrasClave Términos de búsqueda separados por comas
     * @param pregunta     Pregunta o título del problema
     * @param respuesta    Respuesta o solución general
     * @param pasos        Pasos detallados de resolución (puede ser null)
     * @param nivelSoporte Nivel de soporte requerido (1=L1, 2=L2, 3=L3)
     */
    public Conocimiento(int id, String categoria, String palabrasClave,
                        String pregunta, String respuesta, String pasos, int nivelSoporte) {
        this.id = id;
        this.categoria = categoria;
        this.palabrasClave = palabrasClave;
        this.pregunta = pregunta;
        this.respuesta = respuesta;
        this.pasos = pasos;
        this.nivelSoporte = nivelSoporte;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getPalabrasClave() { return palabrasClave; }
    public void setPalabrasClave(String palabrasClave) { this.palabrasClave = palabrasClave; }

    public String getPregunta() { return pregunta; }
    public void setPregunta(String pregunta) { this.pregunta = pregunta; }

    public String getRespuesta() { return respuesta; }
    public void setRespuesta(String respuesta) { this.respuesta = respuesta; }

    public String getPasos() { return pasos; }
    public void setPasos(String pasos) { this.pasos = pasos; }

    public int getNivelSoporte() { return nivelSoporte; }
    public void setNivelSoporte(int nivelSoporte) { this.nivelSoporte = nivelSoporte; }
}
