// 1, 1, 2, 3, 5, 8, 13, 21, ...
function fibonacciRecursive(fibonacci) {
    if (fibonacci <= 1)
        return fibonacci;
    return fibonacciRecursive(fibonacci - 1) + fibonacciRecursive(fibonacci - 2);
}
console.log(fibonacciRecursive(6));
console.log(fibonacciRecursive(5));
console.log(fibonacciRecursive(4));
function fibonacciLoop(fibonacci) {
    if (fibonacci <= 2)
        return 1;
    let result = 1;
    let previousResult = 1;
    for (let i = 2; i < fibonacci; i += 1) {
        result += previousResult;
        previousResult = result - previousResult;
    }
    return result;
}
console.log(fibonacciLoop(6));
console.log(fibonacciLoop(5));
console.log(fibonacciLoop(4));
function fibonacciMemo() {
    const cache = {};
    function recursive(num) {
        if (num <= 1)
            return num;
        return cache[num] ? cache[num] :
            cache[num] = recursive(num - 1) + recursive(num - 2);
    }
    return recursive;
}
const fiboMemo = fibonacciMemo();
console.log(fiboMemo(6));
console.log(fiboMemo(5));
console.log(fiboMemo(4));
console.time('recur');
console.log('recur: ' + fibonacciRecursive(40));
console.timeEnd('recur');
console.time('loop');
console.log('loop: ' + fibonacciLoop(40));
console.timeEnd('loop');
console.time('memo');
console.log('memo: ' + fiboMemo(40));
console.timeEnd('memo');
export {};
