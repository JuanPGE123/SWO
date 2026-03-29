package com.swo.model;

public class Conocimiento {
    private int id;
    private String categoria;
    private String palabrasClave;
    private String pregunta;
    private String respuesta;
    private String pasos;
    private int nivelSoporte;

    public Conocimiento() {}

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
