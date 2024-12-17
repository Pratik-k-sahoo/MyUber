import React, { useEffect } from "react";
import { FaSquare, FaStar } from "react-icons/fa6";
import { IoIosCash } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
	const location = useLocation();
	const rideData = location.state.ride;

	const { socket } = useSelector((state) => state.socket);
	const navigate = useNavigate();

	useEffect(() => {
		if (socket) {
			socket.on("ride-ended", (data) => {
				console.log("Ride completed ", data);

				navigate("/home");
			});
		}
	}, [socket, navigate]);

	return (
		<div className="h-screen relative">
			<Link
				to={"/home"}
				className="fixed right-2 top-2 h-10 w-10 bg-white rounded-full drop-shadow-lg flex items-center justify-center"
			>
				<IoHome className="text-lg font-semibold" />
			</Link>
			<div className="h-1/2">
				<LiveTracking />
			</div>
			<div className="h-1/2 p-4">
				<div className="flex items-center justify-between mb-3">
					<img src="/UberGo.png" alt="" className="h-12" />
					<div className="text-right">
						<h2 className="text-lg font-medium">
							{rideData?.captain?.fullname?.firstName +
								" " +
								rideData?.captain?.fullname?.lastName}
						</h2>
						<h4 className="text-xl font-semibold -my-1">
							{rideData?.captain?.vehicle?.plate}
						</h4>
						<p className="text-md text-gray-600">
							{rideData?.captain?.vehicle?.vehicleType}
						</p>
						<p className="flex items-center justify-end gap-1 text-sm">
							<FaStar className="text-gray-500" />
							4.6
						</p>
					</div>
				</div>
				<div className="flex gap-2 flex-col justify-between items-center">
					<div className="w-full -mt-3">
						<div className="flex gap-5 w-full justify-center items-center p-3 border-b-2">
							<FaSquare />
							<div className="w-4/5">
								<h3 className="text-lg font-semibol">
									{rideData?.destination}
								</h3>
							</div>
						</div>
						<div className="flex gap-5 w-full justify-center items-center p-3">
							<IoIosCash />
							<div className="w-4/5">
								<h3 className="text-xl font-bold">
									₹{Math.round(rideData?.fare)}
								</h3>
								<p className="text-sm text-gray-600 -mt-1">Cash</p>
							</div>
						</div>
					</div>
				</div>
				<button className="w-full mt-5 bg-green-600 text-white rounded-lg p-2 font-semibold">
					Make a Payment
				</button>
			</div>
		</div>
	);
};

export default Riding;
