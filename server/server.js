const path=require("path");
const express=require("express");
const http=require("http");
const socketIO=require("socket.io");

const {generateMessage,generateLocationMessage}=require('./utils/message');
const {isRealString}=require('./utils/validation');
const {Users}=require('./utils/users');

const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;
var app=express();
app.use(express.static(publicPath));
var server=http.createServer(app);
var io=socketIO(server);
var users=new Users();

io.on('connection',(socket)=>{
  console.log('new user connected');


  socket.on('join',(params,callback)=>{
      if(!isRealString(params.name) || !isRealString(params.room)){
        return callback("Name and Room Name are Required");
      }
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id,params.name,params.room);

      io.to(params.room).emit('updateUserList',users.getUserList(params.room));
      socket.emit('newMessage',generateMessage('Admin','Welcome to Chat App'));
      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
      callback();
  });

  socket.on('createMessage',(message,callback)=>{
    console.log('created message ',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  });

  socket.on('createLocation',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });

  socket.on('disconnect',()=>{
    var user=users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
    }
  });

});
server.listen(port,()=>{
  console.log(`server started on port ${port}`);
});
