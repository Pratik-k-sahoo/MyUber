import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaSquare } from "react-icons/fa6";
import { IoIosCash } from "react-icons/io";

const ConfirmedVehicle = ({
	setConfirmVehiclePanel,
	handleCreateRide,
	routes,
	fare,
	vehicleType,
}) => {
	return (
		<div>
			<h5
				className="p-1 text-center absolute top-0 w-[93%]"
				onClick={() => setConfirmVehiclePanel(false)}
			>
				<i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
			</h5>
			<h4 className="text-2xl font-semibold mb-3 text-center">
				Confirm your ride
			</h4>
			<div className="flex gap-2 flex-col justify-between items-center">
				<img
					className="h-16 w-22 mb-2 drop-shadow-xl"
					src="/UberGo.png"
					alt=""
				/>
				<div className="w-full -mt-3">
					<div className="flex gap-5 w-full justify-center items-center p-3 border-b-2">
						<FaLocationDot />
						<div className="w-4/5">
							<h3 className="text-xl font-bold">
								{routes.pickUp?.structured_formatting?.main_text}
							</h3>
							<p className="text-sm text-gray-600 -mt-1">
								{routes.pickUp?.structured_formatting?.secondary_text}
							</p>
						</div>
					</div>
					<div className="flex gap-5 w-full justify-center items-center p-3 border-b-2">
						<FaSquare />
						<div className="w-4/5">
							<h3 className="text-xl font-bold">
								{routes.destination?.structured_formatting?.main_text}
							</h3>
							<p className="text-sm text-gray-600 -mt-1">
								{routes.destination?.structured_formatting?.secondary_text}
							</p>
						</div>
					</div>
					<div className="flex gap-5 w-full justify-center items-center p-3">
						<IoIosCash />
						<div className="w-4/5">
							<h3 className="text-xl font-bold">₹{fare[vehicleType]}</h3>
							<p className="text-sm text-gray-600 -mt-1">Cash</p>
						</div>
					</div>
				</div>
				<button
					onClick={() => {
						handleCreateRide();
					}}
					className="w-full mt-5 bg-green-600 text-white rounded-lg p-2 font-semibold"
				>
					Confirm
				</button>
			</div>
		</div>
	);
};

export default ConfirmedVehicle;
