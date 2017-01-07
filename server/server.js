const path=require("path");
const express=require("express");
const http=require("http");
const socketIO=require("socket.io");

const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;
var app=express();

app.use(express.static(publicPath));

var server=http.createServer(app);
var io=socketIO(server);
io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.on('createMessage',(message)=>{
    console.log('created message ',message);
  });

  socket.emit('newMessage',{
    from:"someone",
    text:"Hello",
    createdAt:"7.00pm"
  });

  socket.on('disconnect',()=>{
    console.log('user was disconnected');
  });

});
server.listen(port,()=>{
  console.log(`server started on port ${port}`);
});
