const expect=require('expect');
var {generateMessage,generateLocationMessage}=require('./message');

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

describe("generateLocationMessage",()=>{
  it("should generate correct location object",()=>{
    var from="viba";
    var lat=15;
    var lon=20;
    var url="https://www.google.com/maps?q=15,20";
    var res=generateLocationMessage(from,lat,lon);
    expect(res.from).toBe(from);
    expect(res).toInclude({from,url});
    expect(res.createdAt).toBeA('number');
  });
});
