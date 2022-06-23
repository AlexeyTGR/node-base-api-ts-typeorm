import jwt from 'jsonwebtoken';

import config from '../config';

type TokenPayload = { id: number }

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

const promisifiedSign = async (id: number, key: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      key,
      (err: Error, encoded: string) => {
        if (err) {
          return reject(err);
        }
        return resolve(encoded);
      },
    );
  });
};

const createToken = async (id: number): Promise<string> => {
  const result = await promisifiedSign(id, config.tokenSecretKey);
  return result;
};

const verifyToken = async (token: string): Promise<TokenPayload> => {
  const result = await promisifiedVerify(token, config.tokenSecretKey);

  return result;
};

export default {
  verify: verifyToken,
  create: createToken,
};
