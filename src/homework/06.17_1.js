// input zero or less check
const isZeroOrLess = input => {
    return input <= 0;
}

// forward
const makeArray = arrCount => {
    if (isZeroOrLess(arrCount)) return [];

    const resArr = [];

    return (function recursive(n) {
        if (n === 1) {
            resArr.push(n);
            return resArr;
        }
        return [...recursive(n - 1), n];
    })(arrCount);
};

// Reverse
const makeReverseArray = arrCount => {
    if (isZeroOrLess(arrCount)) return [];

    const resArr = [];

    return (function recursive(n) {
        if (n === 1) {
            resArr.push(n);
            return resArr;
        }
        return [n, ...recursive(n - 1)];
    })(arrCount);
};

// input error 처리, [] 리턴
console.log(makeArray(-1));
console.log(makeArray(0));

console.log(makeReverseArray(-1));
console.log(makeReverseArray(0));

// 1 ~ 50까지 테스트
for (let i = 1; i <= 50; ++i) {
    console.log([makeArray(i), makeReverseArray(i)]);
    console.log('--------------');
}