FROM node:lts-alpine
FROM node:lts-alpine

WORKDIR /app


COPY package*.json ./
COPY package*.json ./


RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD [ "npm", "run","start:dev" ]
