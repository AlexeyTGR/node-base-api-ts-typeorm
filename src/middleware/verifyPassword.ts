import hashPassword from './hashPassword';

export const verifyPassword = (password:string, hash:string):boolean => {
  const hashedPassword = hashPassword(password);
  return hashedPassword === hash;
};

export default verifyPassword;
