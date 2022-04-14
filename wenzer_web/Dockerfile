# syntax=docker/dockerfile:1

FROM node:16.13.0

WORKDIR /

ENV REACT_APP_PROTOCOL='http'
ENV REACT_APP_SERVER='localhost'
ENV REACT_APP_PORT='3333'

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

EXPOSE 3000

COPY . . 

CMD ["npm", "start"]