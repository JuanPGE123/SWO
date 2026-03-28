package com.swo.dao;

import com.swo.model.Usuario;
import com.swo.util.ConexionBD;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO para gestionar operaciones CRUD de Usuarios
 */
public class UsuarioDAO {

    /**
     * Obtiene todos los usuarios activos
     */
    public List<Usuario> obtenerUsuarios() {
        List<Usuario> usuarios = new ArrayList<>();
        String sql = "SELECT * FROM usuarios WHERE estado = TRUE ORDER BY nombre_completo";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                Usuario usuario = new Usuario();
                usuario.setIdUsuario(rs.getInt("id_usuario"));
                usuario.setNombreCompleto(rs.getString("nombre_completo"));
                usuario.setCorreo(rs.getString("correo"));
                usuario.setPasswordHash(rs.getString("password_hash"));
                usuario.setRol(rs.getString("rol"));
                usuario.setEstado(rs.getBoolean("estado"));
                usuario.setTelefono(rs.getString("telefono"));
                usuario.setDepartamento(rs.getString("departamento"));
                usuario.setFotoPerfil(rs.getString("foto_perfil"));
                usuario.setFechaRegistro(rs.getTimestamp("fecha_registro"));
                usuario.setUltimaConexion(rs.getTimestamp("ultima_conexion"));
                usuarios.add(usuario);
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener usuarios: " + e.getMessage());
        }
        return usuarios;
    }

    /**
     * Busca un usuario por su correo electrónico
     */
    public Usuario obtenerUsuarioPorCorreo(String correo) {
        String sql = "SELECT * FROM usuarios WHERE correo = ?";
        Usuario usuario = null;

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, correo);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                usuario = new Usuario();
                usuario.setIdUsuario(rs.getInt("id_usuario"));
                usuario.setNombreCompleto(rs.getString("nombre_completo"));
                usuario.setCorreo(rs.getString("correo"));
                usuario.setPasswordHash(rs.getString("password_hash"));
                usuario.setRol(rs.getString("rol"));
                usuario.setEstado(rs.getBoolean("estado"));
                usuario.setTelefono(rs.getString("telefono"));
                usuario.setDepartamento(rs.getString("departamento"));
                usuario.setFotoPerfil(rs.getString("foto_perfil"));
                usuario.setFechaRegistro(rs.getTimestamp("fecha_registro"));
                usuario.setUltimaConexion(rs.getTimestamp("ultima_conexion"));
            }
        } catch (SQLException e) {
            System.err.println("Error al buscar usuario: " + e.getMessage());
        }
        return usuario;
    }

    /**
     * Inserta un nuevo usuario
     */
    public boolean insertarUsuario(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nombre_completo, correo, password_hash, rol, telefono, departamento) " +
                     "VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, usuario.getNombreCompleto());
            pstmt.setString(2, usuario.getCorreo());
            pstmt.setString(3, usuario.getPasswordHash());
            pstmt.setString(4, usuario.getRol());
            pstmt.setString(5, usuario.getTelefono());
            pstmt.setString(6, usuario.getDepartamento());

            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al insertar usuario: " + e.getMessage());
            return false;
        }
    }

    /**
     * Actualiza los datos de un usuario
     */
    public boolean actualizarUsuario(Usuario usuario) {
        String sql = "UPDATE usuarios SET nombre_completo = ?, telefono = ?, departamento = ?, " +
                     "rol = ?, estado = ? WHERE id_usuario = ?";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, usuario.getNombreCompleto());
            pstmt.setString(2, usuario.getTelefono());
            pstmt.setString(3, usuario.getDepartamento());
            pstmt.setString(4, usuario.getRol());
            pstmt.setBoolean(5, usuario.isEstado());
            pstmt.setInt(6, usuario.getIdUsuario());

            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al actualizar usuario: " + e.getMessage());
            return false;
        }
    }

    /**
     * Obtiene usuarios por rol (Soporte, Jefe, Usuario, Administrador)
     */
    public List<Usuario> obtenerUsuariosPorRol(String rol) {
        List<Usuario> usuarios = new ArrayList<>();
        String sql = "SELECT * FROM usuarios WHERE rol = ? AND estado = TRUE ORDER BY nombre_completo";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, rol);
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                Usuario usuario = new Usuario();
                usuario.setIdUsuario(rs.getInt("id_usuario"));
                usuario.setNombreCompleto(rs.getString("nombre_completo"));
                usuario.setCorreo(rs.getString("correo"));
                usuario.setRol(rs.getString("rol"));
                usuario.setDepartamento(rs.getString("departamento"));
                usuario.setTelefono(rs.getString("telefono"));
                usuarios.add(usuario);
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener usuarios por rol: " + e.getMessage());
        }
        return usuarios;
    }

    /**
     * Actualiza la última conexión de un usuario
     */
    public boolean actualizarUltimaConexion(int idUsuario) {
        String sql = "UPDATE usuarios SET ultima_conexion = NOW() WHERE id_usuario = ?";

        try (Connection conn = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, idUsuario);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al actualizar última conexión: " + e.getMessage());
            return false;
        }
    }
}
