import crypto from 'crypto';
import config from '../config';

const hashPassword = (password: string): string => {
  const hash = crypto.pbkdf2Sync(password, config.passwordSecretKey, 100, 64, 'sha512').toString('hex');

  return hash;
};

const verifyPassword = (password: string, hash: string): boolean => {
  const hashedPassword = hashPassword(password);

  return hashedPassword === hash;
};

export default {
  hash: hashPassword,
  verify: verifyPassword,
};
