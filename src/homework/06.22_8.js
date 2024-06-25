import assert from 'node:assert/strict';

const keyPairMap = (array, pair) => {
    const valueMap = new Map();

    for (let i = 0; i < array.length; i += 1) {
        const curVal = array[i];
        if (curVal >= pair) continue;

        const matchIdx = valueMap.get(pair - curVal);

        if (matchIdx !== undefined) return [matchIdx, i];
        if (!(valueMap.has(curVal))) valueMap.set(curVal, i);
    }
    return;
};

const keyPair = (array, pair) => {
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

assert.deepStrictEqual(keyPairMap([1, 3, 4, 5], 7), [1, 2]);
assert.deepStrictEqual(keyPairMap([1, 4, 45, 6, 10, 8], 16), [3, 4]);
assert.deepStrictEqual(keyPairMap([1, 2, 4, 3, 6], 10), [2, 4]);
assert.deepStrictEqual(keyPairMap([1, 2, 3, 4, 5, 7], 9), [3, 4]);
assert.deepStrictEqual(keyPairMap([1, 2, 3, 4, 5, 7], 12), [4, 5]);