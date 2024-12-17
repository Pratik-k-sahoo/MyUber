import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const [routes, setRoutes] = useState({
		pickUp: {},
		destination: {},
	});

	const [panelOpen, setPanelOpen] = useState(false);
	const [vehiclePanel, setVehiclePanel] = useState(false);
	const [confirmVehiclePanel, setConfirmVehiclePanel] = useState(false);
	const [vehicleFound, setVehicleFound] = useState(false);
	const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
	const [pickupSuggestions, setPickupSuggestions] = useState([]);
	const [destinationSuggestions, setDestinationSuggestions] = useState([]);
	const [activeField, setActiveField] = useState(null);
	const [fare, setFare] = useState([]);
	const [vehicleType, setVehicleType] = useState(null);
	const [ride, setRide] = useState(null);
  const [otp, setOtp] = useState(null);

	const panelRef = useRef(null);
	const panelIcon = useRef(null);
	const vehiclePanelRef = useRef(null);
	const confirmVehiclePanelRef = useRef(null);
	const vehicleFoundRef = useRef(null);
	const waitingForDriverRef = useRef(null);

	const { user } = useSelector((state) => state.user);
	const { socket } = useSelector((state) => state.socket);

  const navigate = useNavigate();

	useEffect(() => {
		if (socket) {
			socket.emit("join", { userType: "user", userId: user._id });

			socket.on("ride-confirmed", (data) => {
				setRide(data);
				setVehicleFound(false);
				setWaitingForDriverPanel(true);
			});

      socket.on("ride-started", (data) => {
        setWaitingForDriverPanel(false);
        console.log(data);        
        navigate("/riding", {state: {ride: data}});
      });
		}
	}, [user, socket, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handlePickupChange = async (e) => {
		setRoutes({ ...routes, pickUp: e.target.value });
		if (e.target.value.length > 2) {
			try {
				const suggestions = await axios.get(
					`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${
						e.target.value
					}`,
					{
						withCredentials: true,
					}
				);
				console.log(suggestions.data);
				setPickupSuggestions(suggestions.data);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleDestinationChange = async (e) => {
		setRoutes({ ...routes, destination: e.target.value });
		if (e.target.value.length > 2) {
			try {
				const suggestions = await axios.get(
					`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${
						e.target.value
					}`,
					{
						withCredentials: true,
					}
				);
				console.log(suggestions.data);
				setDestinationSuggestions(suggestions.data);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleProceed = async () => {
		// setPanelOpen(false);
		// 	setVehiclePanel(true);
		if (
			routes.pickUp.description.length > 0 &&
			routes.destination.description.length
		) {
			try {
				const myFare = await axios.post(
					`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
					{
						pickup: routes.pickUp.description,
						destination: routes.destination.description,
					},
					{
						withCredentials: true,
					}
				);
				console.log(myFare);
				if (myFare.status === 201) {
					setFare(myFare.data);
					setPanelOpen(false);
					setVehiclePanel(true);
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleCreateRide = async () => {
		if (vehicleType.length > 0) {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BASE_URL}/rides/create`,
					{
						pickup: routes.pickUp.description,
						destination: routes.destination.description,
						vehicleType,
					},
					{
						withCredentials: true,
					}
				);
				if (response.status === 201) {
					console.log(response.data);
          setOtp(response.data.otp)
					setVehicleFound(true);
					setConfirmVehiclePanel(false);
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleSelectVehicleType = (vehicle) => {
		if (vehicle.length > 0) {
			setVehicleType(vehicle);
			setConfirmVehiclePanel(true);
			setVehiclePanel(false);
		}
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
				zIndex: 10,
			});
		} else {
			gsap.to(vehiclePanelRef.current, {
				transform: "translateY(100%)",
				zIndex: -10,
			});
		}
	}, [vehiclePanel]);

	useGSAP(() => {
		if (confirmVehiclePanel) {
			gsap.to(confirmVehiclePanelRef.current, {
				transform: "translateY(0)",
				zIndex: 10,
			});
		} else {
			gsap.to(confirmVehiclePanelRef.current, {
				transform: "translateY(100%)",
				zIndex: -10,
			});
		}
	}, [confirmVehiclePanel]);

	useGSAP(() => {
		if (vehicleFound) {
			gsap.to(vehicleFoundRef.current, {
				transform: "translateY(0)",
				zIndex: 10,
			});
		} else {
			gsap.to(vehicleFoundRef.current, {
				transform: "translateY(100%)",
				zIndex: -10,
			});
		}
	}, [vehicleFound]);

	useGSAP(() => {
		if (waitingForDriverPanel) {
			gsap.to(waitingForDriverRef.current, {
				transform: "translateY(0)",
				zIndex: 10,
			});
		} else {
			gsap.to(waitingForDriverRef.current, {
				transform: "translateY(100%)",
				zIndex: -10,
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
					handlePickupChange={handlePickupChange}
					handleDestinationChange={handleDestinationChange}
					setActiveField={setActiveField}
				/>
				<div ref={panelRef} className="bg-white h-0">
					<LocationSearchPanel
						setVehiclePanel={setVehiclePanel}
						setPanelOpen={setPanelOpen}
						setRoutes={setRoutes}
						routes={routes}
						activeField={activeField}
						suggestions={
							activeField === "pickup"
								? pickupSuggestions
								: destinationSuggestions
						}
						handleProceed={handleProceed}
					/>
				</div>
			</div>
			<div
				ref={vehiclePanelRef}
				className="fixed -z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10 pt-12"
			>
				<VehiclePanel
					handleSelectVehicleType={handleSelectVehicleType}
					fare={fare}
					setConfirmVehiclePanel={setConfirmVehiclePanel}
					setVehiclePanel={setVehiclePanel}
				/>
			</div>
			<div
				ref={confirmVehiclePanelRef}
				className="fixed -z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12"
			>
				<ConfirmedVehicle
					vehicleType={vehicleType}
					routes={routes}
					fare={fare}
					handleCreateRide={handleCreateRide}
					setVehicleFound={setVehicleFound}
					setConfirmVehiclePanel={setConfirmVehiclePanel}
				/>
			</div>

			<div
				ref={vehicleFoundRef}
				className="fixed -z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12"
			>
				<LookingForDriver
					vehicleType={vehicleType}
					routes={routes}
					fare={fare}
					setWaitingForDriverPanel={setWaitingForDriverPanel}
					setVehicleFound={setVehicleFound}
				/>
			</div>

			<div
				ref={waitingForDriverRef}
				className="fixed -z-10 bottom-0  bg-white w-full px-3 py-6 pt-12"
			>
				<WaitingForDriver
					ride={ride}
          otp={otp}
					setWaitingForDriverPanel={setWaitingForDriverPanel}
				/>
			</div>
		</div>
	);
};

export default Home;
