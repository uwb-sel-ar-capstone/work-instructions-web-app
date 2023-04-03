const Step = require("../models/Step");
const Item = require("../models/Item");
const Image = require("../models/Image");
const { createCustomError } = require("../errors/custom-error");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const checkIds = require("../helpers/check-ids");
const checkId = require("../helpers/check-id");
const trueFalse = require("../helpers/true-false");
const createOrUpdateImageData = require("../helpers/image");

/**
 * createOrUpdateStepData - helper function that parses the body of a request to generate the data used by mongoose to create or update step documents
 * @param {Object} req - the request object
 * @returns {Map} - the mongoose readable object of step data
 */
const createOrUpdateStepData = (req) => {
  let itemId = req.body.item;

  let stepData = { text: req.body.text };

  // If we are given an item id, convert it to a mongoose objectid
  if (itemId) {
    itemId = toId(itemId);
    stepData["item"] = itemId;
  }

  stepData["positions"] = req.body.positions;

  return stepData;
};

/**
 * createPopulateArray - creates a populate array with steps, items, and optionally image populated
 * @param {Boolean} shouldPopulate
 * @param {Boolean} shouldReturnImageData
 * @returns {Array}
 */

const createPopulateArray = (shouldPopulate, shouldReturnImageData) => {
  let populateArray = [];
  if (shouldPopulate) {
    populateArray.push({ path: "item" });
  }
  if (shouldReturnImageData) {
    populateArray.push({ path: "image" });
  }
  return populateArray;
};

/**
 * checkAndPopulateStep - checks req.query.populate to see if user wants to receive the populated data. If true or missing, item is populated, otherwise, item is not populated.
 * @param {*} req
 * @param {*} next
 * @param {*} step
 */

const checkAndPopulateStep = async (req, next, step) => {
  // If shouldPopulate/shouldReturnImageData is undefined, it means that the user did not provide a query parameter for populate. In this case, we want to populate the data.
  let shouldPopulate = trueFalse(req.query.populate);
  if (shouldPopulate == undefined) {
    shouldPopulate = true;
  }
  let shouldReturnImageData = trueFalse(req.query.imagedata);
  if (shouldReturnImageData == undefined) {
    shouldReturnImageData = true;
  }
  const populateArray = createPopulateArray(
    shouldPopulate,
    shouldReturnImageData
  );
  await step.populate(populateArray);
};

const getAllSteps = async (req, res, next) => {
  let steps = await Step.find({});

  for (let step of steps) {
    await checkAndPopulateStep(req, next, step);
  }

  res.status(200).json({ steps });
};

const createStep = async (req, res, next) => {
  // Pass the item id as an array, as checkIds is expecting an array
  const badItemIds = await checkIds(Array(req.body.item), Item);
  // should only ever return 0 or 1 ids here, since we are only checking a single item
  if (badItemIds.length > 0) {
    return next(createCustomError(`No item with id: ${badItemIds}`, 400));
  }

  const stepData = createOrUpdateStepData(req);

  // get the imgData if it exists.
  imgData = createOrUpdateImageData(req.file);
  let imageItem = undefined;
  // if imgData exists, create an image document and add the id to the stepData
  if (imgData) {
    imageItem = await Image.create(imgData);
    stepData.image = imageItem._id;
  }

  let step = await Step.create(stepData);

  await checkAndPopulateStep(req, next, step);

  res.status(201).json({ step });
};

const getStep = async (req, res, next) => {
  const { id: stepID } = req.params;
  const validStepId = await checkId(stepID, Step);
  if (!validStepId) {
    return next(createCustomError(`No step with id: ${stepID}`, 404));
  }
  const step = await Step.findOne({ _id: stepID });

  await checkAndPopulateStep(req, next, step);

  res.status(200).json({ step });
};

const deleteStep = async (req, res, next) => {
  const { id: stepID } = req.params;
  const validStepId = await checkId(stepID, Step);
  if (!validStepId) {
    return next(createCustomError(`No step with id: ${stepID}`, 404));
  }
  const step = await Step.findOneAndDelete({ _id: stepID });
  if (step.image) {
    await Image.findOneAndDelete({ _id: step.image });
  }

  await checkAndPopulateStep(req, next, step);

  res.status(200).json({ step });
};

const updateStep = async (req, res, next) => {
  const { id: stepID } = req.params;
  const validStepId = await checkId(stepID, Step);
  if (!validStepId) {
    return next(createCustomError(`No step with id: ${stepID}`, 404));
  }
  //Pass the item id as an array, as checkIds is expecting an array
  const badItemIds = await checkIds(Array(req.body.item), Item);
  //should only ever return 0 or 1 ids here, since we are only checking a single item
  if (badItemIds.length > 0) {
    return next(createCustomError(`No item with id: ${badItemIds}`, 400));
  }

  // get the existing step
  const existingStep = await Step.findById(stepID);
  const existingImageID = existingStep.image;

  // if we have an existing image and we have a new image, delete the existing image and create a new image
  let imageItem;
  if (existingImageID) {
    imageItem = Image.findById(existingImageID);
  }
  if (req.file) {
    imgData = createOrUpdateImageData(req.file);
    if (!imgData) {
      return next(
        createCustomError(`Image file of type JPEG or PNG required.`, 400)
      );
    }
    // Delete the old image (if it exists)
    if (existingImageID) {
      await Image.findByIdAndDelete(existingImageID);
    }

    // Create the new image
    imageItem = await Image.create(imgData);
  } else {
    // If we don't have a new image, but we have an existing image, and the query parameter of "deleteImage" is present, delete the existing image
    if (existingImageID && "deleteimage" in req.query) {
      await Image.findByIdAndDelete(existingImageID);
      imageItem = null;
    }
  }

  const stepData = createOrUpdateStepData(req);
  // If we have an image, add the image id to the stepData
  if (imageItem) {
    stepData.image = imageItem._id;
  } else {
    stepData.image = null;
  }

  const step = await Step.findOneAndUpdate({ _id: stepID }, stepData, {
    new: true, // returns the new object
    runValidators: true,
  });

  await checkAndPopulateStep(req, next, step);

  res.status(200).json({ step });
};

module.exports = {
  getAllSteps,
  createStep,
  getStep,
  updateStep,
  deleteStep,
};
