/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/AppContext";
import loadingImg from "../img/loading.gif";

export const Loading = () => {
	const navigate = useNavigate();
	const { userContext } = useContext(Context);

	useEffect(() => {
		if (userContext.user) {
			navigate(userContext.loading);
		} else if (!userContext.authenticated) navigate("/login");
	}, [userContext.user, userContext.loading]);

	return (
		<div className="loading">
			<img src={loadingImg} alt="loading..." />
		</div>
	);
};
