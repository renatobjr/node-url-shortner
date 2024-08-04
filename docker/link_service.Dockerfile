FROM node:20.14.0
WORKDIR /var/www/link_service
COPY ../services/link_service .
RUN npm i -g nodemon
CMD ["npm", "run", "dev"]
