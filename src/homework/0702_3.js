import assert from 'assert/strict';

const searchByKoreanInitialSound = (datas, initialConsonant) => {

};

const datas = ['강원도 고성군', '고성군 토성면', '토성면 북면', '북면', '김1수'];
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱㅇ'), ['강원도 고성군']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱㅅㄱ'), ['강원도 고성군', '고성군 토성면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅌㅅㅁ'), ['고성군 토성면', '토성면 북면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅂㅁ'), ['토성면 북면', '북면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅍㅁ'), []);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱ1ㅅ'), ['김1수']);
