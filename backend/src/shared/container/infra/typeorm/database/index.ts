import { DataSource } from "typeorm";
import { CreateSolicitations1658183619639 } from "./migrations/1658183619639-CreateSolicitations";
import { CreateUsers1658187014088 } from "./migrations/1658187014088-CreateUsers";

export const AppDataSource = new DataSource({
	type: "better-sqlite3",
	database: "./src/shared/container/infra/typeorm/database/db/main.db",
	synchronize: true,
	logging: true,
	entities: [],
	subscribers: [],
	migrations: [CreateUsers1658187014088, CreateSolicitations1658183619639],
});

AppDataSource.initialize()
	.then(() => {
		console.log("data-base inicialized");
	})
	.catch((error) => {
		console.log(error);
	});
