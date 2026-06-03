# ─────────────────────────────────────────────────────
# STAGE 1: Build con Maven
# ─────────────────────────────────────────────────────
FROM maven:3.9.4-eclipse-temurin-17-alpine AS build

WORKDIR /app

COPY backend/pom.xml .
RUN mvn dependency:go-offline -q

COPY backend/src ./src
RUN mvn clean package -DskipTests -q

# ─────────────────────────────────────────────────────
# STAGE 2: Runtime mínimo
# ─────────────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=build /app/target/swo-api-1.0.0.jar app.jar

ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
