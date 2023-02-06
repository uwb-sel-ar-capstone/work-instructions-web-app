const WI = require("../models/WI");
const Step = require("../models/Step");
const Image = require("../models/Image");
const { createCustomError } = require("../errors/custom-error");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const checkIds = require("../helpers/check-ids");
const checkId = require("../helpers/check-id");

/**
 * createOrUpdateWIData - helper function that parses the body of a request to generate the data used by mongoose to create or update WI documents
 * @param {Object} req - the request object
 * @returns {Map} - the mongoose readable object of wi data
 */
const createOrUpdateWIData = (bodyData) => {
  let stepIDs = bodyData.steps;

  let wiData = { wiName: bodyData.wiName };

  // If we are given step ids, map them to Mongoose ObjectIds
  if (stepIDs) {
    stepIDs = stepIDs.map((id) => {
      return toId(id);
    });
    wiData["steps"] = stepIDs;
  }
  return wiData;
};

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

/**
 * createPopulateArray - creates a populate array with steps, items, and optionally image populated
 * @param {Boolean} shouldReturnImageData
 * @returns {Array}
 */

const createPopulateArray = (shouldReturnImageData) => {
  let populateArray = [{ path: "steps", populate: { path: "items" } }];
  if (shouldReturnImageData == "true") {
    populateArray.push({ path: "image" });
  }
  return populateArray;
};

const getAllWIs = async (req, res) => {
  const shouldReturnImageData = req.query.imageData || "true";
  const populateArray = createPopulateArray(shouldReturnImageData);
  let wis = await WI.find({});
  for (let wi of wis) {
    await wi.populate(populateArray);
  }
  res.status(200).json({ wis });
};

const createWI = async (req, res, next) => {
  const badStepIds = await checkIds(req.body.steps, Step);
  if (badStepIds.length > 0) {
    return next(createCustomError(`No steps with ids: ${badStepIds}`, 400));
  }

  // Checks if we have a valid image, if so, creates the json body of the image item
  imgData = createOrUpdateImageData(req.file);
  if (!imgData) {
    return next(
      createCustomError(`Image file of type JPEG or PNG required.`, 400)
    );
  }
  //Creates the image item in mongo
  let imageItem = await Image.create(imgData);

  // Creates the work instruction data
  const wiData = createOrUpdateWIData(req.body);
  // Appends the new image data to the work instruction data
  wiData.image = imageItem._id;

  const shouldReturnImageData = req.query.imageData || "true";
  const populateArray = createPopulateArray(shouldReturnImageData);

  const wi = await (await WI.create(wiData)).populate(populateArray);

  res.status(201).json({ wi });
};

const getWI = async (req, res, next) => {
  const { id: wiID } = req.params;
  const validWIId = await checkId(wiID, WI);
  if (!validWIId) {
    return next(createCustomError(`No work instruction with id: ${wiID}`, 404));
  }
  const wi = await WI.findOne({ _id: wiID });

  const shouldReturnImageData = req.query.imageData || "true";
  const populateArray = createPopulateArray(shouldReturnImageData);

  await wi.populate(populateArray);

  res.status(200).json({ wi });
};

const deleteWI = async (req, res, next) => {
  const { id: wiID } = req.params;
  const validWIId = await checkId(wiID, WI);
  if (!validWIId) {
    return next(createCustomError(`No work instruction with id: ${wiID}`, 404));
  }
  const wi = await WI.findByIdAndDelete(wiID);
  //deletes the image that is associated with this wi
  await Image.findByIdAndDelete(wi.image);

  const shouldReturnImageData = req.query.imageData || "true";
  const populateArray = createPopulateArray(shouldReturnImageData);

  await wi.populate(populateArray);
  res.status(200).json({ wi });
};

const updateWI = async (req, res, next) => {
  const { id: wiID } = req.params;
  const validWIId = await checkId(wiID, WI);
  if (!validWIId) {
    return next(createCustomError(`No work instruction with id: ${wiID}`, 404));
  }
  const badStepIds = await checkIds(req.body.steps, Step);
  if (badStepIds.length > 0) {
    return next(createCustomError(`No steps with ids: ${badStepIds}`, 400));
  }

  const existingWI = await WI.findById(wiID);
  const existingImageID = existingWI.image;
  // If we have an image, check if its valid. If its not valid, return an error. If there is no image, use the existing image.
  let imageItem = await Image.findById(existingImageID);
  if (req.file) {
    imgData = createOrUpdateImageData(req.file);
    if (!imgData) {
      return next(
        createCustomError(`Image file of type JPEG or PNG required.`, 400)
      );
    }
    // Delete the old image
    await Image.findByIdAndDelete(existingImageID);
    // Create the new image
    imageItem = await Image.create(imgData);
  }

  // Creates the work instruction data
  const wiData = createOrUpdateWIData(req.body);
  // Appends the image data to the work instruction data
  wiData.image = imageItem._id;

  const wi = await WI.findOneAndUpdate({ _id: wiID }, wiData, {
    new: true, // returns the new object
    runValidators: true,
  });

  const shouldReturnImageData = req.query.imageData || "true";
  const populateArray = createPopulateArray(shouldReturnImageData);

  await wi.populate(populateArray);

  res.status(200).json({ wi });
};

module.exports = {
  getAllWIs,
  createWI,
  getWI,
  updateWI,
  deleteWI,
};
