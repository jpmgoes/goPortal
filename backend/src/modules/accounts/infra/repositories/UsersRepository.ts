import { Repository } from "typeorm";
import { AppDataSource } from "../../../../shared/container/infra/typeorm/database";
import { Solicitations } from "../../../solicitations/infra/entities/Solicitations";
import { ICreateUserDTO } from "../../repositories/dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
	private repository: Repository<User>;

	constructor() {
		this.repository = AppDataSource.getRepository(User);
	}

	async list(): Promise<User[]> {
		return await this.repository.find();
	}

	async create(data: ICreateUserDTO): Promise<void> {
		const user = this.repository.create(data);
		await this.repository.save(user);
	}

	async findByEmail(email: string): Promise<User> {
		return await this.repository.findOne({ where: { email } });
	}

	async findById(id: string): Promise<User> {
		return await this.repository.findOne({ where: { id } });
	}

	async createSolicitation({
		user_id,
		name,
		description,
		is_open = false,
	}: ICreateSolicitationsDTO): Promise<void> {
		const solicitationRepo = AppDataSource.getRepository(Solicitations);
		const solicitation = solicitationRepo.create({
			name,
			description,
			user_id,
			is_open,
		});
		await solicitationRepo.save(solicitation);
	}
}

export { UsersRepository };
