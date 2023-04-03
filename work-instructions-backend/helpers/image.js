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

module.exports = createOrUpdateImageData;
