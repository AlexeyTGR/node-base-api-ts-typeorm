import config from '../config';

const createImagesURL = (fileName: string, folder: string): string => {
  return `${config.currentURL}/${folder}/${fileName}`;
};

export default createImagesURL;
