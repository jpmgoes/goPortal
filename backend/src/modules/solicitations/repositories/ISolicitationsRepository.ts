import { Solicitations } from "../infra/entities/Solicitations";

interface ISolicitationsRepository {
	create({
		id,
		name,
		description,
		user_id,
		is_open,
	}: ICreateSolicitationsDTO): Promise<Solicitations>;
	findByName(name: string): Promise<Solicitations>;
	findById(id: string): Promise<Solicitations>;
	list(user_id: string): Promise<Solicitations[]>;
}

export { ISolicitationsRepository };
