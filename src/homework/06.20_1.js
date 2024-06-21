// 한 번 실행
const once = (fn) => {
    let excuteCount = 0;

    return (num1, num2) => {
        if ((excuteCount += 1) === 1) {
            return fn(num1, num2);
        }
        return '';
    };
}

// 반복 실행
const onceRepeat = (fn, repeatSec = 1) => {
    const DEFAULT_INTERVAL_REPEAT = 1000;
    const finalIntervalCount = (repeatSec * 1000) / DEFAULT_INTERVAL_REPEAT;
    let curIntervalCount = 0;
    const excuteQueue = [];
    let excuteCount = 0;

    const cacheIsNotEmpty = () => excuteQueue.length !== 0;
    const cacheIsEmpty = () => excuteQueue.length === 0;
    const intervalCountIsSame = () => curIntervalCount === finalIntervalCount;
    const increaseIntervalCount = () => curIntervalCount += 1;

    const timer = setInterval(() => {
        if (cacheIsEmpty()) {
            curIntervalCount = 0;
            clearInterval(timer);
            return;
        }

        increaseIntervalCount();
        if (cacheIsNotEmpty() && intervalCountIsSame()) {
            curIntervalCount = 0;
            console.log(fn(...excuteQueue[0]));
            excuteQueue.shift();
            return;
        }
    }, DEFAULT_INTERVAL_REPEAT);

    return (num1, num2) => {
        if ((excuteCount += 1) === 1) {
            return fn(num1, num2);
        } else {
            return 'cache count: ' + excuteQueue.push([num1, num2]);
        }
    };
}

// 한 번 실행 후 나머지 실행 x
const onceExcute = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
console.log(onceExcute(1, 2));
console.log(onceExcute(3, 4));
console.log(onceExcute(5, 6));
console.log(onceExcute(7, 8));
console.log(onceExcute(9, 0));

// 한 번 실행 후 나머지 실행 큐잉 > 기본 1초마다 반복, 설정 가능
const onceExcutes = onceRepeat((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
console.log(onceExcutes(1, 2));
console.log(onceExcutes(3, 4));
console.log(onceExcutes(5, 6));
console.log(onceExcutes(7, 8));
console.log(onceExcutes(9, 0));