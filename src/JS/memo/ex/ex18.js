const obj = { 1: 1, 2: 2, 3: 3 };
console.table(obj);
console.log(obj.prototype);
console.log(obj.__proto__.construtor);

const obj1 = new Object(obj);
const obj2 = new Object({ 10: 10, 20: 20 });
const obj3 = new Object();
console.log(obj === obj1);
obj[1] =10;
console.log(obj1);
console.log(obj === obj2);
console.log(obj === obj3);

console.log(obj1);
console.log(obj1.prototype);

console.log(obj2);
console.log(obj2.prototype);

console.log(obj3);
console.log(obj3.prototype);