import assert from 'assert/strict';

Reflect.defineProperty(Array.prototype, 'firstObject',
    {
        get() { return this[0] },
    });

Reflect.defineProperty(Array.prototype, 'lastObject',
    {
        get() { return this[this.length - 1] },
    });

const isObjectKeyType = (key) => typeof key === 'string' || typeof key === 'symbol';

Array.prototype.mapBy = function (key) {
    if (!isObjectKeyType(key)) return;
    return this.map((e) => e[key]);
};

Array.prototype.findBy = function (key, value) {
    if (!isObjectKeyType(key)) return;
    return this.find((e) => e[key] === value);
};

Array.prototype.filterBy = function (key, value) {
    if (!isObjectKeyType(key)) return;
    return this.filter((e) => e[key] === value);
};

Array.prototype.rejectBy = function (key, value) {
    if (!isObjectKeyType(key)) return;
    return this.filter((e) => e[key] !== value);
};

Array.prototype.sortBy = function (keyAndOrder) {
    if (typeof keyAndOrder !== 'string') return;

    const result = [...this];
    const [key, order = 'asc'] = keyAndOrder.split(':');

    return order === 'asc' ?
        result.sort((e1, e2) => e1[key] > e2[key] ? 1 : -1) :
        result.sort((e1, e2) => e1[key] > e2[key] ? -1 : 1);
};

const arr = [1, 2, 3, 4, 5];

assert.deepStrictEqual(arr.firstObject, 1);
assert.deepStrictEqual(arr.lastObject, 5);

const hong = { id: 1, name: 'Hong', age: 27 };
const kim = { id: 2, name: 'Kim', age: 27 };
const lee = { id: 3, name: 'Lee', age: 30 };
const users = [hong, lee, kim];

assert.deepStrictEqual(users.firstObject, hong);
assert.deepStrictEqual(users.lastObject, kim);
assert.deepStrictEqual(users.mapBy('id'), [1, 3, 2]);
assert.deepStrictEqual(users.mapBy('name'), ['Hong', 'Lee', 'Kim']);
assert.deepStrictEqual(users, [hong, lee, kim]);
assert.deepStrictEqual(users.findBy('name', 'Kim'), kim);
assert.deepStrictEqual(users.findBy('name', 'Han'), undefined);
assert.deepStrictEqual(users.findBy('age', 30), lee);
assert.deepStrictEqual(users, [hong, lee, kim]);
assert.deepStrictEqual(users.filterBy('id', 2), [kim]);
assert.deepStrictEqual(users.filterBy('name', 'Hong'), [hong]);
assert.deepStrictEqual(users.filterBy('age', 27), [hong, kim]);
assert.deepStrictEqual(users, [hong, lee, kim]);
assert.deepStrictEqual(users.rejectBy('id', 2), [hong, lee]);
assert.deepStrictEqual(users.rejectBy('name', 'Hong'), [lee, kim]);
assert.deepStrictEqual(users, [hong, lee, kim]);
assert.deepStrictEqual(users.sortBy('name'), [hong, kim, lee]);
assert.deepStrictEqual(users.sortBy('name:desc'), [lee, kim, hong]);
assert.deepStrictEqual(users, [hong, lee, kim]);