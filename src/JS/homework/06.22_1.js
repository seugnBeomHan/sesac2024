// 순수함수는 loop를 돌지 않는다?!
// filter는 loop다, slice를 쓴다. loop은 돌지 않는다.
// slice는 내부에서 어떻게 돌까?

import assert from 'node:assert/strict';

const push = (array, ...values) => {
    return values.length !== 0 ? [...array, ...values] : [...array];
};

const pop = (array, count = 1) => {
    const arrLen = array.length;

    if (count === 0 ||
        count > arrLen ||
        count <= -arrLen) return;

    count = count < 0 ? count + arrLen : arrLen - count;
    const ret = array.slice(count, arrLen);

    return ret.length === 1 ? ret[0] : ret;
};

const shift = (array, count = 1) => {
    const arrLen = array.length;

    if (count === 0 ||
        count > arrLen ||
        count < -arrLen) return;

    const ret = array.slice(Math.abs(count), arrLen);
    return ret;
};

const unshift = (array, ...values) => {
    return values.length !== 0 ? [...values, ...array] : [...array];
};

const arr = [1, 2, 3, 4];
assert.deepStrictEqual(push(arr, 5, 6), [1, 2, 3, 4, 5, 6]);
assert.deepStrictEqual(push(arr, 5), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(push(arr), [1, 2, 3, 4]); // wrong input
assert.deepStrictEqual(arr, [1, 2, 3, 4]);
assert.deepStrictEqual(pop(arr), 4);
assert.deepStrictEqual(pop(arr, 2), [3, 4]);
assert.deepStrictEqual(pop(arr, 3), [2, 3, 4]);
assert.deepStrictEqual(pop(arr, arr.length), [1, 2, 3, 4]);
assert.deepStrictEqual(pop(arr, -arr.length + 1), [2, 3, 4]);
assert.deepStrictEqual(pop(arr, -1), 4);
assert.deepStrictEqual(pop(arr, -arr.length), undefined);
assert.deepStrictEqual(pop(arr, 0), undefined); // wrong input
assert.deepStrictEqual(pop(arr, arr.length + 1), undefined); // wrong input
assert.deepStrictEqual(arr, [1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr), [1, 2, 3, 4]); // wrong input
assert.deepStrictEqual(arr, [1, 2, 3, 4]);
assert.deepStrictEqual(shift(arr), [2, 3, 4]);
assert.deepStrictEqual(shift(arr, 2), [3, 4]);
assert.deepStrictEqual(shift(arr, -1), [2, 3, 4]);
assert.deepStrictEqual(shift(arr, arr.length), []);
assert.deepStrictEqual(shift(arr, -arr.length), []);
assert.deepStrictEqual(shift(arr, 0), undefined); // wrong input
assert.deepStrictEqual(shift(arr, arr.length + 1), undefined); // wrong input
assert.deepStrictEqual(arr, [1, 2, 3, 4]);