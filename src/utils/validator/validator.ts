import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

type ValidationSchemaType =
  yup.StringSchema |
  yup.NumberSchema |
  yup.BooleanSchema |
  yup.DateSchema

type ShapeItemType = Record<string, ValidationSchemaType>

type ShapeType = {
  body?: ShapeItemType;
  query?: ShapeItemType;
  params?: ShapeItemType;
}

export const createValidatorMiddleware = (shape: ShapeType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shapeObject = {};
      for (const key in shape) {
        if (key) {
          shapeObject[key] = yup.object().shape(shape[key]).noUnknown(true, 'Bad request');
        }
      }

      const shapeTemplate = yup.object().shape(shapeObject);

      await shapeTemplate.validate(req, {
        abortEarly: false,
        strict: true,
      });

      next();
    } catch (err) {
      if (!err.inner) {
        return next(err);
      }

      const payload = err.inner.map((e) => {
        const [
          path = e.path,
          field = 'general',
        ] = e.path.split('.');

        return {
          path,
          field,
          name: e.name,
          message: e.message,
        };
      });

      res.status(StatusCodes.BAD_REQUEST).json(payload);
    }
  };
};

export default createValidatorMiddleware;
