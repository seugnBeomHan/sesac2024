import assert from 'assert/strict';
Reflect.defineProperty(Array.prototype, 'firstObject', {
    get() { return this[0]; }
});
Reflect.defineProperty(Array.prototype, 'lastObject', {
    get() { return this.at(-1); }
});
Array.prototype.mapBy = function (key) {
    return this.map((e) => e[key]);
};
Array.prototype.findBy = function (key, value) {
    return this.find((e) => e[key] === value);
};
Array.prototype.filterBy = function (key, value) {
    return this.filter((e) => e[key] === value);
};
Array.prototype.rejectBy = function (key, value) {
    return this.filter((e) => e[key] !== value);
};
Array.prototype.sortBy = function (key, order = 'asc') {
    let [...copy] = this;
    if (order === 'asc') {
        return copy.sort((a, b) => a[key] > b[key] ? 1 : -1);
    }
    return copy.sort((a, b) => a[key] > b[key] ? -1 : 1);
};
Array.prototype.uniqBy = function (key) {
    return [...this.reduce((set, cur) => set.add(cur[key]), new Set())];
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
assert.deepStrictEqual(users.sortBy('name', 'desc'), [lee, kim, hong]);
assert.deepStrictEqual(users, [hong, lee, kim]);
// uniqBy
const hongUniq = { id: 1, name: 'Hong', dept: 'HR' };
const hongUniq2 = { id: 1, name: 'Hong', dept: 'HR' };
const kimUniq = { id: 2, name: 'Kim', dept: 'Server' };
const leeUniq = { id: 3, name: 'Lee', dept: 'Front' };
const leeUniq2 = { id: 3, name: 'Lee', dept: 'Front' };
const parkUniq = { id: 4, name: 'Park', dept: 'HR' };
const koUniq = { id: 7, name: 'Ko', dept: 'Server' };
const koUniq2 = { id: 7, name: 'Ko', dept: 'Server' };
const loonUniq = { id: 6, name: 'Loon', dept: 'Sales' };
const loonUniq2 = { id: 6, name: 'Loon', dept: 'Sales' };
const choiUniq = { id: 5, name: 'Choi', dept: 'Front' };
const usersUniq = [hongUniq, hongUniq2, kimUniq, leeUniq, leeUniq2, parkUniq, koUniq, koUniq2, loonUniq, loonUniq2, choiUniq];
assert.deepStrictEqual(usersUniq.uniqBy('dept'), ['HR', 'Server', 'Front', 'Sales']);
assert.deepStrictEqual(usersUniq.uniqBy('name'), ['Hong', 'Kim', 'Lee', 'Park', 'Ko', 'Loon', 'Choi']);
function groupBy(array, callbackFn) {
    const newData = {};
    return array.reduce((newDataObj, cur) => {
        const newKey = callbackFn(cur);
        newDataObj[newKey] ? newDataObj[newKey].push(cur) : newDataObj[newKey] = [cur];
        return newDataObj;
    }, newData);
}
const inventory = [
    { name: "asparagus", type: "vegetables", quantity: 5 },
    { name: "bananas", type: "fruit", quantity: 2 },
    { name: "goat", type: "meat", quantity: 23 },
    { name: "cherries", type: "fruit", quantity: 4 },
    { name: "fish", type: "meat", quantity: 22 },
];
console.log(groupBy(inventory, ({ type }) => type));
console.log(groupBy(inventory, ({ quantity }) => quantity > 5 ? "ok" : "restock"));
/*Result is:
{
  vegetables: [
    { name: 'asparagus', type: 'vegetables', quantity: 5 },
  ],
  fruit: [
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "cherries", type: "fruit", quantity: 5 }
  ],
  meat: [
    { name: "goat", type: "meat", quantity: 23 },
    { name: "fish", type: "meat", quantity: 22 }
  ]
}
*/
/* Result is:
{
  restock: [
    { name: "asparagus", type: "vegetables", quantity: 5 },
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "cherries", type: "fruit", quantity: 5 }
  ],
  ok: [
    { name: "goat", type: "meat", quantity: 23 },
    { name: "fish", type: "meat", quantity: 22 }
  ]
}
*/ 
