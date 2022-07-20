import { Solicitations } from "../../../solicitations/infra/entities/Solicitations";

interface ICreateUserDTO {
	name: string;
	password: string;
	email: string;
	driver_license: string;
	id?: string;
	avatar?: string;
	solicitations?: Solicitations[];
}

export { ICreateUserDTO };
