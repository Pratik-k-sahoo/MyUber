const { Schema, model } = require("mongoose");

const rideSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		pickup: {
			type: String,
			required: true,
		},
		destination: {
			type: String,
			required: true,
		},
		distance: {
			type: Number,
		},
		duration: {
			type: Number,
		},
		status: {
			type: String,
			enum: ["pending", "accepted", "ongoing", "canceled", "completed"],
			default: "pending",
		},
		captain: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		fare: {
			type: Number,
			required: true,
		},
		paymentId: {
      type: String,
    },
    orderId: {
      type: String,
    },
    signature: {
      type: String,
    },
    otp: {
      type: String,
      select: false,
      required: true,
    }
	},
	{ timestamps: true }
);

const Ride = model("Ride", rideSchema);

module.exports = Ride;
