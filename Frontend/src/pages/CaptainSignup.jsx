import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../slice/captainSlice";

const CaptainSignup = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		email: "",
		fullname: {
			firstName: "",
			lastName: "",
		},
		password: "",
		vehicle: {
			color: "",
			plate: "",
			capacity: 0,
			vehicleType: "",
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/captains/register`,
				userData,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.status === 201) {
				dispatch(login(response.data.captain));
				setUserData({
					email: "",
					fullname: {
						firstName: "",
						lastName: "",
					},
					password: "",
					vehicle: {
						color: "",
						plate: "",
						capacity: 0,
						vehicleType: "",
					},
				});
				navigate("/captain/home");
			}
		} catch (error) {
			console.log(error);
		}    
	};

	return (
		<div className="p-7 flex flex-col justify-between h-screen">
			<div>
				<img
					src="https://pngimg.com/uploads/uber/uber_PNG24.png"
					alt=""
					className="w-16 mb-8"
				/>
				<form onSubmit={handleSubmit}>
					<h3 className="text-lg font-medium mb-2"> What&apos;s your name?</h3>
					<div className="flex gap-5 mb-5">
						<input
							value={userData.fullname.firstName}
							onChange={(e) =>
								setUserData({
									...userData,
									fullname: {
										...userData.fullname,
										firstName: e.target.value,
									},
								})
							}
							name="firstName"
							type="text"
							required
							placeholder="First name"
							className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-sm placeholder:text-base"
						/>
						<input
							value={userData.fullname.lastName}
							onChange={(e) => {
								setUserData({
									...userData,
									fullname: {
										...userData.fullname,
										lastName: e.target.value,
									},
								});
							}}
							name="lastName"
							type="text"
							required
							placeholder="Last name"
							className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-sm placeholder:text-base"
						/>
					</div>
					<h3 className="text-lg font-medium mb-2">What&apos;s your email?</h3>
					<input
						value={userData.email}
						onChange={(e) =>
							setUserData({ ...userData, email: e.target.value })
						}
						name="email"
						type="email"
						required
						placeholder="email@example.com"
						className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-sm placeholder:text-base"
					/>
					<h3 className="text-lg font-medium mb-2">Enter Password</h3>
					<input
						value={userData.password}
						onChange={(e) =>
							setUserData({ ...userData, password: e.target.value })
						}
						name="password"
						type="password"
						required
						placeholder="Atleast 6 digits"
						className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-sm placeholder:text-base"
					/>
					<h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
					<div className="grid grid-cols-2 gap-4 mb-3">
						<div className="flex flex-col gap-2 mb-3">
							<h4 className="text-base ml-1 font-medium text-slate-800">
								Vehicle Color
							</h4>
							<input
								value={userData.vehicle.color}
								name="color"
								onChange={(e) =>
									setUserData({
										...userData,
										vehicle: { ...userData.vehicle, color: e.target.value },
									})
								}
								type="text"
								placeholder="Vehicle Color"
								className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-sm placeholder:text-base"
							/>
						</div>
						<div className="flex flex-col gap-2 mb-3">
							<h4 className="text-base ml-1 font-medium text-slate-800">
								Vehicle Capacity
							</h4>
							<input
								value={userData.vehicle.capacity}
								name="capacity"
								onChange={(e) =>
									setUserData({
										...userData,
										vehicle: { ...userData.vehicle, capacity: e.target.value },
									})
								}
								type="number"
								placeholder="Vehicle Capacity"
								className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-sm placeholder:text-base"
							/>
						</div>
						<div className="flex flex-col gap-2 mb-3 col-span-2">
							<h4 className="text-base ml-1 font-medium text-slate-800">
								Vehicle Plate
							</h4>
							<input
								value={userData.vehicle.plate}
								name="plate"
								onChange={(e) =>
									setUserData({
										...userData,
										vehicle: { ...userData.vehicle, plate: e.target.value },
									})
								}
								type="text"
								placeholder="Vehicle Plate"
								className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-sm placeholder:text-base"
							/>
						</div>
						<div className="flex flex-col gap-2 mb-3 col-span-2">
							<h4 className="text-base ml-1 font-medium text-slate-800">
								Vehicle Type
							</h4>
							<select
              required
								placeholder="Vehicle Type"
								className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-sm placeholder:text-base"
                name="vehicleType"
                value={userData.vehicle.vehicleType}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    vehicle: { ...userData.vehicle, vehicleType: e.target.value },
                  })
                }
							>
								<option value="" disabled>
									Select Vehicle Type
								</option>
								<option value="car">Car</option>
								<option value="motorcycle">Motorcycle</option>
								<option value="auto">Auto</option>
							</select>
						</div>
					</div>
					<button className="bg-black text-white mb-2 font-semibold rounded px-4 py-2 w-full">
						Create captain account
					</button>
				</form>
				<p className="text-center">
					Already have an account?{" "}
					<Link
						to={"/captain-login"}
						className="mb-5 text-blue-500 font-semibold"
					>
						Login here
					</Link>
				</p>
			</div>
			<div>
				<p className="text-[10px] leading-tight text-slate-500">
					By proceeding, you consent to get mails, including by automated means,
					from Uber and its affiliates to email address provided.
				</p>
			</div>
		</div>
	);
};

export default CaptainSignup;

// {
// 	"fullname": {
// 		"firstName": "Jane",
// 		"lastName": "Smith"
// 	},
// 	"email": "jane.smith@example.com",
// 	"password": "password123",
// 	"vehicle": {
// 		"color": "Red",
// 		"plate": "ABC12345",
// 		"capacity": 4,
// 		"vehicleType": "car"
// 	}
// }
