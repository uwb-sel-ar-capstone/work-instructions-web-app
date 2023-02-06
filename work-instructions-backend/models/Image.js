const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  imageData: {
    type: String,
    required: [true, "must provide image"],
  },
  mimeType: {
    type: String,
    required: [true, "must provide mimetype"],
  },
  encoding: {
    type: String,
    required: [true, "must provide encoding"],
  },
});

module.exports = mongoose.model("Image", ImageSchema);
