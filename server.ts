import { connect } from './src/db/data-source';
import app from './app';

(async () => {
  await connect();

  app.listen(3000, () => {
    console.log('Server is waiting for a connection on a port 3000');
  });
})();
