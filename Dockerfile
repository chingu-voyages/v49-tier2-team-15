# Build Project
FROM node:iron-alpine3.20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

RUN npm run build

# Serve the app with Nginx
FROM nginx:stable-alpine3.19-perl

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
