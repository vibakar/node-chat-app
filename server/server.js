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

  socket.emit('newMessage',{
    from:"Admin",
    text:"Welcome to chat App"
  });

  socket.broadcast.emit('newMessage',{
    from:"Admin",
    text:"New user Joined",
    createdAt:new Date().getTime()
  });

  socket.on('createMessage',(message)=>{
    console.log('created message ',message);
    io.emit('newMessage',{
      from:message.from,
      text:message.text,
      createdAt:new Date().getTime()
    });
    // socket.broadcast.emit('newMessage',{
    //     from:message.from,
    //    text:message.text,
    //    createdAt:new Date().getTime()
    //  });
  });

  socket.on('disconnect',()=>{
    console.log('user was disconnected');
  });

});
server.listen(port,()=>{
  console.log(`server started on port ${port}`);
});
