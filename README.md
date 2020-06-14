<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

## Description

Task management RESTFul api built using [NestJS](https://github.com/nestjs/nest) , TypeScript, TypeORM and PostgreSQL.

## Why I selected NestJS

NestJS is one of the most popular server-side JavaScript frameworks of 2019 & 2020. As of June 2020 it has over 27k GitHub stars and over 250k weekly downloads on [npm](https://www.npmjs.com/package/@nestjs/core).

In the recent years there are many frameworks on frontend like React, Angular, Vue which have improved developer productivity and have scalable architectures. However, on the server-side, while there are a lot of superb libraries, helpers and tools for Node, none of them effectively solve the main problem - the architecture.

Nest aims to provide an application architecture out of the box which allows for effortless creation of highly testable, scalable, loosely coupled and easily maintainable applications.

Under the hood, Nest makes use of [Express](https://expressjs.com/), but also, provides compatibility with a wide range of other libraries, like e.g. Fastify, allowing for easy use of the myriad third-party plugins which are available.

## About Task Management

### Sample deployment

Code has been deployed to Heroku and is available for testing on swagger at https://typeorm-task-mgmt.herokuapp.com/

### Functional specs

Task management allows users to register, create tasks and manage them, major features are

- User SignUp & SignIn
- Create Tasks which are visible only to the logged in users
- New created tasks will be in OPEN status
- Update task status to IN_PROGRESS or DONE
- Delete tasks

### Technical methodologies followed

- Modular architecture: Tasks & Auth handled in separate modules, separating concerns.
- HTTP requests are handled by Controllers
- API documentation using nest/swagger module
- Business logic is implemented in Services
- Database interactions are handled in Repository classes using TypeORM
- Validation using NestJS Pipes
- Data Transfer Object(DTO) pattern for transferring data between layers
- Configuration management using .yml files for development, test & prod configs
- Authentication / Authorization, Task ownership by users
- PassportJS, JWT tokens, Password hashing, salts
- Unit tests using Jest
- Supertest for end to end testing

### Technical documentation using [Compodoc](https://compodoc.app)

As NestJS is heavily inspired by Angular, we can generate the documentation about project structure modules, controllers, services etc. I have generated the docks and uploaded to netlify

https://task-mgmt-api-docs.netlify.app/modules.html

## Installation

```
npm install
```

## Running the app

### Prerequisite for local/dev mode

- Postgres should be running locally
- And a db called `task-mgmt` should be created ( can be updated in `config/development.yml` )

```bash
# development - watch mode
$ npm run start:dev

# production mode
$ npm start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

```
