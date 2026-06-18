# ─────────────────────────────────────────────────────
# STAGE 1: Build con Maven
# Build context = raíz del repo (Railway)
# El backend está en el subdirectorio backend/
# ─────────────────────────────────────────────────────
FROM maven:3.9.4-eclipse-temurin-17-alpine AS build

WORKDIR /app

COPY backend/pom.xml .
RUN mvn dependency:go-offline -q

COPY backend/src ./src
RUN mvn clean package -Dmaven.test.skip=true -Djacoco.skip=true \
    && echo "=== JARs generados ===" \
    && ls -la target/*.jar

# ─────────────────────────────────────────────────────
# STAGE 2: Runtime mínimo
# ─────────────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8080

ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-jar", "app.jar"]
