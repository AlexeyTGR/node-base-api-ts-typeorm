import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const createValidatorMiddleware = (shape) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await shape.validate(req, {
        abortEarly: false,
        strict: true,
      });

      next();
    } catch (err) {
      err.code = StatusCodes.BAD_REQUEST;
      next(err);
    }
  };
};

export default createValidatorMiddleware;
