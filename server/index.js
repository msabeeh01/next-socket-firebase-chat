const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const mongoose = require('./db/db');
const bodyParser = require('body-parser');

//routes
const messagesRouter = require('./routes/messages_router');

app.use(cors());
app.use(bodyParser.json());
app.use('/messages', messagesRouter);

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: '*' } });

const Messages = require('./models/messages');

io.on('connection', (socket) => {

  socket.on('message', async (data) => {
    const {msg, room, user, username} = data;
    try{
      const message = new Messages({msg, room, user, username});
      await message.save();
    }catch(err){
      console.log(err);
    }
    io.to(room).emit('msg', data);
    
  })

  socket.on('join', (room) => {
    socket.join(room);
    console.log('joined room', room);
  })

  socket.on('leave', (room) => {
    socket.leave(room);
    console.log('left room', room);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});



server.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});