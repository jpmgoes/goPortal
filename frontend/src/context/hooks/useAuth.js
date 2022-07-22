import { useState, useEffect } from "react";

import api from "../../api";
import useUser from "./useUser";

export default function useAuth() {
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const userContext = useUser();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
			setAuthenticated(true);
		}
		setLoading(false);
	}, []);

	async function handleLogin(email, password) {
		const response = await api.post("/sessions", { email, password });
		const {
			data: { refresh_token },
		} = response;
		localStorage.setItem("token", JSON.stringify(refresh_token));
		api.defaults.headers.Authorization = `Bearer ${refresh_token}`;
		setAuthenticated(true);
	}

	function handleLogout() {
		setAuthenticated(false);
		localStorage.removeItem("token");
		api.defaults.headers.Authorization = undefined;
		userContext.setUser(null);
	}

	return { authenticated, loading, handleLogin, handleLogout };
}
