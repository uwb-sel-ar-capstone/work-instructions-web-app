const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db/connect");
require("dotenv").config();

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
