import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ShowPass } from "../ShowPass";
import { useState } from "react";

const schema = yup
	.object({
		email: yup.string().required("Email é obrigatório"),
		password: yup.string().required("Senha é obrigatória"),
	})
	.required();

export const LoginForm = ({ onSubmit, error }) => {
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
			{errors.email?.message}
			<input placeholder="Email" {...register("email")} type="email" />
			{errors.password?.message}
			<input
				placeholder="Password"
				{...register("password")}
				type={passShown}
			/>
			<ShowPass setPassShown={setPassShown} passShown={passShown} />

			<input className="button" type="submit" />
			{error}
		</form>
	);
};
