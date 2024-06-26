// 짧게 줄여보는 것도 좋다. 어떤 코드가 좋을지에 대한 고민

import assert from 'node:assert/strict';

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