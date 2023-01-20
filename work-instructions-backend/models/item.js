const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: [true, "must provide item name"],
    trim: true,
  },
  image: {
    // potentially use this as a 2d image or maybe a 3d model of the item
    type: ObjectID,
  },
});

module.exports = mongoose.model("Step", ItemSchema);
