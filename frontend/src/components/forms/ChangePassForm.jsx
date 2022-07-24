import { useForm } from "react-hook-form";
import { useState } from "react";
import { ShowPass } from "../ShowPass";

export const ChangePassForm = ({ onSubmit, error }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [passShown, setPassShown] = useState("password");

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{errors.password && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input
				placeholder="Nova Senha"
				{...register("password", { required: true })}
				type={passShown}
			/>
			{errors.confirm_password && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input
				placeholder="Confirmar Senha"
				{...register("confirm_password", { required: true })}
				type={passShown}
			/>
			<ShowPass setPassShown={setPassShown} passShown={passShown} />
			<input className="button" type="submit" />
			{error}
		</form>
	);
};
