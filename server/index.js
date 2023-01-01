const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors')
app.use(cors());

const server = http.createServer(app);

const { Socket } = require('dgram');

const io = new Server(server,
  {
    cors:{
      origin:"http://localhost:3000",
      methods:["GET","POST"]
    }

  });

  io.on('connection', (socket)=>{
   console.log(`A user connected ${socket.id}`);

     /*join a user to a room*/
   socket.on('joinRoom', (roomId)=>{
    socket.join(roomId);
    console.log(`A user named : ${socket.id} join to Room : ${roomId}`);
 });


 socket.on('sendMessage', (messageData)=>{
  socket.to(messageData.roomId).emit("receivedMsg",messageData);
});

   socket.on('disconnect', ()=> {
      console.log(`A user disconnected ${socket.id}`);
   });
});

server.listen(3001,() => {
  console.log('Server listening on port 3001');
});
