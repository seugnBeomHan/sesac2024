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

function Humen({ name, age, addr, school } = {}) {
    this.name = name;
    this.age = age;
    this.addr = addr;
    this.school = school;
}

const user1 = new Humen({
    name: 'han',
    age: 27,
    addr: 'seoul',
    school: 'highSchool'
});
console.log(user1);

// function Humen([name, age, addr, school] = {}) {
//     this.name = name;
//     this.age = age;
//     this.addr = addr;
//     this.school = school;
// }

// const userArr = new Humen(['han', 27, 'seoul', 'highSchool']);
// console.log(userArr);

const strArr1 = ['My', 'name', 'is', 'Han Seung Beom', '!!'];
console.log(strArr1);
console.log(strArr1.splice(1, 2));

const strArr2 = ['My', 'name', 'is', 'Han Seung Beom', '!!'];
console.log(strArr2);
console.log(strArr2.splice(2, 0, 'Han Seung Chan', '..!!'));

const strArr3 = ['My', 'name', 'is', 'Han Seung Beom', '!!'];

let arrEX = ["I", "study", "JavaScript"];
arrEX.splice(2, 0, "complex", "language"); // 이거 추가가 안된다.

let names = 'Bilbo, Gandalf, Nazgul';
const [...nameSpilt] = names;
console.log(nameSpilt);
console.log(...names);

let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};

console.log(Object.entries(prices));
console.log(Object.entries(prices)[0][1]);

const tmp1 = Object.fromEntries(Object.entries(prices).map((value) => {
    console.log(typeof value);
    console.log(value);
    console.log(value[0]);
    console.log(value[1]);
    return [value[0], value[1] *= 2];
}));
console.log(tmp1);

let doublePrices = Object.fromEntries(
    // 객체를 배열로 변환해서 배열 전용 메서드인 map을 적용하고 fromEntries를 사용해 배열을 다시 객체로 되돌립니다.
    Object.entries(prices).map(([key, value]) => [key, value * 2])
);
console.log(doublePrices);

const fruits = { ...prices }; // 객체 얕은 복사
console.log(fruits);
console.log(fruits === prices);

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

const sumSalaries = (salaries) => {
    let result = 0;
    Object.values(salaries).forEach(salary => result += salary);
    return result;
};
console.log(sumSalaries(salaries));

let userEX = {
    name: 'John',
    age: 30
};

const counting = (user) => {
    let count = 0;
    for (let property in user) {
        count += 1;
    }
    console.log(count);
}
counting(userEX);

let userEX2 = {
    name: "John",
    age: 30
};

// 객체의 키와 값 순회하기
console.log(Object.entries(userEX2));
for (let [key, value] of Object.entries(userEX2)) {
    console.log(key, value);
}

let userEX3 = { name: "John", years: 30 };
const { name, years: age, isAdmin = false } = userEX3;
console.log(name); // John
console.log(age); // 30
console.log(isAdmin); // false

let employSalaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

const topSalary = (salaries) => {
    let maxSalryEmployName = '';
    let maxSalry = 0;
    Object.entries(salaries).forEach(([name, salry]) => {
        if (maxSalry < salry) {
            maxSalry = salry;
            maxSalryEmployName = name;
        }
    });
    return maxSalryEmployName;
}
console.log(topSalary(salaries));