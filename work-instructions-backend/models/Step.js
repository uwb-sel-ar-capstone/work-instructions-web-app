const mongoose = require("mongoose");

const StepSchema = new mongoose.Schema({
  stepText: {
    type: String,
    required: [true, "must provide stepText"],
    trim: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  image: {
    // TODO: investigate object storage for images
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Step", StepSchema);
