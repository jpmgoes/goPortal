import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";
import defaultAvatarIcon from "../img/avatar.webp";

export const ImageUpload = () => {
	const [preview, setPreview] = useState(defaultAvatarIcon);
	const { userContext } = useContext(Context);

	useEffect(() => {
		if (!userContext.userImg) {
			setPreview(defaultAvatarIcon);
			return;
		}

		const objectUrl = URL.createObjectURL(userContext.userImg);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [userContext.userImg]);

	const onSelectFile = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			userContext.setUserImg(undefined);
			return;
		}

		if (fileValidation(e.target.files[0]))
			userContext.setUserImg(e.target.files[0]);
		else alert("A imagem deve ser do tipo jpeg ou png");
	};

	return (
		<>
			<input type="file" onChange={onSelectFile} />
			<div className="avatar">
				<img src={preview} alt="avatar" />
			</div>
		</>
	);
};

function fileValidation(file) {
	const fileType = file.type;
	const validFileTypes = ["image/jpeg", "image/png"];
	if (validFileTypes.indexOf(fileType) > -1) {
		return true;
	}
	return false;
}
