package com.swo.api.repository;

import com.swo.api.model.entity.ChatbotMensaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para la gestión de {@link ChatbotMensaje}.
 * <p>
 * Proporciona operaciones CRUD y consultas personalizadas para
 * mensajes del chatbot.
 */
@Repository
public interface ChatbotMensajeRepository extends JpaRepository<ChatbotMensaje, Long> {

    /**
     * Obtiene todos los mensajes de una conversación ordenados por fecha.
     *
     * @param idConversacion ID de la conversación
     * @return Lista de mensajes ordenados cronológicamente
     */
    List<ChatbotMensaje> findByConversacion_IdConversacionOrderByFechaMensajeAsc(Long idConversacion);

    /**
     * Obtiene los últimos N mensajes de una conversación.
     *
     * @param idConversacion ID de la conversación
     * @param limit Cantidad máxima de mensajes a retornar
     * @return Lista de los últimos mensajes
     */
    @Query(value = "SELECT m FROM ChatbotMensaje m WHERE m.conversacion.idConversacion = :idConversacion " +
                   "ORDER BY m.fechaMensaje DESC")
    List<ChatbotMensaje> findTopNByConversacion(@Param("idConversacion") Long idConversacion);

    /**
     * Cuenta los mensajes de una conversación.
     *
     * @param idConversacion ID de la conversación
     * @return Número de mensajes en la conversación
     */
    long countByConversacion_IdConversacion(Long idConversacion);

    /**
     * Obtiene mensajes de un tipo específico en una conversación.
     *
     * @param idConversacion ID de la conversación
     * @param tipoMensaje Tipo de mensaje (Usuario, Bot, Sistema)
     * @return Lista de mensajes del tipo especificado
     */
    List<ChatbotMensaje> findByConversacion_IdConversacionAndTipoMensaje(Long idConversacion, String tipoMensaje);
}
