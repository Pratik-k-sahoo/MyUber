import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { LocationSearchPanel } from "../components";

const Home = () => {
	const [routes, setRoutes] = useState({
		pickUp: "",
		destination: "",
	});

	const [panelOpen, setPanelOpen] = useState(false);
	const panelRef = useRef(null);
	const panelIcon = useRef(null);

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
        padding: 24
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

	return (
		<div className="h-screen relative">
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
				alt=""
				className="w-16 absolute left-5 top-5"
			/>
			<div className="h-screen w-screen">
				{/* TODO: Temporary image */}
				<img
					className="h-full w-full object-cover"
					src="https://media.licdn.com/dms/image/v2/C5112AQEocbHNC2ZmIA/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1534422634779?e=1737590400&v=beta&t=6kZZ1uETNP8yMq9RQWsftmzWWs17RxJiaip2G0EvCBg"
					alt=""
				/>
			</div>
			<div className="flex flex-col justify-end h-screen absolute top-0 w-full">
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
						<div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-800 rounded-full"></div>
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
				<div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel />
        </div>
			</div>
		</div>
	);
};

export default Home;
