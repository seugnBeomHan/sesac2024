import assert from 'assert/strict';

export class ProxyEmp {
    firstName;
    lastName;
    fullName;

    constructor() {
        return new Proxy(this, {
            get(target, prop) {
                if (prop === 'fullName') {
                    return `${target.firstName} ${target.lastName}`;
                }
                return target[prop];
            },

            set(target, prop, value) {
                if (prop === 'fullName') {
                    const [f, l] = value.split(' ');
                    if (f && l) {
                        target.firstName = f;
                        target.lastName = l.toUpperCase();
                        target.fullName = `${f} ${l}`;
                    } else {
                        target.lastName = f.toUpperCase();
                    }
                }
                return target[prop];
            },
        });
    }
}

const proxyHong = new ProxyEmp();
proxyHong.fullName = 'Kildong Hong';
assert.deepStrictEqual(proxyHong.fullName, 'Kildong HONG');
assert.deepStrictEqual(proxyHong.firstName, 'Kildong');
assert.deepStrictEqual(proxyHong.lastName, 'HONG');

proxyHong.fullName = 'LEE';
assert.deepStrictEqual(proxyHong.fullName, 'Kildong LEE');
assert.deepStrictEqual(proxyHong.firstName, 'Kildong');
assert.deepStrictEqual(proxyHong.lastName, 'LEE');

const WEEKS = '일월화수목금토';

export function cal(ym) {
    let ret = '';

    const [y, m] = ym.split('-');
    const firstDay = new Date(y, m - 1, 2).getDay();
    const lastDay = new Date(y, m, 0).getDate();

    ret += ' '.repeat(firstDay * 3);

    for (let i = 1; i <= lastDay; i += 1) {
        ret += i.toString().padStart(3, ' ');
    }

    console.log(`${m}월 ${y}`.padStart(21 / 2 + 4, ' '));
    console.log([...WEEKS].map((w) => w.padStart(2, ' ')).join(''));

    let sliceIdx = 0;
    for (let i = 0; i < 5; i += 1) {
        console.log(ret.slice(sliceIdx, sliceIdx + 21));
        sliceIdx += 21;
    }
}

console.log('\n\n======================\n');
cal('2024-2');
console.log('-'.repeat(21), '\n');
cal('2024-7');
console.log('-'.repeat(21), '\n');
cal('2024-9');
console.log('\n\n======================\n');

export const keyPair = (arr, n) => {
    const table = {};
    let val;

    for (let i = 0; i < arr.length; i += 1) {
        val = n / arr[i];
        if (table.hasOwnProperty(val)) return [table[val], i];
        if (!table.hasOwnProperty(arr[i])) table[arr[i]] = i;
    }
};

assert.deepStrictEqual(keyPair([1, 3, 3, 4, 5], 12), [1, 3]);
assert.deepStrictEqual(keyPair([1, 3, 4, 5], 15), [1, 3]);
assert.deepStrictEqual(keyPair([5, 4, 3, 1], 15), [0, 2]);
assert.deepStrictEqual(keyPair([1, 3, 4, 5], 4), [0, 2]);
assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 450), [2, 4]);
assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 6), [1, 3]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 14), [1, 5]);

export const reduce = (array, fn, initValue) => {
    let acc;
    if (initValue !== undefined) {
        acc = initValue;
        array.forEach((_, i) => {
            acc = fn(acc, array[i]);
        });
    } else {
        acc = array[0];
        for (let i = 1; i < array.length; i += 1) {
            acc = fn(acc, array[i]);
        }
    }
    return acc;
};

const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
let users1 = [Hong, Kim, Lee];

const hong = { id: 1, name: 'Hong', dept: 'HR' };
const kim = { id: 2, name: 'Kim', dept: 'Server' };
const lee = { id: 3, name: 'Lee', dept: 'Front' };
const park = { id: 4, name: 'Park', dept: 'HR' };
const ko = { id: 7, name: 'Ko', dept: 'Server' };
const loon = { id: 6, name: 'Loon', dept: 'Sales' };
const choi = { id: 5, name: 'Choi', dept: 'Front' };
const users = [hong, kim, lee, park, ko, loon, choi];

const a10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
assert.deepStrictEqual(
    reduce(a10, (acc, cur) => acc + cur, 0),
    a10.reduce((acc, cur) => acc + cur, 0)
);

assert.deepStrictEqual(
    reduce(users1, (acc, user) => acc + user.name),
    users1.reduce((acc, user) => acc + user.name)
);

assert.deepStrictEqual(
    reduce([1, 2, 3, 4, 5], (acc, cur) => acc * cur),
    120
);

export function telfmt(tel) {
    const len = tel.length;

    if (6 < len && len <= 8) return tel.replace(/(\d{4})(\d{4})/, '$1-$2');
    else if (len <= 6) return tel.replace(/(\d{2})(\d{4})/, '$1-$2');

    const A = tel.startsWith('02') ? 2 : len >= 12 ? len - 8 : 3;
    const B = len - (A + 4);

    const r = `(\\d{${A}})(\\d{${B}})(\\d{4})`;
    const regExp = new RegExp(r);

    return tel.replace(regExp, '$1-$2-$3');
}

const ㄱㄴㄷ = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const 가나다 = '가까나다따라마바빠사싸아자짜차카타파하';

const 힣 = '힣'.charCodeAt(0);

export function searchByKoreanInitialSound(data, first = '') {
    const r = [...first].reduce((acc, cur) => {
        let idx = ㄱㄴㄷ.indexOf(cur) ? ㄱㄴㄷ.indexOf(cur) : cur;
        const S = 가나다[idx].charCodeAt(0);
        const E = idx === 가나다.length ? 힣 : 가나다[idx + 1].charCodeAt(0) - 1;

        return `${acc}[${String.fromCharCode(S)}-${String.fromCharCode(E)}]`;
    }, '');
    const regExp = new RegExp(r);

    return data.filter((e) => regExp.test(e));
}

assert.deepStrictEqual(telfmt('0101234567'), '010-123-4567');
assert.deepStrictEqual(telfmt('01012345678'), '010-1234-5678');
assert.deepStrictEqual(telfmt('0212345678'), '02-1234-5678');
assert.deepStrictEqual(telfmt('021234567'), '02-123-4567');
assert.deepStrictEqual(telfmt('0331234567'), '033-123-4567');
assert.deepStrictEqual(telfmt('15771577'), '1577-1577');
assert.deepStrictEqual(telfmt('07012341234'), '070-1234-1234');
assert.deepStrictEqual(telfmt('050712345678'), '0507-1234-5678');
assert.deepStrictEqual(telfmt('345678'), '34-5678');