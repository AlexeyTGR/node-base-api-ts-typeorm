import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ExtendedError } from '../utils/createCustomError';
import constants from '../utils/constants';

const errorHandler = (err: ExtendedError, req: Request, res: Response, next: NextFunction) => {
  if (err.customErrorData) {
    return res
      .status(err.customErrorData?.code)
      .json({ data: { message: err.customErrorData?.payload || constants.COMMON_ERROR_MESSAGE } });
  }

  console.error('ERROR >>', err);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ data: { message: constants.COMMON_ERROR_MESSAGE } });
};

export default errorHandler;
