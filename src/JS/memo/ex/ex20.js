const arr = [1, 2, 3, 4, 5];
arr.length = 100;
arr[23] = 30;
console.log(arr);

// for (const e of arr) {
//     console.log(e);
// }

const obj = {
    age: 27
};

console.log(obj['age']);
// console.log(obj[age]);
console.log(obj.age);
console.log(obj[0]);
console.log(obj['0']);

const objNum = {
    '10': 2,
    '20': 2,
    '12': 5,
    '83': 2,
    '0': 2
};

console.log(objNum);
console.log('----------------------');

const user = {
    name: 'Han',
    lv: 10,
    role: 'warrier',
    stat: { hp: 1000, mp: 500, str: 10, dex: 25, int: 5, lux: 40 }
};

const tmp = user.stat;
console.log(tmp);

Object.defineProperty(user, 'stat', {
    writable: false,
});

Object.defineProperty(user, 'stat', {
    value: {
        hp: 2000, mp: 1000, str: 110, dex: 125, int: 15, lux: 140
    }
});

console.log(tmp === user.stat);
console.log(user.stat);
