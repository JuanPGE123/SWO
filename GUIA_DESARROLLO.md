# 🚀 Guía de Desarrollo - SWO ServiceDesk

**Fecha:** 19 de abril de 2026  
**Versión:** 2.0.0  
**Stack:** Angular 17 + Java Servlets + MySQL

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- ✅ **Node.js** 18.x o superior
- ✅ **Java JDK** 17 o superior
- ✅ **Maven** 3.8.x o superior
- ✅ **MySQL** 8.0 o superior
- ✅ **Git** 2.x o superior

### Verificar Versiones

```powershell
node --version    # Debe ser v18.x+
npm --version     # Debe ser v9.x+
java -version     # Debe ser 17+
mvn --version     # Debe ser 3.8.x+
mysql --version   # Debe ser 8.0.x+
git --version     # Debe ser 2.x+
```

---

## 🗄️ Configuración de la Base de Datos

### 1. Iniciar MySQL

```powershell
# Iniciar servicio MySQL (si no está corriendo)
net start MySQL80
```

### 2. Crear Base de Datos

```powershell
# Conectar a MySQL
mysql -u root -p

# Ejecutar scripts en orden
mysql> source d:/OneDrive/SENA/PROYECTOS/SWO/java/swo_database.sql
mysql> source d:/OneDrive/SENA/PROYECTOS/SWO/java/datos_prueba.sql
mysql> source d:/OneDrive/SENA/PROYECTOS/SWO/java/chatbot_data.sql
mysql> exit
```

### 3. Verificar Instalación

```sql
mysql -u root -p

USE swo_db;
SHOW TABLES;
SELECT COUNT(*) FROM usuarios;
SELECT COUNT(*) FROM incidencias;
```

**Salida esperada:**
- Tablas: `usuarios`, `incidencias`, `proyectos`, `chatbot_respuestas`, etc.
- Usuarios: 5-10 registros de prueba
- Incidencias: 10-20 registros de prueba

---

## 🔧 Instalación del Proyecto

### 1. Clonar Repositorio (si aplica)

```powershell
git clone <URL_DEL_REPO>
cd SWO
```

### 2. Instalar Dependencias Frontend

```powershell
# Instalar dependencias de Angular
npm install
```

### 3. Instalar Dependencias Backend

```powershell
# Maven descargará automáticamente las dependencias
mvn clean install
```

---

## 🚀 Ejecutar el Proyecto

### Opción 1: Script Automático (Recomendado)

```powershell
# Ejecutar script que inicia todo
.\INICIAR_TODO.bat
```

Este script:
1. ✅ Compila el backend con Maven
2. ✅ Inicia Tomcat en http://localhost:8080/SWO
3. ✅ Inicia Angular en http://localhost:4200
4. ✅ Abre el navegador automáticamente

### Opción 2: Manual (Por Separado)

#### Terminal 1: Backend (Tomcat + Java)

```powershell
# Opción A: Usando Maven Tomcat Plugin
mvn clean package tomcat7:run

# Opción B: Usando Tomcat standalone
mvn clean package
# Copiar target/SWO.war a <TOMCAT_HOME>/webapps/
# Iniciar Tomcat: <TOMCAT_HOME>/bin/startup.bat
```

**Backend corriendo en:** http://localhost:8080/SWO

#### Terminal 2: Frontend (Angular)

```powershell
# Modo desarrollo (hot reload)
npm start

# O explícitamente
ng serve
```

**Frontend corriendo en:** http://localhost:4200

---

## 🌐 URLs del Proyecto

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | http://localhost:4200 | Aplicación Angular |
| **Backend API** | http://localhost:8080/SWO/api | REST API Java Servlets |
| **Login** | http://localhost:4200/auth | Página de login |
| **Dashboard** | http://localhost:4200/dashboard | Panel principal |
| **Incidencias** | http://localhost:4200/incidents | Gestión de incidencias |

---

## 👤 Credenciales de Prueba

### Usuario Administrador (Master)

```
Email: admin@swo.com
Password: 123456
Rol: ADMINISTRADOR
```

### Usuarios de Base de Datos (después de ejecutar datos_prueba.sql)

```
Email: juan.perez@empresa.com
Password: password123
Rol: ANALISTA

Email: maria.garcia@empresa.com
Password: password123
Rol: TECNICO

Email: carlos.lopez@empresa.com
Password: password123
Rol: USUARIO
```

---

## 🛠️ Scripts Disponibles

### Frontend (Angular)

```powershell
# Iniciar servidor de desarrollo
npm start

# Compilar para producción
npm run build:prod

# Ejecutar en modo watch (recompila automáticamente)
npm run watch

# Ejecutar pruebas unitarias
npm test
```

