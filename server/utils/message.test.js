const expect=require('expect');
var {generateMessage}=require('./message');

describe('GenerateMessage',()=>{
  it('should generate correct message object',()=>{
    var from='viba';
    var text='hello!!!'
    var res=generateMessage(from,text);

    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(res.createdAt).toBeA('number');
  });
});
