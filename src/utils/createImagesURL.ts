import config from '../config';

const createImagesURL = (folder: string, fileName: string): string => {
  return `http://localhost:${config.port}/${folder}/${fileName}`;
};

export default createImagesURL;
