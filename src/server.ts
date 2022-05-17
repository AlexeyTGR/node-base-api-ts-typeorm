import { connect } from './db/data-source';
import app from './app';
import config from './config';

(async () => {
  await connect();

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is waiting for a connection on a port ${config.port}`);
  });
})();
