import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import AppRoutes from "./routes";

function App() {
	return (
		<AppContext>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</AppContext>
	);
}

export default App;
