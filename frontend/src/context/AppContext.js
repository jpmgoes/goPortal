import React, { createContext } from "react";
import useAuth from "./hooks/useAuth";
import useSolicitation from "./hooks/useSolicitation";
import useUser from "./hooks/useUser";

const Context = createContext();

const AppContext = ({ children }) => {
	const authContext = useAuth();
	const soliticationContext = useSolicitation();
	const userContext = useUser();

	return (
		<Context.Provider
			value={{
				authContext,
				soliticationContext,
				userContext,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export { Context, AppContext };
