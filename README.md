# Getting Started

## Setup the project for development:
1. First, clone `.env.template` to `.env` and set the variables
2. Run the docker-compose.yml:
    ```bash
    docker-compose up -d
    ```
3. Install dependencies:

    ```bash
    npm install
    ```
4. Run database migrations:

    ```bash
    npx prisma migrate dev
    ```
5. Run the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setup the project for personal use:
1. First, clone `.env.template` to `.env` and set the variables
2. Run the docker-compose.yml:
    ```bash
    docker-compose up -d
    ```
3. Install dependencies:

    ```bash
    npm install
    ```
4. Run database migrations:

    ```bash
    npx prisma migrate deploy
    ```
5. Create the production build:
    ```bash
    npm run build
    ```

6. Run server:
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
