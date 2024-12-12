import React, { useEffect } from "react";
import { FaLocationDot, FaSquare } from "react-icons/fa6";
import { IoIosCash } from "react-icons/io";
import Loader from "./Loader";

const LookingForDriver = ({ setVehicleFound, setWaitingForDriverPanel }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
      setVehicleFound(false);
			setWaitingForDriverPanel(true);
		}, 5000);

		return () => clearTimeout(timer);
	});

	return (
		<div>
			<h5
				className="p-1 text-center absolute top-0 w-[93%]"
				onClick={() => setVehicleFound(false)}
			>
				<i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
			</h5>
			<h4 className="text-xl font-semibold mb-3 text-center">
				Looking for nearby drivers
			</h4>
			<Loader />
			<div className="flex gap-2 flex-col justify-between items-center">
				<img className="h-28 drop-shadow-xl" src="/UberGo.png" alt="" />
				<div className="w-full -mt-3">
					<div className="flex gap-5 w-full justify-center items-center p-3 border-b-2">
						<FaLocationDot />
						<div className="w-4/5">
							<h3 className="text-xl font-bold">562/11-A</h3>
							<p className="text-sm text-gray-600 -mt-1">
								Kankariya Talab, Ahmedabad
							</p>
						</div>
					</div>
					<div className="flex gap-5 w-full justify-center items-center p-3 border-b-2">
						<FaSquare />
						<div className="w-4/5">
							<h3 className="text-xl font-bold">562/11-A</h3>
							<p className="text-sm text-gray-600 -mt-1">
								Kankariya Talab, Ahmedabad
							</p>
						</div>
					</div>
					<div className="flex gap-5 w-full justify-center items-center p-3">
						<IoIosCash />
						<div className="w-4/5">
							<h3 className="text-xl font-bold">₹193.64</h3>
							<p className="text-sm text-gray-600 -mt-1">Cash</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LookingForDriver;
