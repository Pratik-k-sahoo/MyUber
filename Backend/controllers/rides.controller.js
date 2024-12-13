const { createRide } = require("../services/rides.service");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const userId = req.user._id;
		const { pickup, destination, vehicleType } = req.body;
		const ride = await createRide(userId, pickup, destination, vehicleType);
		return res.status(201).json(ride);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