### Backend (Maven)

```powershell
# Limpiar y compilar
mvn clean compile

# Empaquetar WAR
mvn package

# Ejecutar con Tomcat embebido
mvn tomcat7:run

# Limpiar, compilar y ejecutar
mvn clean package tomcat7:run

# Ejecutar solo tests
mvn test

# Instalar en repositorio local
mvn install
```

---

## 📁 Estructura de Archivos

```
SWO/
├── src/                         # Frontend Angular
│   ├── app/
│   │   ├── core/               # Servicios, guards, interceptores
│   │   │   ├── constants/      # app.constants.ts
│   │   │   ├── enums/          # app.enums.ts
│   │   │   ├── interceptors/   # http.interceptor.ts
│   │   │   ├── models/         # models.ts, dtos.ts
│   │   │   └── services/       # auth, incidents, etc.
│   │   ├── features/           # Componentes de página
│   │   │   ├── auth/           # Login
│   │   │   ├── dashboard/      # Panel principal
│   │   │   ├── incidents/      # Gestión incidencias
│   │   │   ├── users/          # Gestión usuarios
│   │   │   └── reports/        # Reportes
│   │   └── shared/             # Componentes reutilizables
│   │       ├── components/     # Button, Input, Modal
│   │       └── validators/     # custom-validators.ts
│   └── assets/                 # Imágenes, estilos
│
├── java/                        # Backend Java
│   ├── src/com/swo/
│   │   ├── controller/         # Servlets
│   │   ├── dao/                # Data Access Objects
│   │   ├── model/              # Entidades
│   │   └── util/               # Utilidades
│   ├── swo_database.sql        # Schema de BD
│   ├── datos_prueba.sql        # Datos de prueba
│   └── chatbot_data.sql        # Datos del chatbot
│
├── webapp/                      # Recursos web (JSP, HTML)
│   ├── WEB-INF/
│   │   └── web.xml             # Configuración Servlet
│   └── jsp/                    # JSP pages
│
├── target/                      # Salida de compilación Maven
│   └── SWO.war                 # Archivo deployable
│
├── pom.xml                      # Configuración Maven
├── package.json                 # Configuración npm
├── angular.json                 # Configuración Angular
├── tsconfig.json                # Configuración TypeScript
├── INICIAR_TODO.bat            # Script de inicio automático
└── GUIA_DESARROLLO.md          # Esta guía
```

---

## 🔍 Verificación del Sistema

### Script de Verificación Automática

```powershell
# Ejecutar script de verificación
mysql -u root -p < java/verificar_sistema.sql
```

### Verificación Manual

#### 1. Verificar Backend

```powershell
# Debe retornar JSON con lista de usuarios
curl http://localhost:8080/SWO/api/usuarios

# Debe retornar JSON con lista de incidencias
curl http://localhost:8080/SWO/api/incidencias
```

#### 2. Verificar Frontend

```powershell
# Abrir en navegador
start http://localhost:4200

# Verificar consola del navegador (F12)
# No debe haber errores 404 o CORS
```

#### 3. Verificar Integración

1. Abrir http://localhost:4200/auth
2. Ingresar: admin@swo.com / 123456
3. Debe redirigir a /dashboard
4. Navegar a /incidents
5. Crear una nueva incidencia
6. Verificar que aparece en la tabla

---

## 🐛 Solución de Problemas

### Error: "Puerto 8080 ya está en uso"

```powershell
# Buscar proceso en puerto 8080
netstat -ano | findstr :8080

# Matar proceso (reemplazar <PID> con el número)
taskkill /PID <PID> /F

# O cambiar puerto en pom.xml:
# <port>8081</port>
```

### Error: "Cannot connect to MySQL"

```powershell
# Verificar que MySQL está corriendo
net start MySQL80

# Si no existe el servicio, iniciar manualmente:
# <MYSQL_HOME>/bin/mysqld --console
```

### Error: "Module not found" en Angular

```powershell
# Limpiar e instalar de nuevo
rm -r node_modules/
rm package-lock.json
npm install
```

### Error: "Maven dependencies not resolved"

```powershell
# Forzar actualización de dependencias
mvn clean install -U

# O eliminar repo local y reinstalar
rm -r ~/.m2/repository/
mvn install
```

### Error: CORS en peticiones HTTP

Verificar que el interceptor está registrado en `app.config.ts`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([httpInterceptor]) // ✅ Debe estar presente
    )
  ]
};
```

### Error: "Token not found" al hacer login

1. Verificar que el backend retorna `token` en LoginResponse
2. Verificar que se guarda en sessionStorage
3. Abrir DevTools → Application → Session Storage
4. Debe existir clave `swo_auth_token`

---

## 📦 Compilar para Producción

### 1. Compilar Frontend

```powershell
# Generar build de producción
npm run build:prod

