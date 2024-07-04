/**
 * 범위 (3시간)
 * 5. Debounce, Throttle
 * 9. 리듀스
 * 1. 프록시 객체 구현
 * 7. 전화번호 정규식
 * 6. 초성 검색
 * 9. 키페어 - 1시간
 * 2. collection (stack, queue, array list) - 1시간30분
 * 4. calender
 * 8. 네버 오버 플로우
 * 3. Array prototype 메서드 두개
 */

const telfmt = (tel) => {
    const localNum = tel[1];

    const regA = localNum === '2' ? '{2}' : tel.length % 4 === 0 ? '{4}' : '{3}'
    const regB = tel.length
    const regC = '{4}';
};

assert.deepStrictEqual(telfmt('021234567'), '02-123-4567');       // 5 - 2 3(9)
assert.deepStrictEqual(telfmt('0101234567'), '010-123-4567');     // 6 - 3 3(10)
assert.deepStrictEqual(telfmt('0331234567'), '033-123-4567');     // 6 - 3 3(10)
assert.deepStrictEqual(telfmt('0212345678'), '02-1234-5678');     // 6 - 2 4(10)
assert.deepStrictEqual(telfmt('01012345678'), '010-1234-5678');   // 7 - 3 4(11)
assert.deepStrictEqual(telfmt('07012341234'), '070-1234-1234');   // 7 - 3 4(11)
assert.deepStrictEqual(telfmt('050712345678'), '0507-1234-5678'); // 8 - 4 4(12)
assert.deepStrictEqual(telfmt('15771577'), '1577-1577');          //         (8)