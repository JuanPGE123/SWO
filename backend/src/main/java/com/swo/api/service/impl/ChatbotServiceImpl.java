package com.swo.api.service.impl;

import com.swo.api.exception.ResourceNotFoundException;
import com.swo.api.model.dto.request.ChatbotRequestDTO;
import com.swo.api.model.dto.response.ChatbotResponseDTO;
import com.swo.api.model.entity.ChatbotConversacion;
import com.swo.api.model.entity.ChatbotMensaje;
import com.swo.api.model.entity.Usuario;
import com.swo.api.repository.ChatbotConversacionRepository;
import com.swo.api.repository.ChatbotMensajeRepository;
import com.swo.api.repository.UsuarioRepository;
import com.swo.api.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ChatbotServiceImpl implements ChatbotService {

    private final ChatbotConversacionRepository conversacionRepository;
    private final ChatbotMensajeRepository mensajeRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public ChatbotResponseDTO enviarMensaje(ChatbotRequestDTO dto) {
        log.info("[ChatbotService] Usuario {} enviando mensaje. SessionID: {}",
                 dto.getIdUsuario(), dto.getSessionId());
        try {
            Usuario usuario = usuarioRepository.findById(dto.getIdUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + dto.getIdUsuario()));

            String sessionId = dto.getSessionId() != null ? dto.getSessionId() : generarSessionId();

            ChatbotConversacion conversacion = conversacionRepository
                .findBySesionIdOrderByFechaInicioAsc(sessionId).stream()
                .filter(c -> "Iniciada".equals(c.getEstadoConversacion()) || "Activa".equals(c.getEstadoConversacion()))
                .findFirst()
                .orElseGet(() -> {
                    ChatbotConversacion nueva = new ChatbotConversacion();
                    nueva.setUsuario(usuario);
                    nueva.setSesionId(sessionId);
                    nueva.setFechaInicio(java.time.LocalDateTime.now());
                    nueva.setEstadoConversacion("Activa");
                    return conversacionRepository.save(nueva);
                });

            ChatbotMensaje mensajeUsuario = new ChatbotMensaje();
            mensajeUsuario.setConversacion(conversacion);
            mensajeUsuario.setTipoMensaje("Usuario");
            mensajeUsuario.setContenido(dto.getMensaje() != null ? dto.getMensaje() : "");
            mensajeUsuario.setMensajeUsuario(usuario.getNombreCompleto() != null ?
                                             usuario.getNombreCompleto() : "Usuario ID: " + usuario.getIdUsuario());
            mensajeRepository.save(mensajeUsuario);

            String respuesta = generarRespuestaBot(dto.getMensaje(), dto.getTipoConsulta());

            ChatbotMensaje mensajeBot = new ChatbotMensaje();
            mensajeBot.setConversacion(conversacion);
            mensajeBot.setTipoMensaje("Bot");
            mensajeBot.setContenido(respuesta);
            mensajeBot.setMensajeUsuario("SWO Asistente Virtual");
            ChatbotMensaje botGuardado = mensajeRepository.save(mensajeBot);

            ChatbotResponseDTO response = new ChatbotResponseDTO();
            response.setIdConversacion(conversacion.getIdConversacion());
            response.setSesionId(conversacion.getSesionId());
            response.setFechaInicio(conversacion.getFechaInicio());
            response.setEstadoConversacion(conversacion.getEstadoConversacion());
            response.setNombreUsuario(usuario.getNombreCompleto() != null ? usuario.getNombreCompleto() : "Usuario");
            response.setMensajeUsuario(dto.getMensaje());
            response.setRespuestaBot(respuesta);
            response.setFechaMensaje(botGuardado.getFechaMensaje());
            return response;

        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            log.error("[ChatbotService] Error inesperado: {}", e.getMessage(), e);
            throw new RuntimeException("Error al procesar mensaje del chatbot: " + e.getMessage(), e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatbotResponseDTO> obtenerHistorialUsuario(Long idUsuario) {
        if (!usuarioRepository.existsById(idUsuario)) {
            throw new ResourceNotFoundException("Usuario no encontrado con ID: " + idUsuario);
        }
        return conversacionRepository.findByUsuario_IdUsuarioOrderByFechaInicioDesc(idUsuario).stream()
            .map(this::mapearEntidadADto)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatbotResponseDTO> obtenerPorSession(String sessionId) {
        return conversacionRepository.findBySesionIdOrderByFechaInicioAsc(sessionId).stream()
            .map(this::mapearEntidadADto)
            .collect(Collectors.toList());
    }

    @Override
    public ChatbotResponseDTO marcarComoResuelta(Long idConversacion) {
        ChatbotConversacion conversacion = conversacionRepository.findById(idConversacion)
            .orElseThrow(() -> new ResourceNotFoundException("Conversación no encontrada con ID: " + idConversacion));
        conversacion.setEstadoConversacion("Finalizada");
        conversacion.setFechaFin(java.time.LocalDateTime.now());
        return mapearEntidadADto(conversacionRepository.save(conversacion));
    }

    // ── Generación de respuestas ─────────────────────────────────────────────

    private String generarRespuestaBot(String mensaje, String tipoConsulta) {
        if (mensaje == null || mensaje.isBlank()) {
            return "No recibí ningún mensaje. Por favor escribe tu consulta y con gusto te ayudo. 😊";
        }
        String m = mensaje.toLowerCase();

        // ── Saludos ──
        if (m.matches(".*(hola|buenos días|buenos dias|buenas tardes|buenas noches|hi|hello|hey|saludos|buen día).*")) {
            return "¡Hola! 👋 Soy el asistente virtual de **SWO Service Desk**. Estoy aquí para ayudarte con cualquier consulta sobre el sistema.\n\n" +
                   "Puedo ayudarte con:\n" +
                   "📋 **Incidencias** — Crear, consultar y hacer seguimiento\n" +
                   "👥 **Usuarios** — Gestión de cuentas y perfiles\n" +
                   "📁 **Proyectos** — Creación y asignación de equipos\n" +
                   "🔐 **Contraseñas** — Recuperación y cambio de acceso\n" +
                   "📊 **Reportes** — Estadísticas y métricas del sistema\n\n" +
                   "¿En qué puedo ayudarte hoy?";
        }

        // ── Despedidas ──
        if (m.matches(".*(adios|adiós|chao|bye|hasta luego|hasta pronto|nos vemos|hasta mañana).*")) {
            return "¡Hasta luego! 👋 Fue un placer ayudarte. Si necesitas más asistencia, aquí estaré. ¡Que tengas un excelente día!";
        }

        // ── Agradecimientos ──
        if (m.matches(".*(gracias|muchas gracias|thank|thanks|te lo agradezco|excelente ayuda|muy útil|genial).*")) {
            return "¡Con mucho gusto! 😊 Para eso estoy aquí. Si tienes más preguntas no dudes en escribirme. ¡Éxitos!";
        }

        // ── Crear incidencia ──
        if (m.matches(".*(crear incidencia|nueva incidencia|reportar incidencia|reportar problema|abrir ticket|nuevo ticket|tengo un problema|fallo|error del sistema|no funciona|no puedo acceder|sistema caído|bug|issue).*")) {
            return "Entendido, voy a ayudarte a **reportar una incidencia**. Sigue estos pasos:\n\n" +
                   "1️⃣ Ve al menú lateral → **Incidencias**\n" +
                   "2️⃣ Haz clic en **'+ Nueva Incidencia'**\n" +
                   "3️⃣ Completa el formulario con:\n" +
                   "   • **Título**: Descripción breve del problema\n" +
                   "   • **Descripción**: Detalla qué sucedió y cuándo\n" +
                   "   • **Prioridad**: Baja / Media / Alta / Crítica\n" +
                   "   • **Área afectada**: Sistema, hardware, red, etc.\n" +
                   "4️⃣ Haz clic en **'Guardar'**\n\n" +
                   "⚡ **Consejo**: Cuanto más detallada sea la descripción, más rápido podremos resolverlo.\n\n" +
                   "¿Necesitas ayuda para clasificar la prioridad de tu incidencia?";
        }

        // ── Consultar estado de incidencia ──
        if (m.matches(".*(estado.*incidencia|seguimiento|cómo va|cómo está|en qué estado|progreso|actualización|mis incidencias|consultar ticket|ver ticket).*")) {
            return "Para **consultar el estado de tus incidencias**, tienes estas opciones:\n\n" +
                   "📍 **Opción 1** — Ve a **Incidencias** en el menú lateral\n" +
                   "   • Verás todas tus incidencias con su estado actual\n" +
                   "   • Puedes filtrar por: Abierto, En Progreso, Pendiente, Resuelto\n\n" +
                   "📍 **Opción 2** — Usa el buscador para encontrar por ID o título\n\n" +
                   "📍 **Opción 3** — En el **Dashboard** tienes un resumen rápido\n\n" +
                   "**Estados posibles:**\n" +
                   "🔴 **Abierto** — Recibido, pendiente de asignación\n" +
                   "🟡 **En Progreso** — Siendo atendido por el equipo técnico\n" +
                   "🔵 **Pendiente** — Esperando información adicional de tu parte\n" +
                   "🟢 **Resuelto** — Solucionado y cerrado\n\n" +
                   "¿Hay alguna incidencia específica que quieras rastrear?";
        }

        // ── Prioridades ──
        if (m.matches(".*(prioridad|crítico|urgente|qué prioridad|cómo clasificar|cuándo usar).*")) {
            return "Aquí te explico cómo **clasificar la prioridad** de una incidencia:\n\n" +
                   "🔴 **Crítica** — Sistema completamente caído, afecta a toda la organización\n" +
                   "   _Ejemplo: Servidor principal sin respuesta, base de datos inaccesible_\n\n" +
                   "🟠 **Alta** — Afecta a múltiples usuarios o un área completa\n" +
                   "   _Ejemplo: Fallo de red en una sede, sistema de nómina no disponible_\n\n" +
                   "🟡 **Media** — Problema de un usuario pero bloquea su trabajo\n" +
                   "   _Ejemplo: No puedo ingresar al sistema, aplicación sin respuesta_\n\n" +
                   "🟢 **Baja** — Inconveniente menor que no bloquea el trabajo\n" +
                   "   _Ejemplo: Botón desalineado, texto con error ortográfico_\n\n" +
                   "Si no estás seguro, usa **Media** y el equipo técnico ajustará según el impacto real.";
        }

        // ── Contraseña / login ──
        if (m.matches(".*(contraseña|password|clave|no puedo entrar|no puedo iniciar sesión|olvidé|olvidé la contraseña|cambiar clave|restablecer|resetear|acceso denegado|login).*")) {
            return "Te ayudo con el acceso al sistema. Aquí las opciones disponibles:\n\n" +
                   "🔑 **Olvidé mi contraseña:**\n" +
                   "   • En la pantalla de login, haz clic en **'¿Olvidaste tu contraseña?'**\n" +
                   "   • Ingresa tu correo registrado y recibirás instrucciones\n\n" +
                   "🔄 **Cambiar contraseña (administrador):**\n" +
                   "   • Ve a **Gestión de Usuarios** en el menú\n" +
                   "   • Busca el usuario y haz clic en **'Cambiar Clave'**\n" +
                   "   • Ingresa la nueva contraseña (mínimo 8 caracteres)\n\n" +
                   "🔒 **Consejos de seguridad:**\n" +
                   "   • Usa al menos 8 caracteres con letras y números\n" +
                   "   • No compartas tu contraseña con nadie\n" +
                   "   • Cambia tu contraseña cada 90 días\n\n" +
                   "Si el problema persiste, contacta al **administrador del sistema** directamente.";
        }

        // ── Usuarios - gestión ──
        if (m.matches(".*(crear usuario|nuevo usuario|agregar usuario|registrar usuario|gestión de usuarios|gestionar usuarios|lista de usuarios).*")) {
            return "Para **crear un nuevo usuario** en el sistema:\n\n" +
                   "1️⃣ Ve al menú lateral → **Gestión de Usuarios**\n" +
                   "2️⃣ Haz clic en **'+ Nuevo Usuario'**\n" +
                   "3️⃣ Completa el formulario:\n" +
                   "   • **Nombre completo** (mínimo 3 caracteres, solo letras)\n" +
                   "   • **Correo electrónico** (debe ser único en el sistema)\n" +
                   "   • **Contraseña** (mínimo 8 caracteres)\n" +
                   "   • **Rol** del usuario en el sistema\n" +
                   "   • **Teléfono** (opcional, formato internacional)\n" +
                   "   • **Departamento** del usuario\n" +
                   "   • **Jefe directo** (opcional, para jerarquía organizacional)\n" +
                   "4️⃣ Haz clic en **'Guardar Usuario'**\n\n" +
                   "⚠️ Solo los usuarios con rol **Administrador** pueden crear usuarios.\n\n" +
                   "¿Necesitas información sobre los roles disponibles?";
        }

        // ── Roles del sistema ──
        if (m.matches(".*(roles|rol|permisos|qué roles|tipos de usuario|perfil de usuario|acceso).*")) {
            return "El sistema SWO tiene los siguientes **roles de usuario**:\n\n" +
                   "👑 **Administrador** — Acceso total al sistema\n" +
                   "👔 **Gerente** — Supervisión general y reportes ejecutivos\n" +
                   "🗂️ **Coordinador** — Coordina equipos y proyectos\n" +
                   "👤 **Jefe** — Gestión de su equipo directo\n" +
                   "🔬 **Analista** — Análisis y seguimiento de incidencias\n" +
                   "💻 **Desarrollador** — Resolución de problemas técnicos\n" +
                   "🛠️ **Técnico** — Soporte técnico de campo\n" +
                   "📞 **Soporte** — Mesa de ayuda primer nivel\n" +
                   "🖥️ **Mesa de Servicio** — Gestión de tickets y atención\n" +
                   "🔍 **Auditor** — Revisión y auditoría del sistema\n" +
                   "💼 **Consultor** — Asesoría especializada\n" +
                   "🎯 **QA** — Control de calidad y pruebas\n" +
                   "👥 **Usuario** — Acceso básico para reportar incidencias\n\n" +
                   "¿Quieres saber qué puede hacer un rol específico?";
        }

        // ── Proyectos ──
        if (m.matches(".*(crear proyecto|nuevo proyecto|gestión de proyectos|gestionar proyectos|proyectos del sistema|asignar proyecto).*")) {
            return "Para **gestionar proyectos** en SWO:\n\n" +
                   "📁 **Crear un proyecto:**\n" +
                   "   1. Ve al menú → **Gestión de Proyectos**\n" +
                   "   2. Clic en **'+ Nuevo Proyecto'**\n" +
                   "   3. Ingresa nombre (requerido), descripción y estado\n" +
                   "   4. Asigna un **jefe de proyecto** (responsable principal)\n" +
                   "   5. Guarda el proyecto\n\n" +
                   "👥 **Asignar usuarios al proyecto:**\n" +
                   "   • En la tabla de proyectos, clic en **'👤 Asignar'**\n" +
                   "   • Selecciona el usuario del dropdown\n" +
                   "   • Confirma la asignación\n\n" +
                   "📊 **Estados de proyecto:**\n" +
                   "   • **Activo** — En ejecución\n" +
                   "   • **En Pausa** — Temporalmente detenido\n" +
                   "   • **Completado** — Finalizado exitosamente\n" +
                   "   • **Cancelado** — Detenido definitivamente\n\n" +
                   "¿Necesitas ayuda con alguna otra función de proyectos?";
        }

        // ── Asignar usuarios ──
        if (m.matches(".*(asignar usuario|asignar.*proyecto|agregar.*proyecto|miembro.*proyecto|equipo del proyecto).*")) {
            return "Para **asignar un usuario a un proyecto**:\n\n" +
                   "1️⃣ Ve a **Gestión de Proyectos**\n" +
                   "2️⃣ En la tabla, busca el proyecto al que deseas agregar un miembro\n" +
                   "3️⃣ Haz clic en el botón **'👤 Asignar'** en la columna de acciones\n" +
                   "4️⃣ Se abrirá un modal — selecciona el usuario del **dropdown**\n" +
                   "5️⃣ Clic en **'Confirmar Asignación'**\n\n" +
                   "💡 **Nota**: Un usuario solo puede estar asignado una vez al mismo proyecto.\n\n" +
                   "¿Necesitas remover un usuario de un proyecto?";
        }

        // ── Dashboard ──
        if (m.matches(".*(dashboard|panel|inicio|resumen|estadísticas|estadisticas|métricas|metricas|kpi|indicadores).*")) {
            return "El **Dashboard de SWO** te muestra un resumen ejecutivo en tiempo real:\n\n" +
                   "📊 **Métricas principales:**\n" +
                   "   • Total de incidencias abiertas\n" +
                   "   • Incidencias resueltas hoy\n" +
                   "   • Tiempo promedio de resolución\n" +
                   "   • Distribución por prioridad y estado\n\n" +
                   "📈 **Gráficas disponibles:**\n" +
                   "   • Incidencias por área\n" +
                   "   • Tendencia semanal/mensual\n" +
                   "   • Carga de trabajo por técnico\n\n" +
                   "🔔 **Acceso rápido:**\n" +
                   "   • Últimas incidencias recientes\n" +
                   "   • Accesos directos a funciones frecuentes\n\n" +
                   "Ve al menú lateral → **Dashboard** para ver todo en tiempo real.";
        }

        // ── Reportes ──
        if (m.matches(".*(reporte|informe|exportar|descargar|csv|pdf|generar reporte|reporte.*incidencia).*")) {
            return "El sistema SWO ofrece varias opciones de **reportes y exportación**:\n\n" +
                   "📋 **Desde Gestión de Usuarios:**\n" +
                   "   • Botón **'Exportar'** → descarga CSV con la lista filtrada\n\n" +
                   "📊 **Desde el módulo de Reportes:**\n" +
                   "   • Reportes de incidencias por período\n" +
                   "   • Estadísticas por área y técnico\n" +
                   "   • Tiempo de resolución promedio\n" +
                   "   • Ranking de usuarios con más incidencias\n\n" +
                   "⬇️ **Formatos disponibles:** CSV, Excel\n\n" +
                   "¿Necesitas un tipo específico de reporte?";
        }

        // ── Jefe directo ──
        if (m.matches(".*(jefe directo|jefe.*usuario|asignar jefe|supervisor|jerarquía|organigrama).*")) {
            return "Puedes **asignar un jefe directo** a cada usuario del sistema:\n\n" +
                   "1️⃣ Ve a **Gestión de Usuarios** → **'+ Nuevo Usuario'** (o editar uno existente)\n" +
                   "2️⃣ En el formulario, busca el campo **'Jefe Directo'**\n" +
                   "3️⃣ Selecciona del dropdown el jefe correspondiente\n" +
                   "   _(Solo aparecen usuarios con rol: Jefe, Administrador, Gerente o Coordinador)_\n" +
                   "4️⃣ Guarda los cambios\n\n" +
                   "👔 **Roles que pueden ser jefe directo:**\n" +
                   "   • Jefe, Administrador, Gerente, Coordinador\n\n" +
                   "Esto permite mantener la **jerarquía organizacional** visible en el sistema.";
        }

        // ── Notificaciones ──
        if (m.matches(".*(notificación|notificaciones|aviso|alerta|correo.*incidencia|email.*notificación).*")) {
            return "El sistema SWO genera **notificaciones automáticas** en estos casos:\n\n" +
                   "📧 **Por correo electrónico:**\n" +
                   "   • Nueva incidencia asignada al técnico\n" +
                   "   • Cambio de estado en tu incidencia\n" +
                   "   • Incidencia resuelta\n" +
                   "   • Escalamiento de prioridad\n\n" +
                   "🔔 **En el sistema:**\n" +
                   "   • Alerta cuando hay incidencias críticas sin atender\n" +
                   "   • Resumen diario de actividad\n\n" +
                   "Si no recibes notificaciones, verifica que tu correo esté registrado correctamente en tu perfil de usuario.";
        }

        // ── SLA / Tiempos de respuesta ──
        if (m.matches(".*(sla|tiempo de respuesta|cuánto demora|cuánto tarda|tiempo de atención|plazo|cuándo resuelven).*")) {
            return "Los **tiempos de respuesta (SLA)** del equipo de soporte son:\n\n" +
                   "🔴 **Crítica** — Respuesta: 1 hora | Resolución: 4 horas\n" +
                   "🟠 **Alta** — Respuesta: 2 horas | Resolución: 8 horas\n" +
                   "🟡 **Media** — Respuesta: 4 horas | Resolución: 24 horas\n" +
                   "🟢 **Baja** — Respuesta: 8 horas | Resolución: 72 horas\n\n" +
                   "⚠️ **Importante**: Los tiempos aplican en días y horas hábiles (lunes a viernes, 8am - 6pm).\n\n" +
                   "Si tu incidencia lleva más tiempo del indicado, puedes **escalar** desde el chatbot o contactar directamente al supervisor.";
        }

        // ── Escalamiento ──
        if (m.matches(".*(escalar|escalamiento|hablar.*humano|hablar.*persona|agente humano|soporte nivel 2|nivel 2|supervisor).*")) {
            return "Entendido, voy a ayudarte a **escalar tu caso** a un agente humano.\n\n" +
                   "Para escalar desde el chatbot:\n" +
                   "1️⃣ Haz clic en el botón **'Escalar a Agente'** en la barra del chat\n" +
                   "2️⃣ Indica el motivo del escalamiento\n" +
                   "3️⃣ Un supervisor recibirá tu solicitud\n\n" +
                   "📞 **Contacto directo:**\n" +
                   "   • **Email soporte**: soporte@swo.com\n" +
                   "   • **Línea directa**: Ext. 100 (interno)\n\n" +
                   "🕐 **Horario de atención**: Lunes a Viernes 8:00 AM - 6:00 PM\n\n" +
                   "¿Deseas que registre tu solicitud de escalamiento ahora?";
        }

        // ── Perfil de usuario ──
        if (m.matches(".*(mi perfil|perfil|actualizar datos|mis datos|información personal|foto.*perfil|cambiar.*correo).*")) {
            return "Para **gestionar tu perfil de usuario**:\n\n" +
                   "👤 **Ver y editar tu perfil:**\n" +
                   "   • Haz clic en tu nombre/avatar en la esquina superior derecha\n" +
                   "   • Selecciona **'Mi Perfil'**\n\n" +
                   "✏️ **Puedes actualizar:**\n" +
                   "   • Nombre completo\n" +
                   "   • Número de teléfono\n" +
                   "   • Departamento\n" +
                   "   • Foto de perfil\n\n" +
                   "🔐 **Cambiar contraseña:**\n" +
                   "   • Dentro de 'Mi Perfil' → sección **Seguridad**\n" +
                   "   • Ingresa contraseña actual y la nueva (mínimo 8 caracteres)\n\n" +
                   "⚠️ El correo electrónico solo puede ser modificado por un **Administrador**.";
        }

        // ── Hardware / Equipos ──
        if (m.matches(".*(computador|computadora|pc|laptop|pantalla|teclado|mouse|ratón|impresora|hardware|equipo.*dañado|dispositivo).*")) {
            return "Para reportar un **problema de hardware o equipo**:\n\n" +
                   "1️⃣ Crea una nueva incidencia en **Incidencias → '+ Nueva Incidencia'**\n" +
                   "2️⃣ En el campo **'Área afectada'** selecciona: _Hardware / Equipos_\n" +
                   "3️⃣ Describe el equipo afectado: marca, modelo, número de serie (si tienes)\n" +
                   "4️⃣ Indica el problema específico y desde cuándo ocurre\n" +
                   "5️⃣ Adjunta fotos si el problema es visible\n\n" +
                   "💡 **Para daños físicos** siempre usa prioridad **Alta** o **Crítica** si bloquea tu trabajo.";
        }

        // ── Red / Internet / Conectividad ──
        if (m.matches(".*(red|internet|conectividad|wifi|sin internet|vpn|acceso.*red|conexión|sin conexión|lento|velocidad).*")) {
            return "Para problemas de **red o conectividad**:\n\n" +
                   "🔌 **Pasos básicos de diagnóstico:**\n" +
                   "   1. Reinicia el router o switch más cercano\n" +
                   "   2. Verifica que el cable de red esté bien conectado\n" +
                   "   3. En WiFi: olvida la red y reconéctate\n" +
                   "   4. Reinicia tu equipo\n\n" +
                   "📡 **Si el problema persiste, reporta una incidencia:**\n" +
                   "   • Área: _Infraestructura / Red_\n" +
                   "   • Indica: ¿afecta solo tu equipo o toda el área?\n" +
                   "   • Prioridad: **Alta** si afecta a varios usuarios\n\n" +
                   "⚡ **VPN:** Si tienes problemas con VPN, contacta directamente al equipo de infraestructura.";
        }

        // ── Aplicaciones / Software ──
        if (m.matches(".*(aplicación|aplicacion|software|programa|app|actualización.*software|instalar|instalación|no abre|no responde|se cierra).*")) {
            return "Para problemas con **aplicaciones o software**:\n\n" +
                   "🔧 **Soluciones rápidas:**\n" +
                   "   • Cierra y vuelve a abrir la aplicación\n" +
                   "   • Verifica que tengas la versión más reciente\n" +
                   "   • Reinicia el equipo\n" +
                   "   • Limpia la caché de la aplicación\n\n" +
                   "📋 **Si el problema persiste, crea una incidencia con:**\n" +
                   "   • Nombre y versión de la aplicación\n" +
                   "   • Sistema operativo (Windows 10/11, macOS, Linux)\n" +
                   "   • Mensaje de error exacto (screenshot si es posible)\n" +
                   "   • Pasos para reproducir el problema\n\n" +
                   "💿 **Instalaciones nuevas:** Deben ser aprobadas por el área de TI antes de instalarse.";
        }

        // ── Correo corporativo ──
        if (m.matches(".*(correo.*corporativo|email.*trabajo|outlook|thunderbird|bandeja.*entrada|correo.*no llega|correo.*spam|no recibo correos).*")) {
            return "Para problemas con el **correo corporativo**:\n\n" +
                   "📧 **Correo no llega:**\n" +
                   "   • Revisa la carpeta **Spam/Correo no deseado**\n" +
                   "   • Verifica que el remitente no esté bloqueado\n" +
                   "   • Comprueba el espacio disponible en tu buzón\n\n" +
                   "🔐 **No puedo acceder al correo:**\n" +
                   "   • Verifica que la contraseña sea correcta\n" +
                   "   • Si cambió recientemente, actualízala en el cliente de correo\n" +
                   "   • Contacta al administrador para verificar el estado de la cuenta\n\n" +
                   "⚙️ **Configuración de cliente de correo:**\n" +
                   "   • Servidor IMAP: Consulta con el área de TI los datos del servidor\n\n" +
                   "Si el problema persiste, crea una incidencia indicando el área como _Correo Corporativo_.";
        }

        // ── Impresoras ──
        if (m.matches(".*(impresora|imprimir|impresión|papel|tinta|tóner|printer|no imprime).*")) {
            return "Para problemas con **impresoras**:\n\n" +
                   "🖨️ **Soluciones básicas:**\n" +
                   "   1. Verifica que la impresora esté encendida y conectada\n" +
                   "   2. Cancela todos los trabajos de impresión pendientes\n" +
                   "   3. Reinicia la impresora (apaga, espera 30 seg, enciende)\n" +
                   "   4. Verifica niveles de tinta/tóner y papel\n" +
                   "   5. Reinstala el driver desde el Panel de Control\n\n" +
                   "📋 **Si persiste el problema:**\n" +
                   "   • Crea incidencia en área **Hardware / Periféricos**\n" +
                   "   • Indica: modelo de impresora, error mostrado, si es en red o USB\n\n" +
                   "🔄 **Impresora en red sin respuesta:** Verifica con el área de TI si el servidor de impresión está activo.";
        }

        // ── Backup / Copias de seguridad ──
        if (m.matches(".*(backup|copia de seguridad|respaldo|recuperar.*archivo|archivo.*perdido|datos.*perdidos|restaurar).*")) {
            return "Para **recuperación de archivos y backups**:\n\n" +
                   "💾 **Si perdiste un archivo:**\n" +
                   "   1. Verifica la **Papelera de Reciclaje** primero\n" +
                   "   2. Busca versiones anteriores (clic derecho → Propiedades → Versiones anteriores)\n" +
                   "   3. Si está en servidor compartido, contacta a TI para restaurar desde backup\n\n" +
                   "🔒 **Política de backups:**\n" +
                   "   • **Servidores**: Backup diario automático a las 2:00 AM\n" +
                   "   • **Retención**: Últimos 30 días de backups diarios\n" +
                   "   • **Equipos locales**: Cada usuario es responsable de su equipo local\n\n" +
                   "⚠️ **Urgente**: Si perdiste datos críticos del negocio, crea una incidencia con prioridad **Crítica** inmediatamente.";
        }

        // ── Permisos / Accesos ──
        if (m.matches(".*(permiso|acceso|autorización|no tengo acceso|me bloquearon|cuenta bloqueada|sin permisos|acceso denegado).*")) {
            return "Para problemas de **permisos y accesos**:\n\n" +
                   "🔒 **Cuenta bloqueada:**\n" +
                   "   • Generalmente ocurre por intentos fallidos de contraseña\n" +
                   "   • Espera 15 minutos y vuelve a intentar\n" +
                   "   • O contacta al **Administrador del sistema** para desbloquear\n\n" +
                   "🚫 **Sin permisos para un recurso:**\n" +
                   "   1. Verifica con tu jefe directo si debes tener ese acceso\n" +
                   "   2. Si está autorizado, crea una incidencia en área **Accesos y Permisos**\n" +
                   "   3. Incluye: recurso al que necesitas acceso y justificación\n\n" +
                   "📋 **Solicitar permisos adicionales:**\n" +
                   "   • Requiere aprobación del **jefe de área** + **Administrador TI**\n" +
                   "   • Tiempo de gestión: 1-2 días hábiles";
        }

        // ── Información del sistema SWO ──
        if (m.matches(".*(qué es swo|swo|service desk|servicedesk|sistema swo|plataforma|herramienta).*")) {
            return "**SWO Service Desk** es una plataforma integral de gestión de servicios TI:\n\n" +
                   "🎯 **Funcionalidades principales:**\n" +
                   "   📋 **Gestión de Incidencias** — Registro, seguimiento y resolución\n" +
                   "   👥 **Gestión de Usuarios** — CRUD completo con roles y jerarquía\n" +
                   "   📁 **Gestión de Proyectos** — Organización y asignación de equipos\n" +
                   "   📊 **Reportes y Métricas** — KPIs y estadísticas en tiempo real\n" +
                   "   🤖 **Chatbot Asistente** — Soporte 24/7 mediante IA\n\n" +
                   "🏗️ **Tecnología:**\n" +
                   "   • Frontend: Angular 17 (SPA)\n" +
                   "   • Backend: Spring Boot 3.2 (Java 17)\n" +
                   "   • Base de datos: MySQL 8.0\n" +
                   "   • Desplegado en: Railway + GitHub Pages\n\n" +
                   "¿Necesitas información sobre alguna funcionalidad específica?";
        }

        // ── Ayuda general ──
        if (m.matches(".*(ayuda|help|soporte|asistencia|qué puedes hacer|qué sabes|opciones|menú|cómo.*funciona|guía).*")) {
            return "¡Hola! 👋 Soy el **Asistente Virtual SWO**. Aquí está todo lo que puedo ayudarte:\n\n" +
                   "🔧 **Soporte Técnico:**\n" +
                   "   • Crear y consultar incidencias\n" +
                   "   • Problemas de hardware, red, software\n" +
                   "   • Impresoras, correo, aplicaciones\n\n" +
                   "👥 **Gestión del Sistema:**\n" +
                   "   • Administración de usuarios y roles\n" +
                   "   • Gestión de proyectos y equipos\n" +
                   "   • Permisos y accesos\n\n" +
                   "🔐 **Seguridad:**\n" +
                   "   • Cambio y recuperación de contraseñas\n" +
                   "   • Bloqueos de cuenta\n\n" +
                   "📊 **Información:**\n" +
                   "   • SLA y tiempos de respuesta\n" +
                   "   • Reportes y exportaciones\n" +
                   "   • Dashboard y métricas\n\n" +
                   "Escribe tu pregunta en lenguaje natural. ¡Estoy aquí para ayudarte!";
        }

        // ── Respuesta por defecto inteligente ──
        return "Gracias por tu mensaje. He registrado tu consulta: _\"" + truncar(mensaje, 80) + "\"_\n\n" +
               "No encontré una respuesta exacta, pero puedo ayudarte con estas opciones:\n\n" +
               "1️⃣ **Describe tu problema** con más detalle y lo analizo\n" +
               "2️⃣ **Escribe una palabra clave** como: _incidencia, contraseña, usuario, proyecto, acceso, red_\n" +
               "3️⃣ **Escala a un agente humano** si el problema es urgente\n\n" +
               "💡 Ejemplos de consultas:\n" +
               "   • _\"No puedo iniciar sesión\"_\n" +
               "   • _\"Cómo creo una incidencia\"_\n" +
               "   • _\"Mi computador no enciende\"_\n" +
               "   • _\"Qué prioridad le pongo a mi ticket\"_\n\n" +
               "Estoy aquí para ayudarte. ¿Cómo puedo asistirte?";
    }

    private String truncar(String texto, int maxLen) {
        if (texto == null) return "";
        return texto.length() <= maxLen ? texto : texto.substring(0, maxLen) + "...";
    }

    private String generarSessionId() {
        return "SESSION-" + UUID.randomUUID();
    }

    private ChatbotResponseDTO mapearEntidadADto(ChatbotConversacion conversacion) {
        if (conversacion == null) return null;
        ChatbotResponseDTO dto = new ChatbotResponseDTO();
        dto.setIdConversacion(conversacion.getIdConversacion());
        dto.setSesionId(conversacion.getSesionId());
        dto.setFechaInicio(conversacion.getFechaInicio());
        dto.setFechaFin(conversacion.getFechaFin());
        dto.setEstadoConversacion(conversacion.getEstadoConversacion());
        dto.setIpUsuario(conversacion.getIpUsuario());
        dto.setNombreUsuario(conversacion.getUsuario() != null ?
                (conversacion.getUsuario().getNombreCompleto() != null ?
                        conversacion.getUsuario().getNombreCompleto() : "Usuario sin nombre")
                : "Usuario desconocido");
        return dto;
    }
}
