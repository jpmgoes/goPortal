import { useState, useEffect } from "react";

import api from "../../api";

export default function useUser() {
	const [user, setUser] = useState(null);
	const [userImg, setUserImg] = useState(null);

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

	async function handleSendForgotPassword(email, link) {
		console.log("handleSendForgotPassword");
		await api.post("/password/forgot", { email, link });
	}

	async function handleChangePassword(password) {
		console.log("handleChangePassword");
		const token = window.location.search.split("=")[1];
		await api.post("/password/reset", { password }, { params: { token } });
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

	async function handleSendChangeEmail(link) {
		console.log("handleSendChangeEmail");
		await api.post("/users/update/email", { link });
	}

	async function handleChangeEmail(email) {
		console.log("handleChangeEmail");
		const token = window.location.search.split("=")[1];
		await api.post("/users/update/email", { email }, { params: { token } });
	}

	return {
		user,
		setUser,
		userImg,
		setUserImg,
		handleSendForgotPassword,
		handleChangePassword,
		handleUpdateUser,
		handleUpdateAvatar,
		handleSendChangeEmail,
		handleChangeEmail,
	};
}
