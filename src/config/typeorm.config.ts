import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

const { host, port, username, password, database, synchronize } = dbConfig;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || host,
  port: process.env.RDS_PORT || port,
  username: process.env.USERNAME || username,
  password: process.env.PASSWORD || password,
  database: process.env.RDS_DB_NAME || database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  /**
   * process.env.TYPEORM_SYNC will be set true for FIRST TIME
   * so that TYPEORM will create schema from entity definitions
   */
  synchronize: process.env.TYPEORM_SYNC || synchronize,
};
