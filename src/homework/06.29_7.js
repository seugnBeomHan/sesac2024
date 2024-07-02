import assert from 'assert/strict';

const A = [1, 2, 3, 4, 5, 3];
const B = [1, 22, 3, 44, 5];
const C = [11, 222, 3, 4, 555];

// 교집합
const intersection = (setA, setB) => {
    const cache = new Map();
    const result = new Set();

    setB.forEach((e) => { cache.set(e, e); });
    setA.forEach((e) => { if (cache.get(e) !== undefined) result.add(e); });

    return [...result];
};

// 차집합
const diff = (setA, setB) => {
    const cache = new Map();
    const result = new Set();

    setB.forEach((e) => { cache.set(e, e); });
    setA.forEach((e) => { if (cache.get(e) === undefined) result.add(e); });

    return [...result];
};

// 합집합 
const union = (setA, setB) => [...setB.reduce((set, cur) => set.add(cur), new Set(setA))];

assert.deepStrictEqual(intersection(A, B), [1, 3, 5]);
assert.deepStrictEqual(intersection(A, C), [3, 4]);
assert.deepStrictEqual(diff(A, B), [2, 4]);
assert.deepStrictEqual(diff(B, A), [22, 44]);
assert.deepStrictEqual(diff(A, C), [1, 2, 5]);
assert.deepStrictEqual(diff(B, C), [1, 22, 44, 5]);
assert.deepStrictEqual(union(A, B), [1, 2, 3, 4, 5, 22, 44]);
assert.deepStrictEqual(union(A, C), [1, 2, 3, 4, 5, 11, 222, 555]);