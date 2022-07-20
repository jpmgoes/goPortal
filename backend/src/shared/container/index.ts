import { container } from "tsyringe";
import { UsersRepository } from "../../modules/accounts/infra/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUserRepository";

container.registerSingleton<IUsersRepository>(
	"UsersRepository",
	UsersRepository
);
