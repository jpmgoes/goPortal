import { Repository } from "typeorm";
import { AppDataSource } from "../../../../shared/container/infra/typeorm/database";
import { ISolicitationsRepository } from "../../repositories/ISolicitationsRepository";
import { Solicitations } from "../entities/Solicitations";

class SolicitationsRepository implements ISolicitationsRepository {
	private repository: Repository<Solicitations>;

	constructor() {
		this.repository = AppDataSource.getRepository(Solicitations);
	}

	async create({
		name,
		description,
		user_id,
		is_open = false,
	}: ICreateSolicitationsDTO): Promise<Solicitations> {
		const solicitation = this.repository.create({
			name,
			description,
			user_id,
			is_open,
		});
		return await this.repository.save(solicitation);
	}

	async findByName(name: string): Promise<Solicitations> {
		return await this.repository.findOne({ where: { name } });
	}

	async list(user_id: string): Promise<Solicitations[]> {
		return await this.repository.find({ where: { user_id } });
	}
}

export { SolicitationsRepository };
