import type { Knex } from 'knex';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from './config/db';

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations',
  },
};

export default knexConfig;