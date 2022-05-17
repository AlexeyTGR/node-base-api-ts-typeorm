import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ExtendedError } from '../utils/createCustomError';

const errorHandler = (err: ExtendedError, req: Request, res: Response, _next: NextFunction) => {
  let message = err.message;
  let code = err.code;
  const isStatusCodeValid = Object.values(StatusCodes).includes(err.code);
  if (!isStatusCodeValid) {
    message = 'Something went wrong';
    code = 500;
  }

  console.error('ERROR:', err);
  res.status(code || StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};

export default errorHandler;
