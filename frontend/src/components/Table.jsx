/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/AppContext";
import "../styles/table.css";

import { GoCheck } from "react-icons/go";
import { HiOutlineX } from "react-icons/hi";
import {
	AiFillEye,
	AiFillEdit,
	AiOutlinePlus,
	AiFillCaretDown,
	AiFillCaretUp,
} from "react-icons/ai";
import { Search } from "./forms/Search";

export const Table = () => {
	const { solicitationContext, userContext } = useContext(Context);

	const [solicitations, setSolicitations] = useState([]);
	const [isAllSolicitations, setIsAllSolicitations] = useState(false);

	function getOwnSolicitations() {
		return solicitationContext.solicitations.filter((solicitation) => {
			return solicitation.user_id === userContext.user?.id;
		});
	}

	function showSolicitation() {
		const btns = document.querySelectorAll(".set-all-or-own-btn");
		console.log(btns);
		if (!isAllSolicitations) {
			setSolicitations(getOwnSolicitations() ?? []);
			btns[0].style.color = "white";
			btns[0].style.backgroundColor = "#1a3754";

			btns[1].style.color = "#1a3754";
			btns[1].style.backgroundColor = "white";
		} else {
			setSolicitations(solicitationContext.solicitations ?? []);
			btns[1].style.color = "white";
			btns[1].style.backgroundColor = "#1a3754";

			btns[0].style.color = "#1a3754";
			btns[0].style.backgroundColor = "white";
		}
	}

	useEffect(() => {
		showSolicitation();
		console.log(solicitations);
	}, [solicitationContext.solicitations]);

	const [searchData, setSearchData] = useState(null);
	const [orderByName, setOrderByName] = useState(null);
	const [orderByStatus, setOrderByStatus] = useState(null);
	const [orderByNameIcon, setByNameIcon] = useState(AiFillCaretDown);
	const [orderByStatusIcon, setByStatusIcon] = useState(AiFillCaretDown);

	const navigate = useNavigate();

	function handleSearch(search) {
		if (search?.bool) {
			solicitations?.forEach((solicitations) => {
				solicitations.isNotVisible = false;
			});
			return;
		}

		const found = new RegExp(search.toLowerCase(), "g");
		solicitations?.forEach((solicitation) => {
			solicitation.isNotVisible = !!!solicitation.name
				.toLowerCase()
				.match(found);
		});
	}

	function searchOnChange({ search }) {
		let newSearch = { bool: true };
		if (search) newSearch = search;
		setSearchData(newSearch);
	}

	function nameCresc() {
		solicitations?.sort((a, b) => {
			if (a["name"].toLowerCase() < b["name"].toLowerCase()) return -1;
			if (a["name"].toLowerCase() > b["name"].toLowerCase()) return 1;
			return 0;
		});
	}

	function nameDesc() {
		solicitations?.sort((a, b) => {
			if (a["name"].toLowerCase() < b["name"].toLowerCase()) return 1;
			if (a["name"].toLowerCase() > b["name"].toLowerCase()) return -1;
			return 0;
		});
	}

	function statusCresc() {
		solicitations?.sort((a, b) => {
			if (a["is_open"] < b["is_open"]) return -1;
			if (a["is_open"] > b["is_open"]) return 1;
			return 0;
		});
		return solicitations;
	}

	function statusDesc() {
		solicitations?.sort((a, b) => {
			if (a["is_open"] < b["is_open"]) return 1;
			if (a["is_open"] > b["is_open"]) return -1;
			return 0;
		});
	}

	useEffect(() => {
		showSolicitation();
	}, [isAllSolicitations]);

	useEffect(() => {
		if (searchData) {
			handleSearch(searchData);
			setSearchData(null);
		}
	}, [searchData]);

	useEffect(() => {
		if (orderByName) {
			nameCresc("name");
			setByNameIcon(AiFillCaretUp);
		} else if (orderByName === false) {
			nameDesc("name");
			setByNameIcon(AiFillCaretDown);
		}
	}, [orderByName]);

	useEffect(() => {
		if (orderByStatus) {
			statusCresc("is_open");
			setByStatusIcon(AiFillCaretUp);
		} else if (orderByStatus === false) {
			statusDesc("is_open");
			setByStatusIcon(AiFillCaretDown);
		}
	}, [orderByStatus]);

	return (
		<div className="table">
			<div className="addSolicitation">
				<div className="search-solicitation">
					<Search onSubmit={searchOnChange} />
				</div>
				<span onClick={() => navigate("/solicitation")}>
					Fazer uma solicitação <div className="divider"></div>
					<AiOutlinePlus />
				</span>
			</div>
			<div className="baseTableLayout solicitation solicitationTitleGroup">
				<p
					onClick={() => setOrderByName((prevState) => !prevState)}
					className={`solicitationTitle order`}
				>
					Nome
					{orderByNameIcon}
				</p>
				<p className={`solicitationTitle`}>Descrição</p>
				<p className={`solicitationTitle`}>Resposta</p>
				<p
					onClick={() => setOrderByStatus((prevState) => !prevState)}
					className={`solicitationTitle order`}
				>
					Status
					{orderByStatusIcon}
				</p>
			</div>

			<div className="set-all-or-own-container">
				<button
					className="set-all-or-own-btn"
					onClick={() => setIsAllSolicitations(false)}
				>
					Minhas Solicitações
				</button>
				<button
					className="set-all-or-own-btn"
					onClick={() => setIsAllSolicitations(true)}
				>
					Todas Solicitações
				</button>
			</div>

			{solicitations?.map((solicitation, index) => {
				if (solicitation.isNotVisible) return <></>;
				return (
					<div
						key={index}
						id={`solicitation${index}`}
						className={`solicitation baseTableLayout`}
					>
						{createTable(
							solicitation,
							navigate,
							userContext.user?.id
						)}
					</div>
				);
			})}
		</div>
	);
};

function createTable(
	{ name, description, reply, is_open, id, user_id },
	navigate,
	userId
) {
	let closedClass = "";
	if (!is_open) closedClass = "solicitationClosed-name";
	return (
		<>
			<p className={`solicitationName ${closedClass}`}>
				<span>
					{"Nome:"}
					<br />
				</span>

				{name}
			</p>

			<p className="solicitationDescription">
				<span>
					{"Desc:"}
					<br />
				</span>
				{description}
			</p>

			<p className="solicitationReply">
				<span>
					{reply ? "Resp:" : ""} <br />
				</span>

				{reply}
			</p>

			<p className="solicitationStatus">
				{is_open ? (
					<HiOutlineX stroke="#db1a1a" size={"1.4rem"} />
				) : (
					<GoCheck size={"1.4rem"} fill="#43a047" />
				)}
			</p>

			<div
				className="solicitationEditButton"
				onClick={() => navigate(`/solicitation?token=${id}`)}
			>
				{is_open && user_id === userId ? (
					<AiFillEdit size={"1.4rem"} />
				) : (
					<AiFillEye size={"1.4rem"} />
				)}
			</div>
		</>
	);
}
