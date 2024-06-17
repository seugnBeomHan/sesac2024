// forward
const makeArray = n => {
    if (n <= 1) return [1];
    return [...makeArray(n - 1), n];
};

// Reverse
const makeReverseArray = n => {
    if (n <= 1) return [1];
    return [n, ...makeReverseArray(n - 1)];
};

// 1 ~ 50까지 테스트
for (let i = 1; i <= 50; ++i) {
    console.log([makeArray(i), makeReverseArray(i)]);
    console.log('--------------');
}