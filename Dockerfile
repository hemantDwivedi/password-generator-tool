FROM maven

WORKDIR /app/

COPY pom.xml ./
COPY src ./src

RUN mvn package


FROM openjdk

COPY target/*.jar ./javaapp.jar

ENTRYPOINT [ "java", "-jar", "/javaapp.jar" ]