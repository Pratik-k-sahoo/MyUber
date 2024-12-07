const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
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
    select: false,
	},
	socketId: {
		type: String,
	},
});

userSchema.methods.generateAuthToken = function () {
const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
}

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
}

const User = model("User", userSchema);

module.exports = User;