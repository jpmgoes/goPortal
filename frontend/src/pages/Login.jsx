/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";

import { useNavigate } from "react-router-dom";
import { TemplateFormPages } from "../components/templates/TemplateFormPages";
import { LoginForm } from "../components/forms/LoginForm";

function Login() {
	const { userContext } = useContext(Context);

	const navigate = useNavigate();
	const [error, setError] = useState(<></>);

	useEffect(() => {
		userContext.setLoading("/");
		if (userContext.user) {
			navigate("/loading");
		}
	}, [userContext.user, userContext.authenticated]);

	useEffect(() => {
		if (userContext.response?.status === 200) {
			window.location.href = "http://localhost:3000/";
		} else if (userContext.response?.status === 400) {
			setError(<span className="error">Email ou senha errados</span>);
		}
		userContext.setResponse(null);
	}, [userContext.response]);

	const onSubmit = ({ email, password }) => {
		userContext.handleLogin(email, password);
	};

	if (userContext.authenticated) return <></>;

	return (
		<TemplateFormPages title={"LOGIN"}>
			<LoginForm onSubmit={onSubmit} error={error} />
			<p onClick={() => navigate("/register")}>Criar uma conta</p>
			<p onClick={() => navigate("/change/pass/request")}>
				Esqueci minha senha
			</p>
		</TemplateFormPages>
	);
}

export default Login;
