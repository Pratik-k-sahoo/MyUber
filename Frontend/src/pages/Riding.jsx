import React from "react";
import { FaSquare, FaStar } from "react-icons/fa6";
import { IoIosCash } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";

const Riding = () => {
	return (
		<div className="h-screen relative">
			<Link to={"/home"} className="fixed right-2 top-2 h-10 w-10 bg-white rounded-full drop-shadow-lg flex items-center justify-center">
				<IoHome className="text-lg font-semibold" />
			</Link>
			<div className="h-1/2">
				<img
					className="h-full w-full object-cover"
					src="https://media.licdn.com/dms/image/v2/C5112AQEocbHNC2ZmIA/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1534422634779?e=1737590400&v=beta&t=6kZZ1uETNP8yMq9RQWsftmzWWs17RxJiaip2G0EvCBg"
					alt=""
				/>
			</div>
			<div className="h-1/2 p-4">
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
				<button className="w-full mt-5 bg-green-600 text-white rounded-lg p-2 font-semibold">
					Make a Payment
				</button>
			</div>
		</div>
	);
};

export default Riding;
