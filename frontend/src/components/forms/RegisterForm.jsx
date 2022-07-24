import { useForm } from "react-hook-form";

import { ShowPass } from "../ShowPass";
import { useState } from "react";

export const RegisterForm = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [passShown, setPassShown] = useState("password");

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="register-form">
			{joinNameEmailDatePass({
				errors,
				register,
				passShown,
				setPassShown,
			})}
			{joinCpfProfPhoneSalary({ errors, register })}
			<input
				className="button button-register-form"
				type="submit"
				value="Cadastrar"
			/>
		</form>
	);
};

function joinNameEmailDatePass({ errors, register, passShown, setPassShown }) {
	return (
		<div className="nameEmailDatePass">
			{errors.name && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input
				placeholder="Name"
				{...register("name", { required: true })}
			/>
			{errors.email && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input
				placeholder="Email"
				{...register("email", { required: true })}
				type="email"
			/>

			{errors.birthday && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input {...register("birthday", { required: true })} type="date" />

			{errors.password && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input
				placeholder="Password"
				{...register("password", { required: true })}
				type={passShown}
			/>
			<ShowPass
				customClass="showPass"
				setPassShown={setPassShown}
				passShown={passShown}
			/>
		</div>
	);
}

function joinCpfProfPhoneSalary({ errors, register }) {
	return (
		<div className="cpfProfPhoneSalary">
			{errors.cpf && <span className="warn-span">Campo Obrigatório</span>}
			<input placeholder="cpf" {...register("cpf", { required: true })} />
			{errors.fone_number && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input
				placeholder="Celular"
				{...register("fone_number", { required: true })}
				type="tel"
			/>
			{errors.profession && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input
				placeholder="Profissão"
				{...register("profession", { required: true })}
			/>
			{errors.salary && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input
				placeholder="Salário"
				{...register("salary", { required: true })}
				type="number"
			/>
		</div>
	);
}
