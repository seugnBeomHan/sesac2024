/**
 * fibonacci 재귀로 돌릴 시 stack overflow 발생
 * (n * fibonacci(n - 1)로 하게 되면 stack overflow 이전에 Infinity 발생으로 +로 대체)
 * 
 * stack overflow가 발생해도 계산을 완료하고 값을 반환하도록 작성할 것
 * 
 * stack overflow 값은 pc 마다 다르며, 각자의 pc에서 overflow 값을 설정 후 코딩
 */

let testCount = 20000;
let CORRECTION_VALUE = (testCount / 2) / 2;
let stopCount = 0;
let sum = 0;

function safeFibonacci(n, range = 1) {
    if (n <= range) {
        return range;
    }
    return n + safeFibonacci(n - 1, range);
}

function fibonacci(n) {
    try {
        if (n <= 1) {
            return 1;
        }
        return n + fibonacci(n - 1);
    } catch (error) {
        if (error.message.includes('call stack')) {
            stopCount = n;
        }
    }
}

console.log(fibonacci(testCount));


console.log(testCount - stopCount);
sum += safeFibonacci(testCount, stopCount + CORRECTION_VALUE);
console.log(sum);
sum += safeFibonacci(stopCount + CORRECTION_VALUE - 1, 1);
console.log(sum);

// const func = function () {
//     console.log('func');
// };
// const func2 = func;

// const obj = {
//     getName() {
//         return 'han';
//     }
// };
// for (const a in obj) {
//     console.log(obj[a]());
// }

// const kim = { nid: 3, nm: 'Hong', addr: 'Pusan' };
// const newObj = {};
// for (const k in kim) {
//     newObj[k] = kim[k];
// }
// console.log(kim);
// console.log(newObj);
// console.log(kim === newObj);
// console.log(kim.nid === newObj.nid);
// console.log(kim.nid, newObj.nid);
// newObj.nm = 'Han';
// console.log(kim.nm === newObj.nm);
// console.log(kim.nm, newObj.nm);

// const han = {
//     nid: 3,
//     nm: 'Seung',
//     addr: {
//         living: 'Busan',
//         hometown: 'Seoul'
//     },
//     pets: {
//         name: ['navi', 'baeggu', 'kkamdung-i']
//     }
// };
