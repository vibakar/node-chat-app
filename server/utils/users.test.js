var expect=require('expect');

var {Users}=require('./users');

describe('Users',()=>{
  var users;

  beforeEach(()=>{
    users=new Users();
    users.users=[{
      id:'1',
      name:'viba',
      room:'my group'
    },{
      id:'2',
      name:'dhoni',
      room:'smile group'
    },{
      id:'3',
      name:'virat',
      room:'my group'
    }];
  });

  it('should add users',()=>{
    var users=new Users();
    var user={
      id:'123',
      name:'viba',
      room:'my group'
    }
    var res=users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for my group',()=>{
    var list=users.getUserList('my group');
    expect(list).toEqual(['viba','virat']);
  });

  it('should return names for smile group',()=>{
    var list=users.getUserList('smile group');
    expect(list).toEqual(['dhoni']);
  });

  it('should remove a user',()=>{
    var user=users.removeUser('3');
    expect(user.id).toBe('3');
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user',()=>{
    var user=users.removeUser('5');
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user',()=>{
    var user=users.getUser('1');
    expect(user.id).toEqual('1');
  });

  it('should not find a user',()=>{
    var user=users.getUser('5');
    expect(user).toNotExist();
  });
});
