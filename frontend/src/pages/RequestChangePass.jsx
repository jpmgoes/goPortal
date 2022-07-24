/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { EmailForm } from "../components/forms/EmailForm";
import { TemplateFormPages } from "../components/templates/TemplateFormPages";
import { Context } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export const RequestChangePass = () => {
	const { userContext } = useContext(Context);
	const navigator = useNavigate();

	useEffect(() => {
		if (userContext.response?.status === 201) {
			toast("Email de recuperação enviado com sucesso");
			navigator("/login");
		} else if (userContext.response?.status === 400) {
			toast("Email não cadastrado!");
		}
		userContext.setResponse(null);
	}, [userContext.response]);

	const onSubmit = ({ email }) => {
		userContext.handleRequestNewPassword(email);
	};

	return (
		<TemplateFormPages title={"SOLICITAR NOVA SENHA"}>
			<EmailForm onSubmit={onSubmit} ></EmailForm>
		</TemplateFormPages>
	);
};
