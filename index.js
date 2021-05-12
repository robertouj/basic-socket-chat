const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  /* 
  // This will emit the event to all connected sockets
  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); 
  // to send a message to everyone except for a certain emitting socket
  io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  }); 
  */
});

server.listen(process.env.PORT || 3000, () => {
  console.log("listening on *:3000");
});
