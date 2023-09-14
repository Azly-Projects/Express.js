const { Server } = require('socket.io');

// Initialize socket.io server
const io = new Server({
  transports: ['websocket', 'polling'],
});

// Load namespace files
const rootNamespace = require('./root');
const usersNamespace = require('./users');

// Initialize namespace
const initRoot = io.of(rootNamespace.ns);
const initUsers = io.of(usersNamespace.ns);

// Load middleware
rootNamespace.middleware.forEach((middleware) => initRoot.use(middleware));
usersNamespace.middleware.forEach((middleware) => initUsers.use(middleware));

// Handle connection from namespace : rootNamespace
initRoot.on('connection', (socket) => {
  rootNamespace.onConnect(socket);
});

// Handle connection from namespace : usersNamespace
initUsers.on('connection', (socket) => {
  usersNamespace.onConnect(socket);
});

module.exports = {
  io,
  root: initRoot,
  users: initUsers,
};
