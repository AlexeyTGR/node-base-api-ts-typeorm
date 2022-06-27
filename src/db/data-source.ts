import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import config from '../config';

const options: DataSourceOptions = {
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
};

const appDataSource = new DataSource(options);

export const connect = async () => {
  const connection = await appDataSource.initialize();

  process.on('SIGINT', async () => {
    await connection.destroy();
    console.log('DB connecction destroyed \'cause of process termination');

    process.exit(0);
  });

  return connection;
};

export default appDataSource;
