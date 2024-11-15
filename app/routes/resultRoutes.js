const express = require("express");
const resultController = require("../controllers/resultsController");
const router = express.Router();
router.get("/:testId", resultController.getResults);
module.exports = router;
