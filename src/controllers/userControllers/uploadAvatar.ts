import * as fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import { Handler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../../db';
import createImagesURL from '../../utils/createImagesURL';
import config from '../../config';

export const uploadAvatar: Handler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await db.user.findOneBy({
      id: userId,
    });
    const [imgInfo, base64Data] = req.body.img.split(',');
    const imgExtention = imgInfo.replace(/(^"data:image\/)|(;base64$)/g, '');
    const avatarName = `${uuidv4()}.${imgExtention}`;

    await fs.promises.writeFile(`public/user/${avatarName}`, base64Data, 'base64');

    if (user.avatar !== `${config.currentURL}/user/null`) {
      const oldAvatarPath = user.avatar.replace(`${config.currentURL}`, 'public');
      await fs.promises.unlink(`${oldAvatarPath}`);
    }

    user.avatar = avatarName;
    await db.user.update(userId, user);
    user.avatar = createImagesURL(avatarName, 'user');

    return res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    next(err);
  }
};

export default uploadAvatar;
