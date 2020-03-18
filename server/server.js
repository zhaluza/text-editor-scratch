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
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });

  // Join room when 'room' event is emitted
  socket.on('room', data => {
    socket.join(data.room, err => {
      if (err) console.error(err);
    });
    console.log(`User ${socket.id} joined room ${'some room'}`);
    console.log(io.sockets.adapter.rooms);
  });

  // TODO: Handle leave room event when user switches room
  // socket.on('leave room', data => {
  //   socket.leave(data.room, err => {
  //     if (err) console.error(err);
  //     console.log(`User ${socket.id} left ${data.room}`);
  //   });
  // });

  // handle coding event
  socket.on('coding', data => {
    console.log('received coding data: ', data);
    io.to(data.room).emit('code sent', data);
  });
});

// Handle parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle requests for client files
app.use(express.static(path.resolve(__dirname, '../client')));

// serve build files in production
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}
