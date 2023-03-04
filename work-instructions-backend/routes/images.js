const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer-init");

const { updateImage } = require("../controllers/images");

router.route("/:id").patch(upload.single("image"), updateImage);

module.exports = router;
