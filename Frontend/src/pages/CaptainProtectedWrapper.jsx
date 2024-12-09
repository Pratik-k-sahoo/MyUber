import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CaptainProtectedWrapper = ({ children }) => {
	const { captain } = useSelector((state) => state.captain);
	const navigate = useNavigate();

	useEffect(() => {
		if (!captain) navigate("/captain-login");
	}, [captain]);
	return <>{children}</>;
};

export default CaptainProtectedWrapper;
