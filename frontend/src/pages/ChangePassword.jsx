import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChangePassForm } from "../components/forms/ChangePassForm";
import { TemplateFormPages } from "../components/templates/TemplateFormPages";
import { Context } from "../context/AppContext";

export const ChangePassword = () => {
	const { userContext } = useContext(Context);
	const navigate = useNavigate();

	const onSubmit = ({ password }) => {
		userContext.handleNewPassword(password);
		if (!userContext.error) {
		} else if (userContext.error["status"] === 400) {
		} else if (userContext.error["status"] === 200) {
			alert("Senha alterada com sucesso");
			navigate("/login");
		} else {
			alert("Erro ao mudar senha");
		}
	};

	return (
		<TemplateFormPages title={"MUDAR SENHA"}>
			<ChangePassForm onSubmit={onSubmit}></ChangePassForm>
		</TemplateFormPages>
	);
};
