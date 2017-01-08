const expect=require('expect');

var {isRealString}=require('./validation');

describe('Validating string',()=>{
  it('should return the string',()=>{
    var str='viba';
      var result=isRealString(str);
      expect(result).toBe(true);
  });

  it('should reject non-string',()=>{
    var str=123;
      var result=isRealString(str);
      expect(result).toBe(false);
  });

  it('should reject if only spaces',()=>{
    var str=' ';
      var result=isRealString(str);
      expect(result).toBe(false);
  });

});
