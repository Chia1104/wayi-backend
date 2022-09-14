import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_SYNCHRONIZE,
  DB_MIGRATIONS_TABLE_NAME,
  DB_MIGRATIONS_RUN,
} from '../shared/constants';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [__dirname + '/../shared/entities/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../db/migrations/public/**/*{.ts,.js}'],
      migrationsTableName: DB_MIGRATIONS_TABLE_NAME,
      migrationsRun: DB_MIGRATIONS_RUN,
      synchronize: DB_SYNCHRONIZE,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [__dirname + '/../shared/entities/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../db/migrations/public/**/*{.ts,.js}'],
  migrationsTableName: DB_MIGRATIONS_TABLE_NAME,
  migrationsRun: DB_MIGRATIONS_RUN,
  synchronize: DB_SYNCHRONIZE,
};

export const tenantedOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [__dirname + '/../shared/entities/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../db/migrations/tenanted/**/*{.ts,.js}'],
  migrationsTableName: DB_MIGRATIONS_TABLE_NAME,
  migrationsRun: DB_MIGRATIONS_RUN,
};

export const dataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [__dirname + '/../shared/entities/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../db/migrations/public/**/*{.ts,.js}'],
  migrationsTableName: DB_MIGRATIONS_TABLE_NAME,
  migrationsRun: DB_MIGRATIONS_RUN,
  synchronize: DB_SYNCHRONIZE,
});
