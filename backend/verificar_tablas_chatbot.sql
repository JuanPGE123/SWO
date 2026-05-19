-- Verificar qué tablas de chatbot existen
SHOW TABLES LIKE 'chatbot%';

-- Ver estructura de chatbot_mensajes si existe
DESCRIBE chatbot_mensajes;

-- Ver estructura de chatbot_conversaciones si existe
DESCRIBE chatbot_conversaciones;

-- Ver el CHECK constraint de proyectos
SHOW CREATE TABLE proyectos;
