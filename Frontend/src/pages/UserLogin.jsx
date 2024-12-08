import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({email, password})
    setEmail("");
    setPassword("");
  }

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
					New here?{" "}
					<Link to={"/signup"} className="mb-7 text-blue-500 font-semibold">Create New Account</Link>
				</p>
			</div>
			<div>
				<Link to={"/captain-login"} className="bg-green-400 text-white mb-7 font-semibold rounded px-4 flex items-center justify-center py-2 w-full">
					Sign in as Captain
				</Link>
			</div>
		</div>
	);
};

export default UserLogin;
