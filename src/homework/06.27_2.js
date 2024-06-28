import assert from 'assert/strict';

Reflect.defineProperty(Array.prototype, 'firstObject',
    {
        get() { return this[0] },

    });

Reflect.defineProperty(Array.prototype, 'lastObject',
    {
        get() { return this[this.length - 1] },

    });

Array.prototype.mapBy = function () {

};

Array.prototype.findBy = function () {

};

Array.prototype.filterBy = function () {

};

Array.prototype.rejectBy = function () {

};

Array.prototype.sortBy = function () {

};

const arr = [1, 2, 3, 4, 5];

assert.deepStrictEqual(arr.firstObject, 1);
assert.deepStrictEqual(arr.lastObject, 5);

const hong = { id: 1, name: 'Hong' };
const kim = { id: 2, name: 'Kim' };
const lee = { id: 3, name: 'Lee' };
const users = [hong, lee, kim];

assert.deepStrictEqual(users.firstObject, hong);
assert.deepStrictEqual(users.lastObject, kim);

assert.deepStrictEqual(users.mapBy('id'), [1, 3, 2]);
assert.deepStrictEqual(users.mapBy('name'), ['Hong', 'Lee', 'Kim']);
assert.deepStrictEqual(users.filterBy('id', 2), [kim]);
assert.deepStrictEqual(users.rejectBy('id', 2), [hong, lee]);
assert.deepStrictEqual(users.findBy('name', 'Kim'), kim);
assert.deepStrictEqual(users.sortBy('name'), [hong, kim, lee]);
assert.deepStrictEqual(users.sortBy('name:desc'), [lee, kim, hong]);