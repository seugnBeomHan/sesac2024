import assert from 'assert/strict';
function deleteArray(arr, startOrKey, endOrValue) {
    if (typeof startOrKey === 'number') {
        if (typeof endOrValue === 'number') {
            return arr.filter((_, i) => i < startOrKey || endOrValue - 1 < i);
        }
        return arr.slice(0, startOrKey);
    }
    /**
     * 이 부분이 막힌 부분입니다.
     *
     * 전달 되는 startOrKey가 string이라 객체[startOrKey] 가 불가능합니다.
     * 보통 이런 상황에서 어떻게 타입을 할당 할 수 있을까요?
     *
     * e에 대해서 좀더 상세하게 타입을 줄 수 있는 방법이 있을까요?
     */
    if (typeof startOrKey === 'string') {
        arr.filter();
    }
    return [];
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
