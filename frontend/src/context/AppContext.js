import React, { createContext } from "react";
import useAuth from "./hooks/useAuth";
import useSolicitation from "./hooks/useSolicitation";

const Context = createContext();

const AppContext = ({ children }) => {
	const authContext = useAuth();
	const soliticationContext = useSolicitation();

	return (
		<Context.Provider value={{ authContext, soliticationContext }}>
			{children}
		</Context.Provider>
	);
};

export { Context, AppContext };
