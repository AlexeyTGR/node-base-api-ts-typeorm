import StatusCodes from 'http-status-codes';
import constants from '../utils/constants';

export interface ExtendedError extends Error {
  customErrorData?: {
    code?: number;
    text?: string;
  },
}

const createCustomError = (code: number, text = constants.COMMON_ERROR_MESSAGE): ExtendedError => {
  const error: ExtendedError = new Error(text);
  error.customErrorData.text = text;
  error.customErrorData.code = code || StatusCodes.BAD_REQUEST;
  return error;
};

export default createCustomError;
