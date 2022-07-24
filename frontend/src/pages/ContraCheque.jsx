import React, { useContext } from "react";
import { DownloadContraChequeComponent } from "../components/DownloadContraChequeComponent";
import { MainTemplate } from "../components/templates/MainTemplate";
import { Context } from "../context/AppContext";
import { useAuthHook } from "../context/hooks/useAuthHook";
import { Loading } from "./Loading";

export const ContraCheque = () => {
	useAuthHook("/contra-cheque");
	const { userContext } = useContext(Context);

	useAuthHook("/contra-cheque");
	if (!userContext.user) return <Loading />;
	if (!userContext.authenticated) return <></>;

	return (
		<MainTemplate>
			<DownloadContraChequeComponent />
		</MainTemplate>
	);
};
