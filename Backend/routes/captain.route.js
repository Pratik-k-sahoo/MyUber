const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { authUser, authCaptain } = require("../middlewares/auth.middleware");
const {
	registerCaptain,
	loginCaptain,
  getCaptainProfile,
  logout,
} = require("../controllers/captain.controller");

router.post(
	"/register",
	[
		body("email").isEmail().withMessage("Invalid Email"),
		body("fullname.firstName")
			.isLength({ min: 3 })
			.withMessage("First name must be at least 3 characters long"),
		body("password")
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters long"),
		body("vehicle.color")
			.isLength({ min: 3 })
			.withMessage("Vehicle color must be at least 3 characters long"),
		body("vehicle.plate")
			.isLength({ min: 8 })
			.withMessage("Invalid plate number format"),
		body("vehicle.capacity")
			.isInt({ min: 1 })
			.withMessage("Capacity must be at least 1"),
		body("vehicle.vehicleType")
			.isIn(["car", "motorcycle", "auto"])
			.withMessage("Invalid vehicle type"),
	],
	registerCaptain
);

router.post(
	"/login",
	[
		body("email").isEmail().withMessage("Invalid Email"),
		body("password")
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters long"),
	],
	loginCaptain
);

router.get("/profile", authCaptain, getCaptainProfile);
router.get("/logout", authCaptain, logout);

module.exports = router;
