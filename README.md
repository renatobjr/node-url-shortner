## Badges

![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)
![Static Badge](https://img.shields.io/badge/Node-20.14.0-056F00)
![Static Badge](https://img.shields.io/badge/Docker_Compose-2-blue)
![Static Badge](https://img.shields.io/badge/Jest-29.7.0-red)
![Static Badge](https://img.shields.io/badge/Swagger-5.0.1-6A9501)
![Static Badge](https://img.shields.io/badge/Knex-3.1.0-874523)

# Node Shortner Url

## Description

A simple microservice app to manage and short URL's. The system is architected with the following services:

1. Auth Service: responsible for authentication and creation of new users including token verification, running on:

```bash
  http://localhost:3000
```

2. Link Service: responsible for processing and shortening links, including allowing creation for all users and updating, listing and deletion for logged in users, running on:

```bash
  http://localhost:3001
```

3. Redirect Service: Responsible for redirecting shortened links to the original URL, including counting access, running on:

```bash
  http://localhost:3002
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/renatobjr/node-url-shortner
```

Go to the project directory

```bash
  cd node-url-shortner
```

For fisrt time running the follow the instructions:

- Update/create your envs files on root directory project:

```bash
mkdir /envs
```

These files are responsible for injecting variables of type env for each service executed. For each service it is necessary to create configuration files according to the following examples, remenber to check the right filename section `env_file` on `docker-compose.yml`:

- `.env_auth`

```bash
NODE_PORT=3000
BASE_URL=/api/v1/auth
```

- `.env_link`

```bash
NODE_PORT=3001
BASE_URL=/api/v1/link
AUTH_SERVICE=http://172.20.199.4:3000/api/v1/auth
REDIRECT_SERVICE=http://172.20.199.6:3002
```

- `.env_mysql`

```bash
MYSQL_DATABASE=url-shortner
MYSQL_USER=shortner
MYSQL_PASSWORD=r4oelJBJP9DO0FS0xm
MYSQL_ROOT_PASSWORD=r4oelJBJP9DO0FS0xm
DB_HOST=172.20.199.2
DB_HOST_TEST=172.20.199.3
```

- `.env_node`

```bash
NODE_ENV=development
```

- `.env_redirect`

```bash
NODE_PORT=3002
AUTH_SERVICE=http://172.20.199.4:3000/api/v1/auth
```

- `.env_secret`

```bash
JWT_SECRET=your-strong-jwt-secret
```

2. Start the container for the firts time to install NPM dependencies (in some cases it's necessaty stop de MySQL service on GNU/Linux environment):

```bash
docker compose run auth-service npm ci
docker compose run link-service npm ci
docker compose run redirect-service npm ci
```

This command will create the initial containers and tables in the database.

3. Running the follow command for first time init, keep in mind that this project uses version 2 of Docker compose, so update your tool to avoid version conflicts :

```bash
docker compose up --build
```

Next times:

```bash
docker compose up
```

For running test follow the instructions:

1. Rename the `NODE_ENV` to "test" on `.env_node`

```bash
NODE_ENV=test
```

2. Follow the same commands about up a dockcer container for the first time

3. Running the follow command, you can test services, tests are performed in a separate service:

- For Auth services running:

```bash
docker exec auth-service npm run jest
```

- For Link services running:

```bash
docker exec link-service npm run jest
```

- For Redirect services running:

```bash
docker exec redirect-service npm run jest

```

## How to use:

This project is an API to create, manage and redirect minified links to their original versions, allowing logged in users some extra actions, remember that to use and verify its operation, in addition to testing and reading the documentation, it is recommended to use a tool to create HTTP requests like Postman or Insomnia according to the following standards:

1. Auth Services: Allows the creation of a new user and the authentication process as described below:

```bash
POST http://localhost:3000/api/v1/auth

Request Payload:
{
  "name": "URL Shortner",
  "email": "url-shortner@null.net",
  "password": "123"
}

Response (201):
{
  "response": "resource created",
  "url": "/api/v1/auth",
  "date": "2024-08-05T12:01:32.864Z"
}
```

```bash
GET http://localhost:3000/api/v1/auth

Request Payload:
{
  "email": "url-shortner@null.net",
  "password": "123"
}

Response (200):
{
  "response": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyZW5hdG8uYm9uZmltLmpyQGNjaWFvLm9yZyIsImlhdCI6MTcyMjg1OTQwMCwiZXhwIjoxNzIyODYzMDAwfQ.nAXz3iY4c76VKJ5yxfrnuj_efw2xJys6DCbjcQeOeV4"
  },
  "url": "/api/v1/auth",
  "date": "2024-08-05T12:03:20.097Z"
}
```

2. Link Service: Allows the creation, listing, editing and deletion of Links for their short versions with some restrictions:

- Any user (with or without authentication) can create new links. For logged users it's necessary send a request header with a Bearer Token;
- Only logged in users can list, edit and delete links created by themselves sent in the request header a Bearer Token;

```bash
POST http://localhost:3001/api/v1/link?original_url=https://github.com/renatobjr/node-url-shortner

Response (201):
{
  "response": "http://172.20.199.6:3002/opKER",
  "url": "/api/v1/link?original_url=https://github.com/renatobjr/node-url-shortner",
  "date": "2024-08-05T12:15:54.249Z"
}
```

```bash
GET http://localhost:3001/api/v1/link

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyZW5hdG8uYm9uZmltLmpyQGNjaWFvLm9yZyIsImlhdCI6MTcyMjg2MDMyMywiZXhwIjoxNzIyODYzOTIzfQ.WntTXj6ssKUL7Dw5MlBWtWEyN-e02gb2w5oQ0R4ZZgA

Response (200):
{
  "response": [
    {
      "id": 2,
      "original_url": "https://github.com/renatobjr/node-url-shortner",
      "short_url": "http://172.20.199.6:3002/LgRZG",
      "user_id": 1,
      "total_clicks": 0,
      "created_at": "2024-08-05T12:17:42.000Z",
      "updated_at": "2024-08-05T12:17:42.000Z",
      "deleted_at": null
    }
  ],
  "url": "/api/v1/link",
  "date": "2024-08-05T12:19:00.485Z"
}
```

```bash
PUT http://localhost:3001/api/v1/link/:id

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyZW5hdG8uYm9uZmltLmpyQGNjaWFvLm9yZyIsImlhdCI6MTcyMjg2MDMyMywiZXhwIjoxNzIyODYzOTIzfQ.WntTXj6ssKUL7Dw5MlBWtWEyN-e02gb2w5oQ0R4ZZgA

Request Payload:
{
  "original_url": "https://www.google.com/"
}

Response (204)
```

```bash
DELETE http://localhost:3001/api/v1/link/:id

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyZW5hdG8uYm9uZmltLmpyQGNjaWFvLm9yZyIsImlhdCI6MTcyMjg2MDMyMywiZXhwIjoxNzIyODYzOTIzfQ.WntTXj6ssKUL7Dw5MlBWtWEyN-e02gb2w5oQ0R4ZZgA

Response (204)
```

3. Redirect Service: Allows redirection to the original URL from a link generated in Link service.

```bash
GET http://172.20.199.6:3002/LgRZG

Response (200)
```

## Reading the Docs:

Swagger provides separate documentation for each service, use URL `/swagger/docs` to access.

## Improvement points:

1. Creation of a single container for grouping Swagger documentation;
2. Creation of a container to manage the initial creation of the database using `Knex`, enabling greater control of migrations, seeds and less writing in Native MySQL code;
3. Implement Zabbix + Grafana for observability and monitoring from the repository:

```bash
https://github.com/renatobjr/zabbix-docker
```

4. Implement a `makefile.sh` to generate all dependencies and execute docker commands in a unified way;
5. Create packages to reduce code load, such as the types used to standardize service response.

## Total development time:

Visit the link below for insights and time spent on the project
[WakaTime](https://wakatime.com/@018d32aa-d099-41cb-a39c-4049bdbd1c8c/projects/loiiksaydh?start=2024-07-30&end=2024-08-05)
