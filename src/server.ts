import { StatusCodes } from 'http-status-codes';
import { connect } from './db/data-source';
import app from './app';
import config from './config';
import createCustomError from './utils/createCustomError';

(async () => {
  try {
    await connect().catch(() => {
      throw createCustomError(StatusCodes.SERVICE_UNAVAILABLE);
    });
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is waiting for a connection on a port ${config.port}`);
    });

    process.on('SIGQUIT', () => {
      console.log('SIGTERM signal received');
    });
  } catch (error) {
    return error;
  }
})();
