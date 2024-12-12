import React from "react";
import { FaLocationDot, FaSquare, FaStar } from "react-icons/fa6";
import { IoIosCash } from "react-icons/io";

const WaitingForDriver = ({setWaitingForDriverPanel}) => {
	return (
		<div>
			<h5
				onClick={() => setWaitingForDriverPanel(false)}
				className="p-1 text-center absolute top-0 w-[93%]"
			>
				<i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
			</h5>
			<div className="flex items-center justify-between mb-3">
				<img src="/UberGo.png" alt="" className="h-12" />
				<div className="text-right">
					<h2 className="text-lg font-medium">Pratik</h2>
					<h4 className="text-xl font-semibold -my-1">OD 33 AP 1364</h4>
					<p className="text-md text-gray-600">Fortuner</p>
					<p className="flex items-center justify-end gap-1 text-sm">
						<FaStar className="text-gray-500" />
						4.6
					</p>
				</div>
			</div>
			<div className="flex gap-2 flex-col justify-between items-center">
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

export default WaitingForDriver;
