const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new Schema({
	fullname: {
		firstName: {
			type: String,
			required: true,
			minLength: [3, "First name must be at least 3 characters long"],
		},
		lastName: {
			type: String,
			minLength: [3, "Last name must be at least 3 characters long"],
		},
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"Invalid email format",
		],
	},
	password: {
		type: String,
		required: true,
		minLength: [6, "Password must be at least 6 characters long"],
		select: false,
	},
	socketId: {
		type: String,
	},
	status: {
		type: String,
		enum: ["Available", "On Duty", "On Break", "Offline"],
		default: "Offline",
	},
	vehicle: {
		color: {
			type: String,
			required: true,
			minLength: [3, "Vehicle must be at least 2 characters long"],
		},
		plate: {
			type: String,
			required: true,
			unique: true,
			minLength: [8, "Invalid plate number format"],
		},
		capacity: {
			type: Number,
			required: true,
			min: [1, "Capacity must be at least 1"],
		},
		vehicleType: {
			type: String,
			required: true,
			enum: ["car", "motorcycle", "auto"],
		},
	},
	location: {
		lat: {
			type: Number,
		},
		lng: {
			type: Number,
		},
	},
});

captainSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "24h",
	});
	return token;
};

captainSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
	return await bcrypt.hash(password, 10);
};

const Captain = model("Captain", captainSchema);

module.exports = Captain;