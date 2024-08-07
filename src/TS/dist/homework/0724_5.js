function debounce(cb, ms) {
    let timer = null;
    return (...args) => {
        if (timer)
            clearTimeout(timer); // setTimeout을 취소하고
        timer = setTimeout(cb, ms, ...args); // 다시 등록한다.
    };
}
function throttle(cb, ms) {
    let timer = null;
    return (...args) => {
        if (timer)
            return; // 시간 범위 내 setTimeout 명령을 유지한다.
        timer = setTimeout(() => {
            cb(...args);
            timer = null; // 한 번 실행 후 다시 실행되기 위해 초기화한다.
        }, ms);
    };
}
// test
const debo = debounce(a => console.log(a + 1), 1000);
for (let i = 10; i < 15; i++)
    debo(i); // 15
const thro = throttle(a => console.log(a + 1), 1000);
for (let i = 10; i < 15; i++)
    thro(i); // 11
export {};
