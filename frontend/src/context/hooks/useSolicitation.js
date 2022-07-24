import { useState, useEffect } from "react";

import api from "../../api";

export default function useSolicitation() {
	const [solicitations, setSolicitations] = useState([]);
	const [response, setResponse] = useState(null);

	useEffect(() => {
		getSolicitations();
	}, []);

	async function getSolicitations() {
		const token = localStorage.getItem("token");
		if (token) {
			const res = await api.get("/solicitation");
			const data = res.data.reverse();

			data.forEach((solicitation) => {
				Object.assign(solicitation, {
					isNotVisible: false,
				});
			});

			setSolicitations(data);
		}
	}

	async function createSolicitation(name, description) {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const res = await api.post("/solicitation", {
					name,
					description,
				});
				setResponse(res);
			} catch (error) {
				setResponse(error.response);
			}
		}
	}

	async function closeSolicitation(id, reply) {
		const token = localStorage.getItem("token");
		const link = `http://localhost:3000/solicitation?token=${id}`;

		if (token) {
			try {
				const res = await api.post(`/solicitation/close`, {
					id,
					reply,
					link,
				});
				setResponse(res);
			} catch (error) {
				setResponse(error.response);
			}
		}
	}

	return {
		solicitations,
		setSolicitations,
		response,
		setResponse,
		getSolicitations,
		createSolicitation,
		closeSolicitation,
	};
}
