const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklistToken.model");
const Captain = require("../models/captain.model");


module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if(!token) return res.status(401).json({ message: "Unauthorized" });

  const isBlacklisted = await Blacklist.findOne({token});
  if(isBlacklisted) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    req.user = user;

    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	const isBlacklisted = await Blacklist.findOne({ token });
	if (isBlacklisted) return res.status(401).json({ message: "Unauthorized" });

  try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const captain = await Captain.findById(decoded._id);

		req.captain = captain;

		return next();
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}