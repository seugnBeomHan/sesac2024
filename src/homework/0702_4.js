
import assert from 'assert/strict';

// 1
const upperToLower = (str) => str.replace(/[A-Z]/g, `*$&*-`).toLowerCase();
console.log(upperToLower('Senior Coding Learning JS'));

// 2
const telfmt = (tel) => {
    const getTelNumber = (start, end) => `${tel.slice(start, end)}-${tel.slice(end)}`;

    const TEL_LENGTH = tel.length;
    const LOCAL_NUMBER = tel[1];

    tel = getTelNumber(0, TEL_LENGTH - 4);
    if (TEL_LENGTH % 4 === 0) return tel[4] !== '-' ? getTelNumber(0, 4) : tel;
    return LOCAL_NUMBER === '2' ? getTelNumber(0, 2) : getTelNumber(0, 3);
};

assert.deepStrictEqual(telfmt('021234567'), '02-123-4567');       // 5 - 2 3(9)
assert.deepStrictEqual(telfmt('0101234567'), '010-123-4567');     // 6 - 3 3(10)
assert.deepStrictEqual(telfmt('0331234567'), '033-123-4567');     // 6 - 3 3(10)
assert.deepStrictEqual(telfmt('0212345678'), '02-1234-5678');     // 6 - 2 4(10)
assert.deepStrictEqual(telfmt('01012345678'), '010-1234-5678');   // 7 - 3 4(11)
assert.deepStrictEqual(telfmt('07012341234'), '070-1234-1234');   // 7 - 3 4(11)
assert.deepStrictEqual(telfmt('050712345678'), '0507-1234-5678'); // 8 - 4 4(12)
assert.deepStrictEqual(telfmt('15771577'), '1577-1577');          //         (8)