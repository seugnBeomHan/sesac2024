// Loop
const fibonacciLoop = n => {
    if (n <= 2) return 1;

    let res = 1;
    let prev = 1;

    for (let i = 2; i < n; i += 1) {
        [prev, res] = [res, res + prev];
    }

    return res;
};

// recursive
const fibonacciRecursive = n => {
    if (n <= 2) return 1;
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
};

// memoized
const fibonacciMemoizeConstructor = () => {
    const storage = {};

    return function memoized(nRecur) {

        if (nRecur <= 2) return storage[nRecur] = 1;

        return storage[nRecur] ??
            (storage[nRecur] = memoized(nRecur - 1) + memoized(nRecur - 2));
    };
};

const fibonacciMemoizeRunImmediately = n => {
    const storage = {};

    return (function recursive(nRecur) {

        if (nRecur <= 2) return storage[nRecur] = 1;

        return storage[nRecur] ??
            (storage[nRecur] = recursive(nRecur - 1) + recursive(nRecur - 2));
    })(n);
};

// console.time(`Immediately time`);
// console.log(fibonacciMemoizedImmediately(30));
// console.timeEnd(`Immediately time`);
// console.time(`Immediately time`);
// console.log(fibonacciMemoizedImmediately(31));
// console.timeEnd(`Immediately time`);
// console.time(`Immediately time`);
// console.log(fibonacciMemoizedImmediately(32));
// console.timeEnd(`Immediately time`);
// console.time(`Immediately time`);
// console.log(fibonacciMemoizedImmediately(33));
// console.timeEnd(`Immediately time`);
// console.time(`Immediately time`);
// console.log(fibonacciMemoizedImmediately(34));
// console.timeEnd(`Immediately time`);
// console.time(`Immediately time`);
// console.log(fibonacciMemoizedImmediately(35));
// console.timeEnd(`Immediately time`);
// console.time(`Immediately time`);
// console.log(fibonacciMemoizedImmediately(36));
// console.timeEnd(`Immediately time`);
// console.time(`Immediately time`);
// console.log(fibonacciMemoizedImmediately(37));
// console.timeEnd(`Immediately time`);
// console.time(`Immediately time`);
// console.log(fibonacciMemoizedImmediately(38));
// console.timeEnd(`Immediately time`);
// console.time(`Immediately time`);
// console.log(fibonacciMemoizedImmediately(39));
// console.timeEnd(`Immediately time`);

// memoized

const fibonacciMemoized = fibonacciMemoizeConstructor();
console.time(`memoized time`);
console.log(fibonacciMemoized(30));
console.timeEnd(`memoized time`);
console.time(`memoized time`);
console.log(fibonacciMemoized(31));
console.timeEnd(`memoized time`);
console.time(`memoized time`);
console.log(fibonacciMemoized(32));
console.timeEnd(`memoized time`);
console.time(`memoized time`);
console.log(fibonacciMemoized(33));
console.timeEnd(`memoized time`);
console.time(`memoized time`);
console.log(fibonacciMemoized(34));
console.timeEnd(`memoized time`);
console.time(`memoized time`);
console.log(fibonacciMemoized(35));
console.timeEnd(`memoized time`);
console.time(`memoized time`);
console.log(fibonacciMemoized(36));
console.timeEnd(`memoized time`);
console.time(`memoized time`);
console.log(fibonacciMemoized(37));
console.timeEnd(`memoized time`);
console.time(`memoized time`);
console.log(fibonacciMemoized(38));
console.timeEnd(`memoized time`);
console.time(`memoized time`);
console.log(fibonacciMemoized(39));
console.timeEnd(`memoized time`);


// // time check
// const timeCheck = (n, ...fns) => {
//     for (const fn of fns) {
//         console.time(`${fn.name} time`);
//         fn(n);
//         console.timeEnd(`${fn.name} time`);
//     }
// }

// // test
// const resultPrint = (testFns, n) => {
//     console.log(`\nTest Function : ${testFns.name}\n`);

//     if (n <= 0) {
//         console.log(testFns(n));
//         return;
//     }

//     for (let i = 1; i <= n; i += 1) {
//         console.log(`i: ${i} / fibo : ${testFns(i)}`);
//     }
// }

// const resultEqual = (n, ...testFns) => {
//     const testFnsCount = testFns.length;

//     for (let i = 1; i <= n; i += 1) {
//         let prev = -1;
//         let valid = true;
//         for (let j = 0; j < testFnsCount; j += 1) {
//             const curVal = testFns[j](i);
//             if (prev === -1) {
//                 prev = curVal;
//                 continue;
//             }

//             if (prev !== -1) {
//                 prev === curVal ? prev = curVal : valid = false;
//             }
//         }
//         if (!valid) {
//             console.log(`${i} 번째 값 불일치`);
//             return;
//         }
//         console.log(valid);
//     }
// }
// resultPrint(fibonacciLoop, -1);
// resultPrint(fibonacciLoop, 0);
// resultPrint(fibonacciLoop, 30);
// resultPrint(fibonacciRecursive, -1);
// resultPrint(fibonacciRecursive, 0);
// resultPrint(fibonacciRecursive, 30);
// resultEqual(30, fibonacciLoop, fibonacciRecursive);
// timeCheck(40, fibonacciLoop, fibonacciRecursive);