import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../slice/userSlice";

const UserLogin = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/users/login`,
				userData,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.status === 200) {
				dispatch(login(response.data.user));
				setUserData({
					email: "",
					password: "",
				});
				navigate("/home");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="p-7 flex flex-col justify-between h-screen">
			<div>
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
					alt=""
					className="w-16 mb-8"
				/>
				<form onSubmit={handleSubmit}>
					<h3 className="text-lg font-medium mb-2">
						What&apos;s your email address?
					</h3>
					<input
						value={userData.email}
						name="email"
						onChange={(e) =>
							setUserData({
								...userData,
								email: e.target.value,
							})
						}
						type="email"
						required
						placeholder="email@example.com"
						className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
					/>
					<h3 className="text-lg font-medium mb-2">Enter Password</h3>
					<input
						value={userData.password}
						name="password"
						onChange={(e) =>
							setUserData({
								...userData,
								password: e.target.value,
							})
						}
						type="password"
						required
						placeholder="Atleast 6 digits"
						className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
					/>
					<button className="bg-black text-white mb-2 font-semibold rounded px-4 py-2 w-full">
						Submit
					</button>
				</form>
				<p className="text-center">
					New here?{" "}
					<Link to={"/signup"} className="mb-7 text-blue-500 font-semibold">
						Create New Account
					</Link>
				</p>
			</div>
			<div>
				<Link
					to={"/captain-login"}
					className="bg-green-400 text-white mb-7 font-semibold rounded px-4 flex items-center justify-center py-2 w-full"
				>
					Sign in as Captain
				</Link>
			</div>
		</div>
	);
};

export default UserLogin;
