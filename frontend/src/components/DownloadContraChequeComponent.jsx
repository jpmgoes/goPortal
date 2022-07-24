import { TableComponent } from "./TableComponent";
import { jsPDF } from "jspdf";
import { useContext } from "react";
import { Context } from "../context/AppContext";
import { BiDownload } from "react-icons/bi";

export function DownloadContraChequeComponent() {
	const downloadTableAsPDF = (e) => {
		e.preventDefault();

		const pdfOptions = {
			orientation: "landscape",
			unit: "pt",
			format: "A4",
		};
		const pdfParser = new jsPDF(pdfOptions);

		pdfParser.html(document.getElementById("pdf-view"), {
			callback: () => {
				pdfParser.save(`CONTRACHEQUE_{contrachequeDetails.mes}.pdf`);
			},
		});
	};
	const { userContext } = useContext(Context);

	return (
		<div className="contra-cheque">
			<h1>Contracheque de {userContext.user?.name}</h1>
			<TableComponent />
			<button className="button save-pdf" onClick={downloadTableAsPDF}>
				<p className="save-pdf-p">Salvar PDF</p>
				<BiDownload fill="#fff" size="20px" />
			</button>
		</div>
	);
}
