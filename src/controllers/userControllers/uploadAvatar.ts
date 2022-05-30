import * as fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import { Handler } from 'express';

export const uploadAvatar: Handler = async (req, res, next) => {
  try {
    const [imgInfo, base64Data] = req.body.img.split(',');
    const imgFormat = imgInfo.split('/')[1].split(';')[0];
    const avatarName = `${Date.now()}.${imgFormat}`;

    fs.writeFile(`public/${avatarName}`, base64Data, 'base64', (err) => {
      next(err);
    });

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default uploadAvatar;
