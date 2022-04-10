# Stage 1: Build an Ionic Docker Image
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install -g ionic
RUN npm ci
COPY ./ /app/
RUN npm run build --prod
#sync capacitor
RUN npx cap sync
# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY nginx-custom.conf /etc/nginx/
EXPOSE 8080
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/
#TODO save apk artifact