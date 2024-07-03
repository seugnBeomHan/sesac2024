import assert from 'assert/strict';

const isEndJaum = (word) => {
    const CONSONANTS_ASCII = [76, 77, 78, 82, 108, 109, 110, 114, 48, 49, 51, 54, 55, 56];

    const getEndWord = () => word.charCodeAt(word.length - 1);
    const charCode = (char) => char.charCodeAt(0);
    const isGather = () => endWord >= charCode('ㅏ') && endWord <= charCode('ㅣ');
    const isConsonant = () => (endWord >= charCode('ㄱ') && endWord <= charCode('ㅎ')) || endWord % 28 !== 16;

    const endWord = getEndWord();

    return endWord < charCode('ㄱ') ?
        CONSONANTS_ASCII.includes(endWord) :
        !isGather() && isConsonant();
}
assert.deepStrictEqual(isEndJaum('한승범'), true);
assert.deepStrictEqual(isEndJaum('서울'), true);
assert.deepStrictEqual(isEndJaum("밤"), true);
assert.deepStrictEqual(isEndJaum("컴퓨터"), false);
assert.deepStrictEqual(isEndJaum('아지오'), false);
assert.deepStrictEqual(isEndJaum('북한강'), true);
assert.deepStrictEqual(isEndJaum('뷁'), true);
assert.deepStrictEqual(isEndJaum('강원도'), false);
assert.deepStrictEqual(isEndJaum('바라당'), true);
assert.deepStrictEqual(isEndJaum('케잌'), true);
assert.deepStrictEqual(isEndJaum('ㅜㅜ'), false);
assert.deepStrictEqual(isEndJaum('점수 A'), false);
assert.deepStrictEqual(isEndJaum('알파벳L'), true);
assert.deepStrictEqual(isEndJaum('24'), false);
assert.deepStrictEqual(isEndJaum('23'), true);
