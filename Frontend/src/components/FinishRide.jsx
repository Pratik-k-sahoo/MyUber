import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const FinishRide = ({ setFinishRidePanel, ride }) => {
  const navigate = useNavigate();
	const handleFinish = async () => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
				{
					rideId: ride._id,
				},
				{
					withCredentials: true,
				}
			);

			if (response.status === 200) {
        console.log("Ride completed ", response.data);
				setFinishRidePanel(false);
				navigate("/captain/home");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h5
				onClick={() => setFinishRidePanel(false)}
				className="p-1 text-center absolute top-0 w-[93%]"
			>
				<i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
			</h5>
			<h4 className="text-2xl font-semibold mb-3 text-center">
				Finish this ride
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
							<h3 className="text-lg font-semibold">{ride?.pickup}</h3>
						</div>
					</div>
					<div className="flex gap-5 w-full justify-center items-center p-3 border-b-2">
						<div className="w-4/5">
							<h3 className="text-lg font-semibold">{ride?.destination}</h3>
						</div>
					</div>
					<div className="flex gap-5 w-full justify-center items-center p-3">
						<div className="w-4/5">
							<h3 className="text-xl font-bold">₹{Math.round(ride?.fare)}</h3>
							<p className="text-sm text-gray-600 -mt-1">Cash</p>
						</div>
					</div>
				</div>

				<div className="flex justify-between w-full gap-7 px-2">
					<button
						onClick={handleFinish}
						className="w-full mt-5 bg-green-600 text-white rounded-lg p-2 font-semibold text-center"
					>
						Complete ride
					</button>
				</div>
			</div>
		</div>
	);
};

export default FinishRide;
