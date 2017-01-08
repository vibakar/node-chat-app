var moment=require('moment');

var date=moment();
console.log(date);
console.log('year',date.format('MMM Do, YYYY'));
console.log('time',date.format('h:mm a'));
