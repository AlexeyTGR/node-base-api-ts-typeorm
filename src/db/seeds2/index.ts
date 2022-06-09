import { connect } from '../data-source';

import createGenres from './1-createGenres';

(async () => {
  await connect();

  await createGenres();

  process.exit(0);
})();
