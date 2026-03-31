FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

WORKDIR /app/ecommerce

RUN chmod +x mvnw
RUN ./mvnw clean install

EXPOSE 8080

CMD ["./mvnw", "spring-boot:run"]