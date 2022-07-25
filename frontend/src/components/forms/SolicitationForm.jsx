import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";

import { AiOutlineSchedule } from "react-icons/ai";
import { Context } from "../../context/AppContext";

export const SolicitationForm = ({ onSubmit, solicitation }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { userContext } = useContext(Context);

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

	const replyHandledValue =
		solicitationData?.is_open &&
		solicitationData?.user_id !== userContext.user?.id;

	console.log(!replyHandledValue && (solicitationData?.is_open || create));

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
				!solicitationData?.is_open,
				replyHandledValue
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

			{!replyHandledValue && (solicitationData?.is_open || create) ? (
				<input className="button" type="submit" />
			) : (
				<></>
			)}
		</form>
	);
};

function handleInputForm(
	value,
	register,
	key,
	title,
	hiddenCaseBool = false,
	cantEdit = false
) {
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
					readOnly={value || cantEdit}
				/>
			)}
		</>
	);
}
