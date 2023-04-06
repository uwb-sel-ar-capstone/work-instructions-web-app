const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer-init");

const {
  getAllImages,
  createImage,
  getImage,
  updateImage,
  deleteImage,
} = require("../controllers/images");

router.route("/").get(getAllImages).post(upload.single("image"), createImage);
router
  .route("/:id")
  .get(getImage)
  .patch(upload.single("image"), updateImage)
  .delete(deleteImage);

module.exports = router;
