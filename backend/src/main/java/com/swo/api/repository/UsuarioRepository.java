package com.swo.api.repository;

import com.swo.api.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByCorreo(String correo);

    boolean existsByCorreo(String correo);

    List<Usuario> findByRol(String rol);

    List<Usuario> findByRolIn(List<String> roles);

    List<Usuario> findByEstadoTrue();

    @Query("SELECT u FROM Usuario u WHERE LOWER(u.nombreCompleto) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Usuario> buscarPorNombre(@Param("nombre") String nombre);
}
