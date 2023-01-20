const mongoose = require("mongoose");
const step = require("./step");

const WISchema = new mongoose.Schema({
  wi_name: {
    type: String,
    required: [true, "must provide work instruction name"],
    trim: true,
  },
  // Array of object ids of step objects in the "step" collection
  steps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "step",
    },
  ],
});

module.exports = mongoose.model("WI", WISchema);
