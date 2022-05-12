import crypto from 'crypto';
import config from '../config';

const verifyPassword = (password:string, hash:string):boolean => {
  const hashedPassword:string = crypto.pbkdf2Sync(password, config.salt, 100, 64, 'sha512').toString('hex');

  return hashedPassword === hash;
};

export default verifyPassword;
