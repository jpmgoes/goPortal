import { useForm } from "react-hook-form";

export const EmailForm = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

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
			<input className="button" type="submit" />
		</form>
	);
};
