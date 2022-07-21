import { useState, useEffect } from "react";

import api from "../../api";

export default function useSolicitation() {
	const [solicitations, setSolicitations] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			api.get("/solicitation")
				.then((res) => {
					setSolicitations(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	// get all solicitations
	// create a new solicitation
	// close a solicitation

	return { solicitations };
}
