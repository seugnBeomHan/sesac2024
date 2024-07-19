function factorial(outerNum: number): number {
    let reStartNum = 0;
    let ret = 0

    ret += recursive(outerNum);
    let reStartNumPrev = reStartNum;

    while (reStartNum !== 0) {
        ret += recursive(reStartNum);
        if (reStartNum === reStartNumPrev) return ret;
        reStartNumPrev = reStartNum;
    }

    return ret;

    function recursive(innerNum: number): number {
        try {
            if (innerNum === 1) return 1;
            return innerNum + recursive(innerNum - 1);
        } catch (error) {
            reStartNum = innerNum;
            return 0;
        }
    }
}

console.log(factorial(10));
console.log(factorial(100));
console.log(factorial(1000));
console.log(factorial(10000));
console.log(factorial(100000));
console.log(factorial(1000000));
console.log(factorial(10000000));
console.log(factorial(100000000));