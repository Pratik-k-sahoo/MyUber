const User = require("../models/user.model");

module.exports.createUser = async ({
	firstName,
	lastName,
	email,
	password,
}) => {
	if (!firstName || !email || !password) {
		throw new Error("Please provide all required fields");
	}

	const user = await User.create({
		fullname: {
			firstName,
			lastName,
		},
		email,
		password,
	});

	return user;
};
