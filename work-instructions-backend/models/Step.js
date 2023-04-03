const mongoose = require("mongoose");

var notEmpty = function (positions) {
  return positions.length !== 0;
};

var validators = [
  { validator: notEmpty, msg: "Need at least one item and position." },
];

const StepSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "must provide text"],
    trim: true,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  positions: {
    type: [
      {
        xStart: {
          type: Number,
          required: [true, "must specify xStart"],
          min: 0,
          max: 1,
        },
        zStart: {
          type: Number,
          required: [true, "must specify zStart"],
          min: 0,
          max: 1,
        },
        xEnd: {
          type: Number,
          required: [true, "must specify xEnd"],
          min: 0,
          max: 1,
        },
        zEnd: {
          type: Number,
          required: [true, "must specify zEnd"],
          min: 0,
          max: 1,
        },
        _id: false,
      },
    ],
    validate: validators,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    default: null,
  },
});

module.exports = mongoose.model("Step", StepSchema);
