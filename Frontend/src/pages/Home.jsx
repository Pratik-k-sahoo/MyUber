import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
		<div>
			<div className="bg-cover bg-center bg-[url(/traffic-bg.jpg)] h-screen w-full pt-8 flex justify-between flex-col">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
					alt=""
					className="w-16 ml-9"
				/>
				<div className="bg-white pb-7 py-4 px-4">
					<h2 className='text-3xl font-bold text-center'>Get Started with Uber</h2>
					<Link to={"/login"} className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4'>Continue</Link>
				</div>
			</div>
		</div>
	);
}

export default Home