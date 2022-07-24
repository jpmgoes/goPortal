import { useContext } from "react";
import { Context } from "../context/AppContext";
import "../styles/contraChequeTable.css";

export function TableComponent() {
	const { userContext } = useContext(Context);
	const { user } = userContext;

	const mockCompany = {
		name: "goPortal",
		cnpj: "29.179.704/0001-55",
		address: "Avenida São Gonçalo 965 78120-783",
		phone: "(65) 3529-8200",
	};
	const valorDescontado = 200;
	const valor = +user?.salary - valorDescontado;

	const transactions = [
		{
			id: 1,
			descricao: "Salário",
			referencia: "431",
			vencimento: user?.salary,
			desconto: "0",
		},
		{
			id: 2,
			descricao: "Despeza médica IRPR",
			referencia: "312",
			vencimento: "0",
			desconto: valorDescontado.toString(),
		},
	];

	return (
		<table id="pdf-view">
			<thead>
				<tr>
					<th colspan="5">Recibo de Pagamento de Salário</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td></td>
					<td>{mockCompany.name}</td>
					<td></td>
					<td>Salário do Mês</td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td>{mockCompany.address}</td>
					<td></td>
					<td>03/2019</td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td>{mockCompany.cnpj}</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>Cód.</td>
					<td>Descrição</td>
					<td>Referência</td>
					<td>Vencimentos</td>
					<td>Descontos</td>
				</tr>
				{transactions.map((t) => {
					return (
						<>
							<tr>
								<td>{t.id}</td>
								<td>{t.descricao}</td>
								<td>{t.referencia}</td>
								<td>R$ {t.vencimento}</td>
								<td>R$ {t.desconto}</td>
							</tr>
						</>
					);
				})}
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td>Banco: Itaú</td>
					<td>Agência: 8527</td>
					<td>Total de vencimentos</td>
					<td>Total de Descontos</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td>{user?.salary}</td>
					<td>{valorDescontado}</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td>Valor Líquido</td>
					<td>{valor}</td>
				</tr>
			</tbody>
		</table>
	);
}
