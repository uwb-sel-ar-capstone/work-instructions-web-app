const express = require("express");
const router = express.Router();

const { populateDB, deleteDB } = require("../controllers/debug");

router.route("/").get(populateDB).delete(deleteDB);

module.exports = router;
