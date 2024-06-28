import assert from 'assert/strict';

class Emp {
    firstName;
    lastName;
}

const hong = new Proxy(new Emp(), {
    get(target, key, receiver) {
        if (key === 'fullName') return `${target.firstName} ${target.lastName}`;
        return Reflect.get(target, key, receiver);
    },

    set(target, key, val, receiver) {
        if (typeof val !== 'string') return false;

        if (key === 'fullName') {
            const [first, last] = val.split(' ');

            last === undefined ?
                target.lastName = first.toUpperCase() :
                (target.firstName = first, target.lastName = last.toUpperCase());

            return true;
        }
        return Reflect.set(target, key, val, receiver);
    }
});

hong.fullName = 'Kildong Hong';
assert.deepStrictEqual(hong.fullName, 'Kildong HONG');
assert.deepStrictEqual(hong.firstName, 'Kildong');
assert.deepStrictEqual(hong.lastName, 'HONG');

hong.fullName = 'LEE';
assert.deepStrictEqual(hong.fullName, 'Kildong LEE');
assert.deepStrictEqual(hong.firstName, 'Kildong');
assert.deepStrictEqual(hong.lastName, 'LEE');