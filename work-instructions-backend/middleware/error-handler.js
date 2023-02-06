const { default: mongoose } = require("mongoose");
const multer = require("multer");
const { CustomAPIError } = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ msg: err.message });
  }
  if (err instanceof multer.MulterError && err.code == "LIMIT_FILE_SIZE") {
    return res.status(400).json({ msg: "Your image must be less than 16 MB." });
  }
  console.log(err);
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
