# ============================================
# Script de Despliegue Automatizado - SWO
# Windows PowerShell
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Despliegue Automatizado - Sistema SWO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Variables de configuración
$TOMCAT_HOME = "C:\apache-tomcat-9.0.XX"  # Cambiar por tu ruta de Tomcat
$MYSQL_USER = "root"
$MYSQL_PASSWORD = ""  # Cambiar por tu contraseña
$PROJECT_DIR = $PSScriptRoot

Write-Host "[1/6] Verificando requisitos..." -ForegroundColor Yellow

# Verificar Java
try {
    $javaVersion = java -version 2>&1 | Select-String "version"
    Write-Host "  ✓ Java encontrado: $javaVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Java no encontrado. Instala JDK 8 o superior" -ForegroundColor Red
    exit 1
}

# Verificar Maven
try {
    $mavenVersion = mvn -version 2>&1 | Select-String "Apache Maven"
    Write-Host "  ✓ Maven encontrado: $mavenVersion" -ForegroundColor Green
    $useMaven = $true
} catch {
    Write-Host "  ! Maven no encontrado. Se compilará manualmente" -ForegroundColor Yellow
    $useMaven = $false
}

# Verificar MySQL
try {
    $mysqlVersion = mysql --version 2>&1
    Write-Host "  ✓ MySQL encontrado" -ForegroundColor Green
} catch {
    Write-Host "  ✗ MySQL no encontrado. Verifica la instalación" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[2/6] Configurando Base de Datos..." -ForegroundColor Yellow

# Ejecutar script SQL
try {
    if ($MYSQL_PASSWORD -eq "") {
        mysql -u $MYSQL_USER < "$PROJECT_DIR\java\swo_database.sql"
    } else {
        mysql -u $MYSQL_USER -p$MYSQL_PASSWORD < "$PROJECT_DIR\java\swo_database.sql"
    }
    Write-Host "  ✓ Base de datos 'swo_db' creada exitosamente" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Error al crear la base de datos" -ForegroundColor Red
    Write-Host "  Ejecuta manualmente: mysql -u $MYSQL_USER -p < java\swo_database.sql" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[3/6] Compilando proyecto..." -ForegroundColor Yellow

if ($useMaven) {
    # Compilar con Maven
    Write-Host "  Compilando con Maven..." -ForegroundColor Cyan
    mvn clean package -DskipTests
    
    if (Test-Path "$PROJECT_DIR\target\SWO.war") {
        Write-Host "  ✓ Archivo WAR generado: target\SWO.war" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Error al generar WAR" -ForegroundColor Red
        exit 1
    }
} else {
    # Compilación manual
    Write-Host "  Compilando manualmente..." -ForegroundColor Cyan
    
    # Crear directorio de clases
    if (!(Test-Path "$PROJECT_DIR\webapp\WEB-INF\classes")) {
        New-Item -ItemType Directory -Path "$PROJECT_DIR\webapp\WEB-INF\classes" -Force | Out-Null
    }
    
    # Compilar archivos Java
    $javaFiles = Get-ChildItem -Path "$PROJECT_DIR\java\src" -Filter "*.java" -Recurse
    $classpath = "$TOMCAT_HOME\lib\servlet-api.jar;$PROJECT_DIR\webapp\WEB-INF\lib\*"
    
    javac -d "$PROJECT_DIR\webapp\WEB-INF\classes" -cp $classpath $javaFiles.FullName
    
    Write-Host "  ✓ Clases compiladas en webapp\WEB-INF\classes" -ForegroundColor Green
}

Write-Host ""
Write-Host "[4/6] Verificando librerías..." -ForegroundColor Yellow

# Verificar mysql-connector
if (!(Test-Path "$PROJECT_DIR\webapp\WEB-INF\lib\mysql-connector-*.jar")) {
    Write-Host "  ! mysql-connector-java.jar no encontrado" -ForegroundColor Yellow
    Write-Host "  Descárgalo de: https://dev.mysql.com/downloads/connector/j/" -ForegroundColor Yellow
    Write-Host "  Y colócalo en: webapp\WEB-INF\lib\" -ForegroundColor Yellow
} else {
    Write-Host "  ✓ mysql-connector-java.jar encontrado" -ForegroundColor Green
}

Write-Host ""
Write-Host "[5/6] Desplegando en Tomcat..." -ForegroundColor Yellow

# Verificar si Tomcat existe
if (!(Test-Path $TOMCAT_HOME)) {
    Write-Host "  ✗ Tomcat no encontrado en: $TOMCAT_HOME" -ForegroundColor Red
    Write-Host "  Actualiza la variable TOMCAT_HOME en este script" -ForegroundColor Yellow
    exit 1
}

# Copiar aplicación a Tomcat
if ($useMaven -and (Test-Path "$PROJECT_DIR\target\SWO.war")) {
    # Copiar archivo WAR
    Copy-Item "$PROJECT_DIR\target\SWO.war" "$TOMCAT_HOME\webapps\" -Force
    Write-Host "  ✓ SWO.war copiado a Tomcat" -ForegroundColor Green
} else {
    # Copiar carpeta webapp
    if (Test-Path "$TOMCAT_HOME\webapps\SWO") {
        Remove-Item "$TOMCAT_HOME\webapps\SWO" -Recurse -Force
    }
    Copy-Item "$PROJECT_DIR\webapp" "$TOMCAT_HOME\webapps\SWO" -Recurse -Force
    Write-Host "  ✓ Carpeta webapp copiada a Tomcat\webapps\SWO" -ForegroundColor Green
}

Write-Host ""
Write-Host "[6/6] Iniciando Tomcat..." -ForegroundColor Yellow

# Detener Tomcat si está corriendo
$tomcatProcess = Get-Process -Name "java" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*tomcat*" }
if ($tomcatProcess) {
    Write-Host "  Deteniendo Tomcat existente..." -ForegroundColor Cyan
    & "$TOMCAT_HOME\bin\shutdown.bat"
    Start-Sleep -Seconds 5
}

# Iniciar Tomcat
Write-Host "  Iniciando Tomcat..." -ForegroundColor Cyan
Start-Process "$TOMCAT_HOME\bin\startup.bat"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✓ Despliegue completado exitosamente" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Accede a la aplicación en:" -ForegroundColor Cyan
Write-Host "  http://localhost:8080/SWO/" -ForegroundColor White
Write-Host ""
Write-Host "Esperando 15 segundos para que Tomcat inicie..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Abrir navegador
Write-Host "Abriendo navegador..." -ForegroundColor Cyan
Start-Process "http://localhost:8080/SWO/"

Write-Host ""
Write-Host "Para ver los logs de Tomcat:" -ForegroundColor Yellow
Write-Host "  $TOMCAT_HOME\logs\catalina.out" -ForegroundColor White
Write-Host ""
