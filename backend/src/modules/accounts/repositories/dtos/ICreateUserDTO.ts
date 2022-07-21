import { Solicitations } from "../../../solicitations/infra/entities/Solicitations";

interface ICreateUserDTO {
	id?: string;
	name: string;
	password: string;
	email: string;
	birthday: string;
	age: string;
	cpf: string;
	fone_number: string;
	profession: string;
	salary: string;
	avatar: string;
}

export { ICreateUserDTO };
