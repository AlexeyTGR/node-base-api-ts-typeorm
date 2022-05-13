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

export const createToken = (id: string | number): string => {
  return jwt.sign(id, config.secretKey);
};

export const verifyToken = async (bearerToken: string): Promise<string> => {
  const token: string = bearerToken.split(' ')[1];
  const result: string = await promisifiedVerify(token, config.secretKey);

  return result;
};

export default {};
