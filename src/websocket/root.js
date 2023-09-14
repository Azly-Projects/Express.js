/**
 * @typedef {import('socket.io').Socket} Socket
 * @typedef {(socket: Socket, next: Function) => void} SocketioMiddleware
 */

const ns = '/';

/** @type {SocketioMiddleware[]} */
const middleware = [];

/**
 * @param {import('socket.io').Socket} socket
 */
const onConnect = (socket) => {
  // ping test from client
  socket.on('ping', (callback) => {
    if (typeof callback === 'function') {
      callback('pong');
    }
  });

  // disconnected
  socket.on('disconnect', () => {
    // do action after disconnected
  });
};

module.exports = { ns, middleware, onConnect };
