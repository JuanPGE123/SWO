package com.swo.api.repository;

import com.swo.api.model.entity.ChatbotConversacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para la entidad {@link ChatbotConversacion}.
 * Gestiona el historial de conversaciones del chatbot.
 */
@Repository
public interface ChatbotConversacionRepository extends JpaRepository<ChatbotConversacion, Long> {

    /**
     * Encuentra todas las conversaciones de un usuario ordenadas por fecha descendente.
     */
    List<ChatbotConversacion> findByUsuario_IdUsuarioOrderByFechaInicioDesc(Long idUsuario);

    /**
     * Encuentra conversaciones por sesionId para mantener contexto.
     */
    List<ChatbotConversacion> findBySesionIdOrderByFechaInicioAsc(String sesionId);

    /**
     * Obtiene las últimas conversaciones de un usuario (para contexto).
     */
    @Query("SELECT c FROM ChatbotConversacion c WHERE c.usuario.idUsuario = :idUsuario " +
           "ORDER BY c.fechaInicio DESC")
    List<ChatbotConversacion> findTopNByUsuario(@Param("idUsuario") Long idUsuario);
}
