import dotenv from 'dotenv';
import path from 'path';

const localConfig = dotenv.config({ path: path.normalize(`${__dirname}/../.env`) }).parsed;
const defaultConfig = dotenv.config({ path: path.normalize(`${__dirname}/../default.env`) }).parsed;

if (!localConfig) {
  console.warn('.env file missed');
}

const parsedEnv = {
  ...defaultConfig,
  ...localConfig,
};

const config = {
  db: {
    type: parsedEnv.DB_TYPE as 'postgres',
    host: parsedEnv.DB_HOST,
    port: +parsedEnv.DB_PORT,
    username: parsedEnv.DB_USERNAME,
    password: parsedEnv.DB_PASSWORD,
    database: parsedEnv.DB_NAME,
  },
  passwordSecretKey: parsedEnv.SALT,
  tokenSecretKey: parsedEnv.SECRET_KEY,
};

export default config;
