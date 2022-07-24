import React, { useContext } from "react";
import { Context } from "../context/AppContext";

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
