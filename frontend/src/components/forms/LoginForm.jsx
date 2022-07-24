import { useForm } from "react-hook-form";

import { ShowPass } from "../ShowPass";
import { useState } from "react";

export const LoginForm = ({ onSubmit, error }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [passShown, setPassShown] = useState("password");

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{errors.email && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input
				placeholder="Email"
				{...register("email", { required: true })}
				type="email"
			/>
			{errors.password && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input
				placeholder="Password"
				{...register("password", { required: true })}
				type={passShown}
			/>
			<ShowPass setPassShown={setPassShown} passShown={passShown} />

			<input className="button" type="submit" />
			{error}
		</form>
	);
};
