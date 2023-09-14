# Express.js Full-Stack <Boilerplate/\>

## Description

This repository will be express project starter and keep it fast, unopinionated and minimalist.

## Motivation

The motivation behind this repository is to create more Express.js projects, whether with a monolithic or microservice architecture, and to integrate them with both SQL and NoSQL databases.

## Feature

- HTTP / HTTPS
- Debugging
- Logging
- Authentication
  - Header API Key
  - Bearer Token
- Validation

## Installation

You will need the [jose CLI](https://www.npmjs.com/package/jose-cli) package to generate key pair. If you generated key pair, default path inside [secrets](./secrets/) directory or you need to change path from environment file.

### Install jose CLI

```bash
npm install jose-cli -g
```

### Generate key

This workflow is using `RS384` [here](https://github.com/Azly-Projects/Express.js-Full-Stack/blob/master/.github/workflows/master-branch.yml#L40)

```bash
cd secrets/ && jose keypair RS384 --save Key
```

## Project Structure

```text
project/
├── config/
├── secrets/
├── src/
│   ├── helper/
│   ├── middleware/
│   ├── routes/
│   ├── validators/
│   └── websocket/
└── tests/
```

1. **config**: This directory typically contains configuration files for your application. These files may include settings related to database connections, environment variables, logging, etc.

2. **secrets**: This directory is usually used to store sensitive information, such as API keys, passwords, or private keys. It's important to ensure that this directory is kept secure and not exposed to the public.

3. **src**: The main source code directory of your application.

   - **helper**: This directory contains utility functions or helper modules that can be used across different parts of your application.

   - **middleware**: Middleware functions are used in Express to modify incoming requests before they reach the routes. This directory typically stores custom middleware functions.

   - **routes**: This directory contains the route handlers for different API endpoints. Each route handler can be a separate file or organized based on the related functionality.

   - **validators**: Input validation is crucial for ensuring data integrity and security. This directory typically contains validation functions or modules for validating the incoming data.

   - **websocket**: This directory can be used to house the Socket.IO-related logic for your application. Within this directory, you can have several files.

4. **tests**: Unit tests, integration tests, and other types of tests for your application are usually placed in this directory. Organizing tests in a structured manner can help maintain a clean and efficient test suite.

## Running Tests

To run the test suite, first install the dependencies, then run command :

```bash
npm test
```

To run the test coverage report :

```bash
npm run test:cov
```
