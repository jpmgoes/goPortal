import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { ShowPass } from "../ShowPass";

const schema = yup
	.object({
		password: yup
			.string()
			.required("Senha é obrigatória")
			.min(8, "Senha deve ter no mínimo 8 caracteres")
			.matches(/[a-zA-Z]/, "Senha deve conter letras latinas."),
		confirm_password: yup
			.string()
			.oneOf([yup.ref("password"), null], "A senha não confere"),
	})
	.required();

export const ChangePassForm = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [passShown, setPassShown] = useState("password");

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{errors.password?.message}
			<input
				placeholder="Nova Senha"
				{...register("password")}
				type={passShown}
			/>
			{errors.confirm_password?.message}
			<input
				placeholder="Confirmar Senha"
				{...register("confirm_password")}
				type={passShown}
			/>
			<ShowPass setPassShown={setPassShown} passShown={passShown} />
			<input className="button" type="submit" />
		</form>
	);
};
