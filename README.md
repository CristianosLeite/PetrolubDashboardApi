# PetrolubDashboardApi

This repository contains the Petrolub Dashboard API, a project designed to manage and display data related to Petrolub operations.

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Docker

### Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/yourusername/PetrolubDashboardApi.git
  cd PetrolubDashboardApi
  ```

2. Install the dependencies:
  ```sh
  npm install
  ```

  ### Environment Variables

  Before running the application, ensure you have set up the necessary environment variables. Create a `.env` file in the root directory of the project and add the required variables as specified in the documentation.

  ### Environment Variables

  The following environment variables need to be set in the `.env` file:

  ```plaintext
  # Database configuration
  DATABASE_URL=your_database_url
  DATABASE_SCHEMA=your_database_schema
  FRONTEND_URL=your_frontend_url
  CRYPTO_KEY=your_crypto_key
  POSTGRES_DB=your_postgres_db
  POSTGRES_USER=your_postgres_user
  POSTGRES_PASSWORD=your_postgres_password

  # Server configuration
  PORT=your_server_port

  # Authentication
  JWT_SECRET=your_jwt_secret
  ```

### Running the Application

#### Using Node.js

To start the application using Node.js, run:
```sh
npm start
```

#### Using Docker

To start the application using Docker, follow these steps:

1. Build the Docker image:
  ```sh
  docker build -t petrolub-dashboard-api .
  ```

2. Run the Docker container:
  ```sh
  docker-compose up
  ```

### Files

#### package.json

This file contains the metadata relevant to the project and is used to manage the project's dependencies, scripts, and versioning.

#### docker-compose.yml

This file is used to define and run multi-container Docker applications. It contains the configuration for the services required by the application.

#### Dockerfile

This file contains a series of instructions on how to build a Docker image for the application.