# Archivos generados en: target/SWO/
# Angular CLI copia automáticamente a webapp/
```

### 2. Compilar Backend

```powershell
# Generar WAR de producción
mvn clean package -Pprod

# WAR generado en: target/SWO.war
```

### 3. Desplegar en Tomcat Standalone

```powershell
# Copiar WAR a Tomcat
copy target\SWO.war C:\apache-tomcat-9.0.xx\webapps\

# Iniciar Tomcat
C:\apache-tomcat-9.0.xx\bin\startup.bat

# Acceder a:
# http://localhost:8080/SWO
```

---

## 🧪 Testing

### Frontend (Angular)

```powershell
# Ejecutar todos los tests
npm test

# Ejecutar con coverage
ng test --code-coverage

# Ver reporte de coverage
start coverage/index.html
```

### Backend (Java)

```powershell
# Ejecutar tests unitarios
mvn test

# Ejecutar tests de integración
mvn verify

# Ver reporte de tests
start target/surefire-reports/index.html
```

---

## 🔐 Seguridad

### Variables de Entorno (Producción)

**NO USAR** credenciales master en producción. Configurar:

```powershell
# Windows
setx DB_HOST "production-db.example.com"
setx DB_USER "swo_user"
setx DB_PASSWORD "secure_password_here"
setx JWT_SECRET "your_jwt_secret_key"

# Linux/Mac
export DB_HOST="production-db.example.com"
export DB_USER="swo_user"
export DB_PASSWORD="secure_password_here"
export JWT_SECRET="your_jwt_secret_key"
```

### Checklist de Seguridad

- [ ] Cambiar credenciales master en `AUTH_CONSTANTS`
- [ ] Configurar JWT secret en producción
- [ ] Habilitar HTTPS
- [ ] Configurar CORS con dominios específicos
- [ ] Deshabilitar logging detallado en producción
- [ ] Actualizar dependencias vulnerables (npm audit, mvn dependency:check)
- [ ] Configurar rate limiting en API
- [ ] Implementar CSP headers

---

## 📚 Documentación Adicional

- [README.md](shared/components/README.md) - Componentes reutilizables
- [custom-validators README](shared/validators/README.md) - Validadores personalizados
- [Angular Docs](https://angular.io/docs) - Documentación oficial de Angular
- [Servlet Docs](https://docs.oracle.com/javaee/7/api/javax/servlet/package-summary.html) - Java Servlet API
- [MySQL Docs](https://dev.mysql.com/doc/) - MySQL Documentation

---

## 🤝 Contribuir

### Workflow de Git

```powershell
# 1. Crear rama para feature
git checkout -b feature/nombre-feature

# 2. Hacer cambios y commits
git add .
git commit -m "feat: descripción del cambio"

# 3. Push a GitHub
git push origin feature/nombre-feature

# 4. Crear Pull Request en GitHub
```

### Convención de Commits

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formateo, punto y coma, etc.
refactor: refactorización de código
test: agregar/modificar tests
chore: tareas de mantenimiento
```

---

## 📞 Soporte

**Equipo:** SWO Development Team  
**Email:** soporte@swo.com  
**Versión:** 2.0.0  
**Última actualización:** 19 de abril de 2026

---

## 📝 Notas Importantes

### Configuración de Proxy (si aplica)

Si el backend corre en un servidor diferente, configurar proxy en Angular:

**proxy.conf.json:**
```json
{
  "/api": {
    "target": "http://localhost:8080/SWO",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

**package.json:**
```json
{
  "scripts": {
    "start": "ng serve --proxy-config proxy.conf.json"
  }
}
```

### Hot Reload en Desarrollo

- ✅ **Frontend:** Angular CLI recarga automáticamente
- ⚠️ **Backend:** Tomcat requiere redeploy manual
  - Opción 1: Reiniciar Tomcat: `Ctrl+C` → `mvn tomcat7:run`
  - Opción 2: Usar JRebel (comercial) para hot reload Java

### Performance

**Desarrollo:**
- Angular en modo dev (source maps habilitados)
- Tomcat con debugging habilitado

**Producción:**
- Angular con AOT compilation (`--configuration production`)
- Minificación y tree-shaking automáticos
- Tomcat en modo producción (sin debug)

---

**¡Listo para desarrollar!** 🚀

Si tienes problemas, revisa la sección de **Solución de Problemas** o contacta al equipo de desarrollo.
