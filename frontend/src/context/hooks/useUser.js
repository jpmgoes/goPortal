import { useState, useEffect } from "react";

import api from "../../api";

export default function useUser() {
	const [user, setUser] = useState(null);
	const [userImg, setUserImg] = useState(null);
	const [response, setResponse] = useState(null);
	const [responseUser, setResponseUser] = useState(null);
	const [responseAvatar, setResponseAvatar] = useState(null);
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState("/");

	useEffect(() => {
		getUser();
	}, []);

	async function getUser() {
		const token = localStorage.getItem("token");
		api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
		if (token) {
			api.get("/users")
				.then((res) => {
					setUser(res.data.user);
					setUserImg(res.data.user?.avatar);
					setResponseUser(res);
					if (
						res.data.user?.avatar ===
						"http://localhost:3333/tmp/avatar/"
					)
						setAuthenticated(false);
					else setAuthenticated(true);
				})
				.catch((error) => {
					setResponseUser(error.response);
					setAuthenticated(false);
				});
		}
	}

	async function createUser(data) {
		try {
			const res = await api.post("/users", data);
			setResponse(res);
		} catch (err) {
			setResponse(err.response);
		}
	}

	async function handleRequestNewPassword(email) {
		const link = "http://localhost:3000/change/pass";
		try {
			const res = await api.post("/password/forgot", { email, link });
			setResponse(res);
		} catch (error) {
			setResponse(error.response);
		}
	}

	async function handleNewPassword(password) {
		const token = window.location.search.split("=")[1];
		try {
			const res = await api.post(
				"/password/reset",
				{ password },
				{ params: { token } }
			);
			setResponse(res);
		} catch (error) {
			setResponse(error.response);
		}
	}

	async function handleUpdateUser(
		name = "",
		password = "",
		profession = "",
		salary = "",
		fone_number = ""
	) {
		try {
			const res = await api.put("/users/update", {
				name,
				password,
				profession,
				salary,
				fone_number,
			});
			setResponse(res);
		} catch (error) {
			setResponse(error.response);
		}
	}

	async function handleUpdateAvatar() {
		const formData = new FormData();
		formData.append("avatar", userImg);

		try {
			const res = await api.patch("/users/avatar", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setResponseAvatar(res);
		} catch (error) {
			setResponseAvatar(error.response);
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
			setAuthenticated(true);
		}
	}, []);

	async function handleLogin(email, password) {
		try {
			const res = await api.post("/sessions", { email, password });
			localStorage.setItem(
				"token",
				JSON.stringify(res.data.refresh_token)
			);
			api.defaults.headers.Authorization = `Bearer ${res.data.refresh_token}`;
			setAuthenticated(true);
			setLoading("/");
			setResponse(res);
		} catch (error) {
			setResponse(error.response);
		}
	}

	function handleLogout() {
		setAuthenticated(false);
		localStorage.removeItem("token");
		api.defaults.headers.Authorization = undefined;
		setUser(null);
		window.location.href = "http://localhost:3000/";
	}

	return {
		user,
		getUser,
		createUser,
		setUser,
		userImg,
		setUserImg,
		handleNewPassword,
		handleRequestNewPassword,
		handleUpdateUser,
		handleUpdateAvatar,
		response,
		setResponse,
		responseAvatar,
		setResponseAvatar,
		responseUser,
		setResponseUser,
		handleLogin,
		handleLogout,
		loading,
		authenticated,
		setLoading,
	};
}
