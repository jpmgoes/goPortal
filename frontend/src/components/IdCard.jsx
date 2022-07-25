import React, { useContext } from "react";
import "../styles/idCard.css";

import { Context } from "../context/AppContext";

export const IdCard = () => {
	const { userContext } = useContext(Context);
	const user = userContext.user;

	return (
		<div className="card-id">
			<Front user={user} />
			<Verse user={user} />
		</div>
	);
};

function Front({ user }) {
	return (
		<>
			<div className="card-container card-front">
				<div className="card-avatar">
					<img src={user?.avatar} alt=""></img>
				</div>
			</div>
		</>
	);
}

function Verse({ user }) {
	return (
		<>
			<div className="card-container card-verse">
				<div className="personal-info">
					<div className="personal-info-name">{user?.name}</div>
					<div className="personal-info-name">{user?.email}</div>
					<div className="personal-info-name">{user?.profession}</div>
					<div className="personal-info-name">
						{user?.fone_number}
					</div>
				</div>
			</div>
		</>
	);
}
