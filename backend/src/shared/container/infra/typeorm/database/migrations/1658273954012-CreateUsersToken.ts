import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersToken1658273954012 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "users_tokens",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
					},
					{
						name: "refresh_token",
						type: "varchar",
					},
					{
						name: "user_id",
						type: "varchar",
					},
					{
						name: "expires_date",
						type: "timestamp",
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users_tokens");
	}
}
