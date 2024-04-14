
FROM node:18

WORKDIR /app

COPY . /app

RUN npm i -g nodemon


# RUN npm install @nestjs/common

# RUN npm install @nestjs/core

# RUN npm i reflect-metadata

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main" ]









