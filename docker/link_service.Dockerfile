FROM node:20.14.0
WORKDIR /var/www/link-service
COPY ../services/link-service .
RUN npm i -g nodemon
CMD ["npm", "run", "dev"]
