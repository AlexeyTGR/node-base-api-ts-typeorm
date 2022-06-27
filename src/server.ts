import process from 'node:process';
import { connect } from './db/data-source';
import app from './app';
import config from './config';

(async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`Server is waiting for a connection on a port ${config.port}`);
    });
  } catch (error) {
    return error;
  }
})();

process.on('unhandledRejection', (code) => {
  console.log('Process exit event due uncaught exception: ', code);
});
