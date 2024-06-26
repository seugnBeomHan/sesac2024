// 짧게 줄여볼 것

import assert from 'node:assert/strict';

const square = (n) => n ** 2;
const sqrt = (n) => Math.sqrt(n);
const cube = (n) => n ** 3;

const arr = [1, 2, 3, 4, 5];

// 원래 과제
const res = arr.reduce((acc, cur) => [...acc, cube(sqrt(square(cur)))], []);
assert.deepStrictEqual(res, arr.map(a => a ** 2).map(a => a ** 3).map(a => Math.sqrt(a)));

// Try This
const pipe = (array, fns) => array.map((e) => fns.reduce((acc, fn) => fn(acc), e));
assert.deepStrictEqual(pipe(arr, [square, cube, sqrt]), arr.map(a => a ** 2).map(a => a ** 3).map(a => Math.sqrt(a)));
assert.deepStrictEqual(pipe(arr, [sqrt, square, cube]), arr.map(a => Math.sqrt(a)).map(a => a ** 2).map(a => a ** 3));
assert.deepStrictEqual(pipe(arr, [cube, sqrt, square]), arr.map(a => a ** 3).map(a => Math.sqrt(a)).map(a => a ** 2));