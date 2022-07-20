import { User } from "../infra/entities/User";
import { ICreateUserDTO } from "./dtos/ICreateUserDTO";

interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<void>;
	findByEmail(email: string): Promise<User>;
	findById(id: string): Promise<User>;
	// list(): Promise<User[]>;
	createSpecification({
		name,
		description,
		user_id,
		is_open
	}: ICreateSolicitationsDTO): Promise<void>;
}
export { IUsersRepository };
