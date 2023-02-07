const mongoose = require("mongoose");

var notEmpty = function (positions) {
  return positions.length !== 0;
};
var lenPosEqualLenItems = function (positions) {
  console.log(this);
  return this.items.length === positions.length;
};

var validators = [
  { validator: notEmpty, msg: "Need at least one item/position." },
  {
    validator: lenPosEqualLenItems,
    msg: "Items and position arrays must have same length.",
  },
];

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
    // TODO: investigate object storage for images
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Step", StepSchema);
