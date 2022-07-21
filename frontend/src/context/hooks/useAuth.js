import { useState, useEffect } from "react";

import api from "../../api";

export default function useAuth() {
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
			api.get("/users").then((res) => {
				setUser(res.data.user);
			});
			setAuthenticated(true);
		}
		setLoading(false);
	}, []);

	async function handleLogin(email, password) {
		const response = await api.post("/sessions", { email, password });
		const {
			data: { refresh_token },
		} = response;
		setUser(response.data);

		localStorage.setItem("token", JSON.stringify(refresh_token));
		api.defaults.headers.Authorization = `Bearer ${refresh_token}`;
		setAuthenticated(true);
	}

	function handleLogout() {
		setAuthenticated(false);
		setUser(null);
		localStorage.removeItem("token");
		api.defaults.headers.Authorization = undefined;
	}

	return { authenticated, loading, handleLogin, handleLogout, user };
}
