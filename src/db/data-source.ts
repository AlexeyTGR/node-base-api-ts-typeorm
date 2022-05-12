import 'reflect-metadata';
import { DataSource } from 'typeorm';
import User from './entity/User';
import config from '../config';

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

export const connect = () => {
  const connection = appDataSource.initialize();

  return connection;
};

export default appDataSource;
