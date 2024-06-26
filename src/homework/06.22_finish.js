import assert from 'node:assert/strict';

const solve_1 = () => {
    const push = (array, ...values) => {
        return values.length !== 0 ? [...array, ...values] : [...array];
    };

    const pop = (array, count = 1) => {
        const arrLen = array.length;

        if (count === 0 ||
            count > arrLen ||
            count <= -arrLen) return;

        count = count < 0 ? count + arrLen : arrLen - count;
        const ret = array.slice(count, arrLen);

        return ret.length === 1 ? ret[0] : ret;
    };

    const shift = (array, count = 1) => {
        const arrLen = array.length;

        if (count === 0 ||
            count > arrLen ||
            count < -arrLen) return;

        const ret = array.slice(Math.abs(count), arrLen);
        return ret;
    };

    const unshift = (array, ...values) => {
        return values.length !== 0 ? [...values, ...array] : [...array];
    };

    const arr = [1, 2, 3, 4];
    assert.deepStrictEqual(push(arr, 5, 6), [1, 2, 3, 4, 5, 6]);
    assert.deepStrictEqual(push(arr, 5), [1, 2, 3, 4, 5]);
    assert.deepStrictEqual(push(arr), [1, 2, 3, 4]); // wrong input
    assert.deepStrictEqual(arr, [1, 2, 3, 4]);
    assert.deepStrictEqual(pop(arr), 4);
    assert.deepStrictEqual(pop(arr, 2), [3, 4]);
    assert.deepStrictEqual(pop(arr, 3), [2, 3, 4]);
    assert.deepStrictEqual(pop(arr, arr.length), [1, 2, 3, 4]);
    assert.deepStrictEqual(pop(arr, -arr.length + 1), [2, 3, 4]);
    assert.deepStrictEqual(pop(arr, -1), 4);
    assert.deepStrictEqual(pop(arr, -arr.length), undefined);
    assert.deepStrictEqual(pop(arr, 0), undefined); // wrong input
    assert.deepStrictEqual(pop(arr, arr.length + 1), undefined); // wrong input
    assert.deepStrictEqual(arr, [1, 2, 3, 4]);
    assert.deepStrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
    assert.deepStrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);
    assert.deepStrictEqual(unshift(arr), [1, 2, 3, 4]); // wrong input
    assert.deepStrictEqual(arr, [1, 2, 3, 4]);
    assert.deepStrictEqual(shift(arr), [2, 3, 4]);
    assert.deepStrictEqual(shift(arr, 2), [3, 4]);
    assert.deepStrictEqual(shift(arr, -1), [2, 3, 4]);
    assert.deepStrictEqual(shift(arr, arr.length), []);
    assert.deepStrictEqual(shift(arr, -arr.length), []);
    assert.deepStrictEqual(shift(arr, 0), undefined); // wrong input
    assert.deepStrictEqual(shift(arr, arr.length + 1), undefined); // wrong input
    assert.deepStrictEqual(arr, [1, 2, 3, 4]);
};

const solve_2 = () => {
    const deleteArray = (array, startOrKey, endOrValue) => {
        if (!Array.isArray(array)) return;
        if (startOrKey === undefined ||
            startOrKey === null) return [...array];

        const startOrKeyType = typeof (startOrKey);

        if (startOrKeyType === 'number') {
            endOrValue = endOrValue || array.length;
            return array.filter((_, i) => i < startOrKey || i > endOrValue - 1);
        }

        if (startOrKeyType === 'string' ||
            startOrKeyType === 'symbol') {
            if (endOrValue === undefined) return [...array];
            return array.filter((e) => e[startOrKey] !== endOrValue);
        }
        return;
    };

    const arr = [1, 2, 3, 4];
    assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
    assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
    assert.deepStrictEqual(deleteArray(arr, 1, arr.length), [1]);
    assert.deepStrictEqual(deleteArray(arr), [1, 2, 3, 4]); // wrong input
    assert.deepStrictEqual(deleteArray(10, 10, 10), undefined); // wrong input
    assert.deepStrictEqual(deleteArray(arr, arr.length, 1), [1, 2, 3, 4]); // wrong input
    assert.deepStrictEqual(deleteArray(arr, undefined, undefined), [1, 2, 3, 4]); // wrong input
    assert.deepStrictEqual(deleteArray(arr, 2, arr.length + 1), [1, 2]); // wrong input
    assert.deepStrictEqual(deleteArray(arr, null), [1, 2, 3, 4]); // wrong input
    assert.deepStrictEqual(arr, [1, 2, 3, 4]);

    const majorKeyHong = Symbol('major');
    const majorKeyKim = Symbol('major');
    const majorKeyLee = Symbol('major');

    const Hong = { id: 1, name: 'Hong', [majorKeyHong]: 'Computer Science' };
    const Kim = { id: 2, name: 'Kim', [majorKeyKim]: 'Mechanical Engineering' };
    const Lee = { id: 3, name: 'Lee', [majorKeyLee]: 'Biotechnology' };

    const users = [Hong, Kim, Lee];

    assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
    assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
    assert.deepStrictEqual(deleteArray(users, 'id', 2), [Hong, Lee]);
    assert.deepStrictEqual(deleteArray(users, majorKeyHong, 'Computer Science'), [Kim, Lee]);
    assert.deepStrictEqual(deleteArray(users, majorKeyLee, 'Biotechnology'), [Hong, Kim]);
    assert.deepStrictEqual(deleteArray(users, 'name', 'Lee'), [Hong, Kim]);
    assert.deepStrictEqual(deleteArray(users, 'id'), [Hong, Kim, Lee]); // wrong input
    assert.deepStrictEqual(deleteArray(users, 'id', 10), [Hong, Kim, Lee]); // wrong input
    assert.deepStrictEqual(deleteArray(users, 'name', 'Han'), [Hong, Kim, Lee]); // wrong input
    assert.deepStrictEqual(deleteArray(users), [Hong, Kim, Lee]);
    assert.deepStrictEqual(deleteArray(users, null), [Hong, Kim, Lee]);
};

