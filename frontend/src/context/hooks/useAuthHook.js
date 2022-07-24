/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";

import { Context } from "../AppContext";

export const useAuthHook = (location = "/") => {
	const { userContext } = useContext(Context);
	userContext?.setLoading(location);

	useEffect(() => {
		userContext?.setLoading(location);
		if (!userContext.user) {
			userContext.getUser();
		}
	}, []);

	return {};
};
