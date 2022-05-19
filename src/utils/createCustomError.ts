import StatusCodes from 'http-status-codes';

export interface ExtendedError extends Error {
  customErrorData?: {
    code?: number;
    text?: string;
  },
  status?: number;
}

const createCustomError = (code: number, text = 'Sorry, something went wrong...'): ExtendedError => {
  const error: ExtendedError = new Error(text);
  error.customErrorData.text = text;
  error.customErrorData.code = code || StatusCodes.BAD_REQUEST;
  return error;
};

export default createCustomError;
