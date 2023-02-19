# work-instructions-web-app

## How to run the entire application

Ensure that the latest version of the [Docker](https://www.docker.com/products/docker-desktop/) client is installed on your machine.

Open a command window in the project's root directory. Run the following command:

```bash
docker compose up
```

The frontend will be available at http://localhost:3000/ and the backend at http://localhost:5000/

## Backend

Tested using NPM version 8.19.2.

To install dependencies, navigate to `./work-instructions-backend/` and run:

```bash
npm install
```

Create a .env file in `./work-instructions-backend/` and write the following (replace \<password\> with the password to the mongo user):

```env
MONGO_URI=mongodb+srv://backend_user:<password>@cluster0.vedeu24.mongodb.net/?retryWrites=true&w=majority
PORT=5000
```

To start the backend, navigate to `./work-instructions-backend/` and run:

```bash
npm start
```

To start the backend in dev mode (using nodemon), navigate to `./work-instructions-backend/` and run:

```bash
npm run-script dev
```
