const Ride = require("../models/rides.model");
const { getDistanceTime } = require("./map.service");
const crypto = require("crypto");

function getOTP() {
	const otp = crypto.randomInt(Math.pow(10, 3), Math.pow(10, 4)).toString();
	return otp;
}

async function getFare(pickup, destination) {
	if (!pickup || !destination) {
		throw new Error("Pickup and destination are required");
	}

	try {
		const distanceTime = await getDistanceTime(pickup, destination);
		const distance = distanceTime.distance.value / 1000;
		const time = distanceTime.duration.value / 60;
		const fares = {
			car: calculateCarFare(distance, time),
			auto: calculateAutoFare(distance, time),
			motorcycle: calculateMotorcycleFare(distance, time),
		};

		return fares;
	} catch (error) {
		console.error(error);
		throw new Error("Error calculating fare");
	}
}

function calculateCarFare(distance, time) {
	const baseFare = 50;
	const perKmRate = 10;
	const perMinuteRate = 2;
	return baseFare + perKmRate * distance + perMinuteRate * time;
}

function calculateAutoFare(distance, time) {
	const baseFare = 30;
	const perKmRate = 8;
	const perMinuteRate = 1.5;
	return baseFare + perKmRate * distance + perMinuteRate * time;
}

function calculateMotorcycleFare(distance, time) {
	const baseFare = 20;
	const perKmRate = 5;
	const perMinuteRate = 1;
	return baseFare + perKmRate * distance + perMinuteRate * time;
}

module.exports.createRide = async (
	userId,
	pickup,
	destination,
	vehicleType
) => {
	if (!userId || !destination || !pickup || !vehicleType) {
		throw new Error("Invalid ride details");
	}
	const fare = await getFare(pickup, destination);
	console.log(fare);
	const ride = await Ride.create({
		user: userId,
		pickup,
		destination,
		otp: getOTP(),
		fare: fare[vehicleType],
	});
	return ride;
};

module.exports.getFare = getFare;
