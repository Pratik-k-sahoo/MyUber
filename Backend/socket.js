const socketIo = require("socket.io");
const User = require("./models/user.model");
const Captain = require("./models/captain.model");

let io;

function initialiseSocket(server) {
	io = socketIo(server, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});
	io.on("connection", (socket) => {
		console.log(`Client connected: ${socket.id}`);

		socket.on("join", async (data) => {
			const { userId, userType } = data;
			if (userType === "user") {
				console.log(`User ${userId} and socket ${socket.id} joined`);
				await User.findByIdAndUpdate(userId, {
					socketId: socket.id,
				});
			} else if (userType === "captain") {
				console.log(`Captain ${userId} and socket ${socket.id} joined`);
				await Captain.findByIdAndUpdate(userId, {
					socketId: socket.id,
				});
			}
		});

		socket.on("update-location-captain", async (data) => {
			const { captainId, location } = data;
			if (!location || !location.lat || !location.lng)
				return socket.emit("error", { message: "Invalid location" });
			console.log(
				`Captain ${captainId} location updated: ${location.lat}, ${location.lng}`
			);

			await Captain.findByIdAndUpdate(captainId, {
				location: {
					lat: location.lat,
					lng: location.lng,
				},
			});
		});

		socket.on("disconnect", () => {
			console.log(`Client disconnected: ${socket.id}`);
		});
	});
}

function sendMessageToSocket(socketId, message) {
	if (io) {
		io.to(socketId).emit(message.event, message.data);
	} else {
		console.error("Socket not initialised");
	}
}

module.exports = {
	initialiseSocket,
	sendMessageToSocket,
};
