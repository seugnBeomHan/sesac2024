// acc 가 고정 값이 되면 정수 계산이 아닌 다른 값은 0이 붙게 된다.
// 이거 해결해 볼 것 (들어온 타입에 맞는 데이터를 주어야한다)

import assert from 'node:assert/strict';

const reduce = (array, fn, acc = 0, thisArg) => {
    array.forEach((e) => {
        acc = fn(acc, e, thisArg);
    });
    return acc;
}

assert.deepStrictEqual(reduce([1, 2, 3], (acc, cur) => acc + cur, 0), 6);
assert.deepStrictEqual(reduce([1, 2, 3, 4, 5], (acc, cur) => acc + cur), 15);
assert.deepStrictEqual(reduce([1, 2, 3, 4, 5], (acc, cur) => acc * cur, 1), 120);
assert.deepStrictEqual(reduce([2, 2, 2], (acc, cur) => acc * cur, 1), 8);
assert.deepStrictEqual(reduce([3, 3, 3], (acc, cur) => acc * cur, 0), 0);
assert.deepStrictEqual(reduce([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (acc, cur) => acc + cur, 0), 55);