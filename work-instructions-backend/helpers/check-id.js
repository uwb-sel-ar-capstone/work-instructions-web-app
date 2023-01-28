const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
/**
 * checkId
 * @param {Object} id - id string
 * @returns {Boolean} - boolean true if id is a valid document in model, false if otherwise
 */
const checkId = async (id, model) => {
  if (!id) {
    return false;
  }
  // Forcing the id to be of length 24. toId is expecting a string of 12 bytes or a string of 24 hex characters
  if (String(id).length != 24) {
    return false;
  }
  try {
    objId = toId(id);
  } catch (error) {
    return false;
  }

  const exists = await model.exists({ _id: objId });
  return exists;
};

module.exports = checkId;
