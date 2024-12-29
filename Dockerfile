### STAGE 1: BUILD ###
FROM node:lts-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

### STAGE 2: RUN ###
FROM nginx:latest AS ngi
# Copy the built files from Angular (now in dist/dine-flow/browser/)
COPY --from=build /app/dist/dine-flow/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80