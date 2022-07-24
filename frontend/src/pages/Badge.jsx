import React, { useContext } from "react";
import { IdCard } from "../components/IdCard";

import { MainTemplate } from "../components/templates/MainTemplate";
import { Context } from "../context/AppContext";
import { useAuthHook } from "../context/hooks/useAuthHook";
import { Loading } from "./Loading";

export const Badge = () => {
	const { userContext } = useContext(Context);

	useAuthHook("/badge");
	if (!userContext.user) return <Loading />;
	if (!userContext.authenticated) return <></>;

	return (
		<MainTemplate>
			<IdCard></IdCard>
		</MainTemplate>
	);
};
