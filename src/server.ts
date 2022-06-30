import process from 'node:process';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { connect } from './db/data-source';
import app from './app';
import config from './config';

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: [config.clientURL] },
});

(async () => {
  try {
    await connect();

    io.on('connection', (socket) => {
      console.log(`New connection with socket.id: ${socket.id}`);

      socket.on('comment:add', (data) => {
        io.emit('comment:save', data);
      });
    });

    httpServer.listen(config.port, () => {
      console.log(`Server is waiting for a connection on a port ${config.port}`);
    });
  } catch (error) {
    return error;
  }
})();

process.on('unhandledRejection', (code) => {
  console.log('Process exit event due uncaught exception: ', code);
});
