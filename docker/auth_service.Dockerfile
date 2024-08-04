FROM node:20.14.0
WORKDIR /var/www/auth_service
COPY ../services/auth_service .
RUN npm i -g nodemon
CMD ["npm", "run", "dev"]
