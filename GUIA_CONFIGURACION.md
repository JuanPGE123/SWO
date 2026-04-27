# 🚀 Guía de Configuración Completa - Sistema SWO

## 📋 Resumen de Implementaciones

Se han completado las siguientes funcionalidades del sistema SWO:

### ✅ Implementaciones Backend (Java)
1. **Gestión de Comentarios**: Sistema completo de comentarios en incidencias
   - Modelo `Comentario.java`
   - DAO `ComentarioDAO.java` con CRUD completo
   - Endpoints REST en `ApiServlet.java`

2. **Asignación y Estados**: Gestión de asignaciones y prioridades
   - Métodos en `IncidenciaDAO.java`: `asignarIncidencia()`, `actualizarPrioridad()`
   - Endpoints: POST `/api/incidencias/{id}/asignar`, PUT `/api/incidencias/{id}/prioridad`

3. **Chatbot con Ollama**: Integración con IA local
   - `OllamaServlet.java` para comunicación con Ollama
   - Endpoint: POST `/api/ollama`

4. **Estadísticas Avanzadas**: Métricas de rendimiento
   - Cálculo de tiempo promedio de resolución
   - Endpoint actualizado: GET `/api/estadisticas`

5. **Notificaciones**: Sistema de polling para notificaciones en tiempo real
   - `NotificacionesServlet.java`
   - Endpoint: GET `/api/notificaciones`

### ✅ Implementaciones Frontend (Angular)
1. **UI de Comentarios**: Interfaz completa en `incident-detail`
   - Visualización de comentarios con autor y fecha
   - Formulario para agregar comentarios
   - Estados de carga y mensajes vacíos

2. **Generación de Reportes PDF**: Exportación profesional
   - Método `descargarPDF()` en `reports.component.ts`
   - Tabla con estadísticas resumidas y detalle de incidencias
   - Botón en UI para descargar PDF

3. **Servicio de Notificaciones**: Polling automático
   - Actualización cada 30 segundos
   - Toast automático para nuevas notificaciones
   - Contador de notificaciones no leídas

---

## 🔧 Instalación Paso a Paso

### 1️⃣ Instalar Ollama (Chatbot IA Local)

#### Windows

1. **Descargar Ollama**
   - Ir a: https://ollama.com/download
   - Clic en "Download for Windows"
   - Ejecutar el instalador `OllamaSetup.exe`
   - Seguir el asistente de instalación (Next → Next → Install)

2. **Verificar Instalación**
   ```powershell
   # Abrir PowerShell o CMD y ejecutar:
   ollama --version
   ```
   Deberías ver algo como: `ollama version is 0.X.X`

3. **Descargar Modelo Llama 2** (recomendado para el chatbot)
   ```powershell
   ollama pull llama2
   ```
   
   ⚠️ **Importante:** Es `llama2` todo junto (sin espacio). **NO** ejecutar `ollama pull llama 2`
   
   Este comando descarga el modelo (aproximadamente 4 GB). Espera a que termine.

4. **Iniciar Ollama** (si no se inició automáticamente)
   ```powershell
   ollama serve
   ```
   Ollama quedará ejecutándose en `http://localhost:11434`

5. **Probar Ollama**
   ```powershell
   # En otra terminal:
   ollama run llama2 "Hola, ¿cómo estás?"
   ```

#### Modelos Alternativos (Opcionales)

Si tu PC tiene menos recursos, puedes usar modelos más ligeros:

```powershell
# Modelo pequeño (menos recursos)
ollama pull llama2:7b

# Modelo especializado en español
ollama pull llama2:13b-chat

# Modelo muy ligero
ollama pull phi
```

Para usar un modelo diferente, edita el archivo:
- **Archivo**: `java/src/com/swo/controller/OllamaServlet.java`
- **Línea 27**: Cambiar `DEFAULT_MODEL = "llama2"` por el modelo que prefieras

#### Configuración Automática en Windows

Para que Ollama se ejecute automáticamente al iniciar Windows:

1. Presionar `Win + R`
2. Escribir `shell:startup` y Enter
3. Crear un acceso directo a: `C:\Users\TU_USUARIO\AppData\Local\Programs\Ollama\ollama.exe`
4. En propiedades, agregar argumento: `serve`

---

