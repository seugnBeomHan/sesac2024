import assert from 'assert/strict';

function deleteArray<T>
    (arr: T[], startOrKey: number | keyof T, endOrValue?: unknown) {
    if (typeof startOrKey === 'number') {
        return arr.filter((_, i) => {
            return i < startOrKey ||
                (typeof endOrValue === 'number' ? endOrValue - 1 : arr.length) < i;
        });
    }
    return arr.filter((e) => e && typeof e === 'object' && e[startOrKey] !== endOrValue);
}

const arr = [1, 2, 3, 4];
assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);


const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
const users = [Hong, Kim, Lee];

assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'id', 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'name', 'Lee'), [Hong, Kim]);
