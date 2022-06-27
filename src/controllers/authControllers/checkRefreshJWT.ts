import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import tokenUtils from '../../utils/tokenUtils';

type ReqBody = {
  refreshToken: string;
}
type ExtendedRequest = Request<unknown, unknown, ReqBody>

const checkRefreshJWT: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const result = await tokenUtils.verifyRefresh(req.body.refreshToken);
    const [token, refreshToken] = await tokenUtils.createPair(result.id);

    return res.status(StatusCodes.OK).json({ token, refreshToken });
  } catch (err) {
    next(err);
  }
};

export default checkRefreshJWT;
