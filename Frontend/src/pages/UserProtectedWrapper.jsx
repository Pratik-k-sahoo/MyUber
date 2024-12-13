import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const UserProtectedWrapper = ({ children }) => {
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
    
		if (!user) navigate("/login");
	}, [user]);
	return (
    <>
      {children}
    </>);
};

export default UserProtectedWrapper;
