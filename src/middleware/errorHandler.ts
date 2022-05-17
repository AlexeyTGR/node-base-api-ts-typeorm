import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ExtendedError } from '../utils/createCustomError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: ExtendedError, req: Request, res: Response, next: NextFunction) => {
  let message = err.message;
  let code = err.code || err.status;
  const isStatusCodeValid = Object.values(StatusCodes).includes(code);
  if (!isStatusCodeValid) {
    code = 500;
  }
  if (code === 500) {
    message = 'Something went wrong...';
  }
  // console.error('ERROR:', err);
  res.status(code || StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};

export default errorHandler;
