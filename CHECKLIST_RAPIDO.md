# ✅ CHECKLIST RÁPIDO DE DESPLIEGUE Y PRUEBAS

## 🚀 DESPLIEGUE EN 5 MINUTOS

### Opción A: Script Automatizado (Más Fácil)

1. **Editar `deploy.bat`** y cambiar:
   ```batch
   set TOMCAT_HOME=C:\ruta\a\tu\tomcat
   set MYSQL_PASSWORD=tu_password
   ```

2. **Ejecutar**:
   ```bash
   deploy.bat
   ```

3. **¡Listo!** El navegador se abrirá automáticamente

---

### Opción B: Manual (Más Control)

```bash
# 1. Base de Datos
mysql -u root -p < java\swo_database.sql
mysql -u root -p < java\datos_prueba.sql

# 2. Compilar (si usas Maven)
mvn clean package

# 3. Desplegar
xcopy /E /I webapp C:\tomcat\webapps\SWO

# 4. Iniciar
C:\tomcat\bin\startup.bat

# 5. Abrir navegador
# http://localhost:8080/SWO/
```

---

## ✅ 10 PRUEBAS ESENCIALES

### 1️⃣ Página Principal
- [ ] Ir a: `http://localhost:8080/SWO/`
- [ ] Debe mostrar 6 tarjetas de menú
- [ ] Diseño con gradiente morado

### 2️⃣ Verificar Base de Datos
```sql
mysql -u root -p < java\verificar_sistema.sql
```
- [ ] 5 usuarios creados
- [ ] 15 incidencias creadas
- [ ] Sin errores SQL

### 3️⃣ Crear Incidencia
- [ ] Ir a: `http://localhost:8080/SWO/registroIncidencia.html`
- [ ] Llenar formulario
- [ ] Clic "Registrar"
- [ ] Debe redirigir y mostrar en lista

### 4️⃣ Ver Incidencias
- [ ] Ir a: `http://localhost:8080/SWO/IncidenciaServlet`
- [ ] Muestra tabla con datos
- [ ] Estadísticas correctas (4 tarjetas arriba)
- [ ] Estados con colores

### 5️⃣ Crear Usuario
- [ ] Ir a: `http://localhost:8080/SWO/registroUsuario.html`
- [ ] Datos de prueba:
  ```
  Nombre: Test Usuario
  Email: test@test.com
  Password: test123
  Rol: Usuario
  ```
- [ ] Debe registrar y mostrar en lista

### 6️⃣ Ver Usuarios
- [ ] Ir a: `http://localhost:8080/SWO/UsuarioServlet`
- [ ] Muestra todos los usuarios
- [ ] Badges de roles con colores

### 7️⃣ Ver Reportes
- [ ] Ir a: `http://localhost:8080/SWO/ReporteServlet`
- [ ] 4 tarjetas de estadísticas
- [ ] Barras de progreso
- [ ] Porcentajes correctos

### 8️⃣ Probar Chatbot
- [ ] Ir a: `http://localhost:8080/SWO/ChatbotServlet`
- [ ] Escribir: "Hola"
- [ ] Debe responder con saludo
- [ ] Escribir: "¿Cuántas incidencias hay?"
- [ ] Debe responder con números

### 9️⃣ Login
- [ ] Ir a: `http://localhost:8080/SWO/login.html`
- [ ] Credenciales:
  ```
  Email: admin@swo.com
  Password: admin123
  ```
- [ ] Debe iniciar sesión

### 🔟 Navegación
- [ ] Todos los enlaces del menú funcionan
- [ ] Sin errores 404
- [ ] Volver al inicio funciona

---

## 🐛 PROBLEMAS COMUNES Y SOLUCIONES RÁPIDAS

### ❌ Error 404 - No encuentra la página

**Solución**:
```bash
# Verificar que está desplegado
dir C:\tomcat\webapps\SWO

# Si no está, copiar de nuevo
xcopy /E /I webapp C:\tomcat\webapps\SWO
```

---

### ❌ Error 500 - Internal Server Error

**Solución**:
```bash
# Ver logs de Tomcat
type C:\tomcat\logs\catalina.out

# Buscar líneas con "Error" o "Exception"
```

**Causas comunes**:
1. Falta `mysql-connector.jar` en `webapp\WEB-INF\lib\`
2. Credenciales incorrectas en `ConexionBD.java`
3. MySQL no está corriendo

---

### ❌ No se conecta a la base de datos

**Verificar MySQL**:
```bash
# Probar conexión
mysql -u root -p

# Ver bases de datos
SHOW DATABASES;

# Debe aparecer "swo_db"
```

**Verificar ConexionBD.java**:
- Usuario correcto
- Contraseña correcta
- URL correcta: `jdbc:mysql://localhost:3306/swo_db`

---

### ❌ Página en blanco

**Abrir consola del navegador** (F12):
- Tab "Console" → Ver errores JavaScript
- Tab "Network" → Ver qué recursos fallan

---

## 📊 DATOS CORRECTOS DESPUÉS DE DESPLIEGUE

### Base de Datos:
```
✅ 5 usuarios de prueba
✅ 15 incidencias de prueba
✅ Distribución por estado:
   - ~5 Abiertas
   - ~5 En Progreso
   - ~5 Cerradas
```

### Aplicación Web:
```
✅ 6 páginas HTML
✅ 4 páginas JSP
✅ 4 Servlets
✅ Todas las funcionalidades operativas
```

---

## 🎯 VERIFICACIÓN FINAL - LISTA CORTA

Tu sistema está **100% funcional** si puedes:

- ✅ Ver la página principal
- ✅ Crear una incidencia nueva
- ✅ Ver la lista de incidencias
- ✅ Ver los reportes con gráficos
- ✅ Chatbot responde correctamente
- ✅ Login funciona con admin@swo.com

---

## 📞 AYUDA RÁPIDA

### Ver Logs en Tiempo Real:
```bash
# PowerShell
Get-Content C:\tomcat\logs\catalina.out -Wait -Tail 50
```

### Reiniciar Tomcat:
```bash
C:\tomcat\bin\shutdown.bat
timeout /t 5
C:\tomcat\bin\startup.bat
```

### Verificar Puerto 8080:
```bash
netstat -ano | findstr :8080
```

---

## 🎓 CREDENCIALES DE PRUEBA

### Login - Administrador:
```
Email: admin@swo.com
Password: admin123
Rol: Administrador
```

### Login - Técnico:
```
Email: maria@swo.com
Password: maria123
Rol: Técnico
```

### Login - Usuario:
```
Email: carlos@swo.com
Password: carlos123
Rol: Usuario
```

---

## 🚀 SIGUIENTE PASO

Después de verificar que todo funciona:

1. **Documentar** cualquier cambio de configuración
2. **Hacer backup** de la base de datos
3. **Personalizar** según tus necesidades
4. **Agregar más datos** de prueba si necesitas

---

**¡Sistema SWO desplegado y probado!** ✅

Para más detalles, consulta [GUIA_PRUEBAS.md](GUIA_PRUEBAS.md)
