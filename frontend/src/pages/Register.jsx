import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/forms/RegisterForm";
import { TemplateFormPages } from "../components/templates/TemplateFormPages";
import { Context } from "../context/AppContext";

export const Register = () => {
	const { userContext } = useContext(Context);
	const navigate = useNavigate();

	const onSubmit = (data) => {
		userContext.createUser(data);
		if (!userContext.error) {
		} else if (userContext.error["status"] === 400) {
			alert("Usuário já cadastrado");
			navigate("/login");
		} else if (userContext.error["status"] === 200) {
			alert("Usuário cadastrado com sucesso");
			navigate("/login");
		} else {
			alert("Erro ao cadastrar usuário");
		}
	};

	return (
		<TemplateFormPages title={"CADASTRO"}>
			<RegisterForm onSubmit={onSubmit}></RegisterForm>
		</TemplateFormPages>
	);
};
