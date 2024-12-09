import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../slice/userSlice";

const UserSignup = () => {
	const navigate = useNavigate();
  const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		email: "",
		fullname: {
			firstName: "",
			lastName: "",
		},
		password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, userData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.status === 201) {
        dispatch(login(response.data.user));
        setUserData({
					email: "",
					fullname: {
						firstName: "",
						lastName: "",
					},
					password: "",
				});
        navigate("/home")
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
					<button className="bg-black text-white mb-2 font-semibold rounded px-4 py-2 w-full">
						Create account
					</button>
				</form>
				<p className="text-center">
					Already have an account?{" "}
					<Link to={"/login"} className="mb-5 text-blue-500 font-semibold">
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

export default UserSignup;
