// 1. 일반적인 팩토리얼
// const factorial = n => {
//     if (n === 1) {
//         return 1;
//     }
//     return n * factorial(n - 1);
// };
// console.log(factorial(5));

// 2. cache factorial
// 이 경우 외부 변수를 변경하기 때문에 사이드 이펙트 발생, 순수함수가 아니다.
// 순수함수를 만들기 위해선 클로저를 사용해야 한다.
// let cache = [];
// let runCount = 0;

// const factorial = n => {
//     runCount += 1;

//     if (n === 1) {
//         return 1;
//     }

//     const cacheVal = cache[n];
//     return cacheVal === undefined ? cache[n] = n * factorial(n - 1) : cacheVal;
// };
// console.log(factorial(5), runCount);
// runCount = 0;
// console.log(factorial(5), runCount);
// runCount = 0;
// console.log(factorial(5), runCount);
