FROM node:20.14.0
WORKDIR /var/www/redirect-service
COPY ../services/redirect-service .
RUN npm i -g nodemon
CMD ["npm", "run", "dev"]

