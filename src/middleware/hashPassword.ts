import crypto from 'crypto';
import config from 'src/config';

export const hashPassword = (password: string):string => {
  const hash:string = crypto.pbkdf2Sync(password, config.salt, 100, 64, 'sha512').toString('hex');

  return hash;
};

export default hashPassword;
