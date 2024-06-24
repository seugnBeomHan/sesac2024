import assert from 'node:assert/strict';

export const reduce = (array, fn, start = 0, thisArg) => {
    for (let i = 0; i < array.length; i += 1) {
        start = + fn(start, array[i], thisArg);
    }
    return start;
}

assert.deepStrictEqual(reduce([1, 2, 3], (acc, cur) => acc + cur, 0), 6);
assert.deepStrictEqual(reduce([1, 2, 3, 4, 5], (acc, cur) => acc + cur), 15);
assert.deepStrictEqual(reduce([1, 2, 3, 4, 5], (acc, cur) => acc * cur, 1), 120);
assert.deepStrictEqual(reduce([2, 2, 2], (acc, cur) => acc * cur, 1), 8);
assert.deepStrictEqual(reduce([3, 3, 3], (acc, cur) => acc * cur, 0), 0);
assert.deepStrictEqual(reduce([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (acc, cur) => acc + cur, 0), 55);