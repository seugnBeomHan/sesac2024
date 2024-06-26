// Object.getPrototypeOf(users)의 경우 Array의 Prototype을 변경한다.
// Prototype은 하나이다. 해서 동일한 타입이 모두 공유하게 된다.
// 이 부분 수정해 볼 것, Prototype을 건들지 않고 깔끔하게 넣을 수 있도록 

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

users.addUser = function (user) {
    if (inputCheck(user)) return;
    return [...this, user];
};

users.removeUser = function (user) {
    if (inputCheck(user)) return;
    return this.filter((e) => e.id !== user.id && e.name !== user.name);
};

users.changeUser = function (target, newUser) {
    if (inputCheck(target) || inputCheck(newUser)) return;

    return this.map((e) => {
        if (target.id === e.id && target.name === e.name) {
            return newUser;
        }
        return e;
    });
};

Object.defineProperties(users,
    {
        'addUser': {
            enumerable: false,
            configurable: false,
            writable: false,
        },
        'removeUser': {
            enumerable: false,
            configurable: false,
            writable: false,
        },
        'changeUser': {
            enumerable: false,
            configurable: false,
            writable: false,
        }
    });

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