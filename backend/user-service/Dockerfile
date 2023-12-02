FROM openjdk:17

WORKDIR /micro-service

COPY target/*.jar app.jar

EXPOSE 8001

CMD [ "java","-jar","app.jar" ]