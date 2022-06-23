import express from 'express';
import cors from 'cors';

import { generalRouter } from './routes/globalRouter';
import errorHandler from './middleware/errorHandler';
import config from './config';

import type from './type'; // eslint-disable-line @typescript-eslint/no-unused-vars

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: [config.clientURL] }));
app.use(express.static('public'));

app.use(generalRouter);

app.use(errorHandler);

export default app;
