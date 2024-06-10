var exAdd = function () {
    console.log('exAdd');
}
console.log(exAdd);
exAdd();

let a = 10;
let b = 20;

[a, b] = [b, a];

console.log(a, b);

const idx0 = '0';
const idx1 = '1';
const arr = [1, 2];
const { '0': a1, '1': a2 } = arr;
const { 0: a3, 1: a4 } = arr;
const { [0]: a5, [1]: a6 } = arr;
const { ['0']: a10, ['1']: a11 } = arr;
const { idx0: a7, idx1: a8 } = arr;
console.log(a1, a2);
console.log(a3, a4);
console.log(a5, a6);
console.log(a7, a8);
console.log(a10, a11);

const obj1 = { id: 1, name: 'han' };
const obj2 = { ...obj1 };
console.log(obj1);
console.log(obj2);
console.log(obj1 === obj2);

function myFunction(v, w, x, y, z, zz) {
    console.log(v, w, x, y, z, zz);
}
var arg1 = [0, 1];
myFunction(...arg1, 10, 20, ...[3, 5]);

const spArr1 = [1, 2, 3, 4, 5];
const spArr2 = [1, 2, 3, 4, 5];
const spArr3 = [...spArr1, ...spArr2];
console.log(spArr3);