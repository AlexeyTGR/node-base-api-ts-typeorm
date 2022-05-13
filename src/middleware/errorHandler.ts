import { NextFunction, Request, Response } from 'express';

const errorHandler = (err, req: Request, res: Response, _next: NextFunction) => {
  console.error('ERROR:', err);

  res.status(err.code).json({ message: err.message });
};

export default errorHandler;
