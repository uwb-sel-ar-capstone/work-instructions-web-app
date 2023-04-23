const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer-init");

const {
  getAllWIs,
  createWI,
  getWI,
  updateWI,
  deleteWI,
} = require("../controllers/wi");

router.route("/").get(getAllWIs).post(createWI);
router.route("/:id").get(getWI).patch(updateWI).delete(deleteWI);

module.exports = router;
