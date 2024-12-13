const {
	getAddressCoordinates,
	getDistanceTime,
	getAutoCompleteSuggestions,
} = require("../services/map.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { address } = req.query;

	try {
		const coordinates = await getAddressCoordinates(address);

		return res.status(200).json({ coordinates });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports.getDistanceTime = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { origin, destination } = req.query;

	try {
		const distanceTime = await getDistanceTime(origin, destination);

		return res.status(200).json(distanceTime);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports.getAutoCompleteSuggestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { input } = req.query;
  try {
    const suggestions = await getAutoCompleteSuggestions(input);
    return res.status(200).json(suggestions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
