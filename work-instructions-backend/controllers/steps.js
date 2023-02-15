const Step = require("../models/Step");
const Item = require("../models/Item");
const { createCustomError } = require("../errors/custom-error");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const checkIds = require("../helpers/check-ids");
const checkId = require("../helpers/check-id");

/**
 * createOrUpdateStepData - helper function that parses the body of a request to generate the data used by mongoose to create or update step documents
 * @param {Object} req - the request object
 * @returns {Map} - the mongoose readable object of step data
 */
const createOrUpdateStepData = (req) => {
  let itemId = req.body.item;

  let stepData = { stepText: req.body.stepText };

  // If we are given an item id, convert it to a mongoose objectid
  if (itemId) {
    itemId = toId(itemId);
    stepData["item"] = itemId;
  }

  stepData["positions"] = req.body.positions;

  return stepData;
};

const getAllSteps = async (req, res) => {
  let steps = await Step.find({});
  for (let step of steps) {
    await step.populate("item");
  }
  res.status(200).json({ steps });
};

const createStep = async (req, res, next) => {
  //Pass the item id as an array, as checkIds is expecting an array
  const badItemIds = await checkIds(Array(req.body.item), Item);
  //should only ever return 0 or 1 ids here, since we are only checking a single item
  if (badItemIds.length > 0) {
    return next(createCustomError(`No item with id: ${badItemIds}`, 400));
  }
  const stepData = createOrUpdateStepData(req);
  const step = await (await Step.create(stepData)).populate("item");

  res.status(201).json({ step });
};

const getStep = async (req, res, next) => {
  const { id: stepID } = req.params;
  const validStepId = await checkId(stepID, Step);
  if (!validStepId) {
    return next(createCustomError(`No step with id: ${stepID}`, 404));
  }
  const step = await Step.findOne({ _id: stepID });

  await step.populate("items");

  res.status(200).json({ step });
};

const deleteStep = async (req, res, next) => {
  const { id: stepID } = req.params;
  const validStepId = await checkId(stepID, Step);
  if (!validStepId) {
    return next(createCustomError(`No step with id: ${stepID}`, 404));
  }
  const step = await Step.findOneAndDelete({ _id: stepID });
  await step.populate("item");
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

  const stepData = createOrUpdateStepData(req);

  const step = await Step.findOneAndUpdate({ _id: stepID }, stepData, {
    new: true, // returns the new object
    runValidators: true,
  });

  await step.populate("item");

  res.status(200).json({ step });
};

module.exports = {
  getAllSteps,
  createStep,
  getStep,
  updateStep,
  deleteStep,
};
