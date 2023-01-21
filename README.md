# work-instructions-web-app

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


