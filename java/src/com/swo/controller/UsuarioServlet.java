package com.swo.controller;

import com.swo.dao.UsuarioDAO;
import com.swo.model.Usuario;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

/**
 * Servlet para gestionar operaciones de Usuarios
 * Mapeo: /UsuarioServlet
 */
@WebServlet("/UsuarioServlet")
public class UsuarioServlet extends HttpServlet {
    
    private UsuarioDAO usuarioDAO;
    
    @Override
    public void init() throws ServletException {
        super.init();
        usuarioDAO = new UsuarioDAO();
    }
    
    /**
     * Método doPost: Registrar nuevo usuario
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        
        String action = request.getParameter("action");
        
        if ("login".equals(action)) {
            // Gestionar login
            handleLogin(request, response);
        } else {
            // Registrar nuevo usuario
            handleRegistro(request, response);
        }
    }
    
    /**
     * Método doGet: Listar usuarios
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        
        String action = request.getParameter("action");
        
        if ("logout".equals(action)) {
            // Cerrar sesión
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }
            response.sendRedirect("login.html");
            return;
        }
        
        try {
            // Obtener todos los usuarios
            List<Usuario> listaUsuarios = usuarioDAO.obtenerUsuarios();
            
            // Guardar en request
            request.setAttribute("listaUsuarios", listaUsuarios);
            
            // Mensaje de éxito si existe
            String mensaje = request.getParameter("mensaje");
            if (mensaje != null && !mensaje.isEmpty()) {
                request.setAttribute("mensaje", mensaje);
                request.setAttribute("tipoMensaje", "success");
            }
            
            // Forward a JSP
            RequestDispatcher dispatcher = request.getRequestDispatcher("jsp/listarUsuarios.jsp");
            dispatcher.forward(request, response);
            
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                             "Error al obtener usuarios: " + e.getMessage());
        }
    }
    
    /**
     * Maneja el registro de usuarios
     */
    private void handleRegistro(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            String nombreCompleto = request.getParameter("nombreCompleto");
            String correo = request.getParameter("correo");
            String password = request.getParameter("password");
            String rol = request.getParameter("rol");
            String telefono = request.getParameter("telefono");
            String departamento = request.getParameter("departamento");
            
            // Validación básica
            if (nombreCompleto == null || nombreCompleto.trim().isEmpty() ||
                correo == null || correo.trim().isEmpty() ||
                password == null || password.trim().isEmpty()) {
                
                request.setAttribute("mensaje", "Error: Campos obligatorios incompletos");
                request.setAttribute("tipoMensaje", "error");
                RequestDispatcher rd = request.getRequestDispatcher("registroUsuario.html");
                rd.forward(request, response);
                return;
            }
            
            // Crear usuario
            Usuario usuario = new Usuario(nombreCompleto, correo, password, 
                                        rol != null ? rol : "Usuario", 
                                        telefono, departamento);
            
            // Insertar en BD
            boolean resultado = usuarioDAO.insertarUsuario(usuario);
            
            if (resultado) {
                response.sendRedirect("UsuarioServlet?mensaje=Usuario registrado exitosamente");
            } else {
                request.setAttribute("mensaje", "Error: No se pudo registrar el usuario");
                request.setAttribute("tipoMensaje", "error");
                RequestDispatcher rd = request.getRequestDispatcher("registroUsuario.html");
                rd.forward(request, response);
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            request.setAttribute("mensaje", "Error del servidor: " + e.getMessage());
            request.setAttribute("tipoMensaje", "error");
            RequestDispatcher rd = request.getRequestDispatcher("registroUsuario.html");
            rd.forward(request, response);
        }
    }
    
    /**
     * Maneja el login de usuarios
     */
    private void handleLogin(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            String correo = request.getParameter("correo");
            String password = request.getParameter("password");

            if (correo == null || correo.trim().isEmpty() ||
                password == null || password.trim().isEmpty()) {
                response.sendRedirect("login.html?error=Correo+y+contrase%C3%B1a+son+obligatorios");
                return;
            }

            // Validar credenciales
            Usuario usuario = usuarioDAO.obtenerUsuarioPorCorreo(correo.trim());

            if (usuario != null && usuario.getPasswordHash().equals(password)) {
                // Login exitoso - crear sesión
                HttpSession session = request.getSession();
                session.setAttribute("idUsuario", usuario.getIdUsuario());
                session.setAttribute("nombreUsuario", usuario.getNombreCompleto());
                session.setAttribute("rolUsuario", usuario.getRol());

                // Actualizar última conexión
                usuarioDAO.actualizarUltimaConexion(usuario.getIdUsuario());

                // Redirigir al dashboard
                response.sendRedirect("IncidenciaServlet");
            } else {
                // Login fallido - redirigir con mensaje de error en URL
                response.sendRedirect("login.html?error=Correo+o+contrase%C3%B1a+incorrectos");
            }

        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect("login.html?error=Error+del+servidor%3A+verifique+que+MySQL+est%C3%A9+activo");
        }
    }
}
