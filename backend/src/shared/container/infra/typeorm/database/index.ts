import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "better-sqlite3",
	database: "./src/shared/container/infra/typeorm/database/db-file/main.db",
	synchronize: true,
	logging: true,
	entities: [],
	subscribers: [],
	migrations: [],
});

AppDataSource.initialize()
	.then(() => {
		console.log("data-base inicialized");
	})
	.catch((error) => {
		console.log(error);
	});