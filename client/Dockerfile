FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN #npm install --force
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
