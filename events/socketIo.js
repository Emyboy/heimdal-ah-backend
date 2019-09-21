import socket from 'socket.io';

const socketIo = {
  connect(server, handlers) {
    const io = socket(server);
    io.on('connection', (Socket) => {
      handlers.register(Socket);
    });
  }
};

export default socketIo;
