import assert from 'assert/strict';

class Emp {
    firstName;
    lastName;

    constructor() {
        return new Proxy(this, {
            get(target, prop, receiver) {
                if (target.#isFullName(prop)) return `${target.firstName} ${target.lastName}`;
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, val, receiver) {
                if (typeof val !== 'string') return false;
                if (target.#isFullName(prop)) {
                    const [first, last] = val.split(' ');

                    last === undefined ?
                        target.lastName = target.#changeUpperCase(first) :
                        (target.firstName = first, target.lastName = target.#changeUpperCase(last));

                    return true;
                }
                return Reflect.set(target, prop, val, receiver);
            }
        });
    }

    #changeUpperCase(str) {
        return str.toUpperCase();
    }

    #isFullName(prop) {
        return prop === 'fullName';
    }
}

const hongConstructor = new Emp();
hongConstructor.fullName = 'Kildong Hong';
assert.deepStrictEqual(hongConstructor.fullName, 'Kildong HONG');
assert.deepStrictEqual(hongConstructor.firstName, 'Kildong');
assert.deepStrictEqual(hongConstructor.lastName, 'HONG');

hongConstructor.fullName = 'LEE';
assert.deepStrictEqual(hongConstructor.fullName, 'Kildong LEE');
assert.deepStrictEqual(hongConstructor.firstName, 'Kildong');
assert.deepStrictEqual(hongConstructor.lastName, 'LEE');