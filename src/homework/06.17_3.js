function memoized(fn) {
    const memoizedTable = {};
    return n => memoizedTable[n] || (memoizedTable[n] = fn(n));
}

const memoizedFactorial = memoized(function (n) {
    if (n <= 1) return 1;
    return n * memoizedFactorial(n - 1);
});

console.log(memoizedFactorial(5));
console.log(memoizedFactorial(4));
console.log(memoizedFactorial(3));
console.log(memoizedFactorial(2));
console.log(memoizedFactorial(1));