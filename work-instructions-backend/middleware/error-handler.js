const { default: mongoose } = require("mongoose");
const { CustomAPIError } = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ msg: err.message });
  }
  console.log(err);
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
