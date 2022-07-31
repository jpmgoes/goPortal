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

	async create({
		id,
		name,
		password,
		email,
		birthday,
		age = "1",
		cpf,
		fone_number,
		profession,
		salary,
		avatar = "",
	}: ICreateUserDTO): Promise<void> {
		const user = this.repository.create({
			id,
			name,
			password,
			email,
			birthday,
			age,
			cpf,
			fone_number,
			profession,
			salary,
			avatar,
		});
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
		reply = "",
	}: ICreateSolicitationsDTO): Promise<void> {
		const solicitationRepo = AppDataSource.getRepository(Solicitations);
		const solicitation = solicitationRepo.create({
			name,
			description,
			user_id,
			is_open,
			reply,
		});
		await solicitationRepo.save(solicitation);
	}
}

export { UsersRepository };
