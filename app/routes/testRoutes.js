const express = require("express");
const testController = require("../controllers/testController.js");
const { protect } = require("../controllers/authController.js");
const router = express.Router();

router.get("/more-tests", protect, testController.getAllTestsExcludingMine);
router
  .route("/")
  .post(protect, testController.createTest)
  .get(testController.getAllTests);

router
  .route("/:id")
  .get(testController.getTest)
  .patch(testController.updateTest)
  .delete(testController.deleteTest);

module.exports = router;
