import { useState, useEffect } from "react";

import api from "../../api";
import useUser from "./useUser";

export default function useAuth() {
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState("/");
	const [error, setError] = useState("");
	const userContext = useUser();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
			setAuthenticated(true);
		}
	}, []);

	async function handleLogin(email, password) {
		api.post("/sessions", { email, password })
			.then((res) => {
				localStorage.setItem(
					"token",
					JSON.stringify(res.data.refresh_token)
				);
				api.defaults.headers.Authorization = `Bearer ${res.data.refresh_token}`;
				setAuthenticated(true);
				setLoading("/");
			})
			.catch((err) => {
				setError(err);
			});
	}

	function handleLogout() {
		setAuthenticated(false);
		localStorage.removeItem("token");
		api.defaults.headers.Authorization = undefined;
		userContext.setUser(null);
	}

	return {
		authenticated,
		loading,
		setLoading,
		handleLogin,
		handleLogout,
		error,
	};
}
