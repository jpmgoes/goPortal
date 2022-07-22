import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/AppContext";
import loadingImg from "../img/loading.gif";

export const Loading = () => {
	const navigate = useNavigate();
	const context = useContext(Context);
	console.log("loading");

	useEffect(() => {
		if (context.authContext.authenticated)
			navigate(context.authContext.loading);
		else navigate("/login");
	}, [
		context.authContext.authenticated,
		context.authContext.loading,
		navigate,
	]);

	return (
		<div className="loading">
			<img src={loadingImg} alt="loading..." />
		</div>
	);
};
