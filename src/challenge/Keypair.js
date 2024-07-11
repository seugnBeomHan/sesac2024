import assert from 'assert/strict';

const keyPair = (datas, pair) => {
    const cache = new Map();

    for (let i = 0; i < datas.length; i += 1) {
        const index = cache.get(pair - datas[i]);
        if (index !== undefined) return [index, i];
        if (!cache.has(datas[i])) cache.set(datas[i], i);
    }
    return;
};
assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 9), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 2, 3, 4, 4, 5, 7], 9), [4, 6]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 12), [4, 5]);