const mongoose = require("mongoose");

const StepSchema = new mongoose.Schema({
  stepText: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
  },
  image: {
    // TODO: investigate object storage for images
    type: ObjectID,
  },
});

module.exports = mongoose.model("Step", StepSchema);
