# Stage 1: Build React App
FROM node:latest AS build

WORKDIR /app

COPY package*.json /
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve React App with Nginx
FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
