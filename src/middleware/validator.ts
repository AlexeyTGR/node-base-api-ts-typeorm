import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { IRequest } from './checkAuth';

export const signUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(2),
  name: yup.string().required(),
  dob: yup.date().required(),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(2),
});

export const updateUserSchema = yup.object().shape({
  params: yup.object().shape({
    id: yup.number().min(1),
  }),
  body: yup.object().shape({
    email: yup.string().email(),
    password: yup.string().min(2),
    name: yup.string(),
    dob: yup.date(),
  }),
});

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

export default {
  validator,
  signInSchema,
  signUpSchema,
  updateUserSchema,
};
