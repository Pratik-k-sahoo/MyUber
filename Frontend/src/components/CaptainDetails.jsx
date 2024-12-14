import React from "react";
import { IoIosTimer, IoMdSpeedometer } from "react-icons/io";
import { LuNotepadText } from "react-icons/lu";

const CaptainDetails = ({ captain }) => {
	return (
		<div>
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-start gap-3">
					<img
						src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947"
						alt=""
						className="w-14 rounded-full object-cover"
					/>
					<h4 className="text-xl font-medium capitalize">{`${captain?.fullname?.firstName} ${captain?.fullname?.lastName}`}</h4>
				</div>
				<div>
					<h4 className="text-xl font-semibold">₹295.20</h4>
					<p className="text-sm text-gray-500">Earned</p>
				</div>
			</div>
			<div className="flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-5 items-start">
				<div className="text-center">
					<IoIosTimer className="text-4xl font-thin mx-auto mb-2" />
					<h5 className="text-lg font-medium">10.2</h5>
					<p className="text-sm text-gray-600">HOURS ONLINE</p>
				</div>
				<div className="text-center">
					<IoMdSpeedometer className="text-4xl font-thin mx-auto mb-2" />
					<h5 className="text-lg font-medium">30KM</h5>
					<p className="text-sm text-gray-600">TOTAL DRIVES</p>
				</div>
				<div className="text-center">
					<LuNotepadText className="text-4xl font-thin mx-auto mb-2" />
					<h5 className="text-lg font-medium">30KM</h5>
					<p className="text-sm text-gray-600">TOTAL DRIVES</p>
				</div>
			</div>
		</div>
	);
};

export default CaptainDetails;
