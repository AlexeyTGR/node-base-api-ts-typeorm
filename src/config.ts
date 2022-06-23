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
    seeds: parsedEnv.DB_SEEDS,
    factories: parsedEnv.DB_FACTORIES,
  },
  clientURL: parsedEnv.CLIENT_URL,
  port: parsedEnv.CONNECTION_PORT,
  passwordSecretKey: parsedEnv.PASSWORD_SALT,
  tokenSecretKey: parsedEnv.TOKEN_SECRET_KEY,
  currentURL: parsedEnv.CURRENT_URL,
};

export default config;
