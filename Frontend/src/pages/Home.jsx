import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
	ConfirmedVehicle,
	LocationSearchPanel,
	TripForm,
	UberLogoBlack,
	VehiclePanel,
  LookingForDriver,
  WaitingForDriver,
} from "../components";

const Home = () => {
	const [routes, setRoutes] = useState({
		pickUp: "",
		destination: "",
	});

	const [panelOpen, setPanelOpen] = useState(false);
	const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmVehiclePanel, setConfirmVehiclePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);

	const panelRef = useRef(null);
	const panelIcon = useRef(null);
	const vehiclePanelRef = useRef(null);
  const confirmVehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	useGSAP(() => {
		if (panelOpen) {
			gsap.to(panelIcon.current, {
				opacity: 1,
			});
			gsap.to(panelRef.current, {
				height: "70%",
				padding: 24,
			});
		} else {
			gsap.to(panelIcon.current, {
				opacity: 0,
			});
			gsap.to(panelRef.current, {
				height: "0%",
				padding: 0,
			});
		}
	}, [panelOpen]);

	useGSAP(() => {
		if (vehiclePanel) {
			gsap.to(vehiclePanelRef.current, {
				transform: "translateY(0)",
			});
		} else {
			gsap.to(vehiclePanelRef.current, {
				transform: "translateY(100%)",
			});
		}
	}, [vehiclePanel]);

	useGSAP(() => {
		if (confirmVehiclePanel) {
			gsap.to(confirmVehiclePanelRef.current, {
				transform: "translateY(0)",
			});
		} else {
			gsap.to(confirmVehiclePanelRef.current, {
				transform: "translateY(100%)",
			});
		}
	}, [confirmVehiclePanel]);

	useGSAP(() => {
		if (vehicleFound) {
			gsap.to(vehicleFoundRef.current, {
				transform: "translateY(0)",
			});
		} else {
			gsap.to(vehicleFoundRef.current, {
				transform: "translateY(100%)",
			});
		}
	}, [vehicleFound]);

	useGSAP(() => {
		if (waitingForDriverPanel) {
			gsap.to(waitingForDriverRef.current, {
				transform: "translateY(0)",
			});
		} else {
			gsap.to(waitingForDriverRef.current, {
				transform: "translateY(100%)",
			});
		}
	}, [waitingForDriverPanel]);

	return (
		<div className="h-screen relative overflow-hidden">
			<UberLogoBlack />
			<div className="h-screen w-screen">
				{/* TODO: Temporary image */}
				<img
					className="h-full w-full object-cover"
					src="https://media.licdn.com/dms/image/v2/C5112AQEocbHNC2ZmIA/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1534422634779?e=1737590400&v=beta&t=6kZZ1uETNP8yMq9RQWsftmzWWs17RxJiaip2G0EvCBg"
					alt=""
				/>
			</div>
			<div className="flex flex-col justify-end h-screen absolute top-0 w-full">
				<TripForm
					handleSubmit={handleSubmit}
					setPanelOpen={setPanelOpen}
					routes={routes}
					setRoutes={setRoutes}
					panelIcon={panelIcon}
				/>
				<div ref={panelRef} className="bg-white h-0">
					<LocationSearchPanel
						setVehiclePanel={setVehiclePanel}
						setPanelOpen={setPanelOpen}
						setRoutes={setRoutes}
					/>
				</div>
			</div>
			<div
				ref={vehiclePanelRef}
				className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10 pt-12"
			>
				<VehiclePanel
					setConfirmVehiclePanel={setConfirmVehiclePanel}
					setVehiclePanel={setVehiclePanel}
				/>
			</div>
			<div
				ref={confirmVehiclePanelRef}
				className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12"
			>
				<ConfirmedVehicle
					setVehicleFound={setVehicleFound}
					setConfirmVehiclePanel={setConfirmVehiclePanel}
				/>
			</div>

			<div
				ref={vehicleFoundRef}
				className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12"
			>
				<LookingForDriver
					setWaitingForDriverPanel={setWaitingForDriverPanel}
					setVehicleFound={setVehicleFound}
				/>
			</div>

			<div ref={waitingForDriverRef} className="fixed z-10 bottom-0  bg-white w-full px-3 py-6 pt-12">
				<WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel} />
			</div>
		</div>
	);
};

export default Home;