const solve_3 = () => {
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
};

const solve_4 = () => {
    // 배열의 각 원소를 String으로 변환하시오.
    const arr = [1, 2, 3, true];
    const arrToString = arr.map((e) => String(e));
    assert.deepStrictEqual(arrToString, ['1', '2', '3', 'true']);

    const classNames = (...args) => {
        const inputLen = args.length;

        if (inputLen === 0) return;

        return args.reduce((acc, cur, i) => {
            if (cur === '') {
                return acc;
            }

            if (i !== (inputLen - 1)) {
                return acc += cur + ' ';
            }

            return acc += cur;
        }, '');
    };

    assert.deepStrictEqual(classNames(), undefined);
    assert.deepStrictEqual(classNames('', 'a b c', 'd', '', 'e'), 'a b c d e');
};

const solve_5 = () => {
    const reduce = (array, fn, acc, thisArg) => {
        let i = 0;
        acc = acc ?? array[i++];

        for (; i < array.length; i += 1) {
            acc = fn(acc, array[i], i, thisArg);
        }
        return acc;
    }

    assert.deepStrictEqual(reduce([1, 2, 3], (acc, cur) => acc + cur), 6);
    assert.deepStrictEqual(reduce([1, 2, 3, 4, 5], (acc, cur) => acc + cur), 15);
    assert.deepStrictEqual(reduce([1, 2, 3, 4, 5], (acc, cur) => acc * cur), 120);
    assert.deepStrictEqual(reduce([2, 2, 2], (acc, cur) => acc * cur), 8);
    assert.deepStrictEqual(reduce([3, 3, 3], (acc, cur) => acc * cur), 27);
    assert.deepStrictEqual(reduce([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (acc, cur) => acc + cur), 55);
    assert.deepStrictEqual(reduce(['han', 'seung', 'beom'], (acc, cur) => acc += cur), 'hanseungbeom');
};

const solve_6 = () => {
    const arr = [1, 2, 3, 4, 5];

    const square = (n) => n ** 2;
    const sqrt = (n) => Math.sqrt(n);
    const cube = (n) => n ** 3;

    // 원래 과제
    const res = arr.reduce((acc, cur) => [...acc, cube(sqrt(square(cur)))], []);
    assert.deepStrictEqual(res, arr.map(a => a ** 2).map(a => a ** 3).map(a => Math.sqrt(a)));

    // Try This
    const pipe = (array, fns) => array.map((e) => fns.reduce((acc, fn) => fn(acc), e));
    assert.deepStrictEqual(pipe(arr, [square, cube, sqrt]), arr.map(a => a ** 2).map(a => a ** 3).map(a => Math.sqrt(a)));
    assert.deepStrictEqual(pipe(arr, [sqrt, square, cube]), arr.map(a => Math.sqrt(a)).map(a => a ** 2).map(a => a ** 3));
    assert.deepStrictEqual(pipe(arr, [cube, sqrt, square]), arr.map(a => a ** 3).map(a => Math.sqrt(a)).map(a => a ** 2));
};

const solve_7 = () => {
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
};

const solve_8 = () => {
    const keyPairMap = (array, pair) => {
        const valueMap = new Map();

        for (let i = 0; i < array.length; i += 1) {
            const curVal = array[i];
            if (curVal >= pair) continue;

            const matchIdx = valueMap.get(pair - curVal);

            if (matchIdx !== undefined) return [matchIdx, i];
            if (!(valueMap.has(curVal))) valueMap.set(curVal, i);
        }
        return;
    };

    assert.deepStrictEqual(keyPairMap([1, 3, 4, 5], 7), [1, 2]);
    assert.deepStrictEqual(keyPairMap([1, 4, 45, 6, 10, 8], 16), [3, 4]);
    assert.deepStrictEqual(keyPairMap([1, 2, 4, 3, 6], 10), [2, 4]);
    assert.deepStrictEqual(keyPairMap([1, 2, 3, 4, 5, 7], 9), [3, 4]);
    assert.deepStrictEqual(keyPairMap([1, 2, 2, 3, 4, 4, 5, 7], 9), [4, 6]);
    assert.deepStrictEqual(keyPairMap([1, 2, 3, 4, 5, 7], 12), [4, 5]);
};

solve_1();
solve_2();
solve_3();
solve_4();
solve_5();
solve_6();
solve_7();
solve_8();