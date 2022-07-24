import { useForm } from "react-hook-form";

import { ShowPass } from "../ShowPass";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../ImageUpload";
import { useState } from "react";

export const UpdateAccountForm = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [passShown, setPassShown] = useState("password");
	const navigate = useNavigate();

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="MainTemplate-form">
			{NamePassComponent({ errors, passShown, setPassShown, register })}
			{ProfPhoneSalary({ errors, register })}
			<div className="uploadImgUpdateAcc">
				<ImageUpload />
			</div>
			{Btns(navigate)}
		</form>
	);
};

function Btns(navigate) {
	return (
		<div className="BtnsUpdateAcc">
			<input className="button" type="submit" value={"Atualizar"} />
			<button className="button" onClick={() => navigate("/")}>
				Cancelar
			</button>
		</div>
	);
}

function ProfPhoneSalary({ errors, register }) {
	return (
		<div className="ProfPhoneSalary">
			{errors.fone_number && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input
				placeholder="Celular"
				{...register("fone_number")}
				type={"tel"}
			/>

			{errors.profession && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input placeholder="Profissão" {...register("profession")} />

			{errors.salary && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input
				placeholder="Salário"
				{...register("salary")}
				type="number"
			/>
		</div>
	);
}

function NamePassComponent({ errors, passShown, setPassShown, register }) {
	return (
		<div className="NamePass">
			{errors.name && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input placeholder="Nome" {...register("name")} />

			{errors.password && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input
				placeholder="Senha"
				{...register("password")}
				type={passShown}
			/>

			{errors.confirm_pass && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			<input
				placeholder="Confirmar Senha"
				{...register("confirm_pass")}
				type={passShown}
			/>

			<ShowPass
				setPassShown={setPassShown}
				passShown={passShown}
				customClass={"checkboxUpdateAcc"}
			/>
		</div>
	);
}
