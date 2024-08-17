# Getting Started

## Setup the project for development:
1. First, clone `.env.template` to `.env` and set the variables
2. Run the docker-compose.yml:
    ```bash
    docker-compose up -d
    ```
3. Pull ollama model:
    ```bash
    # In the folder of docker-compose.yml
    docker-compose exec ollama ollama pull llama3.1
    ```
4. Install dependencies:

    ```bash
    npm install
    ```
5. Run database migrations:

    ```bash
    npx prisma migrate dev
    ```
6. Run the development server:
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
3. Pull ollama model:
    ```bash
    # In the folder of docker-compose.yml
    docker-compose exec ollama ollama pull llama3.1
    ```
4. Install dependencies:

    ```bash
    npm install
    ```
5. Run database migrations:

    ```bash
    npx prisma migrate deploy
    ```
6. Create the production build:
    ```bash
    npm run build
    ```

7. Run server:
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
