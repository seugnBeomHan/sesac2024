const once = (fn, repeatSec = 1) => {
    const INTERVAL_REPEAT_MS = 500; // Interval 기본 측정 주기
    let excuteCount = 0; // 실행 카운트, 최초 1회 실행 위해
    const excuteCache = []; // 1회 실행 후 추가 실행 되어야 할 때
    const finalRepeatCycle = (repeatSec * 1000) / INTERVAL_REPEAT_MS; // 최종 반복 주기
    let intervalCount = 0; // Interval 횟수 체크

    const cacheIsNotEmpty = () => excuteCache.length !== 0;
    const cacheIsEmpty = () => excuteCache.length === 0;

    const timer = setInterval(() => {
        if (cacheIsEmpty()) {
            excuteCount = 0; // 타이머 종료 후 다시 실행할 때를 위해
            clearInterval(timer);
            return;
        }

        if ((intervalCount += 1) > finalRepeatCycle) {
            intervalCount = 0;
            return;
        }

        if (cacheIsNotEmpty() && intervalCount === finalRepeatCycle) {
            intervalCount = 0;
            console.log(fn(...excuteCache[0]));
            excuteCache.shift();
            return;
        }
    }, INTERVAL_REPEAT_MS);

    return (num1, num2) => {
        if ((excuteCount += 1) === 1) {
            return fn(num1, num2);
        } else {
            return 'cache count: ' + excuteCache.push([num1, num2]);
        }
    };
}

const onceExcute = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
console.log(onceExcute(1, 2));
console.log(onceExcute(3, 4));
console.log(onceExcute(5, 6));
console.log(onceExcute(7, 8));
console.log(onceExcute(9, 0));