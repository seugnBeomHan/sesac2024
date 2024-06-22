// 한 번 실행
const once = (fn, repeatSec = 1) => {
    const DEFAULT_INTERVAL_REPEAT = 1000;
    let isNotExcuted = true;

    const timer = setInterval(() => {
        isNotExcuted = true;
    }, repeatSec * DEFAULT_INTERVAL_REPEAT);

    return (num1, num2) => {
        if (isNotExcuted) {
            isNotExcuted = false;
            return fn(num1, num2);
        }
    };
}

// 반복 실행
const onceRepeat = (fn, repeatSec = 1) => {
    const DEFAULT_INTERVAL_REPEAT = 1000;
    const excuteQueue = [];
    let isNotExcuted = true;

    const cacheIsNotEmpty = () => excuteQueue.length !== 0;
    const cacheIsEmpty = () => excuteQueue.length === 0;

    const timer = setInterval(() => {
        if (cacheIsNotEmpty()) {
            console.log(fn(...excuteQueue[0]));
            excuteQueue.shift();
            return;
        }
        if (cacheIsEmpty()) {
            isNotExcuted = true;
            clearInterval(timer);
            return;
        }
    }, repeatSec * DEFAULT_INTERVAL_REPEAT);

    return (num1, num2) => {
        if (isNotExcuted) {
            isNotExcuted = false;
            return fn(num1, num2);
        } else {
            return 'cache count: ' + excuteQueue.push([num1, num2]);
        }
    };
}

// // 한 번 실행 후 나머지 실행 x
// const onceExcute = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
// console.log(onceExcute(1, 2));
// console.log(onceExcute(3, 4));
// console.log(onceExcute(5, 6));
// console.log(onceExcute(7, 8));
// console.log(onceExcute(9, 0));

// 한 번 실행 후 나머지 실행 큐잉 > 기본 1초마다 반복, 설정 가능
const onceExcutes = onceRepeat((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
console.log(onceExcutes(1, 2));
console.log(onceExcutes(3, 4));
console.log(onceExcutes(5, 6));
console.log(onceExcutes(7, 8));
console.log(onceExcutes(9, 0));