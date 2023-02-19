# URL Shortener

## Description

Simple NodeJS based URL shortener built with [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. The approach uses different 3 different types of data stores:

- In-memory Hash Map for proof-of-concept.
- Redis database for classic key/value storage.
- CosmosDB for geo-replicable NoSQL database.

Azure Dev Containers was used to simplify local development in VSCode. The `/.devcontainer` directory includes a docker compose file used to start the App, Redis, and Cosmos DB emulator services for local development.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
