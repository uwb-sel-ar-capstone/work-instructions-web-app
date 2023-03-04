# syntax=docker/dockerfile:1
FROM node:lts-bullseye

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

# Copies files from local directory to app
COPY . .

EXPOSE 3000

CMD ["npm","start"]