import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { tenantedOrmConfig } from '@wanin/db/typeorm.config';

export function getTenantDataSource(activitySlug: string) {
  const connectionName = activitySlug;
  const dataSource = new DataSource({
    ...(tenantedOrmConfig as PostgresConnectionOptions),
    name: connectionName,
    schema: connectionName,
  });
  if (dataSource instanceof DataSource) {
    return dataSource;
  }
  throw new Error('Could not create tenant data source');
}
