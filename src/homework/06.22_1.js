import assert from 'node:assert/strict';

const push = (array, ...values) => {
    return values.length !== 0 ? [...array, ...values] : [...array];
};

const pop = (array, count = 1) => {
    const arrLen = array.length;

    if (count < 1 || count > arrLen) return;
    if (count === 1) return array[arrLen - 1];
    return array.filter((_, i) => i >= arrLen - count);
};

const shift = (array, count = 1) => {
    if (count < 1 || count > array.length) return;
    return array.filter((_, i) => i >= count);
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
assert.deepStrictEqual(pop(arr, 0), undefined); // wrong input
assert.deepStrictEqual(pop(arr, -1), undefined); // wrong input
assert.deepStrictEqual(pop(arr, arr.length + 1), undefined); // wrong input
assert.deepStrictEqual(arr, [1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr), [1, 2, 3, 4]);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);
assert.deepStrictEqual(shift(arr), [2, 3, 4]);
assert.deepStrictEqual(shift(arr, 2), [3, 4]);
assert.deepStrictEqual(shift(arr, arr.length), []);
assert.deepStrictEqual(shift(arr, 0), undefined); // wrong input
assert.deepStrictEqual(shift(arr, -1), undefined); // wrong input
assert.deepStrictEqual(shift(arr, arr.length + 1), undefined); // wrong input
assert.deepStrictEqual(arr, [1, 2, 3, 4]);