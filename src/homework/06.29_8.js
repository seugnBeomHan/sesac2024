// 1970년 1월 1일과 1970년 1월 2일의 차이를 초로 나타내시오.
const day1 = new Date(1970, 0, 1);
const day2 = new Date(1970, 0, 2);
console.log((day2 - day1) / 1000);

/**
 * 이 달의 날짜 5개를 무작위로 만들어 역순으로 정렬하시오.
 * 1, 3, 5, 7, 8, 10, 12 - 31
 * 2 - 28 or 29
 * 4, 6, 9, 11 - 30
*/

const days = {
    0: 31,
    1: new Date().getFullYear() % 4 === 0 ? 29 : 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31,
};
const randomDays = [];

const monthFullDay = days[new Date().getMonth()];
for (let i = 0; i < 5; i += 1) {
    randomDays.push(Math.round(((Math.random() * monthFullDay) + 1)));
}

console.log(randomDays.sort((a, b) => b - a));

// 내년(2025년)의 오늘(6월 29일)의 요일을 출력하시오.
console.log(`${'일월화수목금토'[new Date(2025).getDay()]}요일`);

// 오늘(2월 1일)로 부터 100일 후의 날짜는?
const today = new Date();
const FULL_MONTH = 12;
let dday = 100;

dday -= (days[today.getMonth()] - today.getDate());

let i = 1;
while (dday >= 0) {
    dday -= days[today.getMonth() + (i += 1)];
}

console.log(`오늘(${today.getFullYear()}.${today.getMonth() + 1}.${today.getDay()}) + 100일은 ${(today.getMonth() % FULL_MONTH) + i}.${days[(today.getMonth() % FULL_MONTH) + i] + dday}일 입니다.`);