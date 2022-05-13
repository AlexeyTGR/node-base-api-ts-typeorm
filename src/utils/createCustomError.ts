import StatusCodes from 'http-status-codes';

export interface ErrorData extends Error {
  code?: number;
}

const createCustomError = (code: number, text?: string) => {
  const error = new Error(text || 'Sorry, something went wrong...') as ErrorData;
  // const error: ErrorData = { text, code };
  // error.text = text || 'Sorry, something went wrong...';
  error.code = code || StatusCodes.BAD_REQUEST;
  // return error;
  throw error;
};

export default createCustomError;
