import assert from 'assert/strict';

class Emp {
    firstName;
    lastName;
}

const createProxy = (obj) => {
    const changeUpperCase = (str) => str.toUpperCase();

    return new Proxy(obj, {
        get(target, key, receiver) {
            if (key === 'fullName') return `${target.firstName} ${target.lastName}`;
            return Reflect.get(target, key, receiver);
        },

        set(target, key, val, receiver) {
            if (typeof val !== 'string') return false;

            if (key === 'fullName') {
                const [first, last] = val.split(' ');

                last === undefined ?
                    target.lastName = changeUpperCase(first) :
                    (target.firstName = first, target.lastName = changeUpperCase(last));

                return true;
            }
            return Reflect.set(target, key, val, receiver);
        }
    });
};

const hong = createProxy(new Emp());

hong.fullName = 'Kildong Hong';
assert.deepStrictEqual(hong.fullName, 'Kildong HONG');
assert.deepStrictEqual(hong.firstName, 'Kildong');
assert.deepStrictEqual(hong.lastName, 'HONG');

hong.fullName = 'LEE';
assert.deepStrictEqual(hong.fullName, 'Kildong LEE');
assert.deepStrictEqual(hong.firstName, 'Kildong');
assert.deepStrictEqual(hong.lastName, 'LEE');