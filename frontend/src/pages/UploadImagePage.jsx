/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { ImageUpload } from "../components/ImageUpload";
import { TemplateFormPages } from "../components/templates/TemplateFormPages";
import { Context } from "../context/AppContext";
import "../styles/add-avatar.css";

export const UploadImagePage = () => {
	const { userContext } = useContext(Context);

	useEffect(() => {
		if (userContext.responseAvatar?.status === 204) {
			toast("Avatar foi atualizado com sucesso!");
		} else if (
			userContext.responseAvatar?.status === 400 ||
			userContext.responseAvatar?.status === 500
		) {
			toast("Não foi possível atualizar o avatar!");
		}
		userContext.setResponseAvatar(null);
		userContext.getUser();
	}, [userContext.responseAvatar]);

	return (
		<TemplateFormPages>
			<div className="add-img-container">
				<div>
					<h1>Adicionar avatar</h1>
					<h5 className="add-avatar-h5">
						verificamos que você está sem foto de perfil, para
						continuar usando o site, é necessário adicionar uma foto
						de perfil
					</h5>
				</div>
				<ImageUpload addpage={true} />
				<button
					className="button"
					onClick={userContext.handleUpdateAvatar}
				>
					Adicionar avatar
				</button>
				<button className="button" onClick={userContext.handleLogout}>
					Log Out
				</button>
			</div>
		</TemplateFormPages>
	);
};
