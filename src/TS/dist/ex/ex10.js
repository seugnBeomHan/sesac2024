import assert from 'assert/strict';
function keyPair(array, pair) {
    const cache = new Map();
    for (let i = 0; i < array.length; i += 1) {
        const curValue = array[i];
        if (!curValue)
            continue;
        const pairNum = cache.get(pair - curValue);
        if (pairNum)
            return [pairNum, i];
        if (!cache.has(curValue))
            cache.set(curValue, i);
    }
    return [];
}
assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 9), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 2, 3, 4, 4, 5, 7], 9), [4, 6]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 12), [4, 5]);
