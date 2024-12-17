import React, { useRef, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { FinishRide, UberLogoCaptain } from "../components";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const location = useLocation();
	const rideData = location.state.ride;
	const [finishRidePanel, setFinishRidePanel] = useState(false);
	const finishRidePanelRef = useRef(null);

	useGSAP(() => {
		if (finishRidePanel) {
			gsap.to(finishRidePanelRef.current, {
				transform: "translateY(0)",
			});
		} else {
			gsap.to(finishRidePanelRef.current, {
				transform: "translateY(100%)",
			});
		}
	}, [finishRidePanel]);

	return (
		<div className="h-screen relative">
			<div className="fixed p-7 flex justify-end border border-red-600 items-center w-screen z-50">
				<UberLogoCaptain />
				<Link
					to={"/captain/home"}
					className="h-10 w-10 border border-green-600 bg-white rounded-full drop-shadow-lg flex items-center justify-center relative z-50"
				>
					<FaHome className="text-xl font-semibold" />
				</Link>
			</div>
			<div className="h-4/5"><LiveTracking /></div>
			<div
				onClick={() => setFinishRidePanel(true)}
				className="h-1/5 p-7 flex items-center justify-between bg-yellow-400 relative rounded-t-2xl"
			>
				<h5 className="p-1 text-center absolute top-0 w-[80%]">
					<i className="ri-arrow-up-wide-line text-3xl text-gray-800"></i>
				</h5>
				<h4 className="text-xl font-semibold">4 KM Away</h4>
				<button className="px-8 py-3 bg-green-600 text-white rounded-lg p-2 font-semibold">
					Complete Ride
				</button>
			</div>
			<div
				ref={finishRidePanelRef}
				className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10 pt-12"
			>
				<FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
			</div>
		</div>
	);
};

export default CaptainRiding;
