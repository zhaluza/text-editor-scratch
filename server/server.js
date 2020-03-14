const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socket = require('socket.io');
const app = express();
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = socket(server);

// test for connection
io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // handle coding event
  socket.on('coding', data => {
    console.log(data);
    socket.broadcast.emit('receive code', data);
  });
});

// Handle parsing request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle requests for client files
app.use(express.static(path.resolve(__dirname, '../client')));

// serve build files in production
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}
