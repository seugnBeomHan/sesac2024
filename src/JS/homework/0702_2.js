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

const eunneun = (word) => isEndJaum(word) ? word + '은' : word + '는';
const iga = (word) => isEndJaum(word) ? word + '이' : word + '가';
const eulleul = (word) => isEndJaum(word) ? word + '을' : word + '를';
const ieoyayeoya = (word) => isEndJaum(word) ? word + '이어야' : word + '여야';
const ilanglang = (word) => isEndJaum(word) ? word + '이랑' : word + '랑';
const idada = (word) => isEndJaum(word) ? word + '이다' : word + '다';

assert.deepStrictEqual(eunneun("밤"), '밤은');
assert.deepStrictEqual(eunneun("컴퓨터"), '컴퓨터는');
assert.deepStrictEqual(eunneun('아지오'), '아지오는');
assert.deepStrictEqual(eunneun('북한강'), '북한강은');
assert.deepStrictEqual(iga("밤"), '밤이');
assert.deepStrictEqual(iga("컴퓨터"), '컴퓨터가');
assert.deepStrictEqual(iga('아지오'), '아지오가');
assert.deepStrictEqual(iga('북한강'), '북한강이');
assert.deepStrictEqual(eulleul("밤"), '밤을');
assert.deepStrictEqual(eulleul("컴퓨터"), '컴퓨터를');
assert.deepStrictEqual(eulleul('아지오'), '아지오를');
assert.deepStrictEqual(eulleul('북한강'), '북한강을');
assert.deepStrictEqual(ieoyayeoya("밤"), '밤이어야');
assert.deepStrictEqual(ieoyayeoya("컴퓨터"), '컴퓨터여야');
assert.deepStrictEqual(ieoyayeoya('아지오'), '아지오여야');
assert.deepStrictEqual(ieoyayeoya('북한강'), '북한강이어야');
assert.deepStrictEqual(ilanglang("밤"), '밤이랑');
assert.deepStrictEqual(ilanglang("컴퓨터"), '컴퓨터랑');
assert.deepStrictEqual(ilanglang('아지오'), '아지오랑');
assert.deepStrictEqual(ilanglang('북한강'), '북한강이랑');
assert.deepStrictEqual(idada("밤"), '밤이다');
assert.deepStrictEqual(idada("컴퓨터"), '컴퓨터다');
assert.deepStrictEqual(idada('아지오'), '아지오다');
assert.deepStrictEqual(idada('북한강'), '북한강이다');