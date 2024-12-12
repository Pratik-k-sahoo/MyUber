import React from "react";

const TripForm = ({
	handleSubmit,
	setPanelOpen,
	routes,
	setRoutes,
	panelIcon,
}) => {
	return (
		<div className="h-[30%] p-5 bg-white relative rounded-t-xl">
			<h5
				ref={panelIcon}
				onClick={() => setPanelOpen(false)}
				className="absolute top-1 left-3 text-2xl opacity-0"
			>
				<i className="ri-arrow-down-wide-line"></i>
			</h5>
			<h4 className="text-2xl font-semibold mt-3">Find a trip</h4>
			<form onSubmit={handleSubmit}>
				<div className="line absolute h-16 w-1 top-[49%] left-10 bg-gray-800 rounded-full"></div>
				<input
					onClick={() => setPanelOpen(true)}
					className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
					type="text"
					placeholder="Add a pick-up location"
					value={routes.pickUp}
					onChange={(e) => setRoutes({ ...routes, pickUp: e.target.value })}
					name="pickUp"
				/>
				<input
					onClick={() => setPanelOpen(true)}
					className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
					type="text"
					placeholder="Enter your destination"
					value={routes.destination}
					onChange={(e) =>
						setRoutes({ ...routes, destination: e.target.value })
					}
					name="destination"
				/>
			</form>
		</div>
	);
};

export default TripForm;
