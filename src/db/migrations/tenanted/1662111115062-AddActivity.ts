import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class AddActivity1662111115062 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions;

    await queryRunner.createTable(
      new Table({
        name: 'register_count',
        schema,
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'identity',
          },
          {
            name: 'count',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'register',
        schema,
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'identity',
          },
          {
            name: 'phone',
            type: 'text',
            isUnique: true,
          },
          {
            name: 'region',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.query(`
        INSERT INTO ${schema}.register_count (count)
        VALUES (0)
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions;

    await queryRunner.dropTable(`${schema}.register_count`);
    await queryRunner.dropTable(`${schema}.register`);
  }
}
