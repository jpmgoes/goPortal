import React from "react";
import "../../styles/TemplateFormPages.css";

export const TemplateFormPages = ({ children, title }) => {
	return (
		<div className="background-TemplateFormPages">
			<div className="container-TemplateFormPages">
				<h1 className="title-TemplateFormPages">{title}</h1>
				<div className="content-TemplateFormPages">{children}</div>
			</div>
		</div>
	);
};
