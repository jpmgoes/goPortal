import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm } from "react-hook-form";

const schema = yup
	.object({
		email: yup.string().required("Email é obrigatório"),
	})
	.required();
export const EmailForm = ({ onSubmit, error }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{errors.email?.message}
			<input
				placeholder="Email"
				{...register("email", { required: true })}
				type="email"
			/>
			<input className="button" type="submit" />
			{error}
		</form>
	);
};
