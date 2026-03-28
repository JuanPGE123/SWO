<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot de Asistencia - SWO</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .chat-container {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            max-width: 800px;
            width: 100%;
            height: 80vh;
            max-height: 700px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        
        .chat-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .header-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .bot-avatar {
            width: 50px;
            height: 50px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }
        
        .header-text h2 {
            font-size: 20px;
            margin-bottom: 5px;
        }
        
        .header-text p {
            font-size: 13px;
            opacity: 0.9;
        }
        
        .status-indicator {
            width: 10px;
            height: 10px;
            background: #4ade80;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f8f9fa;
        }
        
        .message {
            display: flex;
            margin-bottom: 15px;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .message.bot {
            justify-content: flex-start;
        }
        
        .message.user {
            justify-content: flex-end;
        }
        
        .message-content {
            max-width: 70%;
            padding: 12px 18px;
            border-radius: 18px;
            font-size: 14px;
            line-height: 1.5;
            white-space: pre-wrap;
        }
        
        .message.bot .message-content {
            background: white;
            color: #333;
            border-bottom-left-radius: 4px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .message.user .message-content {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-bottom-right-radius: 4px;
        }
        
        .timestamp {
            font-size: 11px;
            opacity: 0.6;
            margin-top: 5px;
        }
        
        .typing-indicator {
            display: none;
            padding: 12px 18px;
            background: white;
            border-radius: 18px;
            width: 60px;
        }
        
        .typing-indicator.active {
            display: inline-block;
        }
        
        .typing-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #999;
            margin: 0 2px;
            animation: typing 1.4s infinite;
        }
        
        .typing-dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typing {
            0%, 60%, 100% {
                transform: translateY(0);
            }
            30% {
                transform: translateY(-10px);
            }
        }
        
        .chat-input-container {
            padding: 20px;
            background: white;
            border-top: 1px solid #e0e0e0;
        }
        
        .chat-input-form {
            display: flex;
            gap: 10px;
        }
        
        #messageInput {
            flex: 1;
            padding: 12px 18px;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            font-size: 14px;
            font-family: inherit;
            transition: all 0.3s ease;
        }
        
        #messageInput:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        #sendButton {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        #sendButton:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        #sendButton:active {
            transform: translateY(0);
        }
        
        .quick-actions {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 15px;
        }
        
        .quick-action-btn {
            background: #f0f0f0;
            border: none;
            padding: 8px 14px;
            border-radius: 15px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .quick-action-btn:hover {
            background: #e0e0e0;
        }
        
        .nav-links {
            padding: 15px;
            background: #f8f9fa;
            border-top: 1px solid #e0e0e0;
            text-align: center;
        }
        
        .nav-links a {
            color: #667eea;
            text-decoration: none;
            margin: 0 10px;
            font-size: 13px;
        }
        
        .nav-links a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">
            <div class="header-info">
                <div class="bot-avatar">🤖</div>
                <div class="header-text">
                    <h2>Asistente Virtual SWO</h2>
                    <p>Aquí para ayudarte 24/7</p>
                </div>
            </div>
            <div class="status-indicator"></div>
        </div>
        
        <div class="chat-messages" id="chatMessages">
            <div class="message bot">
                <div class="message-content">
                    ¡Hola! 👋 Soy el asistente virtual de SWO. ¿En qué puedo ayudarte hoy?
                    <div class="timestamp">Ahora</div>
                </div>
            </div>
        </div>
        
        <div class="chat-input-container">
            <div class="quick-actions">
                <button class="quick-action-btn" onclick="enviarMensajeRapido('¿Cuántas incidencias hay?')">📊 Estadísticas</button>
                <button class="quick-action-btn" onclick="enviarMensajeRapido('Crear incidencia')">📝 Nueva incidencia</button>
                <button class="quick-action-btn" onclick="enviarMensajeRapido('Ayuda')">❓ Ayuda</button>
            </div>
            
            <form class="chat-input-form" id="chatForm">
                <input type="text" id="messageInput" placeholder="Escribe tu mensaje..." autocomplete="off" required>
                <button type="submit" id="sendButton">Enviar</button>
            </form>
        </div>
        
        <div class="nav-links">
            <a href="IncidenciaServlet">📋 Incidencias</a> |
            <a href="UsuarioServlet">👥 Usuarios</a> |
            <a href="ReporteServlet">📊 Reportes</a> |
            <a href="index.html">🏠 Inicio</a>
        </div>
    </div>
    
    <script>
        const chatMessages = document.getElementById('chatMessages');
        const chatForm = document.getElementById('chatForm');
        const messageInput = document.getElementById('messageInput');
        
        // Enviar mensaje
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const mensaje = messageInput.value.trim();
            if (!mensaje) return;
            
            // Agregar mensaje del usuario
            agregarMensaje(mensaje, 'user');
            messageInput.value = '';
            
            // Mostrar indicador de escritura
            mostrarIndicadorEscritura();
            
            try {
                // Enviar al servlet
                const formData = new FormData();
                formData.append('mensaje', mensaje);
                
                const response = await fetch('ChatbotServlet', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                // Ocultar indicador y mostrar respuesta
                setTimeout(() => {
                    ocultarIndicadorEscritura();
                    agregarMensaje(data.respuesta, 'bot');
                }, 1000);
                
            } catch (error) {
                ocultarIndicadorEscritura();
                agregarMensaje('Lo siento, hubo un error. Por favor intenta de nuevo.', 'bot');
            }
        });
        
        // Agregar mensaje al chat
        function agregarMensaje(texto, tipo) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${tipo}`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.innerHTML = `${texto}<div class="timestamp">${obtenerHora()}</div>`;
            
            messageDiv.appendChild(contentDiv);
            chatMessages.appendChild(messageDiv);
            
            // Scroll al final
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Indicador de escritura
        function mostrarIndicadorEscritura() {
            const indicator = document.createElement('div');
            indicator.className = 'message bot';
            indicator.id = 'typingIndicator';
            indicator.innerHTML = `
                <div class="typing-indicator active">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            `;
            chatMessages.appendChild(indicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function ocultarIndicadorEscritura() {
            const indicator = document.getElementById('typingIndicator');
            if (indicator) {
                indicator.remove();
            }
        }
        
        // Obtener hora actual
        function obtenerHora() {
            const now = new Date();
            return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        }
        
        // Mensaje rápido
        function enviarMensajeRapido(mensaje) {
            messageInput.value = mensaje;
            chatForm.dispatchEvent(new Event('submit'));
        }
        
        // Enfocar input al cargar
        messageInput.focus();
    </script>
</body>
</html>
