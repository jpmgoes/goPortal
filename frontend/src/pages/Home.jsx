import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../components/Table";
import { MainTemplate } from "../components/templates/MainTemplate";
import { Context } from "../context/AppContext";
import { useAuthHook } from "../context/hooks/useAuthHook";
import { Loading } from "./Loading";
import { UploadImagePage } from "../pages/UploadImagePage";

const Home = () => {
	const navigate = useNavigate();
	const { userContext } = useContext(Context);

	useAuthHook("/");
	if (userContext.user?.avatar === "http://localhost:3333/tmp/avatar/")
		return <UploadImagePage />;
	if (!userContext.user) return <Loading />;
	if (!userContext.authenticated) return <></>;

	return (
		<MainTemplate>
			<div className="home-content">
				<div className="home-bts">
					<button
						className="baseTableLayout"
						onClick={() => navigate("/badge")}
					>
						Ver meu crachá digital
					</button>
					<button
						className="baseTableLayout"
						onClick={() => navigate("/contra-cheque")}
					>
						Ver meu contra cheque
					</button>
				</div>
				<Table />
			</div>
		</MainTemplate>
	);
};

export default Home;
