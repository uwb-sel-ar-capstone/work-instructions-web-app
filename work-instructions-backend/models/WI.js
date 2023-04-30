const mongoose = require("mongoose");

const WISchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
  },
  // Array of object ids of step objects in the "step" collection
  steps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Step",
    },
  ],
  dimensions: {
    xLengthCM: {
      type: Number,
      required: [true, "must specify xLength in cm"],
      min: 0,
    },
    yLengthCM: {
      type: Number,
      required: [true, "must specify yLength in cm"],
      min: 0,
    },
    zLengthCM: {
      type: Number,
      required: [true, "must specify zLength in cm"],
      min: 0,
    },
    _id: false,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: [true, "must provide image ID"],
  },
});

module.exports = mongoose.model("WI", WISchema);
