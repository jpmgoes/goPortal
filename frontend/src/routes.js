import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Loading } from "./pages/Loading";
import { UserAccount } from "./pages/UserAccount";
import { ChangePassword } from "./pages/ChangePassword";
import { Solicitation } from "./pages/Solicitation";
import { Register } from "./pages/Register";
import { RequestChangePass } from "./pages/RequestChangePass";

export default function AppRoutes() {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/loading" element={<Loading />} />
			<Route exact path="/register" element={<Register />} />
			<Route exact path="/account" element={<UserAccount />} />
			<Route exact path="/change/pass" element={<ChangePassword />} />
			<Route
				exact
				path="/change/pass/request"
				element={<RequestChangePass />}
			/>
			<Route exact path="/solicitation" element={<Solicitation />} />
		</Routes>
	);
}
