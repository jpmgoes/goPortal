import React, { useContext } from "react";
import { Context } from "../context/AppContext";

const Home = () => {
	const context = useContext(Context);
	console.log(context?.soliticationContext?.solicitations);
	return <div>Home {"userArray"}</div>;
};

export default Home;
