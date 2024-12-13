const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { authUser } = require("../middlewares/auth.middleware");
const { createRide } = require("../controllers/rides.controller");

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

module.exports = router;
