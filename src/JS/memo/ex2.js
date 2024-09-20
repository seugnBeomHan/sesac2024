const arr2 = [1, 2, 3, 4, 5];

console.log(arr2.slice(1, 3));
console.log(arr2.slice(2));
const splice1_3 = arr2.splice(1, 3);
console.log(arr2);
arr2.splice(1, 0, ...splice1_3);
console.log(arr2);
const splice3 = arr2.splice(3);
console.log(arr2);
arr2.splice(3, 0, ...splice3);
console.log(arr2);

const input = 'XYZ';
const first = arr2.slice(0, 2);
const second = arr2.slice(3);
console.log(first);
console.log(second);
console.log([...first, ...input, ...second]);

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sum1 = numbers.reduce((accumulator, currentNumber) => accumulator + currentNumber);

console.log('sum1 =', sum1);

const objs = [{ id: 1 }, { name: 'Hong' }, { addr: 'Seoul', id: 5 }];
const obj = objs.reduce((acc, a) => ({ ...acc, ...a }), {});
console.log(obj);
// ⇒⇒⇒ {id: 5, name: 'Hong', addr: 'Seoul'}
//  assert.deepStrictEqual(obj, { id: 5, name: 'Hong', addr: 'Seoul' });
