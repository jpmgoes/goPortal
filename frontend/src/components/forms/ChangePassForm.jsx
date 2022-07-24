import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { ShowPass } from "../ShowPass";

export const ChangePassForm = ({ onSubmit, error }) => {
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
			{error}
		</form>
	);
};
