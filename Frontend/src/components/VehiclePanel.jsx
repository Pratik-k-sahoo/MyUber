import React from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";

const VehiclePanel = ({ setVehiclePanel, setConfirmVehiclePanel }) => {
	return (
		<div>
			<h5
				className="p-1 text-center absolute top-0 w-[93%]"
				onClick={() => setVehiclePanel(false)}
			>
				<i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
			</h5>
			<h4 className="text-2xl font-semibold mb-3">
				Choose your preferred vehicle
			</h4>
			<div
				onClick={() => {
					setConfirmVehiclePanel(true);
					setVehiclePanel(false);
				}}
				className="flex w-full border-4 justify-center active:border-black items-center p-2 rounded-xl mb-2"
			>
				<img className="w-16 h-10 ml-1 mr-3" src="/UberGo.png" alt="" />
				<div className="w-full">
					<h2 className="text-xl font-bold">
						UberGo{" "}
						<span className="text-base font-light">
							<i className="ri-user-3-fill"></i>4
						</span>
					</h2>
					<h3 className="font-medium relative">
						2 mins away{" "}
						<i className="ri-circle-fill text-[5px] absolute top-2"></i>
						<span className="text-sm font-normal ml-2"> 15:24</span>
					</h3>
					<h4 className="text-sm text-slate-700">Affordable, compact rides</h4>
				</div>
				<h1 className="flex items-center font-medium text-xl">
					<FaIndianRupeeSign />
					193.20
				</h1>
			</div>
			<div
				onClick={() => {
					setConfirmVehiclePanel(true);
					setVehiclePanel(false);
				}}
				className="flex w-full border-4 justify-center active:border-black items-center p-2 rounded-xl mb-2"
			>
				<img className="w-[7rem] h-16" src="/Moto.png" alt="" />
				<div className="w-full">
					<h2 className="text-xl font-bold">
						Moto{" "}
						<span className="text-base font-light">
							<i className="ri-user-3-fill"></i>2
						</span>
					</h2>
					<h3 className="font-medium relative">
						6 mins away{" "}
						<i className="ri-circle-fill text-[5px] absolute top-2"></i>
						<span className="text-sm font-normal ml-2"> 15:28</span>
					</h3>
					<h4 className="text-sm text-slate-700">
						Affordable motorcycle rides
					</h4>
				</div>
				<h1 className="flex items-center font-medium text-xl">
					<FaIndianRupeeSign />
					65
				</h1>
			</div>
			<div
				onClick={() => {
					setConfirmVehiclePanel(true);
					setVehiclePanel(false);
				}}
				className="flex w-full border-4 justify-center active:border-black items-center p-2 rounded-xl mb-2"
			>
				<img className="w-32 h-14" src="/Auto.png" alt="" />
				<div className="w-full">
					<h2 className="text-xl font-bold">
						UberAuto{" "}
						<span className="text-base font-light">
							<i className="ri-user-3-fill"></i>3
						</span>
					</h2>
					<h3 className="font-medium relative">
						4 mins away{" "}
						<i className="ri-circle-fill text-[5px] absolute top-2"></i>
						<span className="text-sm font-normal ml-2"> 15:26</span>
					</h3>
					<h4 className="text-sm text-slate-700">Affordable, compact rides</h4>
				</div>
				<h1 className="flex items-center font-medium text-xl">
					<FaIndianRupeeSign />
					185.86
				</h1>
			</div>
		</div>
	);
};

export default VehiclePanel;
