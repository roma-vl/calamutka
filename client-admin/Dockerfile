FROM node:20-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --force
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
