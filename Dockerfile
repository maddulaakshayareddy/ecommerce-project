FROM openjdk:17-jdk-slim

WORKDIR /app

COPY . .

WORKDIR /app/ecommerce

RUN chmod +x mvnw
RUN ./mvnw clean install

EXPOSE 8080

CMD ["./mvnw", "spring-boot:run"]