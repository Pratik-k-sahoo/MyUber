const Blacklist = require("../models/blacklistToken.model");
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
		if (isCaptainAlreadyRegistered) {
			return res
				.status(400)
				.json({ message: "Captain already registered with this email" });
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

module.exports.loginCaptain = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { email, password } = req.body;
		const captain = await Captain.findOne({ email }).select("+password");

		if (!captain) {
			return res.status(401).json({
				message: "Invalid Email or Password",
			});
		}

		const isMatch = await captain.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({
				message: "Invalid Email or Password",
			});
		}

		const token = captain.generateAuthToken();

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 3600000,
		});

		return res.status(200).json({ token, captain });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports.getCaptainProfile = async (req, res, next) => {
	return res.status(200).json({ captain: req.captain });
};

module.exports.logout = async (req, res, next) => {
	const token = req.cookies.token || req.headers.authorization.split(" ")[1];
	await Blacklist.create({ token });
	res.clearCookie("token");
	return res.status(200).json({ message: "Logged out" });
};
