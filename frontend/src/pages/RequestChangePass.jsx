import React, { useContext, useState } from "react";
import { EmailForm } from "../components/forms/EmailForm";
import { TemplateFormPages } from "../components/templates/TemplateFormPages";
import { Context } from "../context/AppContext";

export const RequestChangePass = () => {
	const { userContext } = useContext(Context);
	const [error, setError] = useState(<></>);

	const onSubmit = ({ email }) => {
		userContext.handleRequestNewPassword(email.trim());
		if (!userContext.error)
			setError(<p className="error">*Erro ao enviar email</p>);
		else if (userContext.error["status"] === 400) {
			setError(<p className="error">*Email não cadastrado</p>);
		} else if (userContext.error["status"] === 201) {
			alert("Email de recuperação de senha enviado com sucesso!");
			setError("");
		}
	};

	return (
		<TemplateFormPages title={"SOLICITAR NOVA SENHA"}>
			<EmailForm onSubmit={onSubmit} error={error}></EmailForm>
		</TemplateFormPages>
	);
};
