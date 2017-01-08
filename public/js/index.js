var socket=io();
socket.on('connect',function(){
  console.log('connected to server');
});

socket.on('disconnect',function(){
  console.log('disconnected from server');
});

socket.on('newMessage',function(message){
  console.log('new message',message);
  var li=jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
    var li=jQuery('<li></li>');
    var a=jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}:`);
    a.attr('href',message.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit',function(e){
  e.preventDefault();

  var messageTextBox=  jQuery('[name=message]');
  socket.emit('createMessage',{
    from: 'User',
    text:  messageTextBox.val()
  },function() {
    messageTextBox.val('');
  });
});

var locationButton=$("#send-location");
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert("Your browser does not support geolocation");
  }

  locationButton.attr('disabled','disabled').text('Sending Location..');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocation',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  });
});
