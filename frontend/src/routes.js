import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Loading } from "./pages/Loading";
import { UserAccount } from "./pages/UserAccount";
import { ChangePassword } from "./pages/ChangePassword";
import { Solicitation } from "./pages/Solicitation";
import { Register } from "./pages/Register";
import { RequestChangePass } from "./pages/RequestChangePass";
import { Badge } from "./pages/Badge";
import { ContraCheque } from "./pages/ContraCheque";
import { Context } from "./context/AppContext";

export default function AppRoutes() {
	const { userContext } = useContext(Context);
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/loading" element={<Loading />} />
			<Route exact path="/register" element={<Register />} />
			<Route exact path="/change/pass" element={<ChangePassword />} />
			<Route
				exact
				path="/change/pass/request"
				element={<RequestChangePass />}
			/>
			{userContext.authenticated ? (
				<>
					<Route exact path="/account" element={<UserAccount />} />
					<Route
						exact
						path="/solicitation"
						element={<Solicitation />}
					/>
					<Route exact path="/badge" element={<Badge />} />
					<Route
						exact
						path="/contra-cheque"
						element={<ContraCheque />}
					/>
				</>
			) : (
				<></>
			)}
		</Routes>
	);
}
