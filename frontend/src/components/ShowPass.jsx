import React from "react";

export const ShowPass = ({ setPassShown, passShown, customClass }) => {
	const handlePasswordShow = () => {
		if (passShown === "text") setPassShown("password");
		else setPassShown("text");
	};

	return (
		<label className={`show-pass-label ${customClass}`}>

			<input
				className="checkbox"
				type="checkbox"
				onChange={(e) => {
					handlePasswordShow();
				}}
			/>
			{"Mostrar Senha"}

		</label>
	);
};
