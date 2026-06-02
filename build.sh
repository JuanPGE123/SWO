#!/bin/bash
################################################################################
# BUILD SCRIPT MAESTRO - SWO (Linux / macOS)
################################################################################
#
# Propósito: Compilar Frontend y Backend en una sola ejecución
# Uso: ./build.sh [prod|dev|test|docker]
#
# Ejemplos:
#   ./build.sh dev        - Compilar para desarrollo
#   ./build.sh prod       - Compilar para producción (optimizado)
#   ./build.sh test       - Compilar + ejecutar tests con cobertura
#   ./build.sh docker     - Compilar con Docker
#
################################################################################

set -e  # Salir ante cualquier error

################################################################################
# COLORES Y ESTILOS
################################################################################

# ANSI Color Codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'  # No Color

# Funciones de output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓ SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗ ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[⚠ WARNING]${NC} $1"
}

print_header() {
    echo ""
    echo "════════════════════════════════════════════════════════════════════"
    echo "  $1"
    echo "════════════════════════════════════════════════════════════════════"
    echo ""
}

################################################################################
# VARIABLES GLOBALES
################################################################################

BUILD_MODE="${1:-dev}"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="${PROJECT_ROOT}/backend"
FRONTEND_DIR="${PROJECT_ROOT}"
LOGS_DIR="${PROJECT_ROOT}/logs"
DIST_DIR="${PROJECT_ROOT}/dist"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Crear directorios
mkdir -p "${LOGS_DIR}" "${DIST_DIR}"

################################################################################
# VALIDACIÓN DE REQUISITOS
################################################################################

validate_requirements() {
    print_info "Validando requisitos del sistema..."
    echo ""

    # Verificar Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js no está instalado"
        echo "  Descargar de: https://nodejs.org/"
        exit 1
    fi
    NODE_VERSION=$(node --version)
    echo "  ✓ Node.js: ${NODE_VERSION}"

    # Verificar npm
    if ! command -v npm &> /dev/null; then
        print_error "npm no está instalado"
        exit 1
    fi
    NPM_VERSION=$(npm --version)
    echo "  ✓ npm: ${NPM_VERSION}"

    # Verificar Java 17+
    if ! command -v java &> /dev/null; then
        print_error "Java no está instalado (Requerido: Java 17+)"
        exit 1
    fi
    JAVA_VERSION=$(java -version 2>&1 | grep -oP 'version "\K[0-9]+' | head -1)
    if [ "$JAVA_VERSION" -lt 17 ]; then
        print_error "Se requiere Java 17 o superior. Version actual: ${JAVA_VERSION}"
        exit 1
    fi
    echo "  ✓ Java: ${JAVA_VERSION}"

    # Verificar Maven
    if ! command -v mvn &> /dev/null; then
        print_error "Maven no está instalado"
        echo "  Opción 1: Descargar de https://maven.apache.org/download.cgi"
        echo "  Opción 2: Usar './mvnw' (Maven Wrapper incluido)"
        exit 1
    fi
    MAVEN_VERSION=$(mvn -v 2>&1 | grep -oP 'Apache Maven \K[0-9]+\.[0-9]+\.[0-9]+')
    echo "  ✓ Maven: ${MAVEN_VERSION}"

    print_success "Todos los requisitos validados"
    echo ""
}

################################################################################
# COMPILAR FRONTEND
################################################################################

build_frontend() {
    local mode=$1
    print_header "FASE 1/4: Compilar Frontend (${mode})"

    cd "${FRONTEND_DIR}"

    # Limpiar si es necesario
    if [ "${mode}" = "clean" ]; then
        print_warning "Limpiando node_modules..."
        rm -rf node_modules package-lock.json
    fi

    print_info "Instalando dependencias..."
    npm install --legacy-peer-deps >> "${LOGS_DIR}/frontend-install-${TIMESTAMP}.log" 2>&1

    if [ "${mode}" = "prod" ]; then
        print_info "Compilando para PRODUCCIÓN (con optimizaciones)..."
        npm run build:prod >> "${LOGS_DIR}/frontend-build-${TIMESTAMP}.log" 2>&1
    elif [ "${mode}" = "test" ]; then
        print_info "Ejecutando tests de cobertura..."
        npm run test:coverage >> "${LOGS_DIR}/frontend-test-${TIMESTAMP}.log" 2>&1
    else
        print_info "Compilando para DESARROLLO..."
        npm run build >> "${LOGS_DIR}/frontend-build-${TIMESTAMP}.log" 2>&1
    fi

    if [ ! -d "${FRONTEND_DIR}/dist" ]; then
        print_error "Frontend: dist no fue creado"
        tail -20 "${LOGS_DIR}/frontend-build-${TIMESTAMP}.log"
        exit 1
    fi

    local file_count=$(find dist -type f | wc -l)
    print_success "Frontend compilado exitosamente"
    echo "  - Archivos generados: ${file_count}"
    echo ""
}

################################################################################
# COMPILAR BACKEND
################################################################################

