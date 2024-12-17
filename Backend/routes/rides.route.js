const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { authUser, authCaptain } = require("../middlewares/auth.middleware");
const {
	createRide,
	getFare,
	confirmRide,
	startRide,
	endRide,
} = require("../controllers/rides.controller");

router.post(
	"/create",
	authUser,
	body("pickup")
		.isString()
		.isLength({ min: 3 })
		.withMessage("Invalid pickup address"),
	body("destination")
		.isString()
		.isLength({ min: 3 })
		.withMessage("Invalid destination address"),
	body("vehicleType")
		.isString()
		.isIn(["car", "motorcycle", "auto"])
		.withMessage("Invalid vehicle type"),
	createRide
);

router.post(
	"/get-fare",
	authUser,
	body("pickup")
		.isString()
		.isLength({ min: 3 })
		.withMessage("Invalid pickup address"),
	body("destination")
		.isString()
		.isLength({ min: 3 })
		.withMessage("Invalid destination address"),
	getFare
);

router.post(
	"/confirm",
	authCaptain,
	body("rideId").isMongoId().withMessage("Invalid ride ID"),
	confirmRide
);

router.post(
	"/start-ride",
	authCaptain,
	body("rideId").isMongoId().withMessage("Invalid ride ID"),
	body("otp")
		.isString()
		.isLength({ min: 4, max: 4 })
		.withMessage("Invalid OTP"),
	startRide
);

router.post(
	"/end-ride",
	authCaptain,
	body("rideId").isMongoId().withMessage("Invalid ride ID"),
	endRide
);

module.exports = router;
