import jwt from 'jsonwebtoken';
import config from '../config';

const promisifiedVerify = async (token: string, key: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      key,
      (err, decoded) => {
        if (err) {
          return reject(err);
        }
        return resolve(decoded);
      },
    );
  });
};

const createToken = (id: string | number): string => {
  return jwt.sign(id, config.tokenSecretKey);
};

const verifyToken = async (token: string): Promise<string> => {
  const result: string = await promisifiedVerify(token, config.tokenSecretKey);

  return result;
};

export default {
  verify: verifyToken,
  create: createToken,
};
