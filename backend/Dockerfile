# Dockerfile (compatible Mac M1/M2/M3 + Intel)
FROM maven:3.9.9-eclipse-temurin-17 AS builder

WORKDIR /app
COPY pom.xml .
COPY src ./src

# Build du JAR (ignore les tests pour accélérer)
RUN mvn clean package -DskipTests

# Stage runtime - Image compatible ARM64 + AMD64
FROM eclipse-temurin:17-jre

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
