import assert from 'node:assert/strict';

const range = (start, end, interval) => {
    if (start === undefined) return;
    if (start === end || interval === 0) return [start];
    if (((start - end) < 0 && interval < 0) ||
        (start - end) > 0 && interval > 0) return [];

    if (end === undefined) {
        return [...new Array(start === 0 ? 1 : Math.abs(start))].map((_, i) => {
            if (start < 0) return start + i;
            if (start > 0) return i + 1;
            if (start === 0) return 0;
        });
    }

    const arr = [];
    const loopCount = start === 0 || end === 0 ?
        Math.abs(start) + Math.abs(end) + 1 :
        Math.abs(start) + Math.abs(end) - 1;
    interval = interval || 1;
    for (let i = 0; i < loopCount; i += Math.abs(interval)) {
        if (start < end) {
            arr.push(start + i);
            continue;
        }
        if (start > end) {
            arr.push(start - i);
            continue;
        }
    }
    return arr;
};

// wrong input
assert.deepStrictEqual(range(), undefined);
assert.deepStrictEqual(range(0, 0), [0]);
assert.deepStrictEqual(range(5, 5, -1), [5]);
assert.deepStrictEqual(range(5, 5), [5]);
assert.deepStrictEqual(range(0, 0, 5), [0]);
assert.deepStrictEqual(range(5, 5, 0), [5]);
assert.deepStrictEqual(range(1, 5, 0), [1]);
assert.deepStrictEqual(range(5, 1, 1), []);
assert.deepStrictEqual(range(1, 5, -1), []);

assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]);
assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(0), [0]);
assert.deepStrictEqual(range(100), [...new Array(100)].map((_, i) => i + 1));

assert.deepStrictEqual(range(0, -1, -5), [0]);
assert.deepStrictEqual(range(2, 1, -5), [2]);
assert.deepStrictEqual(range(1, 5, 6), [1]);
assert.deepStrictEqual(range(0, -1), [0, -1]);
assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(0, -3), [0, -1, -2, -3]);
assert.deepStrictEqual(range(-3, 0), [-3, -2, -1, 0]);
assert.deepStrictEqual(range(5, 1), [5, 4, 3, 2, 1]);
assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]) // [1, 3, 5, 7, 9]
assert.deepStrictEqual(range(10, 1, -2), [10, 8, 6, 4, 2]) // [10, 8, 6, 4, 2]