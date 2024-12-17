const {
	getCaptainsInTheRadius,
	getAddressCoordinates,
} = require("../services/map.service");
const {
	createRide,
	getFare,
	confirmRide,
	startRide,
	endRide,
} = require("../services/rides.service");
const { validationResult } = require("express-validator");
const { sendMessageToSocket } = require("../socket");
const Ride = require("../models/rides.model");

module.exports.createRide = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const userId = req.user._id;
		const { pickup, destination, vehicleType } = req.body;
		const ride = await createRide(userId, pickup, destination, vehicleType);
		res.status(201).json(ride);

		const pickupCoordinates = await getAddressCoordinates(pickup);
		const captainsInRadius = await getCaptainsInTheRadius(
			pickupCoordinates.lat,
			pickupCoordinates.lng,
			2
		);

		const rideWithUser = await Ride.findById(ride._id).populate("user");
		captainsInRadius.map((captain) => {
			sendMessageToSocket(captain.socketId, {
				event: "new-ride",
				data: rideWithUser,
			});
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports.getFare = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { pickup, destination } = req.body;
		const fare = await getFare(pickup, destination);
		return res.status(201).json(fare);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports.confirmRide = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const rideId = req.body.rideId;
		const ride = await confirmRide(rideId, req.captain._id);

    sendMessageToSocket(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    })
		return res.status(200).json(ride);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {rideId, otp} = req.body;
    console.log("REQ", req.body);
    
    const ride = await startRide(rideId, otp);

    if(ride) {
      sendMessageToSocket(ride.user.socketId, {
        event: "ride-started",
        data: ride,
      });
    }
    return res.status(200).json(ride);
  }
  catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {rideId} = req.body;
    const ride = await endRide(rideId, req.captain._id);

    if(ride) {
      sendMessageToSocket(ride.user.socketId, {
        event: "ride-ended",
        data: ride,
      });
    }
    return res.status(200).json(ride);
  }
  catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
