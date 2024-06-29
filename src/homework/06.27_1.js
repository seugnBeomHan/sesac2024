import assert from 'assert/strict';

class Emp {
    firstName;
    lastName;

    constructor() {
        const ret = new Proxy(this, {
            get(target, prop, receiver) {
                if (target.isFullName(prop)) return `${target.firstName} ${target.lastName}`;
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, val, receiver) {
                if (typeof val !== 'string') return false;
                if (target.isFullName(prop)) {
                    const [first, last] = val.split(' ');

                    last === undefined ?
                        target.lastName = target.changeUpperCase(first) :
                        (target.firstName = first, target.lastName = target.changeUpperCase(last));

                    return true;
                }
                return Reflect.set(target, prop, val, receiver);
            }
        });
        return ret;
    }

    changeUpperCase(str) { return str.toUpperCase(); }
    isFullName(prop) { return prop === 'fullName'; }
}

// const makeProxyObject = (obj) => {
//     const changeUpperCase = (str) => str.toUpperCase();
//     const isFullName = (prop) => prop === 'fullName';

//     return new Proxy(obj, {
//         get(target, prop, receiver) {
//             if (isFullName(prop)) return `${target.firstName} ${target.lastName}`;
//             return Reflect.get(target, prop, receiver);
//         },

//         set(target, prop, val, receiver) {
//             if (typeof val !== 'string') return false;

//             if (isFullName(prop)) {
//                 const [first, last] = val.split(' ');

//                 last === undefined ?
//                     target.lastName = changeUpperCase(first) :
//                     (target.firstName = first, target.lastName = changeUpperCase(last));

//                 return true;
//             }
//             return Reflect.set(target, prop, val, receiver);
//         }
//     });
// };

// const hong = makeProxyObject(new Emp());

const hong = new Emp();

hong.fullName = 'Kildong Hong';
assert.deepStrictEqual(hong.fullName, 'Kildong HONG');
assert.deepStrictEqual(hong.firstName, 'Kildong');
assert.deepStrictEqual(hong.lastName, 'HONG');

hong.fullName = 'LEE';
assert.deepStrictEqual(hong.fullName, 'Kildong LEE');
assert.deepStrictEqual(hong.firstName, 'Kildong');
assert.deepStrictEqual(hong.lastName, 'LEE');