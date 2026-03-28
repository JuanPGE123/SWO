<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.swo.model.Usuario" %>
<%@ page import="java.util.List" %>
<%@ page import="java.text.SimpleDateFormat" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Usuarios - SWO</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            padding: 30px;
        }
        
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
        }
        
        h1 {
            color: #333;
            font-size: 28px;
        }
        
        .btn-nuevo {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-block;
        }
        
        .btn-nuevo:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(17, 153, 142, 0.4);
        }
        
        .alert {
            padding: 15px 20px;
            border-radius: 5px;
            margin-bottom: 20px;
            font-size: 14px;
        }
        
        .alert-success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        
        .stat-card h3 {
            font-size: 32px;
            margin-bottom: 5px;
        }
        
        .stat-card p {
            font-size: 14px;
            opacity: 0.9;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
        }
        
        thead {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            color: white;
        }
        
        th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
        }
        
        td {
            padding: 12px 15px;
            border-bottom: 1px solid #e0e0e0;
            font-size: 14px;
        }
        
        tbody tr:hover {
            background-color: #f5f5f5;
        }
        
        .rol-badge {
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
        }
        
        .rol-admin {
            background-color: #ffe5e5;
            color: #c41e3a;
        }
        
        .rol-tecnico {
            background-color: #e0f0ff;
            color: #0066cc;
        }
        
        .rol-usuario {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .estado-activo {
            color: #2e7d32;
            font-weight: bold;
        }
        
        .estado-inactivo {
            color: #c41e3a;
        }
        
        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #666;
        }
        
        .empty-state-icon {
            font-size: 64px;
            margin-bottom: 20px;
        }
        
        .nav-links {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            text-align: center;
        }
        
        .nav-links a {
            color: #11998e;
            text-decoration: none;
            margin: 0 15px;
            font-size: 14px;
        }
        
        .nav-links a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>👥 Gestión de Usuarios</h1>
            <a href="registroUsuario.html" class="btn-nuevo">+ Nuevo Usuario</a>
        </header>
        
        <%
            String mensaje = (String) request.getAttribute("mensaje");
            String tipoMensaje = (String) request.getAttribute("tipoMensaje");
            
            if (mensaje != null && !mensaje.isEmpty()) {
        %>
            <div class="alert alert-<%= tipoMensaje != null ? tipoMensaje : "success" %>">
                <%= mensaje %>
            </div>
        <%
            }
            
            @SuppressWarnings("unchecked")
            List<Usuario> listaUsuarios = (List<Usuario>) request.getAttribute("listaUsuarios");
            
            if (listaUsuarios != null && !listaUsuarios.isEmpty()) {
                long admins = listaUsuarios.stream()
                    .filter(u -> "Administrador".equals(u.getRol())).count();
                long tecnicos = listaUsuarios.stream()
                    .filter(u -> "Técnico".equals(u.getRol())).count();
                long usuarios = listaUsuarios.stream()
                    .filter(u -> "Usuario".equals(u.getRol())).count();
        %>
        
        <div class="stats">
            <div class="stat-card">
                <h3><%= listaUsuarios.size() %></h3>
                <p>Total de Usuarios</p>
            </div>
            <div class="stat-card">
                <h3><%= admins %></h3>
                <p>Administradores</p>
            </div>
            <div class="stat-card">
                <h3><%= tecnicos %></h3>
                <p>Técnicos</p>
            </div>
            <div class="stat-card">
                <h3><%= usuarios %></h3>
                <p>Usuarios Estándar</p>
            </div>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre Completo</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Departamento</th>
                    <th>Teléfono</th>
                    <th>Estado</th>
                    <th>Fecha Registro</th>
                </tr>
            </thead>
            <tbody>
                <%
                    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
                    for (Usuario usuario : listaUsuarios) {
                        String rolClass = "";
                        switch (usuario.getRol()) {
                            case "Administrador":
                                rolClass = "rol-admin";
                                break;
                            case "Técnico":
                                rolClass = "rol-tecnico";
                                break;
                            default:
                                rolClass = "rol-usuario";
                                break;
                        }
                %>
                <tr>
                    <td><strong>#<%= usuario.getIdUsuario() %></strong></td>
                    <td><strong><%= usuario.getNombreCompleto() %></strong></td>
                    <td><%= usuario.getCorreo() %></td>
                    <td>
                        <span class="rol-badge <%= rolClass %>">
                            <%= usuario.getRol() %>
                        </span>
                    </td>
                    <td><%= usuario.getDepartamento() != null ? usuario.getDepartamento() : "N/A" %></td>
                    <td><%= usuario.getTelefono() != null ? usuario.getTelefono() : "N/A" %></td>
                    <td>
                        <span class="<%= usuario.isEstado() ? "estado-activo" : "estado-inactivo" %>">
                            <%= usuario.isEstado() ? "✓ Activo" : "✗ Inactivo" %>
                        </span>
                    </td>
                    <td>
                        <%= usuario.getFechaRegistro() != null ? 
                            sdf.format(usuario.getFechaRegistro()) : "N/A" %>
                    </td>
                </tr>
                <%
                    }
                %>
            </tbody>
        </table>
        
        <%
            } else {
        %>
        <div class="empty-state">
            <div class="empty-state-icon">👥</div>
            <h3>No hay usuarios registrados</h3>
            <p>Comienza registrando el primer usuario del sistema</p>
        </div>
        <%
            }
        %>
        
        <div class="nav-links">
            <a href="registroUsuario.html">📝 Nuevo Usuario</a> |
            <a href="IncidenciaServlet">📋 Incidencias</a> |
            <a href="ReporteServlet">📊 Reportes</a> |
            <a href="ChatbotServlet">💬 Chatbot</a> |
            <a href="index.html">🏠 Inicio</a>
        </div>
    </div>
</body>
</html>
