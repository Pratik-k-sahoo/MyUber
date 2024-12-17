const axios = require("axios");
const Captain = require("../models/captain.model");

module.exports.getAddressCoordinates = async (address) => {
	const apiKey = process.env.GOOGLE_MAPS_API;
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
		address
	)}&key=${apiKey}`;

	try {
		const response = await axios.get(url);
		if (response.data.status === "OK") {
			const location = response.data.results[0].geometry.location;
			return {
				lat: location.lat,
				lng: location.lng,
			};
		} else {
			throw new Error("Unable to fetch coordinates");
		}
	} catch (error) {
		console.error(error);
		throw new Error("Error fetching coordinates");
	}
};

module.exports.getDistanceTime = async (origin, destination) => {
	if (!origin || !destination) {
		throw new Error("Origin and destination are required.");
	}

	const apiKey = process.env.GOOGLE_MAPS_API;
	const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

	try {
		const response = await axios.get(url);
		if (response.data.status === "OK") {
			if (response.data.rows[0].elements[0].status === "NOT_FOUND") {
				throw new Error("No routes found");
			}

			const data = response.data.rows[0].elements[0];
			return {
				distance: data.distance,
				duration: data.duration,
			};
		} else {
			throw new Error("Unable to fetch distance and time");
		}
	} catch (error) {
		console.error(error);
		throw new Error("Error fetching distance and time");
	}
};

module.exports.getAutoCompleteSuggestions = async (input) => {
	const apiKey = process.env.GOOGLE_MAPS_API;
	const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
		input
	)}&key=${apiKey}&components=country:in`;

	try {
		const response = await axios.get(url);
		if (response.data.status === "OK") {
			return response.data.predictions;
		} else {
			throw new Error("Unable to fetch suggestions");
		}
	} catch (error) {
		console.error(error);
		throw new Error("Error fetching suggestions");
	}
};

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
	console.log(lat, lng, radius);
	const captains = await Captain.find({
		location: {
			$geoWithin: {
				$centerSphere: [[lat, lng], (radius / 6371)],
			},
		},
	});

	console.log(captains);

	return captains;
};
