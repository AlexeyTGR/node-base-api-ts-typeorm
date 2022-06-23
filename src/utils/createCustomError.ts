import constants from '../utils/constants';

export interface ExtendedError extends Error {
  customErrorData?: {
    code?: number;
    payload?: unknown;
  },
}

const createCustomError =
  (code: number, payload = constants.COMMON_ERROR_MESSAGE): ExtendedError => {
    const error: ExtendedError = new Error(payload);

    error.customErrorData = {
      payload,
      code,
    };

    return error;
  };

export default createCustomError;
