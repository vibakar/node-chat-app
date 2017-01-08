const path=require("path");
const express=require("express");
const http=require("http");
const socketIO=require("socket.io");

const {generateMessage,generateLocationMessage}=require('./utils/message');

const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;
var app=express();

app.use(express.static(publicPath));

var server=http.createServer(app);
var io=socketIO(server);
io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome to Chat App'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  socket.on('createMessage',(message,callback)=>{
    console.log('created message ',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  });

  socket.on('createLocation',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });

  socket.on('disconnect',()=>{
    console.log('user was disconnected');
  });

});
server.listen(port,()=>{
  console.log(`server started on port ${port}`);
});
