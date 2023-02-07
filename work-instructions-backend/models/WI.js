const mongoose = require("mongoose");

const WISchema = new mongoose.Schema({
  wiName: {
    type: String,
    required: [true, "must provide work instruction name"],
    trim: true,
  },
  // Array of object ids of step objects in the "step" collection
  steps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Step",
    },
  ],
  /*
  // dimensions stored as cm
  dimensions: {
    xLengthCM: {
      type: Number,
      required: [true, "must specify xLength in cm"],
      min: 0,
    },
    zLengthCM: {
      type: Number,
      required: [true, "must specify zLength in cm"],
      min: 0,
    },
  },
  */
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: [true, "must provide image ID"],
  },
});

module.exports = mongoose.model("WI", WISchema);
