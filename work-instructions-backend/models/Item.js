const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
  },
  image: {
    // potentially use this as a 2d image or maybe a 3d model of the item
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