### 2️⃣ Instalar Dependencias para PDF (Angular)

Para que la generación de PDF funcione, necesitas instalar dos librerías:

```powershell
# Navegar al directorio del proyecto
cd "d:\OneDrive\SENA\PROYECTOS\SWO"

# Instalar jsPDF y jsPDF-AutoTable
npm install jspdf jspdf-autotable

# Si usas TypeScript (recomendado), también instalar los tipos:
npm install --save-dev @types/jspdf
```

**Verificar instalación:**
```powershell
npm list jspdf jspdf-autotable
```

Deberías ver algo como:
```
swo-webapp@1.0.0
├── jspdf@2.X.X
└── jspdf-autotable@3.X.X
```

---

### 3️⃣ Compilar y Desplegar el Backend

```powershell
# Compilar el backend Java
mvn clean compile

# Empaquetar como WAR
mvn package

# Iniciar Tomcat con Maven
mvn tomcat7:run
```

El servidor backend estará disponible en: `http://localhost:8080/swo`

**Endpoints disponibles:**
- `GET /swo/api/incidencias` - Listar incidencias
- `POST /swo/api/incidencias/{id}/comentarios` - Agregar comentario
- `POST /swo/api/ollama` - Consultar chatbot
- `GET /swo/api/estadisticas` - Obtener estadísticas
- `GET /swo/api/notificaciones` - Polling de notificaciones

---

### 4️⃣ Compilar y Ejecutar el Frontend

```powershell
# Instalar dependencias de Angular (si no lo has hecho)
npm install

# Compilar Angular en modo desarrollo
ng build

# O iniciar servidor de desarrollo
ng serve
```

El frontend estará disponible en: `http://localhost:4200`

---

### 5️⃣ Configurar Base de Datos

1. **Asegurarse de que MySQL esté ejecutándose**
   - Iniciar XAMPP, WAMP o MySQL Workbench
   - Verificar que el servicio MySQL esté activo

2. **Crear la base de datos**
   ```sql
   -- Ejecutar en MySQL Workbench o phpMyAdmin
   SOURCE d:/OneDrive/SENA/PROYECTOS/SWO/java/swo_database.sql;
   ```

3. **Verificar configuración de conexión**
   - Archivo: `java/src/com/swo/util/ConexionBD.java`
   - Verificar:
     - URL: `jdbc:mysql://localhost:3306/swo_db`
     - Usuario: `root`
     - Contraseña: (tu contraseña de MySQL)

4. **Insertar datos de prueba** (opcional)
   ```sql
   SOURCE d:/OneDrive/SENA/PROYECTOS/SWO/java/datos_prueba.sql;
   ```

---

## 🧪 Probar las Nuevas Funcionalidades

### Probar Comentarios

1. Ir a **Incidencias** → Clic en cualquier incidencia
2. Scroll hasta la sección "Comentarios"
3. Escribir un comentario y hacer clic en "Agregar Comentario"
4. Verificar que aparece en la lista con tu nombre y fecha

### Probar Chatbot con Ollama

1. Ir a **Chatbot** en el menú lateral
2. Escribir una consulta, por ejemplo:
   - "¿Cómo reporto una incidencia de red?"
   - "Mi computadora no enciende, ¿qué hago?"
   - "¿Cómo cambio mi contraseña?"
3. Verificar que el chatbot responde de forma inteligente (usando Ollama)

**Nota:** Si Ollama no está ejecutándose, el chatbot usará automáticamente la base de conocimiento predefinida (fallback).

### Probar Generación de PDF

1. Ir a **Reportes** en el menú lateral
2. Hacer clic en el botón "📄 Exportar PDF"
3. Esperar a que se genere (aparece mensaje "Generando PDF...")
4. Se descargará automáticamente un archivo: `reporte_incidencias_2026-04-27.pdf`
5. Abrir el PDF y verificar:
   - Tabla de resumen con estadísticas
   - Tabla detallada con todas las incidencias
   - Formato profesional con colores

### Probar Tiempo Promedio de Resolución

1. Ir a **Reportes**
2. En la métrica "Tiempo medio de resolución"
3. Verificar que aparece un valor calculado dinámicamente (en horas)
4. Este valor se calcula solo con incidencias que tienen estado "Cerrado" o "Resuelto"

### Probar Notificaciones

