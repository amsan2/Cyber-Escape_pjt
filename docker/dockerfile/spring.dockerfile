
FROM openjdk:21
ENV TZ Asia/Seoul
ENV APP_HOME=/app
WORKDIR $APP_HOME

COPY ./escape-be/build/libs/escape.jar .

COPY docker/wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh
# RUN dos2unix /wait-for-it.sh

# 컨테이너를 구동할 때 실행할 명령어 지정(명렁어를 스페이스로 나눈것과 같다)
ENTRYPOINT ["/wait-for-it.sh","mysql:3307", "--", "java", "-jar", "escape.jar", "--spring.config.additional-location=classpath:/config-dev.yml"]