import StatusCodes from 'http-status-codes';

export interface ExtendedError extends Error {
  code?: number;
}

const createCustomError = (code: number, message = 'Sorry, something went wrong...'): ExtendedError => {
  const error = new Error(message) as ExtendedError;
  error.code = code || StatusCodes.BAD_REQUEST;
  return error;
};

export default createCustomError;
