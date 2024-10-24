FROM node:20-alpine
RUN npm install -g nodemon

RUN mkdir -p ./app/node_modules && chown -R node:node /app && chmod 777 ./app/node_modules

WORKDIR /app

COPY package*.json ./

RUN npm install

USER node

COPY --chown=node:node . .
EXPOSE 4000
CMD ["npm", "run", "dev"]
