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

const promisifiedSign = async (type: 'access' | 'refresh', id: number, key: string): Promise<string> => {
  const expiresIn = (type === 'access')
    ? config.accessTokenExpiresTime
    : config.refreshTokenExpiresTime;

  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      key,
      {
        expiresIn,
      },
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
  const result = await promisifiedSign('access', id, config.accessTokenSecretKey);
  return result;
};

const createRefreshToken = async (id: number): Promise<string> => {
  const result = await promisifiedSign('refresh', id, config.refreshTokenSecretKey);
  return result;
};

const verifyToken = async (token: string): Promise<TokenPayload> => {
  const result = await promisifiedVerify(token, config.accessTokenSecretKey);

  return result;
};

const verifyRefreshToken = async (token: string): Promise<TokenPayload> => {
  const result = await promisifiedVerify(token, config.refreshTokenSecretKey);

  return result;
};

const createPair = async (id: number): Promise<string[]> => {
  const token = await createToken(id);
  const refreshToken = await createRefreshToken(id);

  return [token, refreshToken];
};

export default {
  verify: verifyToken,
  verifyRefresh: verifyRefreshToken,
  create: createToken,
  createRefresh: createRefreshToken,
  createPair,
};
