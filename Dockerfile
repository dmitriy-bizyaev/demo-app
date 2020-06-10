FROM alpine:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN mkdir static
ADD package.json /usr/src/app
ADD package-lock.json /usr/src/app
ADD docker-entrypoint.sh /usr/src/app
ADD server/dist /usr/src/app/
ADD frontend/dist /usr/src/app/static/

RUN apk add -U nodejs npm \
    && npm install --production \
    && npm dedupe \
    && rm /var/cache/apk/* \
    && rm -rf /tmp/* \
    && rm -rf /root/..?* /root/.[!.]* /root/*

ENV NODE_ENV=production
ENV STATIC_DIR=static

EXPOSE 80
ENTRYPOINT [ "/bin/sh", "docker-entrypoint.sh" ]
