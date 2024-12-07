const Captain = require("../models/captain.model");
const { createCaptain } = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { email, fullname, password, vehicle } = req.body;

		const isCaptainAlreadyRegistered = await Captain.findOne({ email });
    if(isCaptainAlreadyRegistered) {
      return res.status(400).json({ message: "Captain already registered with this email" });
    }

		const { firstName, lastName } = fullname;
		const { color, plate, capacity, vehicleType } = vehicle;
		const hashedPassword = await Captain.hashPassword(password);
		const captain = await createCaptain({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			color,
			plate,
			capacity,
			vehicleType,
		});

		if (!captain) {
			return res.status(400).json({ message: "Could not create captain" });
		}

		const token = captain.generateAuthToken();

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 3600000,
		});

		res.status(201).json({ token, captain });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
