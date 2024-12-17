import React, { useEffect, useRef, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import {
	CaptainConfirmRidePopup,
	CaptainDetails,
	CaptainRidePopup,
	UberLogoCaptain,
} from "../components";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
	const [captainRidePopupPanel, setCaptainRidePopupPanel] = useState(false);
	const [captainConfirmRidePopupPanel, setCaptainConfirmRidePopupPanel] =
		useState(false);
	const [ride, setRide] = useState({});
	const captainRidePopupPanelRef = useRef(null);
	const captainConfirmRidePopupPanelRef = useRef(null);
	const { captain } = useSelector((state) => state.captain);
	const { socket } = useSelector((state) => state.socket);

	useGSAP(() => {
		if (captainRidePopupPanel) {
			gsap.to(captainRidePopupPanelRef.current, {
				transform: "translateY(0)",
			});
		} else {
			gsap.to(captainRidePopupPanelRef.current, {
				transform: "translateY(100%)",
			});
		}
	}, [captainRidePopupPanel]);

	useGSAP(() => {
		if (captainConfirmRidePopupPanel) {
			gsap.to(captainConfirmRidePopupPanelRef.current, {
				transform: "translateY(0)",
			});
		} else {
			gsap.to(captainConfirmRidePopupPanelRef.current, {
				transform: "translateY(100%)",
			});
		}
	}, [captainConfirmRidePopupPanel]);

	useEffect(() => {
		if (socket) {
			socket.emit("join", { userType: "captain", userId: captain._id });

			socket.on("new-ride", (data) => {
				setRide(data);
				console.log(data);
				setCaptainRidePopupPanel(true);
			});

			const updateLocation = () => {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition((position) =>
						socket.emit("update-location-captain", {
							captainId: captain._id,
							location: {
								lat: position.coords.latitude,
								lng: position.coords.longitude,
							},
						})
					);
					console.log("Location updated");
				}
			};

			const locationInterval = setInterval(updateLocation, 10000);

			return () => clearInterval(locationInterval);
		}
	}, [socket, captain]);

	const confirmRide = async () => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/rides/confirm`,
				{
					rideId: ride._id,
					userId: captain._id,
				},
				{
					withCredentials: true,
				}
			);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="h-screen relative">
			<UberLogoCaptain />
			<div className="fixed p-7 flex justify-end items-center w-screen z-50">
				<Link
					to={"/captain/logout"}
					className="h-10 w-10 bg-white rounded-full drop-shadow-lg flex items-center justify-center relative z-50"
				>
					<LuLogOut className="text-lg font-semibold" />
				</Link>
			</div>
			<div className="h-3/5">
				<LiveTracking />
			</div>
			<div className="h-2/5 p-7">
				<CaptainDetails captain={captain} />
			</div>
			<div
				ref={captainRidePopupPanelRef}
				className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10 pt-12"
			>
				<CaptainRidePopup
					ride={ride}
					setCaptainRidePopupPanel={setCaptainRidePopupPanel}
					setCaptainConfirmRidePopupPanel={setCaptainConfirmRidePopupPanel}
					confirmRide={confirmRide}
				/>
			</div>
			<div
				ref={captainConfirmRidePopupPanelRef}
				className="fixed z-10 bottom-0 translate-y-full h-screen bg-white w-full px-3 py-10 pt-12"
			>
				<CaptainConfirmRidePopup
					ride={ride}
					setCaptainConfirmRidePopupPanel={setCaptainConfirmRidePopupPanel}
				/>
			</div>
		</div>
	);
};

export default CaptainHome;
