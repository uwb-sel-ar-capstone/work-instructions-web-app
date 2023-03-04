const { Model } = require("mongoose");
const checkId = require("./check-id");
/**
 * checkIds
 * @param {Object} idArr - the array of ids
 * @param {Model} model - the mongoose model
 * @returns {Array} - an array of item ids that are not a valid item document
 */
const checkIds = async (idArr, model) => {
  let ids = idArr;
  let badIds = [];

  for (let id of ids) {
    const idExists = await checkId(id, model);

    if (!idExists) {
      badIds.push(id);
    }
  }
  return badIds;
};

module.exports = checkIds;
