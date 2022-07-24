/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/forms/RegisterForm";
import { TemplateFormPages } from "../components/templates/TemplateFormPages";
import { Context } from "../context/AppContext";

import { toast } from "react-toastify";

export const Register = () => {
	const { userContext } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (userContext.response?.status === 201) {
			toast("Conta criada com sucesso!");
			navigate("/login");
		} else if (userContext.response?.status === 400) {
			if (userContext.response.data.message === "User Alredy Exist") {
				toast("Email já cadastrado! Não foi possível criar uma conta!");
			} else {
				toast("Não foi possível criar a conta!");
			}
		}
		userContext.setResponse(null);
	}, [userContext.response]);

	const onSubmit = (data) => {
		userContext.createUser(data);
	};

	return (
		<TemplateFormPages title={"CADASTRO"}>
			<RegisterForm onSubmit={onSubmit}></RegisterForm>
		</TemplateFormPages>
	);
};
