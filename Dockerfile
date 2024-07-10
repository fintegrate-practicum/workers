FROM node:lts-alpine

WORKDIR /app


COPY package*.json ./


RUN npm install


RUN npm run build

EXPOSE 3001

CMD [ "npm", "run","start:dev" ]