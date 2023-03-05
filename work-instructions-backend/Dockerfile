# syntax=docker/dockerfile:1
FROM node:lts-bullseye

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run-script", "dev"]