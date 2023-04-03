const trueFalse = require("../helpers/true-false");
const { createCustomError } = require("../errors/custom-error");
/**
 * validatePopulate - checks req.query.populate to see if a value other than true/false is entered. If so, it throws an error.
 * @param {*} req
 * @param {*} next
 */

const validatePopulate = (req, res, next) => {
  let shouldPopulate = trueFalse(req.query.populate);
  // If shouldPopulate is null, it means that the user provided an incorrect query parameter for populate. In this case, we want to throw an error.
  if (shouldPopulate === null) {
    return next(
      createCustomError(
        `Invalid query parameter for populate: ${req.query.populate}`,
        400
      )
    );
  }
  let shouldPopulateImage = trueFalse(req.query.imageData);
  // If shouldPopulate is null, it means that the user provided an incorrect query parameter for populate. In this case, we want to throw an error.
  if (shouldPopulateImage === null) {
    return next(
      createCustomError(
        `Invalid query parameter for imageData: ${req.query.imageData}`,
        400
      )
    );
  }
  next();
};

module.exports = validatePopulate;
