import assert from 'assert/strict';
function push(arr, ...value) {
    return [...arr, ...value];
}
function pop(arr, count = 1) {
    return count === 1 ?
        arr.slice(arr.length - count)[0] :
        arr.slice(arr.length - count);
}
function unshift(arr, ...value) {
    return [...value, ...arr];
}
function shift(arr, count = 1) {
    return count === arr.length - 1 ?
        arr.slice(count)[0] :
        arr.slice(count);
}
const arr = [1, 2, 3, 4];
assert.deepStrictEqual(push(arr, 5, 6), [1, 2, 3, 4, 5, 6]);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);
assert.deepStrictEqual(pop(arr), 4);
assert.deepStrictEqual(pop(arr, 2), [3, 4]);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);
assert.deepStrictEqual(shift(arr), [2, 3, 4]);
assert.deepStrictEqual(shift(arr, 2), [3, 4]);
assert.deepStrictEqual(shift(arr, 3), 4);
assert.deepStrictEqual(shift(arr, 4), []);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);
