import assert from 'node:assert/strict';

const push = (array, ...values) => {
    return values.length !== 0 ? [...array, ...values] : [...array];
};

const pop = (array, count = 1) => {
    const arrLen = array.length;

    if (count === 1 || count < 1 || count > arrLen) return array[arrLen - 1];

    const ret = [];
    let start = arrLen - count;

    for (let i = 0; i < count; i += 1, start += 1) {
        ret[i] = array[start];
    }

    return ret;
};

const shift = (array, count = 1) => {
    const arrLen = array.length;

    if (count === 1 || count < 1 || count > arrLen) {
        const [, ...ret] = array;
        return ret;
    }

    const ret = [];
    const loopCount = arrLen - count;

    for (let i = 0; i < loopCount; i += 1, count += 1) {
        ret[i] = array[count];
    }

    return ret;
};

const unshift = (array, ...values) => {
    return values.length !== 0 ? [...values, ...array] : [...array];
};

const arr = [1, 2, 3, 4];
assert.deepStrictEqual(push(arr, 5, 6), [1, 2, 3, 4, 5, 6]);
assert.deepStrictEqual(push(arr), [1, 2, 3, 4]);
assert.deepStrictEqual(push(arr, 5), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(pop(arr), 4); // 1개 팝
assert.deepStrictEqual(pop(arr, 2), [3, 4]); // 2개 팝
assert.deepStrictEqual(pop(arr, arr.length), [1, 2, 3, 4]); // 전체 팝
assert.deepStrictEqual(pop(arr, 0), 4); // 잘못된 인풋, 1개 팝
assert.deepStrictEqual(pop(arr, -1), 4); // 잘못된 인풋, 1개 팝
assert.deepStrictEqual(pop(arr, arr.length + 1), 4); // 잘못된 인풋, 1개 팝
assert.deepStrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr), [1, 2, 3, 4]);
assert.deepStrictEqual(shift(arr), [2, 3, 4]); // 1개 쉬프트
assert.deepStrictEqual(shift(arr, 2), [3, 4]); // 2개 쉬프트
assert.deepStrictEqual(shift(arr, arr.length), []); // 전제 쉬프트
assert.deepStrictEqual(shift(arr, 0), [2, 3, 4]); // 잘못된 인풋, 1개 쉬프트
assert.deepStrictEqual(shift(arr, -1), [2, 3, 4]); // 잘못된 인풋, 1개 쉬프트
assert.deepStrictEqual(shift(arr, arr.length + 1), [2, 3, 4]); // 잘못된 인풋, 1개 쉬프트
assert.deepStrictEqual((arr), [1, 2, 3, 4]); 
