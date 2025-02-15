import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CaptainConfirmRidePopup = ({ setCaptainConfirmRidePopupPanel, ride }) => {
	const [otp, setOtp] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
				{ rideId: ride?._id, otp },
				{
					withCredentials: true,
				}
			);
			console.log("Ride confirmed");
			if (response.status === 200) {
				navigate("/captain/riding", {state: {ride}});
				setCaptainConfirmRidePopupPanel(false);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h5
				onClick={() => setCaptainConfirmRidePopupPanel(false)}
				className="p-1 text-center absolute top-0 w-[93%]"
			>
				<i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
			</h5>
			<h4 className="text-2xl font-semibold mb-3 text-center">
				Confirm this ride to start
			</h4>
			<div className="flex items-center justify-between my-4 bg-yellow-500 p-3 rounded-t-2xl">
				<div className="flex items-center justify-start gap-3">
					<img
						src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947"
						alt=""
						className="h-14 w-14 rounded-full object-cover drop-shadow-md"
					/>
					<h2 className="text-lg font-medium">
						{ride?.user?.fullname?.firstName +
							" " +
							ride?.user?.fullname?.lastName}
					</h2>
				</div>
				<h5 className="text-lg font-semibold">2.2 KM</h5>
			</div>
			<div className="flex gap-2 flex-col justify-between items-center">
				<div className="w-full -mt-3">
					<div className="flex gap-5 w-full justify-center items-center p-3 border-b-2">
						<div className="w-4/5">
							<h3 className="text-sm font-semibold">{ride.pickup}</h3>
						</div>
					</div>
					<div className="flex gap-5 w-full justify-center items-center p-3 border-b-2">
						<div className="w-4/5">
							<h3 className="text-sm font-semibold">{ride.pickup}</h3>
						</div>
					</div>
					<div className="flex gap-5 w-full justify-center items-center p-3">
						<div className="w-4/5">
							<h3 className="text-xl font-bold">₹{Math.round(ride?.fare)}</h3>
							<p className="text-sm text-gray-600 -mt-1">Cash</p>
						</div>
					</div>
				</div>
				<form onSubmit={handleSubmit} className="w-full">
					<input
						type="number"
						placeholder="Enter your OTP"
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
						className="bg-[#eee] px-6 py-4 font-mono text-base rounded-lg w-full mt-5"
					/>
					<div className="flex justify-between w-full gap-7 px-2">
						<button
							type="submit"
							onClick={() => {
								setCaptainConfirmRidePopupPanel(false);
							}}
							className="w-full mt-5 bg-green-600 text-white rounded-lg p-2 font-semibold text-center"
						>
							Confirm
						</button>
						<button className="w-full mt-5 bg-red-600 text-white rounded-lg p-2 font-semibold">
							Reject
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CaptainConfirmRidePopup;
