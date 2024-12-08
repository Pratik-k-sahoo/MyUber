import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [captainData, setCaptainData] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		setCaptainData({ email, password });
		setEmail("");
		setPassword("");
	};

	return (
		<div className="p-7 flex flex-col justify-between h-screen">
			<div>
				<img
					src="https://pngimg.com/uploads/uber/uber_PNG24.png"
					alt=""
					className="w-16 mb-3"
				/>
				<form onSubmit={handleSubmit}>
					<h3 className="text-lg font-medium mb-2">
						What&apos;s your email address?
					</h3>
					<input
						value={email}
						name="email"
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						required
						placeholder="email@example.com"
						className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
					/>
					<h3 className="text-lg font-medium mb-2">Enter Password</h3>
					<input
						value={password}
						name="password"
						onChange={(e) => setPassword(e.target.value)}
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
					Want to join a fleet?{" "}
					<Link
						to={"/captain-signup"}
						className="mb-7 text-blue-500 font-semibold"
					>
						Register as Captain
					</Link>
				</p>
			</div>
			<div>
				<Link
					to={"/login"}
					className="bg-orange-400 text-white mb-7 font-semibold rounded px-4 flex items-center justify-center py-2 w-full"
				>
					Sign in as User
				</Link>
			</div>
		</div>
	);
};

export default CaptainLogin;
