import assert from 'assert/strict';
import { keyPair, reduce, Emp, telfmt, searchByKoreanInitialSound, printCalender } from './test_1.js';

// 키페어
assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 9), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 2, 3, 4, 4, 5, 7], 9), [4, 6]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 12), [4, 5]);

// 리듀스
assert.deepStrictEqual(reduce([1, 2, 3], (acc, cur) => acc + cur, 0), 6);
assert.deepStrictEqual(reduce([1, 2, 3, 4, 5], (acc, cur) => acc + cur), 15);
assert.deepStrictEqual(reduce([1, 2, 3, 4, 5], (acc, cur) => acc * cur), 120);
assert.deepStrictEqual(reduce([2, 2, 2], (acc, cur) => acc * cur), 8);
assert.deepStrictEqual(reduce([3, 3, 3], (acc, cur) => acc * cur), 27);
assert.deepStrictEqual(reduce([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (acc, cur) => acc + cur), 55);
assert.deepStrictEqual(reduce(['han', 'seung', 'beom'], (acc, cur) => acc += cur), 'hanseungbeom');

// 프록시
const hongConstructor = new Emp();
hongConstructor.fullName = 'Kildong Hong';
assert.deepStrictEqual(hongConstructor.fullName, 'Kildong HONG');
assert.deepStrictEqual(hongConstructor.firstName, 'Kildong');
assert.deepStrictEqual(hongConstructor.lastName, 'HONG');

hongConstructor.fullName = 'LEE';
assert.deepStrictEqual(hongConstructor.fullName, 'Kildong LEE');
assert.deepStrictEqual(hongConstructor.firstName, 'Kildong');
assert.deepStrictEqual(hongConstructor.lastName, 'LEE');

// 전화번호 정규식
assert.deepStrictEqual(telfmt('021234567'), '02-123-4567');       // 5 - 2 3(9)
assert.deepStrictEqual(telfmt('0101234567'), '010-123-4567');     // 6 - 3 3(10)
assert.deepStrictEqual(telfmt('0331234567'), '033-123-4567');     // 6 - 3 3(10)
assert.deepStrictEqual(telfmt('0212345678'), '02-1234-5678');     // 6 - 2 4(10)
assert.deepStrictEqual(telfmt('01012345678'), '010-1234-5678');   // 7 - 3 4(11)
assert.deepStrictEqual(telfmt('07012341234'), '070-1234-1234');   // 7 - 3 4(11)
assert.deepStrictEqual(telfmt('050712345678'), '0507-1234-5678'); // 8 - 4 4(12)
assert.deepStrictEqual(telfmt('15771577'), '1577-1577');          //         (8)

// 초성 검색
const datas = ['강원도 고성군', '고성군 토성면', '토성면 북면', '북면', '김1수'
    , '네이버', '다음', '아스키코드표', '아스키 코드표', '유니코드', '한글 초성', 'ASCII 코드표'];
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄴㅇ'), ['네이버']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄷㅇ'), ['다음']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱ ㅊ'), ['한글 초성']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅇㄴ'), ['유니코드']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅇㅅㅋ'), ['아스키코드표', '아스키 코드표']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅇㅅㅋ '), ['아스키 코드표']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ASC'), ['ASCII 코드표']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄷ ㄱ'), ['강원도 고성군']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱ ㅌ'), ['고성군 토성면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱㅅㄱ'), ['강원도 고성군', '고성군 토성면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅌㅅㅁ'), ['고성군 토성면', '토성면 북면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅂㅁ'), ['토성면 북면', '북면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅍㅁ'), []);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱㄴ'), []);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅅㅁ'), ['고성군 토성면', '토성면 북면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱ1ㅅ'), ['김1수']);

// Collection(stack, queue, arraylist)

// 캘린더 출력
const today = new Date();
printCalender(`${today.getMonth() - 5}-${14}`);
printCalender(`${today.getMonth() - 4}-${22}`);
printCalender(`${today.getMonth() - 3}-${30}`);
printCalender(`${today.getMonth() - 2}/${5}`);
printCalender(`${today.getMonth() - 1}/${1}`);
printCalender(`${today.getMonth()}/${15}`);
printCalender(`${today.getMonth() + 1}.${today.getDay()}`);
printCalender(`${today.getMonth() + 2}.${25}`);
printCalender(`${today.getMonth() + 3}.${18}`);
printCalender(`${today.getMonth() + 4}-${6}`);
printCalender(`${today.getMonth() + 5}-${3}`);
printCalender(`${today.getMonth() + 6}-${15}`);

// never overflow