FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
FROM nginx:alpine
COPY --from=0 /app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
