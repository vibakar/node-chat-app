var socket=io();

function scrollToBottom(){
  //selectors
  var messages=jQuery('#messages');
  var newMessage=messages.children('li:last-child');
  //heights
  var scrollTop=messages.prop('scrollTop');
  var clientHeight=messages.prop('clientHeight');
  var scrollHeight=messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();

if(scrollTop+clientHeight+newMessageHeight+lastMessageHeight>=scrollHeight){
  messages.scrollTop(scrollHeight);
}
  console.log(scrollTop);
  console.log(clientHeight);
  console.log(scrollHeight);
}


socket.on('connect',function(){
  var params=jQuery.deparam(window.location.search);
  socket.emit('join',params,function(err){
    if(err){
        alert(err);
        window.location.href='/';
    }
    else{
      console.log('No error');
    }
  });
});

socket.on('disconnect',function(){
  console.log('disconnected from server');
});

socket.on('updateUserList',function(users){
  var ol=jQuery('<ol></ol>');

  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});


socket.on('newMessage',function(message){
  var formattedTime=moment(message.createdAt).format('h:mm a');
  var template=jQuery('#message-template').html();
  var html=Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage',function(message){
    var formattedTime=moment(message.createdAt).format('h:mm a');
    var template=jQuery('#location-message-template').html();
    var html=Mustache.render(template,{
      url:message.url,
      from:message.from,
      createdAt:formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

$('#message-form').on('submit',function(e){
  e.preventDefault();

  var messageTextBox=jQuery('[name=message]');
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
