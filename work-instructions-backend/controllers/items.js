const Item = require("../models/Item");
const { createCustomError } = require("../errors/custom-error");
const checkId = require("../helpers/check-id");

const getAllItems = async (req, res) => {
  const items = await Item.find({});
  res.status(200).json({ items: items });
};

const createItem = async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).json({ item });
};

const getItem = async (req, res, next) => {
  const { id: itemID } = req.params;

  const validItemId = await checkId(itemID, Item);

  if (!validItemId) {
    return next(createCustomError(`No item with id: ${itemID}`, 404));
  }
  const item = await Item.findOne({ _id: itemID });

  res.status(200).json({ item });
};

const deleteItem = async (req, res, next) => {
  const { id: itemID } = req.params;
  const validItemId = await checkId(itemID, Item);
  if (!validItemId) {
    return next(createCustomError(`No item with id: ${itemID}`, 404));
  }
  const item = await Item.findOneAndDelete({ _id: itemID });

  res.status(200).json({ item });
};

const updateItem = async (req, res, next) => {
  const { id: itemID } = req.params;
  const validItemId = await checkId(itemID, Item);
  if (!validItemId) {
    return next(createCustomError(`No item with id: ${itemID}`, 404));
  }
  const item = await Item.findOneAndUpdate({ _id: itemID }, req.body, {
    new: true, // returns the new object
    runValidators: true,
  });

  res.status(200).json({ item });
};

module.exports = {
  getAllItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
};
