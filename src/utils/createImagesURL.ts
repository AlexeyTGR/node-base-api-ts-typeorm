import config from '../config';

const createImagesURL = (fileName: string, folder: string): string => {
  return `${config.port}/${folder}/${fileName}`;
};

export default createImagesURL;
