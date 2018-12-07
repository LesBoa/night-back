[![CircleCI](https://circleci.com/gh/LesBoa/night-back/tree/develop.svg?style=svg)](https://circleci.com/gh/LesBoa/night-back/tree/develop)

## Description

Ce projet est fait avec [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ yarn install
```

## Démarer l'application

```bash
# development
$ docker-compose -f docker/postgresql.yml up -d
$ yarn start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

Il y a un dockerfile pour builder en docker, pour lancer la stack avec docker, un docker-compose est présent.
