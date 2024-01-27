FROM openjdk
MAINTAINER hemant

WORKDIR /cli
COPY . /cli
RUN javac PasswordGeneratorCli.java
CMD ["java", "PasswordGeneratorCli"]