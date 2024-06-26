// 짧게 줄여볼 것

import assert from 'node:assert/strict';

const arr = [1, 2, 3, 4, 5];

const square = (n) => n ** 2;
const sqrt = (n) => Math.sqrt(n);
const cube = (n) => n ** 3;

const res = arr.reduce((acc, cur) => [...acc, (cube(sqrt(square(cur))))], []);
assert.deepStrictEqual(res, [1, 8, 27, 64, 125]);

const go = (array, funcs) => {
    return array.reduce((acc, n) => {
        funcs.map(func => {
            n = func(n);
        });
        return [...acc, n];
    }, []);
};

assert.deepStrictEqual(go(arr, [square, cube, sqrt]), arr.map(a => a ** 2).map(a => a ** 3).map(a => Math.sqrt(a)));
assert.deepStrictEqual(go(arr, [sqrt, square, cube]), arr.map(a => Math.sqrt(a)).map(a => a ** 2).map(a => a ** 3));
assert.deepStrictEqual(go(arr, [cube, sqrt, square]), arr.map(a => a ** 3).map(a => Math.sqrt(a)).map(a => a ** 2));