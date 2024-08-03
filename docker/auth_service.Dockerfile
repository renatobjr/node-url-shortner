FROM node:20.14.0
WORKDIR /var/www/auth-service
COPY ../services/auth-service .
RUN npm i -g nodemon
CMD ["npm", "run", "dev"]
