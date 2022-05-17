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
      let answer;
      const errorQuantity = Object.keys(err.inner).length;
      if (errorQuantity > 1) {
        const message = [];
        for (let i = 0; i < errorQuantity; i++) {
          message.push(err.inner[i].message);
        }
        answer = `${err.message}: ${message.join(' and ')}`;
      }
      err.message = answer || err.message;
      err.code = StatusCodes.BAD_REQUEST;
      next(err);
    }
  };
};

export default createValidatorMiddleware;
