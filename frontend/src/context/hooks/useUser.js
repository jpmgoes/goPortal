import { useState, useEffect } from "react";

import api from "../../api";

export default function useAuth() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		
		if (token) {
			api.get("/users").then((res) => {
				setUser(res.data.user);
			});
		}
	}, []);

	return { user };
}
