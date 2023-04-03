const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer-init");

const {
  getAllSteps,
  createStep,
  getStep,
  updateStep,
  deleteStep,
} = require("../controllers/steps");

router.route("/").get(getAllSteps).post(upload.single("image"), createStep);
router
  .route("/:id")
  .get(getStep)
  .patch(upload.single("image"), updateStep)
  .delete(deleteStep);

module.exports = router;
