import assert from 'assert/strict';
function deleteArray(array, startOrKey, endOrValue) {
    if (typeof startOrKey === 'number') {
        return array.filter((_, i) => i < startOrKey ||
            i > (typeof endOrValue === 'number' ? endOrValue - 1 : array.length));
    }
    return array.filter((v) => v && typeof v === 'object' && v[startOrKey] !== endOrValue);
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
const hongSymbol = Symbol('hong');
const kimSymbol = Symbol('kim');
const leeSymbol = Symbol('lee');
const symbolHong = { id: 1, name: 'Hong', [hongSymbol]: hongSymbol };
const symbolKim = { id: 2, name: 'Kim', [kimSymbol]: kimSymbol };
const symbolLee = { id: 3, name: 'Lee', [leeSymbol]: leeSymbol };
const symbolUsers = [symbolHong, symbolKim, symbolLee];
assert.deepStrictEqual(deleteArray(symbolUsers, 2), [symbolHong, symbolKim]);
assert.deepStrictEqual(deleteArray(symbolUsers, 1, 2), [symbolHong, symbolLee]);
// assert.deepStrictEqual(deleteArray(symbolUsers, kimSymbol, kimSymbol), [symbolHong, symbolLee]);
// assert.deepStrictEqual(deleteArray(symbolUsers, leeSymbol, leeSymbol), [symbolHong, symbolKim]);
