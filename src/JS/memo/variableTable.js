// var global = 100;

// // function ff() {
// //     function f() {
// //         var i = 1;
// //         var j = 2;
// //         console.log(i + j + global);
// //         global = 20;
// //         console.log(i + j + global);
// //         global = `XYZ`;
// //         global = 30;
// //         global = `NCNCN`;
// //         global = 1000;
// //         global = `XYZ`;
// //     }

// //     f();

// //     global = 100;

// //     f();

// //     global = `ABCDEFG`;

// //     f();

// //     console.log(global);
// // }
// // ff();
// // function addEx1() {
// //     let a = 10;
// //     let b = 20;
// //     let c = a + b;
// //     let d = c + global;
// //     //global = `ABCDEF`;
// //     //global = 50;
// //     global = 1.5;
// // }
// // addEx1();

// function addEx2(num1, num2) {
//     let a = 10;
//     let b = a + num1;
//     let c = b + num2;

//     return c;
// }
// console.log(addEx2(3, 4));

// (() => {
//     console.log('무명함수 실행');
// })();

// console.log(typeof undefined);
// console.log(typeof null);
// console.log(typeof NaN);

// // import { prompt } from "./Prompt.js";

// // let input = []; // 이경우 , 연산자는 이전 상태를 따라가 let이 세팅된다.
// // prompt.on("line", line => {
// //     if (line !== '00') {
// //         input.push(line)
// //     } else {
// //         prompt.close();
// //     }
// // });

// // prompt.on("close", () => {
// //     console.log(input);
// //     process.exit();
// // });

// // testFunc2();
// // var testFunc2 = () => {
// //     console.log("var testFunc 실행!");
// // }

// // console.log(a);
// // let a = 100;

// // testFunc();
// // const testFunc = () => {
// //     console.log("testFunc 실행!");
// // };

// let strRef = 'han';
// console.log(`리터럴 변경 전 ${strRef}`);

// const changeStr = (str) => {
//     str = 'seungbeom';
// }

// console.log(`리터럴 변경 후 ${strRef}`);

// const objA = {};
// const objB = {};

// console.log(`objA == objB ${objA == objB}`);
// console.log(`objA === objB ${objA === objB}`);
// console.log(`type 비교 : objA === objB ${typeof objA === typeof objB}`);

// const objMethodEx = {
//     name: 'han',
//     getName() {
//         console.log(this.name);
//     },
// };
// objMethodEx.getName();
// console.dir(objMethodEx);

// const MakeUser = (name, age, lv) => {
//     this.name = name;
//     this.age = age;
//     this.lv = lv;

// }

// const numberRef1 = new Number(1);
// const numberRef2 = new Number(1);
// const numberRef0 = new Number(0);
// const numberOri3 = 1;
// console.log(`number Reference value compare : ${numberRef1 === numberRef2}`);
// console.log(`number Reference type compare : ${typeof numberRef1 === typeof numberOri3}`);
// console.log(`number Reference value zero is false? : ${numberRef0 ? 'true' : 'false'}`);

// let doubleNum = 6.35;
// console.log((6.35).toFixed(1)); // 반올림 되지 않고 내림 처리 된다.
// console.log((6.35).toFixed(20)); // 6.34999999999999964473 이기 때문에, 한자리만 남길 경우 6.3이 된다.

// doubleNum *= 10;
// console.log(doubleNum.toFixed(20)); // 63.50000000000000000000 이 경우 버림 처리 되지 않고, 정확한 값이 된다.

// doubleNum = Math.round(doubleNum); // round 함수는 소수점을 제거해주는데 .5이기 때문에 반올리 처리 되어 64가 된다.
// console.log(doubleNum);

// // 64에서 /10을 해줌으로써 완벽하게 반올림 처리가 가능하다.
// doubleNum /= 10;
// console.log(doubleNum);

// const arr1 = [1, 2, 3];
// const arr2 = [1, 2, 3];
// console.log(`arr1 === arr2 : ${arr1 === arr2}`);

// /**
//  * arr vs obj input 성능
//  * Array: 3.257ms
//  * Object: 49.533ms 
//  */

// const arrPerfomenceTest = () => {
//     let arrSum = 0;
//     const testArr = [];
//     console.time(`Array`);
//     for (let i = 0; i < 2000000; ++i) {
//         testArr[i] = i;
//     }
//     console.timeEnd(`Array`);

//     let objSum = 0;
//     const testObj = {};
//     console.time(`Object`);
//     for (let i = 0; i < 2000000; ++i) {
//         testObj[i] = i;
//     }
//     console.timeEnd(`Object`);

//     const arrLen = testArr.length;

//     console.time(`Array`);
//     for (let i = 0; i < arrLen; ++i) {
//         arrSum += testArr[i];
//     }
//     console.timeEnd(`Array`);

//     const objLen = 2000000;

//     console.time(`Object`);
//     for (let i = 0; i < objLen; ++i) {
//         objSum += testObj[i];
//     }
//     console.timeEnd(`Object`);
// }

// for (let i = 0; i < 30; ++i) {
//     arrPerfomenceTest();
//     console.log(`=======${i}=======`);
// }

const sumTo = (sumCount) => {
    if (sumCount === 0) {
        return 0;
    }
    return sumTo(sumCount - 1) + sumCount;
}
console.log(sumTo(10));
console.log(sumTo(100));

// 1! = 1
// 2! = 2 * 1 = 2
// 3! = 3 * 2 * 1 = 6
// 4! = 4 * 3 * 2 * 1 = 24
// 5! = 5 * 4 * 3 * 2 * 1 = 120

const factorial = (factoNum) => {
    if (factoNum === 1) {
        return 1;
    }
    return factorial(factoNum - 1) * factoNum;
}
console.log(factorial(1));
console.log(factorial(2));
console.log(factorial(3));
console.log(factorial(4));
console.log(factorial(5));
console.log(factorial(6));
console.log(factorial(7));
console.log(factorial(8));
console.log(factorial(9));
console.log(factorial(10));

const fibonaci = (fiboN) => {
    if (fiboN <= 1) {
        return fiboN;
    }
    return fibonaci(fiboN - 1) + fibonaci(fiboN - 2);
}
console.log(fibonaci(7));

console.time('fibo 40')
console.log(fibonaci(40)); // 0.92초
console.timeEnd('fibo 40');

const fiboOptimization = (count) => {
    if (count <= 2) {
        return 1;
    }

    let baseResult = 1, baseNum = 1;
    for (let i = 2; i < count; ++i) {
        [baseResult, baseNum] = [baseResult + baseNum, baseResult];
    }
    return baseResult;
}

console.time('fiboOptimization 40')
console.log(fiboOptimization(77));
console.timeEnd('fiboOptimization 40');

function makeCounter() {
    let count = 0;

    return function () {
        return count++;
    };
}

let counter = makeCounter();
let counter2 = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter2()); // ?
console.log(counter2()); // ?

function Counter() {
    let count = 0;

    this.up = function () {
        return ++count;
    };
    
    this.down = function () {
        return --count;
    };
}

let counterFunc = new Counter();

console.log(counterFunc.up()); // ?
console.log(counterFunc.up()); // ?
console.log(counterFunc.down()); // ?