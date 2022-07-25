import React, { createContext } from "react";
import useSolicitation from "./hooks/useSolicitation";
import useUser from "./hooks/useUser";

const Context = createContext();

const AppContext = ({ children }) => {
	const solicitationContext = useSolicitation();
	const userContext = useUser();

	return (
		<Context.Provider
			value={{
				solicitationContext,
				userContext,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export { Context, AppContext };
