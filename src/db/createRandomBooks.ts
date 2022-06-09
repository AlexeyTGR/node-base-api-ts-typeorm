import { DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import config from '../config';
import appDataSource from './data-source';

(async () => {
  const options: DataSourceOptions & SeederOptions = {
    type: config.db.type,
    database: config.db.database,
    entities: [`${__dirname}/entity/*`],
    seeds: [`${__dirname}/createRandomBooks.ts`],
    factories: [`${__dirname}/factories/*`],
  };

  await runSeeders(appDataSource);
})();
