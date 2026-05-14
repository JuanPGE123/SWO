package com.swo.api.repository;

import com.swo.api.model.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio JPA para la entidad {@link Categoria}.
 */
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    /** Lista solo las categorías activas (para formularios de creación de incidencias). */
    List<Categoria> findByEstadoTrue();

    /** Verifica si ya existe una categoría con ese nombre. */
    boolean existsByNombreCategoria(String nombreCategoria);

    /** Busca por nombre exacto. */
    Optional<Categoria> findByNombreCategoria(String nombreCategoria);
}
