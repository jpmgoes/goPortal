import React, { useContext } from "react";
import { Context } from "../context/AppContext";

import { useNavigate } from "react-router-dom";

function Login() {
	const context = useContext(Context);
	const navigate = useNavigate();
	if (context["authContext"]) navigate("/");

	return <div>Login</div>;
}

export default Login;
