import * as fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import { Handler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../../db';
import createCustomError from '../../utils/createCustomError';

export const uploadAvatar: Handler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await db.user.findOneBy({
      id: userId,
    });
    const [imgInfo, base64Data] = req.body.img.split(',');
    const [test] = req.body.img.match(/(?<=\/)\w+(?=;)/i); // what's better?
    const imgFormat = imgInfo.split('/')[1].split(';')[0];
    const avatarName = `${uuidv4()}.${imgFormat}`;

    fs.writeFile(`public/${avatarName}`, base64Data, 'base64', (err) => {
      if (err) {
        throw createCustomError(StatusCodes.BAD_REQUEST, 'Something went wrong with uploading your avatar...');
      }
    });

    user.avatar = avatarName;
    await db.user.update(userId, user);

    return res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    next(err);
  }
};

export default uploadAvatar;
