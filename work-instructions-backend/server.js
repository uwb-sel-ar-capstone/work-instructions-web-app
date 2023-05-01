const express = require("express");
const upload = require("./middleware/multer-init");
require("express-async-errors");
const cors = require("cors");
const connectMongoDB = require("./db/connectMongoDB");
const steps = require("./routes/steps");
const items = require("./routes/items");
const wis = require("./routes/wi");
const images = require("./routes/images");
const debug = require("./routes/debug");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const validatePopulate = require("./middleware/validatePopulate");
const lowerQueryParam = require("./middleware/lowerQueryParam");
require("dotenv").config();
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "mongodb://mongo:27017/database";

app.use(cors());
app.use(express.json());

app.use(lowerQueryParam);
app.use(validatePopulate);

//routes
app.use("/api/v1/Steps", steps);
app.use("/api/v1/Items", items);
app.use("/api/v1/WorkInstructions", wis);
app.use("/api/v1/Images", images);
app.use("/api/v1/Debug", debug);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectMongoDB(mongoURI).then(
      () => {
        /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
        console.log("Connected to MongoDB");
      },
      (err) => {
        /** handle initial connection error */
        console.log(
          `Failed to connect to MongoDB. Closing server.\nMongoDB Error:${err}`
        );
      }
    );
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
