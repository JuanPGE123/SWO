# ─────────────────────────────────────────────────────
# STAGE 1: Build con Maven
# ─────────────────────────────────────────────────────
FROM maven:3.9.4-eclipse-temurin-17-alpine AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -q

COPY src ./src
RUN mvn clean package -Dmaven.test.skip=true -Djacoco.skip=true

# ─────────────────────────────────────────────────────
# STAGE 2: Runtime mínimo
# ─────────────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=build /app/target/swo-api-1.0.0.jar app.jar

ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8080

ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-jar", "app.jar"]
