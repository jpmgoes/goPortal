import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ShowPass } from "../ShowPass";
import { useState } from "react";

const schema = yup
	.object({
		name: yup.string().required("Nome é obrigatório"),
		password: yup
			.string()
			.required("Senha é obrigatória")
			.min(8, "Senha deve ter no mínimo 8 caracteres")
			.matches(/[a-zA-Z]/, "Senha deve conter letras latinas."),
		email: yup
			.string()
			.required("Email é obrigatório")
			.email("Email inválido"),
		birthday: yup.string().required("Data de nascimento é obrigatória"),
		cpf: yup
			.string()
			.required("CPF é obrigatório")
			.matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF inválido"),
		fone_number: yup.string().required("Telefone é obrigatório"),
		profession: yup.string().required("Profissão é obrigatória"),
		salary: yup
			.string()
			.required("Salário é obrigatório")
			.matches(/^\d{1,}$/, "Salário inválido"),
	})
	.required();
export const RegisterForm = ({ onSubmit }) => {
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
			{errors.name?.message}
			<input placeholder="Name" {...register("name")} />
			{errors.email?.message}
			<input placeholder="Email" {...register("email")} type="email" />
			{errors.password?.message}
			<input
				placeholder="Password"
				{...register("password")}
				type={passShown}
			/>
			<ShowPass setPassShown={setPassShown} passShown={passShown} />

			{errors.birthday?.message}
			<input {...register("birthday")} type="date" />
			{errors.cpf?.message}
			<input placeholder="cpf" {...register("cpf")} />
			{errors.fone_number?.message}
			<input
				placeholder="Celular"
				{...register("fone_number")}
				type="tel"
			/>
			{errors.profession?.message}
			<input placeholder="Profissão" {...register("profession")} />
			{errors.salary?.message}
			<input
				placeholder="Salário"
				{...register("salary")}
				type="number"
			/>
			<input className="button" type="submit" />
		</form>
	);
};
