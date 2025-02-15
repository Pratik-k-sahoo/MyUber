import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slice/captainSlice';

const CaptainLogout = () => {

  const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const handleLogout = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BASE_URL}/captains/logout`,
					{
						withCredentials: true,
					}
				);
				if (response.status === 200) {
					dispatch(logout());
					navigate("/login");
				}
			} catch (error) {
				console.log(error);
			}
		};

		handleLogout();
	}, []);

  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout