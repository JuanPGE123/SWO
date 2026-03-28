@echo off
REM ============================================
REM Script de Despliegue Rápido - SWO
REM Windows Batch (Alternativa simple a PowerShell)
REM ============================================

echo ========================================
echo   Despliegue Rapido - Sistema SWO
echo ========================================
echo.

REM ============================================
REM CONFIGURACION - CAMBIAR ESTAS RUTAS
REM ============================================
set TOMCAT_HOME=C:\apache-tomcat-9.0.XX
set MYSQL_USER=root
set MYSQL_PASSWORD=

echo [1/5] Configurando Base de Datos...
echo.

REM Ejecutar script SQL
if "%MYSQL_PASSWORD%"=="" (
    mysql -u %MYSQL_USER% < "java\swo_database.sql"
) else (
    mysql -u %MYSQL_USER% -p%MYSQL_PASSWORD% < "java\swo_database.sql"
)

if errorlevel 1 (
    echo ERROR: No se pudo crear la base de datos
    echo Verifica que MySQL este corriendo
    pause
    exit /b 1
)

echo   OK - Base de datos creada
echo.

echo [2/5] Insertando datos de prueba...
if "%MYSQL_PASSWORD%"=="" (
    mysql -u %MYSQL_USER% < "java\datos_prueba.sql"
) else (
    mysql -u %MYSQL_USER% -p%MYSQL_PASSWORD% < "java\datos_prueba.sql"
)
echo   OK - Datos de prueba insertados
echo.

echo [3/5] Verificando estructura del proyecto...
if not exist "webapp\WEB-INF\lib" mkdir "webapp\WEB-INF\lib"
if not exist "webapp\WEB-INF\classes" mkdir "webapp\WEB-INF\classes"
echo   OK - Directorios verificados
echo.

echo [4/5] Copiando aplicacion a Tomcat...
if not exist "%TOMCAT_HOME%" (
    echo ERROR: Tomcat no encontrado en: %TOMCAT_HOME%
    echo Actualiza la variable TOMCAT_HOME en este script
    pause
    exit /b 1
)

REM Eliminar despliegue anterior si existe
if exist "%TOMCAT_HOME%\webapps\SWO" (
    rmdir /s /q "%TOMCAT_HOME%\webapps\SWO"
)

REM Copiar webapp
xcopy /E /I /Y "webapp" "%TOMCAT_HOME%\webapps\SWO"
echo   OK - Aplicacion copiada
echo.

echo [5/5] Iniciando Tomcat...

REM Iniciar Tomcat
cd /d "%TOMCAT_HOME%\bin"
call startup.bat

echo.
echo ========================================
echo   Despliegue completado!
echo ========================================
echo.
echo Accede a la aplicacion en:
echo   http://localhost:8080/SWO/
echo.
echo Esperando 15 segundos...
timeout /t 15 /nobreak >nul

REM Abrir navegador
start http://localhost:8080/SWO/

echo.
echo Para ver los logs:
echo   %TOMCAT_HOME%\logs\catalina.out
echo.
pause
