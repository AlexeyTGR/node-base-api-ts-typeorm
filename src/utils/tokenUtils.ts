import jwt from 'jsonwebtoken';
import config from '../config';

type TokenPayload = {id:number}

const promisifiedVerify = async (token: string, key: string): Promise<TokenPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      key,
      (err, decoded) => {
        if (err) {
          return reject(err);
        }
        return resolve(decoded as TokenPayload);
      },
    );
  });
};

const createToken = (id: number): string => {
  return jwt.sign({ id }, config.tokenSecretKey);
};

const verifyToken = async (token: string): Promise<TokenPayload> => {
  const result = await promisifiedVerify(token, config.tokenSecretKey);

  return result;
};

export default {
  verify: verifyToken,
  create: createToken,
};
