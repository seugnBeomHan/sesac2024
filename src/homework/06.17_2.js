const isZeroOrLess = input => {
    return input <= 0;
}

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
}

// test
const resultPrint = (testFn, n) => {
    console.log(`\nTest Function : ${testFn.name}\n`);

    if (n <= 0) {
        console.log(testFn(n));
        return;
    }

    for (let i = 1; i <= n; i += 1) {
        console.log(`i: ${i} / fibo : ${testFn(i)}`);
    }
}

const resultEqual = (testFn1, testFn2, n) => {
    console.log(`\nTest Function : ${testFn1.name}, ${testFn2.name}\n`);

    if (isZeroOrLess(n)) return 0;

    for (let i = 1; i <= n; i += 1) {
        console.log(`${i}: ${testFn1(i) === testFn2(i)}`);
    }
}
resultPrint(fibonacciLoop, -1);
resultPrint(fibonacciLoop, 0);
resultPrint(fibonacciLoop, 30);
resultPrint(fibonacciRecursive, -1);
resultPrint(fibonacciRecursive, 0);
resultPrint(fibonacciRecursive, 30);
resultEqual(fibonacciLoop, fibonacciRecursive, 30);