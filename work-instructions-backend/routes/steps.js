const express = require("express");
const router = express.Router();

const {
  getAllSteps,
  createStep,
  getStep,
  updateStep,
  deleteStep,
} = require("../controllers/steps");

router.route("/").get(getAllSteps).post(createStep);
router.route("/:id").get(getStep).patch(updateStep).delete(deleteStep);

module.exports = router;
