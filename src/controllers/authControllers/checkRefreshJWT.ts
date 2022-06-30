import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../../utils/createCustomError';
import tokenUtils from '../../utils/tokenUtils';

type ReqBody = {
  refreshToken: string;
}
type ExtendedRequest = Request<unknown, unknown, ReqBody>

const checkRefreshJWT: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    await new Promise((res) => { setTimeout(res, 500); });

    const result = await tokenUtils.verifyRefresh(req.body.refreshToken).catch((err) => {
      if (err.message === 'jwt expired') {
        throw createCustomError(StatusCodes.UNAUTHORIZED, 'Refresh token expired');
      }
      if (err.message === 'jwt malformed') {
        throw createCustomError(StatusCodes.UNAUTHORIZED, 'Refresh token is not valid');
      }
      throw err;
    });
    const [token, refreshToken] = await tokenUtils.createPair(result.id);

    return res.status(StatusCodes.OK).json({ token, refreshToken });
  } catch (err) {
    next(err);
  }
};

export default checkRefreshJWT;
