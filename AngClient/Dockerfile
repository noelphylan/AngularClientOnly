
# Stage 1
FROM node:10-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
# Stage 2
FROM nginx:1.17.1-alpine
FROM nginxinc/nginx-unprivileged
#### copy nginx conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/docs /usr/share/nginx/html
#### don't know what this is, but seems cool and techy
CMD ["nginx", "-g", "daemon off;"]



### STAGE 1: Build ###
#FROM node:lts-alpine AS build

#### make the 'app' folder the current working directory
#WORKDIR /usr/src/app

#### copy both 'package.json' and 'package-lock.json' (if available)
#COPY package*.json ./

#### install angular cli
#RUN npm install -g @angular/cli

#### install project dependencies
#RUN npm install

#### copy things
#COPY . .

#### generate build --prod
#RUN npm run build

### STAGE 2: Run ###
#FROM nginxinc/nginx-unprivileged

#### copy nginx conf
#COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

#### copy artifact build from the 'build environment'
#COPY --from=build /usr/src/app/dist/vitorspace/browser /usr/share/nginx/html

#### don't know what this is, but seems cool and techy
#CMD ["nginx", "-g", "daemon off;"]
