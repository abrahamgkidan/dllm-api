# DistributedLLM - Backend API

## About

The DistributedLLM Backend API component is a REST API. The component is authored in Typescript with Node.js, Express, and Mongoose. Persistent data is stored in MongoDB.

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--middlewares\    # Custom express middleware
 |--models\         # Mongoose models (data layer)
 |--routes\         # Express routes and route handlers
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.ts          # Express app
 |--index.ts        # App entry point
```

## Install

### Install the Prerequisites

This project has the following prerequisites which must be in place before installation of the project libraries.

> **NOTE:** I recommend installing Node Version Manager ([NVM](https://github.com/nvm-sh/nvm)) on developer machines to support multiple Node.js installations.

1. [Node.js 18](https://nodejs.org/en/download/)

### Install the Dependencies

To install the project dependencies on a development machine, issue the following commands at a terminal prompt.

```bash
# if using nvm, switch to project Node version...
nvm use

# install all project production and development dependencies...
npm install
```

## Configuration

### Configuring the Project

This project uses [dotenv](https://www.npmjs.com/package/dotenv) to supply configuration parameters to the project.

To initialize your local development environment `.env` file, a sample file named `.env.example` has been provided. Create your `.env` file by issuing the following command at a terminal prompt.

```bash
# first, copy the example file to .env
cp .env.example .env

# then, open .env and modify the configuration values as needed
```

### Configuration Values

| name                                  | default                                                                         | description                                                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| LLM_API_URL                              | `http://localhost:8000`                                                         | The URL of the LLM API component.                                                                                              |
| MONGODB_URL                           |                                                                                 | The MongoDB connection URL.                                                                    
| JWT_SECRET                           |                                                                                 | The JWT secret key.                                                                    

## Run

> **NOTE:** NPM scripts are used to initiate many common activies.

> **NOTE:** Node version 18 is required. See Installation above.

To run the project with an Docker Compose (see section below for details), issue the following commands at a terminal prompt.

```bash
npm run start:docker
```

## Docker

> **NOTE:** To use Docker with this project you must have [Docker installed](https://docs.docker.com/get-docker/) on the machine where Docker commands will be executed, e.g. your local machine and/or a CI/CD pipeline.

This application may be packaged and run as a Docker container. Or you may run the application **and** MongoDB with Docker Compose, see the section further below.

## Docker Compose

This project is Docker Compose ready. Use Docker Compose to run the project **and** MongoDB on your local machine without needing to install the database.

> **NOTE:** Requires that you have Docker and Docker Compose installed.

### Start the Application

To start the application, issue the following command at a terminal prompt.

```bash
# start the API and DB components
docker compose up [--build] --detach
```

Include the `--build` option and Docker will rebuild the application Docker image using the latest code, using that image when running the application.

### Stop the Application

To stop the application, issue the following command at a terminal prompt.

```bash
# stop the API and DB components; preserving the MongoDB data
docker compose down
```

This command stops and removes the containers and cleans up ephemeral resources. The MongoDB data volume is **not** deleted.

### Connect to MongoDB

> **Note:** Requires that the [MongoDB shell](https://www.mongodb.com/docs/mongodb-shell/install/) be installed.

To connect to the MongoDB container running within the Docker Compose environment, issue the following commands at a terminal prompt.

```bash
# connect to MongoDB as an admin
mongosh -u root -p admin

# list databases
show dbs

# switch to the Mission database
use dllm

# list collections in the database
show collections

# list items in a collection, e.g. the chats collection
db.chats.find()

# clear the MongoDB shell
cls

# exit the MongoDB shell
exit
```

## Tech Stack
- Node.js
- Express.js
- Typescript
- Docker

## Related Information

[Docker](docker)
[Express](express)  
[MongoDB](mongo)  
[Node.js](node)  

[docker]: https://docs.docker.com/get-docker/ 'Install Docker'
[express]: https://expressjs.com/ 'Express'
[mongo]: https://www.mongodb.com/ 'MongoDB'
[node]: https://nodejs.org/en/download/ 'Install Node.js'
