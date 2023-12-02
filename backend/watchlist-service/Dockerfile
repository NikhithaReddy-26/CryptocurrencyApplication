FROM openjdk:17

WORKDIR /micro-service

COPY target/*.jar app.jar

EXPOSE 8005

CMD [ "java","-jar","app.jar" ]