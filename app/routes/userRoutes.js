const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/username", userController.getUser);

router.route("/me").get(authController.protect, userController.getMyTests);
router.delete("/deleteMe", authController.protect, userController.deleteMe);

router
  .route("/:id")
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
