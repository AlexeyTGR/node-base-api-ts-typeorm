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
    const imgExtention = imgInfo.replace(/(^"data:image\/)|(;base64$)/g, '');
    const avatarName = `${uuidv4()}.${imgExtention}`;

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