1. El sistema inicia automáticamente el polling al autenticarte
2. Las notificaciones se actualizan cada 30 segundos
3. Si hay nuevas notificaciones, aparecerán como toasts en la esquina inferior derecha

**Para simular notificaciones:**
- En otra sesión, crear una nueva incidencia o agregar un comentario
- Después de máximo 30 segundos, deberías recibir una notificación

---

## 📝 Notas Importantes

### Rendimiento de Ollama

- **Primera consulta**: Puede tardar 5-10 segundos mientras carga el modelo en memoria
- **Consultas siguientes**: Responden en 2-5 segundos
- **Requisitos mínimos**:
  - RAM: 8 GB (16 GB recomendado)
  - Disco: 10 GB libres para modelos
  - CPU: Procesador moderno (4+ núcleos)

### Optimización

Si Ollama es muy lento:
1. Usar un modelo más pequeño: `ollama pull phi`
2. Editar `OllamaServlet.java` línea 27: `DEFAULT_MODEL = "phi"`
3. Recompilar: `mvn compile`

### Configuración de Producción

Para desplegar en producción:

1. **Ollama**: Considerar usar servicio en la nube o servidor dedicado
2. **PDF**: Funciona en navegador, no requiere backend
3. **Notificaciones**: Considerar WebSockets para tiempo real verdadero
4. **Base de Datos**: Configurar pool de conexiones en `ConexionBD.java`

---

## 🆘 Solución de Problemas

### Problema: "Ollama no está ejecutándose"

```powershell
# Verificar si Ollama está activo
curl http://localhost:11434

# Si no responde, iniciarlo:
ollama serve
```

### Problema: "Error al generar PDF"

```powershell
# Reinstalar dependencias
npm uninstall jspdf jspdf-autotable
npm install jspdf jspdf-autotable
```

### Problema: "No se cargan los comentarios"

1. Verificar que el backend esté ejecutándose: `http://localhost:8080/swo`
2. Verificar en la consola del navegador (F12) si hay errores de CORS
3. Comprobar que el servlet está compilado: `mvn compile`

### Problema: "Las notificaciones no aparecen"

1. Abrir consola del navegador (F12)
2. Buscar errores en la pestaña "Console"
3. Verificar que el endpoint responde:
   ```powershell
   curl http://localhost:8080/swo/api/notificaciones?idUsuario=1&desde=0
   ```

---

## 🎯 Comandos Rápidos de Referencia

```powershell
# Iniciar Ollama
ollama serve

# Iniciar backend (Tomcat)
mvn tomcat7:run

# Iniciar frontend (Angular)
ng serve

# Compilar backend
mvn compile

# Compilar frontend
ng build

# Ver logs de Tomcat
tail -f target/tomcat/logs/catalina.out

# Probar endpoint del chatbot
curl -X POST http://localhost:8080/swo/api/ollama -d "mensaje=Hola"
```

---

## 📚 Recursos Adicionales

- **Ollama Documentation**: https://github.com/ollama/ollama/blob/main/README.md
- **jsPDF Documentation**: https://github.com/parallax/jsPDF
- **Angular HttpClient**: https://angular.io/guide/http
- **Maven Tomcat Plugin**: https://tomcat.apache.org/maven-plugin-trunk/

---

## ✅ Checklist de Verificación

Antes de considerar el sistema completo, verificar:

- [ ] Backend compila sin errores: `mvn compile`
- [ ] Frontend compila sin errores: `ng build`
- [ ] MySQL está ejecutándose y base de datos creada
- [ ] Ollama está instalado y ejecutándose en puerto 11434
- [ ] Modelo Llama 2 descargado: `ollama list` muestra `llama2`
- [ ] Dependencias de PDF instaladas: `npm list jspdf`
- [ ] Tomcat ejecutándose en puerto 8080
- [ ] Angular ejecutándose en puerto 4200
- [ ] Endpoint de comentarios funciona: probado en UI
- [ ] Chatbot responde usando Ollama: probado en UI
- [ ] Generación de PDF funciona: PDF descargado correctamente
- [ ] Tiempo promedio de resolución se muestra en Reportes
- [ ] Notificaciones polling iniciado: verificado en consola del navegador

---

¡Felicitaciones! 🎉 El sistema SWO está completamente implementado y listo para usar.
