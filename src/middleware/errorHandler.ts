import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ExtendedError } from '../utils/createCustomError';

const errorHandler = (err: ExtendedError, req: Request, res: Response, _next: NextFunction) => {
  console.error('ERROR:', err);

  res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
};

export default errorHandler;
