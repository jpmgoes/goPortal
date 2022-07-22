import { useState, useEffect } from "react";

import api from "../../api";

export default function useUser() {
	const [user, setUser] = useState(null);
	const [userImg, setUserImg] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
		if (token) {
			console.log("setUser");
			api.get("/users").then((res) => {
				setUser(res.data.user);
			});
		}
	}, []);

	async function createUser(data) {
		try {
			const res = await api.post("/users", data);
			setError(res);
		} catch (err) {
			setError(err.response);
		}
	}

	async function handleRequestNewPassword(email) {
		const link = "http://localhost:3000/change/pass";
		api.post("/password/forgot", { email, link })
			.then((res) => {
				setError(res);
			})
			.catch((err) => {
				setError(err.response);
			});
	}

	//! testar
	async function handleNewPassword(password) {
		const token = window.location.search.split("=")[1];
		api.post("/password/reset", { password }, { params: { token } })
			.then((res) => {
				setError(res);
			})
			.catch((err) => {
				setError(err.response);
			});
	}

	async function handleUpdateUser(
		name = "",
		password = "",
		profession = "",
		salary = "",
		fone_number = ""
	) {
		console.log("handleUpdateUser");
		await api.put("/users/update", {
			name,
			password,
			profession,
			salary,
			fone_number,
		});
	}

	async function handleUpdateAvatar() {
		console.log("handleUpdateAvatar");

		const formData = new FormData();
		formData.append("avatar", userImg);

		await api.patch("/users/avatar", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	}

	return {
		user,
		createUser,
		error,
		setUser,
		userImg,
		setUserImg,
		handleNewPassword,
		handleRequestNewPassword,
		handleUpdateUser,
		handleUpdateAvatar,
	};
}
