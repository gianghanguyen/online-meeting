## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Create and run database
```
docker-compose -d up
```

## Running the app
```
yarn start:dev

```
## Api document
[http://localhost:3001/api#/](http://localhost:3001/api#/)

## prisma

```
npx prisma migrate dev --name init

yarn add @prisma/client

```

## Create database
```
docker exec -it 42f3249c9b29 psql -U user
CREATE DATABASE meeting_app;
```