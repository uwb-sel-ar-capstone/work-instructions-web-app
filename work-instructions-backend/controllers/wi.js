const WI = require("../models/WI");
const Step = require("../models/Step");
const Image = require("../models/Image");
const { createCustomError } = require("../errors/custom-error");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const checkIds = require("../helpers/check-ids");
const checkId = require("../helpers/check-id");
const trueFalse = require("../helpers/true-false");

/**
 * createOrUpdateWIData - helper function that parses the body of a request to generate the data used by mongoose to create or update WI documents
 * @param {Object} req - the request object
 * @returns {Map} - the mongoose readable object of wi data
 */
const createOrUpdateWIData = (bodyData) => {
  let stepIDs = bodyData.steps;
  if (!Array.isArray(stepIDs)) {
    stepIDs = Array(stepIDs);
  }

  let wiData = { name: bodyData.name };

  // If we are given step ids, map them to Mongoose ObjectIds
  if (stepIDs) {
    stepIDs = stepIDs.map((id) => {
      return toId(id);
    });
    wiData["steps"] = stepIDs;
  }
  wiData["dimensions"] = bodyData.dimensions;
  wiData["image"] = toId(bodyData.image);
  return wiData;
};

/**
 * createPopulateArray - creates a populate array with steps, items, and optionally image populated
 * @param {Boolean} shouldPopulate
 * @param {Boolean} shouldReturnImageData
 * @returns {Array}
 */

const createPopulateArray = (shouldPopulate, shouldReturnImageData) => {
  let populateArray = [];
  let stepsPopulateArray = [];

  if (shouldReturnImageData == "true") {
    // Populate image data for steps - will only actually populate if shouldPopulate is true (otherwise the step is just an ID)
    stepsPopulateArray.push({ path: "image" });
    // Populate image data for work instruction
    populateArray.push({ path: "image" });
  }
  if (shouldPopulate) {
    // Adds the item to the stepsPopulateArray first (before the stepsPopulateArray is added to the steps inside the populateArray)
    stepsPopulateArray.push({ path: "item" });
    // Adds the steps to the populate array, with the stepsPopulateArray as the populate array for the steps
    populateArray.push({ path: "steps", populate: stepsPopulateArray });
  }
  return populateArray;
};

/**
 * checkAndPopulateWI - checks req.query.populate to see if user wants to receive the populated data. If true or missing, steps are populated, otherwise, steps are not populated.
 * @param {*} req
 * @param {*} next
 * @param {*} step
 */

const checkAndPopulateWI = async (req, next, wi) => {
  // If shouldPopulate is undefined, it means that the user did not provide a query parameter for populate. In this case, we want to populate the data.
  let shouldPopulate = trueFalse(req.query.populate);
  if (shouldPopulate === undefined) {
    shouldPopulate = true;
  }
  // Could do extra validation and middleware here. Using old strategy for now.
  const shouldReturnImageData = req.query.imagedata || "true";
  const populateArray = createPopulateArray(
    shouldPopulate,
    shouldReturnImageData
  );
  await wi.populate(populateArray);
};

const getAllWIs = async (req, res, next) => {
  let wis = await WI.find({});
  for (let wi of wis) {
    await checkAndPopulateWI(req, next, wi);
  }
  res.status(200).json({ wis });
};

const createWI = async (req, res, next) => {
  let steps = req.body.steps;
  if (!Array.isArray(steps)) {
    steps = Array(steps);
  }
  const badStepIds = await checkIds(steps, Step);
  if (badStepIds.length > 0) {
    return next(createCustomError(`No steps with ids: ${badStepIds}`, 400));
  }

  const existingImage = await checkId(req.body.image, Image);
  if (!existingImage) {
    return next(createCustomError(`No image with id: ${req.body.image}`, 400));
  }

  // Creates the work instruction data
  const wiData = createOrUpdateWIData(req.body);

  let wi = await WI.create(wiData);
  await checkAndPopulateWI(req, next, wi);

  res.status(201).json({ wi });
};

const getWI = async (req, res, next) => {
  const { id: wiID } = req.params;
  const validWIId = await checkId(wiID, WI);
  if (!validWIId) {
    return next(createCustomError(`No work instruction with id: ${wiID}`, 404));
  }
  let wi = await WI.findOne({ _id: wiID });

  await checkAndPopulateWI(req, next, wi);

  res.status(200).json({ wi });
};

const deleteWI = async (req, res, next) => {
  const { id: wiID } = req.params;
  const validWIId = await checkId(wiID, WI);
  if (!validWIId) {
    return next(createCustomError(`No work instruction with id: ${wiID}`, 404));
  }
  let wi = await WI.findByIdAndDelete(wiID);
  //deletes the image that is associated with this wi
  await Image.findByIdAndDelete(wi.image);

  await checkAndPopulateWI(req, next, wi);

  res.status(200).json({ wi });
};

const updateWI = async (req, res, next) => {
  const { id: wiID } = req.params;
  const validWIId = await checkId(wiID, WI);
  if (!validWIId) {
    return next(createCustomError(`No work instruction with id: ${wiID}`, 404));
  }
  let steps = req.body.steps;
  if (!Array.isArray(steps)) {
    steps = Array(steps);
  }
  const badStepIds = await checkIds(steps, Step);
  if (badStepIds.length > 0) {
    return next(createCustomError(`No steps with ids: ${badStepIds}`, 400));
  }

  const existingImage = await checkId(req.body.image, Image);
  if (!existingImage) {
    return next(createCustomError(`No image with id: ${req.body.image}`, 400));
  }

  // Creates the work instruction data
  const wiData = createOrUpdateWIData(req.body);

  let wi = await WI.findOneAndUpdate({ _id: wiID }, wiData, {
    new: true, // returns the new object
    runValidators: true,
  });

  await checkAndPopulateWI(req, next, wi);

  res.status(200).json({ wi });
};

module.exports = {
  getAllWIs,
  createWI,
  getWI,
  updateWI,
  deleteWI,
};
