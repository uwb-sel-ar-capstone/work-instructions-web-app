const express = require("express");
require("express-async-errors");
const cors = require("cors");
const connectDB = require("./db/connect");
const steps = require("./routes/steps");
const items = require("./routes/items");
const wis = require("./routes/wi");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/Steps", steps);
app.use("/api/v1/Items", items);
app.use("/api/v1/WorkInstructions", wis);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
