FROM node:10-alpine

WORKDIR /app

COPY build /app

RUN npm install -g serve

CMD serve -l $PORT