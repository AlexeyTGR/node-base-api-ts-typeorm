import express from 'express';
import { userRouter } from './routes/userRouters';
import { authRouter } from './routes/authRouters';

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

export default app;
