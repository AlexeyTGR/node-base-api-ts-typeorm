import StatusCodes from 'http-status-codes';

export interface ExtendedError extends Error {
  code?: number;
  status?: number;
}

const createCustomError = (code: number, message = 'Sorry, something went wrong...'): ExtendedError => {
  const error: ExtendedError = new Error(message);
  error.code = code || StatusCodes.BAD_REQUEST;
  return error;
};

export default createCustomError;
