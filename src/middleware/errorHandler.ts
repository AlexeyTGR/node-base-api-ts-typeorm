import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ExtendedError } from '../utils/createCustomError';
import constants from '../utils/constants';

interface StandardizedError {
  code?: number,
  message?: string,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: ExtendedError, req: Request, res: Response, next: NextFunction) => {
  const error: StandardizedError = {};

  error.message = err.customErrorData?.text || constants.COMMON_ERROR_MESSAGE;
  error.code = err.customErrorData?.code;
  const isStatusCodeValid = Object.values(StatusCodes).includes(error.code);
  if (!isStatusCodeValid) {
    error.code = 500;
  }
  if (error.code === 500) {
    error.message = constants.COMMON_ERROR_MESSAGE;
  }
  const message = error.message;

  res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json({ data: { message } });
};

export default errorHandler;
