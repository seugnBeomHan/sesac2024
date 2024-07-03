
import assert from 'assert/strict';

// 1
const upperToLower = (str) => str.replace(/[A-Z]/g, `*$&*-`).toLowerCase();
console.log(upperToLower('Senior Coding Learning JS'));

// 2
console.log('Senior Coding Learning JS'.replace(/[A-Z]/g, '#')); // '#enior #oding #earning ##'
console.log('Senior Coding Learning JS'.replace(/([A-Z]+)([a-z\s]*)/g, '$1-')); // 'S-C-L-JS-'
console.log('Senior Coding Learning JS'.replace(/([A-Z]+)([a-z\s]*)/g, '$1-$2')); // 'S-enior C-oding..
console.log('Senior Coding Learning JS'.replace(/[A-Z]/g, '`$&`'));    // '`S`enior `C`oding `L`earning `J``S`'
console.log('1234-2323-2323-2323'.replace(/(\d{4})-(\d{4})-(.*)$/, '$1-####-$3'));


const telfmt = (telNum) => {

};

assert.deepStrictEqual(telfmt('15771577'), '1577-1577');          //         (8)
assert.deepStrictEqual(telfmt('050712345678'), '0507-1234-5678'); // 8 - 4 4(12)
assert.deepStrictEqual(telfmt('01012345678'), '010-1234-5678');   // 7 - 3 4(11)
assert.deepStrictEqual(telfmt('07012341234'), '070-1234-1234');   // 7 - 3 4(11)
assert.deepStrictEqual(telfmt('0101234567'), '010-123-4567');     // 6 - 3 3(10)
assert.deepStrictEqual(telfmt('0331234567'), '033-123-4567');     // 6 - 3 3(10)
assert.deepStrictEqual(telfmt('0212345678'), '02-1234-5678');     // 6 - 2 4(10)
assert.deepStrictEqual(telfmt('021234567'), '02-123-4567');       // 5 - 2 3(9)
