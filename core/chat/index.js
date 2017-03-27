const net = require('net');

// Command types
const CHAT = "1";
const JOIN = "2";
const JOINED = "3";

const joinMessage = JSON.stringify({
  c: JOINED
}) + '\0';

const testChat = JSON.stringify({
  c: CHAT,
  m: 'test'
}) + '\0';

// Maps user's guid to a socket
const clients = {};

// Used for group chats and game chat
const rooms = {};

const sendChat = (message, sender, recipient) => {
  if (clients[recipient]) {
    clients[recipient].write(JSON.stringify({
      c: CHAT,
      m: message,
      s: sender
    }) + '\0');
  }
};

const heartbeat = () => {
  for (let id of Object.keys(clients)) {
    clients[id].write(testChat);
  }
  setTimeout(heartbeat, 2000);
};

const createRoom = (userId, socket) => {
  clients[userId] = socket;
  socket.write(joinMessage);
  console.log('Created room for user: ' + userId);
};

const removeClientById = id => {
  if (clients[id]) {
    delete clients[id];
  }
};

const removeSocket = socket => {
  for (let id of Object.keys(clients)) {
    if (clients[id] === socket) {
      console.log('Removed socket from clients');
      delete clients[id];
      return;
    }
  }
};

const sendMessage = (message, socket) => {
  socket.write(message + '\0');
};

const sendTestChat = socket => {
  socket.write(testChat);
};

const onMessage = (message, socket) => {
  // TODO: wrap json parsing in try catch
  data = JSON.parse(message);
  const command = data.c;

  switch(command) {
    case CHAT:
      sendChat(data.m, data.s, data.r);
      break;
    case JOIN:
      createRoom(data.s, socket);
      break;
    default:
      break;
  }
}

exports.init = () => {
  const server = net.createServer(socket => {
    socket.name = socket.remoteAddress + ':' + socket.remotePort;
    console.log('New connection: ' + socket.name);

    let chunk = '';

    socket.on('data', data => {
      for (let c of data) {
        if (c === 0) {
          onMessage(chunk, socket);
          chunk = '';
        } else {
          chunk += String.fromCharCode(c);
        }
      }
    });

    socket.on('end', () => {
      console.log('Disconnected client: ' + socket.name);
    });

    socket.on('error', err => {
      // Temporary: immediately remove socket from clients on first error
      console.log('Socket error');
      removeSocket(socket);
    });
  });

  heartbeat();
  server.listen(process.env.CHAT_PORT);
}
