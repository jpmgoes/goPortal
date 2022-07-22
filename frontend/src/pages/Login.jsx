import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";

import { useNavigate } from "react-router-dom";
import { TemplateFormPages } from "../components/templates/TemplateFormPages";
import { LoginForm } from "../components/forms/LoginForm";

function Login() {
	const { authContext } = useContext(Context);
	const navigate = useNavigate();
	const [error, setError] = useState(<></>);

	useEffect(() => {
		authContext.setLoading("/");
		if (authContext.authenticated) navigate("/loading");
	}, [authContext, authContext.authenticated, navigate]);

	const onSubmit = ({ email, password }) => {
		authContext.handleLogin(email, password);
		if (authContext.error)
			if (authContext.error.response.status === 400) {
				setError(<p className="error">*Email ou senha incorretos</p>);
			}
	};

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
