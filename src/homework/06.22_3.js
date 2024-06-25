import assert from 'node:assert/strict';

const hong = { id: 1, name: 'Hong' };
const choi = { id: 5, name: 'Choi' };
const kim = { id: 2, name: 'kim' };
const lee = { id: 3, name: 'Lee' };
const park = { id: 4, name: 'Park' };
const users = [kim, lee, park]; // 오염되면 안됨!!

const inputCheck = (user) => {
    return user === undefined || user === null || typeof (user) !== 'object';
};

Object.getPrototypeOf(users).addUser = function (user) {
    if (inputCheck(user)) return;
    return [...this, user];
};

Object.getPrototypeOf(users).removeUser = function (user) {
    if (inputCheck(user)) return;
    return this.filter((e) => e.id !== user.id && e.name !== user.name);
};

Object.getPrototypeOf(users).changeUser = function (target, newUser) {
    if (inputCheck(target) || inputCheck(newUser)) return;

    return this.map((e) => {
        if (target.id === e.id && target.name === e.name) {
            return newUser;
        }
        return e;
    });
};

assert.deepStrictEqual(users.addUser(), undefined); // wrong input
assert.deepStrictEqual(users.addUser(10), undefined); // wrong input
assert.deepStrictEqual(users.addUser(hong), [kim, lee, park, hong]);
assert.deepStrictEqual(users, [kim, lee, park]);
assert.deepStrictEqual(users.removeUser(lee), [kim, park]);
assert.deepStrictEqual(users, [kim, lee, park]);
assert.deepStrictEqual(users.changeUser(kim, choi), [choi, lee, park]);
assert.deepStrictEqual(users.changeUser(lee, choi), [kim, choi, park]);
assert.deepStrictEqual(users.changeUser(park, choi), [kim, lee, choi]);
assert.deepStrictEqual(users, [kim, lee, park]);