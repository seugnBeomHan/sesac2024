// 항상 조건을 먼저 생각할 것
// 요구사항 및 예외 상황, 규칙을 말로 쓰고, 코딩할 것 
// 루프는 한 번만, 어떻게 얼마나 돌아야 할 지 미리 정해볼 것

import assert from 'node:assert/strict';

const range = (start, end, interval = start < end ? 1 : -1) => {
    if (start === end || interval === 0) return [start];
    if (start < end && interval < 0) return [];
    if (start > end && interval > 0) return [];

    // up & down
    if (end === undefined) {
        const size = start === 0 ? 1 : Math.abs(start);
        start = start > 0 ? 1 : start;

        return Array.from(
            { length: size },
            (_, i) => {
                return i + start;
            });
    }

    const ret = [];

    for (let i = start; start < end ? i <= end : i >= end; i += interval) {
        ret.push(i);
    }

    return ret;
};

// wrong input
assert.deepStrictEqual(range(5, 5, 0), [5]);
assert.deepStrictEqual(range(1, 5, 0), [1]);
assert.deepStrictEqual(range(0, 0), [0]);
assert.deepStrictEqual(range(5, 5, -1), [5]);
assert.deepStrictEqual(range(5, 5), [5]);
assert.deepStrictEqual(range(0, 0, 5), [0]);

// up
assert.deepStrictEqual(range(1, 5, -1), []);
assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]) // [1, 3, 5, 7, 9]
assert.deepStrictEqual(range(1, 5, 6), [1]);
assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(-3, 0), [-3, -2, -1, 0]);

// down
assert.deepStrictEqual(range(5, 1, 1), []);
assert.deepStrictEqual(range(0, -1, -5), [0]);
assert.deepStrictEqual(range(2, 1, -5), [2]);
assert.deepStrictEqual(range(0, -1), [0, -1]);
assert.deepStrictEqual(range(0, -3), [0, -1, -2, -3]);
assert.deepStrictEqual(range(5, 1), [5, 4, 3, 2, 1]);
assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
assert.deepStrictEqual(range(10, 1, -2), [10, 8, 6, 4, 2]);

// up & down
assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(100), [...new Array(100)].map((_, i) => i + 1));
assert.deepStrictEqual(range(0), [0]);
assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]);