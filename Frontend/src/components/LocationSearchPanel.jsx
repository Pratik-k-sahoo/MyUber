import React, { useState } from "react";

const location = [
	{
		id: 1,
		address:
			"163, Forest Park, Near Star Coaching Center, Park Street, Bhubaneswar",
	},
	{
		id: 2,
		address: "45, Green Avenue, Opposite City Mall, Main Road, Mumbai",
	},
	{
		id: 3,
		address: "78, Lake View, Behind Central Park, Lake Road, Kolkata",
	},
	{
		id: 4,
		address: "22, Hilltop Residency, Near Sunrise School, Hill Street, Pune",
	},
	{
		id: 5,
		address: "90, Riverbank, Adjacent to Tech Park, River Road, Bangalore",
	},
	{
		id: 6,
		address: "56, Ocean Drive, Next to Marina Bay, Coastal Road, Chennai",
	},
];

const LocationSearchPanel = ({
	setPanelOpen,
	setVehiclePanel,
	setRoutes,
	suggestions,
	activeField,
	routes,
	handleProceed,
}) => {
	const handleSuggestionClick = (suggestion) => {
		if (activeField === "pickup") {
			setRoutes({ ...routes, pickUp: suggestion });
			suggestions = [];
		} else setRoutes({ ...routes, destination: suggestion });
	};

	return (
		<div>
			<button
				onClick={handleProceed}
				className="w-full bg-green-600 text-white rounded-lg p-2 font-semibold"
			>
				Proceed
			</button>
			{suggestions.map((loc, idx) => (
				<div
					onClick={() => handleSuggestionClick(loc)}
					key={idx}
					className="flex items-center justify-start gap-4 my-1 border-white active:border-black border-2 py-1 px-2 rounded-xl"
				>
					<h2 className="bg-[#eee] rounded-full p-2 max-h-10 max-w-14 flex items-center justify-center">
						<i className="ri-map-pin-fill"></i>
					</h2>
					<h4 className="font-medium">{loc.description}</h4>
				</div>
			))}
		</div>
	);
};

export default LocationSearchPanel;