build_backend() {
    local mode=$1
    print_header "FASE 3/4: Compilar Backend (${mode})"

    cd "${BACKEND_DIR}"

    local log_file="${LOGS_DIR}/backend-build-${TIMESTAMP}.log"
    local maven_cmd="mvn clean package"

    case "${mode}" in
        prod)
            print_info "Compilando para PRODUCCIÓN (sin tests)..."
            maven_cmd="${maven_cmd} -DskipTests -Pprod"
            ;;
        test)
            print_info "Compilando con cobertura (80% mínimo)..."
            maven_cmd="${maven_cmd} -Ptest-coverage"
            ;;
        *)
            print_info "Compilando para DESARROLLO..."
            maven_cmd="${maven_cmd} -DskipTests -Pdev"
            ;;
    esac

    print_info "Ejecutando Maven: ${maven_cmd}"
    eval "${maven_cmd}" >> "${log_file}" 2>&1

    if [ ! -f "${BACKEND_DIR}/target/swo-api-1.0.0.jar" ]; then
        print_error "Backend: JAR no fue generado"
        tail -50 "${log_file}"
        exit 1
    fi

    local jar_size=$(du -h "${BACKEND_DIR}/target/swo-api-1.0.0.jar" | cut -f1)
    print_success "Backend compilado exitosamente"
    echo "  - JAR: target/swo-api-1.0.0.jar"
    echo "  - Tamaño: ${jar_size}"

    # Verificar cobertura si está en modo test
    if [ "${mode}" = "test" ] && [ -f "${BACKEND_DIR}/target/site/jacoco/index.html" ]; then
        echo "  - Reporte de cobertura: target/site/jacoco/index.html"
    fi
    echo ""
}

################################################################################
# COMPILAR CON DOCKER
################################################################################

build_docker() {
    print_header "FASE 4/4: Compilar imagen Docker"

    if ! command -v docker &> /dev/null; then
        print_error "Docker no está instalado"
        exit 1
    fi

    cd "${PROJECT_ROOT}"

    print_info "Compilando imagen Docker..."
    docker build -t swo:latest -f Dockerfile . >> "${LOGS_DIR}/docker-build-${TIMESTAMP}.log" 2>&1

    print_success "Imagen Docker compilada exitosamente"
    echo "  - Tag: swo:latest"
    echo "  - Usar: docker run -p 8080:8080 -p 80:80 swo:latest"
    echo ""
}

################################################################################
# VERIFICAR ARTEFACTOS
################################################################################

verify_artifacts() {
    print_header "Verificando artefactos generados"

    # Frontend
    if [ -d "${FRONTEND_DIR}/dist/swo-servicedesk" ]; then
        echo "${GREEN}✓${NC} Frontend:        ${FRONTEND_DIR}/dist/swo-servicedesk/"
    else
        echo "${RED}✗${NC} Frontend:        No encontrado"
    fi

    # Backend
    if [ -f "${BACKEND_DIR}/target/swo-api-1.0.0.jar" ]; then
        echo "${GREEN}✓${NC} Backend:         ${BACKEND_DIR}/target/swo-api-1.0.0.jar"
    else
        echo "${RED}✗${NC} Backend:         No encontrado"
    fi

    # Logs
    echo "${GREEN}✓${NC} Logs:            ${LOGS_DIR}/"
    echo ""
}

################################################################################
# MOSTRAR PRÓXIMOS PASOS
################################################################################

next_steps() {
    local mode=$1
    print_header "Próximos pasos"

    case "${mode}" in
        prod)
            echo "1. Desplegar Frontend:"
            echo "   cp -r dist/swo-servicedesk/* /var/www/swo/"
            echo ""
            echo "2. Desplegar Backend:"
            echo "   cp backend/target/swo-api-1.0.0.jar /opt/swo/"
            echo "   java -jar /opt/swo/swo-api-1.0.0.jar"
            echo ""
            ;;
        docker)
            echo "1. Iniciar contenedor:"
            echo "   docker run -d -p 80:80 -p 8080:8080 \\"
            echo "     -e DB_HOST=db -e DB_USER=swo_prod \\"
            echo "     -e DB_PASSWORD=mypassword swo:latest"
            echo ""
            echo "2. O usar Docker Compose:"
            echo "   docker-compose up -d"
            echo ""
            ;;
        test)
            echo "1. Ver reportes de cobertura:"
            echo "   Backend:  open backend/target/site/jacoco/index.html"
            echo "   Frontend: open coverage/index.html"
            echo ""
            ;;
        *)
            echo "1. Frontend Dev Server:"
            echo "   npm start"
            echo "   URL: http://localhost:4200"
            echo ""
            echo "2. Backend Dev Server:"
            echo "   cd backend"
            echo "   mvn spring-boot:run -Dspring-boot.run.arguments='--spring.profiles.active=dev'"
            echo "   URL: http://localhost:8080/api"
            echo ""
            echo "3. Base de datos MySQL:"
            echo "   mysql -u root -p swo_dev < java/swo_database.sql"
            echo ""
            ;;
    esac

    echo "📚 Documentación: README.md"
    echo "📋 Logs: ${LOGS_DIR}/"
}

################################################################################
# MAIN
################################################################################

main() {
    print_header "🚀 SWO BUILD SYSTEM (Linux/macOS)"
    echo "Modo:                 ${BUILD_MODE}"
    echo "Timestamp:            ${TIMESTAMP}"
    echo "Ruta del proyecto:    ${PROJECT_ROOT}"
    echo ""

    # Validar
    validate_requirements

    # Construir
    case "${BUILD_MODE}" in
        prod)
            build_frontend "prod"
            build_backend "prod"
            ;;
        test)
            build_frontend "test"
            build_backend "test"
            ;;
        docker)
            build_frontend "prod"
            build_backend "prod"
            build_docker
            ;;
        clean)
            print_warning "Limpiando todo..."
            rm -rf "${FRONTEND_DIR}/dist" "${BACKEND_DIR}/target" node_modules
            print_success "Limpieza completada"
            ;;
        *)
            build_frontend "dev"
            build_backend "dev"
            ;;
    esac

    # Verificar y reportar
    verify_artifacts
    next_steps "${BUILD_MODE}"

    print_header "✅ COMPILACIÓN COMPLETADA EXITOSAMENTE"
}

# Ejecutar main
main
