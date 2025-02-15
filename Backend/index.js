const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");
const userRouter = require("./routes/user.route");
const captainRouter = require("./routes/captain.route");
const mapRouter = require("./routes/maps.route");
const rideRouter = require("./routes/rides.route");

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use("/api/users", userRouter);
app.use("/api/captains", captainRouter);
app.use("/api/maps", mapRouter);
app.use("/api/rides", rideRouter);

module.exports = app;
