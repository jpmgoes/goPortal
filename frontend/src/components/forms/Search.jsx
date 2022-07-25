import { useForm } from "react-hook-form";

import { AiOutlineSearch } from "react-icons/ai";

export const Search = ({ onSubmit }) => {
	const { register, handleSubmit } = useForm();

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			onChange={handleSubmit(onSubmit)}
			className="search-form"
		>
			<input
				className="search-input"
				placeholder="Pesquisar"
				{...register("search")}
				autoComplete="off"
			/>
			<div className="divider"></div>
			<button className="search-button" type="submit">
				<AiOutlineSearch />
			</button>
		</form>
	);
};
