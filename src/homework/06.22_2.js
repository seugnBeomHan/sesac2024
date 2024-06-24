import assert from 'node:assert/strict';

const deleteArray = (array, startOrKey, endOrValue) => {
    if (!Array.isArray(array)) return;
    if (startOrKey === undefined) return [...array];

    const startOrKeyType = typeof (startOrKey);

    if (startOrKeyType === 'number') {
        endOrValue = endOrValue || array.length;
        return array.filter((e, i) => i < startOrKey || i > endOrValue - 1);
    }

    if (startOrKeyType === 'string') {
        if (endOrValue === undefined) return [...array];
        return array.filter((e) => e[startOrKey] !== endOrValue);
    }

    return;
};

const arr = [1, 2, 3, 4];
assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
assert.deepStrictEqual(deleteArray(arr, 1, arr.length), [1]);
assert.deepStrictEqual(deleteArray(arr), [1, 2, 3, 4]); // 잘못 된 인풋
assert.deepStrictEqual(deleteArray(10, 10, 10), undefined); // 잘못 된 인풋
assert.deepStrictEqual(deleteArray(arr, arr.length, 1), [1, 2, 3, 4]); // 잘못 된 인풋
assert.deepStrictEqual(deleteArray(arr, 2, arr.length + 1), [1, 2]); // 잘못 된 인풋
assert.deepStrictEqual(arr, [1, 2, 3, 4]);

const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
const users = [Hong, Kim, Lee];

assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'id', 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'name', 'Lee'), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 'id'), [Hong, Kim, Lee]); // 잘못 된 인풋
assert.deepStrictEqual(deleteArray(users, 'id', 10), [Hong, Kim, Lee]); // 잘못 된 인풋
assert.deepStrictEqual(deleteArray(users, 'name', 'Han'), [Hong, Kim, Lee]); // 잘못 된 인풋
assert.deepStrictEqual(deleteArray(users), [Hong, Kim, Lee]);