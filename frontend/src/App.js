import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Alert } from "./components/Alert";
import { AppContext } from "./context/AppContext";
import AppRoutes from "./routes";

function App() {
	return (
		<AppContext>
			<BrowserRouter>
				<AppRoutes />
				<Alert />
			</BrowserRouter>
		</AppContext>
	);
}

export default App;
