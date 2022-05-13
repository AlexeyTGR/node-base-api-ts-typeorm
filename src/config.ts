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

  port: +parsedEnv.PORT,
  db: {
    username: parsedEnv.DB_USERNAME,
    password: parsedEnv.DB_PASSWORD,
    database: parsedEnv.DB_NAME,
  },
  salt: parsedEnv.SALT,
  secretKey: parsedEnv.SECRET_KEY,
};

export default config;
