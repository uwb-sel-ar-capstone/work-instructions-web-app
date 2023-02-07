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
  let itemIds = req.body.items;

  let stepData = { stepText: req.body.stepText };

  // If we are given item ids, map them to Mongoose ObjectIds
  if (itemIds) {
    itemIds = itemIds.map((id) => {
      return toId(id);
    });
    stepData["items"] = itemIds;
  }

  stepData["positions"] = req.body.positions;
  console.log(req.body.positions);

  return stepData;
};

const getAllSteps = async (req, res) => {
  let steps = await Step.find({});
  for (let step of steps) {
    await step.populate("items");
  }
  res.status(200).json({ steps });
};

const createStep = async (req, res, next) => {
  const badItemIds = await checkIds(req.body.items, Item);
  if (badItemIds.length > 0) {
    return next(createCustomError(`No items with ids: ${badItemIds}`, 400));
  }
  const stepData = createOrUpdateStepData(req);
  const step = await (await Step.create(stepData)).populate("items");

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
  await step.populate("items");
  res.status(200).json({ step });
};

const updateStep = async (req, res, next) => {
  const { id: stepID } = req.params;
  const validStepId = await checkId(stepID, Step);
  if (!validStepId) {
    return next(createCustomError(`No step with id: ${stepID}`, 404));
  }
  const badItemIds = await checkIds(req.body.items, Item);
  if (badItemIds.length > 0) {
    return next(createCustomError(`No items with ids: ${badItemIds}`, 400));
  }

  const stepData = createOrUpdateStepData(req);

  const step = await Step.findOneAndUpdate({ _id: stepID }, stepData, {
    new: true, // returns the new object
    runValidators: true,
  });

  await step.populate("items");

  res.status(200).json({ step });
};

module.exports = {
  getAllSteps,
  createStep,
  getStep,
  updateStep,
  deleteStep,
};
