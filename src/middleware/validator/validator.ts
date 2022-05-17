import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IRequest } from '../checkAuth';

export const validator = (shape) => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      await shape.validate(req);

      next();
    } catch (err) {
      err.code = StatusCodes.BAD_REQUEST;
      next(err);
    }
  };
};

export default validator;
