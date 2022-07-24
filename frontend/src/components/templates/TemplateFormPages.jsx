import React from "react";
import "../../styles/TemplateFormPages.css";

export const TemplateFormPages = ({ children, title }) => {
	return (
		<div className="background-TemplateFormPages templateformpage-form">
			<div className="wallpaper-container wallpaper-for-register"></div>
			<div className="container-TemplateFormPages">
				<div className="form-container">
					<h1 className="title-TemplateFormPages">{title}</h1>
					<div className="content-TemplateFormPages">{children}</div>
				</div>
			</div>
		</div>
	);
};
