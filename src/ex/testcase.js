import assert from 'assert/strict';
import { keyPair, reduce, Emp, telfmt, searchByKoreanInitialSound, Collection, Stack, Queue, ArrayList, printCalender, neverOverflow } from './test_1.js';

// 키페어
assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 9), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 2, 3, 4, 4, 5, 7], 9), [4, 6]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 12), [4, 5]);

// 리듀스
assert.deepStrictEqual(reduce([1, 2, 3], (acc, cur) => acc + cur), 6);
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

// Collection(stack, queue, arraylist) - 테스트 케이스 작성할 것

// 캘린더 출력
const today = new Date();
printCalender('2024-01-05');
printCalender('2024-02-15');
printCalender('2024-03-24');
printCalender('2024-04-11');
printCalender('2024-05-3');
printCalender('2024-06-1');
printCalender('2024-07-4');
printCalender('2024-08-30');
printCalender('2024-09-29');
printCalender('2024-10-17');
printCalender('2024-11-13');
printCalender('2024-12-9');

// never overflow
assert.deepStrictEqual(neverOverflow(10000), 50005000);
assert.deepStrictEqual(neverOverflow(100000), 5000050000);
assert.deepStrictEqual(neverOverflow(1000000), 500000500000);
assert.deepStrictEqual(neverOverflow(10000000), 50000005000000);
assert.deepStrictEqual(neverOverflow(100000000), 5000000050000000);
assert.deepStrictEqual(neverOverflow(1000000000), 500000000500000000);