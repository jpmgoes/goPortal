/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChangePassForm } from "../components/forms/ChangePassForm";
import { TemplateFormPages } from "../components/templates/TemplateFormPages";
import { Context } from "../context/AppContext";
import { toast } from "react-toastify";

export const ChangePassword = () => {
	const [error, setError] = useState("");
	const { userContext } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (userContext.response?.status === 200) {
			toast("Senha alterada!");
			navigate("/login");
		} else if (userContext.response?.status === 400)
			toast("Não foi possível alterar a senha!");
		userContext.setResponse(null);
	}, [userContext.response, userContext.responseAvatar]);

	const onSubmit = ({ password, confirm_password }) => {
		if (password !== confirm_password) {
			setError(<div className="error">As senhas não são iguais</div>);
			return;
		}
		userContext.handleNewPassword(password);
	};

	return (
		<TemplateFormPages title={"MUDAR SENHA"}>
			<ChangePassForm onSubmit={onSubmit} error={error}></ChangePassForm>
		</TemplateFormPages>
	);
};
