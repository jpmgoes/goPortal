import React, { useContext, useState } from "react";
import "../../styles/MainTemplate.css";
import logo from "../../img/logo.png";
import { Context } from "../../context/AppContext";
import defaultAvatarIcon from "../../img/avatar.webp";

import { toast } from "react-toastify";
import { BiEdit, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const MainTemplate = ({ children }) => {
	const { userContext } = useContext(Context);
	const [avatar, setAvatar] = useState(userContext.user?.avatar);
	console.log(avatar);
	if (avatar === "http://localhost:3333/tmp/avatar/" || avatar === undefined)
		setAvatar(defaultAvatarIcon);
	const navigate = useNavigate();

	return (
		<div className="backgound-MainTemplate">
			<div className="main-container-MainTemplate">
				<div className="topBar-MainTemplate">
					<div className="header">
						<img
							className="logo"
							src={logo}
							alt="logo"
							onClick={() => navigate("/")}
						></img>
						<BiLogOut
							size={"30px"}
							onClick={() => {
								userContext.handleLogout();
								toast("Deslogado");
							}}
						/>
					</div>
				</div>
				<div className="container-MainTemplate">
					<div className="avatar-MainTemplate avatar">
						<img src={avatar} alt="avatar"></img>
						<BiEdit
							size={"30px"}
							onClick={() => navigate("/account")}
						/>
					</div>
					<div className="container-content-MainTemplate">
						{children}
					</div>
					<div className="content-MainTemplate"></div>
				</div>
			</div>
		</div>
	);
};
