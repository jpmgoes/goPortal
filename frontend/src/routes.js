import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

// import { Context } from './Context/AuthContext';

function CustomRoute({ isPrivate, ...rest }) {
	//   const { loading, authenticated } = useContext(Context);

	//   if (loading) {
	//     return <h1>Loading...</h1>;
	//   }

	//   if (isPrivate && !authenticated) {
	//     return <Redirect to="/login" />
	//   }

	return <Route {...rest} />;
}

export default function AppRoutes() {
	return (
		<Routes>
			{CustomRoute({ exact: true, path: "/login", element: <Login /> })}
			{CustomRoute({ exact: true, path: "/", element: <Home /> })}
		</Routes>
	);
}
