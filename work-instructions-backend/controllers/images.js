const Image = require("../models/Image");
const { createCustomError } = require("../errors/custom-error");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const checkIds = require("../helpers/check-ids");
const checkId = require("../helpers/check-id");

/**
 * createOrUpdateImageData - helper function that parses the body of a request to generate the data used by mongoose to create or update Image documents
 * @param {Object} req - the request object
 * @returns {Map} - the mongoose readable object of item data. null if invalid input.
 */
const createOrUpdateImageData = (file) => {
  if (
    !file ||
    (file.mimetype != "image/jpeg" && file.mimetype != "image/png")
  ) {
    return null;
  }

  return {
    imageData: file.buffer.toString("base64"),
    encoding: "base64",
    mimeType: file.mimetype,
  };
};

const updateImage = async (req, res, next) => {
  const { id: imageID } = req.params;
  const validImageID = await checkId(imageID, Image);
  if (!validImageID) {
    return next(createCustomError(`No image with id: ${imageID}`, 404));
  }

  if (req.file) {
    imgData = createOrUpdateImageData(req.file);
    if (!imgData) {
      return next(
        createCustomError(`Image file of type JPEG or PNG required.`, 400)
      );
    }
  } else {
    return next(createCustomError(`Image file of type JPEG or PNG .`, 400));
  }

  const image = await Image.findOneAndUpdate({ _id: imageID }, imgData, {
    new: true, // returns the new object
    runValidators: true,
  });
  res.status(200).json({ image });
};

module.exports = {
  updateImage,
};
