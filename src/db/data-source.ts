import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import config from '../config';

const options: DataSourceOptions & SeederOptions = {
  type: config.db.type,
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/entity/*`],
  migrations: [`${__dirname}/migrations/*`],
  subscribers: [],
  seeds: [`${__dirname}/seeds/*`],
  factories: [`${__dirname}/factories/*`],
};

const appDataSource = new DataSource(options);

export const connect = () => {
  const connection = appDataSource.initialize();
  return connection;
};

export default appDataSource;
