const WI = require("../models/WI");
const { createCustomError } = require("../errors/custom-error");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

/**
 * createOrUpdateWIData - helper function that parses the body of a request to generate the data used by mongoose to create or update WI documents
 * @param {Object} req - the request object
 * @returns {Map} - the mongoose readable object of wi data
 */
const createOrUpdateWIData = (req) => {
  let stepIDs = req.body.steps;

  let wiData = { wiName: req.body.wiName };

  // If we are given step ids, map them to Mongoose ObjectIds
  if (stepIDs) {
    stepIDs = stepIDs.map((id) => {
      return toId(id);
    });
    wiData["steps"] = stepIDs;
  }
  return wiData;
};

const getAllWIs = async (req, res) => {
  let wis = await WI.find({});
  for (let wi of wis) {
    await wi.populate({ path: "steps", populate: { path: "items" } });
  }
  res.status(200).json({ wis });
};

const createWI = async (req, res) => {
  const wiData = createOrUpdateWIData(req);
  const wi = await (
    await WI.create(wiData)
  ).populate({ path: "steps", populate: { path: "items" } });

  res.status(201).json({ wi });
};

const getWI = async (req, res, next) => {
  const { id: wiID } = req.params;
  const wi = await WI.findOne({ _id: wiID });
  if (!wi) {
    return next(
      createCustomError(`No work instruction with id : ${wiID}`, 404)
    );
  }

  await wi.populate({ path: "steps", populate: { path: "items" } });

  res.status(200).json({ wi });
};

const deleteWI = async (req, res, next) => {
  const { id: wiID } = req.params;
  const wi = await WI.findOneAndDelete({ _id: wiID });
  if (!wi) {
    return next(
      createCustomError(`No work instruction with id : ${wiID}`, 404)
    );
  }
  await wi.populate({ path: "steps", populate: { path: "items" } });
  res.status(200).json({ wi });
};

const updateWI = async (req, res, next) => {
  const { id: wiID } = req.params;

  const wiData = createOrUpdateWIData(req);

  const wi = await WI.findOneAndUpdate({ _id: wiID }, wiData, {
    new: true, // returns the new object
    runValidators: true,
  });

  if (!wi) {
    return next(
      createCustomError(`No work instruction with id : ${wiID}`, 404)
    );
  }

  await wi.populate({ path: "steps", populate: { path: "items" } });

  res.status(200).json({ wi });
};

module.exports = {
  getAllWIs,
  createWI,
  getWI,
  updateWI,
  deleteWI,
};
