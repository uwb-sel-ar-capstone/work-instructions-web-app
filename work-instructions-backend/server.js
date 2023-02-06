const express = require("express");
const upload = require("./middleware/multer-init");
require("express-async-errors");
const cors = require("cors");
const connectMongoDB = require("./db/connectMongoDB");
//connects to Redis
const redisClient = require("./db/connectRedis");
const steps = require("./routes/steps");
const items = require("./routes/items");
const wis = require("./routes/wi");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/Steps", steps);
app.use("/api/v1/Items", items);
app.use("/api/v1/WorkInstructions", wis);

app.post("/api/v1/test", upload.single("image"), async (req, res, next) => {
  console.log(req.file);
  /*
  fs.writeFile(
    "./" + req.file.originalname,
    req.file.buffer.toString("base64"),
    "base64",
    (err) => {}
  );
  res.send;
  */
  let name = "1234091823489012394";
  redisClient.set(name, req.file.buffer.toString("base64"));
  return res
    .set({ "Content-Type": "image/jpeg" })
    .send(Buffer.from(req.file.buffer.toString("base64"), "base64"));
});

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectMongoDB(process.env.MONGO_URI).then(
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
