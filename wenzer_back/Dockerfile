# syntax=docker/dockerfile:1

FROM node:16.13.0
WORKDIR /

ENV BASE_URL=localhost:3333
ENV BASE_URL_WEB=localhost:3000

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

EXPOSE 3333

COPY . .

CMD ["npm", "start"]