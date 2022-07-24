import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { AiOutlineSchedule } from "react-icons/ai";

export const SolicitationForm = ({ onSubmit, solicitation }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [solicitationData, setSolicitationData] = useState(solicitation);

	const [create, setCreate] = useState(solicitation ? false : true);
	const [created_at, setCreated_at] = useState(solicitation ? false : true);

	useEffect(() => {
		setSolicitationData(solicitation);
		setCreate(solicitation ? false : true);
		setCreated_at(
			solicitation?.created_at
				?.split("T")[0]
				.split("-")
				.reverse()
				.join("-")
		);
	}, [solicitation]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="formSolicitation">
			{errors.name && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			{handleInputForm(
				solicitationData?.name,
				register,
				"name",
				"Assunto"
			)}

			{errors.description && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			{handleInputForm(
				solicitationData?.description,
				register,
				"description",
				"Descrição"
			)}

			{errors.reply && (
				<span className="warn-span">Campo Obrigatório</span>
			)}
			{handleInputForm(
				solicitationData?.reply,
				register,
				"reply",
				"Resposta",
				!solicitationData?.is_open
			)}
			{created_at ? (
				<>
					<div className="created-at">
						<div className="created-at-title">Criado dia</div>
						<div className="created-at-date">
							{created_at}
							<AiOutlineSchedule />
						</div>
					</div>
				</>
			) : (
				<></>
			)}

			{solicitationData?.is_open || create ? (
				<input className="button" type="submit" />
			) : (
				<></>
			)}
		</form>
	);
};

function handleInputForm(value, register, key, title, hiddenCaseBool = false) {
	return (
		<>
			{value ? (
				<>
					<span className="readonlyTextAreaSolicitations-span">
						{title}:
					</span>
					<div className="readonlyTextAreaSolicitations">{value}</div>
				</>
			) : hiddenCaseBool ? (
				<></>
			) : (
				<input
					placeholder={title}
					{...register(key, { required: true })}
					readOnly={value}
				/>
			)}
		</>
	);
}
