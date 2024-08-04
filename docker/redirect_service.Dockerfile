FROM node:20.14.0
WORKDIR /var/www/redirect_service
COPY ../services/redirect_service .
RUN npm i -g nodemon
CMD ["npm", "run", "dev"]

