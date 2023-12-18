import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class postCreateMigration1680085153931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "posts",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "published",
            type: "boolean",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "createdAt",
            type: "timestamp",
          },
          {
            name: "updatedAt",
            type: "timestamp",
          },
          {
            name: "deletedAt",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("posts");
  }
}
