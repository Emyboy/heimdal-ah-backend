import socketIo from './socketIo';
import handlers from './handlers';


const events = {
  start(server) {
    socketIo.connect(server, handlers);
  },
};


export default events;
