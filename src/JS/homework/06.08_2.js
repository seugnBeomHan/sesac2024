const user = { id: 1, name: 'Hong', passwd: 'xxx', addr: 'Seoul' };

const { passwd, ...userInfo } = user;
console.log(userInfo);

const { id, name, addr } = user;
const userInfo2 = { id, name, addr }; 
console.log(userInfo2);