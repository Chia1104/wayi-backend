import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateActivityTable1662111061437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activity',
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
            name: 'slug',
            type: 'character varying',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'character varying',
          },
          {
            name: 'end_date',
            type: 'timestamp with time zone',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('activity');
  }
}
