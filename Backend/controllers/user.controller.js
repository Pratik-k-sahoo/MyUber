const User = require("../models/user.model");
const { createUser } = require("../services/user.service");
const { validationResult } = require("express-validator");
const Blacklist = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { fullname, email, password } = req.body;

    const isUserAlreadyRegistered = await User.findOne({ email });
		if (isUserAlreadyRegistered) {
			return res
				.status(400)
				.json({ message: "User already registered with this email" });
		}

		const hashedPassword = await User.hashPassword(password);

		const user = await createUser({
			firstName: fullname.firstName,
			lastName: fullname.lastName,
			email,
			password: hashedPassword,
		});

		if (!user) {
			return res.status(400).json({ message: "Could not create user" });
		}

		const token = user.generateAuthToken();

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 3600000,
		});

		return res.status(201).json({ token, user });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports.loginUser = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email }).select("+password");

		if (!user) {
			return res.status(401).json({
				message: "Invalid Email or Password",
			});
		}

		const isMatch = await user.comparePassword(password);

		if (!isMatch) {
			return res.status(401).json({
				message: "Invalid Email or Password",
			});
		}

		const token = user.generateAuthToken();

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 3600000,
		});

		return res.status(200).json({ token, user });
	} catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getUserProfile = async (req, res, next) => {
	return res.status(200).json({ user: req.user });
};

module.exports.logout = async (req, res, next) => {
	const token = req.cookies.token || req.headers.authorization.split(" ")[1];
	await Blacklist.create({ token });
	res.clearCookie("token");
	return res.status(200).json({ message: "Logged out" });
};
