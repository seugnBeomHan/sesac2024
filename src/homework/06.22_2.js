// 예외 처리 고민해 볼 것, key에 들어올 수 있는 값을 고민할 것

import assert from 'node:assert/strict';

const deleteArray = (array, startOrKey, endOrValue) => {
    if (!Array.isArray(array)) return;
    if (startOrKey === undefined) return [...array];

    const startOrKeyType = typeof (startOrKey);

    if (startOrKeyType === 'number') {
        endOrValue = endOrValue || array.length;
        return array.filter((_, i) => i < startOrKey || i > endOrValue - 1);
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
assert.deepStrictEqual(deleteArray(arr), [1, 2, 3, 4]); // wrong input
assert.deepStrictEqual(deleteArray(10, 10, 10), undefined); // wrong input
assert.deepStrictEqual(deleteArray(arr, arr.length, 1), [1, 2, 3, 4]); // wrong input
assert.deepStrictEqual(deleteArray(arr, 2, arr.length + 1), [1, 2]); // wrong input
assert.deepStrictEqual(arr, [1, 2, 3, 4]);

const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
const users = [Hong, Kim, Lee];

assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'id', 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'name', 'Lee'), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 'id'), [Hong, Kim, Lee]); // wrong input
assert.deepStrictEqual(deleteArray(users, 'id', 10), [Hong, Kim, Lee]); // wrong input
assert.deepStrictEqual(deleteArray(users, 'name', 'Han'), [Hong, Kim, Lee]); // wrong input
assert.deepStrictEqual(deleteArray(users), [Hong, Kim, Lee]);