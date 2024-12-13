const { Schema, model } = require("mongoose");


const BlacklistSchema = new Schema(
	{
		token: {
			type: String,
			required: true,
			unique: true,
		},
		blacklistedAt: {
			type: Date,
			default: Date.now,
			expires: 86400,
		},
	},
	{ timestamps: true }
);

const Blacklist = model("Blacklist", BlacklistSchema);

module.exports = Blacklist;
