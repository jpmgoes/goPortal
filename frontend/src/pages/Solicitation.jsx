/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SolicitationForm } from "../components/forms/SolicitationForm";
import { MainTemplate } from "../components/templates/MainTemplate";
import { Context } from "../context/AppContext";
import { useAuthHook } from "../context/hooks/useAuthHook";

import { toast } from "react-toastify";
import { Loading } from "./Loading";

export const Solicitation = () => {
	const { soliticationContext } = useContext(Context);
	const { userContext } = useContext(Context);

	const token = window.location.href.split("=")[1]?.split("/")[0];
	const link = `/solicitation?token=${token ? token : ""}`;
	useAuthHook(link);

	const [solicitation, setSolicitation] = useState({});
	const [pageTitle, setPageTitle] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const token = window.location.href.split("=")[1]?.split("/")[0];
		const value = soliticationContext.solicitations?.find(
			(solicitation) => solicitation.id === token
		);

		setSolicitation(value);

		if (!token || !value) setPageTitle("Fazer uma solicitação");
		else if (value?.is_open) setPageTitle("Adicionar uma resposta");
		else setPageTitle("Solicitação");
	}, [soliticationContext.solicitations]);

	useEffect(() => {
		if (soliticationContext.response?.status === 200) {
			if (
				soliticationContext.response.request.responseURL ===
				"http://localhost:3333/solicitation"
			) {
				toast("Solicitação enviada com sucesso!");
			} else {
				toast("Resposta enviada com sucesso!");
			}
			navigate("/");
			soliticationContext.setResponse(null);
			soliticationContext.getSolicitations();
		}
	}, [soliticationContext.response]);

	function onSubmit({ name, description, reply }) {
		// create
		if (name && description) {
			soliticationContext.createSolicitation(name, description);
		} else if (reply) {
			// update
			soliticationContext.closeSolicitation(token, reply);
		}
	}
	if (!userContext.user) return <Loading />;
	if (!userContext.authenticated) return <></>;

	return (
		<MainTemplate>
			<div className="solicitation-form">
				<h1 className="solicitationPageTitle">{pageTitle}</h1>
				<SolicitationForm
					onSubmit={onSubmit}
					solicitation={solicitation}
				/>
			</div>
		</MainTemplate>
	);
};
