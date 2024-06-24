import assert from 'node:assert/strict';

const keyPair = (array, pair) => {
    const ret = {};
    const len = array.length;

    const isPair = (target, num) => target + num === pair;

    for (let i = 0; i < len; i += 1) {
        const target = array[i];
        for (let j = i + 1; j < len; j += 1) {
            if (isPair(target, array[j])) return [i, j];
        }
    }
    return;
};

assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 9), [1, 5]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 12), [4, 5]);