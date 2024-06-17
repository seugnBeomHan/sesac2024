const isZeroOrLess = input => {
    return input <= 0;
};

// 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

// Loop
const fibonacciLoop = n => {
    if (isZeroOrLess(n)) return 0;

    if (n <= 2) {
        return 1;
    }

    let res = 1;
    let prev = 1;

    for (let i = 2; i < n; i += 1) {
        [prev, res] = [res, res + prev];
    }
    
    return res;
};

// recursive
const fibonacciRecursive = n => {
    if (isZeroOrLess(n)) return 0;

    return (function recursive(nRecur) {
        if (nRecur <= 2) {
            return 1;
        }

        return recursive(nRecur - 1) + recursive(nRecur - 2);
    })(n);
};

// memoized
const fibonacciMemoized = n => {
    if (isZeroOrLess(n)) return 0;

    const storage = {};

    return (function recursive(nRecur) {

        if (nRecur <= 2) {
            return storage[nRecur] = 1;
        }

        return storage[nRecur] ??
            (storage[nRecur] = recursive(nRecur - 1) + recursive(nRecur - 2));
    })(n);
};

// time check
const timeCheck = (n, ...fns) => {
    for (const fn of fns) {
        console.time(`${fn.name} time`);
        fn(n);
        console.timeEnd(`${fn.name} time`);
    }
}

// test
const resultPrint = (testFns, n) => {
    console.log(`\nTest Function : ${testFns.name}\n`);

    if (n <= 0) {
        console.log(testFns(n));
        return;
    }

    for (let i = 1; i <= n; i += 1) {
        console.log(`i: ${i} / fibo : ${testFns(i)}`);
    }
}

const resultEqual = (n, ...testFns) => {
    if (isZeroOrLess(n)) return 0;

    const testFnsCount = testFns.length;

    for (let i = 1; i <= n; i += 1) {
        let prev = -1;
        let valid = true;
        for (let j = 0; j < testFnsCount; j += 1) {
            const curVal = testFns[j](i);
            if (prev === -1) {
                prev = curVal;
                continue;
            }

            if (prev !== -1) {
                prev === curVal ? prev = curVal : valid = false;
            }
        }
        if (!valid) {
            console.log(`${i} 번째 값 불일치`);
            return;
        }
        console.log(valid);
    }
}
resultPrint(fibonacciLoop, -1);
resultPrint(fibonacciLoop, 0);
resultPrint(fibonacciLoop, 30);
resultPrint(fibonacciRecursive, -1);
resultPrint(fibonacciRecursive, 0);
resultPrint(fibonacciRecursive, 30);
resultPrint(fibonacciMemoized, -1);
resultPrint(fibonacciMemoized, 0);
resultPrint(fibonacciMemoized, 30);
resultEqual(30, fibonacciLoop, fibonacciRecursive, fibonacciMemoized);
timeCheck(40, fibonacciLoop, fibonacciRecursive, fibonacciMemoized);