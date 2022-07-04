import config from '../config';

const createImagesURL = (fileName: string, folder: string): string => {
  if (fileName === null) {
    return null;
  }
  return `${config.currentURL}/${folder}/${fileName}`;
};

export default createImagesURL;
