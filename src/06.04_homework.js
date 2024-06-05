/**
 * 1. for 문을 이용하여 다음과 같이 정확한 숫자를 출력하는 코드를 작성하시오.
 * 
 * [결과]
 * 0.1
 * 0.2
 * 0.3
 * 0.4
 * 0.5
 * 0.6
 * 0.7
 * 0.8
 * 0.9
 * 1
 */
const problem_1 = () => {
    console.log(`[1번 문제]\n`);

    const end = 1;
    for (let i = 0.1; i < end; i += 0.1) {
        console.log(i > 0.9 ? i.toFixed(0) : i.toFixed(1));
    }

    // 매번 비교를 하지 않는 방법
    console.log(`\n[1번 문제, 매번 비교하지 않는 방법]`);

    let i = 0.1;
    const endVer2 = 0.9;
    for (; i < endVer2; i += 0.1) {
        console.log(i.toFixed(1));
    }
    console.log(i.toFixed(0));
}

/**
 * 2. 1 ~ 10 사이의 정수에 대해 제곱근을 소숫점 3자리까지 출력하시오.
 */
const problem_2 = () => {
    console.log(`\n[2번 문제]`);

    const end = 10;
    for (let i = 0; i <= end; i += 1) {
        console.log(Math.sqrt(i) % 1 !== 0 ? `${i}의 제곱근 : ` + Math.sqrt(i).toFixed(3) : `${i}의 제곱근 : ` + Math.sqrt(i));
    }

    // 문자열 및 제곱근 중복 제거 버전
    console.log(`\n[2번 문제 중복 제거 버전]`);
    for (let i = 0; i <= end; i += 1) {
        const nowSqrt = Math.sqrt(i);
        const str = `${i}의 제곱근 : `;

        console.log(nowSqrt % 1 !== 0 ? str + nowSqrt.toFixed(3) : str + nowSqrt);
    }
}

/**
 * 3. 오늘 날짜의 요일을 출력하시오.
 *  3-1. switch 문을 사용해 작성
 *  3-2. 더 간단한 방법 고민 
 */
const problem_3 = () => {
    console.log(`\n[3번 문제]`);

    const date = new Date();
    const today = date.getDay();
    let todayStr = '';

    switch (today) {
        case 0:
            todayStr = '일';
            break;
        case 1:
            todayStr = '월';
            break;
        case 2:
            todayStr = '화';
            break;
        case 3:
            todayStr = '수';
            break;
        case 4:
            todayStr = '목';
            break;
        case 5:
            todayStr = '금';
            break;
        case 6:
            todayStr = '토';
            break;
        default:
            console.log(`잘못된 입력입니다.`);
            return;
    }
    console.log(`오늘은 ${todayStr}요일 입니다.`);

    // 다른 버전 1
    console.log(`\n[3번 문제 다른 버전]`);
    const dayArr = [`일`, `월`, `화`, `수`, `목`, `금`, `토`];
    console.log(`오늘은 ${dayArr[today]}요일 입니다.`);

    // 다른 버전 2
    console.log(`\n[3번 문제 다른 버전 2]`);
    const dayStr = `일월화수목금토`;
    console.log(`오늘은 ${dayStr[today]}요일 입니다.`);

    // 다른 버전 3
    console.log(`\n[3번 문제 다른 버전 3]`);
    const daySpaceStr = `일 월 화 수 목 금 토`;
    const daySplit = daySpaceStr.split(' ');
    console.log(`오늘은 ${daySplit[today]}요일 입니다.`);
}

/**
 * 4. 다음과 같이 올바른 더하기 연산을 하는 addPoints 함수를 작성하시오.
 * (단, 소숫점 자리수는 긴 쪽에 맞춘다.)
 * 
 * [결과]
 * 0.21354 + 0.1 = 0.3135400000...4
 * 0.14 + 0.28 = 0.4200000...4
 * 0.34 + 0.226 = 0.56600000...1
 */
const problem_4 = () => {
    console.log(`\n[4번 문제]`);

    const getDigit = (number) => {
        return (number + '').length;
    }

    const addPoints = (num1, num2) => {
        const CORRECT_VALUE = 2; // string으로 변환하는 과정에서 자릿수를 맞추기 위한 길이 제거 용도
        const num1Len = getDigit(num1) - CORRECT_VALUE;
        const num2Len = getDigit(num2) - CORRECT_VALUE;
        const fixedDigit = num1Len >= num2Len ? num1Len : num2Len;

        return (num1 + num2).toFixed(fixedDigit);
    }

    console.log(addPoints(0.21354, 0.1));
    console.log(addPoints(0.14, 0.28));
    console.log(addPoints(0.34, 0.226));
    console.log(addPoints(0.9823, 0.29));
    console.log(addPoints(0.8, 0.87366));
    console.log(addPoints(0.21, 0.7653));
}

problem_1();
problem_2();
problem_3();
problem_4();