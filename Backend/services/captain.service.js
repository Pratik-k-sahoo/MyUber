const Captain = require("../models/captain.model");

module.exports.createCaptain = async ({
	firstName,
	lastName,
	email,
	password,
	color,
	plate,
	capacity,
	vehicleType,
}) => {
	if (
		!firstName ||
		!email ||
		!password ||
		!color ||
		!plate ||
		!capacity ||
		!vehicleType
	) {
		throw new Error("Missing required fields");
	}

	const captain = await Captain.create({
		fullname: {
			firstName,
			lastName,
		},
		email,
		password,
		vehicle: {
			color,
			plate,
			capacity,
			vehicleType,
		},
	});

  return captain;
};
