/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { UpdateAccountForm } from "../components/forms/UpdateAccountForm";
import { MainTemplate } from "../components/templates/MainTemplate";
import { Context } from "../context/AppContext";
import { useAuthHook } from "../context/hooks/useAuthHook";

import { toast } from "react-toastify";
import { Loading } from "./Loading";

export const UserAccount = () => {
	const { userContext } = useContext(Context);

	useAuthHook("/account");

	useEffect(() => {
		if (userContext.responseAvatar?.status === 204) {
			toast("Avatar foi atualizado com sucesso!");
		} else if (userContext.responseAvatar?.status === 400) {
			toast("Não foi possível atualizar o avatar!");
		}
		userContext.setResponseAvatar(null);
		userContext.getUser();
	}, [userContext.responseAvatar]);

	useEffect(() => {
		if (userContext.response?.status === 201) {
			toast("Conta foi atualizada com sucesso!");
		} else if (userContext.response?.status === 400) {
			toast("Não foi possível atualizar as informações da conta!");
		}

		userContext.setResponse(null);
		userContext.getUser();
	}, [userContext.response]);

	function onSubmit(data) {
		const {
			name,
			password,
			confirm_pass,
			profession,
			salary,
			fone_number,
		} = data;
		if (confirm_pass !== password) {
			toast("Senhas diferentes!");
			return;
		}
		userContext.handleUpdateUser(
			name,
			password,
			profession,
			salary,
			fone_number
		);
		userContext.handleUpdateAvatar();
	}

	if (!userContext.user) return <Loading />;
	if (!userContext.authenticated) return <></>;
	return (
		<MainTemplate>
			<UpdateAccountForm onSubmit={onSubmit}></UpdateAccountForm>
		</MainTemplate>
	);
};
