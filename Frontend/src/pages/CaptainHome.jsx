import React, { useRef, useState } from "react";
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

const CaptainHome = () => {
	const [captainRidePopupPanel, setCaptainRidePopupPanel] = useState(false);
	const [captainConfirmRidePopupPanel, setCaptainConfirmRidePopupPanel] =
		useState(false);
	const captainRidePopupPanelRef = useRef(null);
	const captainConfirmRidePopupPanelRef = useRef(null);

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

	return (
		<div className="h-screen relative">
			<div className="fixed p-7 flex justify-between items-center w-screen">
				<UberLogoCaptain />
				<Link
					to={"/captain/logout"}
					className="h-10 w-10 bg-white rounded-full drop-shadow-lg flex items-center justify-center"
				>
					<LuLogOut className="text-lg font-semibold" />
				</Link>
			</div>
			<div className="h-3/5">
				<img
					className="h-full w-full object-cover"
					src="https://media.licdn.com/dms/image/v2/C5112AQEocbHNC2ZmIA/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1534422634779?e=1737590400&v=beta&t=6kZZ1uETNP8yMq9RQWsftmzWWs17RxJiaip2G0EvCBg"
					alt=""
				/>
			</div>
			<div className="h-2/5 p-7">
				<CaptainDetails />
			</div>
			<div
				ref={captainRidePopupPanelRef}
				className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10 pt-12"
			>
				<CaptainRidePopup
					setCaptainRidePopupPanel={setCaptainRidePopupPanel}
					setCaptainConfirmRidePopupPanel={setCaptainConfirmRidePopupPanel}
				/>
			</div>
			<div
				ref={captainConfirmRidePopupPanelRef}
				className="fixed z-10 bottom-0 translate-y-full h-screen bg-white w-full px-3 py-10 pt-12"
			>
				<CaptainConfirmRidePopup
					setCaptainConfirmRidePopupPanel={setCaptainConfirmRidePopupPanel}
				/>
			</div>
		</div>
	);
};

export default CaptainHome;
