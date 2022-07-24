import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";
import defaultAvatarIcon from "../img/avatar.webp";
import { toast } from "react-toastify";

export const ImageUpload = ({ addpage }) => {
	const [preview, setPreview] = useState(defaultAvatarIcon);
	const { userContext } = useContext(Context);

	useEffect(() => {
		if (
			!userContext.userImg ||
			userContext.userImg === "http://localhost:3333/tmp/avatar/"
		) {
			setPreview(defaultAvatarIcon);
			return;
		}
		try {
			const objectUrl = URL.createObjectURL(userContext.userImg);
			setPreview(objectUrl);
			return () => URL.revokeObjectURL(objectUrl);
		} catch (error) {}
	}, [userContext.userImg]);

	const onSelectFile = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			userContext.setUserImg(undefined);
			return;
		}

		if (fileValidation(e.target.files[0]))
			userContext.setUserImg(e.target.files[0]);
		else toast("A imagem deve ser do tipo jpeg ou png");
	};

	const addpageclass = addpage ? "add-img-page" : "";

	return (
		<div className={`img-upload-container ${addpageclass}`}>
			<input
				className="custom-file-input"
				type="file"
				onChange={onSelectFile}
			/>
			<div className="avatar">
				<img src={preview} alt="avatar" />
			</div>
		</div>
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
